import { Truck, Package, ClipboardCheck, MapPin, Phone, Clock, ShieldCheck, CheckCircle } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import bannerImg from "@/assets/banner-delivery.jpg";

const deliverySteps = [
  {
    step: 1,
    title: "ยืนยันคำสั่งซื้อ",
    desc: "หลังจากลูกค้ายืนยันคำสั่งซื้อและชำระเงินเรียบร้อยแล้ว ทีมงานจะตรวจสอบรายการสินค้าและเอกสารการชำระเงิน",
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: "เตรียมสินค้า & ตรวจสอบคุณภาพ",
    desc: "ทีมคลังสินค้าจัดเตรียมสินค้า ตรวจสอบคุณภาพและความถูกต้องของรุ่น พร้อมบรรจุหีบห่ออย่างแน่นหนา",
    icon: Package,
  },
  {
    step: 3,
    title: "จัดส่งสินค้า",
    desc: "สินค้าจัดส่งผ่านบริษัทขนส่งชั้นนำ เช่น Kerry Express, Flash Express หรือบริการขนส่งอื่นๆ ตามความเหมาะสม",
    icon: Truck,
  },
  {
    step: 4,
    title: "แจ้งเลขพัสดุ & ติดตาม",
    desc: "ลูกค้าจะได้รับแจ้งเลขพัสดุเพื่อติดตามสถานะการจัดส่งได้ตลอดเวลา ผ่านระบบติดตามของบริษัทขนส่ง",
    icon: MapPin,
  },
];

const deliveryNotes = [
  "จัดส่งสินค้าภายใน 1–3 วันทำการ หลังยืนยันการชำระเงิน",
  "สินค้าทุกชิ้นได้รับการตรวจสอบคุณภาพก่อนจัดส่ง",
  "บรรจุหีบห่อด้วยวัสดุกันกระแทกอย่างดี เพื่อป้องกันความเสียหายระหว่างขนส่ง",
  "กรณีสินค้าเสียหายจากการขนส่ง สามารถแจ้งเคลมได้ภายใน 7 วัน หลังรับสินค้า",
  "พื้นที่กรุงเทพฯ และปริมณฑล — จัดส่งภายใน 1–2 วัน",
  "พื้นที่ต่างจังหวัด — จัดส่งภายใน 2–5 วัน",
];

const Delivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Truck size={16} />
            Delivery
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ขั้นตอนการจัดส่งสินค้า
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ENT Group ใส่ใจทุกขั้นตอนการจัดส่ง ตั้งแต่การบรรจุหีบห่อจนถึงมือลูกค้า
          </p>
        </div>
      </section>

      {/* Delivery Steps */}
      <section className="py-12 bg-background">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverySteps.map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        ขั้นตอนที่ {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Notes */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">ข้อมูลการจัดส่ง</h2>
          </div>
          <div className="space-y-3">
            {deliveryNotes.map((note, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Reminder */}
      <section className="py-12 bg-background">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            <ShieldCheck size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">สินค้าเสียหายจากการขนส่ง?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              กรณีสินค้าชำรุดหรือเสียหายจากการจัดส่ง สามารถแจ้งเคลมได้ภายใน 7 วัน หลังรับสินค้า
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:020456104" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                <Phone size={16} /> 02-045-6104
              </a>
              <a href="tel:0957391053" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                <Phone size={16} /> 095-739-1053
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Delivery;
