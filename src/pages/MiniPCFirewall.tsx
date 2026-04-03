import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Shield, Wifi, Network, Cpu, Wind, Zap, Server,
  ChevronDown, Download, ExternalLink, Factory, Building2,
  Stethoscope, Building, Globe, Landmark, MonitorSmartphone
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";

/* ═══════════════════════════════════════════
   TIER SYSTEM — like GT Series
   ═══════════════════════════════════════════ */

type Tier = "entry" | "standard" | "advanced" | "enterprise";

const tierMeta: Record<Tier, { label: string; color: string; bg: string; border: string; desc: string }> = {
  entry:      { label: "Entry",      color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", desc: "บ้าน / SOHO / ร้านค้าเล็ก" },
  standard:   { label: "Standard",   color: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/30",     desc: "SMB / สำนักงาน / สาขา" },
  advanced:   { label: "Advanced",   color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   desc: "องค์กรขนาดกลาง / Multi-WAN" },
  enterprise: { label: "Enterprise", color: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/30",  desc: "Data Center / ISP / 24/7 Critical" },
};

/* ═══════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════ */

interface FirewallModel {
  id: string;
  name: string;
  tier: Tier;
  tagline: string;
  cpu: string;
  ram: string;
  storage: string;
  lan: string;
  cooling: string;
  power: string;
  extra: string[];
  image: string;
  pdf?: string;
  badge?: string;
  useCases: string[];
}

const models: FirewallModel[] = [
  // ── Entry ──
  {
    id: "gt196l",
    name: "GT196L",
    tier: "entry",
    tagline: "6 LAN Budget Firewall",
    cpu: "Intel Celeron J1900 Quad-core 2.0GHz",
    ram: "DDR3L สูงสุด 8GB",
    storage: "mSATA SSD + 2.5\" SATA",
    lan: "6× Gigabit LAN",
    cooling: "Fanless (Passive)",
    power: "DC 12V, TDP ~10W",
    extra: ["VGA + HDMI Dual Display", "USB 3.0 + USB 2.0", "COM Port", "Watchdog, WOL, RTC"],
    image: "https://static.wixstatic.com/media/3e5003_7edf97bd0932432ea2e4893cdcd73f92~mv2.jpg/v1/crop/x_2,y_0,w_1998,h_784/fill/w_600,h_235,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.jpg",
    pdf: "https://www.entgroup.co.th/_files/ugd/3e5003_71ee8f3705a84e9e94bbcb8366adf413.pdf",
    useCases: ["ร้านกาแฟ / Co-Working", "บ้าน / Home Office", "ร้านค้าปลีก"],
  },
  {
    id: "jc6l",
    name: "JC6L",
    tier: "entry",
    tagline: "Compact Multi-Port Mini PC",
    cpu: "Intel Celeron / Core i3 / Core i5",
    ram: "DDR3L / DDR4 สูงสุด 16GB",
    storage: "mSATA + 2.5\" SATA",
    lan: "2× Gigabit LAN",
    cooling: "Fanless (Passive)",
    power: "DC 12V, TDP ~15W",
    extra: ["HDMI + VGA Dual Display", "USB 3.0 × 2 + USB 2.0 × 4", "COM Port", "Audio Port"],
    image: "https://static.wixstatic.com/media/3e5003_5d4cd19e619c44129b809d9836cbc5e9~mv2.jpg/v1/fill/w_600,h_345,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.jpg",
    pdf: "https://www.entgroup.co.th/_files/ugd/3e5003_041ee40698204dca81633a6611d57b3c.pdf",
    useCases: ["POS / Kiosk", "สำนักงานเล็ก", "Media Player"],
  },

  // ── Standard ──
  {
    id: "gt194l-j4125",
    name: "GT194L-J4125",
    tier: "standard",
    tagline: "4× 2.5G LAN Fanless Firewall",
    cpu: "Intel Celeron J4125 Quad-core 2.0–2.7GHz (10W TDP)",
    ram: "2× DDR4 SO-DIMM สูงสุด 16GB",
    storage: "mSATA SSD + 2.5\" SATA",
    lan: "4× Intel i225-V 2.5G LAN",
    cooling: "Fanless (Passive)",
    power: "DC 12V, TDP 10W",
    extra: ["HDMI + VGA Dual Display", "2× USB 3.0", "SIM Slot (WiFi/3G/4G)", "AES-NI, ESXI, Watchdog, PXE, WOL"],
    image: "https://static.wixstatic.com/media/005637_6b06b556c0094dc5887ac5ec6e382636~mv2.png/v1/crop/x_1073,y_0,w_2291,h_1249/fill/w_464,h_252,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/J4125%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87-01.png",
    pdf: "https://www.entgroup.co.th/_files/ugd/005637_822d9fce1dac4cd8a83514391d12d899.pdf",
    badge: "Best Seller",
    useCases: ["pfSense / OPNsense", "Branch Office", "VPN Gateway"],
  },
  {
    id: "gt194l-n5105",
    name: "GT194L-N5105",
    tier: "standard",
    tagline: "4× 2.5G LAN + Core i3/i5/i7 Option",
    cpu: "N5105 / i3-1115G4 / i5-1135G7 / i7-1165G7",
    ram: "2× DDR4 SO-DIMM สูงสุด 32GB",
    storage: "M.2 NVMe 2280 + 2.5\" SATA",
    lan: "4× Intel i225-V 2.5G LAN",
    cooling: "Fanless (Passive)",
    power: "DC 12V",
    extra: ["HDMI 2.0 + DP 1.4 Dual 4K@60Hz", "2× USB 3.0 + 2× USB 2.0", "Console RJ45 COM", "AES-NI, ESXI, PVE, Watchdog"],
    image: "https://static.wixstatic.com/media/005637_d5f666a44c89404fa8de382c4744001a~mv2.png/v1/crop/x_734,y_0,w_2879,h_1249/fill/w_527,h_228,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/N5105%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87-01.png",
    pdf: "https://www.entgroup.co.th/_files/ugd/005637_62c6ba289fad40c5802517a12048c9f9.pdf",
    badge: "NEW",
    useCases: ["Enterprise Firewall", "ESXI / Proxmox", "Network Appliance"],
  },
  {
    id: "eight-net",
    name: "Eight Net",
    tier: "standard",
    tagline: "8 LAN Network Appliance",
    cpu: "Intel Celeron / Atom Series",
    ram: "DDR3L สูงสุด 8GB",
    storage: "mSATA + 2.5\" SATA",
    lan: "8× Gigabit LAN",
    cooling: "Fanless (Passive)",
    power: "DC 12V",
    extra: ["VGA + HDMI", "USB Ports", "Compact Form Factor", "DIN Rail / Wall Mount"],
    image: "https://static.wixstatic.com/media/005637_e17fbeeea8b34d33bb93e4d2d15e88ed~mv2.jpg/v1/fill/w_600,h_174,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Banner8LAN.jpg",
    pdf: "https://www.entgroup.co.th/_files/ugd/005637_6173027ead324ba6a039eecba9ad5e8d.pdf",
    useCases: ["Multi-WAN Load Balance", "VLAN Segmentation", "SD-WAN"],
  },

  // ── Advanced (New Gen) ──
  {
    id: "ipc056",
    name: "IPC056",
    tier: "advanced",
    tagline: "8-Port Budget Passive Cooling",
    cpu: "Intel Celeron (Low Power)",
    ram: "DDR4 สูงสุด 16GB",
    storage: "M.2 SSD + SATA",
    lan: "8× 1GbE Ports",
    cooling: "Passive (Fanless)",
    power: "DC 12V",
    extra: ["Compact Desktop Form", "Low Power Consumption", "pfSense / OPNsense Ready"],
    image: "https://static.wixstatic.com/media/0597a3_95dce4df7104449c9c76e8ee3d411522~mv2.png/v1/fill/w_367,h_332,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
    useCases: ["Branch Office", "Retail", "Co-working Space"],
  },
  {
    id: "ipc068",
    name: "IPC068",
    tier: "advanced",
    tagline: "6× 2.5GbE Active Cooling",
    cpu: "Intel Alder Lake N100",
    ram: "DDR5 สูงสุด 16GB",
    storage: "M.2 NVMe + SATA",
    lan: "6× 2.5GbE Intel i226-V",
    cooling: "Active (Fan)",
    power: "DC 12V",
    extra: ["CPU รุ่นใหม่ล่าสุด", "2.5Gbps ทุกพอร์ต", "Compact Form Factor"],
    image: "https://static.wixstatic.com/media/0597a3_c089124e09f443ab80fc7d2037451994~mv2.png/v1/fill/w_367,h_332,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
    pdf: "https://www.entgroup.co.th/_files/ugd/0597a3_481b334d2fab416cb19251801d4a2ef1.pdf",
    badge: "NEW",
    useCases: ["Modern SMB", "Creative Office", "Multi-WAN Gateway"],
  },
  {
    id: "ipc050",
    name: "IPC050",
    tier: "advanced",
    tagline: "Passive Cooling Compact Firewall",
    cpu: "Intel Celeron / Pentium",
    ram: "DDR4 สูงสุด 16GB",
    storage: "M.2 SSD",
    lan: "4–6× Gigabit LAN",
    cooling: "Passive (Fanless)",
    power: "DC 12V",
    extra: ["Ultra-Silent Operation", "Industrial Grade Aluminum", "VPN / Router Ready"],
    image: "https://static.wixstatic.com/media/0597a3_44e46e3431634bdcbeed58569230a615~mv2.png/v1/fill/w_367,h_332,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
    pdf: "https://www.entgroup.co.th/_files/ugd/0597a3_cfd539daa7844ac5a31132ea4b648f7b.pdf",
    useCases: ["Silent Office", "Edge Gateway", "VPN Server"],
  },

  // ── Enterprise ──
  {
    id: "ipc090",
    name: "IPC090",
    tier: "enterprise",
    tagline: "Xeon + 10Gbps SFP+ Rackmount",
    cpu: "Intel Xeon E5 (12–18 Cores, 24–36 Threads)",
    ram: "DDR4 ECC สูงสุด 64GB",
    storage: "2TB SATA",
    lan: "6× Intel i211 1GbE + 2–10× 10G SFP+",
    cooling: "Active (Rack Fan)",
    power: "ATX PSU 250W",
    extra: ["1U Rackmount Form Factor", "2× PCIe X8 + 1× PCIe X16", "Console + VGA + HDMI", "รองรับ 4 รุ่น: A/B/C/D"],
    image: "https://static.wixstatic.com/media/0597a3_7546fd5ffe2042ac870dba31b88443ab~mv2.png/v1/fill/w_279,h_176,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-15%20at%2013_33_21.png",
    badge: "Pro",
    useCases: ["Data Center", "ISP / Carrier", "Virtualization Host"],
  },
  {
    id: "ipc092",
    name: "IPC092",
    tier: "enterprise",
    tagline: "Dual PSU + 10Gbps SFP+ HA",
    cpu: "Intel Core i7/i9 / Xeon",
    ram: "DDR4 สูงสุด 128GB",
    storage: "NVMe + SATA RAID",
    lan: "6× 1GbE + 10G SFP+",
    cooling: "Active (Dual Fan)",
    power: "Dual PSU Hotswap",
    extra: ["High Availability 99.9%+", "Zero Downtime Maintenance", "Premium i9-9900 Option", "Rackmount 1U/2U"],
    image: "https://static.wixstatic.com/media/0597a3_a946edead58c4ed58d8fea75abd12b8e~mv2.png/v1/fill/w_372,h_332,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
    badge: "HA",
    useCases: ["Banking / Finance", "Government 24/7", "Mission Critical"],
  },
];

/* ═══════════════════════════════════════════
   IPC090 Sub-models for comparison
   ═══════════════════════════════════════════ */

const ipc090Models = [
  { model: "IPC090-A", cpu: "E5-2650V4", cores: "12C/24T", sfp: "2× 10G SFP+", ram: "16GB", storage: "2TB", psu: "250W ATX" },
  { model: "IPC090-B", cpu: "E5-2667V4", cores: "8C/16T",  sfp: "4× 10G SFP+", ram: "16GB", storage: "2TB", psu: "250W ATX" },
  { model: "IPC090-C", cpu: "E5-2682V4", cores: "16C/32T", sfp: "6× 10G SFP+", ram: "16GB", storage: "2TB", psu: "250W ATX" },
  { model: "IPC090-D", cpu: "E5-2697V4", cores: "18C/36T", sfp: "10× 10G SFP+", ram: "16GB", storage: "2TB", psu: "250W ATX" },
];

/* ═══════════════════════════════════════════
   Decision Helper
   ═══════════════════════════════════════════ */

const decisionHelper = [
  { need: "งบจำกัด + ต้องการพอร์ตเยอะ", rec: "GT196L / IPC056", tier: "entry" as Tier },
  { need: "SMB + 2.5G Network", rec: "GT194L Series", tier: "standard" as Tier },
  { need: "ต้องการความเร็ว + ขนาดเล็ก", rec: "IPC068", tier: "advanced" as Tier },
  { need: "ประสิทธิภาพสูงสุด + 10G", rec: "IPC090", tier: "enterprise" as Tier },
  { need: "ไม่ยอมรับ downtime", rec: "IPC092 (Dual PSU)", tier: "enterprise" as Tier },
];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

const CollapsibleSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-surface rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors">
        <h3 className="font-bold text-foreground text-left">{title}</h3>
        <ChevronDown className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} size={18} />
      </button>
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-[3000px]" : "max-h-0"}`}>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
};

const ModelCard = ({ model }: { model: FirewallModel }) => {
  const tier = tierMeta[model.tier];
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`card-surface rounded-xl overflow-hidden border ${tier.border} hover:shadow-lg transition-all duration-300`}>
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${tier.bg} ${tier.color}`}>
              {tier.label}
            </span>
            {model.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                {model.badge}
              </span>
            )}
          </div>
          {model.pdf && (
            <a href={model.pdf} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors" title="Download Datasheet">
              <Download size={16} />
            </a>
          )}
        </div>

        {/* Image */}
        <div className="relative h-36 mb-4 flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden">
          <img src={model.image} alt={model.name} className="max-h-full max-w-full object-contain" loading="lazy" />
        </div>

        {/* Info */}
        <h3 className="text-xl font-black text-foreground">{model.name}</h3>
        <p className="text-xs text-primary/70 font-medium mb-2">{model.tagline}</p>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cpu size={12} className="text-primary shrink-0" />
            <span className="truncate">{model.cpu.split(" ").slice(0, 3).join(" ")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Network size={12} className="text-primary shrink-0" />
            <span className="truncate">{model.lan}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Wind size={12} className="text-primary shrink-0" />
            <span>{model.cooling}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Zap size={12} className="text-primary shrink-0" />
            <span>{model.power}</span>
          </div>
        </div>

        {/* Use Cases */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {model.useCases.map((uc) => (
            <span key={uc} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-secondary border border-border text-muted-foreground">
              {uc}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
          {expanded ? "ซ่อนรายละเอียด" : "ดูสเปกเต็ม"}
          <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded specs */}
      <div className={`overflow-hidden transition-[max-height] duration-300 ${expanded ? "max-h-[600px]" : "max-h-0"}`}>
        <div className="px-5 pb-5 pt-0 border-t border-border">
          <table className="w-full text-xs mt-3">
            <tbody>
              {[
                ["CPU", model.cpu],
                ["RAM", model.ram],
                ["Storage", model.storage],
                ["LAN", model.lan],
                ["Cooling", model.cooling],
                ["Power", model.power],
              ].map(([label, val]) => (
                <tr key={label} className="border-b border-border/30">
                  <td className="py-2 pr-3 font-semibold text-muted-foreground w-24">{label}</td>
                  <td className="py-2 text-foreground">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">คุณสมบัติเพิ่มเติม</p>
            <ul className="space-y-1">
              {model.extra.map((e) => (
                <li key={e} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>{e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

const MiniPCFirewall = () => {
  const [activeTier, setActiveTier] = useState<Tier | "all">("all");
  const filtered = activeTier === "all" ? models : models.filter((m) => m.tier === activeTier);

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
          <ThemeToggle />
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5" />
        <div className="container max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-destructive/10 text-destructive border border-destructive/30">
                  Network Security
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground">
                  pfSense / OPNsense Ready
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4">
                Mini PC<span className="text-primary"> Firewall</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Firewall Appliance ตั้งแต่ระดับ Home Office จนถึง Data Center —
                ประหยัดค่าใช้จ่าย ปรับแต่งได้ รองรับ <span className="text-foreground font-semibold">Open Source Firewall</span> ทุกยี่ห้อ
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Fanless Silent", "2.5G / 10G LAN", "AES-NI", "24/7 Operation"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                เลือกรุ่นที่เหมาะกับคุณ <ChevronDown size={16} />
              </a>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl" />
              <img
                src="https://static.wixstatic.com/media/0597a3_6ebc77045f9a4292bb485a4fa91ac3a2~mv2.png/v1/fill/w_600,h_441,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-15%20at%2012_02_13.png"
                alt="Firewall Appliance Lineup"
                className="relative w-full max-w-md mx-auto drop-shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Firewall Mini PC ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              ทำไมต้อง <span className="text-primary">Mini PC Firewall</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "ประหยัดค่าใช้จ่าย", desc: "ใช้ Open Source Firewall ฟรี เช่น pfSense, OPNsense ไม่ต้องจ่ายค่า License รายปี" },
              { icon: Wifi, title: "ปรับแต่งได้เต็มที่", desc: "กำหนดกฎ, VPN, IDS/IPS, VLAN ได้ตามต้องการ ยืดหยุ่นกว่าอุปกรณ์สำเร็จรูป" },
              { icon: Wind, title: "Fanless & ทนทาน", desc: "เปิด 24/7 ไม่มีเสียงรบกวน ประหยัดไฟ ไม่ดูดฝุ่น อายุการใช้งานยาวนาน" },
              { icon: Globe, title: "รองรับทุกขนาด", desc: "ตั้งแต่บ้าน, SMB, จนถึง Data Center เลือกรุ่นได้ตามขนาดเครือข่าย" },
            ].map((f) => (
              <div key={f.title} className="card-surface rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <f.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Decision Helper ── */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Decision Helper</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              เลือก<span className="text-primary">รุ่นไหนดี?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {decisionHelper.map((d) => {
              const t = tierMeta[d.tier];
              return (
                <div key={d.need} className={`card-surface rounded-xl p-5 border ${t.border}`}>
                  <p className="text-sm text-foreground font-medium mb-2">"{d.need}"</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${t.color}`}>→ {d.rec}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section id="products" className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">All Models</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              สินค้า<span className="text-primary">ทั้งหมด</span>
            </h2>
          </div>

          {/* Tier Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTier("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTier === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              ทั้งหมด ({models.length})
            </button>
            {(Object.keys(tierMeta) as Tier[]).map((t) => {
              const meta = tierMeta[t];
              const count = models.filter((m) => m.tier === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTier(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTier === t
                      ? `${meta.bg} ${meta.color} border ${meta.border}`
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {meta.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── IPC090 Xeon Comparison ── */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <CollapsibleSection title="📊 IPC090 Xeon — เปรียบเทียบ 4 รุ่นย่อย" defaultOpen={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">รุ่น</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">CPU</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">Cores</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">SFP+</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">RAM</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">Storage</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase">PSU</th>
                  </tr>
                </thead>
                <tbody>
                  {ipc090Models.map((m) => (
                    <tr key={m.model} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-3 font-bold text-primary">{m.model}</td>
                      <td className="py-3 px-3 text-foreground">{m.cpu}</td>
                      <td className="py-3 px-3 text-foreground">{m.cores}</td>
                      <td className="py-3 px-3 text-foreground font-semibold">{m.sfp}</td>
                      <td className="py-3 px-3 text-muted-foreground">{m.ram}</td>
                      <td className="py-3 px-3 text-muted-foreground">{m.storage}</td>
                      <td className="py-3 px-3 text-muted-foreground">{m.psu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">* ทุกรุ่นมี 6× Intel i211 1GbE + 2× PCIe X8 + 1× PCIe X16 + Console + VGA + HDMI + 2× USB</p>
          </CollapsibleSection>
        </div>
      </section>

      {/* ── Software Compatibility ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Compatibility</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              รองรับ<span className="text-primary">ทุกระบบ</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {["pfSense", "OPNsense", "Untangle", "Sophos XG", "VyOS", "Windows Server", "Ubuntu Server", "Proxmox VE", "ESXi", "RouterOS", "IPFire", "Endian"].map((sw) => (
              <div key={sw} className="card-surface rounded-lg p-3 text-center hover:border-primary/30 transition-all">
                <p className="text-xs font-semibold text-foreground">{sw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Use Cases</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">เหมาะกับ<span className="text-primary">ทุกองค์กร</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Building, title: "Home Office", desc: "ปกป้องเครือข่ายบ้าน" },
              { icon: Building2, title: "SME / สำนักงาน", desc: "VPN, Firewall, QoS" },
              { icon: Factory, title: "โรงงาน", desc: "แยก VLAN, OT Security" },
              { icon: Stethoscope, title: "โรงพยาบาล", desc: "HIPAA Compliance" },
              { icon: Landmark, title: "ราชการ", desc: "Security Policy, Audit" },
              { icon: Server, title: "Data Center", desc: "10G SFP+, HA Cluster" },
            ].map((uc) => (
              <div key={uc.title} className="card-surface rounded-xl p-5 text-center hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <uc.icon className="text-primary" size={20} />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">{uc.title}</h4>
                <p className="text-[11px] text-muted-foreground">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
          <p className="text-muted-foreground mb-8">ปรึกษาผู้เชี่ยวชาญของเราเพื่อหาโซลูชันที่เหมาะสมกับธุรกิจของคุณ</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://line.me/R/ti/p/%40njm2688e" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
              <ExternalLink size={16} /> ขอใบเสนอราคา
            </a>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors">
              <ArrowLeft size={16} /> กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiniPCFirewall;
