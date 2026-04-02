import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Sun, Shield, Monitor, Cpu, Phone, MessageCircle,
  Download, Smartphone, Settings, Wifi, Eye, Layers, Store, BadgePercent, Printer, ScanLine
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";
import smartDisplayHero from "@/assets/smart-display-hero.jpg";

/* ─── Data ─── */

const categories = [
  {
    id: "indoor",
    label: "Indoor Display",
    desc: "จอ Digital Signage สำหรับภายในอาคาร",
    icon: Monitor,
  },
  {
    id: "outdoor",
    label: "Outdoor Monitor",
    desc: "จอภาพความสว่างสูงสำหรับภายนอกอาคาร",
    icon: Sun,
  },
  {
    id: "window",
    label: "Window Display",
    desc: "จอติดหน้าต่างร้าน ความสว่างสูง",
    icon: Eye,
  },
];

const indoorProducts = [
  {
    model: "BD-3501",
    size: '35"',
    type: "Stretched Bar",
    image: "https://static.wixstatic.com/media/0597a3_313720b25f424d3db0e3e72bb247409d~mv2.png/v1/fill/w_289,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-07-12%20at%2017_19_39.png",
  },
  {
    model: "BD-4380",
    size: '43"',
    type: "Standing Kiosk",
    image: "https://static.wixstatic.com/media/0597a3_89ddd2e3de8b4610bd0e08f02dbf25d6~mv2.png/v1/fill/w_378,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-07-12%20at%2017_18_04.png",
  },
  {
    model: "BD-4950",
    size: '49"',
    type: "Standing Display",
    image: "https://static.wixstatic.com/media/0597a3_7e5919f1202f4f68b8f09e8748a01268~mv2.png/v1/fill/w_316,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-07-12%20at%2017_16_46.png",
  },
  {
    model: "BD-5840",
    size: '58"',
    type: "Wall Mount",
    image: "https://static.wixstatic.com/media/0597a3_95ac9a51630d4527b072e7c6d119d91f~mv2.png/v1/fill/w_330,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_95ac9a51630d4527b072e7c6d119d91f~mv2.png",
  },
  {
    model: "BD-6500",
    size: '65"',
    type: "Standing Kiosk",
    image: "https://static.wixstatic.com/media/0597a3_fb0e2421e09647fc82601aeea6e6da06~mv2.png/v1/fill/w_398,h_335,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_fb0e2421e09647fc82601aeea6e6da06~mv2.png",
  },
  {
    model: "BD-7500",
    size: '75"',
    type: "Premium Display",
    image: "https://static.wixstatic.com/media/0597a3_3799af0b54e6400f88264f0f184dd65b~mv2.png/v1/fill/w_298,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_3799af0b54e6400f88264f0f184dd65b~mv2.png",
  },
];

const outdoorFeatures = [
  { icon: Sun, title: "ความสว่าง 1000–1600 Nits", desc: "มองเห็นชัดแม้กลางแดดจ้า" },
  { icon: Shield, title: "ทนทุกสภาพอากาศ", desc: "ทนฝุ่น ความชื้น อากาศร้อน-เย็น" },
  { icon: Monitor, title: "หลายขนาดให้เลือก", desc: '12", 17", 19", 21", 27", 32"' },
  { icon: Cpu, title: "Windows / Android", desc: "เลือกระบบปฏิบัติการตามโครงการ" },
  { icon: Settings, title: "Custom Enclosure", desc: "ออกแบบตู้ติดตั้งพร้อม AirFlow" },
  { icon: Wifi, title: "Digital Signage Software", desc: "ซอฟต์แวร์จัดการเนื้อหาฟรี" },
];

