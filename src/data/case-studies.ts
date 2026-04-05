export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  products: { name: string; path?: string }[];
  image: string;
  logo?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  externalLinks?: { label: string; url: string }[];
  internalLinks?: { label: string; path: string }[];
  youtubeVideos?: { title: string; videoId: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "automotive-factory-panel-pc",
    title: "ระบบควบคุมสายการผลิตชิ้นส่วนยานยนต์ด้วย Panel PC",
    client: "โรงงานผลิตชิ้นส่วนยานยนต์ ระยอง",
    industry: "อุตสาหกรรมยานยนต์",
    challenge: "โรงงานต้องการอัปเกรดระบบ HMI เดิมที่ล้าสมัย ให้รองรับ SCADA และ MES แบบ Real-time โดยเครื่องคอมพิวเตอร์ต้องทนทานต่อฝุ่น ความชื้น และแรงสั่นสะเทือนในไลน์ผลิต",
    solution: "ติดตั้ง GT Series Panel PC ขนาด 15\" และ 21\" จำนวน 24 เครื่อง ตลอดสายการผลิต พร้อมระบบ SCADA เชื่อมต่อ PLC Siemens และ Mitsubishi ผ่าน Ethernet/IP และ Modbus TCP",
    results: [
      "ลด Downtime ลง 35% จากการแจ้งเตือนแบบ Real-time",
      "เพิ่ม OEE (Overall Equipment Effectiveness) จาก 72% เป็น 89%",
      "ROI คืนทุนภายใน 8 เดือน",
    ],
    products: [
      { name: "GT Series Panel PC 15\"", path: "/gt-series" },
      { name: "GT Series Panel PC 21\"", path: "/gt-series" },
    ],
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
    testimonial: "ระบบทำงานได้เสถียรมาก ไม่เคยมี Downtime จากฝั่ง Hardware เลยตลอด 2 ปีที่ใช้งาน",
    testimonialAuthor: "ผู้จัดการฝ่ายผลิต",
    testimonialRole: "โรงงานชิ้นส่วนยานยนต์ ระยอง",
    youtubeVideos: [
      { title: "GT Series Panel PC สำหรับงานโรงงาน", videoId: "GVAwUx4_eO0" },
    ],
    internalLinks: [
      { label: "ดู GT Series ทั้งหมด", path: "/gt-series" },
      { label: "ดู GK Series Panel PC", path: "/gk-series" },
    ],
    externalLinks: [
      { label: "ดูข้อมูลเพิ่มเติมที่ ENT Group", url: "https://therdpume.wixsite.com/entgroup/gt-series" },
      { label: "📦 ติดตามการส่งมอบสินค้าจริง", url: "https://www.facebook.com/entgroup.th/" },
    ],
  },
  {
    id: "hospital-mini-pc-thin-client",
    title: "ระบบ Thin Client สำหรับโรงพยาบาลขนาดใหญ่",
    client: "โรงพยาบาลเอกชนชั้นนำ กรุงเทพฯ",
    industry: "สาธารณสุข",
    challenge: "ต้องการเปลี่ยนคอมพิวเตอร์เดสก์ท็อปกว่า 200 เครื่องในจุดบริการต่างๆ เพื่อลดค่าใช้จ่ายด้าน IT และการบำรุงรักษา พร้อมรักษาความปลอดภัยข้อมูลผู้ป่วย",
    solution: "ติดตั้ง vCloudPoint Zero Client จำนวน 200 จุด ร่วมกับ Server ศูนย์กลาง โดยแต่ละจุดใช้งาน HIS (Hospital Information System) ผ่าน Virtual Desktop",
    results: [
      "ประหยัดค่าไฟฟ้า 65% เทียบกับ Desktop PC",
      "ลดค่าบำรุงรักษา IT ลง 70% ต่อปี",
      "Zero Downtime จาก Hardware failure ในปีแรก",
    ],
    products: [
      { name: "vCloudPoint S100", path: "/vcloudpoint" },
      { name: "vCloudPoint V100", path: "/vcloudpoint" },
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    testimonial: "ช่วยลดภาระงาน IT ได้อย่างมาก สามารถ Deploy จุดบริการใหม่ได้ภายใน 5 นาที",
    testimonialAuthor: "ผู้อำนวยการฝ่าย IT",
    testimonialRole: "โรงพยาบาลเอกชน กรุงเทพฯ",
    internalLinks: [
      { label: "ดู vCloudPoint ทั้งหมด", path: "/vcloudpoint" },
    ],
    externalLinks: [
      { label: "📦 ติดตามความเคลื่อนไหว ENT Group", url: "https://www.facebook.com/entgroup.th/" },
    ],
  },
  {
    id: "warehouse-rugged-tablet",
    title: "ระบบจัดการคลังสินค้าด้วย Rugged Tablet",
    client: "บริษัทโลจิสติกส์ชั้นนำ สมุทรปราการ",
    industry: "โลจิสติกส์และคลังสินค้า",
    challenge: "พนักงานคลังใช้กระดาษและ Handheld Scanner รุ่นเก่า ทำให้เกิดข้อผิดพลาดในการหยิบสินค้า (Pick Error) สูง และไม่มีข้อมูล Real-time ของสต็อก",
    solution: "ติดตั้ง EM-T195 Rugged Tablet พร้อม Barcode Scanner ในตัว จำนวน 30 เครื่อง เชื่อมต่อกับระบบ WMS ผ่าน WiFi 6 ทั่วคลังสินค้า",
    results: [
      "ลด Pick Error จาก 3.2% เหลือ 0.1%",
      "เพิ่มความเร็วในการหยิบสินค้า 40%",
      "Tablet ทนทานต่อการตกจากความสูง 1.2 เมตร ลดค่าซ่อมอุปกรณ์",
    ],
    products: [
      { name: "EM-T195 Rugged Tablet 5G", path: "/rugged-tablet/em-t195" },
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    testimonial: "จาก Pick Error เกือบ 4% ตอนนี้เหลือไม่ถึง 0.1% ลูกค้าพอใจมาก",
    testimonialAuthor: "Warehouse Manager",
    testimonialRole: "บริษัทโลจิสติกส์ สมุทรปราการ",
    internalLinks: [
      { label: "ดู Rugged Tablet ทั้งหมด", path: "/rugged-tablet" },
      { label: "ดู Handheld ทั้งหมด", path: "/handheld" },
    ],
    externalLinks: [
      { label: "ดูข้อมูล Rugged Devices เพิ่มเติม", url: "https://entgroup-rugged.com/" },
      { label: "📦 ติดตามการส่งมอบสินค้าจริง", url: "https://www.facebook.com/entgroup.th/" },
    ],
  },
  {
    id: "food-factory-waterproof-pc",
    title: "ระบบตรวจสอบคุณภาพอาหารด้วย Waterproof PC",
    client: "โรงงานแปรรูปอาหารส่งออก สมุทรสาคร",
    industry: "อุตสาหกรรมอาหาร",
    challenge: "สภาพแวดล้อมการผลิตมีความชื้นสูงและต้องล้างทำความสะอาดด้วยน้ำแรงดันสูงเป็นประจำ คอมพิวเตอร์ทั่วไปเสียหายบ่อย",
    solution: "ติดตั้ง Waterproof Panel PC ระดับ IP69K จำนวน 8 เครื่อง ที่จุดตรวจสอบคุณภาพ เชื่อมต่อกับเซ็นเซอร์วัดอุณหภูมิ ความชื้น และน้ำหนัก",
    results: [
      "ผ่านมาตรฐาน HACCP และ GMP โดยไม่ต้องกังวลอุปกรณ์",
      "ลดค่าซ่อมอุปกรณ์ลง 90% เทียบกับ PC ทั่วไป",
      "บันทึกข้อมูลคุณภาพแบบ Digital 100% ตอบสนอง Audit ได้ทันที",
    ],
    products: [
      { name: "Waterproof Panel PC IP69K", path: "/waterproof-pc" },
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    internalLinks: [
      { label: "ดู Waterproof PC ทั้งหมด", path: "/waterproof-pc" },
    ],
    externalLinks: [
      { label: "ดูข้อมูลเพิ่มเติมที่ ENT Group", url: "https://therdpume.wixsite.com/entgroup/wp-pc" },
    ],
  },
  {
    id: "school-aio-computer-lab",
    title: "ห้องเรียนคอมพิวเตอร์สำหรับโรงเรียนด้วย AIO PC",
    client: "โรงเรียนมัธยมในจังหวัดเชียงใหม่",
    industry: "การศึกษา",
    challenge: "โรงเรียนต้องการจัดหาคอมพิวเตอร์สำหรับห้องเรียน ICT จำนวน 40 เครื่อง ในงบประมาณจำกัด โดยต้องใช้งานง่าย ดูแลรักษาน้อย และประหยัดพื้นที่",
    solution: "ติดตั้ง All-in-One PC ขนาด 21.5\" จำนวน 40 เครื่อง พร้อม Windows 11 Pro Education License และระบบจัดการห้องเรียนแบบรวมศูนย์",
    results: [
      "ประหยัดพื้นที่โต๊ะ 60% เทียบกับ Desktop แบบเดิม",
      "ลดปัญหาสายไฟ/สายต่อหลุดจาก 10 ครั้ง/เดือนเหลือ 0",
      "นักเรียนเข้าถึงเทคโนโลยีได้ทั่วถึงทุกคน",
    ],
    products: [
      { name: "All-in-One PC 21.5\"", path: "/aio" },
    ],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    internalLinks: [
      { label: "ดู All-in-One PC ทั้งหมด", path: "/aio" },
    ],
  },
  {
    id: "construction-rugged-notebook",
    title: "Rugged Notebook สำหรับทีมวิศวกรภาคสนาม",
    client: "บริษัทก่อสร้างโครงการขนาดใหญ่",
    industry: "ก่อสร้างและวิศวกรรม",
    challenge: "วิศวกรภาคสนามต้องนำ Notebook ไปใช้งานในพื้นที่ก่อสร้างที่มีฝุ่น แดดจัด และอาจตกหล่น โน้ตบุ๊คทั่วไปเสียหายบ่อยและจอมองไม่เห็นกลางแจ้ง",
    solution: "จัดหา Rugged Notebook มาตรฐาน MIL-STD-810H จำนวน 15 เครื่อง พร้อมจอ Sunlight Readable 1000 nits สำหรับทีมวิศวกร",
    results: [
      "ลดค่าซ่อม/เปลี่ยนเครื่องจาก 50,000 บาท/ไตรมาส เหลือ 0",
      "ทำงานกลางแดดได้ชัดเจน เพิ่มประสิทธิภาพทีมภาคสนาม",
      "อุปกรณ์ใช้งานได้ต่อเนื่อง 3 ปีโดยไม่มีปัญหา Hardware",
    ],
    products: [
      { name: "Rugged Notebook MIL-STD-810H", path: "/rugged-notebook" },
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    internalLinks: [
      { label: "ดู Rugged Notebook ทั้งหมด", path: "/rugged-notebook" },
    ],
    externalLinks: [
      { label: "ดูข้อมูล Rugged Devices เพิ่มเติม", url: "https://entgroup-rugged.com/" },
    ],
  },
  {
    id: "ai-classroom-nvidia-jetson",
    title: "ห้องเรียน AI สำหรับสถาบันการศึกษาด้วย NVIDIA Jetson",
    client: "มหาวิทยาลัยเทคโนโลยีชั้นนำ กรุงเทพฯ",
    industry: "การศึกษา / AI & Deep Learning",
    challenge: "สถาบันการศึกษาต้องการจัดตั้งห้องปฏิบัติการ AI ที่นักศึกษาสามารถเรียนรู้และฝึกฝน Deep Learning, Computer Vision และ Natural Language Processing ได้จริง แต่การใช้ GPU Server ราคาสูงเกินงบประมาณ และ Cloud Computing มีค่าใช้จ่ายต่อเนื่องที่ไม่แน่นอน",
    solution: "ติดตั้งห้องเรียน AI จำนวน 30 ชุด โดยใช้ NVIDIA Jetson Orin Nano และ Jetson Orin NX ติดตั้งบน iBox Edge AI Computer จาก ENT Group พร้อม JetPack SDK สำหรับ TensorRT, PyTorch และ TensorFlow นักศึกษาแต่ละคนมีเครื่องเฉพาะตัวสำหรับฝึก Model AI แบบ Hands-on พร้อมกล้อง USB และเซ็นเซอร์สำหรับโปรเจกต์ Computer Vision",
    results: [
      "นักศึกษา 120 คน/เทอม เข้าถึง Hardware AI ได้ทุกคน",
      "ประหยัดงบ 60% เทียบกับการใช้ GPU Server หรือ Cloud",
      "รองรับหลักสูตร AI ตั้งแต่พื้นฐานจนถึง Edge AI Deployment",
      "สร้างโปรเจกต์จริง เช่น ระบบนับคน, ตรวจจับวัตถุ, หุ่นยนต์อัตโนมัติ",
    ],
    products: [
      { name: "NVIDIA Jetson Orin Nano" },
      { name: "NVIDIA Jetson Orin NX" },
      { name: "iBox Edge AI Computer", path: "/ibox-series" },
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    testimonial: "นักศึกษาได้ลงมือทำจริงกับ Hardware AI ระดับอุตสาหกรรม ไม่ใช่แค่เรียนทฤษฎี ผลงานโปรเจกต์จบปีนี้ก้าวกระโดดมาก",
    testimonialAuthor: "หัวหน้าภาควิชาวิศวกรรมคอมพิวเตอร์",
    testimonialRole: "มหาวิทยาลัยเทคโนโลยี กรุงเทพฯ",
    externalLinks: [
      { label: "🌐 ดูสินค้า NVIDIA Jetson ทั้งหมด", url: "https://nvidia-jetson.com/" },
      { label: "🎬 ดูวิดีโอสาธิต NVIDIA Jetson", url: "https://nvidia-jetson.com/products" },
      { label: "📦 ติดตามความเคลื่อนไหว ENT Group", url: "https://www.facebook.com/entgroup.th/" },
    ],
    internalLinks: [
      { label: "ดู iBox Series — Edge AI Computer", path: "/ibox-series" },
    ],
  },
];
