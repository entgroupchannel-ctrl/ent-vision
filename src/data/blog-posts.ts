export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "how-to-choose-panel-pc-for-scada",
    title: "วิธีเลือก Panel PC สำหรับงาน SCADA ในโรงงานอุตสาหกรรม",
    excerpt: "คู่มือเลือก Panel PC ที่เหมาะสมกับระบบ SCADA ตั้งแต่ขนาดจอ ความสว่าง ระดับ IP Protection ไปจนถึงการเชื่อมต่อ PLC",
    content: `## ทำไม Panel PC ถึงสำคัญสำหรับงาน SCADA?

ระบบ SCADA (Supervisory Control and Data Acquisition) เป็นหัวใจสำคัญของการควบคุมและตรวจสอบกระบวนการผลิตในโรงงานอุตสาหกรรม Panel PC ทำหน้าที่เป็น HMI (Human-Machine Interface) ที่ให้พนักงานดูข้อมูลและควบคุมเครื่องจักรผ่านหน้าจอสัมผัส

## สิ่งที่ต้องพิจารณา

### 1. ขนาดจอภาพ
- **10" - 15"**: เหมาะกับจุดควบคุมเครื่องจักรเดี่ยว
- **17" - 21"**: เหมาะกับห้องควบคุมกลาง ดูภาพรวมสายการผลิต
- **24" ขึ้นไป**: สำหรับห้อง Control Room ที่ต้องแสดงข้อมูลหลายหน้าจอ

### 2. ระดับ IP Protection
- **IP54**: ป้องกันฝุ่นและน้ำกระเด็น เหมาะกับงานทั่วไป
- **IP65**: กันฝุ่นสนิทและน้ำฉีดแรงต่ำ เหมาะกับโรงงานอาหาร
- **IP69K**: ทนน้ำแรงดันสูงและอุณหภูมิสูง เหมาะกับอุตสาหกรรมอาหารและเภสัชกรรม

### 3. การเชื่อมต่อ (I/O Ports)
ตรวจสอบว่ามีพอร์ตที่จำเป็น:
- **RS-232/RS-485**: สำหรับเชื่อมต่อ PLC รุ่นเก่า
- **Ethernet (LAN)**: สำหรับ Modbus TCP, Ethernet/IP
- **USB**: สำหรับเชื่อมต่ออุปกรณ์เสริม
- **GPIO/DIO**: สำหรับรับสัญญาณ Digital I/O โดยตรง

### 4. อุณหภูมิใช้งาน
โรงงานบางประเภทมีอุณหภูมิสูง เลือกรุ่นที่รองรับ:
- **0°C ~ 50°C**: งานทั่วไป
- **-20°C ~ 70°C**: งานอุตสาหกรรมหนัก

## สรุป
การเลือก Panel PC สำหรับ SCADA ต้องพิจารณาสภาพแวดล้อม ประเภทการเชื่อมต่อ และซอฟต์แวร์ที่ใช้ การเลือกอุปกรณ์ที่เหมาะสมจะช่วยลด Downtime และเพิ่มประสิทธิภาพการผลิตในระยะยาว`,
    category: "Industrial IoT",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    author: "ENT Group Engineering",
    date: "2026-03-15",
    readTime: "5 นาที",
    tags: ["Panel PC", "SCADA", "HMI", "โรงงาน"],
  },
  {
    id: "thin-client-vs-desktop-tco",
    title: "Thin Client vs Desktop PC: เปรียบเทียบ TCO สำหรับองค์กร",
    excerpt: "วิเคราะห์ต้นทุนรวม (Total Cost of Ownership) ระหว่าง Thin Client กับ Desktop PC แบบเดิม ในระยะเวลา 5 ปี",
    content: `## Thin Client คืออะไร?

Thin Client คืออุปกรณ์คอมพิวเตอร์ขนาดเล็กที่ทำงานโดยพึ่งพา Server ศูนย์กลาง ผู้ใช้งานเข้าถึง Desktop Environment ผ่าน Virtual Desktop Infrastructure (VDI) หรือ Remote Desktop

## เปรียบเทียบต้นทุน 5 ปี (100 จุดใช้งาน)

| รายการ | Desktop PC | Thin Client |
|--------|------------|-------------|
| ค่าอุปกรณ์ | 1,500,000 | 800,000 |
| ค่า Server | 0 | 300,000 |
| ค่าไฟฟ้า/ปี | 180,000 | 36,000 |
| ค่าบำรุงรักษา/ปี | 200,000 | 50,000 |
| **รวม 5 ปี** | **3,400,000** | **1,530,000** |

## สรุป: ประหยัด 55% ใน 5 ปี

Thin Client เหมาะสำหรับงานที่ใช้ซอฟต์แวร์มาตรฐาน (Office, ERP, HIS) และต้องการความปลอดภัยข้อมูลสูง`,
    category: "IT Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    author: "ENT Group Engineering",
    date: "2026-02-28",
    readTime: "4 นาที",
    tags: ["Thin Client", "vCloudPoint", "TCO", "IT"],
  },
  {
    id: "rugged-tablet-vs-consumer-tablet",
    title: "Rugged Tablet vs แท็บเล็ตทั่วไป: ทำไมงานภาคสนามต้องใช้ Rugged?",
    excerpt: "เปรียบเทียบความทนทาน ฟีเจอร์ และต้นทุนระยะยาวระหว่าง Rugged Tablet กับแท็บเล็ตบริโภค",
    content: `## ปัญหาของแท็บเล็ตทั่วไปในงานภาคสนาม

แท็บเล็ตบริโภคเช่น iPad หรือ Samsung Galaxy Tab ไม่ได้ออกแบบมาสำหรับสภาพแวดล้อมที่รุนแรง จอแตกง่าย ไม่ทนฝุ่น แบตเตอรี่ไม่ทน และไม่มี Barcode Scanner ในตัว

## ฟีเจอร์ที่ Rugged Tablet มีแต่แท็บเล็ตทั่วไปไม่มี

1. **ทนการตก** (MIL-STD-810H): ตกจากความสูง 1.2-1.8 เมตร โดยไม่เสียหาย
2. **กันน้ำกันฝุ่น** (IP65/IP67): ใช้งานกลางฝนหรือในสภาพแวดล้อมฝุ่นมากได้
3. **หน้าจอ Sunlight Readable**: ความสว่าง 500-1000 nits มองเห็นชัดกลางแจ้ง
4. **Barcode/RFID Scanner ในตัว**: สแกนได้ทันทีโดยไม่ต้องต่ออุปกรณ์เสริม
5. **แบตเตอรี่เปลี่ยนได้**: ไม่ต้องหยุดงานเพื่อชาร์จ

## การเปรียบเทียบต้นทุน 3 ปี

แม้ Rugged Tablet มีราคาสูงกว่า 2-3 เท่า แต่เมื่อรวมค่าซ่อม ค่าเปลี่ยนเครื่อง และ Downtime แล้ว Rugged Tablet ประหยัดกว่า 40% ในระยะยาว`,
    category: "Product Guide",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    author: "ENT Group Engineering",
    date: "2026-01-20",
    readTime: "6 นาที",
    tags: ["Rugged Tablet", "EM-T195", "MIL-STD", "ภาคสนาม"],
  },
];
