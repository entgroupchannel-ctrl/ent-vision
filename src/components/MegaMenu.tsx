import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cpu, Monitor, Shield, Tablet, Wifi, Server, Box, Layers,
  Factory, Zap, ChevronRight, ArrowRight, Sparkles, Tv, Sun,
  Droplets, UtensilsCrossed
} from "lucide-react";

/* ═══════ Menu Data ═══════ */
const menuCategories = [
  {
    id: "industrial",
    label: "Industrial PC",
    tagline: "คอมพิวเตอร์เกรดอุตสาหกรรม",
    icon: Cpu,
    featured: {
      title: "GT Series",
      desc: "Mini PC Fanless ถึก ทน แกร่ง — 12 รุ่น ครอบคลุมทุกงาน",
      href: "/gt-series",
      badge: "Best Seller",
    },
    columns: [
      {
        heading: "Mini PC — Fanless",
        links: [
          { label: "GT Series — 12 รุ่น", href: "/gt-series", hot: true },
          { label: "GB Series — Compact", href: "/gb-series" },
          { label: "EPC Series", href: "/epc-series" },
          { label: "EPC Box Series", href: "/epc-box-series" },
        ],
      },
      {
        heading: "Panel PC & Display",
        links: [
          { label: "GK Series — Panel PC", href: "/gk-series", hot: true },
          { label: "Panel PC GTG/GTY", href: "/panel-pc-gtg" },
          { label: "Smart Display & KIOSK", href: "/smart-display" },
        ],
      },
      {
        heading: "เพิ่มเติม",
        links: [
          { label: "Waterproof PC IP69K", href: "/waterproof-pc" },
          { label: "UTC Series", href: "/utc-series" },
        ],
      },
    ],
  },
  {
    id: "network",
    label: "Network & Security",
    tagline: "ระบบเครือข่ายและความปลอดภัย",
    icon: Shield,
    featured: {
      title: "Mini PC Firewall",
      desc: "pfSense / OPNsense Ready — Fanless 2.5G/10G พร้อม Smart Filter",
      href: "/minipc-firewall",
      badge: "Smart Filter",
    },
    columns: [
      {
        heading: "Firewall & Router",
        links: [
          { label: "Mini PC Firewall — 10 รุ่น", href: "/minipc-firewall", hot: true },
        ],
      },
      {
        heading: "Industrial Switch",
        links: [
          { label: "Volktek — Managed Switch", href: "/volktek" },
        ],
      },
    ],
  },
  {
    id: "rugged",
    label: "Rugged Device",
    tagline: "อุปกรณ์ทนทานเกรดทหาร",
    icon: Tablet,
    featured: {
      title: "Rugged Tablet",
      desc: "กันน้ำ กันกระแทก MIL-STD-810G — สำหรับภาคสนามและโลจิสติกส์",
      href: "/rugged-tablet",
      badge: "MIL-STD",
    },
    columns: [
      {
        heading: "Rugged Series",
        links: [
          { label: "Rugged Tablet", href: "/rugged-tablet", hot: true },
        ],
      },
    ],
  },
  {
    id: "solution",
    label: "Solutions",
    tagline: "โซลูชันครบวงจร",
    icon: Layers,
    featured: {
      title: "vCloudPoint",
      desc: "1 เครื่อง PC รองรับ 30 คน — ลดต้นทุน 60% ประหยัดไฟ 80%",
      href: "/vcloudpoint",
      badge: "Zero Client",
    },
    columns: [
      {
        heading: "Shared Computing",
        links: [
          { label: "vCloudPoint Zero Client", href: "/vcloudpoint", hot: true },
        ],
      },
      {
        heading: "Mini PC สำนักงาน",
        links: [
          { label: "Mini PC — Office & SME", href: "/mini-pc" },
        ],
      },
    ],
  },
];

