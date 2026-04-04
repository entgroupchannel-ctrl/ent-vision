export interface HandheldProduct {
  id: string;
  model: string;
  name: string;
  nameTH: string;
  category: "windows" | "android";
  screenSize: string;
  image: string;
  gallery: string[];
  specs: {
    cpu: string;
    os: string;
    ram: string;
    storage: string;
    display: string;
    battery?: string;
    camera?: string;
    scanner?: string;
    protection: string;
    dimensions?: string;
    weight?: string;
    connectivity: string[];
  };
  features: string[];
  sellingPoints: { title: string; desc: string }[];
  applications: string[];
  badges: string[];
}

export const handheldProducts: HandheldProduct[] = [
  {
    id: "w65g",
    model: "W65G",
    name: "Windows Rugged Handheld",
    nameTH: "มือถืออุตสาหกรรม Windows กันน้ำ 6.5 นิ้ว",
    category: "windows",
    screenSize: '6.5"',
    image: "https://entgroup-rugged.com/assets/w65g-N3AQKXJb.png",
    gallery: [
      "https://entgroup-rugged.com/assets/w65g-N3AQKXJb.png",
    ],
    specs: {
      cpu: "Intel Gemini Lake N4020 Dual-Core",
      os: "Windows 11 / Windows 10",
      ram: "8GB LPDDR4",
      storage: "128GB eMMC",
      display: '6.5" IPS 720×1600, Corning Gorilla Glass, 5-Point Touch',
      battery: "7.4V / 4000mAh (~6 ชั่วโมง)",
      scanner: "2D Barcode Scanner (Optional)",
      protection: "IP67, MIL-STD-810H",
      dimensions: "188×82×18mm",
      weight: "470g",
      connectivity: ["4G LTE", "WiFi 802.11ac", "Bluetooth 5.0", "GPS/GLONASS/Galileo/Beidou", "NFC"],
    },
    features: [
      "Windows 11 & 10 Dual System",
      "2D Barcode Scanner ระดับมืออาชีพ",
      "IP67 กันน้ำ กันฝุ่น",
      "MIL-STD-810H ทนกระแทก สั่นสะเทือน",
      "NFC Read/Write",
      "Multi-GNSS Navigation",
      "TYPE-C + POGO PIN Charging",
      "Corning Gorilla Glass",
    ],
    sellingPoints: [
      { title: "Windows 11 & 10 Dual System", desc: "เลือกระบบที่เหมาะกับงานของคุณ ใช้งานซอฟต์แวร์ Windows ได้ครบ" },
      { title: "2D Barcode Scanner", desc: "สแกนบาร์โค้ดเร็วแม่นยำ รองรับรหัสทุกประเภท" },
      { title: "หน้าจอใหญ่ 6.5 นิ้ว Gorilla Glass", desc: "จอ IPS ความละเอียดสูง กระจกทนรอย สัมผัส 5 จุด" },
      { title: "IP67 + MIL-STD-810H", desc: "กันน้ำ กันฝุ่น ทนตกกระแทก ใช้งานภาคสนามได้" },
    ],
    applications: ["คลังสินค้า", "โลจิสติกส์", "ขนส่ง", "ค้าปลีก", "งานภาคสนาม"],
    badges: ["Windows 11", "IP67", "2D Scanner"],
  },
  {
    id: "a55gt",
    model: "A55GT",
    name: "5G Android Rugged Handheld",
    nameTH: "มือถือ 5G กันน้ำ IP68 กล้อง 48MP",
    category: "android",
    screenSize: '6.5"',
    image: "https://entgroup-rugged.com/assets/a55gt-8EiW4LT7.jpg",
    gallery: [
      "https://entgroup-rugged.com/assets/a55gt-8EiW4LT7.jpg",
    ],
    specs: {
      cpu: "Octa-Core Processor",
      os: "Android 12",
      ram: "8GB",
      storage: "128GB",
      display: '6.5" FHD+ IPS',
      battery: "6000mAh",
      camera: "Rear 48MP + 2MP Macro + 0.3MP Virtual, Front 16MP",
      scanner: "Optional 2D Scanner",
      protection: "IP68, MIL-STD-810G",
      connectivity: ["5G Full Network", "4G LTE", "WiFi 6", "Bluetooth 5.0", "NFC", "GPS"],
    },
    features: [
      "5G Full Network — เชื่อมต่อเร็วที่สุด",
      "IP68 กันน้ำ กันฝุ่นระดับสูงสุด",
      "กล้อง 48MP Triple Camera System",
      "แบตเตอรี่ 6000mAh ใช้ได้ทั้งวัน",
      "ปลดล็อกลายนิ้วมือ + Face Unlock",
      "WiFi 6 ความเร็วสูง",
    ],
    sellingPoints: [
      { title: "5G ความเร็วสูงสุด", desc: "รองรับ 5G เต็มรูปแบบ เชื่อมต่อเร็วกว่า 4G หลายเท่า" },
      { title: "กันน้ำ กันฝุ่น IP68", desc: "ทำงานได้ทุกสภาพอากาศ จมน้ำ 1.5 เมตรนาน 30 นาที" },
      { title: "กล้อง 48MP มืออาชีพ", desc: "ถ่ายภาพคมชัด บันทึกทุกรายละเอียดงานภาคสนาม" },
      { title: "แบตเตอรี่ 6000mAh", desc: "ใช้งานได้ยาวนานตลอดวัน ไม่ต้องห่วงเรื่องแบต" },
    ],
    applications: ["งานภาคสนาม", "โลจิสติกส์", "ก่อสร้าง", "ทหาร/ตำรวจ", "สำรวจ"],
    badges: ["5G", "IP68", "48MP Camera"],
  },
  {
    id: "p40at",
    model: "P40AT",
    name: "Compact Android PDA Scanner",
    nameTH: "PDA สแกนบาร์โค้ด ขนาดกะทัดรัด 4 นิ้ว",
    category: "android",
    screenSize: '4"',
    image: "https://entgroup-rugged.com/assets/p40at-AM0dpnMQ.jpg",
    gallery: [
      "https://entgroup-rugged.com/assets/p40at-AM0dpnMQ.jpg",
    ],
    specs: {
      cpu: "Quad-Core / Octa-Core",
      os: "Android 9.0",
      ram: "2GB / 3GB / 4GB",
      storage: "16GB / 32GB / 64GB",
      display: '4.0" IPS 800×480 Multi-touch',
      battery: "3.8V 4000mAh ถอดเปลี่ยนได้ (สแตนด์บาย 32 วัน)",
      camera: "Rear 8MP",
      scanner: "2D Barcode Scanner (อ่านโค้ดสกปรก/เสียหายได้)",
      protection: "IP65",
      dimensions: "160×71×17mm",
      weight: "270g",
      connectivity: ["4G LTE", "3G", "2G", "WiFi", "Bluetooth", "GPS/GLONASS/Beidou/Galileo", "NFC"],
    },
    features: [
      "2D Scanner ระดับมืออาชีพ อ่านโค้ดสกปรกได้",
      "IP65 กันน้ำ กันฝุ่น",
      "ขนาดกะทัดรัด 4 นิ้ว พกพาสะดวก",
      "แบตถอดเปลี่ยนได้ สแตนด์บาย 32 วัน",
      "NFC Read/Write",
      "Multi-GNSS Navigation",
      "ทนอุณหภูมิ -25°C ถึง 55°C",
    ],
    sellingPoints: [
      { title: "Scanner ระดับมืออาชีพ", desc: "อ่าน Barcode ที่สกปรก เสียหาย หรือพิมพ์ไม่ชัดได้" },
      { title: "ขนาดกะทัดรัด ถือมือเดียว", desc: "หน้าจอ 4 นิ้ว น้ำหนักเพียง 270g พกพาสะดวกสุด" },
      { title: "แบตถอดเปลี่ยนได้ทันที", desc: "Hot-swap แบตได้เลย ไม่ต้องรอชาร์จ ใช้งานต่อเนื่อง" },
      { title: "ทำงานได้ทุกอุณหภูมิ", desc: "ทนอุณหภูมิ -25°C ถึง 55°C สำหรับงานห้องเย็นและกลางแจ้ง" },
    ],
    applications: ["คลังสินค้า", "ค้าปลีก", "โลจิสติกส์", "ไปรษณีย์", "ห้องเย็น"],
    badges: ["4\" Compact", "IP65", "2D Scanner"],
  },
  {
    id: "a60t",
    model: "A60T",
    name: "Android Data Terminal",
    nameTH: "เครื่องเก็บข้อมูลสแกนเร็ว 6 นิ้ว",
    category: "android",
    screenSize: '6"',
    image: "https://entgroup-rugged.com/assets/a60t-Mi_-RVw_.jpg",
    gallery: [
      "https://entgroup-rugged.com/assets/a60t-Mi_-RVw_.jpg",
    ],
    specs: {
      cpu: "Octa-Core Processor",
      os: "Android 11",
      ram: "4GB",
      storage: "64GB",
      display: '6" HD IPS',
      battery: "6000mAh",
      camera: "Rear 13MP, Front 5MP",
      scanner: "2D Barcode Scanner",
      protection: "IP67",
      connectivity: ["4G LTE", "WiFi", "Bluetooth", "NFC", "GPS"],
    },
    features: [
      "หน้าจอ 6 นิ้ว ใช้งานสะดวก",
      "2D Scanner สแกนเร็วแม่นยำ",
      "IP67 กันน้ำ กันฝุ่น",
      "แบตเตอรี่ 6000mAh",
      "NFC อ่านบัตร/แท็ก",
      "กล้อง 13MP บันทึกหลักฐาน",
    ],
    sellingPoints: [
      { title: "หน้าจอ 6 นิ้ว สมดุลที่ดี", desc: "ไม่เล็กเกินไป ไม่ใหญ่เกินไป ถือมือเดียวใช้งานสะดวก" },
      { title: "สแกนบาร์โค้ดเร็ว", desc: "2D Scanner ในตัว สแกนทุกประเภทรหัสได้ทันที" },
      { title: "แบตอึด 6000mAh", desc: "ใช้งานยาวนานตลอดกะทำงาน ไม่ต้องชาร์จระหว่างวัน" },
      { title: "Android 11 ใช้งานง่าย", desc: "ติดตั้งแอปจาก Play Store ได้เลย ใช้งานง่ายเหมือนมือถือ" },
    ],
    applications: ["คลังสินค้า", "ค้าปลีก", "โลจิสติกส์", "จัดส่งพัสดุ", "สำรวจ"],
    badges: ["Android 11", "IP67", "2D Scanner"],
  },
  {
    id: "p72t",
    model: "P72T",
    name: "Large Display Mobile Terminal",
    nameTH: "เครื่องพกพาจอใหญ่ 7 นิ้ว พร้อม UHF RFID",
    category: "android",
    screenSize: '7"',
    image: "https://entgroup-rugged.com/assets/p72t-BIVD8IBh.png",
    gallery: [
      "https://entgroup-rugged.com/assets/p72t-BIVD8IBh.png",
    ],
    specs: {
      cpu: "MTK6765 Octa-Core",
      os: "Android 10",
      ram: "4GB",
      storage: "64GB",
      display: '7" HD IPS',
      battery: "8000mAh",
      scanner: "Optional 2D + UHF RFID",
      protection: "IP67",
      connectivity: ["4G LTE", "WiFi", "Bluetooth", "NFC", "GPS"],
    },
    features: [
      "หน้าจอใหญ่ 7 นิ้ว ดูข้อมูลสะดวก",
      "แบตเตอรี่ 8000mAh อึดมาก",
      "UHF RFID อ่านระยะไกล (Optional)",
      "2D Scanner ในตัว",
      "NFC อ่าน/เขียนแท็ก",
      "รองรับ Gunstock ถือสแกนสะดวก",
    ],
    sellingPoints: [
      { title: "จอใหญ่สุด 7 นิ้ว", desc: "หน้าจอกว้างที่สุดในกลุ่ม PDA แสดงข้อมูลได้มากกว่า" },
      { title: "แบตเตอรี่ 8000mAh สุดอึด", desc: "ใช้งานได้ยาวนานที่สุด เหมาะกับงานภาคสนามทั้งวัน" },
      { title: "UHF RFID อ่านระยะไกล", desc: "อ่าน RFID Tag ระยะไกลได้ เหมาะกับงานคลังสินค้าขนาดใหญ่" },
      { title: "Gunstock Ready", desc: "ติดด้ามจับสะดวก ลดอาการเมื่อยมือจากการถือสแกนนาน ๆ" },
    ],
    applications: ["คลังสินค้า", "RFID Inventory", "โลจิสติกส์", "ค้าปลีก", "ตรวจสอบสินค้า"],
    badges: ["7\" Display", "8000mAh", "UHF RFID"],
  },
  {
    id: "em-t2-ultra",
    model: "EM-T2 Ultra",
    name: "Rugged Outdoor Tablet",
    nameTH: "แท็บเล็ต Outdoor 10.95 นิ้ว Android 15 แบต 20,000mAh",
    category: "android",
    screenSize: '10.95"',
    image: "https://entgroup-rugged.com/assets/em-t2-ultra-Bl924cVb.jpg",
    gallery: [
      "https://entgroup-rugged.com/assets/em-t2-ultra-Bl924cVb.jpg",
    ],
    specs: {
      cpu: "MediaTek Dimensity 7300",
      os: "Android 15",
      ram: "12GB",
      storage: "256GB",
      display: '10.95" 2K (1200×1920) 450nit',
      battery: "20,000mAh 33W Fast Charging",
      camera: "Rear 64MP Triple + Night Vision",
      protection: "IP68",
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "GPS", "NFC"],
    },
    features: [
      "หน้าจอ 2K 10.95 นิ้ว สว่างชัด",
      "แบต 20,000mAh สแตนด์บาย 90 วัน",
      "กล้อง 64MP Triple + Night Vision",
      "Android 15 ใหม่ล่าสุด",
      "IP68 กันน้ำ กันฝุ่น",
      "33W Fast Charging",
    ],
    sellingPoints: [
      { title: "แบต 20,000mAh สุดอึด", desc: "ชาร์จครั้งเดียวใช้ได้หลายวัน สแตนด์บายนานถึง 90 วัน" },
      { title: "กล้อง 64MP + Night Vision", desc: "ถ่ายภาพคมชัดแม้ในที่มืด เหมาะกับงานสำรวจกลางคืน" },
      { title: "จอ 2K 10.95 นิ้ว", desc: "หน้าจอใหญ่ ความละเอียดสูง ดูแผนที่และข้อมูลสะดวก" },
      { title: "Android 15 รุ่นใหม่ล่าสุด", desc: "ระบบปฏิบัติการใหม่ที่สุด รองรับแอปและฟีเจอร์ล่าสุด" },
    ],
    applications: ["สำรวจภาคสนาม", "Outdoor", "ทหาร/ตำรวจ", "ก่อสร้าง", "เหมืองแร่"],
    badges: ["Android 15", "20,000mAh", "64MP Camera"],
  },
  {
    id: "em-p2-pro",
    model: "EM-P2 Pro",
    name: "Rugged 5G Phone",
    nameTH: "มือถือ 5G สุดทน จอ 2K 120Hz แบต 20,000mAh",
    category: "android",
    screenSize: '6.78"',
    image: "https://entgroup-rugged.com/assets/main-VATZJz47.png",
    gallery: [
      "https://entgroup-rugged.com/assets/main-VATZJz47.png",
    ],
    specs: {
      cpu: "MediaTek Dimensity 6300 5G",
      os: "Android 14",
      ram: "12GB",
      storage: "256GB",
      display: '6.78" 2K (1080×2460) 120Hz',
      battery: "20,000mAh 33W Fast Charging",
      camera: "High-Res Triple Camera",
      protection: "IP68",
      connectivity: ["5G", "WiFi 6", "Bluetooth 5.2", "GPS", "NFC"],
    },
    features: [
      "5G รองรับทุกเครือข่าย",
      "จอ 2K 120Hz ลื่นสุด",
      "แบต 20,000mAh อึดมาก",
      "33W Fast Charging",
      "ลำโพง 3W + ไฟฉาย 1000 Lumen",
      "IR Remote รีโมตอุปกรณ์อิเล็กทรอนิกส์",
    ],
    sellingPoints: [
      { title: "5G + แบต 20,000mAh", desc: "เชื่อมต่อเร็วสุดกับแบตที่อึดสุด ไม่ต้องเลือก" },
      { title: "จอ 2K 120Hz ลื่นที่สุด", desc: "หน้าจอคมชัดและลื่นไหล ใช้งานได้แม้ในแดดจัด" },
      { title: "ไฟฉาย 1000 Lumen", desc: "ส่องสว่างเทียบเท่าไฟฉายมืออาชีพ เหมาะงานกลางคืน" },
      { title: "IR Remote ในตัว", desc: "ควบคุมเครื่องใช้ไฟฟ้าได้จากตัวเครื่อง ไม่ต้องพกรีโมตเพิ่ม" },
    ],
    applications: ["งานภาคสนาม", "Outdoor", "ก่อสร้าง", "ทหาร/ตำรวจ", "ผจญภัย"],
    badges: ["5G", "2K 120Hz", "20,000mAh"],
  },
  {
    id: "em-p1",
    model: "EM-P1",
    name: "Rugged Outdoor Phone",
    nameTH: "มือถือสุดทน Android 14 กล้อง 64MP",
    category: "android",
    screenSize: '6.56"',
    image: "https://entgroup-rugged.com/assets/em-p1-KJ_Z-unN.png",
    gallery: [
      "https://entgroup-rugged.com/assets/em-p1-KJ_Z-unN.png",
    ],
    specs: {
      cpu: "MediaTek Helio G99",
      os: "Android 14",
      ram: "12GB",
      storage: "256GB",
      display: '6.56" HD+ IPS',
      battery: "High Capacity",
      camera: "Rear 64MP, Front Camera",
      protection: "IP68",
      connectivity: ["4G LTE", "WiFi", "Bluetooth", "GPS", "NFC"],
    },
    features: [
      "Helio G99 ประสิทธิภาพสูง",
      "กล้อง 64MP คมชัดมาก",
      "Android 14 ใหม่ล่าสุด",
      "IP68 กันน้ำ กันฝุ่น",
      "12GB RAM ทำงานลื่น",
      "256GB Storage เก็บข้อมูลจุใจ",
    ],
    sellingPoints: [
      { title: "Helio G99 แรงสุด", desc: "CPU ประสิทธิภาพสูง ใช้งานลื่นทุกแอป ไม่สะดุด" },
      { title: "กล้อง 64MP คมชัด", desc: "ถ่ายภาพรายละเอียดสูง บันทึกหลักฐานงานได้ชัดเจน" },
      { title: "12GB + 256GB", desc: "RAM และ Storage เหลือเฟือ ใช้งานได้ไม่ต้องกังวลพื้นที่" },
      { title: "IP68 ทนทุกสถานการณ์", desc: "กันน้ำ กันฝุ่น กันกระแทก พร้อมลุยทุกสภาพแวดล้อม" },
    ],
    applications: ["งานภาคสนาม", "Outdoor", "ผจญภัย", "ก่อสร้าง", "สำรวจ"],
    badges: ["Android 14", "IP68", "64MP Camera"],
  },
];

export function getHandheldProduct(id: string): HandheldProduct | undefined {
  return handheldProducts.find((p) => p.id === id);
}

export function getRelatedHandhelds(id: string, limit = 3): HandheldProduct[] {
  const product = getHandheldProduct(id);
  if (!product) return [];
  return handheldProducts
    .filter((p) => p.id !== id)
    .sort((a, b) => {
      // Prioritize same category
      const aScore = a.category === product.category ? 1 : 0;
      const bScore = b.category === product.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
