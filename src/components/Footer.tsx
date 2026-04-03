import { useState } from "react";
import { MessageCircle, ChevronDown, Phone, Mail, MapPin, Facebook, Instagram, Youtube, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-entgroup.avif";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      console.log("[Newsletter] Inserting email:", email);
      const { error } = await supabase.from("subscribers").insert({ email, source: "website_footer" });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "อีเมลนี้สมัครรับข่าวสารแล้ว", variant: "destructive" });
        } else {
          throw error;
        }
      } else {
        setSuccess(true);
        setEmail("");
        toast({ title: "สมัครรับข่าวสารสำเร็จ!" });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      toast({ title: "เกิดข้อผิดพลาด กรุณาลองใหม่", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="กรอกอีเมลของคุณ"
        className="flex-1 px-4 py-2.5 rounded-lg bg-white/80 border border-gray-300 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary dark:bg-[hsl(220,15%,15%)] dark:border-[hsl(220,15%,22%)] dark:text-white dark:placeholder:text-[hsl(215,15%,40%)]"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : success ? <><CheckCircle size={16} /> สำเร็จ!</> : "สมัคร"}
      </button>
    </form>
  );
};

const footerSections = [
  {
    title: "งานบริการไอที",
    links: [
      { label: "Software Develop", href: "https://www.entgroup.co.th", external: true },
      { label: "MA Service", href: "https://www.entgroup.co.th", external: true },
      { label: "IT Outsourcing", href: "https://www.entgroup.co.th", external: true },
      { label: "Networking", href: "https://www.entgroup.co.th", external: true },
    ],
  },
  {
    title: "สินค้า",
    links: [
      { label: "GT Series — Mini PC", href: "/gt-series" },
      { label: "GK Series — Panel PC", href: "/gk-series" },
      { label: "EPC Series", href: "/epc-series" },
      { label: "Rugged Tablet", href: "/rugged-tablet" },
      { label: "Mini PC", href: "/mini-pc" },
      { label: "Panel PC", href: "/panel-pc-gtg" },
      { label: "Waterproof PC", href: "/waterproof-pc" },
      { label: "NVIDIA Jetson", href: "https://nvidia-jetson.com/", external: true },
      { label: "Smart Display", href: "/smart-display" },
    ],
  },
  {
    title: "เว็บไซต์ในเครือ",
    links: [
      { label: "Rugged Device", href: "https://entgroup-rugged.com", external: true },
      { label: "NVIDIA Jetson", href: "https://nvidia-jetson.com", external: true },
      { label: "Online Shopping", href: "https://www.entgroup.co.th", external: true },
      { label: "ENT Group Biz", href: "https://www.entgroup.co.th", external: true },
    ],
  },
  {
    title: "เกี่ยวกับเรา",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about-us" },
      { label: "ติดต่อเรา / แผนที่", href: "/contact" },
      { label: "ขอใบเสนอราคา", href: "/quote" },
      { label: "โปรโมชั่น", href: "/promotions" },
      { label: "Smart Display", href: "/smart-display" },
      { label: "Touch Monitor", href: "/panel-pc-gtg" },
    ],
  },
];

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/entgroup", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@entgroup", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/entgroup", label: "Instagram" },
];

