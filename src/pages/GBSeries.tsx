import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Cpu, Wifi, Monitor, Usb, ThermometerSun, Wind,
  Shield, Zap, HardDrive, Network, ChevronDown, ExternalLink,
  Factory, Building2, Truck, Stethoscope, Server, MonitorSmartphone
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FooterCompact from "@/components/FooterCompact";

/* ───── Product Data ───── */

const models = [
  {
    id: "gb1000",
    name: "GB1000",
    tagline: "Ultra-Compact Champion",
    description: "ขนาดเล็กที่สุดในซีรีส์ เพียง 21×18×5.2 cm เล็กกว่า GB5000 ถึง 60% แต่ยังคงประสิทธิภาพ Industrial Grade",
    badge: "NEW",
    image: "https://static.wixstatic.com/media/0597a3_8f5ea734fd4e41de8db85394a03f50bf~mv2.png/v1/fill/w_477,h_477,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GB1000%20(4).png",
    portImage: "https://static.wixstatic.com/media/0597a3_0573ad6ed4564cb6bceda0c8b4b63124~mv2.png/v1/fill/w_1028,h_261,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-26%20at%2013_34_11.png",
    highlights: [
      { icon: Monitor, text: "21×18×5.2 cm", sub: "Ultra-Compact" },
      { icon: Wind, text: "Fanless", sub: "0 dB Silent" },
      { icon: Usb, text: "6x COM", sub: "RS232/422/485" },
      { icon: Network, text: "2x LAN", sub: "Gigabit" },
    ],
    features: [
      "ขนาดเล็กที่สุด เพียง 21×18×5.2 cm",
      "Fanless Silent — ไร้เสียงรบกวน",
      "6x COM Ports สำหรับอุปกรณ์อุตสาหกรรม",
      "Dual Display — HDMI + VGA",
      "4x USB Ports",
      "DIN Rail / Wall Mount",
    ],
    useCases: [
      { icon: Building2, title: "Office & SME", desc: "POS, Kiosk, Reception Desk" },
      { icon: Factory, title: "Small Factory", desc: "Machine Control, QC Station" },
      { icon: Truck, title: "Transportation", desc: "In-vehicle PC, Fleet Management" },
      { icon: Stethoscope, title: "Healthcare", desc: "Medical Equipment, Lab Data" },
    ],
    specs: {
      left: [
        { cat: "Platform", rows: [["CPU", "Intel Celeron / Core i"], ["Chipset", "Intel Bay Trail / Broadwell"]] },
        { cat: "Memory & Storage", rows: [["RAM", "DDR3L SO-DIMM, Max 8GB"], ["Storage", "1x mSATA + 1x 2.5\" SATA"]] },
        { cat: "Display", rows: [["Output", "1x HDMI + 1x VGA"], ["Resolution", "1920×1080"]] },
      ],
      right: [
        { cat: "I/O Ports", rows: [["COM", "6x RS232 (2x RS422/RS485)"], ["USB", "4x USB (2.0/3.0)"], ["LAN", "2x Gigabit Ethernet"]] },
        { cat: "Power & Env", rows: [["Power", "DC 12V"], ["Temp", "-20°C ~ +60°C"], ["Size", "210×180×52 mm"]] },
      ],
    },
  },
  {
    id: "gb2000",
    name: "GB2000",
    tagline: "Network Professional",
    description: "เครือข่ายความเร็วสูง 2.5G LAN พร้อม Legacy I/O ครบครัน PS/2, GPIO, LPT รองรับ 3G/4G Module",
    image: "https://static.wixstatic.com/media/0597a3_b7d3859e0bcf4d2eaeb80e45384e91dc~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/industrial%20pc%20GB2000%20(2).jpg",
    portImage: "https://static.wixstatic.com/media/0597a3_79cf8621f41a4181bec353e60cb515b6~mv2.png/v1/fill/w_1088,h_257,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-26%20at%2013_06_22.png",
    highlights: [
      { icon: Network, text: "2x 2.5G LAN", sub: "Intel i225V" },
      { icon: Usb, text: "6x COM", sub: "RS422/RS485" },
      { icon: Zap, text: "GPIO", sub: "7in + 7out" },
      { icon: Wifi, text: "3G/4G Ready", sub: "SIM Slot" },
    ],
    features: [
      "2x Intel i225V 2.5 Gigabit LAN",
      "6x COM + GPIO (7in/7out) + LPT + PS/2",
      "3G/4G Module Ready พร้อม SIM Slot",
      "Fanless -20°C ~ +60°C",
      "Aluminum Alloy Shell",
      "Watchdog, AWAL, RTC, WOL",
    ],
    useCases: [
      { icon: Factory, title: "Factory Automation", desc: "PLC, SCADA, Sensor Networks" },
      { icon: Server, title: "Edge Computing", desc: "Network Gateway, IoT Hub" },
      { icon: Truck, title: "Remote Sites", desc: "4G Management, Remote Monitor" },
      { icon: Building2, title: "Legacy Upgrade", desc: "PS/2, LPT, COM Legacy Support" },
    ],
    specs: {
      left: [
        { cat: "Platform", rows: [["CPU", "Intel Celeron / Core i"], ["Chipset", "Intel SoC"]] },
        { cat: "Memory & Storage", rows: [["RAM", "DDR4 SO-DIMM, Max 16GB"], ["Storage", "1x M.2 + 1x 2.5\" SATA"]] },
        { cat: "Display", rows: [["Output", "1x HDMI + 1x VGA"], ["Resolution", "4K@30Hz (HDMI)"]] },
      ],
      right: [
        { cat: "I/O Ports", rows: [["COM", "6x RS232 (4x RS422/RS485)"], ["USB", "6x USB"], ["LAN", "2x Intel i225V 2.5GbE"], ["GPIO", "7 input + 7 output"], ["Other", "PS/2, LPT Port"]] },
        { cat: "Power & Env", rows: [["Power", "DC 9-36V"], ["Temp", "-20°C ~ +60°C"], ["Size", "~220×180×60 mm"]] },
      ],
    },
  },
  {
    id: "gb4000",
    name: "GB4000",
    tagline: "Connectivity King",
    description: "พอร์ต USB สูงสุด 10 ช่อง และ COM สูงสุด 12 ช่อง มีทั้ง v1 (Legacy Max) และ v2 (USB Max) รองรับ CPU Gen 4-13",
    badge: "Best Seller",
    image: "https://static.wixstatic.com/media/0597a3_95c69a88c2ba459e88ffef869f27fb02~mv2.png/v1/fill/w_244,h_218,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_95c69a88c2ba459e88ffef869f27fb02~mv2.png",
    portImage: "https://static.wixstatic.com/media/0597a3_508c69f5680e4666ac1d0e89ad4263e7~mv2.png/v1/fill/w_862,h_313,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-26%20at%2010_42_28.png",
    highlights: [
      { icon: Usb, text: "สูงสุด 12 COM", sub: "v1: Legacy Max" },
      { icon: Usb, text: "สูงสุด 10 USB", sub: "v2: USB Max" },
      { icon: Cpu, text: "Gen 4-13", sub: "Intel Core i" },
      { icon: ThermometerSun, text: "-20~+60°C", sub: "Wide Temp" },
    ],
    features: [
      "v1: 12x COM (6x DB9 + 6x RS232 Terminal)",
      "v2: 10x USB + 6x COM",
      "CPU: Intel Gen 4 ถึง Gen 13 (Raptor Lake)",
      "DDR4 Max 64GB, M.2 NVMe + SATA",
      "Fanless Aluminum Alloy Shell",
      "ประกัน 1 ปี (เพิ่มได้สูงสุด 3 ปี)",
    ],
    useCases: [
      { icon: Factory, title: "SCADA / BMS", desc: "ระบบควบคุมอาคาร, โรงงาน" },
      { icon: Server, title: "Legacy Integration", desc: "COM 12 ช่อง สำหรับระบบเก่า" },
      { icon: MonitorSmartphone, title: "USB Heavy", desc: "10 USB สำหรับอุปกรณ์ทันสมัย" },
      { icon: Shield, title: "24/7 Mission", desc: "อัตราเสียหาย < 1%" },
    ],
    specs: {
      left: [
        { cat: "Platform", rows: [["CPU", "Intel Core i3/i5/i7 Gen 4-13"], ["Chipset", "Intel H/Q Series"]] },
        { cat: "Memory & Storage", rows: [["RAM", "DDR4 SO-DIMM, Max 64GB"], ["Storage", "2x M.2 NVMe + 1x SATA"]] },
        { cat: "Display", rows: [["Output", "1x HDMI + 1x VGA (v1) / 2x HDMI (v2)"], ["Resolution", "4K@30Hz"]] },
      ],
      right: [
        { cat: "I/O Ports (v1)", rows: [["COM", "12x (6x DB9 + 6x Terminal)"], ["USB", "6x USB"], ["LAN", "2x GbE"]] },
        { cat: "I/O Ports (v2)", rows: [["COM", "6x DB9"], ["USB", "10x USB"], ["LAN", "2x GbE"]] },
        { cat: "Power & Env", rows: [["Power", "DC 9-36V"], ["Temp", "-20°C ~ +60°C"]] },
      ],
    },
  },
  {
    id: "gb5000",
    name: "GB5000",
    tagline: "Premium Performance",
    description: "ประสิทธิภาพสูงสุดด้วย Intel Core i7-13650HX (14 cores, 20 threads), DDR5 64GB, 4x HDMI 2.0 4K@60Hz และ 4x 2.5G LAN",
    badge: "Premium",
    image: "https://static.wixstatic.com/media/0597a3_84464f31e83d47a982b5ee3b559db400~mv2.png/v1/fill/w_496,h_496,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GB5000%20(1).png",
    portImage: "https://static.wixstatic.com/media/0597a3_b27a4d1466524aa88d306288b92a6f13~mv2.png/v1/fill/w_1088,h_398,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-26%20at%2011_16_53.png",
    highlights: [
      { icon: Cpu, text: "i7-13650HX", sub: "14C / 20T" },
      { icon: Monitor, text: "4x HDMI 2.0", sub: "4K@60Hz" },
      { icon: Network, text: "4x 2.5G LAN", sub: "Intel i226V" },
      { icon: HardDrive, text: "DDR5 64GB", sub: "2x M.2 NVMe" },
    ],
    features: [
      "Intel Core i7-13650HX — 14 cores, 20 threads",
      "DDR5 RAM สูงสุด 64GB",
      "4x HDMI 2.0 (4K@60Hz) — Multi-Display",
      "4x Intel i226V 2.5G LAN",
      "6x COM + 5G Module Ready",
      "Dual Power Input 9-36V",
    ],
    useCases: [
      { icon: Monitor, title: "Digital Signage", desc: "4 จอ 4K พร้อมกัน" },
      { icon: Factory, title: "Control Room", desc: "SCADA, Multi-monitor" },
      { icon: Server, title: "Edge AI", desc: "ประมวลผลหนักที่ขอบ" },
      { icon: Shield, title: "Enterprise 24/7", desc: "อัตราเสียหาย < 1%" },
    ],
    specs: {
      left: [
        { cat: "Platform", rows: [["CPU", "Intel Core i7-13650HX (14C/20T)"], ["Chipset", "Intel HM770"]] },
        { cat: "Memory & Storage", rows: [["RAM", "DDR5 SO-DIMM, Max 64GB"], ["Storage", "2x M.2 NVMe + 1x SATA"]] },
        { cat: "Display", rows: [["Output", "4x HDMI 2.0"], ["Resolution", "4K@60Hz × 4 จอ"]] },
      ],
      right: [
        { cat: "I/O Ports", rows: [["COM", "6x RS232 (4x RS422/RS485)"], ["USB", "8x USB (3.0/2.0)"], ["LAN", "4x Intel i226V 2.5GbE"]] },
        { cat: "Power & Env", rows: [["Power", "DC 9-36V (Dual Input)"], ["Temp", "-20°C ~ +60°C"], ["Wireless", "5G Module Ready"]] },
      ],
    },
  },
];

