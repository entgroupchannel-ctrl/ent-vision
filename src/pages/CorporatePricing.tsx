import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Users, FileText, Phone, CheckCircle, TrendingDown, ShieldCheck, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import QuoteDialog from "@/components/QuoteDialog";
import { useState } from "react";

const tiers = [
  { qty: "5–9 เครื่อง", discount: "ส่วนลดพิเศษ", color: "bg-secondary" },
  { qty: "10–49 เครื่อง", discount: "ส่วนลด + จัดส่งฟรี", color: "bg-primary/10" },
  { qty: "50–99 เครื่อง", discount: "ราคาโปรเจกต์ + On-site", color: "bg-primary/20" },
  { qty: "100+ เครื่อง", discount: "ราคา OEM/ODM พิเศษ", color: "bg-primary/30" },
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

const CorporatePricing = () => {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ราคาองค์กร & Volume Discount — ENT Group"
        description="เงื่อนไขราคาพิเศษสำหรับองค์กร โรงงาน และโครงการขนาดใหญ่ ส่วนลดตามจำนวน พร้อมบริการ Account Manager เฉพาะ"
        path="/corporate-pricing"
      />

      <PageBanner
        title="ราคาองค์กร & Volume Discount"
        subtitle="เงื่อนไขพิเศษสำหรับลูกค้าองค์กร โรงงาน และโครงการภาครัฐ"
        image="/images/unsplash/1454165804606-c3d57b_w1200.jpg"
      />


      {/* Volume tiers */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">โครงสร้างส่วนลดตามจำนวน</h2>
          <p className="text-muted-foreground mt-2">ราคาพิเศษสำหรับการสั่งซื้อจำนวนมาก</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {tiers.map((t) => (
            <Card key={t.qty} className={`text-center border-border/60 hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-3 ${t.color} text-foreground`}>
                  {t.qty}
                </div>
                <p className="text-sm text-muted-foreground">{t.discount}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          * ส่วนลดและเงื่อนไขขึ้นอยู่กับรุ่นสินค้าและโปรโมชันปัจจุบัน กรุณาติดต่อทีมขายเพื่อรับใบเสนอราคาที่แม่นยำ
        </p>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">สิทธิพิเศษลูกค้าองค์กร</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <Card key={b.title} className="border-border/60">
                <CardContent className="p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">ขั้นตอนการขอใบเสนอราคาองค์กร</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-bold">
                {s.step}
              </div>
              <h3 className="font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" onClick={() => setShowQuote(true)} className="text-base px-8">
            <FileText className="w-5 h-5 mr-2" /> ขอใบเสนอราคาองค์กร
          </Button>
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
