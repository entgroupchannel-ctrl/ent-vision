import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Monitor, Cpu, Shield, Zap, Users, Server, ChevronDown,
  ExternalLink, Factory, Building2, GraduationCap, HeadphonesIcon,
  ShoppingCart, Stethoscope, DollarSign, Wrench, Lock, Leaf,
  Play, Download, CheckCircle2, Star, ArrowRight, Phone
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";

/* ═══════ Key Benefits ═══════ */
const benefits = [
  {
    icon: DollarSign,
    stat: "60%",
    title: "ลดต้นทุนลงทุน",
    desc: "ประหยัดงบประมาณการจัดซื้อคอมพิวเตอร์ ไม่ต้องซื้อ License OS ต่อเครื่อง คืนทุนภายใน 6–12 เดือน",
  },
  {
    icon: Zap,
    stat: "80%",
    title: "ประหยัดไฟ",
    desc: "ใช้ไฟเพียง 5W ต่อเครื่อง ค่าไฟไม่เกิน 5 บาท/เดือน No Fan, No Heat เงียบและเย็น",
  },
  {
    icon: Wrench,
    stat: "1×",
    title: "ดูแลง่าย",
    desc: "จัดการจากศูนย์กลาง ติดตั้ง Software ครั้งเดียวใช้ได้ทุกเครื่อง Remote Support ได้ทุกที่",
  },
  {
    icon: Lock,
    stat: "100%",
    title: "ปลอดภัยสูงสุด",
    desc: "ไม่มี Local Storage ข้อมูลเก็บที่ Server เท่านั้น ป้องกัน Data Leak และ Centralized Backup",
  },
];

/* ═══════ How It Works ═══════ */
const howItWorks = [
  { step: "1", title: "Host PC / Server", desc: "เครื่อง PC หรือ Server 1 เครื่อง ติดตั้ง vMatrix Software" },
  { step: "2", title: "Network Connection", desc: "เชื่อมต่อผ่าน Gigabit Ethernet ภายในองค์กร" },
  { step: "3", title: "Zero Client Devices", desc: "อุปกรณ์ Zero Client เชื่อมต่อกับจอ คีย์บอร์ด เมาส์" },
  { step: "4", title: "Ready to Use", desc: "ผู้ใช้ทำงานได้ทันที เสมือนใช้ PC ของตัวเอง" },
];

/* ═══════ Use Cases ═══════ */
const useCases = [
  { icon: GraduationCap, title: "โรงเรียน & มหาวิทยาลัย", desc: "Computer Lab, ห้องสมุด, ห้องเรียนมัลติมีเดีย", stat: "320+ เครื่อง" },
  { icon: Building2, title: "สำนักงาน & สาขา", desc: "Branch Office, ระบบงานเอกสาร, Data Entry", stat: "ปลอดภัย" },
  { icon: Factory, title: "โรงงานอุตสาหกรรม", desc: "QC Station, Data Entry, ทนฝุ่นทนร้อน", stat: "340+ เครื่อง" },
  { icon: HeadphonesIcon, title: "Call Center", desc: "ประสิทธิภาพสูง ค่าใช้จ่ายต่ำ 24/7", stat: "280+ seats" },
  { icon: ShoppingCart, title: "ร้านค้าปลีก & POS", desc: "ติดตั้งง่าย บำรุงรักษาต่ำ", stat: "คืนทุนเร็ว" },
  { icon: Stethoscope, title: "โรงพยาบาล", desc: "ข้อมูลผู้ป่วยปลอดภัย ไม่เก็บใน Local", stat: "180+ จุด" },
];

/* ═══════ vMatrix Features ═══════ */
const vmatrixFeatures = [
  "กำหนดสิทธิ์การเข้าถึงหน้าจอแต่ละ User แบ่งตามพฤติกรรม",
  "จัดการบัญชีผู้ใช้และรหัสผ่าน เพิ่ม User จำนวนมากในครั้งเดียว",
  "รายงาน CPU, Memory, Storage ของ Host PC แบบ Real-time",
  "ตั้งค่าอุปกรณ์ USB, Audio, Resolution, Video แยกตาม User",
  "ควบคุม Private Space / Public Space แต่ละ User",
  "Broadcasting หน้าจอไปทุก Zero Client (สำหรับสอน/ประชุม)",
  "Chatting Room สื่อสารระหว่าง Admin กับ User",
];

