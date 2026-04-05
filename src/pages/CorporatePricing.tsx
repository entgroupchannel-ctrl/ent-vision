import { Link } from "react-router-dom";
import {
  Building2, Users, FileText, Phone, CheckCircle, TrendingDown, ShieldCheck,
  Headphones, ArrowRight, Star, Globe, Truck, Award, Handshake, Clock, Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { useState } from "react";
import corporateHero from "@/assets/corporate-hero.jpg";
import corporateFlatlay from "@/assets/corporate-products-flatlay.jpg";
import corporateFactory from "@/assets/corporate-factory.jpg";

const tiers = [
  { qty: "5–9 เครื่อง", discount: "ส่วนลดพิเศษ", icon: Layers, accent: "border-primary/20" },
  { qty: "10–49 เครื่อง", discount: "ส่วนลด + จัดส่งฟรี", icon: Truck, accent: "border-primary/40" },
  { qty: "50–99 เครื่อง", discount: "ราคาโปรเจกต์ + On-site", icon: Building2, accent: "border-primary/60" },
  { qty: "100+ เครื่อง", discount: "ราคา OEM/ODM พิเศษ", icon: Award, accent: "border-primary" },
];

const benefits = [
  { icon: TrendingDown, title: "ส่วนลดตามจำนวน", desc: "ยิ่งซื้อมาก ยิ่งประหยัด ด้วยโครงสร้างราคาแบบขั้นบันได" },
  { icon: ShieldCheck, title: "รับประกันขยาย", desc: "ขยายการรับประกันได้สูงสุด 3 ปี สำหรับโครงการขนาดใหญ่" },
  { icon: Headphones, title: "Account Manager เฉพาะ", desc: "มีผู้ดูแลบัญชีประจำ พร้อมช่องทางติดต่อเร่งด่วน" },
  { icon: FileText, title: "เอกสารครบถ้วน", desc: "ใบเสนอราคา ใบกำกับภาษี หนังสือค้ำประกัน ครบจบในที่เดียว" },
];

const steps = [
  { step: 1, title: "ติดต่อทีมขาย", desc: "แจ้งรายการสินค้า จำนวน และ Timeline ที่ต้องการ" },
  { step: 2, title: "รับใบเสนอราคา", desc: "ทีมงานจัดทำใบเสนอราคาพิเศษภายใน 1 วันทำการ" },
  { step: 3, title: "อนุมัติและสั่งซื้อ", desc: "อนุมัติ PO พร้อมเงื่อนไขการชำระเงินที่ยืดหยุ่น" },
  { step: 4, title: "จัดส่งและติดตั้ง", desc: "จัดส่งพร้อมทีมวิศวกรติดตั้ง On-site (ถ้าต้องการ)" },
];

const trustStats = [
  { val: "8,000+", label: "ลูกค้าองค์กร", icon: Users },
  { val: "10+", label: "ปีประสบการณ์", icon: Clock },
  { val: "500+", label: "โครงการส่งมอบ", icon: Globe },
  { val: "99%", label: "ลูกค้าพึงพอใจ", icon: Star },
];

const CorporatePricing = () => {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ราคาองค์กร & Volume Discount — ENT Group"
        description="เงื่อนไขราคาพิเศษสำหรับองค์กร โรงงาน และโครงการขนาดใหญ่ ส่วนลดตามจำนวน พร้อมบริการ Account Manager เฉพาะ"
        path="/corporate-pricing"
      />

      {/* ── Hero Section ── */}
      <section className="relative h-[480px] md:h-[520px] overflow-hidden">
        <img
          src={corporateHero}
          alt="Corporate partnership meeting"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-primary/90 text-primary-foreground border-0 text-xs px-3 py-1">
            <Handshake className="w-3.5 h-3.5 mr-1.5" /> Enterprise Partner Program
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl">
            ราคาองค์กร<br />
            <span className="text-primary">Volume Discount</span>
          </h1>
          <p className="text-white/80 mt-4 max-w-lg text-sm md:text-base leading-relaxed">
            เงื่อนไขพิเศษสำหรับลูกค้าองค์กร โรงงาน และโครงการภาครัฐ —
            ด้วยประสบการณ์กว่า 10 ปี ในการจัดหาโซลูชัน Industrial PC ให้องค์กรชั้นนำ
          </p>
          <div className="flex gap-3 mt-6">
            <Button size="lg" onClick={() => setShowQuote(true)} className="text-sm md:text-base shadow-lg">
              <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
            </Button>
            <Link to="/contact-us">
              <Button size="lg" variant="outline" className="text-sm md:text-base border-white/30 text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> ติดต่อทีมขาย
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Stats Bar ── */}
      <section className="bg-primary/5 border-y border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-foreground">{s.val}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Volume Tiers ── */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 text-xs">Tiered Pricing</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">โครงสร้างส่วนลดตามจำนวน</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">ราคาพิเศษสำหรับการสั่งซื้อจำนวนมาก — ยิ่งซื้อมาก ยิ่งคุ้ม</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <Card key={t.qty} className={`relative overflow-hidden border-2 ${t.accent} hover:shadow-xl transition-all duration-300 group`}>
              {i === 3 && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
              )}
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <t.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-foreground">{t.qty}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.discount}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuote(true)}
                  className="text-primary text-xs"
                >
                  ขอราคา <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6 max-w-lg mx-auto">
          * ส่วนลดและเงื่อนไขขึ้นอยู่กับรุ่นสินค้าและโปรโมชันปัจจุบัน กรุณาติดต่อทีมขายเพื่อรับใบเสนอราคาที่แม่นยำ
        </p>
      </section>

      {/* ── Product Showcase ── */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img
              src={corporateFlatlay}
              alt="Industrial PC product lineup"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={600}
            />
          </div>
          <div className="bg-card p-8 md:p-12 flex flex-col justify-center">
            <Badge variant="outline" className="w-fit mb-4 text-xs">สินค้าครบวงจร</Badge>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">โซลูชัน Industrial PC ครบทุกกลุ่ม</h2>
            <ul className="space-y-3">
              {[
                "Panel PC / Touch Monitor — สำหรับ Production Line",
                "Mini PC / Fanless Box — งาน Edge Computing",
                "Rugged Tablet & Notebook — ใช้งานสนาม",
                "All-in-One PC — สำหรับ POS & Kiosk",
                "Network Switch (Volktek) — L2/L3 Managed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/product-advisor" className="mt-6">
              <Button variant="outline" size="sm" className="text-xs">
                ปรึกษาผู้เชี่ยวชาญ <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3 text-xs">Enterprise Benefits</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">สิทธิพิเศษลูกค้าองค์กร</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <Card key={b.title} className="border-border/60 hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory / On-site Section ── */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={corporateFactory}
          alt="Factory production line with panel PCs"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white max-w-lg">
            ส่งมอบและติดตั้งพร้อม<br />ทีมวิศวกร On-site
          </h2>
          <p className="text-white/70 mt-3 max-w-md text-sm md:text-base">
            ทีมวิศวกรของ ENT Group พร้อมให้บริการติดตั้ง ตั้งค่า และทดสอบอุปกรณ์ถึงหน้างาน ทั่วประเทศไทย
          </p>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 text-xs">How It Works</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">ขั้นตอนง่ายๆ 4 ขั้นตอน</h2>
        </div>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-border" />
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-4 relative px-4 py-6">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-extrabold relative z-10 shadow-lg shadow-primary/20">
                {s.step}
              </div>
              <h3 className="font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-primary/5 border-y border-border/50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">พร้อมเริ่มต้นโครงการ?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            ทีมฝ่ายขาย ENT Group พร้อมจัดทำใบเสนอราคาพิเศษให้ภายใน 1 วันทำการ
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" onClick={() => setShowQuote(true)} className="shadow-lg">
              <FileText className="w-5 h-5 mr-2" /> ขอใบเสนอราคาองค์กร
            </Button>
            <Link to="/case-studies">
              <Button size="lg" variant="outline">
                <Building2 className="w-5 h-5 mr-2" /> ดูผลงานจริง
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <QuoteDialog
        open={showQuote}
        onClose={() => setShowQuote(false)}
        productCategory="Corporate / Volume Order"
      />

      <Footer />
    </div>
  );
};

export default CorporatePricing;
