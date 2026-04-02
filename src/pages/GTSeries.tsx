import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Thermometer, Wind, Shield, Zap, Server, Factory, Building, Home, Monitor } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";

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
    cpu: "Intel Celeron / Core i5",
    ram: "4–8 GB",
    storage: "SSD 128–256 GB",
    ports: "USB 6, COM 2, LAN 2, VGA+HDMI",
    size: "ขนาดเล็กกระทัดรัด",
    image: "https://static.wixstatic.com/media/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png/v1/fill/w_419,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_02acff57b2204d11a615e5e8b37392b6~mv2.png",
    href: "https://www.entgroup.co.th/ipc-gt1000",
    highlight: "เริ่มต้น",
  },
  {
    name: "GT1200 / GT1400",
    cpu: "Intel N95 / N100 / Core i3",
    ram: "8–16 GB DDR4",
    storage: "SSD 256–512 GB",
    ports: "USB 6, COM 2, LAN 2, HDMI",
    size: "ดีไซน์ใหม่ล่าสุด",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "https://www.entgroup.co.th/gt-series-2023",
    highlight: "NEW!",
    badge: true,
  },
  {
    name: "GT2000",
    cpu: "Intel Celeron 1037U / Core i5",
    ram: "4 GB",
    storage: "SSD 256 GB",
    ports: "USB 8 (4×3.0+4×2.0), COM 4, LAN 2, VGA+HDMI",
    size: "23.4×15×4.8 cm / 1.5 kg",
    image: "https://static.wixstatic.com/media/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg/v1/fill/w_268,h_477,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_1cf855841a5e4486b7b21fc45623d486f000.jpg",
    href: "https://www.entgroup.co.th/mini-pc-gt2000",
    highlight: "ยอดนิยม",
  },
  {
    name: "GT3000",
    cpu: "Celeron 1007U / Core i3 / i5 / i7",
    ram: "4 GB",
    storage: "SSD 128 GB",
    ports: "USB 6, COM 6, LAN 2, VGA+HDMI",
    size: "15×21.7×5.2 cm / 1.289 kg",
    image: "https://static.wixstatic.com/media/0597a3_7150a12fcc844677ac9c5c0af540da06f000.jpg/v1/fill/w_296,h_522,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_7150a12fcc844677ac9c5c0af540da06f000.jpg",
    href: "https://www.entgroup.co.th/mini-pc-3000",
    highlight: "หลากหลาย CPU",
  },
  {
    name: "GT4000",
    cpu: "Intel Core i3 / i5 / i7",
    ram: "4–16 GB",
    storage: "SSD 128–512 GB",
    ports: "USB 8, COM 6, LAN 2, VGA+HDMI, GPIO",
    size: "คอมแพกต์แต่ทรงพลัง",
    image: "https://static.wixstatic.com/media/0597a3_b9bf3c2c39ee4be6b009dd7b958fa43c~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_28_07.png",
    href: "https://www.entgroup.co.th/minipc-gt4000",
    highlight: "GPIO",
  },
  {
    name: "GT4500",
    cpu: "Intel Core i5 / i7",
    ram: "8–16 GB",
    storage: "SSD 256–512 GB",
    ports: "USB 8, COM 6, LAN 2, HDMI×2, GPIO",
    size: "รุ่นอัปเกรด GT4000",
    image: "https://static.wixstatic.com/media/0597a3_8e53a2e85b9f42088834c613e1a9d08f~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_25_08.png",
    href: "https://www.entgroup.co.th/ipc-gt4500",
    highlight: "Dual HDMI",
  },
  {
    name: "GT5000",
    cpu: "Intel Core i5 / i7",
    ram: "8–16 GB",
    storage: "SSD 256–512 GB",
    ports: "USB 8, COM 6 (RS232/RS485/RS422), LAN 2, GPIO, SIM slot",
    size: "พร้อม GPIO + SIM",
    image: "https://static.wixstatic.com/media/0597a3_68700c8f94f94588be18d47414929b55f000.jpg/v1/fill/w_296,h_522,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_68700c8f94f94588be18d47414929b55f000.jpg",
    href: "https://www.entgroup.co.th/gt5000",
    highlight: "GPIO + SIM",
  },
  {
    name: "GT6000",
    cpu: "Intel Core i5 / i7 Gen 8",
    ram: "8–32 GB DDR4",
    storage: "SSD 256 GB – 1 TB",
    ports: "USB 8, COM 6, LAN 2, HDMI+DP, GPIO",
    size: "ประสิทธิภาพสูง",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "https://www.entgroup.co.th/gt6000",
    highlight: "Gen 8",
  },
  {
    name: "GT7000",
    cpu: "Intel Core i5 / i7 Gen 10",
    ram: "8–32 GB DDR4",
    storage: "SSD 256 GB – 1 TB",
    ports: "USB 10, COM 6, LAN 2, HDMI+DP, GPIO",
    size: "ประสิทธิภาพระดับสูง",
    image: "https://static.wixstatic.com/media/0597a3_8e53a2e85b9f42088834c613e1a9d08f~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_25_08.png",
    href: "https://www.entgroup.co.th/ipc-gt7000",
    highlight: "Gen 10",
  },
  {
    name: "GT8000",
    cpu: "Intel Core i5 / i7 Gen 11",
    ram: "8–64 GB DDR4",
    storage: "NVMe SSD 256 GB – 2 TB",
    ports: "USB 10, COM 6, LAN 4, HDMI+DP×2, GPIO",
    size: "Flagship รุ่นใหญ่",
    image: "https://static.wixstatic.com/media/0597a3_b9bf3c2c39ee4be6b009dd7b958fa43c~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_28_07.png",
    href: "https://www.entgroup.co.th/gt8000",
    highlight: "Flagship",
  },
  {
    name: "GT9000",
    cpu: "Intel Core i7 / i9 Gen 12",
    ram: "16–64 GB DDR5",
    storage: "NVMe SSD 512 GB – 2 TB",
    ports: "USB 12, COM 6, LAN 4, HDMI+DP×2, Thunderbolt, GPIO",
    size: "สุดยอด Performance",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "https://www.entgroup.co.th/gt9000",
    highlight: "Top Performance",
  },
];

