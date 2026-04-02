import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";

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
  { label: "บริการ", href: "#services" },
  { label: "โปรโมชั่น", href: "#promotions" },
  { label: "ติดต่อเรา", href: "#contact" },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#" className="text-2xl font-display font-bold tracking-tight text-foreground">
          ENT <span className="text-gradient">GROUP</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="https://line.me/R/ti/p/@entgroup?from=page&openQrModal=true&searchId=entgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            LINE @entgroup
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-30 bg-card border-b border-border p-6 animate-fade-in">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-foreground font-medium">
              {l.label}
            </a>
          ))}
          <a
            href="https://line.me/R/ti/p/@entgroup?from=page&openQrModal=true&searchId=entgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            LINE @entgroup
          </a>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-sm md:text-base text-primary font-semibold tracking-widest uppercase mb-4 animate-fade-up">
            สวัสดีจาก ENT GROUP
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            โซลูชัน <span className="text-gradient">Industrial Computing</span> สำหรับประเทศไทย
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            พันธมิตรธุรกิจที่คุณไว้วางใจ — Mini PC, Panel PC, Rugged Device และซอฟต์แวร์ครบวงจร
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center bg-surface border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
              <Search className="ml-4 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="บอกความต้องการ เช่น Mini PC โรงงาน, Firewall SME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none text-sm md:text-base"
              />
              <button className="px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                ค้นเลย
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {searchTags.map((tag) => (
              <a
                key={tag.label}
                href={tag.href}
                className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm border border-border hover:bg-surface-hover hover:border-primary/30 transition-all"
              >
                {tag.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