const CollapsibleSection = ({ title, links }: { title: string; links: typeof footerSections[0]["links"] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-[hsl(220,15%,18%)] md:border-0">
      {/* Mobile: clickable header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 md:py-0 md:pointer-events-none md:cursor-default text-left"
      >
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3>
        <ChevronDown
          size={16}
          className={`text-gray-400 dark:text-[hsl(215,15%,55%)] transition-transform duration-200 md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Links — always visible on desktop, collapsible on mobile */}
      <ul
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:!max-h-[500px] md:mt-3 ${
          open ? "max-h-[500px] pb-3" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.label} className="mb-1.5">
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-[hsl(215,15%,55%)] hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-sm text-gray-500 dark:text-[hsl(215,15%,55%)] hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-border" id="contact">



      {/* Main Footer */}
      <div className="bg-gradient-to-b from-white via-gray-100 to-gray-300 text-gray-700 dark:from-[hsl(220,15%,16%)] dark:via-[hsl(220,18%,10%)] dark:to-[hsl(220,20%,6%)] dark:text-[hsl(210,20%,85%)]">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <img src={logo} alt="ENT GROUP" className="h-10 w-auto mb-4" />
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">บริษัท อีเอ็นที กรุ๊ป จำกัด</p>
              <p className="text-xs text-gray-500 dark:text-[hsl(215,15%,55%)] leading-relaxed mb-4">
                เมทโทร บิซทาวน์ แจ้งวัฒนะ2<br />
                70/5 หมู่ 4 ต.คลองพระอุดม<br />
                อ.ปากเกร็ด จ.นนทบุรี 11120
              </p>

              <div className="space-y-1.5 mb-4">
                <a href="tel:020456104" className="flex items-center gap-2 text-xs text-gray-500 dark:text-[hsl(215,15%,55%)] hover:text-primary transition-colors">
                  <Phone size={12} /> 02-045-6104
                </a>
                <a href="tel:0957391053" className="flex items-center gap-2 text-xs text-gray-500 dark:text-[hsl(215,15%,55%)] hover:text-primary transition-colors">
                  <Phone size={12} /> 095-739-1053, 084-046-1315
                </a>
                <a href="https://www.entgroup.co.th" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-500 dark:text-[hsl(215,15%,55%)] hover:text-primary transition-colors">
                  <MapPin size={12} /> www.entgroup.co.th
                </a>
              </div>

              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-300 transition-colors dark:bg-[hsl(220,15%,18%)] dark:text-[hsl(215,15%,55%)] dark:hover:bg-[hsl(220,15%,22%)]"
                    aria-label={s.label}
                  >
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Collapsible Link Sections */}
            {footerSections.map((section) => (
              <CollapsibleSection key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-300 dark:border-[hsl(220,15%,18%)]">
          <div className="container max-w-7xl mx-auto px-6 py-8 text-center">
            <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">สมัครรับข่าวสาร</h3>
            <p className="text-xs text-gray-500 dark:text-[hsl(215,15%,55%)] mb-4">
              รับข่าวสารล่าสุดเกี่ยวกับสินค้า โปรโมชั่น และเทคโนโลยีใหม่ๆ จาก ENT Group
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* PDPA */}
        <div className="border-t border-gray-300 dark:border-[hsl(220,15%,18%)]">
          <div className="container max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/60 dark:bg-[hsl(220,15%,12%)]">
              <span className="text-lg">🔒</span>
              <div>
                <p className="text-xs font-bold text-foreground mb-1">การคุ้มครองข้อมูลส่วนบุคคล (PDPA)</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  บริษัท อีเอ็นที กรุ๊ป จำกัด ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                  ข้อมูลของท่าน ได้แก่ ชื่อ อีเมล เบอร์โทรศัพท์ และข้อมูลบริษัท จะถูกจัดเก็บเพื่อวัตถุประสงค์ในการจัดทำใบเสนอราคา ให้คำปรึกษาด้านเทคนิค
                  และบริการหลังการขายเท่านั้น เราจะไม่จำหน่าย แบ่งปัน หรือเปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-[hsl(220,15%,18%)]">
          <div className="container max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">เงื่อนไขการรับประกัน</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors">การชำระเงิน</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors">ติดต่อเรา</a>
              <span>|</span>
              <span className="text-primary">เป็นไปตาม PDPA ✓</span>
              <span>|</span>
              <Link to="/admin-login" className="hover:text-primary transition-colors">Admin</Link>
            </div>
            <p className="text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} ENT Group Co., Ltd. All rights reserved. — NVIDIA Jetson Solutions by ENT Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
