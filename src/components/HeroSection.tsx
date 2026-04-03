import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, UserPlus, LogOut, User, LogIn, FileText } from "lucide-react";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import MegaMenu, { MobileMegaMenu } from "@/components/MegaMenu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import heroIndustrial from "@/assets/hero-industrial.jpg";
import logo from "@/assets/logo-entgroup.avif";

const searchIndex = [
  { keywords: ["mini pc", "มินิพีซี", "สำนักงาน", "office", "thin client"], label: "Mini PC สำนักงาน", href: "/mini-pc" },
  { keywords: ["gt", "gt series", "industrial pc", "โรงงาน", "fanless", "ทนร้อน", "ทนฝุ่น", "อุตสาหกรรม"], label: "GT Series — Industrial Mini PC", href: "/gt-series" },
  { keywords: ["gb", "gb series", "compact", "คอมแพค"], label: "GB Series — Compact PC", href: "/gb-series" },
  { keywords: ["epc", "epc box", "embedded"], label: "EPC Box Series", href: "/epc-box-series" },
  { keywords: ["epc series"], label: "EPC Series", href: "/epc-series" },
  { keywords: ["panel pc", "gk", "จอสัมผัส", "touch", "หน้าจอ", "touchscreen"], label: "GK Series — Panel PC", href: "/gk-series" },
  { keywords: ["gtg", "gty", "panel pc gtg", "stainless", "ip65"], label: "Panel PC GTG/GTY", href: "/panel-pc-gtg" },
  { keywords: ["utc", "utc series"], label: "UTC Series", href: "/utc-series" },
  { keywords: ["firewall", "ไฟร์วอลล์", "network security", "pfsense", "opnsense", "sme"], label: "Mini PC Firewall", href: "/minipc-firewall" },
  { keywords: ["smart display", "kiosk", "คีออส", "digital signage", "จอโฆษณา", "monitor"], label: "Smart Display & KIOSK", href: "/smart-display" },
  { keywords: ["rugged", "tablet", "แท็บเล็ต", "notebook", "ทหาร", "กันน้ำ", "กันกระแทก", "ภาคสนาม", "vehicle"], label: "Rugged Tablet / Notebook", href: "/rugged-tablet" },
  { keywords: ["volktek", "switch", "เครือข่าย", "network", "สวิตช์"], label: "Volktek Industrial Switch", href: "/volktek" },
  { keywords: ["vcloudpoint", "zero client", "thin client", "ประหยัดพลังงาน"], label: "vCloudPoint Zero Client", href: "/vcloudpoint" },
  { keywords: ["waterproof", "ip69k", "กันน้ำ", "ล้างน้ำ", "อาหาร", "food"], label: "Waterproof PC IP69K", href: "/waterproof-pc" },
  { keywords: ["โปรโมชั่น", "promotion", "ลดราคา", "sale"], label: "โปรโมชั่น", href: "/promotions" },
  { keywords: ["ติดต่อ", "contact", "สอบถาม", "โทร"], label: "ติดต่อเรา", href: "/contact" },
  { keywords: ["ใบเสนอราคา", "quote", "ขอราคา"], label: "ขอใบเสนอราคา", href: "/quote" },
  { keywords: ["gt1000"], label: "GT1000 — Entry Level", href: "/gt-series?tab=GT1000" },
  { keywords: ["gt1400", "gpio"], label: "GT1400 — GPIO + 2.5G LAN", href: "/gt-series?tab=GT1400" },
  { keywords: ["gt4500"], label: "GT4500 — DDR4 + SIM 4G/5G", href: "/gt-series?tab=GT4500" },
  { keywords: ["gt7000"], label: "GT7000 — คำตอบทุกปัญหาโรงงาน", href: "/gt-series?tab=GT7000" },
  { keywords: ["gt9000"], label: "GT9000 — 3 HDMI 6 COM NVMe", href: "/gt-series?tab=GT9000" },
  { keywords: ["gb1000"], label: "GB1000 — Ultra-Compact", href: "/gb-series" },
  { keywords: ["gb5000"], label: "GB5000 — Premium Performance", href: "/gb-series" },
  { keywords: ["pos", "ร้านค้า", "ขายของ"], label: "Panel PC สำหรับ POS ร้านค้า", href: "/panel-pc-gtg" },
];

