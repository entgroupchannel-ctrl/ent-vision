import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Thermometer, Wind, Shield, Zap, Server, Layers, Settings, Box, Maximize } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";

const features = [
  { icon: Wind, title: "Fanless Design", desc: "เงียบสนิท ไม่มีชิ้นส่วนเคลื่อนไหว อายุการใช้งานยาวนาน" },
  { icon: Layers, title: "LEGO Mode Design", desc: "ระบบโมดูลาร์ ปรับแต่งและขยายระบบได้ตามใจ" },
  { icon: Shield, title: "Industrial-Grade จริง", desc: "ออกแบบจริง ทดสอบจริง ผ่านมาตรฐานอุตสาหกรรม" },
  { icon: Thermometer, title: "ทำงาน 24/7", desc: "ทนทุกสภาพแวดล้อม MTBF 60,000 ชั่วโมง" },
];

const certifications = [
  "✅ วิศวกรรมเฉพาะทาง: ออกแบบเพื่อสภาพแวดล้อมโรงงานโดยตรง",
  "✅ ทดสอบเข้มงวด: ผ่านการทดสอบในสภาวะจริงหลากหลายรูปแบบ",
  "✅ รับรองมาตรฐาน: ได้รับการรับรองสำหรับการทำงานที่เชื่อถือได้",
  "✅ พิสูจน์ในสนาม: ใช้งานจริงในโรงงานทั่วโลก",
];

const epcSeries = [
  {
    name: "EPC-10XA Series",
    tagline: "Compact & Affordable",
    desc: "คอมพิวเตอร์อุตสาหกรรมระดับเริ่มต้นที่ไม่ธรรมดา ยืดหยุ่นสุดขีดด้วยระบบ LEGO MODE โครงสร้างอลูมิเนียม 200mm",
    image: "https://static.wixstatic.com/media/0597a3_e66a5a6616b64254a920d2c6f05b93f8~mv2.png/v1/fill/w_258,h_261,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_24_48.png",
    cpu: "Celeron J1900/J6412 ถึง Core i7 12th Gen",
    ram: "4–32 GB DDR3L/DDR4/DDR5",
    storage: "mSATA SSD 128–256 GB",
    ports: "USB 6–7, COM 3 (RS232+RS485), LAN 2, HDMI+VGA",
    size: "คอมแพกต์ 200mm",
    highlight: "เริ่มต้น",
    gallery: [
      "https://static.wixstatic.com/media/0597a3_4681e86fee384a13953cfc1477fe4eeb~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
      "https://static.wixstatic.com/media/0597a3_7043dbbbf77841f599d56ca8bd1c8eeb~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
      "https://static.wixstatic.com/media/0597a3_a33086dc821449789942597ff318195f~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_a33086dc821449789942597ff318195f~mv2.png",
    ],
    details: [
      "เริ่มต้นใช้งาน Industrial PC ในราคาที่เข้าถึงได้",
      "เหมาะกับ Automation Control, Edge Computing",
      "พร้อมอัปเกรดเมื่อธุรกิจเติบโต",
    ],
  },
  {
    name: "EPC-20XA Series",
    tagline: "Enhanced Expansion",
    desc: "Enhanced Expansion Design — ความสูงเพิ่มจาก 47mm เป็น 79mm (+68% พื้นที่) รองรับ CPU ประสิทธิภาพสูง ทำงาน 24/7 ในโรงงานได้มั่นใจ",
    image: "https://static.wixstatic.com/media/0597a3_373c66cd76674aafb9d631325e3e3a26~mv2.png/v1/fill/w_347,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_57_50.png",
    cpu: "Celeron J1900/J6412 ถึง Core i7 12th Gen",
    ram: "4–32 GB DDR3L/DDR4/DDR5",
    storage: "mSATA SSD 128–256 GB",
    ports: "USB 6–7, COM 3 (RS232+RS485), LAN 2, HDMI+VGA",
    size: "สูง 79mm (+68%)",
    highlight: "ขยายได้",
    details: [
      "Cooling Space เพิ่มขึ้น รองรับ CPU ประสิทธิภาพสูง",
      "Complex Industrial Control ระบบควบคุมซับซ้อน",
      "Multi-Device Connectivity เชื่อมต่อหลายอุปกรณ์",
    ],
  },
  {
    name: "EPC-30XA Series",
    tagline: "Wider Form Factor",
    desc: "Wider Form Factor Design — กว้าง 337mm (+47%) ความสูงเพียง 47.5mm ครีบระบายความร้อนขนาดใหญ่พิเศษ เหมาะกับ Rack Mount",
    image: "https://static.wixstatic.com/media/0597a3_66f688e771804493b4e10e4daf7dd19a~mv2.png/v1/fill/w_410,h_247,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2022_19_47.png",
    cpu: "Celeron J1900/J6412 ถึง Core i7 12th Gen",
    ram: "4–32 GB DDR3L/DDR4/DDR5",
    storage: "mSATA SSD 128–256 GB",
    ports: "USB 6–7, COM 6 (RS232+RS485), LAN 2, HDMI+VGA",
    size: "กว้าง 337mm, Low Profile",
    highlight: "Rack Mount",
    gallery: [
      "https://static.wixstatic.com/media/0597a3_58406a7c4f4f4150ae07b2d6376366b0~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_58406a7c4f4f4150ae07b2d6376366b0~mv2.png",
      "https://static.wixstatic.com/media/0597a3_0367da74dfe34d24971aeda0f990b9a2~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_0367da74dfe34d24971aeda0f990b9a2~mv2.png",
      "https://static.wixstatic.com/media/0597a3_722adc2902d94e0aa1c6d285e63a01b5~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_722adc2902d94e0aa1c6d285e63a01b5~mv2.png",
    ],
    details: [
      "Extended Cooling Fins ครีบระบายความร้อนขนาดใหญ่",
      "Panel Mount cutout 327×100mm",
      "MTBF 60,000 ชั่วโมง",
    ],
  },
  {
    name: "EPC-40XA Series",
    tagline: "Flagship Model",
    desc: "รุ่นเรือธง 337×160×79.5mm ใหญ่ที่สุดในซีรีส์ รวมจุดเด่นของ EPC-20XA + EPC-30XA พื้นผิวระบายความร้อน +168% พร้อมสำหรับงานวิกฤต",
    image: "https://static.wixstatic.com/media/0597a3_97f200930e3047dc887b96a9e8c48203~mv2.png/v1/fill/w_398,h_225,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2022_28_06.png",
    cpu: "Celeron J1900/J6412 ถึง Core i7 12th Gen",
    ram: "4–32 GB DDR3L/DDR4/DDR5",
    storage: "mSATA SSD 128–256 GB",
    ports: "USB 6–7, COM 6 (RS232+RS485), LAN 2, HDMI+VGA",
    size: "337×160×79.5mm Flagship",
    highlight: "Flagship",
    badge: true,
    details: [
      "พื้นผิวระบายความร้อน +168% จาก EPC-10XA",
      "รองรับ CPU ประสิทธิภาพสูงในสภาพหนัก",
      "24/7 Heavy-Duty, MTBF 60,000 ชั่วโมง",
    ],
  },
];

