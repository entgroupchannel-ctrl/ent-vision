import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Thermometer, Wind, Shield, Zap, Server, Factory, Building, Home, Monitor, Download, Play } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";
import gt1000Banner from "@/assets/gt1000-banner.jpg";
import gt2000Banner from "@/assets/gt2000-banner.jpg";
import gt3000Banner from "@/assets/gt3000-banner.jpg";
import gt4000Banner from "@/assets/gt4000-banner.jpg";
import gt5000Banner from "@/assets/gt5000-banner.jpg";
import gt6000Banner from "@/assets/gt6000-banner.jpg";
import gt7000Banner from "@/assets/gt7000-banner.jpg";
import gt8000Banner from "@/assets/gt8000-banner.jpg";
import gt9000Banner from "@/assets/gt9000-banner.jpg";
import gt4500Banner from "@/assets/gt4500-banner.jpg";
import gt1000Product from "@/assets/gt1000-product.jpg";
import gt1200Product from "@/assets/gt1200-product.jpg";
import gt1400Product from "@/assets/gt1400-product.jpg";
import gt2000Product from "@/assets/gt2000-product.jpg";
import gt3000Product from "@/assets/gt3000-product.jpg";
import gt4000Product from "@/assets/gt4000-product.jpg";
import gt4500Product from "@/assets/gt4500-product.jpg";
import gt5000Product from "@/assets/gt5000-product.jpg";
import gt6000Product from "@/assets/gt6000-product.jpg";
import gt7000Product from "@/assets/gt7000-product.jpg";
import gt8000Product from "@/assets/gt8000-product.jpg";
import gt9000Product from "@/assets/gt9000-product.jpg";

const features = [
  { icon: Thermometer, title: "ทนความร้อนสูง", desc: "ทำงานได้ในอุณหภูมิ 0–60°C อย่างต่อเนื่อง" },
  { icon: Wind, title: "Fanless Design", desc: "เงียบ 0 เดซิเบล ไม่มีพัดลม ไม่ดูดฝุ่น" },
  { icon: Shield, title: "ทนฝุ่น ทนสั่นสะเทือน", desc: "โครงอลูมิเนียมแข็งแรง ทนทุกสภาพแวดล้อม" },
  { icon: Zap, title: "ประหยัดพลังงาน", desc: "ใช้ไฟเพียง 15–65W ทำงาน 24/7 ต่อเนื่อง" },
];

const useCases = [
  { icon: Factory, label: "โรงงาน" },
  { icon: Building, label: "ออฟฟิศ" },
  { icon: Monitor, label: "Outdoor" },
  { icon: Home, label: "บ้าน" },
];

const gtModels = [
  {
    name: "GT1000",
    tagline: "จุดเริ่มต้นที่คุ้มค่า",
    cpu: "Intel Celeron N2920 / N3520",
    ram: "4–8 GB DDR3L",
    storage: "SSD 128–256 GB",
    ports: "USB 6, COM 2, LAN 2, VGA+HDMI",
    size: "ขนาดเล็กกระทัดรัด",
    image: gt1000Product,
    tab: "gt1000",
    highlight: "เริ่มต้น",
    price: "15,990",
  },
  {
    name: "GT1200",
    tagline: "คอมแพกต์ ดีไซน์ใหม่",
    cpu: "Intel i3-6157U / i5 / i7",
    ram: "DDR3L–DDR4 สูงสุด 64GB",
    storage: "M.2 SSD + SATA",
    ports: "USB 6, COM 2, LAN 2, HDMI",
    size: "TDP 28W Fanless",
    image: gt1200Product,
    tab: "gt1200",
    highlight: "NEW!",
    badge: true,
    price: "สอบถาม",
  },
  {
    name: "GT1400",
    tagline: "พลังแรง 4 LAN DDR5",
    cpu: "i5-8305G / i7-12650HX / i7-13650HX",
    ram: "DDR4/DDR5 สูงสุด 64GB",
    storage: "M.2 NVMe + SATA",
    ports: "USB 6, COM 2, LAN 4, HDMI",
    size: "4 LAN + DDR5 Support",
    image: gt1400Product,
    tab: "gt1400",
    highlight: "NEW!",
    badge: true,
    price: "28,990",
  },
  {
    name: "GT2000",
    tagline: "ยอดนิยม 8 USB + 4 COM",
    cpu: "Intel Celeron 1037U / Core i5-3317U",
    ram: "4 GB DDR3L",
    storage: "SSD 256 GB",
    ports: "USB 8 (4×3.0+4×2.0), COM 4, LAN 2, VGA+HDMI",
    size: "23.4×15×4.8 cm / 1.5 kg",
    image: gt2000Product,
    tab: "gt2000",
    highlight: "ยอดนิยม",
    price: "15,990",
  },
  {
    name: "GT3000",
    tagline: "6 COM หลากหลาย CPU",
    cpu: "Celeron 1007U / Core i3 / i5 / i7",
    ram: "4 GB DDR3L",
    storage: "SSD 128 GB",
    ports: "USB 6, COM 6, LAN 2, VGA+HDMI",
    size: "15×21.7×5.2 cm / 1.289 kg",
    image: gt3000Product,
    tab: "gt3000",
    highlight: "6 COM",
    price: "สอบถาม",
  },
  {
    name: "GT4000",
    tagline: "GPIO พร้อมใช้ VESA Mount",
    cpu: "Intel Core i3 / i5-4200U / i7-4500U",
    ram: "4–8 GB DDR3L",
    storage: "SSD 128–256 GB",
    ports: "USB 8, COM 6, LAN 2, VGA+HDMI, GPIO",
    size: "17.7×21.7×5.2 cm / 1.516 kg",
    image: gt4000Product,
    tab: "gt4000",
    highlight: "GPIO",
    price: "24,990",
  },
  {
    name: "GT4500",
    tagline: "DDR4 + SIM 4G/5G มาตรฐานใหม่",
    cpu: "Intel Core i3-6006U / i5-7260U / i5-8250U / i7-8550U",
    ram: "4–8 GB DDR4",
    storage: "SSD 256 GB",
    ports: "USB 8 (4×3.0+4×2.0), COM 6, LAN 2, VGA+HDMI, SIM",
    size: "21.2×15.5×4.5 cm / 2.5 kg",
    image: gt4500Product,
    tab: "gt4500",
    highlight: "DDR4 + 4G",
    price: "21,900",
  },
  {
    name: "GT5000",
    tagline: "GPIO + SIM IoT Ready",
    cpu: "Intel Core i5-4200U / i7-4500U",
    ram: "4–8 GB DDR3L",
    storage: "SSD 128 GB – 1 TB",
    ports: "USB 8, COM 6 (RS232/RS485/RS422), LAN 2, GPIO, SIM slot",
    size: "GPIO + SIM + RS485",
    image: gt5000Product,
    tab: "gt5000",
    highlight: "IoT Ready",
    price: "19,490",
  },
  {
    name: "GT6000",
    tagline: "ดีไซน์ใหม่ Intel Core i3",
    cpu: "Intel Core i3-5005U",
    ram: "4–8 GB DDR3L",
    storage: "SSD 128 GB – 1 TB",
    ports: "USB 6, COM 6, LAN 2, VGA+HDMI",
    size: "Fanless สีดำสวยงาม",
    image: gt6000Product,
    tab: "gt6000",
    highlight: "ดีไซน์ใหม่",
    price: "สอบถาม",
  },
  {
    name: "GT7000",
    tagline: "คำตอบทุกปัญหาโรงงาน",
    cpu: "Intel Core i3 / i5 / i7 (DDR4)",
    ram: "4–32 GB DDR4",
    storage: "SSD 256 GB – 1 TB",
    ports: "USB 6, COM 6 (RS232/422/485), LAN 2",
    size: "23×17.5×5 cm / 2.5 kg",
    image: gt7000Product,
    tab: "gt7000",
    highlight: "DDR4",
    price: "สอบถาม",
  },
  {
    name: "GT8000",
    tagline: "Ice Lake Gen 10 สเปคแรง",
    cpu: "Intel Core i5-1035G1 / i7-10710U",
    ram: "4–32 GB DDR4",
    storage: "SSD 128 GB – 2 TB",
    ports: "USB 8, COM 6, LAN 2, HDMI+DP",
    size: "Intel Gen 10 Ice Lake",
    image: gt8000Product,
    tab: "gt8000",
    highlight: "Ice Lake",
    price: "สอบถาม",
  },
  {
    name: "GT9000",
    tagline: "Triple Display 8 COM NVMe",
    cpu: "Intel i5-10200H / i7-10750H / i5-1235U / i7-1255U",
    ram: "4–32 GB DDR4/DDR5",
    storage: "SSD + 2.5\" SATA + M.2 NVMe",
    ports: "USB 8, COM 8 (RS232/422/485), LAN 2, HDMI×2+DP",
    size: "Triple Display + Dual Band WiFi",
    image: gt9000Product,
    tab: "gt9000",
    highlight: "Triple Display",
    price: "25,290",
  },
];

const galleryImages = [
  "https://static.wixstatic.com/media/005637_a5ffaad568e84e3daa9498a03f79410a~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_a5ffaad568e84e3daa9498a03f79410a~mv2.jpg",
  "https://static.wixstatic.com/media/005637_138dfbf84a364703b08266d6f7726ee3~mv2.jpg/v1/fill/w_348,h_347,q_90,enc_avif,quality_auto/005637_138dfbf84a364703b08266d6f7726ee3~mv2.jpg",
  "https://static.wixstatic.com/media/005637_3873554c607047d7baa9d4ab166ebf16~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_3873554c607047d7baa9d4ab166ebf16~mv2.jpg",
  "https://static.wixstatic.com/media/005637_3ecd1c202310457a9ae75096734cec22~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_3ecd1c202310457a9ae75096734cec22~mv2.jpg",
  "https://static.wixstatic.com/media/005637_46e268297fcb4d51bf53ff1995af7bda~mv2.jpg/v1/fill/w_348,h_347,q_90,enc_avif,quality_auto/005637_46e268297fcb4d51bf53ff1995af7bda~mv2.jpg",
];

const modelTabs = [
  { id: "overview", label: "รุ่นทั้งหมด" },
  { id: "gt1000", label: "GT1000" },
  { id: "gt2000", label: "GT2000" },
  { id: "gt3000", label: "GT3000" },
  { id: "gt4000", label: "GT4000" },
  { id: "gt5000", label: "GT5000" },
  { id: "gt6000", label: "GT6000" },
  { id: "gt7000", label: "GT7000" },
  { id: "gt8000", label: "GT8000" },
  { id: "gt9000", label: "GT9000" },
  { id: "gt4500", label: "GT4500" },
  { id: "gt1400", label: "GT1400" },
  { id: "gt1200", label: "GT1200" },
];