/* ═══════ Testimonials ═══════ */
const testimonials = [
  {
    quote: "เริ่มต้นจากแพ็คเกจ 10 เครื่อง ทดลองใช้ในห้อง Computer Lab ผลตอบรับดีมาก ขยายจนครบ 320 เครื่อง ครอบคลุมทุกห้องเรียน ประหยัดค่าไฟได้มหาศาล",
    org: "โรงเรียนมัธยมขนาดใหญ่",
    sector: "การศึกษา",
    count: "320 เครื่อง",
    color: "text-sky-400",
  },
  {
    quote: "ระบบ Shared Computing ช่วยลดต้นทุน IT ลงได้กว่า 60% สภาพแวดล้อมโรงงานที่มีฝุ่นและความร้อน Zero Client ก็ทำงานได้ดีมาก",
    org: "โรงงานผลิตชิ้นส่วนอิเล็กทรอนิกส์",
    sector: "อุตสาหกรรม",
    count: "340 เครื่อง",
    color: "text-amber-400",
  },
  {
    quote: "ขยายธุรกิจเร็วมาก vCloudPoint ช่วยให้ขยายง่าย เพียงเพิ่ม Zero Client ไม่ต้องลงทุน Server ใหม่ทุกครั้ง ระบบเสถียรมาก Uptime สูง",
    org: "Call Center ชั้นนำ",
    sector: "บริการ",
    count: "280 seats",
    color: "text-emerald-400",
  },
];

/* ═══════ Demo CTA Component ═══════ */
const DemoCTA = ({ variant = "primary" }: { variant?: "primary" | "secondary" }) => (
  <div className={`rounded-2xl p-8 md:p-10 text-center ${variant === "primary" ? "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-2 border-primary/30" : "card-surface"}`}>
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
      <Play size={12} /> ทดลองใช้ฟรี 30 วัน
    </div>
    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
      {variant === "primary" ? "จะได้รู้ว่าเหมาะกับคุณหรือเปล่า?" : "พร้อมเริ่มต้นแล้วหรือยัง?"}
    </h3>
    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
      วิศวกรติดตั้งให้ฟรี (Remote Support) · Training ฟรีพร้อมคู่มือ · ไม่พอใจคืนเงิน 100%
    </p>
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      <a
        href="https://line.me/R/ti/p/%40njm2688e"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
      >
        <Phone size={16} /> ขอทดลองใช้ฟรี
      </a>
      <a
        href="https://vcloudpoint.info/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-border text-foreground font-bold text-sm hover:bg-secondary transition-colors"
      >
        ดูรายละเอียดเพิ่มเติม <ExternalLink size={14} />
      </a>
    </div>
    <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> ฟรี 30 วัน</span>
      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> ติดตั้งฟรี</span>
      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> Training ฟรี</span>
      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-primary" /> รับประกัน 3 ปี</span>
    </div>
  </div>
);