const outdoorSizes = [
  { size: '12"', nits: "1200 Nits", datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_c2427ebf71c7451892c5d778e30790f9.pdf" },
  { size: '17"', nits: "1500 Nits", datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_070123590de942e983e56575061e0db0.pdf" },
  { size: '19"', nits: "1500 Nits", datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_a5ce046763ff4e62a63afc6a3cd1db38.pdf" },
  { size: '19"', nits: "1600 Nits", datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_899aaffbc58843598a2c0ddb4d5abfdf.pdf" },
];

const softwareFeatures = [
  { title: "Device Management", desc: "จัดการรายการอุปกรณ์ ดูสถานะออนไลน์/ออฟไลน์ ตั้งเวลา ปรับความสว่าง อัพเดตเฟิร์มแวร์", icon: Smartphone },
  { title: "Program Management", desc: "สร้าง แก้ไข พรีวิว และเผยแพร่โปรแกรมแสดงผลได้ทุกประเภทอุปกรณ์ พร้อม GPS fixed point play", icon: Layers },
  { title: "Material & Statistics", desc: "อัพโหลดวิดีโอ ภาพ เอกสาร เพลง พร้อมนับจำนวนและระยะเวลาเล่น", icon: Eye },
  { title: "Settings & Roles", desc: "จัดการบัญชีผู้ใช้ กำหนดสิทธิ์ Sub-user และ Role management", icon: Settings },
];

const applications = [
  "Retail Store", "Shopping Mall", "Restaurant & Hotel",
  "Airport & Subway", "Exhibition Hall", "Education",
  "Elevator Display", "Medical", "Wayfinding",
];

const priceLists = [
  { label: "Indoor Digital Signage", href: "https://www.entgroup.co.th/_files/ugd/0597a3_aaa0993f63084600adb415fd5f58673e.pdf" },
  { label: "Outdoor Monitor", href: "https://www.entgroup.co.th/_files/ugd/0597a3_250d37f715ad465b843b65ec5d9d0cf6.pdf" },
  { label: "Window Display", href: "https://www.entgroup.co.th/_files/ugd/0597a3_cd6650ceecb94accbcd7e107a26d4115.pdf" },
  { label: "Stretched Bar Display", href: "https://www.entgroup.co.th/_files/ugd/0597a3_3c78cb1f6a254f3c894eb284bc62bfb8.pdf" },
  { label: "Product Overview", href: "https://www.entgroup.co.th/_files/ugd/0597a3_681d6ced6320463492e916e4374cacde.pdf" },
  { label: "Outdoor Datasheet", href: "https://www.entgroup.co.th/_files/ugd/0597a3_8c98e268cc4543a58132ccad12e6f343.pdf" },
];

/* ─── Component ─── */

const SmartDisplay = () => {
  const [activeTab, setActiveTab] = useState("indoor");
  const [showLineQR, setShowLineQR] = useState(false);

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
            <span className="text-sm font-semibold text-foreground">Smart Display</span>
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
          <img src={smartDisplayHero} alt="" className="w-full h-full object-cover" width={1920} height={900} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Digital Signage • Outdoor • Indoor
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight text-white">
              จอภาพ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--accent))]">Smart Display</span>
              <br />
              <span className="text-2xl md:text-3xl font-bold text-white/70">สำหรับติดตั้งภายนอกและภายในอาคาร</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              จอภาพ LCD ความสว่างสูง สำหรับ Digital Signage, Kiosk, ป้ายโฆษณา
              และงานแสดงผลทุกรูปแบบ พร้อมซอฟต์แวร์จัดการเนื้อหาฟรี
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                📋 ดูสินค้าทั้งหมด →
              </a>
              <a href="#downloads" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
                <Download size={18} /> ดาวน์โหลด Price List
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section-padding" id="products">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Product Categories</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              เลือกประเภท<span className="text-gradient">จอภาพ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  activeTab === cat.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                <cat.icon size={32} className={activeTab === cat.id ? "text-primary" : "text-muted-foreground"} />
                <h3 className={`text-lg font-bold mt-3 ${activeTab === cat.id ? "text-primary" : "text-foreground"}`}>{cat.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
              </button>
            ))}
          </div>

          {/* Indoor Products */}
          {activeTab === "indoor" && (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {indoorProducts.map((p) => (
                  <div key={p.model} className="card-surface p-6 hover:border-primary/30 transition-all hover:-translate-y-1 group">
                    <div className="bg-secondary/30 rounded-xl p-4 mb-4 flex items-center justify-center h-64 overflow-hidden">
                      <img src={p.image} alt={p.model} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{p.model}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{p.size}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.type}</p>
                    <button
                      onClick={() => setShowLineQR(true)}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                    >
                      <MessageCircle size={14} /> สอบถามราคา
                    </button>
                  </div>
                ))}
              </div>

              {/* Indoor gallery */}
              <div className="mt-10 grid md:grid-cols-2 gap-6">
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_9b7b3b7aebd74c67b4ba73ce8cd35d2f~mv2.png/v1/fill/w_1223,h_749,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-08%20at%2013_46_35.png" alt="Indoor signage installation" className="w-full object-cover" loading="lazy" />
                </div>
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_57760701aff84e30b2efd1cdda15df62~mv2.png/v1/crop/x_0,y_0,w_1836,h_1127/fill/w_1223,h_751,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-09%20at%2013_20_59.png" alt="Display showcase" className="w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          )}

          {/* Outdoor Products */}
          {activeTab === "outdoor" && (
            <div>
              <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Outdoor Monitor <span className="text-primary">1000–1600 Nits</span>
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> จอภาพสำหรับการติดตั้งภายนอกอาคาร ชนิดความสว่างสูง</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> ทนต่อสภาพการใช้งานที่รุนแรง เช่น ฝุ่นละออง อากาศเย็นและร้อน</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> ออกแบบกล่อง/ตู้สำหรับบรรจุตัวเครื่องจากโรงงาน</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> ทดสอบการป้องกันน้ำ ความเย็น ความร้อน จากโรงงาน</li>
                    <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> รับประกันสินค้า 1 ปี นับจากวันส่งมอบ</li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://static.wixstatic.com/media/0597a3_4b83ca4062e04f0285200f3eba338ebc~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/vSmart%20Display%20-%201600nits.png"
                    alt="Outdoor Monitor 1600 Nits"
                    className="max-h-[380px] object-contain drop-shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Outdoor sizes */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {outdoorSizes.map((s, i) => (
                  <div key={i} className="card-surface p-5 text-center hover:border-primary/30 transition-all">
                    <p className="text-3xl font-display font-black text-primary mb-1">{s.size}</p>
                    <p className="text-sm font-semibold text-foreground mb-1">{s.nits}</p>
                    <a href={s.datasheet} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
                      <Download size={12} /> Datasheet
                    </a>
                  </div>
                ))}
              </div>

              {/* Outdoor features */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {outdoorFeatures.map((f) => (
                  <div key={f.title} className="card-surface p-5 hover:border-primary/30 transition-all">
                    <f.icon className="text-primary mb-3" size={28} />
                    <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Outdoor gallery */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  "https://static.wixstatic.com/media/0597a3_09107d93b37144b597c62754cfe22bac~mv2.png/v1/fill/w_439,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_09107d93b37144b597c62754cfe22bac~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_cbd05c66b29942b393b882bb251d7fed~mv2.png/v1/fill/w_439,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_cbd05c66b29942b393b882bb251d7fed~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_95b559fdaf034da198a13c529db0f19c~mv2.png/v1/fill/w_396,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_95b559fdaf034da198a13c529db0f19c~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_188fc06bcf174134abd6ddfa24735bae~mv2.png/v1/fill/w_439,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_188fc06bcf174134abd6ddfa24735bae~mv2.png",
                  "https://static.wixstatic.com/media/0597a3_940c7a65cd59495980fe0a7d6fce64da~mv2.png/v1/fill/w_439,h_396,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_940c7a65cd59495980fe0a7d6fce64da~mv2.png",
                ].map((src, i) => (
                  <div key={i} className="card-surface overflow-hidden rounded-xl">
                    <img src={src} alt={`Outdoor installation ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Window Display */}
          {activeTab === "window" && (
            <div>
              <div className="card-surface overflow-hidden mb-8">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      High Brightness LCD <span className="text-primary">Window Display</span>
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      ตกแต่งร้านของคุณให้โดดเด่นกว่าใคร ด้วยหน้าจอขนาดต่างๆ ไม่ซ้ำแบบใคร
                      มีให้เลือกแบบแสดงผลทั่วไปหรือแบบหน้าจอสัมผัส
                    </p>
                    <p className="text-muted-foreground mb-6 text-sm">
                      Digital signage is the ideal product for digitally showcasing your content.
                      Find out how easy it is to create impactful messages that will get results.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {applications.map((app) => (
                        <span key={app} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{app}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-secondary/30 p-6 flex items-center justify-center">
                    <img
                      src="https://static.wixstatic.com/media/0597a3_25107590998d467abb1b5b0f603701f3~mv2.png/v1/fill/w_600,h_541,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IPC%20-%20119%20(1040%20x%201040%20px)%20(1332%20x%201200%20px).png"
                      alt="Window Display"
                      className="max-h-[350px] object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Window product images */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_ed1ec55afde14b989d99ef11c84769a1~mv2.png/v1/fill/w_328,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_ed1ec55afde14b989d99ef11c84769a1~mv2.png" alt="Window display 1" className="w-full object-contain p-4" loading="lazy" />
                </div>
                <div className="card-surface overflow-hidden">
                  <img src="https://static.wixstatic.com/media/0597a3_e63651de999c48969d065ffa5606abab~mv2.png/v1/fill/w_328,h_328,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_e63651de999c48969d065ffa5606abab~mv2.png" alt="Window display 2" className="w-full object-contain p-4" loading="lazy" />
                </div>
              </div>

              {/* Stretched bar gallery */}
              <div className="mt-8 card-surface overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/0597a3_394e2528ac014a72a46412c83b1d9acb~mv2.png/v1/fill/w_1179,h_738,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_394e2528ac014a72a46412c83b1d9acb~mv2.png"
                  alt="Stretched bar display range"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Windows OS Option */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto">
          <div className="card-surface overflow-hidden p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                  💡 ทางเลือกเพิ่มเติม
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  เปลี่ยนเป็น <span className="text-primary">Windows 10 Pro</span> ได้
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  กรณีที่ไม่ต้องการใช้ Android OS ที่มากับหน้าจอ สามารถเปลี่ยนเป็น Windows 10 Pro OEM
                  เพื่อเข้ากันได้กับโครงการ โดยเลือกประสิทธิภาพ CPU ได้ เช่น Core i3/i5/i7
                  ทำให้โครงการมีความยืดหยุ่นสูง
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://static.wixstatic.com/media/0597a3_75d6d2e9ade74554add617fef3ccca16~mv2.png/v1/fill/w_718,h_407,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-08%20at%2022_04_18.png"
                  alt="Windows 10 Pro option"
                  className="max-h-[260px] object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Signage Software */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Software</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Digital Signage <span className="text-gradient">Management Software</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              ซอฟต์แวร์จัดการเนื้อหาฟรี รองรับการจัดการอุปกรณ์ โปรแกรม และสื่อจากศูนย์กลาง
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {softwareFeatures.map((f) => (
              <div key={f.title} className="card-surface p-5 hover:border-primary/30 transition-all">
                <f.icon className="text-primary mb-3" size={28} />
                <h3 className="font-bold text-foreground mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Software screenshots */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-surface overflow-hidden md:col-span-2">
              <img src="https://static.wixstatic.com/media/0597a3_4231366e9f4b4e59bc95d622fcf5e76c~mv2.png/v1/fill/w_1179,h_664,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png" alt="Digital Signage System" className="w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4">
              <div className="card-surface overflow-hidden">
                <img src="https://static.wixstatic.com/media/0597a3_78e2fe344d5b46a4a0484f6c52ab9df7~mv2.png/v1/fill/w_826,h_558,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-08%20at%2014_02_42.png" alt="Software dashboard" className="w-full object-cover" loading="lazy" />
              </div>
              <div className="card-surface overflow-hidden">
                <img src="https://static.wixstatic.com/media/0597a3_ef72e14aac964a4591a8217c825dc8f2~mv2.png/v1/crop/x_0,y_0,w_1375,h_795/fill/w_419,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-08%20at%2014_02_11.png" alt="Software device management" className="w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="section-padding bg-surface/50" id="downloads">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Downloads</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              ดาวน์โหลด <span className="text-gradient">Price List & Datasheet</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {priceLists.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface p-5 flex items-center gap-4 hover:border-primary/30 transition-all group"
              >
                <Download className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="font-bold text-foreground text-sm">{p.label}</p>
                  <p className="text-xs text-muted-foreground">PDF Download</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="section-padding">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            สนใจสินค้า? <span className="text-gradient">ติดต่อเราเลย</span>
          </h2>
          <p className="text-muted-foreground mb-8">แอดมินพร้อมช่วยเหลือในการออกแบบตู้สำหรับติดตั้ง ระบบ AirFlow และเลือกจอภาพที่เหมาะสม</p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href="tel:020456104" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
              <Phone size={18} /> 02-045-6104
            </a>
            <a href="tel:0957391053" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors">
              <Phone size={18} /> 095-739-1053
            </a>
            <button onClick={() => setShowLineQR(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(142,70%,45%)] text-white font-bold hover:opacity-90 transition-opacity cursor-pointer">
              <MessageCircle size={18} /> Line @entgroup
            </button>
          </div>
        </div>
      </section>

      {/* External link */}
      <section className="section-padding bg-surface/50">
        <div className="container max-w-7xl mx-auto text-center">
          <a href="https://www.entgroup.co.th/smartdisplay" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity">
            <ExternalLink size={20} /> ดูเว็บไซต์ Smart Display เต็มรูปแบบ
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ENT GROUP Co., Ltd. All rights reserved.</p>
      </footer>

      {/* LINE QR Dialog */}
      {showLineQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowLineQR(false)}>
          <div className="bg-background rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(142,70%,45%)]/10 text-[hsl(142,70%,45%)] text-sm font-bold mb-4">
                <MessageCircle size={16} /> LINE Official
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">เพิ่มเพื่อน @entgroup</h3>
              <p className="text-sm text-muted-foreground mb-6">สแกน QR Code หรือกดปุ่มด้านล่างเพื่อเพิ่มเพื่อน</p>
              <div className="bg-white rounded-xl p-4 mb-6 inline-block">
                <img src="https://qr-official.line.me/gs/M_entgroup_BW.png" alt="LINE QR Code @entgroup" className="w-48 h-48 object-contain" />
              </div>
              <div className="space-y-3">
                <a href="https://line.me/R/ti/p/@entgroup?from=page&openQrModal=true&searchId=entgroup" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-[hsl(142,70%,45%)] text-white font-bold hover:opacity-90 transition-opacity">
                  <MessageCircle size={18} /> เพิ่มเพื่อนใน LINE
                </a>
                <button onClick={() => setShowLineQR(false)}
                  className="w-full px-6 py-3 rounded-xl border border-border text-muted-foreground font-medium hover:bg-secondary transition-colors">
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDisplay;
