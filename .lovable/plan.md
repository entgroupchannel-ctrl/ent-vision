
เป้าหมาย: แก้ปัญหา “ตายเงียบ/ค้างโหลด/กดไม่ได้” หลังสลับ browser tab แล้วกลับมา โดยแตะเฉพาะส่วนเสถียรภาพ ไม่เปลี่ยน business logic หรือ styling เดิม

สิ่งที่พบจากโค้ด:
1. `src/App.tsx` มี session recovery ซ้อนกัน 3 ชั้น
   - `visibilitychange` → `refreshSession()`
   - health check ทุก 2 นาที → `refreshSession()`
   - React Query global `refetchOnWindowFocus: true`
   ทำให้ตอนกลับมาใช้งาน มีโอกาสยิง refresh/refetch ซ้ำพร้อมกัน
2. มี bug ชัดเจนใน `expires_at`:
   - โค้ดใช้ `new Date(data.session.expires_at || 0).getTime()`
   - แต่ค่า `expires_at` จาก Supabase เป็น Unix seconds
   - เลยคำนวณได้ติดลบมาก (`Token expires in -1773893466 s`) และเข้าเงื่อนไข refresh ตลอดเวลา
3. `App.tsx` ใช้ `qc.invalidateQueries()` แบบทั้งระบบหลัง refresh สำเร็จ ซึ่งหนักเกินไป โดยเฉพาะหน้า Admin/My Account ที่มีหลาย query + subscription
4. `AdminDashboard.tsx` ยังไม่ได้ guard สถานะ permission loading จาก `usePermissions()` ทำให้ช่วง auth/role กำลัง recover อาจดูเหมือนหน้าค้างหรือ sidebar/interaction เพี้ยน

แผนแก้ไข:
1. แก้ session expiry calculation ใน `src/App.tsx`
   - แปลง `expires_at` เป็น milliseconds ให้ถูกต้อง (`expires_at * 1000`)
   - ถ้าไม่มี session หรือค่า expiry ไม่ valid จะไม่ฝืน refresh
   - ตัด false-positive log/refresh loop ที่กำลังก่อปัญหาอยู่ตอนนี้

2. ลด “refetch storm” ตอนกลับจาก tab อื่นใน `src/App.tsx`
   - เพิ่ม in-flight guard เพื่อไม่ให้ `visibilitychange` กับ health check refresh พร้อมกัน
   - เปลี่ยนจาก `invalidateQueries()` ทั้งระบบ เป็น refetch เฉพาะ active queries หรือ skip ถ้า token ยังปกติ
   - ให้ recovery ทำงานเฉพาะกรณีแท็บถูกพักนานจริง และ session ใกล้หมดอายุ/มีปัญหาจริง

3. เติม loading guard ฝั่ง Admin ใน `src/pages/AdminDashboard.tsx`
   - ใช้ `loading` จาก `usePermissions()`
   - ระหว่าง role/permission ยังไม่พร้อม ให้แสดง loading state เดิมแทนการปล่อย UI เข้าสภาวะกึ่งพร้อมใช้งาน
   - ลดอาการ “หน้าดูนิ่งแต่กดไม่ได้” หลัง token refresh หรือ session recovery

4. Hardening หน้า My Account แบบไม่เปลี่ยน flow หลัก
   - ตรวจจุดที่พึ่ง auth/session โดยตรงให้ไม่ render ครึ่งๆ กลางๆ ระหว่าง recovery
   - ถ้าจำเป็นจะเพิ่ม guard เฉพาะ section ที่ขึ้นกับ user/session เพื่อไม่ให้หน้าเหมือนค้าง
   - จะไม่ refactor โครงสร้างแท็บหรือเปลี่ยน UX เดิม

5. ตรวจผลกระทบกับ realtime/subscriptions
   - ยืนยันว่า notification/live chat subscriptions ไม่ถูกกระตุ้นซ้ำเพราะ recovery loop
   - จะไม่เปลี่ยน logic ของแชท ถ้าไม่ใช่ต้นเหตุหลัก เพื่อคุม scope

การทดสอบหลังแก้:
1. เข้า `/my-account` แล้วสลับไปแท็บอื่น 30 วินาที+ กลับมา ต้องไม่ค้าง spinner และกดได้ทันที
2. เข้า `/admin` แล้วสลับแท็บกลับมา ต้องไม่เกิด sidebar ว่าง/คลิกไม่ตอบสนอง
3. ตรวจ console ว่าไม่ขึ้น `Token expires in -... s` อีก
4. ตรวจว่าไม่มี refresh loop ทุก 2 นาทีแบบไม่จำเป็น
5. เช็กว่า query สำคัญยัง refresh ได้ปกติเมื่อ session ใกล้หมดอายุจริง

รายละเอียดเทคนิค:
- ไฟล์หลักที่จะแก้: `src/App.tsx`, `src/pages/AdminDashboard.tsx`
- อาจแตะ `src/pages/MyAccount.tsx` เล็กน้อยถ้าต้องใส่ guard เพิ่ม
- ไม่ต้องแก้ Supabase schema / migration
- ไม่ต้องเปลี่ยน styling เดิม
- ไม่ refactor ใหญ่ แก้แบบ targeted stability fix

ผลลัพธ์ที่คาดหวัง:
- กลับมาจาก browser tab อื่นแล้ว UI ไม่ “ตายเงียบ”
- Admin/My Account ใช้งานต่อได้ทันที
- ลดโหลดซ้ำที่ไม่จำเป็น และลดโอกาส deadlock/race condition จาก auth recovery