const comparisonRows = [
  { label: "ขนาด", gb1000: "21×18×5.2 cm", gb2000: "~22×18×6 cm", gb4000: "Standard", gb5000: "Large" },
  { label: "CPU", gb1000: "Celeron/Core i", gb2000: "Celeron/Core i", gb4000: "Gen 4-13", gb5000: "i7-13650HX" },
  { label: "RAM สูงสุด", gb1000: "8GB DDR3L", gb2000: "16GB DDR4", gb4000: "64GB DDR4", gb5000: "64GB DDR5" },
  { label: "LAN", gb1000: "2x GbE", gb2000: "2x 2.5GbE", gb4000: "2x GbE", gb5000: "4x 2.5GbE" },
  { label: "COM Ports", gb1000: "6", gb2000: "6", gb4000: "สูงสุด 12", gb5000: "6" },
  { label: "USB Ports", gb1000: "4", gb2000: "6", gb4000: "สูงสุด 10", gb5000: "8" },
  { label: "Display", gb1000: "HDMI+VGA", gb2000: "HDMI+VGA", gb4000: "HDMI+VGA / 2xHDMI", gb5000: "4x HDMI 2.0" },
  { label: "GPIO", gb1000: "—", gb2000: "7in+7out", gb4000: "—", gb5000: "—" },
  { label: "4G/5G", gb1000: "—", gb2000: "3G/4G", gb4000: "—", gb5000: "5G Ready" },
  { label: "Wide Temp", gb1000: "✓", gb2000: "✓", gb4000: "✓", gb5000: "✓" },
  { label: "เหมาะสำหรับ", gb1000: "SME, พื้นที่จำกัด", gb2000: "Network, Legacy", gb4000: "COM/USB เยอะ", gb5000: "Multi-Display, AI" },
];

