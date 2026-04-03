import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Shield, Zap, Lock, Droplets, Download,
  ExternalLink, Factory, Wrench, FileText, ChevronRight,
  Ruler, Send, Loader2, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import bannerCabinets from "@/assets/banner-cabinets.jpg";
import cabinetGallery4 from "@/assets/cabinet-gallery-4.jpg";
import cabinetGallery5 from "@/assets/cabinet-gallery-5.jpg";
import cabinetGallery6 from "@/assets/cabinet-gallery-6.jpg";

/* ═══════ Product Data ═══════ */
const cabinetModels = [
  {
    id: "ppc-cb-gk1501",
    name: "PPC-CB-GK1501",
    panelModel: "GK1501",
    material: "เหล็ก & สแตนเลสสตีล",
    protection: "IP65",
    lock: "กุญแจแบบเด้ง หรือ แบบเขาควาย",
    installation: "วางกับพื้น หรือ แขวนกับผนัง",
    cabinetSize: "140 × 550 × 500 mm",
    panelSize: "60 × 359 × 283 mm",
    image: "https://static.wixstatic.com/media/005637_0947f6ab0a65440c80e8b512a6e5b7bc~mv2.png/v1/crop/x_664,y_0,w_2656,h_2656/fill/w_390,h_390,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B9%81%E0%B8%95%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%AA%E0%B8%95%E0%B8%B5%E0%B8%A5.png",
    datasheetPanel: "https://www.entgroup.co.th/_files/ugd/005637_c1e39dcdf20d4023bcaa04dbf2d33300.pdf",
    datasheetCabinet: "https://www.entgroup.co.th/_files/ugd/005637_bc78861bac1743da9dfd0dfa3c1496d6.pdf",
  },
  {
    id: "ppc-cb-itpca500",
    name: "PPC-CB-ITPCA500",
    panelModel: "ITPC-A500",
    material: "สแตนเลสสตีล & เหล็ก",
    protection: "IP65",
    lock: "กุญแจแบบเด้ง หรือ แบบเขาควาย",
    installation: "วางกับพื้น หรือ แขวนกับผนัง",
    cabinetSize: "120 × 500 × 500 mm",
    panelSize: "60 × 366 × 290 mm",
    image: "https://static.wixstatic.com/media/005637_2c4bd9b386094f52b29f7216de542dd6~mv2.png/v1/crop/x_996,y_365,w_1985,h_1985/fill/w_297,h_297,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B9%81%E0%B8%95%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%AA%E0%B8%95%E0%B8%B5%E0%B8%A5.png",
    datasheetPanel: "https://www.entgroup.co.th/_files/ugd/005637_1622ff542d1244c68d5207e036d69f48.pdf",
    datasheetCabinet: "https://www.entgroup.co.th/_files/ugd/005637_34865607b1c447fe85523e820aec8226.pdf",
  },
  {
    id: "ppc-cb-gk1506",
    name: "PPC-CB-GK1506",
    panelModel: "GK1506",
    material: "สแตนเลสสตีล & เหล็ก",
    protection: "IP65",
    lock: "กุญแจแบบเด้ง หรือ แบบเขาควาย",
    installation: "วางกับพื้น หรือ แขวนกับผนัง",
    cabinetSize: "120 × 550 × 500 mm",
    panelSize: "60 × 391 × 276 mm",
    image: "https://static.wixstatic.com/media/005637_b92a7431672b4b75acc16888898c7e98~mv2.png/v1/crop/x_664,y_0,w_2656,h_2656/fill/w_370,h_370,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B9%81%E0%B8%95%E0%B8%99%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%82%E0%B8%B2%E0%B8%A7.png",
    datasheetPanel: "https://www.entgroup.co.th/_files/ugd/005637_c159f1de71084932ad2ff90de91b7e29.pdf",
    datasheetCabinet: "https://www.entgroup.co.th/_files/ugd/005637_831aabe88e18477bb082a402bf5c175d.pdf",
  },
];

const advantages = [
  { icon: Shield, title: "SECURE", desc: "Double Lock / ล็อกสองชั้น กุญแจแบบกดเด้งหรือเขาควาย ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต" },
  { icon: Zap, title: "STABILITY", desc: "ผลิตด้วยแผ่นเหล็กขาวหรือสแตนเลสสตีล ทนทานต่อสภาพแวดล้อม ระบายความร้อนได้ดี" },
  { icon: Lock, title: "RELIABILITY", desc: "ผ่านการทดสอบภาคสนาม ออกแบบให้เข้ากับตัวเครื่อง มีเพลทยึดอุปกรณ์ 1-2 ชั้น" },
];

const installationTypes = [
  { label: "Indoor", desc: "ติดตั้งภายในอาคาร โรงงาน สำนักงาน", icon: Factory },
  { label: "Outdoor", desc: "ติดตั้งภายนอกอาคาร กันฝุ่น กันน้ำ", icon: Droplets },
  { label: "Floor Standing", desc: "วางตั้งกับพื้น เคลื่อนย้ายสะดวก", icon: Wrench },
  { label: "Wall Mounting", desc: "แขวนติดผนัง ประหยัดพื้นที่", icon: Wrench },
];