/* ═══════ MAIN PAGE ═══════ */
const VCloudPoint = () => {
  const [showVmatrix, setShowVmatrix] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:inline">กลับหน้าหลัก</span>
            </Link>
            <div className="w-px h-6 bg-border" />
            <img src={logo} alt="ENT GROUP" className="h-7 w-auto dark:invert" />
          </div>
          <div className="flex items-center gap-3">
            <a href="https://vcloudpoint.info/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
              vcloudpoint.info <ExternalLink size={12} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sky-500/5" />
        <div className="container max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                  Zero Client
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground">
                  ตัวแทนจำหน่ายอย่างเป็นทางการ
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-2">
                vCloud<span className="text-primary">Point</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-primary/80 mb-4">
                1 เครื่อง PC รองรับได้ถึง 30 คน
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                ใช้แล้วคุ้มค่า ใช้แล้วไม่ปวดหัว — ลงทุนน้อย ลดต้นทุน 60% ประหยัดไฟ 80%
                ด้วยเทคโนโลยี <span className="text-foreground font-semibold">Shared Computing</span>
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { val: "60%", label: "ลดต้นทุน" },
                  { val: "80%", label: "ประหยัดไฟ" },
                  { val: "5W", label: "ต่อเครื่อง" },
                  { val: "30", label: "Users/PC" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
                    <p className="text-xl md:text-2xl font-black text-primary">{s.val}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://line.me/R/ti/p/%40njm2688e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
                >
                  <Play size={16} /> ขอเดโม่ฟรี 30 วัน
                </a>
                <a
                  href="https://vcloudpoint.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
                >
                  ดูรายละเอียดเพิ่มเติม <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl" />
              <img
                src="https://static.wixstatic.com/media/0597a3_2ecc578ac2fa4e14b33ded599f607670~mv2.png/v1/fill/w_610,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_2ecc578ac2fa4e14b33ded599f607670~mv2.png"
                alt="vCloudPoint Zero Client"
                className="relative w-full rounded-2xl"
                loading="eager"
              />
              <div className="mt-4">
                <img
                  src="https://static.wixstatic.com/media/0597a3_cbb51860864645c59b77aaa661958cdc~mv2.png/v1/fill/w_620,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_cbb51860864645c59b77aaa661958cdc~mv2.png"
                  alt="vCloudPoint System Diagram"
                  className="w-full rounded-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is Zero Client ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Zero Client คืออะไร?</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                อุปกรณ์<span className="text-primary">ขนาดเล็ก</span> พลังยิ่งใหญ่
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                vCloudPoint เป็น Zero Client ขนานแท้ — ตัดส่วนประกอบไม่จำเป็นออกหมด ขนาดเล็กพอๆ กับมือถือ ไม่มี Moving Part ไม่มี Local Storage ปลอดภัยสูงสุด เสียบจอ เมาส์ คีย์บอร์ด ก็พร้อมใช้งานทันที
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, text: "ไม่ต้องติดตั้งไดรเวอร์" },
                  { icon: Zap, text: "ใช้ไฟเพียง 5W" },
                  { icon: Lock, text: "ไม่เก็บข้อมูลใน Local" },
                  { icon: Leaf, text: "อายุใช้งานยาวนาน" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2 text-sm text-foreground">
                    <f.icon size={14} className="text-primary shrink-0" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="https://vcloudpoint.info/assets/zero-client-1-D2hOci6Y.jpg" alt="Zero Client" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
              <img src="https://vcloudpoint.info/assets/zero-client-2-C3vMfNlz.jpg" alt="Zero Client ติดจอ" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
              <img src="https://vcloudpoint.info/assets/zero-client-3-Ct4JSYA7.jpg" alt="Zero Client กะทัดรัด" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
              <img src="https://vcloudpoint.info/assets/zero-client-4-55rvfPYj.jpg" alt="Zero Client พอร์ต" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              ประโยชน์ที่<span className="text-primary">คุณจะได้รับ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="card-surface rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <b.icon className="text-primary" size={24} />
                </div>
                <p className="text-3xl font-black text-primary mb-1">{b.stat}</p>
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Demo CTA #1 ── */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <DemoCTA variant="primary" />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              ระบบทำงาน<span className="text-primary">อย่างไร?</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((h, i) => (
              <div key={h.step} className="card-surface rounded-xl p-6 relative">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-lg mb-4">
                  {h.step}
                </div>
                <h3 className="font-bold text-foreground mb-1">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
                {i < 3 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 text-primary/30" size={20} />
                )}
              </div>
            ))}
          </div>

          {/* Ratio visual */}
          <div className="mt-10 card-surface rounded-xl p-6 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <Server className="text-primary mx-auto mb-2" size={40} />
              <p className="text-sm font-bold text-foreground">Host PC</p>
              <p className="text-2xl font-black text-primary">1 เครื่อง</p>
            </div>
            <div className="text-4xl font-black text-primary/30">:</div>
            <div className="text-center">
              <Users className="text-primary mx-auto mb-2" size={40} />
              <p className="text-sm font-bold text-foreground">Zero Clients</p>
              <p className="text-2xl font-black text-primary">สูงสุด 30 เครื่อง</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── vMatrix Software ── */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">vMatrix Server Software</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                ควบคุม<span className="text-primary">จากจุดเดียว</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                vMatrix Server ทำงานบน Windows 7/8/10/11 ให้บริการผู้ใช้ที่เชื่อมต่อจาก Zero Client ได้สูงสุด 30 คน พร้อมระบบจัดการ User, สิทธิ์การเข้าถึง, Broadcasting หน้าจอ และ Chatting Room
              </p>

              <button onClick={() => setShowVmatrix(!showVmatrix)} className="text-sm text-primary font-semibold flex items-center gap-1 mb-4 hover:underline">
                {showVmatrix ? "ซ่อนความสามารถ" : "ดูความสามารถทั้งหมด"}
                <ChevronDown size={14} className={`transition-transform ${showVmatrix ? "rotate-180" : ""}`} />
              </button>

              <div className={`overflow-hidden transition-[max-height] duration-300 ${showVmatrix ? "max-h-[500px]" : "max-h-0"}`}>
                <ul className="space-y-2 mb-4">
                  {vmatrixFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://vcloudpoint.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
              >
                ดาวน์โหลด vMatrix <Download size={14} />
              </a>
            </div>

            <div className="space-y-4">
              <img
                src="https://static.wixstatic.com/media/0597a3_4370580a88c646c88a88dcdf9e7b6dd7~mv2.jpg/v1/fill/w_600,h_598,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_4370580a88c646c88a88dcdf9e7b6dd7~mv2.jpg"
                alt="vMatrix Server Software"
                className="w-full rounded-xl"
                loading="lazy"
              />
              <img
                src="https://static.wixstatic.com/media/0597a3_f4c88e348b9e4916a08c834a965cc703~mv2.jpg/v1/fill/w_598,h_598,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/contral.jpg"
                alt="vMatrix Control Panel"
                className="w-full rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Solutions</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              โซลูชันสำหรับ<span className="text-primary">ทุกธุรกิจ</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.title} className="card-surface rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <uc.icon className="text-primary" size={22} />
                  </div>
                  <span className="text-xs font-bold text-primary">{uc.stat}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{uc.title}</h3>
                <p className="text-sm text-muted-foreground">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              เรื่องราว<span className="text-primary">ความสำเร็จ</span>
            </h2>
            <p className="text-muted-foreground mt-2">กรณีศึกษาจริงจากองค์กรที่ประสบความสำเร็จด้วย vCloudPoint</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.org} className="card-surface rounded-xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.org}</p>
                    <p className="text-[11px] text-muted-foreground">{t.sector}</p>
                  </div>
                  <span className={`text-xs font-bold ${t.color}`}>{t.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            {[
              { val: "500+", label: "องค์กรใช้งาน" },
              { val: "1,000+", label: "เครื่องที่ติดตั้ง" },
              { val: "95%", label: "ขยายระบบ" },
              { val: "4.9/5", label: "คะแนนรีวิว" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl card-surface">
                <p className="text-2xl font-black text-primary">{s.val}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flood Relief Program ── */}
      <section className="py-12 bg-secondary/30">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="card-surface rounded-2xl p-8 border-2 border-sky-500/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30">
                โครงการพิเศษ
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-foreground mb-3">
              ร่วมฟื้นฟูการศึกษา สู้ภัยน้ำท่วม — ลด 30%
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              สำหรับทุกโรงเรียนที่ประสบภัย: ฟรีติดตั้ง + ฟรี Training + ฟรีซอฟต์แวร์ + รับประกัน 3 ปี + 10 โรงเรียนแรกรับอุปกรณ์เสริมมูลค่า 10,000 บาท
            </p>
            <a href="https://line.me/R/ti/p/%40njm2688e" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
              สอบถามโครงการ <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">มาตรฐานและการรับรอง</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["FCC Class A&B", "CE", "CCC", "RoHS", "BIS", "NOM", "ISO 9001:2015", "ISO 14001:2015"].map((cert) => (
              <span key={cert} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-4xl mx-auto px-6">
          <DemoCTA variant="secondary" />
        </div>
      </section>
    </div>
  );
};

export default VCloudPoint;
