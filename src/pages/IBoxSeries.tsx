import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useState } from "react";
import { Link } from "react-router-dom";
import WishlistHeart from "@/components/WishlistHeart";
import {
  ArrowLeft, Cpu, Thermometer, Shield, Usb, Wifi, Download,
  FileText, ChevronRight, Layers, HardDrive, Monitor, Zap, Box,
  Factory, Stethoscope, Truck, ScanLine, Tv, Warehouse, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import MultiSelectQuoteBar, { useMultiSelect } from "@/components/MultiSelectQuoteBar";
import IBoxProductCard from "@/components/ibox/IBoxProductCard";
import { iboxProducts } from "@/data/ibox-products";
import bannerIBox from "@/assets/banner-ibox-series.jpg";
import usecaseAutomation from "@/assets/ibox-usecase-automation.jpg";
import usecaseMedical from "@/assets/ibox-usecase-medical.jpg";
import usecaseLogistics from "@/assets/ibox-usecase-logistics.jpg";
import usecaseWarehouse from "@/assets/ibox-usecase-warehouse.jpg";
import usecaseVision from "@/assets/ibox-usecase-vision.jpg";
import usecaseSignage from "@/assets/ibox-usecase-signage.jpg";

/* ═══════ Product Data ═══════ */
const iboxModels = [
  {
    id: "ibox-501",
    name: "iBox-501",
    cpu: "Intel Celeron Haswell 2980U Dual Core 1.6GHz",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_f038b57570074d0ab2559ba322f4bc66~mv2.png/v1/fill/w_427,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_b0548d5e72e7462280dccc86e8c7cb2a.pdf",
  },
  {
    id: "ibox-502",
    name: "iBox-502",
    cpu: "Intel Celeron Kaby Lake R 3867U Dual Core 1.8GHz",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_9a7f36ff7ec74fe9a0948c574d3a11e7~mv2.png/v1/fill/w_427,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_1e76bd9247c54a28bb0c630fae6dcad8.pdf",
  },
  {
    id: "ibox-601",
    name: "iBox-601",
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_d29508368a6a4e8f818fddbf462bc218~mv2.png/v1/fill/w_415,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_36bb8c0aa3a44ae9a6ccec667b54005e.pdf",
  },
  {
    id: "ibox-602",
    name: "iBox-602",
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_58cd008689cf4744a2bd3ef684f1c79a~mv2.png/v1/fill/w_427,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_9289dac0610049208615e01b2f80c682.pdf",
  },
  {
    id: "ibox-603",
    name: "iBox-603",
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality Pure Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_6683a1156b064f5f9b0cd7ad4ec1ae1b~mv2.png/v1/fill/w_427,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_86c393dde53a43c8adaf43cb3ce70ef1.pdf",
  },
  {
    id: "ibox-701",
    name: "iBox-701",
    cpu: "Intel Core i5-7200U",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 7/8/10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_d29cb490908741ba9094eef2a7ea3904~mv2.png/v1/fill/w_415,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_bf46946caa4445628a239edbc4fd34f8.pdf",
  },
  {
    id: "ibox-801",
    name: "iBox-801",
    cpu: "Intel Celeron / Core i5-8265U / Core i7-8565U",
    ram: "8 GB (ปรับแต่งได้)",
    storage: "SSD 256 GB (ปรับแต่งได้)",
    material: "High-quality All Aluminum",
    os: "Windows 10, Linux",
    image: "https://static.wixstatic.com/media/0597a3_d29508368a6a4e8f818fddbf462bc218~mv2.png/v1/fill/w_415,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
    datasheet: "https://docs.wixstatic.com/ugd/3e5003_5ba59ebf63494b12a4a8a0a6bb151b82.pdf",
  },
];

const highlights = [
  { icon: Thermometer, title: "ทนอุณหภูมิ -20°C ถึง 60°C", desc: "ออกแบบให้ทำงานได้ในสภาพแวดล้อมที่มีอุณหภูมิสูงหรือต่ำ" },
  { icon: Zap, title: "Fanless — ไร้พัดลม", desc: "ครีบระบายความร้อนอะลูมิเนียม ไม่มีพัดลม ลดปัญหาฝุ่นและเสียง" },
  { icon: Layers, title: "PCI Express Expansion", desc: "เพิ่มการ์ดได้ รองรับการขยายระบบผ่าน PCI Express" },
  { icon: Usb, title: "USB มากถึง 8 ช่อง", desc: "เชื่อมต่ออุปกรณ์ต่อพ่วงได้หลากหลายพร้อมกัน" },
  { icon: Wifi, title: "รองรับ SIM 3G/4G", desc: "เชื่อมต่อเครือข่ายมือถือได้ (Optional)" },
  { icon: Shield, title: "Body อะลูมิเนียมเกรดสูง", desc: "แข็งแรง ทนทาน น้ำหนักเบา ระบายความร้อนได้ดีเยี่ยม" },
];

const features = [
  "Auto Power On — เปิดเครื่องอัตโนมัติเมื่อมีไฟเข้า",
  "Timing Boot — ตั้งเวลาเปิดเครื่องล่วงหน้า",
  "PXE Boot — เปิดเครื่องผ่านระบบเครือข่าย",
  "Watchdog Timer — ตรวจสอบความผิดปกติอัตโนมัติ",
  "รองรับ Windows 7/8/10 และ Linux",
  "รับประกันสินค้า 1 ปี (Carry-in)",
];

const useCasesData = [
  {
    title: "Industrial Automation",
    desc: "ควบคุมระบบ PLC, SCADA และ HMI บนสายการผลิต ทนฝุ่นและความร้อนในโรงงาน",
    icon: Factory,
    image: usecaseAutomation,
  },
  {
    title: "Medical & Healthcare",
    desc: "ระบบ EMR, มอนิเตอร์สัญญาณชีพ และเวชระเบียนอิเล็กทรอนิกส์ในโรงพยาบาล",
    icon: Stethoscope,
    image: usecaseMedical,
  },
  {
    title: "Logistics & Transportation",
    desc: "ศูนย์ควบคุมการขนส่ง ติดตามยานพาหนะ บริหารเส้นทางแบบ Real-time",
    icon: Truck,
    image: usecaseLogistics,
  },
  {
    title: "Warehouse Management",
    desc: "ระบบจัดการคลังสินค้า สแกนบาร์โค้ด ตรวจนับสต็อกอัตโนมัติ",
    icon: Warehouse,
    image: usecaseWarehouse,
  },
  {
    title: "Machine Vision",
    desc: "ตรวจสอบคุณภาพชิ้นงานบนสายพาน ด้วยกล้องอุตสาหกรรมและ AI",
    icon: ScanLine,
    image: usecaseVision,
  },
  {
    title: "Digital Signage",
    desc: "ป้ายโฆษณาดิจิทัลในห้าง ร้านค้า สนามบิน แสดงผลต่อเนื่อง 24/7",
    icon: Tv,
    image: usecaseSignage,
  },
];
const galleryImages = [
  "https://static.wixstatic.com/media/3e5003_8d0fe57f33ec4c78bac1e2211f2f5680~mv2.jpg/v1/fill/w_430,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/51.jpg",
  "https://static.wixstatic.com/media/3e5003_10530c54a885451a9145236b7c128357~mv2.jpg/v1/fill/w_424,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/52.jpg",
  "https://static.wixstatic.com/media/3e5003_ac1383fef1fc47b8be3c350501f0a04f~mv2.jpg/v1/crop/x_18,y_0,w_1973,h_1909/fill/w_434,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/53.jpg",
  "https://static.wixstatic.com/media/3e5003_eb830a79fd904d64bd2b43037b71966b~mv2.jpg/v1/crop/x_23,y_0,w_1955,h_2000/fill/w_323,h_330,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/56.jpg",
  "https://static.wixstatic.com/media/3e5003_e5e46fceb4ce4226b81d1d71b1890e59~mv2.jpg/v1/crop/x_28,y_0,w_1972,h_2000/fill/w_329,h_330,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/54.jpg",
  "https://static.wixstatic.com/media/3e5003_3d56049981a74ec191a316daa2c61096~mv2.jpg/v1/crop/x_32,y_14,w_1910,h_1964/fill/w_320,h_330,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/55.jpg",
];

/* ═══════ Component ═══════ */
const IBoxSeries = () => {
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const { selectedProducts, toggleSelect, clearSelection } = useMultiSelect();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="iBox Series — Embedded Fanless Industrial PC" description="iBox Series คอมพิวเตอร์อุตสาหกรรมแบบ Fanless ขนาดกะทัดรัด รองรับ Intel N-Series ถึง Core i7 สำหรับ Edge Computing, IoT Gateway, Digital Signage" path="/ibox-series" />
      <ProductJsonLd
        collectionName="iBox Series Embedded Fanless Industrial PC"
        collectionDescription="iBox Series คอมพิวเตอร์อุตสาหกรรม Fanless ขนาดกะทัดรัด สำหรับ Edge Computing, IoT Gateway, Digital Signage"
        collectionUrl="/ibox-series"
        products={iboxModels.map(m => ({ name: m.name, image: m.image, description: m.cpu, category: "Embedded Fanless Industrial PC" }))}      />

      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "iBox Series", path: "/ibox-series" }]} />
      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={bannerIBox} alt="iBox Series — Industrial Mini PC" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">iBox Series</h1>
            <p className="text-sm md:text-base text-white/80">Industrial Mini PC — คอมพิวเตอร์เกรดอุตสาหกรรม Fanless</p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">สินค้าใหม่ล่าสุด</Badge>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
            คอมพิวเตอร์สำหรับงานอุตสาหกรรม — iBox Series
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            เครื่องคอมพิวเตอร์เกรดอุตสาหกรรมขนาดเล็กที่ถูกออกแบบมาเพื่อรองรับการทำงานในสภาวะแวดล้อมที่มีอุณหภูมิสูง
            ฝุ่นละอองหนาแน่น โดยออกแบบให้มีการระบายความร้อนได้ดี ทำงานได้อย่างมีประสิทธิภาพ
            เหมาะสมกับงานอุตสาหกรรมทุกประเภท
          </p>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">
            จุดเด่น iBox Series
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h) => (
              <div key={h.title} className="card-surface p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{h.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ AI Edge Computing / GPU Section ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                🔥 AI Edge Computing / GPU
              </h2>
              <p className="text-sm text-muted-foreground">คอมพิวเตอร์อุตสาหกรรมรองรับ GPU สำหรับ AI, Deep Learning, Machine Vision</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {iboxProducts.filter(p => p.category === "AI Edge Computing").map((product) => (
              <IBoxProductCard
                key={product.id}
                product={product}
                selectedProducts={selectedProducts}
                toggleSelect={toggleSelect}
                onQuote={setQuoteProduct}
              />
            ))}
          </div>
        </section>

        {/* ═══════ Embedded Box PC Section ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Box className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                🏭 Embedded Box PC
              </h2>
              <p className="text-sm text-muted-foreground">คอมพิวเตอร์ฝังตัว Fanless สำหรับงานโรงงาน, SCADA, PLC Replacement</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {iboxProducts.filter(p => p.category === "Embedded Box PC").map((product) => (
              <IBoxProductCard
                key={product.id}
                product={product}
                selectedProducts={selectedProducts}
                toggleSelect={toggleSelect}
                onQuote={setQuoteProduct}
              />
            ))}
          </div>
        </section>

        {/* ═══════ Gateway / DIN Rail Section ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Wifi className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                🌐 Gateway / DIN Rail
              </h2>
              <p className="text-sm text-muted-foreground">เกตเวย์อุตสาหกรรม, IoT Gateway, DIN Rail PC</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {iboxProducts.filter(p => p.category === "Gateway").map((product) => (
              <IBoxProductCard
                key={product.id}
                product={product}
                selectedProducts={selectedProducts}
                toggleSelect={toggleSelect}
                onQuote={setQuoteProduct}
              />
            ))}
          </div>
        </section>

        {/* ═══════ PoE & Multi-LAN Section ═══════ */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Layers className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                📡 PoE & Multi-LAN
              </h2>
              <p className="text-sm text-muted-foreground">คอมพิวเตอร์อุตสาหกรรม Multi LAN พร้อม PoE สำหรับ Surveillance, Networking</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {iboxProducts.filter(p => p.category === "PoE & Multi-LAN").map((product) => (
              <IBoxProductCard
                key={product.id}
                product={product}
                selectedProducts={selectedProducts}
                toggleSelect={toggleSelect}
                onQuote={setQuoteProduct}
              />
            ))}
          </div>
        </section>

        <section>
            รุ่นสินค้า iBox Series
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            เลือกรุ่นที่เหมาะกับงานของคุณ — RAM และ SSD สามารถปรับแต่งได้
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {iboxModels.map((model) => (
              <div key={model.id} className={`card-surface overflow-hidden group transition-all ${selectedProducts.has(model.name) ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
                <div className="relative bg-secondary/30 p-6 flex items-center justify-center h-52">
                  <button onClick={() => toggleSelect(model.name)} className="absolute top-3 left-3 z-10">
                    <Checkbox checked={selectedProducts.has(model.name)} className="h-5 w-5" />
                  </button>
                  <WishlistHeart
                    item={{
                      id: model.id,
                      name: model.name,
                      category: "iBox Series",
                      image: model.image,
                      href: "/ibox-series",
                      specs: model.cpu,
                    }}
                    className="absolute top-3 right-3"
                  />
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-foreground text-lg">{model.name}</h3>
                    <Badge variant="secondary" className="text-xs">Fanless</Badge>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <p><span className="font-medium text-foreground">CPU:</span> {model.cpu}</p>
                    <p><span className="font-medium text-foreground">RAM:</span> {model.ram}</p>
                    <p><span className="font-medium text-foreground">Storage:</span> {model.storage}</p>
                    <p><span className="font-medium text-foreground">วัสดุ:</span> {model.material}</p>
                    <p><span className="font-medium text-foreground">OS:</span> {model.os}</p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={model.datasheet} target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5 mr-1" /> Datasheet
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => setQuoteProduct(model.name)}>
                      <FileText className="w-3.5 h-3.5 mr-1" /> ขอราคา
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features Strip */}
        <section className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">ฟีเจอร์มาตรฐาน iBox Series</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">
            เหมาะสำหรับงาน
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            ใช้โปรแกรมได้หลากหลาย ในสำนักงาน โรงงานอุตสาหกรรม โรงเรียน ทั้งการพรีเซนต์งาน การเรียนการสอน และความบันเทิง
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCasesData.map((uc) => (
              <div key={uc.title} className="group card-surface overflow-hidden hover:border-primary/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={uc.image}
                    alt={uc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
                      <uc.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{uc.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">
            ตัวอย่างการใช้งานจริง
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            ส่งมอบประสบการณ์ที่แข็งแกร่งกับ Industrial Grade Computer
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-secondary/30 border border-border">
                <img src={img} alt={`ตัวอย่างการใช้งาน ${i + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ iBox Series?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกรุ่นและสเปกที่เหมาะกับงานของคุณ</p>
          <Button size="lg" onClick={() => setQuoteProduct("iBox Series")}>
            <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
          </Button>
        </div>
      </div>

      <QuoteDialog
        open={!!quoteProduct}
        onClose={() => setQuoteProduct(null)}
        productName={quoteProduct || ""}
        productCategory="iBox Series"
      />
      <MultiSelectQuoteBar selectedProducts={selectedProducts} onClear={clearSelection} productCategory="iBox Series" />
      <FooterCompact />
    </div>
  );
};

export default IBoxSeries;