const galleryImages = [
  "https://static.wixstatic.com/media/005637_32016e0d75a34007b8955509d9cb5b59~mv2.jpg/v1/fill/w_300,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/reLINE_ALBUM_%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_%E0%B9%92%E0%B9%93%E0%B9%90%E0%B9%98%E0%B9%90%E0%B9%97_14.jpg",
  "https://static.wixstatic.com/media/005637_34cd1b29091c44eca78ef0700748e875~mv2.jpg/v1/fill/w_300,h_270,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/reLINE_ALBUM_%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_%E0%B9%92%E0%B9%93%E0%B9%90%E0%B9%98%E0%B9%90%E0%B9%97_87.jpg",
  "https://static.wixstatic.com/media/005637_905985eb99544b148865284b561dba6b~mv2.jpg/v1/fill/w_335,h_301,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/reLINE_ALBUM_%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87_%E0%B9%92%E0%B9%93%E0%B9%90%E0%B9%98%E0%B9%90%E0%B9%97_95.jpg",
  cabinetGallery4,
  cabinetGallery5,
  cabinetGallery6,
];

/* ═══════ Component ═══════ */
const Cabinets = () => {
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={bannerCabinets} alt="ตู้พาเนลพีซีเกรดอุตสาหกรรม" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">Panel PC — Cabinet</h1>
            <p className="text-sm md:text-base text-white/80">ตู้พาเนลพีซีเกรดอุตสาหกรรม สั่งผลิตตามขนาดที่ต้องการ</p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            ตู้หน้าจอสัมผัสของเราได้รับการออกแบบและผลิตโดยผู้เชี่ยวชาญ สามารถกำหนดขนาดตู้ได้เหมาะสมกับตัวเครื่อง
            เพื่อตอบสนองความต้องการเฉพาะของงาน ในขณะที่ยังคงรักษารากฐานที่มั่นคงของตัวเครื่องที่ผ่านการทดสอบภาคสนาม
          </p>
        </section>

        {/* Advantages */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">
            ทำไมต้องเลือก Panel PC Cabinet ของเรา
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((adv) => (
              <div key={adv.title} className="card-surface p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <adv.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features Strip */}
        <section className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">ข้อดีของการใช้ Panel PC — Cabinet</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "รองรับการติดตั้งภายในและภายนอกอาคาร",
              "กันฝุ่น / กันน้ำ / ปลอดภัย ติดตั้งง่าย",
              "ผลิตด้วยแผ่นเหล็กขาว หรือ สแตนเลสสตีล",
              "ขอบตู้ยกป้องกันน้ำเข้า",
              "ด้านในมีเพลทยึดอุปกรณ์ 1 หรือ 2 ชั้น",
              "Double Lock / ล็อกสองชั้น",
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Models */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">
            รุ่นตู้ Panel PC Cabinet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cabinetModels.map((model) => (
              <div key={model.id} className="card-surface overflow-hidden group hover:border-primary/30 transition-all">
                <div className="bg-secondary/30 p-6 flex items-center justify-center h-56">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-foreground">{model.name}</h3>
                    <Badge variant="secondary" className="text-xs">{model.protection}</Badge>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <p><span className="font-medium text-foreground">วัสดุ:</span> {model.material}</p>
                    <p><span className="font-medium text-foreground">ติดตั้ง:</span> {model.installation}</p>
                    <p><span className="font-medium text-foreground">กุญแจ:</span> {model.lock}</p>
                    <p><span className="font-medium text-foreground">ขนาดตู้:</span> {model.cabinetSize}</p>
                    <p><span className="font-medium text-foreground">ขนาดเครื่อง:</span> {model.panelSize}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={model.datasheetPanel} target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5 mr-1" /> Panel
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={model.datasheetCabinet} target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5 mr-1" /> Cabinet
                      </a>
                    </Button>
                  </div>
                  <Button size="sm" className="w-full" onClick={() => setQuoteProduct(model.name)}>
                    <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Types */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">
            รูปแบบการติดตั้ง
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {installationTypes.map((type) => (
              <div key={type.label} className="card-surface p-5 text-center">
                <type.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-foreground text-sm mb-1">{type.label}</h4>
                <p className="text-xs text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">
            ผลงานตู้ต่างๆ ที่เราจัดจำหน่าย
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            สามารถติดตั้งได้หลากหลายสถานที่ตามเหมาะสมของงาน
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-secondary/30 border border-border">
                <img src={img} alt={`ตัวอย่างผลงาน ${i + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <a href="https://www.entgroup.co.th/_files/ugd/005637_3905ac03579a48dab93f975d41e62d3e.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" /> ดาวน์โหลด Datasheet รวม
              </a>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจตู้ Panel PC Cabinet?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกขนาดและรุ่นที่เหมาะกับงานของคุณ</p>
          <Button size="lg" onClick={() => setQuoteProduct("Panel PC Cabinet")}>
            <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
          </Button>
        </div>
      </div>

      <QuoteDialog
        open={!!quoteProduct}
        onClose={() => setQuoteProduct(null)}
        productName={quoteProduct || ""}
        productCategory="GK Series — Panel PC"
      />
      <FooterCompact />
    </div>
  );
};

export default Cabinets;