/* ═══════ Component ═══════ */
const MegaMenu = ({
  onNavigate,
}: {
  onNavigate?: () => void;
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(id);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = menuCategories.find((c) => c.id === activeMenu);

  return (
    <div ref={menuRef} className="relative">
      {/* Nav items */}
      <div className="flex items-center gap-1">
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => handleEnter(cat.id)}
            onClick={() => setActiveMenu(activeMenu === cat.id ? null : cat.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === cat.id
                ? "text-white bg-white/10"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mega dropdown overlay */}
      {active && (
        <div
          className="fixed inset-x-0 top-0 z-50"
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleLeave}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveMenu(null)} />

          {/* Panel */}
          <div className="relative bg-[hsl(220,20%,8%)] border-b border-white/10 shadow-2xl animate-fade-in">
            {/* Close bar top */}
            <div className="h-16" />

            <div className="container max-w-7xl mx-auto px-8 pb-10">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <active.icon size={20} className="text-primary" />
                <div>
                  <h3 className="text-white font-bold text-lg">{active.label}</h3>
                  <p className="text-white/40 text-xs">{active.tagline}</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8">
                {/* Featured card — left */}
                <div className="col-span-4">
                  <Link
                    to={active.featured.href}
                    onClick={() => { setActiveMenu(null); onNavigate?.(); }}
                    className="group block rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 p-6 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                        {active.featured.badge}
                      </span>
                      <Sparkles size={12} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-black text-white mb-2 group-hover:text-primary transition-colors">
                      {active.featured.title}
                    </h4>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {active.featured.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      ดูรายละเอียด <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>

                {/* Product columns — right */}
                <div className="col-span-8 grid grid-cols-3 gap-6">
                  {active.columns.map((col) => (
                    <div key={col.heading}>
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-white/30 mb-3">
                        {col.heading}
                      </h5>
                      <ul className="space-y-1">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              to={link.href}
                              onClick={() => { setActiveMenu(null); onNavigate?.(); }}
                              className="group flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <ChevronRight size={12} className="text-white/20 group-hover:text-primary transition-colors" />
                              <span className="text-sm font-medium">{link.label}</span>
                              {link.hot && (
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                                  Hot
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom quick links */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6 text-xs text-white/30">
                  <span className="flex items-center gap-1"><Factory size={11} /> นำเข้าจากโรงงานโดยตรง</span>
                  <span className="flex items-center gap-1"><Zap size={11} /> รับประกัน 1–3 ปี</span>
                  <span className="flex items-center gap-1"><Server size={11} /> สต๊อกพร้อมส่งในไทย</span>
                </div>
                <Link
                  to="/promotions"
                  onClick={() => { setActiveMenu(null); onNavigate?.(); }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  ดูโปรโมชั่นทั้งหมด <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════ Mobile Mega Menu ═══════ */
export const MobileMegaMenu = ({ onNavigate }: { onNavigate?: () => void }) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {menuCategories.map((cat) => (
        <div key={cat.id}>
          <button
            onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
            className="w-full flex items-center justify-between py-3 px-2 text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <cat.icon size={16} className="text-primary" />
              {cat.label}
            </span>
            <ChevronRight
              size={14}
              className={`text-muted-foreground transition-transform duration-200 ${expanded === cat.id ? "rotate-90" : ""}`}
            />
          </button>
          {expanded === cat.id && (
            <div className="pl-6 pb-3 space-y-1 animate-fade-in">
              {/* Featured */}
              <Link
                to={cat.featured.href}
                onClick={onNavigate}
                className="block p-3 rounded-lg bg-primary/10 border border-primary/20 mb-2"
              >
                <span className="text-[9px] font-bold uppercase text-primary">{cat.featured.badge}</span>
                <p className="text-sm font-bold text-foreground">{cat.featured.title}</p>
                <p className="text-xs text-muted-foreground">{cat.featured.desc}</p>
              </Link>
              {cat.columns.map((col) =>
                col.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onNavigate}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <ChevronRight size={10} className="text-primary/50" />
                    {link.label}
                    {link.hot && (
                      <span className="px-1 py-0.5 rounded text-[7px] font-bold bg-red-500/20 text-red-400">Hot</span>
                    )}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      ))}
      <Link
        to="/promotions"
        onClick={onNavigate}
        className="flex items-center gap-2 py-3 px-2 text-foreground font-medium rounded-lg hover:bg-secondary/50"
      >
        <Sparkles size={16} className="text-primary" />
        โปรโมชั่น
      </Link>
    </div>
  );
};

export default MegaMenu;