const searchTags = [
  { label: "Mini PC สำนักงาน", href: "/mini-pc" },
  { label: "Industrial PC ทนร้อนทนฝุ่น", href: "/gt-series" },
  { label: "Panel PC จอสัมผัสโรงงาน", href: "/panel-pc-gtg" },
  { label: "Firewall สำหรับ SME", href: "/minipc-firewall" },
  { label: "Zero Client ประหยัดพลังงาน", href: "/vcloudpoint" },
  { label: "Rugged Tablet กันน้ำกันกระแทก", href: "/rugged-tablet" },
  { label: "Industrial Switch เครือข่ายโรงงาน", href: "/volktek" },
  { label: "Touch Screen POS ร้านค้า", href: "/panel-pc-gtg" },
  { label: "Rugged Notebook สำหรับภาคสนาม", href: "/rugged-tablet" },
  { label: "Vehicle Tablet ติดรถขนส่ง", href: "/rugged-tablet" },
];

const navLinks = [
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "ติดต่อเรา", href: "/contact" },
];

const heroStats = [
  { value: "8,000+", label: "ลูกค้าองค์กร" },
  { value: "13+", label: "ปีประสบการณ์" },
  { value: "50+", label: "รุ่นสินค้าพร้อมส่ง" },
  { value: "OEM", label: "ราคาจากผู้ผลิตโดยตรง" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search logic
  const searchResults = searchQuery.trim().length >= 1
    ? searchIndex.filter((item) => {
        const q = searchQuery.toLowerCase();
        return item.label.toLowerCase().includes(q) || item.keywords.some((k) => k.includes(q));
      }).slice(0, 8)
    : [];

  const handleSearch = () => {
    if (searchResults.length > 0) {
      navigate(searchResults[0].href);
      setSearchQuery("");
      setSearchOpen(false);
    } else if (searchQuery.trim()) {
      navigate(`/contact?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setSearchOpen(false);
  };
          alt="Industrial Computing Production Line"
          className="w-full h-full object-cover"
          width={1920}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="ENT GROUP" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-2">
          <MegaMenu />
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} to={l.href} className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                {l.label}
              </a>
            )
          )}
          <div className="w-px h-6 bg-white/10 mx-1" />
          <ThemeToggle />
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="บัญชีผู้ใช้"
            >
              <User size={20} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border shadow-xl py-1 z-50 animate-fade-in">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border truncate">
                      {user.email}
                    </div>
                    <Link
                      to="/my-quotes"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <FileText size={14} /> ใบเสนอราคาของฉัน
                    </Link>
                    <button
                      onClick={async () => { setUserMenuOpen(false); await signOut(); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut size={14} /> ออกจากระบบ
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/admin-login"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <LogIn size={14} /> เข้าสู่ระบบ
                    </Link>
                    <Link
                      to="/member-register"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <UserPlus size={14} /> สมัครสมาชิก
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-30 bg-card border-b border-border p-6 animate-fade-in max-h-[80vh] overflow-y-auto">
          <MobileMegaMenu onNavigate={() => setMobileMenuOpen(false)} />
          <div className="flex items-center justify-between mt-4 gap-3 pt-4 border-t border-border">
            <ThemeToggle />
            {user ? (
              <button
                onClick={async () => { setMobileMenuOpen(false); await signOut(); }}
                className="flex-1 text-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                ออกจากระบบ
              </button>
            ) : (
              <div className="flex-1 flex gap-2">
                <Link
                  to="/admin-login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-lg border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/member-register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Content — left-aligned for impact */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl py-16 md:py-0">
          <p className="text-sm md:text-base text-primary font-semibold tracking-widest uppercase mb-4 animate-fade-up">
            Mini PC Factory Outlet — นำเข้าจากโรงงานโดยตรง
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] mb-6 animate-fade-up text-white" style={{ animationDelay: "0.1s" }}>
            โซลูชัน{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--accent))]">
              Industrial Computing
            </span>
            <br />
            สำหรับประเทศไทย
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            พันธมิตรธุรกิจที่คุณไว้วางใจ — Mini PC, Panel PC, Rugged Device
            และซอฟต์แวร์ครบวงจร สำหรับงานโรงงาน งานประมูล และงานโครงการ
          </p>

          {/* Search */}
          <div className="relative max-w-xl mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
              <Search className="ml-4 text-white/50" size={20} />
              <input
                type="text"
                placeholder="บอกความต้องการ เช่น Mini PC โรงงาน, Firewall SME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-white/40 outline-none text-sm md:text-base"
              />
              <button className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                ค้นเลย
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 max-w-xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {searchTags.slice(0, 6).map((tag) => (
              <a
                key={tag.label}
                href={tag.href}
                className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                {tag.label}
              </a>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-display font-black text-primary">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8 animate-bounce">
        <a href="#products" className="text-white/40 hover:text-white/70 transition-colors">
          <ChevronDown size={28} />
        </a>
      </div>

    </section>
  );
};

export default HeroSection;
