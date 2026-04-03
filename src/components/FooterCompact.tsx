import { Phone, MapPin, Facebook, Youtube, Instagram, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-entgroup.avif";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/entgroup", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@entgroup", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/entgroup", label: "Instagram" },
];

const quickLinks = [
  { label: "GT Series", href: "/gt-series" },
  { label: "Mini PC Firewall", href: "/minipc-firewall" },
  { label: "Panel PC", href: "/panel-pc-gtg" },
  { label: "Rugged Tablet", href: "/rugged-tablet" },
  { label: "vCloudPoint", href: "/vcloudpoint" },
  { label: "Smart Display", href: "/smart-display" },
];

const FooterCompact = () => {
  return (
    <footer className="bg-[hsl(220,20%,10%)] text-[hsl(210,20%,85%)] border-t border-border">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo + Contact */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
            <div className="w-px h-8 bg-[hsl(220,15%,20%)]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-white">บจก. อีเอ็นที กรุ๊ป</span>
              <div className="flex items-center gap-3 text-[11px] text-[hsl(215,15%,55%)]">
                <a href="tel:020456104" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Phone size={10} /> 02-045-6104
                </a>
                <a href="https://www.entgroup.co.th" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MapPin size={10} /> entgroup.co.th
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links — horizontal */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[11px] text-[hsl(215,15%,55%)] hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[hsl(220,15%,18%)] flex items-center justify-center text-[hsl(215,15%,55%)] hover:text-primary hover:bg-[hsl(220,15%,22%)] transition-colors"
                aria-label={s.label}
              >
                <s.icon size={12} />
              </a>
            ))}
            <LineQRButton
              className="ml-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary/20 transition-colors flex items-center gap-1"
            >
              LINE @entgroup
            </LineQRButton>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[hsl(220,15%,15%)]">
        <div className="container max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[hsl(215,15%,40%)]">
            © {new Date().getFullYear()} ENT Group Co., Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[10px] text-[hsl(215,15%,40%)]">
            <Link to="/" className="hover:text-primary transition-colors">หน้าหลัก</Link>
            <span>·</span>
            <a href="https://www.entgroup.co.th" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">เกี่ยวกับเรา</a>
            <span>·</span>
            <span className="text-primary/70">PDPA ✓</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCompact;
