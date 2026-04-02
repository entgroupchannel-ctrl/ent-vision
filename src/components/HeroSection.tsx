import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import heroIndustrial from "@/assets/hero-industrial.jpg";
import logo from "@/assets/logo-entgroup.avif";

const searchTags = [
  { label: "Mini PC สำนักงาน", href: "#products" },
  { label: "Industrial PC ทนร้อนทนฝุ่น", href: "#products" },
  { label: "Panel PC จอสัมผัสโรงงาน", href: "#products" },
  { label: "Firewall สำหรับ SME", href: "#products" },
  { label: "Zero Client ประหยัดพลังงาน", href: "#products" },
  { label: "Rugged Tablet กันน้ำกันกระแทก", href: "#products" },
  { label: "Industrial Switch เครือข่ายโรงงาน", href: "#products" },
  { label: "Touch Screen POS ร้านค้า", href: "#products" },
  { label: "Rugged Notebook สำหรับภาคสนาม", href: "#products" },
  { label: "Vehicle Tablet ติดรถขนส่ง", href: "#products" },
];

const navLinks = [
  { label: "สินค้า", href: "#products" },
  { label: "Smart Display", href: "/smart-display" },
  { label: "บริการ", href: "#services" },
  { label: "โปรโมชั่น", href: "#promotions" },
  { label: "ติดต่อเรา", href: "#contact" },
];

const heroStats = [
  { value: "500+", label: "ลูกค้าองค์กร" },
  { value: "13+", label: "ปีประสบการณ์" },
  { value: "24/7", label: "ซัพพอร์ต" },
  { value: "OEM", label: "โรงงานโดยตรง" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroIndustrial}
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
          <img src={logo} alt="ENT GROUP" className="h-10 w-auto brightness-0 invert" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} to={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                {l.label}
              </a>
            )
          )}
          <ThemeToggle />
          <button
            onClick={() => setShowLineQR(true)}
            className="px-5 py-2.5 rounded-lg bg-[hsl(142,70%,45%)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <span className="flex items-center gap-2"><MessageCircle size={16} /> LINE @entgroup</span>
          </button>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-30 bg-card border-b border-border p-6 animate-fade-in">
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} to={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-foreground font-medium">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-foreground font-medium">
                {l.label}
              </a>
            )
          ))}
          <div className="flex items-center justify-between mt-4 gap-3">
            <ThemeToggle />
            <button
              onClick={() => { setShowLineQR(true); setMobileMenuOpen(false); }}
              className="flex-1 text-center px-5 py-2.5 rounded-lg bg-[hsl(142,70%,45%)] text-white text-sm font-semibold"
            >
              LINE @entgroup
            </button>
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
    </section>
  );
};

export default HeroSection;
