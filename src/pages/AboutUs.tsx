import { Link } from "react-router-dom";
import { Headset, ShieldCheck, Users, Handshake, Truck, Award, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Headset,
    title: "ผู้เชี่ยวชาญช่วยเลือกสเปก",
    desc: "ทีมวิศวกรและแอดมินผู้เชี่ยวชาญพร้อมให้คำปรึกษา ช่วยเลือกรุ่นที่ตรงกับ TOR และงบประมาณ ไม่ต้องเดาเอง",
  },
  {
    icon: ShieldCheck,
    title: "รับประกันหลังการขาย 1–3 ปี",
    desc: "ซ่อม เปลี่ยน ดูแลอย่างมืออาชีพ พร้อมบริการ On-site สำหรับลูกค้าองค์กร มั่นใจได้ตลอดอายุการใช้งาน",
  },
  {
    icon: Users,
    title: "ลูกค้าองค์กรชั้นนำไว้วางใจ",
    desc: "หน่วยงานราชการ โรงงานอุตสาหกรรม โรงพยาบาล สถาบันการศึกษา เลือกใช้สินค้าของเราอย่างต่อเนื่อง",
  },
  {
    icon: Handshake,
    title: "B2B ราคาพิเศษสำหรับโครงการ",
    desc: "สั่งซื้อจำนวนมากราคาดีกว่า พร้อมเทรนนิ่งการใช้งาน ใบเสนอราคาออกได้ภายใน 24 ชม.",
  },
  {
    icon: Truck,
    title: "นำเข้าจากโรงงานโดยตรง",
    desc: "สินค้าคุณภาพจากผู้ผลิตชั้นนำ GreenthinPC, Winmate, Volktek นำเข้าตรงไม่ผ่านคนกลาง",
  },
  {
    icon: Award,
    title: "Authorized Distributor",
    desc: "ตัวแทนจำหน่ายอย่างเป็นทางการ รับประกันสินค้าแท้ 100% พร้อมสต๊อกในไทยส่งได้ทันที",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container max-w-5xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-primary mb-6 hover:underline">
            <ArrowLeft size={12} /> กลับหน้าหลัก
          </Link>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            พาร์ทเนอร์ด้าน<span className="text-gradient"> IT อุตสาหกรรม</span>ที่คุณวางใจได้
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            ENTGroup เป็นตัวแทนจำหน่ายคอมพิวเตอร์อุตสาหกรรมและอุปกรณ์ IT สำหรับองค์กร
            เรามุ่งมั่นในการให้บริการที่เป็นมิตร มีคนช่วยเลือกสินค้า และดูแลหลังการขายอย่างมืออาชีพ
          </p>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              ทำไมต้อง<span className="text-gradient">เลือกเรา</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-surface rounded-xl p-6 hover:border-primary/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container max-w-3xl mx-auto text-center card-surface rounded-2xl p-8 md:p-12">
          <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
            พร้อมเริ่มต้นโครงการ?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
            ติดต่อเราวันนี้ รับใบเสนอราคาภายใน 24 ชม. พร้อมคำแนะนำจากผู้เชี่ยวชาญ
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://line.me/R/ti/p/@entgroup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              LINE @entgroup
            </a>
            <a
              href="tel:028861972"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground text-sm font-semibold hover:bg-secondary transition-colors"
            >
              โทร 02-886-1972
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