/* ───── Collapsible Section Component ───── */
const CollapsibleSpec = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors text-left"
      >
        <span className="font-semibold text-sm">{title}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-[2000px]" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
};

/* ───── Model Card Component ───── */
const ModelCard = ({ model, isActive, onClick }: { model: typeof models[0]; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 text-center ${
      isActive
        ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
        : "border-border bg-card hover:border-primary/30 hover:-translate-y-1"
    }`}
  >
    {model.badge && (
      <span className={`absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
        model.badge === "Premium" ? "bg-amber-500 text-white"
        : model.badge === "Best Seller" ? "bg-destructive text-destructive-foreground"
        : "bg-primary text-primary-foreground"
      }`}>
        {model.badge}
      </span>
    )}
    <img src={model.image} alt={model.name} className="w-24 h-24 object-contain mb-3" loading="lazy" />
    <h3 className="text-lg font-black text-foreground">{model.name}</h3>
    <p className="text-xs text-primary font-medium">{model.tagline}</p>
  </button>
);

/* ───── Main Page ───── */
const GBSeries = () => {
  const [activeModel, setActiveModel] = useState(0);
  const current = models[activeModel];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> หน้าแรก
          </Link>
          <h1 className="text-sm font-bold">GB Series Industrial PC</h1>
          <a
            href="https://line.me/R/ti/p/@entgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            ขอใบเสนอราคา
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="container max-w-7xl mx-auto px-6 py-16 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Industrial Grade Computer</span>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4">
              GB<span className="text-gradient"> SERIES</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2">ซีรีส์คอมพิวเตอร์อุตสาหกรรมครบครัน ตอบโจทย์ทุกความต้องการ</p>
            <p className="text-primary font-semibold">"4 รุ่น 4 สไตล์ — 1 มาตรฐานคุณภาพเดียวกัน"</p>
          </div>

          {/* Model Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {models.map((m, i) => (
              <ModelCard key={m.id} model={m} isActive={i === activeModel} onClick={() => setActiveModel(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Active Model Detail */}
      <section className="border-t border-border">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          {/* Model Header */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-black text-foreground">{current.name}</h2>
                <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">{current.tagline}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{current.description}</p>

              {/* Highlight chips */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {current.highlights.map((h) => (
                  <div key={h.text} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                    <h.icon className="text-primary shrink-0" size={20} />
                    <div>
                      <div className="text-sm font-bold text-foreground">{h.text}</div>
                      <div className="text-[11px] text-muted-foreground">{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features list */}
              <ul className="space-y-2">
                {current.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <img
                src={current.image}
                alt={current.name}
                className="max-w-sm w-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Tabs: Use Cases / Specs / Ports */}
          <Tabs defaultValue="usecases" className="space-y-6">
            <TabsList className="w-full justify-start bg-secondary/30 p-1 h-auto flex-wrap">
              <TabsTrigger value="usecases" className="text-xs sm:text-sm">🏭 การใช้งาน</TabsTrigger>
              <TabsTrigger value="specs" className="text-xs sm:text-sm">📋 Specifications</TabsTrigger>
              <TabsTrigger value="ports" className="text-xs sm:text-sm">🔌 Ports & I/O</TabsTrigger>
            </TabsList>

            <TabsContent value="usecases">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {current.useCases.map((uc) => (
                  <div key={uc.title} className="card-surface p-5 text-center">
                    <uc.icon className="mx-auto text-primary mb-3" size={28} />
                    <h4 className="font-bold text-foreground mb-1">{uc.title}</h4>
                    <p className="text-xs text-muted-foreground">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="card-surface overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  {[current.specs.left, current.specs.right].map((col, ci) => (
                    <div key={ci} className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-border">
                          {col.map((section) => (
                            <>
                              <tr key={section.cat}>
                                <td colSpan={2} className="px-4 py-2 bg-secondary/40 font-bold text-xs uppercase tracking-wider text-primary">
                                  {section.cat}
                                </td>
                              </tr>
                              {section.rows.map(([label, value]) => (
                                <tr key={label} className="hover:bg-secondary/20">
                                  <td className="px-4 py-2 font-medium text-muted-foreground w-1/3">{label}</td>
                                  <td className="px-4 py-2 text-foreground">{value}</td>
                                </tr>
                              ))}
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ports">
              <div className="card-surface p-4">
                <img
                  src={current.portImage}
                  alt={`${current.name} Ports`}
                  className="w-full max-w-4xl mx-auto object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border bg-secondary/20">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <CollapsibleSpec title="📊 เปรียบเทียบทุกรุ่น GB Series">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Feature</th>
                    {models.map((m) => (
                      <th key={m.id} className="px-4 py-3 text-center font-bold text-foreground">{m.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="hover:bg-secondary/20">
                      <td className="px-4 py-2.5 font-medium text-muted-foreground">{row.label}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{row.gb1000}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{row.gb2000}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{row.gb4000}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{row.gb5000}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSpec>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-display font-bold mb-3">
            พร้อมเริ่มต้น<span className="text-gradient">แล้วหรือยัง?</span>
          </h2>
          <p className="text-muted-foreground mb-8">ปรึกษาผู้เชี่ยวชาญของเราเพื่อหาโซลูชันที่เหมาะสมกับธุรกิจของคุณ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://line.me/R/ti/p/@entgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
            >
              ขอใบเสนอราคา
            </a>
            <a
              href="https://www.entgroup.co.th/_files/ugd/0597a3_7775cf506c644020a3239be2ef131caa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-card text-foreground font-bold hover:bg-secondary/50 transition-colors"
            >
              <ExternalLink size={18} /> ดาวน์โหลดภาพรวมผลิตภัณฑ์
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

expo

      <FooterCompact />rt default GBSeries;
