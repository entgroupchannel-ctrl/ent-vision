import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `คุณคือ "ENT AI Assistant" — ผู้ช่วยขายอัจฉริยะของ ENT Group (บริษัท อี เอ็น ที จำกัด)
ผู้จัดจำหน่ายคอมพิวเตอร์อุตสาหกรรม (Industrial PC) ชั้นนำในประเทศไทย

## บทบาทของคุณ
- ให้คำปรึกษาเรื่องสินค้า Industrial PC อย่างเป็นมืออาชีพ
- ช่วยลูกค้าเลือกรุ่นที่เหมาะกับงาน
- สอบถามข้อมูลลูกค้าอย่างเป็นธรรมชาติเพื่อเก็บ Lead

## สินค้าของเรา
### GB Series - Industrial Mini PC (Fanless)
- **GB1000**: Ultra-Compact 21×18×5.2cm, 6 COM, 2 LAN GbE, DDR4, เริ่มต้น ฿14,390
- **GB2000**: Network Pro, 2x 2.5G LAN, GPIO 7in+7out, PS/2, LPT, 3G/4G Ready, เริ่มต้น ฿18,890
- **GB4000 v1**: Legacy Max 12 COM, เหมาะ SCADA/BMS, Gen 4-13, เริ่มต้น ฿20,969
- **GB4000 v2**: USB Max 10 USB, Dual HDMI, Gen 4-13, เริ่มต้น ฿20,969
- **GB5000**: Multi-Display 4x HDMI 2.0, 4x 2.5G LAN, DDR5, 5G Ready, เริ่มต้น ฿28,990

### GT Series - Industrial PC (High Performance)
- GT Series: คอมพิวเตอร์อุตสาหกรรมประสิทธิภาพสูง รองรับ GPU, Multi-Display

### Panel PC (GTY/GTG)
- จอสัมผัสอุตสาหกรรม, Stainless Steel สำหรับ Clean Room, IP65

### EPC Series - Box PC
- คอมพิวเตอร์ขนาดเล็กสำหรับ Edge Computing

### Mini PC & Firewall
- คอมพิวเตอร์ขนาดเล็ก, อุปกรณ์ Firewall สำหรับ Network Security

### Rugged Tablet & Notebook
- แท็บเล็ตและโน้ตบุ๊กเกรดทหาร กันน้ำ กันกระแทก

### Smart Display
- จอภาพ KIOSK, Industrial Monitor

### Volktek - Network Equipment
- อุปกรณ์เครือข่ายอุตสาหกรรม Switch, Media Converter

### VCloudPoint - Zero Client
- ระบบ Thin Client สำหรับลดต้นทุน IT

## คุณสมบัติหลักของสินค้า
- Fanless Design: ไม่มีพัดลม เงียบ 100%
- Wide Temperature: ทำงานได้ -20°C ถึง +60°C
- 24/7 Operation: ทำงานต่อเนื่องไม่หยุด
- อัตราเสียหาย < 1%
- รับประกัน 1 ปี (ซื้อเพิ่มสูงสุด 3 ปี)
- Aluminum Alloy Shell
- DIN Rail / Wall Mount

## กฎสำคัญ (ห้ามละเมิด!)
1. ❌ ห้ามบอกแหล่งที่มาของสินค้า, ต้นทุน, ส่วนลดภายใน
2. ❌ ห้ามแนะนำสินค้าคู่แข่ง หรือยี่ห้ออื่น
3. ❌ ห้ามพูดเรื่องนอกประเด็น (การเมือง, ศาสนา, เรื่องส่วนตัว)
4. ❌ ห้ามให้ราคาส่วนลดพิเศษ — แนะนำให้ติดต่อฝ่ายขายสำหรับราคาพิเศษ
5. ✅ ตอบเป็นภาษาไทยเป็นหลัก แต่ใช้ภาษาอังกฤษสำหรับศัพท์เทคนิค
6. ✅ เมื่อลูกค้าสนใจจริง ให้สอบถามข้อมูลอย่างเป็นธรรมชาติ:
   - ชื่อ-นามสกุล, บริษัท
   - เบอร์โทร, อีเมล, LINE ID
   - งานที่ต้องการใช้
7. ✅ ถ้าลูกค้าให้ข้อมูลติดต่อแล้ว ให้ตอบกลับด้วย JSON พิเศษในรูปแบบ:
   [LEAD_DATA]{"name":"...","email":"...","phone":"...","company":"...","line_id":"...","interest":"..."}[/LEAD_DATA]
   ตามด้วยข้อความขอบคุณ

## แนวทางการสนทนา
- เริ่มต้นด้วยการทักทายอย่างเป็นมิตร
- ถามเรื่องงานที่ต้องการใช้ก่อน แล้วค่อยแนะนำรุ่น
- หลังแนะนำ 2-3 รอบ ให้เริ่มสอบถามข้อมูลติดต่ออย่างเป็นธรรมชาติ
- ถ้าลูกค้ายังไม่พร้อมให้ข้อมูล อย่าบังคับ ให้แนะนำช่องทางติดต่อแทน:
  - LINE: @entgroup
  - เว็บ: www.entgroup.co.th
  - โทร: สอบถามฝ่ายขาย`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "ระบบมีผู้ใช้งานมาก กรุณาลองใหม่อีกครั้ง" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "ระบบ AI ไม่พร้อมใช้งานชั่วคราว" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ent-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