const galleryImages = [
  "https://static.wixstatic.com/media/005637_a5ffaad568e84e3daa9498a03f79410a~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_a5ffaad568e84e3daa9498a03f79410a~mv2.jpg",
  "https://static.wixstatic.com/media/005637_138dfbf84a364703b08266d6f7726ee3~mv2.jpg/v1/fill/w_348,h_347,q_90,enc_avif,quality_auto/005637_138dfbf84a364703b08266d6f7726ee3~mv2.jpg",
  "https://static.wixstatic.com/media/005637_3873554c607047d7baa9d4ab166ebf16~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_3873554c607047d7baa9d4ab166ebf16~mv2.jpg",
  "https://static.wixstatic.com/media/005637_3ecd1c202310457a9ae75096734cec22~mv2.jpg/v1/fill/w_347,h_347,q_90,enc_avif,quality_auto/005637_3ecd1c202310457a9ae75096734cec22~mv2.jpg",
  "https://static.wixstatic.com/media/005637_46e268297fcb4d51bf53ff1995af7bda~mv2.jpg/v1/fill/w_348,h_347,q_90,enc_avif,quality_auto/005637_46e268297fcb4d51bf53ff1995af7bda~mv2.jpg",
];

const GTSeries = () => {
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

      {/* All Models */}
      <section className="section-padding" id="models">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">All Models</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              รุ่น<span className="text-gradient">ทั้งหมด</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              เลือกรุ่นที่เหมาะกับงานของคุณ — ตั้งแต่รุ่นเริ่มต้นจนถึง Top Performance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gtModels.map((model) => (
              <a
                key={model.name}
                href={model.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-surface overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                {/* Badge */}
                <div className="relative bg-secondary/50 p-6 flex items-center justify-center min-h-[200px]">
                  {model.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                      {model.highlight}
                    </span>
                  )}
                  {!model.badge && (
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

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                    {model.name}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
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
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section-padding bg-surface/50">
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
      <section className="section-padding">
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
      <section className="section-padding bg-surface/50">
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

export default GTSeries;