const GTSeries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    window.scrollTo({ top: document.getElementById("models")?.offsetTop ? document.getElementById("models")!.offsetTop - 80 : 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">GT Series</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://static.wixstatic.com/media/3e5003_b63c249dfe4a44a0b97711a28cf0892a~mv2.jpg/v1/fill/w_1312,h_580,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.jpg"
            alt="GT Series"
            className="w-full h-full object-cover opacity-20 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative container max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Industrial Grade PC
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 tracking-tight">
            GT <span className="text-gradient">SERIES</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            คอมพิวเตอร์เกรดอุตสาหกรรมขนาดเล็ก ออกแบบมาเพื่อรองรับการทำงานในสภาวะแวดล้อมที่มีอุณหภูมิสูง
            ฝุ่นละอองหนาแน่น มีครีบระบายความร้อนถี่ๆ ทำให้ระบายความร้อนได้เยี่ยม ทนฝุ่น ทนสั่นสะเทือน
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["ถึก", "ทน", "แกร่ง", "แข็งแรง"].map((word) => (
              <div key={word} className="flex flex-col items-center gap-2">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <span className="text-lg font-bold text-foreground">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              รองรับ<span className="text-gradient">ทุกสถานที่</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {useCases.map((uc) => (
              <div key={uc.label} className="card-surface p-6 text-center flex flex-col items-center gap-3">
                <uc.icon className="text-primary" size={36} />
                <span className="font-semibold text-foreground">{uc.label}</span>
              </div>
            ))}
          </div>

          <img
            src="https://static.wixstatic.com/media/3e5003_1fb2c4f1460e476b8ef1f40a3c65587f~mv2.jpg/v1/fill/w_1312,h_280,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.jpg"
            alt="GT Series Applications"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              จุดเด่น<span className="text-gradient">ที่แตกต่าง</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-surface p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
                <f.icon className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Industrial PC */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Industrial PC</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                เทคโนโลยี <span className="text-gradient">Chassis Cooling</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                ตัวเครื่องทั้งหมดทำหน้าที่เป็น heatsink ยักษ์ ด้วยครีบระบายความร้อนอลูมิเนียมที่ออกแบบมาพิเศษ
                ทำให้ความร้อนกระจายออกจากพื้นผิวทั้งหมดอย่างมีประสิทธิภาพ ระบบ Fanless Design ให้ประโยชน์มากมาย
                — ไม่มีพัดลมทำให้เงียบสนิท 0 เดซิเบล, โครงสร้างอลูมิเนียมแข็งแรงทนทาน, และประหยัดไฟ
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ผลที่ได้คือความเสถียรสูงเพราะไม่มีชิ้นส่วนเคลื่อนไหว เหมาะกับสิ่งแวดล้อมโรงงานที่มีฝุ่นเพราะไม่ดูดอากาศ
                สามารถทำงาน 24/7 ต่อเนื่อง ไม่รบกวนการทำงานด้วยเสียงเงียบสนิท
              </p>
            </div>
            <div className="card-surface p-2 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/0597a3_d8a5010af6b34403b5f79b763973d50a~mv2.png/v1/fill/w_1030,h_367,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-16%20at%2011_01_34.png"
                alt="GT Series Lineup"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Models Section with Tabs */}
      <section className="section-padding" id="models">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">All Models</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              รุ่น<span className="text-gradient">ทั้งหมด</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              เลือกรุ่นที่เหมาะกับงานของคุณ — ตั้งแต่รุ่นเริ่มต้นจนถึง Top Performance
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {modelTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
                }`}
              >
                {tab.label}
                {tab.id === "gt1400" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[10px]">NEW</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab: Overview - All Models Grid */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Model Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gtModels.map((model) => (
                  <button
                    key={model.name}
                    onClick={() => model.tab ? handleTabChange(model.tab) : undefined}
                    className={`group card-surface overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 text-left cursor-pointer`}
                  >
                    <ModelCard model={model} />
                  </button>
                ))}
              </div>

              {/* Comparison Table */}
              <div>
                <div className="text-center mb-8">
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Quick Compare</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">
                    เปรียบเทียบ<span className="text-gradient">ทุกรุ่น</span>
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
                    เลือกรุ่นที่ตรงกับความต้องการ — แต่ละรุ่นปรับแต่งสเปกได้ ราคาขึ้นอยู่กับ CPU และอุปกรณ์เสริม
                  </p>
                </div>

                {/* Category Legend */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {[
                    { color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30", label: "เริ่มต้น / คุ้มค่า" },
                    { color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30", label: "มาตรฐาน / ยอดนิยม" },
                    { color: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30", label: "สเปกสูง / งานหนัก" },
                    { color: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30", label: "Premium / ล่าสุด" },
                  ].map((cat) => (
                    <span key={cat.label} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cat.color}`}>
                      {cat.label}
                    </span>
                  ))}
                </div>

                <div className="card-surface overflow-hidden rounded-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left p-4 font-bold text-foreground sticky left-0 bg-muted/50 min-w-[100px]">รุ่น</th>
                          <th className="text-left p-4 font-bold text-foreground min-w-[120px]">จุดเด่น</th>
                          <th className="text-left p-4 font-bold text-foreground min-w-[180px]">CPU</th>
                          <th className="text-left p-4 font-bold text-foreground min-w-[100px]">RAM</th>
                          <th className="text-center p-4 font-bold text-foreground">COM</th>
                          <th className="text-center p-4 font-bold text-foreground">USB</th>
                          <th className="text-center p-4 font-bold text-foreground">LAN</th>
                          <th className="text-center p-4 font-bold text-foreground">GPIO</th>
                          <th className="text-center p-4 font-bold text-foreground">SIM</th>
                          <th className="text-center p-4 font-bold text-foreground">Display</th>
                          <th className="text-right p-4 font-bold text-foreground min-w-[110px]">เริ่มต้น (฿)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "GT1000", tagline: "เริ่มต้นคุ้มค่า", cpu: "Celeron N2920/N3520", ram: "DDR3L 4–8GB", com: 2, usb: 6, lan: 2, gpio: false, sim: false, display: "VGA+HDMI", price: "15,990", cat: "entry", gen: "Gen 4" },
                          { name: "GT1200", tagline: "คอมแพกต์ ดีไซน์ใหม่", cpu: "i3-6157U / i5 / i7", ram: "DDR3L–DDR4 64GB", com: 2, usb: 6, lan: 2, gpio: false, sim: false, display: "HDMI", price: "สอบถาม", cat: "premium", gen: "Gen 6–8" },
                          { name: "GT1400", tagline: "4 LAN DDR5 สุดแกร่ง", cpu: "i5-8305G / i7-12650HX / i7-13650HX", ram: "DDR4/DDR5 64GB", com: 2, usb: 6, lan: 4, gpio: false, sim: false, display: "HDMI", price: "28,990", cat: "premium", gen: "Gen 8–13" },
                          { name: "GT2000", tagline: "ยอดนิยม 8 USB", cpu: "Celeron 1037U / i5-3317U", ram: "DDR3L 4GB", com: 4, usb: 8, lan: 2, gpio: false, sim: false, display: "VGA+HDMI", price: "15,990", cat: "entry", gen: "Gen 3" },
                          { name: "GT3000", tagline: "6 COM หลากหลาย CPU", cpu: "Celeron / i3 / i5 / i7", ram: "DDR3L 4GB", com: 6, usb: 6, lan: 2, gpio: false, sim: false, display: "VGA+HDMI", price: "สอบถาม", cat: "standard", gen: "Gen 3–4" },
                          { name: "GT4000", tagline: "GPIO + VESA Mount", cpu: "i3 / i5-4200U / i7-4500U", ram: "DDR3L 4–8GB", com: 6, usb: 8, lan: 2, gpio: true, sim: false, display: "VGA+HDMI", price: "24,990", cat: "standard", gen: "Gen 4" },
                          { name: "GT4500", tagline: "DDR4 + SIM 4G/5G", cpu: "i3-6006U / i5-7260U / i5-8250U / i7-8550U", ram: "DDR4 4–8GB", com: 6, usb: 8, lan: 2, gpio: false, sim: true, display: "VGA+HDMI", price: "21,900", cat: "standard", gen: "Gen 6–8" },
                          { name: "GT5000", tagline: "GPIO + SIM IoT Ready", cpu: "i5-4200U / i7-4500U", ram: "DDR3L 4–8GB", com: 6, usb: 8, lan: 2, gpio: true, sim: true, display: "VGA+HDMI", price: "19,490", cat: "standard", gen: "Gen 4" },
                          { name: "GT6000", tagline: "Triple Display DDR4", cpu: "Core i3/i5/i7 Gen 8–10", ram: "DDR4 สูงสุด 64GB", com: 2, usb: 6, lan: 2, gpio: false, sim: false, display: "HDMI×2+DP", price: "สอบถาม", cat: "standard", gen: "Gen 8–10" },
                          { name: "GT7000", tagline: "DDR4 ทนทุกโรงงาน", cpu: "i3 / i5 / i7 (DDR4)", ram: "DDR4 4–32GB", com: 6, usb: 6, lan: 2, gpio: false, sim: false, display: "VGA+HDMI", price: "สอบถาม", cat: "high", gen: "Gen 6–8" },
                          { name: "GT8000", tagline: "Dual HDMI + SIM 4G", cpu: "i5-1035G1 / i7-10710U", ram: "DDR4 สูงสุด 64GB", com: 2, usb: 6, lan: 2, gpio: false, sim: true, display: "HDMI×2", price: "สอบถาม", cat: "high", gen: "Gen 10" },
                          { name: "GT9000", tagline: "Triple Display 8 COM", cpu: "i5-10200H / i7-10750H / i5-1235U / i7-1255U", ram: "DDR4/DDR5 32GB", com: 8, usb: 8, lan: 2, gpio: false, sim: false, display: "HDMI×2+DP", price: "25,290", cat: "high", gen: "Gen 10–12" },
                        ].map((row) => {
                          const catStyle = row.cat === "entry"
                            ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                            : row.cat === "standard"
                            ? "bg-blue-500/5 hover:bg-blue-500/10"
                            : row.cat === "high"
                            ? "bg-amber-500/5 hover:bg-amber-500/10"
                            : "bg-purple-500/5 hover:bg-purple-500/10";
                          const catBadge = row.cat === "entry"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : row.cat === "standard"
                            ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                            : row.cat === "high"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-purple-500/20 text-purple-600 dark:text-purple-400";
                          return (
                            <tr
                              key={row.name}
                              className={`border-b border-border/50 transition-colors cursor-pointer ${catStyle}`}
                              onClick={() => handleTabChange(row.name.toLowerCase())}
                            >
                              <td className="p-4 sticky left-0 font-bold text-foreground" style={{ background: 'inherit' }}>
                                <div className="flex flex-col gap-1">
                                  <span className="text-base">{row.name}</span>
                                  <span className={`inline-block w-fit px-2 py-0.5 rounded-full text-[10px] font-bold ${catBadge}`}>
                                    {row.gen}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-xs text-muted-foreground leading-tight block">{row.tagline}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-xs text-foreground font-mono leading-tight block">{row.cpu}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-xs text-muted-foreground">{row.ram}</span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                  row.com >= 8 ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                                  row.com >= 6 ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" :
                                  "bg-muted text-muted-foreground"
                                }`}>{row.com}</span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                  row.usb >= 8 ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                                  "bg-muted text-muted-foreground"
                                }`}>{row.usb}</span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                  row.lan >= 4 ? "bg-purple-500/20 text-purple-600 dark:text-purple-400" :
                                  "bg-muted text-muted-foreground"
                                }`}>{row.lan}</span>
                              </td>
                              <td className="p-4 text-center">
                                {row.gpio ? (
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓</span>
                                ) : (
                                  <span className="text-muted-foreground/40">—</span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {row.sim ? (
                                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓</span>
                                ) : (
                                  <span className="text-muted-foreground/40">—</span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                <span className="text-xs text-muted-foreground">{row.display}</span>
                              </td>
                              <td className="p-4 text-right">
                                <span className={`font-bold text-sm ${row.price === "สอบถาม" ? "text-muted-foreground" : "text-primary"}`}>
                                  {row.price === "สอบถาม" ? "สอบถาม" : `฿${row.price}`}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Decision Helper */}
                  <div className="p-6 bg-muted/30 border-t border-border">
                    <h4 className="font-bold text-foreground mb-4 text-sm">🎯 เลือกรุ่นไหนดี?</h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">งบจำกัด / งานเบา</div>
                        <div className="text-xs text-muted-foreground">GT1000 หรือ GT2000 — Celeron ประหยัด เพียงพอสำหรับ POS, Signage, ระบบคิว</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400">ต้องการ COM เยอะ / IoT</div>
                        <div className="text-xs text-muted-foreground">GT3000–GT5000 — 6 COM + GPIO/SIM เหมาะเชื่อมเซ็นเซอร์ PLC หลายตัว</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-amber-600 dark:text-amber-400">สเปกแรง / งานหนัก</div>
                        <div className="text-xs text-muted-foreground">GT7000–GT9000 — DDR4/DDR5 + i5/i7 Gen 10–12 สำหรับ SCADA, AI Edge, Vision</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400">เน็ตเวิร์ก / ดีไซน์ใหม่</div>
                        <div className="text-xs text-muted-foreground">GT1400 — 4 LAN + DDR5 สำหรับ Firewall, Router หรืองาน Network Appliance</div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  * ราคาขึ้นอยู่กับ CPU, RAM, Storage ที่เลือก — คลิกที่แถวเพื่อดูรายละเอียดแต่ละรุ่น
                </p>
              </div>
            </div>
          )}

          {/* Tab: GT1000 Detail */}
          {activeTab === "gt1000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt1000Banner}
                  alt="GT1000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    Best Seller · Fanless · 2 LAN · 2 COM
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">1000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    รุ่นเริ่มต้น คุ้มค่า — เล็กแต่แกร่ง ทำงาน 24/7
                  </p>
                </div>
              </div>

              {/* Product Gallery + Key Info */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      Best Seller
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">1000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial Mini PC เกรดอุตสาหกรรม โครง Brushed Aluminum Alloy สีดำ ดีไซน์พรีเมียม
                      ระบบ Fanless เงียบสนิท 0 เดซิเบล ทำงานต่อเนื่อง 24 ชั่วโมง ไม่มีพัดลม ไม่ดูดฝุ่น
                      ทนอุณหภูมิ 0–60°C เหมาะกับทุกสภาพแวดล้อมอุตสาหกรรม
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    พร้อม <strong className="text-foreground">2× Gigabit LAN + 2× RS232 COM + SIM Card Slot</strong> รองรับ 3G/4G Module,
                    ติดตั้ง mSATA SSD + 2.5" SATA HDD พร้อมกัน, แสดงผล VGA + HDMI Dual Display,
                    Built-in WiFi/Bluetooth พร้อมเสาอากาศคู่ภายนอก, ยึดติดผนังได้ (Wall Mount)
                  </p>

                  {/* Key Features from Factory */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Cpu, title: "CPU", desc: "Intel Celeron N2920 / N3520", sub: "Quad-Core, TDP 7.5W" },
                      { icon: Server, title: "RAM & Storage", desc: "DDR3L 4–8 GB", sub: "mSATA SSD + 2.5\" SATA HDD" },
                      { icon: Shield, title: "2 LAN · 2 COM", desc: "Gigabit Ethernet × 2", sub: "RS232 × 2 + SIM Slot" },
                      { icon: Wind, title: "Fanless 24/7", desc: "เงียบ 0 dB ไม่มีพัดลม", sub: "โครงอลูมิเนียมระบายความร้อน" },
                      { icon: Monitor, title: "Dual Display", desc: "VGA + HDMI พร้อมกัน", sub: "รองรับ 2 จอพร้อมกัน" },
                      { icon: Zap, title: "Low Power", desc: "12V DC-IN ประหยัดไฟ", sub: "USB 6 (2×3.0 + 4×2.0)" },
                    ].map((f) => (
                      <div key={f.title} className="card-surface p-4">
                        <f.icon className="text-primary mb-2" size={20} />
                        <div className="font-bold text-foreground text-sm">{f.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">{f.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Use Cases */}
                  <div className="card-surface p-5">
                    <h4 className="font-bold text-foreground mb-3 text-sm">รองรับงานหลากหลาย</h4>
                    <div className="flex flex-wrap gap-2">
                      {["โรงงานอุตสาหกรรม", "Factory Automation", "IOT Gateway", "KIOSK", "HMI", "Digital Signage", "Queue System", "ATM/Bank", "Transportation", "ตู้คอนโทรล", "โรงเรียน/มหาวิทยาลัย", "Telecom"].map((uc) => (
                        <span key={uc} className="px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs border border-border">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Images Gallery — ภาพจริงจากโรงงาน */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874413.jpg"
                      alt="GT1000 ด้านหน้า — 2 LAN, HDMI, VGA, MIC, SPK"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874414.jpg", alt: "GT1000 ด้านหลัง — USB, COM ports" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874418.jpg", alt: "GT1000 ด้านข้าง — ครีบระบายความร้อน" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874416.jpg", alt: "GT1000 ด้านล่าง — VESA Mount" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874419.jpg", alt: "GT1000 ภายใน — Mainboard + WiFi" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec Table — ข้อมูลจริงจากโรงงาน */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT1000 Specifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลจาก Manufacturer · Intel Bay Trail Platform</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {[
                        { cat: "General", items: [
                          { label: "CPU", value: "Intel Pentium N3520 (2.16GHz, Quad-Core, Turbo Boost) / Celeron N2920 (1.86GHz, Quad-Core, Turbo 2.0GHz)" },
                          { label: "Core (FSB)", value: "100MHz" },
                          { label: "CPU Technique", value: "22nm" },
                          { label: "L3 Cache", value: "2 MB, CPU Integrated" },
                          { label: "Motherboard", value: "Intel CRESCENTBAY (Lynx Point-LP), Support GPIO" },
                          { label: "BIOS", value: "AMI BIOS, ACPI Supported, Auto Power On" },
                          { label: "Chipset", value: "Intel BTY SOC" },
                        ]},
                        { cat: "Memory & Storage", items: [
                          { label: "Memory", value: "1× SO-DIMM DDR3L Slot, 4GB/8GB DDR3L 1333MHz (Optional)" },
                          { label: "Storage", value: "1× mSATA SSD: 16G–1TB + 1× SATA HDD: 320G–1TB (Optional)" },
                        ]},
                        { cat: "I/O Ports", items: [
                          { label: "Front Panel", value: "1× Switch On/Off, 1× LED, 2× USB 3.0, 4× USB 2.0, 2× RS232/422/485 COM" },
                          { label: "Backside", value: "1× MIC, 1× SPK, 2× RJ45 LAN, 1× HDMI, 1× VGA, 1× DC-IN, 2× WiFi Antenna" },
                          { label: "COM", value: "2× RS232/RS422/RS485 (เปลี่ยนจาก BIOS ได้)" },
                          { label: "Internal", value: "1× M-SATA 3.0 (6Gb/s), 1× SATA 3.0 (6Gb/s), 1× mini PCIe-half (WiFi), 1× mini PCIe-full (4G)" },
                          { label: "SIM Slot", value: "Micro SIM พร้อม Push Function (ด้านข้าง)" },
                        ]},
                        { cat: "Display & Audio", items: [
                          { label: "Video", value: "Intel Haswell ULT Integrated Graphics, Intel HD Graphics" },
                          { label: "Display Output", value: "VGA + HDMI (Dual Display Synchronous)" },
                          { label: "Audio", value: "ALC662 HD Audio, 6 Channel Sound" },
                        ]},
                        { cat: "Network", items: [
                          { label: "LAN", value: "Onboard Intel i211 Gigabit × 2, 10/100/1000Mbps BaseT" },
                          { label: "WiFi / BT", value: "Built-in WiFi + Bluetooth (Dual Antenna, Optional)" },
                        ]},
                        { cat: "Power & Environment", items: [
                          { label: "Input", value: "DC 100–240V AC / 50–60Hz" },
                          { label: "Output", value: "DC 12V / 5A" },
                          { label: "Consumption", value: "10W" },
                          { label: "Operating Temp", value: "-10°C ~ 60°C (22°F ~ 130°F)" },
                          { label: "Storage Temp", value: "-20°C ~ 80°C (-68°F ~ 176°F)" },
                          { label: "Humidity", value: "10%–90% (Non-condensing)" },
                        ]},
                        { cat: "Dimension", items: [
                          { label: "Size", value: "175 × 125 × 37 mm" },
                          { label: "Net Weight", value: "0.85 kg" },
                          { label: "Gross Weight", value: "1.5 kg (รวม Package)" },
                          { label: "Mounting", value: "VESA 100×100mm / Wall Mount" },
                          { label: "OS Support", value: "Windows 7 / 8 / 10 / Linux" },
                        ]},
                      ].map((section) => (
                        <>
                          <tr key={section.cat} className="bg-secondary/40">
                            <td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">{section.cat}</td>
                          </tr>
                          {section.items.map((spec) => (
                            <tr key={spec.label} className="hover:bg-secondary/30 transition-colors">
                              <td className="p-3 font-semibold text-foreground w-[160px] whitespace-nowrap text-xs">{spec.label}</td>
                              <td className="p-3 text-muted-foreground text-xs">{spec.value}</td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Port Diagrams */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_d438441c66734588bf92c3cb77e08aae~mv2.jpg/v1/crop/x_0,y_0,w_1998,h_571/fill/w_1218,h_348,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.jpg"
                    alt="GT1000 Connectivity Diagram"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_813ed70f44da4e72b1f8d881cd8b30d9~mv2.png/v1/fill/w_1313,h_466,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_813ed70f44da4e72b1f8d881cd8b30d9~mv2.png"
                    alt="GT1000 Port Layout"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GT1000 Price Table */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT1000 Price List</h3>
                  <p className="text-xs text-muted-foreground mt-1">ราคารวม VAT แล้ว · รับประกัน 1 ปี</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground min-w-[280px]">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                        <th className="text-left p-3 font-semibold text-foreground">หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { model: "N2920", config: "RAM DDR3L 4GB + SSD 128GB + WiFi", price: "15,990", remark: "" },
                        { model: "N2920", config: "RAM DDR3L 8GB + SSD 128GB + WiFi", price: "16,990", remark: "" },
                        { model: "N2920", config: "RAM 4GB / SSD 128GB / 4G Module (Long Antenna)", price: "18,990", remark: "รองรับ SIM 4G LTE" },
                        { model: "N2920", config: "RAM 4GB / SSD 128GB / 4G / Windows 10 Pro", price: "21,990", remark: "รวม Windows 10 Pro OEM" },
                        { model: "N2920", config: "RAM DDR3L 8GB + SSD 256GB + WiFi", price: "18,990", remark: "รวม Windows 10 Pro OEM" },
                        { model: "N3520", config: "RAM DDR3L 4GB + SSD 128GB + WiFi", price: "17,990", remark: "CPU เร็วกว่า" },
                        { model: "N3520", config: "RAM DDR3L 8GB + SSD 128GB + WiFi", price: "18,990", remark: "" },
                        { model: "N3520", config: "RAM 4GB / SSD 128GB / 4G Module (Long Antenna)", price: "21,990", remark: "รองรับ SIM 4G LTE" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium font-mono">{item.model}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary whitespace-nowrap">฿{item.price}</td>
                          <td className="p-3 text-xs text-muted-foreground">{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real-world Photos */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-4">ภาพการติดตั้งจริง</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "https://static.wixstatic.com/media/0597a3_9f94339201574aab951ca7e05b0b5b8b~mv2_d_2048_2048_s_2.jpg/v1/fill/w_340,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0017.jpg",
                    "https://static.wixstatic.com/media/0597a3_0565d74067c7475989c641caa9e558ee~mv2_d_2048_2048_s_2.jpg/v1/fill/w_305,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0015.jpg",
                    "https://static.wixstatic.com/media/0597a3_1a4e692b890345f5a8d2ca2aa85ee5d1~mv2_d_2048_2048_s_2.jpg/v1/fill/w_330,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0016.jpg",
                  ].map((img, i) => (
                    <div key={i} className="card-surface overflow-hidden aspect-square rounded-xl">
                      <img src={img} alt={`GT1000 ติดตั้งจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT1000</h3>
                </div>
                <a
                  href="https://www.entgroup.co.th/ipc-gt1000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <img
                    src="https://static.wixstatic.com/media/3e5003_1654215f900c48fdbc594d46658d067b~mv2.jpg/v1/fill/w_1270,h_590,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/22.jpg"
                    alt="GT1000 Video Thumbnail"
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-primary-foreground ml-1" size={28} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">
                      GT1000 Detail Specification — 02:00
                    </span>
                  </div>
                </a>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/3e5003_1c53b682c4294201b754a854bda9656d.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT1000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT2000 Detail */}
          {activeTab === "gt2000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt2000Banner}
                  alt="GT2000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    Best Seller · 8 USB · 4 COM
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">2000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    ยอดนิยม 8 USB + 4 COM — พร้อมรองรับ Windows XP
                  </p>
                </div>
              </div>

              {/* Description + Product Image */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      Best Seller · 8 USB · 4 COM
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">2000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial PC คือเครื่องคอมพิวเตอร์เกรดอุตสาหกรรมขนาดเล็ก ที่ถูกออกแบบมาเพื่อรองรับการทำงาน
                      ในสภาวะแวดล้อมที่มีอุณหภูมิสูง ฝุ่นละอองหนาแน่น โดยออกแบบให้มีการระบายความร้อนได้ดีและทนความร้อนได้สูง
                      จึงเป็นเหตุผลที่ทำให้ GT2000 ทำงานได้อย่างมีประสิทธิภาพเหมาะสมกับงานอุตสาหกรรมทุกประเภทในปัจจุบัน
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🔇 Fanless Design — Silent Workhorse</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      GT2000 ใช้ระบบ Fanless Design เงียบ 0 เดซิเบล โดยใช้โครงสร้าง Full Aluminum Alloy สีดำแบบ brushed finish
                      ทำหน้าที่เป็น heatsink ขนาดใหญ่ ระบายความร้อนแบบ passive cooling ไม่มีพัดลม ทำงานได้ 24 ชั่วโมงต่อเนื่อง
                      ทนอุณหภูมิ 0-60°C เหมาะสำหรับสภาพแวดล้อมโรงงานที่มีฝุ่นละออง เพราะไม่มีการดูดอากาศ
                    </p>
                  </div>

                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Intel Celeron 1037U / Core i5-3317U</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR3L 4–8 GB / SSD 128–512 GB</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">8 USB + 4 COM</div>
                      <div className="text-xs text-muted-foreground mt-1">USB 3.0×4 + 2.0×4, RS232×4</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Wind className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">15W TDP</div>
                      <div className="text-xs text-muted-foreground mt-1">Fanless 0 dB ทำงาน 24/7</div>
                    </div>
                  </div>
                </div>

                {/* Product Images */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg/v1/fill/w_536,h_954,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg"
                      alt="GT2000 Front"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      "https://static.wixstatic.com/media/005637_58feaede6057451aa5fd7afe6ec6f880~mv2.jpg/v1/fill/w_294,h_196,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_58feaede6057451aa5fd7afe6ec6f880~mv2.jpg",
                      "https://static.wixstatic.com/media/005637_ab944bafb9764a7c9fec363c2e2c8ef5~mv2.jpg/v1/fill/w_294,h_196,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_ab944bafb9764a7c9fec363c2e2c8ef5~mv2.jpg",
                      "https://static.wixstatic.com/media/005637_bade0d66426d44dea1328e1b2eb149b1~mv2.jpg/v1/fill/w_294,h_196,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_bade0d66426d44dea1328e1b2eb149b1~mv2.jpg",
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden">
                        <img src={img} alt={`GT2000 มุมมอง ${i + 2}`} className="w-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "https://static.wixstatic.com/media/005637_9a8e5e98c73b46a8981bfbd6ef8f682c~mv2.jpg/v1/fill/w_294,h_196,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_9a8e5e98c73b46a8981bfbd6ef8f682c~mv2.jpg",
                      "https://static.wixstatic.com/media/005637_78842837709848ea983945436f0822ee~mv2.jpg/v1/fill/w_294,h_196,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_78842837709848ea983945436f0822ee~mv2.jpg",
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden">
                        <img src={img} alt={`GT2000 ติดตั้งจริง ${i + 1}`} className="w-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chassis Cooling Technology */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🌡️ Chassis Cooling Technology
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      GT2000 ใช้เทคโนโลยี Chassis Cooling ที่โดดเด่น โดยตัวเครื่องทั้งหมดทำหน้าที่เป็น heatsink ยักษ์
                      ด้วยครีบระบายความร้อนอลูมิเนียมที่ออกแบบมาพิเศษ ทำให้ความร้อนกระจายออกจากพื้นผิวทั้งหมดอย่างมีประสิทธิภาพ
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> เงียบสนิท 0 เดซิเบล — ไม่มีพัดลม</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> โครงสร้างอลูมิเนียมแข็งแรงทนทาน</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ประหยัดไฟเพียง 15W ทำงาน 24/7</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ไม่ดูดอากาศ ปลอดฝุ่น เหมาะกับโรงงาน</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ไม่มีชิ้นส่วนเคลื่อนไหว = เสถียรสูง</li>
                    </ul>
                  </div>
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/3e5003_6bf58ba61ae245ea82f96cb2171fb9b7~mv2.jpg/v1/fill/w_732,h_264,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8.jpg"
                      alt="GT2000 Chassis Cooling"
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* CPU Detail */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  ⚡ CPU — Intel Celeron 1037U
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_2f4f2a02ac1542fb8ce44f6b78f5c5f9~mv2.png/v1/fill/w_657,h_346,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2012_52_19.png"
                      alt="GT2000 CPU Detail"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Intel Celeron 1037U (22nm Ivy Bridge) แบบ dual-core 2 threads ความเร็ว 1.8GHz
                      พร้อม Intel Ivy Bridge Graphics Controller รองรับความละเอียด 1920×1080 HD
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      ออกแบบมาเพื่องานอุตสาหกรรมที่ต้องการความเสถียรสูง ประหยัดไฟเพียง 15W ทำงาน 24 ชั่วโมงต่อเนื่อง
                      เหมาะสำหรับการควบคุมเครื่องจักร ระบบ monitoring และ<strong className="text-foreground"> รองรับ Windows XP</strong> ที่หายากในยุคปัจจุบัน
                    </p>
                  </div>
                </div>
              </div>

              {/* I/O Port Diagram */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🔌 I/O Port — ครบครันสำหรับงานอุตสาหกรรม
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src="https://static.wixstatic.com/media/0597a3_126df8ab2d554a9a8b4a6074fe4f7647~mv2.png/v1/crop/x_0,y_0,w_2136,h_669/fill/w_1235,h_387,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2012_59_44.png"
                      alt="GT2000 I/O Ports Front"
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <img
                      src="https://static.wixstatic.com/media/0597a3_dac94b90d7444622918e2fe4f69de597~mv2.png/v1/fill/w_600,h_244,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2012_55_25.png"
                      alt="GT2000 I/O Ports Rear"
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  {[
                    { label: "USB 8 ports", desc: "4× USB 3.0 + 4× USB 2.0 — barcode, camera, external storage" },
                    { label: "Dual Display", desc: "HDMI + VGA — 2 หน้าจอสำหรับ control room & monitoring" },
                    { label: "2 Gigabit LAN", desc: "แยกเครือข่ายระบบผลิตและ office เพิ่มความปลอดภัย" },
                    { label: "4 RS232 COM Port", desc: "เชื่อมต่อเครื่องจักรเก่า PLC และ sensors" },
                    { label: "Audio Port", desc: "สำหรับระบบแจ้งเตือน" },
                    { label: "ขนาดกะทัดรัด", desc: "23.4×15×4.8 cm น้ำหนัก 1.5 kg — wall mount ได้" },
                  ].map((item, i) => (
                    <div key={i} className="card-surface p-3">
                      <div className="font-bold text-foreground mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Port Diagram Full */}
              <div className="card-surface p-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_4843a18b6dfe4330bd22479aadd69b1d~mv2.png/v1/fill/w_1058,h_1208,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2013_21_27.png"
                  alt="GT2000 Full Port Diagram"
                  className="w-full max-w-2xl mx-auto rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* OS Support */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  💻 รองรับ OS หลากหลาย — รวมถึง Windows XP!
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      GT2000 รองรับระบบปฏิบัติการหลากหลาย ตั้งแต่ Windows 7, 8, 10, Linux และที่เด่นที่สุดคือ
                      <strong className="text-foreground"> Windows XP</strong> ซึ่งหายากมากในยุคปัจจุบัน
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      จุดเด่นนี้ทำให้ GT2000 เป็นตัวเลือกเฉพาะสำหรับโรงงานที่ยังใช้เครื่องจักรเก่าหรือซอฟต์แวร์ legacy
                      ที่ต้องการ XP เป็นพิเศษ ให้ความยืดหยุ่นในการใช้งานและขยายอายุการใช้งานของระบบเดิมได้อย่างมีประสิทธิภาพ
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_b5efadfa0e7b40619c90fec704966b11~mv2.png/v1/fill/w_663,h_422,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2012_45_39.png"
                      alt="GT2000 OS Support"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Dimension */}
              <div className="card-surface p-6 text-center">
                <h4 className="text-lg font-display font-bold text-foreground mb-4">📐 ขนาดกะทัดรัด</h4>
                <p className="text-muted-foreground mb-4">
                  เพียง 23.4 × 15 × 4.8 cm น้ำหนัก 1.5 kg — ประมาณขนาดหนังสือเล่มใหญ่ ประหยัดพื้นที่ติดตั้ง wall mount ได้ เคลื่อนย้ายสะดวก
                </p>
                <img
                  src="https://static.wixstatic.com/media/0597a3_46573ca6a9a644e29b30118c4f839098~mv2.png/v1/fill/w_436,h_406,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2013_36_44.png"
                  alt="GT2000 Dimensions"
                  className="max-w-sm mx-auto rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Spec Summary */}
              <div className="card-surface overflow-hidden">
                <div className="p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_8cc69bc674294dc9907277ccf8235ad1~mv2.png/v1/fill/w_1036,h_700,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-11%20at%2013_34_30.png"
                    alt="GT2000 Spec Summary"
                    className="w-full max-w-xl mx-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GT2000 Price Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">💰 GT2000 Price List</h3>
                  <p className="text-sm text-muted-foreground mt-1">รับประกัน 1 ปี ทุกรุ่น</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { cpu: "Celeron 1037U", config: "RAM DDR3L 4GB + SSD 128GB + WIFI", price: "16,990" },
                        { cpu: "Celeron 1037U", config: "RAM DDR3L 4GB + SSD 256GB + WIFI", price: "15,990" },
                        { cpu: "Celeron 1037U", config: "RAM DDR3L 8GB + SSD 128GB + WIFI", price: "15,990" },
                        { cpu: "Celeron 1037U", config: "RAM DDR3L 8GB + SSD 256GB + WIFI", price: "16,990" },
                        { cpu: "Core i5-3317U", config: "RAM DDR3L 4GB + SSD 128GB + WIFI", price: "18,990" },
                        { cpu: "Core i5-3317U", config: "RAM DDR3L 4GB + SSD 256GB + WIFI", price: "19,990" },
                        { cpu: "Core i5-3317U", config: "RAM DDR3L 4GB + SSD 512GB + WIFI", price: "21,990" },
                        { cpu: "Core i5-3317U", config: "RAM DDR3L 8GB + SSD 128GB + WIFI", price: "18,990" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium">{item.cpu}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary">฿{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT2000</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-0 md:divide-x divide-border">
                  <a
                    href="https://www.youtube.com/watch?v=XLhFAF_8Da4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src="https://img.youtube.com/vi/XLhFAF_8Da4/maxresdefault.jpg"
                      alt="เปิดตัวน้องใหม่ Mini GT2000"
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">เปิดตัว Mini GT2000 — 04:53</span>
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=ifkzyVY9Z-g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src="https://img.youtube.com/vi/ifkzyVY9Z-g/maxresdefault.jpg"
                      alt="การเลือกซื้อคอมพิวเตอร์สำหรับงานอุตสาหกรรม GT Series"
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">การเลือกซื้อ GT Series — 14:20</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Datasheet CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/3e5003_2ec45fc02f844ea7a10372cb6b9006bd.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> Datasheet GT2000 Celeron
                </a>
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_8c19b311f6864f2281173416d4678d2d.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
                >
                  <Download size={16} /> Datasheet GT2000 Core i5
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT3000 Detail */}
          {activeTab === "gt3000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt3000Banner}
                  alt="GT3000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    6 COM · Multi CPU · Fanless
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">3000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    6 COM หลากหลาย CPU — เลือกสเปกให้ตรงงาน
                  </p>
                </div>
              </div>

              {/* Description + Product Images */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      6 COM · Multi CPU · Fanless
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">3000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial Mini PC โครง Brushed Aluminum Alloy สีดำ ระบบ Fanless เงียบสนิท ทำงานต่อเนื่อง 24 ชม.
                      พร้อม <strong className="text-foreground">2× RS232 COM Port</strong> รองรับ mSATA SSD + 2.5" SATA HDD พร้อมกัน,
                      แสดงผล VGA + HDMI Dual Display, Built-in WiFi/Bluetooth พร้อมเสาอากาศคู่, ยึดผนังได้
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🔧 เลือก CPU ได้หลากหลายรุ่น</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      รองรับตั้งแต่ Celeron สำหรับงานเบา ไปจนถึง Core i3/i5/i7 สำหรับงานหนัก —
                      เลือก CPU ให้สอดคล้องกับกิจกรรมเพื่อเสถียรภาพสูงสุด
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Cpu, title: "CPU", desc: "Gen i3 / i5 / i7 / Celeron", sub: "หลากหลาย CPU ให้เลือก" },
                      { icon: Server, title: "RAM & Storage", desc: "DDR3L 4 GB", sub: "mSATA SSD + 2.5\" SATA HDD" },
                      { icon: Shield, title: "2 COM · 6 USB", desc: "RS232 × 2 + USB 6 ports", sub: "2 LAN Gigabit, VGA+HDMI" },
                      { icon: Wind, title: "Fanless 24/7", desc: "เงียบ 0 dB ไม่มีพัดลม", sub: "อลูมิเนียมระบายความร้อน" },
                      { icon: Monitor, title: "Dual Display", desc: "VGA + HDMI พร้อมกัน", sub: "MIC + SPK Audio" },
                      { icon: Zap, title: "Compact", desc: "15 × 21.7 × 5.2 cm", sub: "1.289 kg · Wall Mount" },
                    ].map((f) => (
                      <div key={f.title} className="card-surface p-4">
                        <f.icon className="text-primary mb-2" size={20} />
                        <div className="font-bold text-foreground text-sm">{f.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">{f.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Use Cases */}
                  <div className="card-surface p-5">
                    <h4 className="font-bold text-foreground mb-3 text-sm">รองรับงานหลากหลาย</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Bank ATM", "Factory Automation", "Digital Signage", "Robot Control", "Transportation", "Telecom", "KIOSK", "PLC Control"].map((uc) => (
                        <span key={uc} className="px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs border border-border">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Images — ภาพจริงจากโรงงาน */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874079.jpg"
                      alt="GT3000 ด้านหน้า — USB3.0, LAN, VGA, HDMI, COM"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874078.jpg", alt: "GT3000 ด้านหลัง — USB, COM ports" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874077.jpg", alt: "GT3000 ด้านข้าง — ครีบระบายความร้อน" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874075.jpg", alt: "GT3000 มุมบน — Heatsink" },
                      { src: "https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874080.jpg", alt: "GT3000 ภายใน — Mainboard" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec Table — 2 คอลัมน์ */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT3000 Specifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลจาก Manufacturer</p>
                </div>
                <div className="grid md:grid-cols-2 md:divide-x divide-border">
                  {/* Left Column */}
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">General</td></tr>
                        {[
                          { label: "CPU", value: "Gen i3 / i5 / i7 / Celeron" },
                          { label: "Chipset", value: "Intel SOC" },
                          { label: "Memory", value: "1× SO-DIMM DDR3L, 4–8GB" },
                          { label: "Storage", value: "mSATA SSD + 2.5\" SATA HDD" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">I/O Ports</td></tr>
                        {[
                          { label: "COM", value: "2× RS232 (DB9)" },
                          { label: "USB", value: "2× USB 3.0 + 4× USB 2.0" },
                          { label: "LAN", value: "2× Gigabit Ethernet" },
                          { label: "Display", value: "VGA + HDMI Dual Display" },
                          { label: "Audio", value: "MIC + SPK (3.5mm)" },
                          { label: "WiFi", value: "WiFi + BT (Dual Antenna)" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Right Column */}
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">Power & Environment</td></tr>
                        {[
                          { label: "Power", value: "DC 12V" },
                          { label: "Cooling", value: "Fanless Aluminum Heatsink" },
                          { label: "Temp", value: "0°C ~ 60°C" },
                          { label: "Mounting", value: "Wall Mount (Screws)" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">Dimension</td></tr>
                        {[
                          { label: "Size", value: "150 × 217 × 52 mm" },
                          { label: "Weight", value: "1.289 kg" },
                          { label: "OS", value: "Win 7 / 8 / 10 / Linux" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Port Diagrams */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_da8e76c7792f47e5a3a39288166d69f9~mv2.png/v1/fill/w_774,h_408,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png"
                    alt="GT3000 I/O Diagram"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_fadd401364de4b7d9e31669c96695798~mv2.jpg/v1/crop/x_6,y_15,w_1988,h_718/fill/w_1277,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7.jpg"
                    alt="GT3000 Connectivity"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Heatsink Design */}
              <div className="card-surface p-6 md:p-8 rounded-2xl">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🌡️ Heatsink = ตัวเครื่อง — ออกแบบมาเพื่อโรงงาน
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      GT3000 รองรับการทำงานในสภาพแวดล้อมที่คอมพิวเตอร์ทั่วไปไม่สามารถทำงานได้
                      เนื่องจากตัวเครื่องได้รับการออกแบบให้มีความทนทานเป็นพิเศษ มีครีบระบายความร้อนและไม่มีพัดลม
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ป้องกันฝุ่นละออง สารเคมี แมลง เข้าสู่ตัวเครื่อง</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> Heatsink คือตัวเครื่อง — ระบายความร้อนจากทุกพื้นผิว</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ไม่มีชิ้นส่วนเคลื่อนไหว = เสถียรสูง ทำงาน 24/7</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✓</span> ทนอุณหภูมิ 0-60°C อย่างต่อเนื่อง</li>
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-muted/30">
                    <img
                      src="https://nwzimg.wezhan.net/contents/sitefiles3606/18032321/images/5874076.jpg"
                      alt="GT3000 Heatsink Side View"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Real-world Photos */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-4">ภาพการติดตั้งจริง</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "https://static.wixstatic.com/media/005637_e654106986614352bf4e71dcddee89f6~mv2.jpg/v1/fill/w_420,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_e654106986614352bf4e71dcddee89f6~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_df6c79b56ee140a58a0eac288558f5b8~mv2.jpg/v1/fill/w_420,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_df6c79b56ee140a58a0eac288558f5b8~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_1174e23efc0b4aa6953f47d889694eca~mv2.jpg/v1/fill/w_420,h_280,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_1174e23efc0b4aa6953f47d889694eca~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_60e2fe696a194526af7db7f90b6ac4bd~mv2.jpg/v1/fill/w_420,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/S__12394925.jpg",
                  ].map((img, i) => (
                    <div key={i} className="card-surface overflow-hidden aspect-square rounded-xl">
                      <img src={img} alt={`GT3000 ติดตั้งจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT3000</h3>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=ifkzyVY9Z-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <img
                    src="https://img.youtube.com/vi/ifkzyVY9Z-g/maxresdefault.jpg"
                    alt="การเลือกซื้อคอมพิวเตอร์สำหรับงานอุตสาหกรรม GT Series"
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-primary-foreground ml-1" size={28} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">
                      การเลือกซื้อ GT Series — 14:20
                    </span>
                  </div>
                </a>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://0597a32c-bc3b-4e42-bded-1a51fba8f70b.usrfiles.com/ugd/005637_2b911a4352f34910b8335bf03b624721.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT3000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT4000 Detail */}
          {activeTab === "gt4000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img src={gt4000Banner} alt="GT4000 Industrial PC" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    6 COM · 8 USB · GPIO · VESA Mount
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">4000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    GPIO พร้อมใช้ VESA Mount — ควบคุมระบบอัตโนมัติ
                  </p>
                </div>
              </div>

              {/* Description + Product Images */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      6 COM · 8 USB · GPIO · VESA
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">4000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial Mini PC โครง Brushed Aluminum Alloy สีดำ ระบบ Fanless เงียบสนิท ทำงานต่อเนื่อง 24 ชม.
                      พร้อม <strong className="text-foreground">6× RS232 COM + 8× USB + GPIO + SIM 4G</strong>,
                      VGA + HDMI Dual Display, Built-in WiFi/Bluetooth เสาอากาศคู่, VESA Mount / Wall Mount
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🏭 ออกแบบมาเพื่อโรงงานโดยเฉพาะ</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ทนทานต่อสภาพแวดล้อมที่เต็มไปด้วยน้ำมัน ฝุ่นละออง และความร้อน รองรับ VESA Mounting
                      บนรถกอล์ฟ โฟคลิฟท์ หรือตู้คอนเทนเนอร์ — สมบูรณ์แบบสำหรับขยายไลน์ผลิต
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Cpu, title: "CPU", desc: "Intel Core i3 / i5-4200U / i7-4500U", sub: "Haswell Gen 4, TDP 15W" },
                      { icon: Server, title: "RAM & Storage", desc: "DDR3L 4–8 GB", sub: "mSATA SSD + 2.5\" SATA HDD" },
                      { icon: Shield, title: "6 COM · 8 USB · GPIO", desc: "RS232×6 + USB 3.0×2 + USB 2.0×6", sub: "2 LAN Gigabit + SIM 4G" },
                      { icon: Wind, title: "Fanless + VESA", desc: "เงียบ 0 dB ติดตั้งได้ทุกที่", sub: "อลูมิเนียมระบายความร้อน" },
                      { icon: Monitor, title: "Dual Display", desc: "VGA + HDMI พร้อมกัน", sub: "MIC + SPK Audio" },
                      { icon: Zap, title: "Compact", desc: "17.7 × 21.7 × 5.2 cm", sub: "1.516 kg · Wall/VESA Mount" },
                    ].map((f) => (
                      <div key={f.title} className="card-surface p-4">
                        <f.icon className="text-primary mb-2" size={20} />
                        <div className="font-bold text-foreground text-sm">{f.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
                        <div className="text-[11px] text-muted-foreground/70 mt-0.5">{f.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Use Cases */}
                  <div className="card-surface p-5">
                    <h4 className="font-bold text-foreground mb-3 text-sm">รองรับงานหลากหลาย</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Scada", "IOT", "Factory Automation", "KIOSK", "Control Cabinet", "ระบบเครื่องชั่ง", "ควบคุมเครื่องจักร", "Bank ATM"].map((uc) => (
                        <span key={uc} className="px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs border border-border">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Images — ภาพจริงจากโรงงาน */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="/images/gt4000/front.jpg"
                      alt="GT4000 ด้านหน้า — 6 COM, USB, LAN, VGA, HDMI"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "/images/gt4000/rear.jpg", alt: "GT4000 ด้านหลัง — USB, COM ports" },
                      { src: "/images/gt4000/side.jpg", alt: "GT4000 ด้านข้าง — ครีบระบายความร้อน" },
                      { src: "/images/gt4000/angle.jpg", alt: "GT4000 มุมเอียง — ภาพรวม" },
                      { src: "/images/gt4000/mainboard.jpg", alt: "GT4000 ภายใน — Mainboard" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec Table — 2 คอลัมน์ */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT4000 Specifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลจาก Manufacturer</p>
                </div>
                <div className="grid md:grid-cols-2 md:divide-x divide-border">
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">General</td></tr>
                        {[
                          { label: "CPU", value: "i3 / i5-4200U / i7-4500U" },
                          { label: "Chipset", value: "Intel Haswell SoC" },
                          { label: "Memory", value: "1× SO-DIMM DDR3L, 4–8GB" },
                          { label: "Storage", value: "mSATA SSD + 2.5\" SATA HDD" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">I/O Ports</td></tr>
                        {[
                          { label: "COM", value: "6× RS232 (DB9)" },
                          { label: "USB", value: "2× USB 3.0 + 6× USB 2.0" },
                          { label: "LAN", value: "2× Gigabit Ethernet" },
                          { label: "Display", value: "VGA + HDMI Dual Display" },
                          { label: "Audio", value: "MIC + SPK (3.5mm)" },
                          { label: "GPIO", value: "GPIO Header พร้อมใช้" },
                          { label: "SIM", value: "SIM Slot รองรับ 3G/4G" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">Power & Environment</td></tr>
                        {[
                          { label: "Power", value: "DC 12V / 5A" },
                          { label: "Cooling", value: "Fanless Aluminum Heatsink" },
                          { label: "Temp", value: "0°C ~ 60°C" },
                          { label: "WiFi", value: "WiFi + BT (Dual Antenna)" },
                          { label: "Mounting", value: "VESA 100×100 / Wall Mount" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                        <tr className="bg-secondary/40"><td colSpan={2} className="p-3 font-bold text-foreground text-xs tracking-widest uppercase">Dimension</td></tr>
                        {[
                          { label: "Size", value: "177 × 217 × 52 mm" },
                          { label: "Weight", value: "1.516 kg" },
                          { label: "OS", value: "Win 7 / 8 / 10 / Linux" },
                        ].map((s) => (
                          <tr key={s.label} className="hover:bg-secondary/30 transition-colors">
                            <td className="p-2.5 pl-3 font-semibold text-foreground w-[110px] text-xs">{s.label}</td>
                            <td className="p-2.5 text-muted-foreground text-xs">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Port Diagrams */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_a4726520b0df4492b73e8646990df9ce~mv2.jpg/v1/fill/w_1412,h_562,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/gt4000_1.jpg"
                    alt="GT4000 Port Overview"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden rounded-xl">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_91111c3b2ffb41c39bb2978c36ccd01c~mv2.jpg/v1/fill/w_1262,h_683,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.jpg"
                    alt="GT4000 Port Detail"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GT4000 Price Table */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT4000 Price List</h3>
                  <p className="text-xs text-muted-foreground mt-1">ราคารวม VAT แล้ว · รับประกัน 1 ปี</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground">RAM</th>
                        <th className="text-left p-3 font-semibold text-foreground">SSD</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { cpu: "Core i5-4200U", ram: "4GB", ssd: "128GB", price: "24,990" },
                        { cpu: "Core i5-4200U", ram: "4GB", ssd: "256GB", price: "25,990" },
                        { cpu: "Core i5-4200U", ram: "8GB", ssd: "128GB", price: "26,990" },
                        { cpu: "Core i5-4200U", ram: "8GB", ssd: "256GB", price: "27,990" },
                        { cpu: "Core i7-4500U", ram: "4GB", ssd: "128GB", price: "28,990" },
                        { cpu: "Core i7-4500U", ram: "4GB", ssd: "256GB", price: "29,990" },
                        { cpu: "Core i7-4500U", ram: "8GB", ssd: "128GB", price: "30,990" },
                        { cpu: "Core i7-4500U", ram: "8GB", ssd: "256GB", price: "31,990" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium font-mono">{item.cpu}</td>
                          <td className="p-3 text-muted-foreground">{item.ram}</td>
                          <td className="p-3 text-muted-foreground">{item.ssd}</td>
                          <td className="p-3 text-right font-bold text-primary whitespace-nowrap">฿{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real-world Photos */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-4">ภาพการติดตั้งจริง</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "https://static.wixstatic.com/media/0597a3_4ac1380d49e3423594426528de05c9e6~mv2_d_2048_1596_s_2.jpg/v1/fit/w_565,h_440,q_90,enc_avif,quality_auto/0597a3_4ac1380d49e3423594426528de05c9e6~mv2_d_2048_1596_s_2.jpg",
                    "https://static.wixstatic.com/media/0597a3_d40df020f64b4972bea62c0df74acb6f~mv2_d_2048_1596_s_2.jpg/v1/fit/w_565,h_440,q_90,enc_avif,quality_auto/0597a3_d40df020f64b4972bea62c0df74acb6f~mv2_d_2048_1596_s_2.jpg",
                    "https://static.wixstatic.com/media/3e5003_b5289681b81a4e0dbb4e6bd6e3668f69~mv2.jpg/v1/fill/w_1034,h_533,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/111.jpg",
                  ].map((img, i) => (
                    <div key={i} className="card-surface overflow-hidden rounded-xl aspect-video">
                      <img src={img} alt={`GT4000 ติดตั้งจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT4000</h3>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=ifkzyVY9Z-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <img
                    src="https://img.youtube.com/vi/ifkzyVY9Z-g/maxresdefault.jpg"
                    alt="การเลือกซื้อคอมพิวเตอร์สำหรับงานอุตสาหกรรม GT Series"
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-primary-foreground ml-1" size={28} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">
                      การเลือกซื้อ GT Series — 14:20
                    </span>
                  </div>
                </a>
              </div>

              {/* Datasheet CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_6f182a79622e4ea79aa9611e215d4605.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> Datasheet GT4000 Core i5
                </a>
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_4fc705e00b57462d987fd3f161ab917b.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-colors"
                >
                  <Download size={16} /> Datasheet GT4000 Core i7
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT5000 Detail */}
          {activeTab === "gt5000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt5000Banner}
                  alt="GT5000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    GPIO · SIM Slot · IoT Ready
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">5000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    GPIO + SIM IoT Ready — เชื่อมต่อทุกที่ ไร้ขีดจำกัด
                  </p>
                </div>
              </div>

              {/* Description + Product Image */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      GPIO · SIM Slot · RS485/RS422 · IoT Ready
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">5000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial PC คือเครื่องคอมพิวเตอร์เกรดอุตสาหกรรมขนาดเล็ก ที่ถูกออกแบบมาเพื่อรองรับการทำงาน
                      ในสภาวะแวดล้อมที่มีอุณหภูมิสูง ฝุ่นละอองหนาแน่น โดยออกแบบให้มีการระบายความร้อนได้ดีและทนความร้อนได้สูง
                      จึงเป็นเหตุผลที่ทำให้ GT5000 ทำงานได้อย่างมีประสิทธิภาพเหมาะสมกับงานอุตสาหกรรมทุกประเภท
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">📡 GPIO + SIM + RS485/RS422 — IoT Ready</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      GT5000 มีพอร์ต GPIO และ RS232 × 6 ช่อง พิเศษยิ่งกว่านั้น COM1 + COM2 สามารถตั้งค่าเป็น RS485/RS422 ได้
                      พร้อมช่อง Micro SIM with PUSH function สำหรับเชื่อมต่อ 4G/5G ทำให้พร้อมสำหรับงาน IoT ทันที
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-secondary">
                    <h4 className="font-bold text-foreground mb-2">⚡ GPIO คืออะไร?</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      GPIO (General Purpose Input/Output) คือพอร์ตเอนกประสงค์ที่สามารถควบคุมให้เป็น "1" หรือ "0" ได้ตามใจชอบ
                      โดยควบคุมแต่ละ PIN เหมือนไมโครคอนโทรลเลอร์ นำไปต่อยอดได้หลากหลาย เช่น ควบคุมการเปิด/ปิดอุปกรณ์
                      ต่อกับจอ LCD, relay, sensor โดยตรง
                    </p>
                  </div>

                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Intel Core i5-4200U / i7-4500U</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR3L 4–8 GB / SSD 128 GB – 1 TB</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">6 COM + GPIO + SIM</div>
                      <div className="text-xs text-muted-foreground mt-1">RS232/RS485/RS422, Micro SIM</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Wind className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Fanless 24/7</div>
                      <div className="text-xs text-muted-foreground mt-1">เงียบ 0 dB ทนอุณหภูมิ 0-60°C</div>
                    </div>
                  </div>
                </div>

                {/* Product Images — Factory */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="/images/gt5000/main.jpg"
                      alt="GT5000 ภาพหลัก — ด้านหน้า"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "/images/gt5000/front.jpg", alt: "GT5000 ด้านหน้า — พอร์ต COM, USB" },
                      { src: "/images/gt5000/rear.jpg", alt: "GT5000 ด้านหลัง — LAN, HDMI, VGA" },
                      { src: "/images/gt5000/side.jpg", alt: "GT5000 ด้านข้าง — ครีบระบายความร้อน" },
                      { src: "/images/gt5000/angle.jpg", alt: "GT5000 มุมเอียง — ภาพรวม" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Factory Gallery — Internal & Bottom */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { src: "/images/gt5000/internal.jpg", alt: "GT5000 ภายใน — Mainboard" },
                  { src: "/images/gt5000/bottom.jpg", alt: "GT5000 ด้านล่าง — VESA Mount" },
                  { src: "/images/gt5000/spec.jpg", alt: "GT5000 Spec Overview" },
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                    <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                  </div>
                ))}
              </div>


              {/* GT5000 Price Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">💰 GT5000 Price List</h3>
                  <p className="text-sm text-muted-foreground mt-1">รับประกัน 1 ปี ทุกรุ่น · เริ่มต้นเพียง ฿19,490</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                        <th className="text-left p-3 font-semibold text-foreground">หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { cpu: "i5-4200U", config: "RAM 4GB + SSD 128GB + WIFI", price: "19,490", remark: "" },
                        { cpu: "i5-4200U", config: "RAM 4GB + SSD 256GB + WIFI", price: "20,090", remark: "" },
                        { cpu: "i5-4200U", config: "RAM 8GB + SSD 128GB + WIFI", price: "19,790", remark: "" },
                        { cpu: "i5-4200U", config: "RAM 8GB + SSD 128GB + WIFI", price: "22,690", remark: "รวม WIN 10 OEM + AC 5G WIFI" },
                        { cpu: "i5-4200U", config: "RAM 8GB + SSD 256GB + WIFI", price: "20,490", remark: "" },
                        { cpu: "i5-4200U", config: "RAM 8GB + SSD 512GB + WIFI", price: "22,090", remark: "" },
                        { cpu: "i5-4200U", config: "RAM 8GB + SSD 1TB + WIFI", price: "28,690", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 4GB + SSD 128GB + WIFI", price: "22,090", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 4GB + SSD 256GB + WIFI", price: "22,690", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 8GB + SSD 128GB + WIFI", price: "22,690", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 8GB + SSD 256GB + WIFI", price: "23,390", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 8GB + SSD 256GB + 1TB SSD + WIFI", price: "28,590", remark: "" },
                        { cpu: "i7-4500U", config: "RAM 8GB + SSD 512GB + WIFI", price: "24,690", remark: "" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium">{item.cpu}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary">฿{item.price}</td>
                          <td className="p-3 text-xs text-muted-foreground">{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT5000</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-0 md:divide-x divide-border">
                  <a
                    href="https://www.youtube.com/watch?v=ifkzyVY9Z-g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <img
                      src="https://img.youtube.com/vi/ifkzyVY9Z-g/maxresdefault.jpg"
                      alt="การเลือกซื้อคอมพิวเตอร์สำหรับงานอุตสาหกรรม GT Series"
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">การเลือกซื้อ GT Series — 14:20</span>
                    </div>
                  </a>
                  <div className="flex flex-col gap-4 p-6 bg-secondary/30">
                    <div className="text-center">
                      <Play className="mx-auto text-primary mb-2" size={28} />
                      <p className="text-sm font-semibold text-foreground mb-1">GT5000 Port Specification</p>
                      <p className="text-xs text-muted-foreground mb-1">ความยาว 02:30</p>
                    </div>
                    <div className="text-center border-t border-border pt-4">
                      <Play className="mx-auto text-primary mb-2" size={28} />
                      <p className="text-sm font-semibold text-foreground mb-1">GT5000 Sale Scenario Discussion</p>
                      <p className="text-xs text-muted-foreground mb-1">ความยาว 04:44</p>
                    </div>
                    <a
                      href="https://www.entgroup.co.th/gt5000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 mt-2 text-xs text-primary hover:underline"
                    >
                      ดูวิดีโอทั้งหมดที่เว็บต้นทาง <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/epc-series"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT5000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT6000 Detail */}
          {activeTab === "gt6000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt6000Banner}
                  alt="GT6000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    ดีไซน์ใหม่ · Intel Core i3 · Fanless
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">6000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    ดีไซน์ใหม่ สวยทุกมุม — สำหรับร้านค้าและบริการ
                  </p>
                </div>
              </div>

              {/* Description + Product */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      Gen 8/10 · DDR4 64GB · Triple Display · NVMe
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">6000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial Mini PC โครง Brushed Aluminum Alloy สีดำ ระบบ Fanless เงียบสนิท ทำงานต่อเนื่อง 24 ชม.
                      รองรับ DDR4 สูงสุด 64GB, Triple Display (HDMI 2.0 + HDMI 1.4 + DP 1.2),
                      พร้อม M.2 NVMe SSD + mSATA + 2.5" SATA HDD
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🏭 ออกแบบมาเพื่อโรงงานโดยเฉพาะ</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ทนทานต่อสภาพแวดล้อมที่เต็มไปด้วยน้ำมัน ฝุ่นละออง และความร้อน
                      รองรับ VESA Mounting บนรถกอล์ฟ โฟคลิฟท์ หรือตู้คอนเทนเนอร์ — สมบูรณ์แบบสำหรับขยายไลน์ผลิต
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Core i3/i5/i7 Gen 8–10</div>
                      <div className="text-xs text-muted-foreground">Celeron / Pentium ได้</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR4 สูงสุด 64 GB</div>
                      <div className="text-xs text-muted-foreground">NVMe + mSATA + SATA</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Monitor className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Triple Display</div>
                      <div className="text-xs text-muted-foreground mt-1">HDMI 2.0 + HDMI 1.4 + DP 1.2</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Wind className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Fanless 24/7</div>
                      <div className="text-xs text-muted-foreground mt-1">เงียบ 0 dB · 2 COM · 2 LAN</div>
                    </div>
                  </div>
                </div>

                {/* Product Images — Factory */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="/images/gt6000/main.jpg"
                      alt="GT6000 ภาพหลัก — ด้านหน้า"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "/images/gt6000/front.jpg", alt: "GT6000 ด้านหน้า" },
                      { src: "/images/gt6000/top.jpg", alt: "GT6000 ด้านบน" },
                      { src: "/images/gt6000/angle.jpg", alt: "GT6000 มุมเอียง" },
                      { src: "/images/gt6000/rear.jpg", alt: "GT6000 ด้านหลัง — พอร์ต" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Port Connectivity — Factory Images */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🔌 Port Connectivity — ครบจบในเครื่องเดียว
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <img src="/images/gt6000/ports1.jpg" alt="GT6000 พอร์ตด้านหน้า" className="w-full rounded-lg" loading="lazy" />
                  <img src="/images/gt6000/ports2.jpg" alt="GT6000 พอร์ตด้านหลัง" className="w-full rounded-lg" loading="lazy" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  {[
                    { label: "2 COM Port", desc: "RS232 × 2 สำหรับเชื่อมต่ออุปกรณ์อุตสาหกรรม" },
                    { label: "Triple Display", desc: "HDMI 2.0 + HDMI 1.4 + DP 1.2 — 3 หน้าจอพร้อมกัน" },
                    { label: "DDR4 สูงสุด 64GB", desc: "2 × DDR4 RAM Slot รองรับงานหนัก" },
                    { label: "USB 6 ports", desc: "USB 3.0 + USB 2.0 เชื่อมต่อ barcode, camera" },
                    { label: "NVMe + SATA", desc: "M.2 NVMe 2280 + mSATA + 2.5\" SATA HDD" },
                    { label: "2 Gigabit LAN", desc: "แยกเครือข่ายระบบผลิตและ office" },
                  ].map((item, i) => (
                    <div key={i} className="card-surface p-3">
                      <div className="font-bold text-foreground mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Factory Gallery */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { src: "/images/gt6000/detail.jpg", alt: "GT6000 ภาพรวมพร้อม Spec" },
                  { src: "/images/gt6000/internal.jpg", alt: "GT6000 ภายใน — Mainboard" },
                  { src: "/images/gt6000/bottom.jpg", alt: "GT6000 ด้านล่าง — VESA Mount" },
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                    <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* More Factory Images */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { src: "/images/gt6000/side1.jpg", alt: "GT6000 ด้านข้าง 1" },
                  { src: "/images/gt6000/side2.jpg", alt: "GT6000 ด้านข้าง 2" },
                  { src: "/images/gt6000/side3.jpg", alt: "GT6000 ด้านข้าง — ครีบระบายความร้อน" },
                  { src: "/images/gt6000/spec-overview.jpg", alt: "GT6000 Spec Overview" },
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                    <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Spec Table — 2 คอลัมน์ */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT6000 Specifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลจาก Manufacturer</p>
                </div>
                <div className="grid md:grid-cols-2 md:divide-x divide-border">
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        {[
                          ["CPU", "Celeron 5205U / Pentium 5405U/6405U / Core i3-8145U / i5-8265U / i7-8565U / i3-10110U / i5-10210U / i7-10510U"],
                          ["RAM", "2 × DDR4 Slot, สูงสุด 64 GB"],
                          ["Storage", "M.2 NVMe 2280 + mSATA SSD + 2.5\" SATA 3.0 HDD"],
                          ["Display", "HDMI 2.0 + HDMI 1.4 + DP 1.2 (Triple)"],
                          ["COM", "2 × RS232"],
                          ["USB", "USB 3.0 × 4 + USB 2.0 × 2"],
                        ].map(([k, v], i) => (
                          <tr key={i}><td className="p-3 font-medium text-foreground w-1/3">{k}</td><td className="p-3 text-muted-foreground">{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        {[
                          ["LAN", "2 × Gigabit Ethernet RJ45"],
                          ["WiFi", "Built-in WiFi / Bluetooth"],
                          ["Audio", "MIC + SPK"],
                          ["Cooling", "Fanless — เงียบ 0 dB"],
                          ["Mounting", "VESA / Wall Mount"],
                          ["OS", "Windows 8 / 10 / 11"],
                        ].map(([k, v], i) => (
                          <tr key={i}><td className="p-3 font-medium text-foreground w-1/3">{k}</td><td className="p-3 text-muted-foreground">{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_5d4e7e3066dc446a909ccf2c09e2bfc9.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT6000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT7000 Detail */}
          {activeTab === "gt7000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt7000Banner}
                  alt="GT7000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    DDR4 · 6 COM · 70°C · Aluminium Alloy
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">7000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    คำตอบทุกปัญหาโรงงาน — ทนทาน แกร่ง ไว้ใจได้
                  </p>
                </div>
              </div>

              {/* Description + Product */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      DDR4 · 6 COM RS232/422/485 · 70°C · Aluminium Alloy
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">7000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      GT7000 คำตอบสำหรับทุกปัญหาในโรงงาน ไม่ว่าจะเป็นคอมพิวเตอร์ร้อนจัด ฝุ่นเข้าเครื่อง
                      หรือการสูญเสียเวลาผลิต ด้วยนวัตกรรมระบายความร้อนไร้พัดลม ทำงานได้ในอุณหภูมิสูงถึง 70°C
                      โครงสร้าง Aluminium Alloy แข็งแกร่ง ขนาดกะทัดรัด 23×17.5×5 ซม. น้ำหนักเพียง 2.5 กก.
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">💰 ประหยัดต้นทุนระยะยาว</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ประหยัดไฟด้วยการกินไฟเพียง 15W</li>
                      <li>• ระบบ Watch dog ป้องกันการค้าง</li>
                      <li>• อัพเกรด SSD และ RAM ได้ในอนาคต</li>
                      <li>• รับประกันการใช้งานยาวนาน</li>
                    </ul>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-secondary">
                    <h4 className="font-bold text-foreground mb-2">🔧 พร้อมใช้งานอุตสาหกรรม</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• พอร์ต COM 6 พอร์ต รองรับ RS232/422/485</li>
                      <li>• LAN Gigabit 2 พอร์ต เชื่อมต่อระบบเน็ตเวิร์คได้เสถียร</li>
                      <li>• รองรับ CPU ถึง Intel Core i7 รุ่นล่าสุด</li>
                      <li>• RAM DDR4 ขยายได้ถึง 32GB</li>
                    </ul>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Intel Core i3 / i5 / i7 (DDR4)</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR4 4–32 GB / SSD 256 GB – 1 TB</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">6 COM Port</div>
                      <div className="text-xs text-muted-foreground mt-1">RS232/RS422/RS485</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Thermometer className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">ทนร้อน 70°C</div>
                      <div className="text-xs text-muted-foreground mt-1">Aluminium Alloy แข็งแกร่ง</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_dc2525bbb341403085db99e88a32210ef000.jpg/v1/fill/w_301,h_535,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_dc2525bbb341403085db99e88a32210ef000.jpg"
                      alt="GT7000 Product"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Port Connectivity */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🔌 Port Connectivity — ครบจบในเครื่องเดียว
                </h4>
                <img
                  src="https://static.wixstatic.com/media/0597a3_e983e10281f44de2bf77aead50eea6b0~mv2.png/v1/crop/x_0,y_41,w_1556,h_433/fill/w_1124,h_313,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-12%20at%2014_34_58.png"
                  alt="GT7000 Port Layout"
                  className="w-full rounded-lg mb-4"
                  loading="lazy"
                />
                <img
                  src="https://static.wixstatic.com/media/0597a3_8cb9e95b1cb9467db25fdd471e061e43~mv2.png/v1/fill/w_555,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-12%20at%2013_58_21.png"
                  alt="GT7000 Spec Detail"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Application Scenarios */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-6">
                  <h4 className="font-bold text-foreground mb-3">🏭 ระบบโรงงานอัตโนมัติ</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• ควบคุมแขนกล และระบบการผลิตอัตโนมัติ</li>
                    <li>• เก็บข้อมูลการผลิตแบบเรียลไทม์</li>
                    <li>• เชื่อมต่อกับระบบ SCADA ได้อย่างเสถียร</li>
                  </ul>
                </div>
                <div className="card-surface p-6">
                  <h4 className="font-bold text-foreground mb-3">🍽️ ระบบร้านอาหาร & POS</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• จัดการออเดอร์และสต๊อกสินค้า</li>
                    <li>• เชื่อมต่อระบบจอทัชสกรีนสั่งอาหาร</li>
                    <li>• ทำงานต่อเนื่อง 24 ชั่วโมง ไม่สะดุด</li>
                  </ul>
                </div>
                <div className="card-surface p-6">
                  <h4 className="font-bold text-foreground mb-3">📺 ระบบห้องประชุม</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• รองรับจอสัมผัสความละเอียดสูง</li>
                    <li>• เชื่อมต่อระบบประชุมทางไกล</li>
                    <li>• นำเสนองานได้อย่างราบรื่น</li>
                  </ul>
                </div>
                <div className="card-surface p-6">
                  <h4 className="font-bold text-foreground mb-3">🖥️ ระบบ KIOSK</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• รองรับจอสัมผัสหลายขนาด</li>
                    <li>• ทำงานได้ในสภาพแวดล้อมที่หลากหลาย</li>
                    <li>• ติดตั้งง่าย ดูแลรักษาน้อย</li>
                  </ul>
                </div>
              </div>

              {/* Design & Build */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_b215c732ba714a92ac15a6ce507d454d~mv2.png/v1/fill/w_640,h_361,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT7000-001.png"
                    alt="GT7000 Design"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_e9a79184b4274bb38ec83aafe73b9f2b~mv2.png/v1/crop/x_0,y_186,w_1610,h_1283/fill/w_578,h_460,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT7000-008.png"
                    alt="GT7000 Applications"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Detail Spec Images */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_a5259d0ec15f4fc39fd63451d1d93f5c~mv2.png/v1/fill/w_648,h_541,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-12%20at%2013_55_38.png"
                    alt="GT7000 Spec Detail"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_a2cfc41bc5c842b785609fd8e2c79482~mv2.png/v1/crop/x_0,y_178,w_1444,h_1110/fill/w_593,h_454,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT7000-002.png"
                    alt="GT7000 Compact Design"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Heatsink Design */}
              <div className="card-surface p-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_8a949f73234e40408aa2e442b5bf6739~mv2.png/v1/fill/w_662,h_484,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT7000-007.png"
                  alt="GT7000 Heatsink Design"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Real-world Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://static.wixstatic.com/media/005637_c6720e80066545c193b82047b9f1f0ae~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_c6720e80066545c193b82047b9f1f0ae~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_e440df937b0b4641b075d45be0851fa6~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_e440df937b0b4641b075d45be0851fa6~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_b50ccc19e8784753a0e90fbe92de4dd5~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_b50ccc19e8784753a0e90fbe92de4dd5~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_e2122e54f34f4c898a4aa2cd017a9804~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_e2122e54f34f4c898a4aa2cd017a9804~mv2.jpg",
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden">
                    <img src={img} alt={`GT7000 ใช้งานจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Promo Info */}
              <div className="card-surface p-6">
                <h4 className="font-bold text-foreground mb-3">🎁 โปรโมชั่นพิเศษ</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div>• ฟรี! ติดตั้งและตั้งค่าระบบ</div>
                  <div>• ทดลอง (Demo) ใช้ฟรี 7 วัน</div>
                  <div>• รับส่วนลดเพิ่ม 10% เมื่อสั่งซื้อ 3 เครื่องขึ้นไป</div>
                  <div>• ผ่อน 0% นาน 6 เดือน</div>
                </div>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_bc46788d3e7d4c369da5aa7ed112b7d9.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT7000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT8000 Detail */}
          {activeTab === "gt8000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt8000Banner}
                  alt="GT8000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    Intel Ice Lake Gen 10 · สเปคแรง
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">8000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    Ice Lake Gen 10 — พลังประมวลผลระดับ Data Center
                  </p>
                </div>
              </div>

              {/* Description + Product */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      DDR4 64GB · Dual HDMI · SIM 4G · Fanless
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">8000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Industrial Mini PC โครง Brushed Aluminum Alloy ระบบ Fanless เงียบสนิท
                      รองรับ DDR4 สูงสุด 64GB, Dual HDMI Display, Micro SIM 4G Module
                      พร้อม mSATA SSD + 2.5" SATA HDD — ครบทุกการเชื่อมต่อ
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🏭 ออกแบบมาเพื่อโรงงานโดยเฉพาะ</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ทนทานต่อสภาพแวดล้อมที่เต็มไปด้วยฝุ่นละออง และความร้อน
                      Compact structure, Fanless, ไม่มีชิ้นส่วนเคลื่อนไหว ทำงานต่อเนื่อง 24/7
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Intel Core i5/i7 Gen 10</div>
                      <div className="text-xs text-muted-foreground">Ice Lake / Comet Lake</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR4 สูงสุด 64 GB</div>
                      <div className="text-xs text-muted-foreground">mSATA + 2.5" SATA</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Monitor className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Dual HDMI + SIM</div>
                      <div className="text-xs text-muted-foreground mt-1">2× HDMI + Micro SIM 4G</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Wind className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Fanless 24/7</div>
                      <div className="text-xs text-muted-foreground mt-1">เงียบ 0 dB · 2 COM · 2 LAN</div>
                    </div>
                  </div>
                </div>

                {/* Product Images — Factory */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden rounded-xl bg-muted/30">
                    <img
                      src="/images/gt8000/main.jpg"
                      alt="GT8000 ภาพหลัก"
                      className="w-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { src: "/images/gt8000/front.jpg", alt: "GT8000 ด้านหน้า" },
                      { src: "/images/gt8000/side.jpg", alt: "GT8000 ด้านข้าง" },
                      { src: "/images/gt8000/angle.jpg", alt: "GT8000 มุมเอียง" },
                      { src: "/images/gt8000/internal.jpg", alt: "GT8000 ภายใน — Mainboard" },
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden rounded-lg bg-muted/30">
                        <img src={img.src} alt={img.alt} className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Factory Gallery — Bottom */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="card-surface overflow-hidden rounded-lg bg-muted/30">
                  <img src="/images/gt8000/bottom.jpg" alt="GT8000 ด้านล่าง — VESA Mount" className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300 p-1" loading="lazy" />
                </div>
              </div>

              {/* Port Connectivity */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  🔌 Port Connectivity — ครบจบในเครื่องเดียว
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  {[
                    { label: "2 COM Port", desc: "RS232 × 2 สำหรับเชื่อมต่ออุปกรณ์อุตสาหกรรม" },
                    { label: "Dual HDMI", desc: "2× HDMI Display — 2 หน้าจอพร้อมกัน" },
                    { label: "Micro SIM 4G", desc: "PUSH function รองรับ 4G Module" },
                    { label: "DDR4 สูงสุด 64GB", desc: "2 × DDR4 RAM Slot รองรับงานหนัก" },
                    { label: "mSATA + SATA", desc: "mSATA SSD + 2.5\" SATA 3.0 HDD/SSD" },
                    { label: "2 Gigabit LAN", desc: "Dual Gigabit Ethernet แยกเครือข่าย" },
                  ].map((item, i) => (
                    <div key={i} className="card-surface p-3">
                      <div className="font-bold text-foreground mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spec Table — 2 คอลัมน์ */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT8000 Specifications</h3>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลจาก Manufacturer</p>
                </div>
                <div className="grid md:grid-cols-2 md:divide-x divide-border">
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        {[
                          ["CPU", "Intel Core i5-1035G1 / i7-10710U (Gen 10)"],
                          ["RAM", "2 × DDR4 Slot, สูงสุด 64 GB"],
                          ["Storage", "mSATA SSD + 2.5\" SATA 3.0 HDD/SSD"],
                          ["Display", "2× HDMI (Dual Display)"],
                          ["COM", "2 × RS232"],
                        ].map(([k, v], i) => (
                          <tr key={i}><td className="p-3 font-medium text-foreground w-1/3">{k}</td><td className="p-3 text-muted-foreground">{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        {[
                          ["LAN", "2 × Gigabit Ethernet RJ45"],
                          ["SIM", "Micro SIM 4G (PUSH function)"],
                          ["WiFi", "Built-in WiFi / Bluetooth"],
                          ["Cooling", "Fanless — เงียบ 0 dB"],
                          ["Mounting", "VESA / Wall Mount"],
                        ].map(([k, v], i) => (
                          <tr key={i}><td className="p-3 font-medium text-foreground w-1/3">{k}</td><td className="p-3 text-muted-foreground">{v}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Datasheet CTA */}
              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/3e5003_1cc0a144983240828fc4dc69c5fe47e8.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT8000
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT9000 Detail */}
          {activeTab === "gt9000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt9000Banner}
                  alt="GT9000 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    Triple Display · 8 COM · NVMe · DDR5
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">9000</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    Triple Display 8 COM — เรือธงสำหรับงานหนักระดับสูงสุด
                  </p>
                </div>
              </div>

              {/* Description + Product */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      Triple Display · 8 COM · NVMe · DDR5 · Dual-Band WiFi
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">9000</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      GT9000 ออกแบบด้วยการผลิตที่ปราณีต ตัวเครื่องสีดำผลิตจากโลหะผสมอลูมิเนียมขัดเงา
                      ปราศจากพัดลมระบายอากาศ ทำงานเงียบไร้เสียงรบกวน รองรับการทำงาน 24 ชั่วโมงต่อเนื่อง
                      พร้อมอุปกรณ์เครือข่ายไร้สาย Dual-Band และเสาอากาศภายนอก ครบครันด้วย 8 COM Port
                      รองรับ RS232/RS422/RS485 สนับสนุน Triple Display ผ่าน 2 HDMI + 1 DP ทำงาน 3 จอพร้อมกัน
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🏭 โซลูชั่นระบบจัดการโรงงานระดับมืออาชีพ</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✅ ติดตามกระบวนการผลิตแบบ Real-time</li>
                      <li>✅ ควบคุมคุณภาพตามมาตรฐานสากล</li>
                      <li>✅ จัดการสต็อกวัตถุดิบอัจฉริยะ</li>
                      <li>✅ เชื่อมต่อเครื่องจักรทุกประเภท</li>
                      <li>✅ ลดเวลา Downtime ได้ถึง 40%</li>
                    </ul>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-secondary">
                    <h4 className="font-bold text-foreground mb-2">🎯 ปฏิวัติโรงงานสู่ยุคดิจิทัล</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>🎯 ควบคุมอุณหภูมิและความดันอัตโนมัติ</li>
                      <li>🎯 ตรวจสอบคุณภาพด้วย AI Vision</li>
                      <li>🎯 วางแผนการผลิตแบบอัจฉริยะ</li>
                    </ul>
                  </div>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">i5-10200H / i7-10750H / i5-1235U / i7-1255U</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM & Storage</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR4/DDR5 4–32 GB / SSD + SATA + NVMe</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Monitor className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Triple Display</div>
                      <div className="text-xs text-muted-foreground mt-1">2× HDMI 1.4 + 1× DP — 3 จอพร้อมกัน</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">8 COM Port</div>
                      <div className="text-xs text-muted-foreground mt-1">RS232/RS422/RS485 + Dual-Band WiFi</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_bee270c19b2f466a8a77aa294d528952f000.jpg/v1/fill/w_290,h_514,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_bee270c19b2f466a8a77aa294d528952f000.jpg"
                      alt="GT9000 Product"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Overview & Spec Diagrams */}
              <div className="card-surface p-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_b68e0174e2b54d39b0bdf80ae71118e5~mv2.png/v1/crop/x_0,y_0,w_2752,h_1496/fill/w_712,h_387,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT9000%20PR.png"
                  alt="GT9000 Product Overview"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              <div className="space-y-4">
                {[
                  "https://static.wixstatic.com/media/0597a3_ecdc35b7d41e4cfba1afa5d11300df17~mv2.png/v1/crop/x_15,y_217,w_2352,h_655/fill/w_1095,h_305,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-16%20at%2012_51_54.png",
                  "https://static.wixstatic.com/media/0597a3_77a9c0395f984fde811028a4f0fbc5e4~mv2.png/v1/fill/w_1084,h_395,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2013_52_21.png",
                  "https://static.wixstatic.com/media/0597a3_c5d446300d3a4d9caabc33cad2911b4b~mv2.png/v1/fill/w_1084,h_402,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_09_11.png",
                  "https://static.wixstatic.com/media/0597a3_ffb33e04d1384bdab5c17647bd479b85~mv2.png/v1/fill/w_1084,h_401,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_09_57.png",
                  "https://static.wixstatic.com/media/0597a3_d3041b42178d4c10bece0b7ffb8f31e3~mv2.png/v1/fill/w_1083,h_401,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_30_29.png",
                ].map((img, i) => (
                  <div key={i} className="card-surface p-4 overflow-hidden">
                    <img src={img} alt={`GT9000 Spec ${i + 1}`} className="w-full rounded-lg" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Connectivity & Design Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "https://static.wixstatic.com/media/0597a3_2c101c21f03f4d63b1df69669f310210~mv2.png/v1/fill/w_1083,h_401,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_01_45.png",
                  "https://static.wixstatic.com/media/0597a3_ee8b5d5430dd45118bfc9310fb269418~mv2.png/v1/fill/w_1083,h_407,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_43_57.png",
                  "https://static.wixstatic.com/media/0597a3_06cf1a8db43c4bc9b3e45e421c5f38ca~mv2.png/v1/fill/w_1083,h_395,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-18%20at%2014_28_18.png",
                  "https://static.wixstatic.com/media/0597a3_e8bf65042cdb49c7badf9b1dc833e3a2~mv2.png/v1/fill/w_1095,h_393,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-16%20at%2013_39_08.png",
                ].map((img, i) => (
                  <div key={i} className="card-surface p-4 overflow-hidden">
                    <img src={img} alt={`GT9000 Detail ${i + 1}`} className="w-full rounded-lg" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Application & Dimension */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_901ca65b5c4149a1b6037ff17888889b~mv2.png/v1/fill/w_1095,h_388,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-16%20at%2014_00_07.png"
                    alt="GT9000 Application"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_d89ddcc7673d4492ad64911fb4825364~mv2.png/v1/crop/x_0,y_264,w_2433,h_616/fill/w_1095,h_278,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-08-16%20at%2012_58_44.png"
                    alt="GT9000 Dimensions"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Real-world Photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "https://static.wixstatic.com/media/005637_11c4dd2fbe1048448d0663de7ae71804~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_11c4dd2fbe1048448d0663de7ae71804~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_a31039453194460c8956f5a8e49a635c~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_a31039453194460c8956f5a8e49a635c~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_a643b2c6b5c14278bff7f4af495805a3~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_a643b2c6b5c14278bff7f4af495805a3~mv2.jpg",
                  "https://static.wixstatic.com/media/005637_bf02ab6305244e028d18bbb27984eb3c~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/005637_bf02ab6305244e028d18bbb27984eb3c~mv2.jpg",
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden">
                    <img src={img} alt={`GT9000 ใช้งานจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* GT9000 Price Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">💰 GT9000 Price List</h3>
                  <p className="text-sm text-muted-foreground mt-1">รับประกัน 1 ปี ทุกรุ่น · เริ่มต้นเพียง ฿25,290</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { cpu: "i5-10200H", config: "RAM 4GB + SSD 128GB + WIFI", price: "25,290" },
                        { cpu: "i5-10200H", config: "RAM 4GB + SSD 256GB + WIFI", price: "26,090" },
                        { cpu: "i5-10200H", config: "RAM 8GB + SSD 128GB + WIFI", price: "25,890" },
                        { cpu: "i5-10200H", config: "RAM 8GB + SSD 256GB + WIFI", price: "26,490" },
                        { cpu: "i5-10200H", config: "RAM 16GB + SSD 256GB + WIFI", price: "27,690" },
                        { cpu: "i5-10200H", config: "RAM 8GB + SSD 512GB + HDD 500GB + WIFI", price: "26,490" },
                        { cpu: "i7-10750H", config: "RAM 4GB + SSD 128GB + WIFI", price: "27,690" },
                        { cpu: "i7-10750H", config: "RAM 8GB + SSD 128GB + WIFI", price: "28,190" },
                        { cpu: "i7-10750H", config: "RAM 8GB + SSD 256GB + WIFI", price: "28,790" },
                        { cpu: "i7-10750H", config: "RAM 16GB + SSD 512GB + WIFI", price: "31,390" },
                        { cpu: "i7-10750H", config: "RAM 32GB + SSD 512GB + WIFI", price: "33,790" },
                        { cpu: "i5-1235U", config: "RAM DDR5 8GB + SSD 128GB + WIFI", price: "29,790" },
                        { cpu: "i5-1235U", config: "RAM DDR5 8GB + SSD 256GB + WIFI", price: "30,490" },
                        { cpu: "i5-1235U", config: "RAM DDR5 16GB + SSD 128GB + WIFI", price: "31,690" },
                        { cpu: "i5-1235U", config: "RAM DDR5 16GB + SSD 256GB + WIFI", price: "32,290" },
                        { cpu: "i7-1255U", config: "RAM DDR5 8GB + SSD 128GB + WIFI", price: "33,190" },
                        { cpu: "i7-1255U", config: "RAM DDR5 8GB + SSD 256GB + WIFI", price: "33,790" },
                        { cpu: "i7-1255U", config: "RAM DDR5 8GB + SSD 256GB + 2TB HDD + WIFI + Win10", price: "42,290" },
                        { cpu: "i7-1255U", config: "RAM DDR5 32GB + SSD 256GB + 2TB SSD + WIFI + Win10", price: "48,190" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium">{item.cpu}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary">฿{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Datasheet CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_56faa82174674e0494e3c1427715bead.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> Datasheet GT9000 (Gen 12)
                </a>
                <a
                  href="https://www.entgroup.co.th/_files/ugd/005637_7c2186899e804684850ab39151abba04.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-colors"
                >
                  <Download size={16} /> Datasheet GT9000 (Gen 10)
                </a>
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_12a4bbf6e46f43f5821708e2157f4a2f.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary/50 transition-colors"
                >
                  <Download size={16} /> GT9000 Product Overview
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT4500 Detail */}
          {activeTab === "gt4500" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl relative min-h-[220px] md:min-h-[300px] flex items-center">
                <img
                  src={gt4500Banner}
                  alt="GT4500 Industrial PC"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-sm border border-primary/30">
                    DDR4 · SIM 4G/5G · 75°C · Fanless
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    GT<span className="text-primary">4500</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-medium max-w-md">
                    มาตรฐานใหม่แห่งความทนทาน — เพื่ออุตสาหกรรมไทย
                  </p>
                </div>
              </div>

              {/* Description + Product Image */}
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                      DDR4 · SIM 4G/5G · RS485 · 75°C · Auto Power On
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      GT<span className="text-gradient">4500</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      GT4500 คือคำตอบสำหรับผู้ประกอบการที่มองหาคอมพิวเตอร์อุตสาหกรรมที่เชื่อถือได้ ด้วยการออกแบบที่เน้นความทนทานพิเศษ
                      พร้อมประสิทธิภาพที่ตอบโจทย์การใช้งานในสภาพแวดล้อมที่ท้าทาย ไม่ว่าจะเป็นสายการผลิต คลังสินค้า หรือพื้นที่ควบคุมเครื่องจักร
                    </p>
                  </div>

                  <div className="card-surface p-5 border-l-4 border-primary">
                    <h4 className="font-bold text-foreground mb-2">🌡️ ทนทานเหนือระดับ -20° ถึง +75°C</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      ทำงานได้ในอุณหภูมิ -20° ถึง +75°C และความชื้นสูงถึง 90% ด้วยครีบระบายความร้อนอลูมิเนียมขนาดใหญ่
                      ระบบ Passive Cooling ไม่ใช้พัดลม เงียบ 0 dB ทำงานต่อเนื่อง 24 ชั่วโมงไม่มีปัญหาความร้อนสะสม
                    </p>
                  </div>

                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU 4 ตัวเลือก</div>
                      <div className="text-xs text-muted-foreground mt-1">i3-6006U / i5-7260U / i5-8250U / i7-8550U</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM DDR4 + SSD</div>
                      <div className="text-xs text-muted-foreground mt-1">4 GB DDR4 / SSD 256 GB</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">6 COM + 8 USB</div>
                      <div className="text-xs text-muted-foreground mt-1">RS232×6 (COM1-2 เป็น RS485/422 ได้), LAN 2</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Zap className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">SIM 4G/5G Ready</div>
                      <div className="text-xs text-muted-foreground mt-1">Micro SIM Push slot, WiFi Optional</div>
                    </div>
                  </div>
                </div>

                {/* Product Images */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_aea4cee9a1cb431b90886aa5b64e1f96~mv2.png/v1/fill/w_600,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT4500-004.png"
                      alt="GT4500 Front"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_2901e68aa51b482697a1d4c4fa9fc320~mv2.png/v1/crop/x_0,y_213,w_1660,h_845/fill/w_600,h_305,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT4500-003.png"
                      alt="GT4500 Rear Ports"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Why GT4500 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-6">
                  <h4 className="text-lg font-display font-bold text-foreground mb-4">⚡ ประหยัดต้นทุนค่าไฟ</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• กินไฟเพียง <strong className="text-foreground">15W</strong> แม้ทำงาน 24 ชั่วโมง</li>
                    <li>• คิดเป็นค่าไฟเพียง <strong className="text-foreground">2.5 บาทต่อวัน</strong> (75 บาท/เดือน)</li>
                    <li>• ประหยัดค่าไฟได้มากกว่า <strong className="text-foreground">5,000 บาท/ปี</strong> เทียบกับ PC ทั่วไป</li>
                    <li>• ประหยัดกว่า 60% เมื่อเทียบกับคอมพิวเตอร์ทั่วไป</li>
                  </ul>
                </div>
                <div className="card-surface p-6">
                  <h4 className="text-lg font-display font-bold text-foreground mb-4">🔧 ดูแลง่าย ลดภาระ IT</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong className="text-foreground">Auto Power On</strong> — กลับมาทำงานอัตโนมัติหลังไฟดับ</li>
                    <li>• <strong className="text-foreground">Watchdog Timer</strong> — ตรวจจับและแก้ไขระบบค้างอัตโนมัติ</li>
                    <li>• <strong className="text-foreground">Wake-on-LAN</strong> — IT ดูแลระยะไกลได้ ลดการเดินทาง</li>
                    <li>• อัพเกรดง่ายทั้ง RAM และ Storage</li>
                  </ul>
                </div>
              </div>

              {/* CPU Options Visual */}
              <div className="card-surface p-4 overflow-hidden">
                <h4 className="text-lg font-display font-bold text-foreground mb-4 px-2">🔧 เลือก CPU ได้ถึง 4 รุ่น — จ่ายตามความต้องการ</h4>
                <img
                  src="https://static.wixstatic.com/media/3e5003_db3073f9df72429ca103a592e5e1d47d~mv2.jpg/v1/crop/x_2,y_0,w_1997,h_603/fill/w_1181,h_357,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.jpg"
                  alt="GT4500 CPU Options"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Software Compatibility */}
              <div className="card-surface p-6 md:p-8">
                <h4 className="text-xl font-display font-bold text-foreground mb-4">
                  💻 รองรับซอฟต์แวร์หลากหลาย
                </h4>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      รองรับ Windows 7/8/10 และ Linux ทำให้ใช้งานได้ทั้งซอฟต์แวร์อุตสาหกรรมและโปรแกรมทั่วไป:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Microsoft Office, PDF Reader</li>
                      <li>• PLC Programming, SCADA</li>
                      <li>• CAD/CAM ออกแบบเขียนแบบ</li>
                      <li>• ระบบจัดการฐานข้อมูลและ ERP</li>
                      <li>• มัลติมีเดียสำหรับงานนำเสนอและฝึกอบรม</li>
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_840c03acd28147a89285de218f3a0a25~mv2.png/v1/fill/w_600,h_448,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT4500-001.png"
                      alt="GT4500 Software"
                      className="w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Cooling System */}
              <div className="card-surface p-4 overflow-hidden">
                <h4 className="text-lg font-display font-bold text-foreground mb-4 px-2">🔇 ระบบระบายความร้อน Passive Cooling</h4>
                <p className="text-sm text-muted-foreground mb-4 px-2 leading-relaxed">
                  ครีบระบายความร้อนอลูมิเนียมขนาดใหญ่ออกแบบอย่างพิถีพิถัน กระจายความร้อนได้ทั่วถึงและรวดเร็ว
                  ไม่ใช้พัดลม ไม่มีเสียงรบกวน ป้องกันฝุ่นเข้าตัวเครื่อง
                </p>
                <img
                  src="https://static.wixstatic.com/media/3e5003_5146d29438c1469084384085311877b6~mv2.jpg/v1/fill/w_1309,h_202,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.jpg"
                  alt="GT4500 Heatsink"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Port Diagram */}
              <div className="card-surface p-4 overflow-hidden">
                <h4 className="text-lg font-display font-bold text-foreground mb-4 px-2">🔌 พอร์ตเชื่อมต่อครบครัน</h4>
                <img
                  src="https://static.wixstatic.com/media/3e5003_fa1b7c0241e1439796bca055fb8c927d~mv2.jpg/v1/fill/w_1310,h_418,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7.jpg"
                  alt="GT4500 Port Layout"
                  className="w-full rounded-lg mb-4"
                  loading="lazy"
                />
                <div className="grid md:grid-cols-3 gap-4 px-2">
                  <div className="text-sm">
                    <h5 className="font-bold text-foreground mb-1">พอร์ตสื่อสาร</h5>
                    <p className="text-muted-foreground">RS232 × 6 พอร์ต<br/>COM1/COM2 ตั้งค่าเป็น RS485/RS422 ผ่าน BIOS</p>
                  </div>
                  <div className="text-sm">
                    <h5 className="font-bold text-foreground mb-1">USB & แสดงผล</h5>
                    <p className="text-muted-foreground">USB 3.0 × 4 + USB 2.0 × 4<br/>HDMI + VGA Dual Display</p>
                  </div>
                  <div className="text-sm">
                    <h5 className="font-bold text-foreground mb-1">เครือข่าย & เสียง</h5>
                    <p className="text-muted-foreground">LAN × 2 (Gigabit)<br/>MIC + SPK, WiFi Optional</p>
                  </div>
                </div>
              </div>

              {/* Dimension */}
              <div className="card-surface p-6 text-center">
                <h4 className="text-lg font-display font-bold text-foreground mb-4">📐 ขนาดกะทัดรัด เล็กกว่า IPC ทั่วไป 40%</h4>
                <p className="text-muted-foreground mb-4">
                  เพียง 21.2 × 15.5 × 4.5 cm น้ำหนัก 2.5 kg — ติดตั้งในตู้ควบคุม บนแขนยึด หรือใน AGV/โฟล์คลิฟท์ได้สะดวก
                </p>
                <div className="grid md:grid-cols-2 gap-4 items-center">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_b7535d8168ab4f7d8d657a3eef999b12~mv2.jpg/v1/fill/w_1210,h_390,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/10.jpg"
                    alt="GT4500 Dimensions"
                    className="rounded-lg w-full"
                    loading="lazy"
                  />
                  <img
                    src="https://static.wixstatic.com/media/0597a3_c6c89af9190c48b992640615c77efcee~mv2.png/v1/fill/w_655,h_584,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/GT4500-002.png"
                    alt="GT4500 VESA Mount"
                    className="rounded-lg w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GT4500 Price Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">💰 GT4500 Price List (อัปเดตตามหน้า GT4500)</h3>
                  <p className="text-sm text-muted-foreground mt-1">ราคาขึ้นกับ CPU / RAM / SSD / WiFi และออปชันเสริม — ใช้ตารางนี้เพื่อเทียบและเลือกสเปกได้เร็ว</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-semibold text-foreground min-w-[170px]">กลุ่ม CPU</th>
                        <th className="text-left p-3 font-semibold text-foreground min-w-[280px]">สเปกตัวอย่าง (RAM + SSD + WiFi)</th>
                        <th className="text-right p-3 font-semibold text-foreground min-w-[120px]">ราคา (฿)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-muted-foreground font-medium">i3-7100U</td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB / 4GB + 256GB / 8GB + 128GB / 8GB + 256GB</td>
                        <td className="p-3 text-right font-bold text-foreground">15,990–16,990</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-muted-foreground font-medium">i5-7267U / i5-7300U</td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB / 8GB + 128GB / 4GB + 256GB / 8GB + 256GB</td>
                        <td className="p-3 text-right font-bold text-foreground">19,990–20,990</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors bg-primary/5">
                        <td className="p-3 text-muted-foreground font-medium">i5-8250U <span className="text-xs text-primary font-bold">ยอดนิยม</span></td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB / 4GB + 256GB / 8GB + 128GB / 8GB + 256GB</td>
                        <td className="p-3 text-right font-bold text-foreground">20,990–21,990</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-muted-foreground font-medium">i7-7510U</td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB / 4GB + 256GB / 8GB + 128GB / 8GB + 256GB</td>
                        <td className="p-3 text-right font-bold text-foreground">21,990–22,990</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-muted-foreground font-medium">i7-8550U</td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB / 4GB + 256GB / 8GB + 128GB / 8GB + 256GB</td>
                        <td className="p-3 text-right font-bold text-foreground">24,990–25,990</td>
                      </tr>
                      <tr className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-muted-foreground font-medium">i7-10510U</td>
                        <td className="p-3 text-muted-foreground">4GB + 128GB (เริ่มต้น)</td>
                        <td className="p-3 text-right font-bold text-foreground">25,990</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Options Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">🛒 Windows License / Options</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">Windows 10 Pro OEM</td><td className="p-3 text-right font-bold text-foreground">฿3,950</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">Windows 11 Pro OEM</td><td className="p-3 text-right font-bold text-foreground">฿4,590</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">Windows 10 IoT</td><td className="p-3 text-right font-bold text-foreground">฿3,950</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">Windows 11 IoT</td><td className="p-3 text-right font-bold text-foreground">฿4,590</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">WiFi Module / WiFi 6 Upgrade</td><td className="p-3 text-right font-bold text-foreground">สอบถาม</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">4G / 5G SIM Module</td><td className="p-3 text-right font-bold text-foreground">สอบถาม</td></tr>
                      <tr className="hover:bg-muted/30"><td className="p-3 text-muted-foreground">ประกันเพิ่มปีที่ 2 / 3</td><td className="p-3 text-right font-bold text-foreground">15% / 20%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="px-5 py-3 text-xs text-muted-foreground border-t border-border">*ข้อมูลราคาอ้างอิงจากตาราง GT4500 ล่าสุดบนหน้าเว็บไซต์และอาจมีการเปลี่ยนแปลงตามสเปกที่เลือก</p>
              </div>

              {/* Gallery */}
              <div className="card-surface p-6">
                <h4 className="text-lg font-display font-bold text-foreground mb-4">📸 ภาพตัวอย่างการใช้งานจริง</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "https://static.wixstatic.com/media/005637_af317d79eacd469f9157d4820cb459cc~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_af317d79eacd469f9157d4820cb459cc~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_e650889eede347d0a8d30c6a7e32287e~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_e650889eede347d0a8d30c6a7e32287e~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_37d8da415dab4f7494a6b4801687e3e1~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_37d8da415dab4f7494a6b4801687e3e1~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_5734e20385dd4e4db9c42a9ab159a87c~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_5734e20385dd4e4db9c42a9ab159a87c~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_e1b5f354431c46b58dc7d1e0e0c6ee53~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_e1b5f354431c46b58dc7d1e0e0c6ee53~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_d766ad09992e48559be58df3a9bc4ab7~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_d766ad09992e48559be58df3a9bc4ab7~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_37a9f940aea64c389e66a1e46f2cd2e3~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_37a9f940aea64c389e66a1e46f2cd2e3~mv2.jpg",
                    "https://static.wixstatic.com/media/005637_6c42aac9d6d747d08022f03a3979e64c~mv2.jpg/v1/fill/w_279,h_144,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/005637_6c42aac9d6d747d08022f03a3979e64c~mv2.jpg",
                  ].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`GT4500 การใช้งานจริง ${idx + 1}`}
                      className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="card-surface p-6">
                <h4 className="text-lg font-display font-bold text-foreground mb-4">🎬 วิดีโอ GT4500</h4>
                <a
                  href="https://www.youtube.com/watch?v=ou3yHel3ijU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-xl overflow-hidden max-w-lg mx-auto"
                >
                  <img
                    src="https://img.youtube.com/vi/ou3yHel3ijU/maxresdefault.jpg"
                    alt="GT4500 Video"
                    className="w-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">Industrial Computer รุ่น GT4500</span>
                </a>
              </div>

              {/* Datasheet CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_f33a4cfd614848709449d3a2d3173976.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT4500
                </a>
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_30cd5ccac16b42b79ed91d64cf12d0c9.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
                >
                  <Download size={16} /> วารสาร / Journal GT4500
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT1400 Detail */}
          {activeTab === "gt1400" && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                  NEW 2023
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold">
                  GT<span className="text-gradient">1400</span>
                </h3>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  Industrial Grade Computer รุ่นใหม่ล่าสุด รองรับ CPU ตั้งแต่ i5-8305G ไปจนถึง i7-13650HX
                  พร้อม 4 LAN Ports และ DDR4/DDR5 Support
                </p>
              </div>

              <div className="card-surface p-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_88afd8cf4a5a42a6b36b4880d59e9ebe~mv2.png/v1/fill/w_1293,h_474,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-09-14%20at%2015_12_53.png"
                  alt="GT1400 Industrial PC"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card-surface p-5 text-center">
                  <Cpu className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">CPU</div>
                  <div className="text-xs text-muted-foreground mt-1">i5-8305G / i7-12650HX / i7-13650HX</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Server className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">RAM</div>
                  <div className="text-xs text-muted-foreground mt-1">DDR4/DDR5 สูงสุด 64GB</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Shield className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">4 LAN Ports</div>
                  <div className="text-xs text-muted-foreground mt-1">Intel i225V Gigabit</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Zap className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">Storage</div>
                  <div className="text-xs text-muted-foreground mt-1">M.2 NVMe + SATA SSD + HDD</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_f51ed7e9e2004c9c8bc65d0f7b6e105b~mv2.png/v1/fill/w_403,h_362,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_f51ed7e9e2004c9c8bc65d0f7b6e105b~mv2.png" alt="GT1400 Front" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_4fab26c2e6db4c98b51255f267efe896~mv2.png/v1/fill/w_403,h_362,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_4fab26c2e6db4c98b51255f267efe896~mv2.png" alt="GT1400 Side" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_143384b5a7b54eda886f119a889f9470~mv2.png/v1/fill/w_403,h_362,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_143384b5a7b54eda886f119a889f9470~mv2.png" alt="GT1400 Back" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>

              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT1400 Price List</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">Processor</th>
                        <th className="text-left p-3 font-semibold text-foreground">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                        <th className="text-left p-3 font-semibold text-foreground">หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { cpu: "i5-8305G", config: "DDR4 RAM 4GB / SSD 128GB / WIFI", price: "28,990", remark: "" },
                        { cpu: "i5-8305G", config: "DDR4 RAM 8GB / SSD 128GB / WIFI", price: "29,190", remark: "" },
                        { cpu: "i5-8305G", config: "DDR4 RAM 4GB / SSD 256GB / WIFI", price: "29,590", remark: "4 LAN Ports" },
                        { cpu: "i5-8305G", config: "DDR4 RAM 8GB / SSD 256GB / WIFI", price: "29,990", remark: "DDR4/DDR5 Support" },
                        { cpu: "i7-12650HX", config: "DDR5 RAM 8GB / SSD 128GB / WIFI", price: "34,690", remark: "Industrial Grade" },
                        { cpu: "i7-12650HX", config: "DDR5 RAM 8GB / SSD 256GB / WIFI", price: "35,290", remark: "" },
                        { cpu: "i7-12650HX", config: "DDR5 RAM 16GB / SSD 128GB / WIFI", price: "36,490", remark: "" },
                        { cpu: "i7-12650HX", config: "DDR5 RAM 16GB / SSD 256GB / WIFI", price: "36,990", remark: "" },
                        { cpu: "i7-13650HX", config: "DDR5 RAM 8GB / SSD 128GB / WIFI", price: "37,790", remark: "" },
                        { cpu: "i7-13650HX", config: "DDR5 RAM 8GB / SSD 256GB / WIFI", price: "38,390", remark: "" },
                        { cpu: "i7-13650HX", config: "DDR5 RAM 16GB / SSD 128GB / WIFI", price: "39,590", remark: "" },
                        { cpu: "i7-13650HX", config: "DDR5 RAM 16GB / SSD 256GB / WIFI", price: "39,990", remark: "" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium">{item.cpu}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary">฿{item.price}</td>
                          <td className="p-3 text-xs text-muted-foreground">{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-6">
                  <img src="https://static.wixstatic.com/media/0597a3_c97635d4da504d00ae26c381e3b61efd~mv2.png/v1/fill/w_892,h_477,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-09-14%20at%2015_02_11.png" alt="GT1400 Ports" className="w-full rounded-lg" loading="lazy" />
                </div>
                <div className="card-surface p-6">
                  <img src="https://static.wixstatic.com/media/0597a3_0de9b63b73b742a38464eff7ebf651cc~mv2.png/v1/fill/w_1271,h_715,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-09-14%20at%2015_25_12.png" alt="GT1400 Specification" className="w-full rounded-lg" loading="lazy" />
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT1400</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-0 md:divide-x divide-border">
                  <a href="https://www.entgroup.co.th/gt-series-2023" target="_blank" rel="noopener noreferrer" className="block relative group">
                    <img src="https://static.wixstatic.com/media/0597a3_88afd8cf4a5a42a6b36b4880d59e9ebe~mv2.png/v1/fill/w_1293,h_474,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-09-14%20at%2015_12_53.png" alt="GT2023 Intro" className="w-full aspect-video object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">GT2023 Intro — 02:44</span>
                    </div>
                  </a>
                  <a href="https://www.entgroup.co.th/gt-series-2023" target="_blank" rel="noopener noreferrer" className="block relative group">
                    <img src="https://static.wixstatic.com/media/0597a3_b7fd144f004b401aa284fe76f0c11462~mv2.png/v1/fill/w_1119,h_541,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-09-14%20at%2013_55_43.png" alt="GT1400 Intro" className="w-full aspect-video object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="text-primary-foreground ml-1" size={24} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-full">GT1400 Intro — 02:40</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_df771f1787184c4ea82b8ca5ed7abc17.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT1400
                </a>
              </div>
            </div>
          )}

          {/* Tab: GT1200 Detail */}
          {activeTab === "gt1200" && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                  NEW 2023
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold">
                  GT<span className="text-gradient">1200</span>
                </h3>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  รุ่นคอมแพกต์ ดีไซน์กระทัดรัด รองรับ CPU ตั้งแต่ i3-6157U ไปจนถึง i7-10510U
                  เหมาะกับงาน KIOSK, Digital Signage และ Factory Automation
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "https://static.wixstatic.com/media/0597a3_3a64dd92132a4f54b2a9f0eb03b87ed4~mv2.png/v1/fill/w_397,h_359,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
                  "https://static.wixstatic.com/media/0597a3_5beadd75a18f441fac4637410ada9e1a~mv2.png/v1/fill/w_397,h_359,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
                  "https://static.wixstatic.com/media/0597a3_7a9597a364a54709bdb4bcb6a6fbd4a2~mv2.png/v1/fill/w_397,h_359,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
                  "https://static.wixstatic.com/media/0597a3_e67ca0fcac944ce98203bedb443924c8~mv2.png/v1/fill/w_390,h_353,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_e67ca0fcac944ce98203bedb443924c8~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_49e41d9895654282a8b6af3994fc6a55~mv2.png/v1/fill/w_397,h_359,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_49e41d9895654282a8b6af3994fc6a55~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_ada2a84013274204b1f69dfa9eec7b75~mv2.png/v1/fill/w_390,h_353,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_ada2a84013274204b1f69dfa9eec7b75~mv2.png",
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden">
                    <img src={img} alt={`GT1200 มุมมอง ${i + 1}`} className="w-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card-surface p-5 text-center">
                  <Cpu className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">CPU</div>
                  <div className="text-xs text-muted-foreground mt-1">i3-6157U / i5-4278U / i5-7287U / i7-4578U</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Server className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">RAM</div>
                  <div className="text-xs text-muted-foreground mt-1">DDR3L / DDR4 สูงสุด 64GB</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Shield className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">2 LAN Ports</div>
                  <div className="text-xs text-muted-foreground mt-1">Realtek RTL8111 Gigabit</div>
                </div>
                <div className="card-surface p-5 text-center">
                  <Zap className="mx-auto text-primary mb-2" size={28} />
                  <div className="font-bold text-foreground text-sm">TDP 28W</div>
                  <div className="text-xs text-muted-foreground mt-1">ประหยัดพลังงาน Fanless</div>
                </div>
              </div>

              {/* Video Section */}
              <div className="card-surface overflow-hidden rounded-xl">
                <div className="p-5 border-b border-border flex items-center gap-3">
                  <Play className="text-primary" size={20} />
                  <h3 className="text-lg font-display font-bold text-foreground">วิดีโอ GT1200</h3>
                </div>
                <a href="https://www.entgroup.co.th/gt-series-2023" target="_blank" rel="noopener noreferrer" className="block relative group">
                  <img
                    src="https://static.wixstatic.com/media/005637_8fbc98531f7d46429391aeb758636e01~mv2.jpg/v1/crop/x_0,y_142,w_4404,h_1523/fill/w_1271,h_440,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ad2GTSeries2023.jpg"
                    alt="GT1200 Video"
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-primary-foreground ml-1" size={28} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1 rounded-full">
                      GT1200 Intro — 02:21
                    </span>
                  </div>
                </a>
              </div>

              <div className="text-center">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_b016e32d02cf4accaa6709406df39692.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download size={16} /> ดาวน์โหลด Datasheet GT1200
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Windows Options */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Windows & <span className="text-gradient">Options</span>
            </h2>
            <p className="text-muted-foreground mt-2">เพิ่มเติมได้ตามต้องการ</p>
          </div>
          <div className="card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 font-semibold text-foreground">Option</th>
                    <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "Windows 10 Pro OEM", price: "฿3,950" },
                    { name: "Windows 11 Pro OEM", price: "฿4,590" },
                    { name: "Windows 10 IOT", price: "฿3,950" },
                    { name: "Windows 11 IOT", price: "฿4,590" },
                    { name: "Upgrade WIFI ABGN/AC → Wifi6", price: "Call" },
                    { name: "4G Sim Card", price: "Call" },
                    { name: "5G Sim Card", price: "Call" },
                    { name: "ซื้อประกันเพิ่ม ปีที่ 2", price: "15%" },
                    { name: "ซื้อประกันเพิ่ม ปีที่ 3", price: "20%" },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3 text-foreground">{item.name}</td>
                      <td className="p-3 text-right font-bold text-primary">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              ตัวอย่าง<span className="text-gradient">การใช้งาน</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              รองรับได้หลากหลายกิจกรรม — โรงงานอุตสาหกรรม, Factory Automation, IOT, KIOSK, HMI,
              Digital Signage, Queue System, รถโดยสาร, รถไฟฟ้า, ตู้คอนโทรล
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="card-surface overflow-hidden aspect-square">
                <img src={img} alt={`ตัวอย่างการใช้งาน ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GT Series Banner */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/3e5003_9a0970ee1f4f4d9aa2f4f3fef18faeb5~mv2.jpg/v1/fill/w_1261,h_459,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%A3%E0%B8%A7%E0%B8%A1%20gt.jpg"
              alt="GT Series รวม"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto text-center">
          <Cpu className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            สนใจ GT Series?<span className="text-gradient"> ปรึกษาเรา</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            ให้ทีมผู้เชี่ยวชาญช่วยเลือกรุ่นที่เหมาะกับงานของคุณ
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://line.me/R/ti/p/@entgroup?from=page&openQrModal=true&searchId=entgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              LINE @entgroup
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-bold text-lg hover:bg-surface-hover transition-colors"
            >
              <ArrowLeft size={18} /> กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ENT GROUP Co., Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

/* Model Card Component */
const ModelCard = ({ model }: { model: typeof gtModels[0] }) => (
  <>
    <div className="relative bg-secondary/50 p-6 flex items-center justify-center min-h-[200px]">
      {model.badge ? (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
          {model.highlight}
        </span>
      ) : (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-[11px] font-medium border border-border">
          {model.highlight}
        </span>
      )}
      <img
        src={model.image}
        alt={model.name}
        className="max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
        {model.name}
        {model.tab && <span className="text-xs text-primary font-normal">ดูรายละเอียด →</span>}
        {!model.tab && <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
      </h3>
      <p className="text-xs font-semibold text-primary mb-3">"{model.tagline}"</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <Cpu size={14} className="text-primary mt-0.5 shrink-0" />
          <span className="text-muted-foreground">{model.cpu}</span>
        </div>
        <div className="flex items-start gap-2">
          <Server size={14} className="text-primary mt-0.5 shrink-0" />
          <span className="text-muted-foreground">RAM {model.ram} / {model.storage}</span>
        </div>
        <div className="flex items-start gap-2">
          <Zap size={14} className="text-primary mt-0.5 shrink-0" />
          <span className="text-muted-foreground">{model.ports}</span>
        </div>
      </div>
      {model.price && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">เริ่มต้น </span>
          <span className="font-bold text-foreground">{model.price.startsWith("สอบถาม") ? model.price : `฿${model.price}`}</span>
        </div>
      )}
    </div>
  </>
);

export default GTSeries;
