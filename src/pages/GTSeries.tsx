import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Thermometer, Wind, Shield, Zap, Server, Factory, Building, Home, Monitor, Download, Play } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";
import gt1000Hero from "@/assets/gt1000-hero.jpg";

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
    image: "https://static.wixstatic.com/media/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png/v1/fill/w_419,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png",
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
    image: "https://static.wixstatic.com/media/0597a3_3a64dd92132a4f54b2a9f0eb03b87ed4~mv2.png/v1/fill/w_397,h_359,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
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
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    tab: "gt1400",
    highlight: "NEW!",
    badge: true,
    price: "28,990",
  },
  {
    name: "GT2000",
    tagline: "ยอดนิยม 8 USB",
    cpu: "Intel Celeron 1037U / Core i5",
    ram: "4 GB",
    storage: "SSD 256 GB",
    ports: "USB 8 (4×3.0+4×2.0), COM 4, LAN 2, VGA+HDMI",
    size: "23.4×15×4.8 cm / 1.5 kg",
    image: "https://static.wixstatic.com/media/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg/v1/fill/w_268,h_477,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg",
    href: "https://www.entgroup.co.th/mini-pc-gt2000",
    highlight: "ยอดนิยม",
    price: "สอบถาม",
  },
  {
    name: "GT3000",
    tagline: "6 COM หลากหลาย CPU",
    cpu: "Celeron 1007U / Core i3 / i5 / i7",
    ram: "4 GB",
    storage: "SSD 128 GB",
    ports: "USB 6, COM 6, LAN 2, VGA+HDMI",
    size: "15×21.7×5.2 cm / 1.289 kg",
    image: "https://static.wixstatic.com/media/0597a3_7150a12fcc844677ac9c5c0af540da06f000.jpg/v1/fill/w_296,h_522,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_7150a12fcc844677ac9c5c0af540da06f000.jpg",
    href: "https://www.entgroup.co.th/mini-pc-3000",
    highlight: "6 COM",
    price: "สอบถาม",
  },
  {
    name: "GT4000",
    tagline: "GPIO พร้อมใช้",
    cpu: "Intel Core i3 / i5 / i7",
    ram: "4–16 GB",
    storage: "SSD 128–512 GB",
    ports: "USB 8, COM 6, LAN 2, VGA+HDMI, GPIO",
    size: "คอมแพกต์แต่ทรงพลัง",
    image: "https://static.wixstatic.com/media/0597a3_b9bf3c2c39ee4be6b009dd7b958fa43c~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_28_07.png",
    href: "https://www.entgroup.co.th/minipc-gt4000",
    highlight: "GPIO",
    price: "สอบถาม",
  },
  {
    name: "GT4500",
    tagline: "Dual HDMI อัปเกรด",
    cpu: "Intel Core i5 / i7",
    ram: "8–16 GB",
    storage: "SSD 256–512 GB",
    ports: "USB 8, COM 6, LAN 2, HDMI×2, GPIO",
    size: "รุ่นอัปเกรด GT4000",
    image: "https://static.wixstatic.com/media/0597a3_8e53a2e85b9f42088834c613e1a9d08f~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_25_08.png",
    href: "https://www.entgroup.co.th/ipc-gt4500",
    highlight: "Dual HDMI",
    price: "สอบถาม",
  },
  {
    name: "GT5000",
    tagline: "GPIO + SIM IoT Ready",
    cpu: "Intel Core i5 / i7",
    ram: "8–16 GB",
    storage: "SSD 256–512 GB",
    ports: "USB 8, COM 6 (RS232/RS485/RS422), LAN 2, GPIO, SIM slot",
    size: "พร้อม GPIO + SIM",
    image: "https://static.wixstatic.com/media/0597a3_68700c8f94f94588be18d47414929b55f000.jpg/v1/fill/w_296,h_522,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_68700c8f94f94588be18d47414929b55f000.jpg",
    href: "https://www.entgroup.co.th/gt5000",
    highlight: "IoT Ready",
    price: "สอบถาม",
  },
  {
    name: "GT6000",
    tagline: "Gen 8 ประสิทธิภาพสูง",
    cpu: "Intel Core i5 / i7 Gen 8",
    ram: "8–32 GB DDR4",
    storage: "SSD 256 GB – 1 TB",
    ports: "USB 8, COM 6, LAN 2, HDMI+DP, GPIO",
    size: "ประสิทธิภาพสูง",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "https://www.entgroup.co.th/gt6000",
    highlight: "Gen 8",
    price: "สอบถาม",
  },
  {
    name: "GT7000",
    tagline: "Gen 10 คำตอบทุกโรงงาน",
    cpu: "Intel Core i5 / i7 Gen 10",
    ram: "8–32 GB DDR4",
    storage: "SSD 256 GB – 1 TB",
    ports: "USB 10, COM 6, LAN 2, HDMI+DP, GPIO",
    size: "ประสิทธิภาพระดับสูง",
    image: "https://static.wixstatic.com/media/0597a3_8e53a2e85b9f42088834c613e1a9d08f~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_25_08.png",
    href: "https://www.entgroup.co.th/ipc-gt7000",
    highlight: "Gen 10",
    price: "สอบถาม",
  },
  {
    name: "GT8000",
    tagline: "Flagship 4 LAN NVMe",
    cpu: "Intel Core i5 / i7 Gen 11",
    ram: "8–64 GB DDR4",
    storage: "NVMe SSD 256 GB – 2 TB",
    ports: "USB 10, COM 6, LAN 4, HDMI+DP×2, GPIO",
    size: "Flagship รุ่นใหญ่",
    image: "https://static.wixstatic.com/media/0597a3_b9bf3c2c39ee4be6b009dd7b958fa43c~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_28_07.png",
    href: "https://www.entgroup.co.th/gt8000",
    highlight: "Flagship",
    price: "สอบถาม",
  },
  {
    name: "GT9000",
    tagline: "สุดยอด Gen 12 Thunderbolt",
    cpu: "Intel Core i7 / i9 Gen 12",
    ram: "16–64 GB DDR5",
    storage: "NVMe SSD 512 GB – 2 TB",
    ports: "USB 12, COM 6, LAN 4, HDMI+DP×2, Thunderbolt, GPIO",
    size: "สุดยอด Performance",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "https://www.entgroup.co.th/gt9000",
    highlight: "Top",
    price: "สอบถาม",
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gtModels.map((model) => (
                <button
                  key={model.name}
                  onClick={() => model.tab ? handleTabChange(model.tab) : undefined}
                  className={`group card-surface overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1 text-left ${model.tab ? "cursor-pointer" : ""}`}
                >
                  {model.href && !model.tab ? (
                    <a href={model.href} target="_blank" rel="noopener noreferrer" className="block">
                      <ModelCard model={model} />
                    </a>
                  ) : (
                    <ModelCard model={model} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Tab: GT1000 Detail */}
          {activeTab === "gt1000" && (
            <div className="space-y-8 animate-fade-in">
              {/* Hero Banner */}
              <div className="card-surface overflow-hidden rounded-2xl">
                <img
                  src={gt1000Hero}
                  alt="GT1000 Industrial PC"
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>

              {/* Description */}
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
                      Industrial PC คือเครื่องคอมพิวเตอร์เกรดอุตสาหกรรมขนาดเล็ก ที่ถูกออกแบบมาเพื่อรองรับการทำงาน
                      ในสภาวแวดล้อมที่มีอุณหภูมิสูง ฝุ่นละอองหนาแน่น โดยออกแบบให้มีการระบายความร้อนได้ดีและทนความร้อนได้สูง
                      จึงเป็นเหตุผลที่ทำให้ GT1000 ทำงานได้อย่างมีประสิทธิภาพเหมาะสมกับงานอุตสาหกรรมทุกประเภท
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    รองรับได้หลากหลายกิจกรรม — โรงงานอุตสาหกรรม โรงเรียน มหาวิทยาลัย Factory Automation, IOT,
                    KIOSK, HMI, Digital Signage, Queue System, รถโดยสาร รถไฟฟ้า ตู้คอนโทรลและงานที่ต้องการความทนทานเป็นพิเศษ
                  </p>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card-surface p-4 text-center">
                      <Cpu className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">CPU</div>
                      <div className="text-xs text-muted-foreground mt-1">Intel Celeron N2920 / N3520</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Server className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">RAM</div>
                      <div className="text-xs text-muted-foreground mt-1">DDR3L 4–8 GB</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Shield className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">2 LAN</div>
                      <div className="text-xs text-muted-foreground mt-1">USB 6, COM 2, VGA+HDMI</div>
                    </div>
                    <div className="card-surface p-4 text-center">
                      <Wind className="mx-auto text-primary mb-2" size={24} />
                      <div className="font-bold text-foreground text-sm">Fanless</div>
                      <div className="text-xs text-muted-foreground mt-1">เงียบ 0 dB ทำงาน 24/7</div>
                    </div>
                  </div>
                </div>

                {/* Product Images */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card-surface overflow-hidden">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png/v1/fill/w_419,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png"
                      alt="GT1000 Front"
                      className="w-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      "https://static.wixstatic.com/media/0597a3_1c5f631ba51145659988890917eedaa7~mv2.png/v1/fill/w_412,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_1c5f631ba51145659988890917eedaa7~mv2.png",
                      "https://static.wixstatic.com/media/0597a3_96cddbf17d2c42588a73e1177737c107~mv2.png/v1/fill/w_413,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_96cddbf17d2c42588a73e1177737c107~mv2.png",
                      "https://static.wixstatic.com/media/0597a3_e13befd35c774a7f962c3be3bfc56edc~mv2.png/v1/fill/w_416,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_e13befd35c774a7f962c3be3bfc56edc~mv2.png",
                    ].map((img, i) => (
                      <div key={i} className="card-surface overflow-hidden">
                        <img src={img} alt={`GT1000 มุมมอง ${i + 2}`} className="w-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spec Diagrams */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_d438441c66734588bf92c3cb77e08aae~mv2.jpg/v1/crop/x_0,y_0,w_1998,h_571/fill/w_1218,h_348,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.jpg"
                    alt="GT1000 Connectivity"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="card-surface p-4 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/3e5003_6c63145676084587be40a884b1c3c2bd~mv2.jpg/v1/crop/x_0,y_0,w_2000,h_1091/fill/w_1314,h_720,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.jpg"
                    alt="GT1000 Specification Detail"
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GT1000 Price Table */}
              <div className="card-surface overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-lg font-display font-bold text-foreground">GT1000 Price List</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 font-semibold text-foreground">Model</th>
                        <th className="text-left p-3 font-semibold text-foreground">Configuration</th>
                        <th className="text-right p-3 font-semibold text-foreground">ราคา</th>
                        <th className="text-left p-3 font-semibold text-foreground">หมายเหตุ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { model: "N2920", config: "RAM DDR3L 4GB + SSD 128GB + WIFI", price: "15,990", remark: "" },
                        { model: "N2920", config: "RAM DDR3L 8GB + SSD 128GB + WIFI", price: "16,990", remark: "" },
                        { model: "N2920", config: "RAM 4GB / SSD 128GB / 4G Module (Long antenna)", price: "18,990", remark: "" },
                        { model: "N2920", config: "RAM 4GB / SSD 128GB / 4G / WIN 10", price: "21,990", remark: "ราคารวม Windows 10 Pro OEM" },
                        { model: "N2920", config: "RAM DDR3L 8GB + SSD 256GB + WIFI", price: "18,990", remark: "ราคารวม Windows 10 Pro OEM" },
                        { model: "N3520", config: "RAM DDR3L 4GB + SSD 128GB + WIFI", price: "17,990", remark: "" },
                        { model: "N3520", config: "RAM DDR3L 8GB + SSD 128GB + WIFI", price: "18,990", remark: "" },
                        { model: "N3520", config: "RAM 4GB / SSD 128GB / 4G Module (Long antenna)", price: "21,990", remark: "" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-secondary/30 transition-colors">
                          <td className="p-3 text-foreground font-medium">{item.model}</td>
                          <td className="p-3 text-muted-foreground">{item.config}</td>
                          <td className="p-3 text-right font-bold text-primary">฿{item.price}</td>
                          <td className="p-3 text-xs text-muted-foreground">{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Port Diagram */}
              <div className="card-surface p-4 overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_813ed70f44da4e72b1f8d881cd8b30d9~mv2.png/v1/fill/w_1313,h_466,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_813ed70f44da4e72b1f8d881cd8b30d9~mv2.png"
                  alt="GT1000 Port Diagram"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Real-world Photos */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  "https://static.wixstatic.com/media/0597a3_9f94339201574aab951ca7e05b0b5b8b~mv2_d_2048_2048_s_2.jpg/v1/fill/w_340,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0017.jpg",
                  "https://static.wixstatic.com/media/0597a3_0565d74067c7475989c641caa9e558ee~mv2_d_2048_2048_s_2.jpg/v1/fill/w_305,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0015.jpg",
                  "https://static.wixstatic.com/media/0597a3_1a4e692b890345f5a8d2ca2aa85ee5d1~mv2_d_2048_2048_s_2.jpg/v1/fill/w_330,h_310,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/k10_181024_0016.jpg",
                ].map((img, i) => (
                  <div key={i} className="card-surface overflow-hidden aspect-square">
                    <img src={img} alt={`GT1000 ติดตั้งจริง ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
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
        {model.href && !model.tab && <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
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