const priceList = [
  { model: "EPC-106A / EPC-206A", spec: "J1900/4G RAM/128G SSD/12V DC", price: "14,990" },
  { model: "EPC-107A / EPC-207A", spec: "J6412/4G RAM/128G SSD/12V DC", price: "13,990" },
  { model: "EPC-109A / EPC-209A", spec: "i3-10110U/4G RAM/128G SSD", price: "30,990" },
  { model: "EPC-109A / EPC-209A", spec: "i5-10210U/4G RAM/128G SSD", price: "36,990" },
  { model: "EPC-109A / EPC-209A", spec: "i7-10510U/4G RAM/128G SSD", price: "39,990" },
  { model: "EPC-102A / EPC-202A", spec: "i3-1215U/4G RAM/128G SSD", price: "30,990" },
  { model: "EPC-102A / EPC-202A", spec: "i5-1235U/4G RAM/128G SSD", price: "35,990" },
  { model: "EPC-102A / EPC-202A", spec: "i7-1250U/4G RAM/128G SSD", price: "39,990" },
];

const EPCBoxSeries = () => {
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
            <span className="text-sm font-semibold text-foreground">EPC Box Series</span>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative container max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                CESIPC Partner
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 tracking-tight">
                EPC Box <span className="text-gradient">Series</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                โซลูชั่น Industrial Box PC ระดับโลก สำหรับอุตสาหกรรมไทย —
                คอมพิวเตอร์อุตสาหกรรมระบบ LEGO MODE ที่ใช้เทคโนโลยี Intel Core
                พร้อมการออกแบบแบบไร้พัดลมและโครงสร้างอลูมิเนียมที่แข็งแกร่ง
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.entgroup.co.th/_files/ugd/0597a3_9dad5caa6c4d4410a723cab33c3177bf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  CESIPC E-Catalog <ExternalLink size={16} />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
                >
                  ดูราคาสินค้า
                </a>
              </div>
            </div>
            <div className="card-surface p-6 flex items-center justify-center">
              <img
                src="https://static.wixstatic.com/media/0597a3_390ed059c959423d9c40be95b414b68f~mv2.png/v1/fill/w_403,h_293,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_03_54.png"
                alt="EPC Box Series"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-8 border-y border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <img
            src="https://static.wixstatic.com/media/0597a3_7c3f2bd701f340ee993f725c168c1bec~mv2.png/v1/fill/w_757,h_143,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2008_10_03.png"
            alt="Trusted by global industries"
            className="w-full max-w-3xl mx-auto h-auto opacity-70"
            loading="lazy"
          />
          <p className="text-center text-sm text-muted-foreground mt-4">
            สินค้าของเราได้รับการยอมรับและติดตั้งใช้งานกับอุตสาหกรรมระดับโลก
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">คุณสมบัติเด่น</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              เทคโนโลยีชั้นนำ<span className="text-gradient">สำหรับอุตสาหกรรม</span>
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

      {/* Industrial Grade */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              อะไรทำให้เป็น <span className="text-gradient">Industrial-Grade จริงๆ?</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto card-surface p-8">
            <div className="space-y-3">
              {certifications.map((c, i) => (
                <p key={i} className="text-muted-foreground">{c}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Series */}
      <section className="section-padding" id="models">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Product Lineup</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              ซีรีส์<span className="text-gradient">ทั้งหมด</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              เลือกขนาดที่เหมาะกับพื้นที่และความต้องการ — ตั้งแต่ Compact จนถึง Flagship
            </p>
          </div>

          <div className="space-y-8">
            {epcSeries.map((series, idx) => (
              <div key={series.name} className={`card-surface overflow-hidden grid lg:grid-cols-2 gap-0 ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image side */}
                <div className="relative bg-secondary/30 p-8 flex flex-col items-center justify-center lg:[direction:ltr]">
                  {series.badge ? (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {series.highlight}
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                      {series.highlight}
                    </span>
                  )}
                  <img
                    src={series.image}
                    alt={series.name}
                    className="max-h-[220px] object-contain mb-4"
                    loading="lazy"
                  />
                  {series.gallery && (
                    <div className="flex gap-2 mt-2">
                      {series.gallery.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-20 h-20 object-contain rounded-lg bg-background/50 p-1" loading="lazy" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="p-8 lg:p-10 flex flex-col justify-center lg:[direction:ltr]">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{series.tagline}</p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">{series.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{series.desc}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Cpu size={14} className="text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">CPU</p>
                        <p className="text-sm font-medium text-foreground">{series.cpu}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Server size={14} className="text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">RAM</p>
                        <p className="text-sm font-medium text-foreground">{series.ram}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Box size={14} className="text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Storage</p>
                        <p className="text-sm font-medium text-foreground">{series.storage}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Maximize size={14} className="text-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">ขนาด</p>
                        <p className="text-sm font-medium text-foreground">{series.size}</p>
                      </div>
                    </div>
                  </div>

                  {series.details && (
                    <ul className="space-y-1.5 mb-6">
                      {series.details.map((d, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Zap size={12} className="text-primary mt-1 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Banner */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_a72276c74a174eeeb52e716ebb750fc7~mv2.png/v1/fill/w_1131,h_126,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-24%20at%2022_52_56.png"
              alt="EPC Box Series Comparison"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="section-padding" id="pricing">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Price List</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              ราคา<span className="text-gradient">สินค้า</span>
            </h2>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Model</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Specification</th>
                    <th className="text-right px-6 py-4 font-semibold text-foreground">ราคา (฿)</th>
                  </tr>
                </thead>
                <tbody>
                  {priceList.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{item.model}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.spec}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            * ราคายังไม่รวม Windows License — Windows 10 Pro OEM ฿3,950 / Windows 11 Pro OEM ฿4,290
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-3xl mx-auto text-center">
          <Settings className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            สนใจ EPC Box Series?<span className="text-gradient"> ปรึกษาเรา</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            ให้ทีมผู้เชี่ยวชาญช่วยเลือกรุ่นและ Configuration ที่เหมาะกับงานของคุณ
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

export default EPCBoxSeries;
