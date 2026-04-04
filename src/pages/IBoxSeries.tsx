import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import WishlistHeart from "@/components/WishlistHeart";
import {
  ArrowLeft, Cpu, Thermometer, Shield, Usb, Wifi, Download,
  FileText, ChevronRight, Layers, HardDrive, Monitor, Zap, Box,
  Factory, Stethoscope, Truck, ScanLine, Tv, Warehouse, Flame, Sparkles,
  Network, Eye, BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import MultiSelectQuoteBar, { useMultiSelect } from "@/components/MultiSelectQuoteBar";
import bannerIBox from "@/assets/banner-ibox-series.jpg";
import usecaseAutomation from "@/assets/ibox-usecase-automation.jpg";
import usecaseMedical from "@/assets/ibox-usecase-medical.jpg";
import usecaseLogistics from "@/assets/ibox-usecase-logistics.jpg";
import usecaseWarehouse from "@/assets/ibox-usecase-warehouse.jpg";
import usecaseVision from "@/assets/ibox-usecase-vision.jpg";
import usecaseSignage from "@/assets/ibox-usecase-signage.jpg";
import { iboxProducts, type ProductCategory } from "@/data/iboxProducts";

const categories: { key: ProductCategory; label: string; icon: typeof Cpu }[] = [
  { key: "all", label: "ทั้งหมด", icon: Box },
  { key: "hot", label: "🔥 Hot Products", icon: Flame },
  { key: "embedded", label: "Embedded Box PC", icon: HardDrive },
  { key: "edge", label: "Edge AI / GPU", icon: BrainCircuit },
  { key: "vision", label: "Machine Vision", icon: Eye },
  { key: "arm", label: "ARM Controller", icon: Cpu },
  { key: "classic", label: "Classic iBox", icon: Monitor },
];

const highlights = [
  { icon: Thermometer, title: "ทนอุณหภูมิ -20°C ถึง 60°C", desc: "ออกแบบให้ทำงานได้ในสภาพแวดล้อมที่มีอุณหภูมิสูงหรือต่ำ" },
  { icon: Zap, title: "Fanless — ไร้พัดลม", desc: "ครีบระบายความร้อนอะลูมิเนียม ไม่มีพัดลม ลดปัญหาฝุ่นและเสียง" },
  { icon: Layers, title: "PCI Express Expansion", desc: "เพิ่มการ์ดได้ รองรับ GPU, PoE, LAN Card" },
  { icon: Network, title: "Multi-LAN สูงสุด 10 พอร์ต", desc: "เชื่อมต่อเครือข่ายหลายช่องพร้อม PoE สำหรับ Machine Vision" },
  { icon: Wifi, title: "4G/5G Module Ready", desc: "M.2 B-Key + Nano SIM สำหรับเชื่อมต่อมือถือ" },
  { icon: Shield, title: "Industrial Grade Chassis", desc: "อะลูมิเนียมเกรดสูง ทนทาน ระบายความร้อนดีเยี่ยม" },
];

const useCasesData = [
  { title: "Industrial Automation", desc: "ควบคุมระบบ PLC, SCADA และ HMI บนสายการผลิต", icon: Factory, image: usecaseAutomation },
  { title: "Medical & Healthcare", desc: "ระบบ EMR, มอนิเตอร์สัญญาณชีพ ในโรงพยาบาล", icon: Stethoscope, image: usecaseMedical },
  { title: "Logistics & Transportation", desc: "ศูนย์ควบคุมการขนส่ง ติดตามยานพาหนะ Real-time", icon: Truck, image: usecaseLogistics },
  { title: "Warehouse Management", desc: "ระบบจัดการคลังสินค้า สแกนบาร์โค้ด ตรวจนับสต็อก", icon: Warehouse, image: usecaseWarehouse },
  { title: "Machine Vision", desc: "ตรวจสอบคุณภาพชิ้นงาน ด้วยกล้องอุตสาหกรรมและ AI", icon: ScanLine, image: usecaseVision },
  { title: "Digital Signage", desc: "ป้ายโฆษณาดิจิทัล แสดงผลต่อเนื่อง 24/7", icon: Tv, image: usecaseSignage },
];

const IBoxSeries = () => {
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const { selectedProducts, toggleSelect, clearSelection } = useMultiSelect();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return iboxProducts;
    return iboxProducts.filter(p => p.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="iBox Series — Embedded Fanless Industrial PC" description="iBox Series คอมพิวเตอร์อุตสาหกรรมแบบ Fanless รองรับ Intel Core i9, GPU RTX, Machine Vision, Edge AI" path="/ibox-series" />
      <ProductJsonLd
        collectionName="iBox Series Embedded Fanless Industrial PC"
        collectionDescription="iBox Series คอมพิวเตอร์อุตสาหกรรม Fanless สำหรับ Edge Computing, Machine Vision, AI Inference"
        collectionUrl="/ibox-series"
        products={iboxProducts.map(m => ({ name: m.name, image: m.image, description: m.nameTH, category: "Embedded Fanless Industrial PC" }))}
      />
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
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">iBox & AEOLUS Series</h1>
            <p className="text-sm md:text-base text-white/80">Industrial PC — Fanless Embedded, Edge AI, Machine Vision, ARM Controller</p>
          </div>
        </div>
      </div>

      {/* Category Tabs - Sticky */}
      <div className="sticky top-[57px] z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-foreground whitespace-nowrap mr-2">📦 หมวดสินค้า:</span>
            {categories.map((cat) => (
              <Button
                key={cat.key}
                size="sm"
                variant={activeCategory === cat.key ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.key)}
                className="text-xs gap-1.5"
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">สินค้า {filteredProducts.length} รุ่น</Badge>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
            คอมพิวเตอร์อุตสาหกรรม — iBox & AEOLUS Series
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            ครอบคลุมทุกความต้องการ ตั้งแต่ Embedded Box PC ขนาดเล็ก, Edge AI พร้อม GPU, Machine Vision Controller
            ไปจนถึง ARM IoT Gateway — ทั้งหมดเป็น Industrial Grade ทนทานสำหรับงานอุตสาหกรรม
          </p>
        </section>

        {/* Highlights */}
        {activeCategory === "all" && (
          <section>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">จุดเด่น</h2>
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
        )}

        {/* Product Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">
            {activeCategory === "all" ? "รุ่นสินค้าทั้งหมด" : categories.find(c => c.key === activeCategory)?.label}
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {filteredProducts.length} รุ่น — คลิกดูรายละเอียด หรือเลือกเพื่อขอใบเสนอราคา
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((model) => (
              <div key={model.id} className={`card-surface overflow-hidden group transition-all ${selectedProducts.has(model.name) ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
                {/* Clickable image area */}
                <Link to={`/ibox-series/${model.id}`} className="block">
                  <div className="relative bg-secondary/30 p-6 flex items-center justify-center h-52">
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSelect(model.name); }} className="absolute top-3 left-3 z-10">
                      <Checkbox checked={selectedProducts.has(model.name)} className="h-5 w-5" />
                    </button>
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="absolute top-3 right-3 z-10">
                      <WishlistHeart
                        item={{ id: model.id, name: model.name, category: "iBox Series", image: model.image, href: `/ibox-series/${model.id}`, specs: model.cpu }}
                      />
                    </div>
                    <div className="absolute top-3 left-10 flex gap-1.5">
                      {model.isHot && <Badge className="bg-red-500/90 text-white text-[10px] px-1.5">🔥 HOT</Badge>}
                      {model.isNew && <Badge className="bg-emerald-500/90 text-white text-[10px] px-1.5">✨ NEW</Badge>}
                    </div>
                    <img src={model.image} alt={model.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                </Link>

                <div className="p-5 space-y-3">
                  <Link to={`/ibox-series/${model.id}`} className="block hover:text-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-foreground text-base">{model.name}</h3>
                      <Badge variant="secondary" className="text-[10px]">{model.cpuGen || "Fanless"}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{model.nameTH}</p>
                  </Link>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><span className="font-medium text-foreground">CPU:</span> {model.cpu}</p>
                    <p><span className="font-medium text-foreground">RAM:</span> {model.ram}</p>
                    <p><span className="font-medium text-foreground">I/O:</span> {model.io}</p>
                    <p><span className="font-medium text-foreground">Temp:</span> {model.temp}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {model.lanPorts && <Badge variant="outline" className="text-[10px]">{model.lanPorts}× LAN</Badge>}
                    {model.comPorts && <Badge variant="outline" className="text-[10px]">{model.comPorts}× COM</Badge>}
                    {model.poe && <Badge variant="outline" className="text-[10px] border-amber-500/50 text-amber-600">PoE</Badge>}
                    {model.pcie && <Badge variant="outline" className="text-[10px] border-blue-500/50 text-blue-600">PCIe</Badge>}
                  </div>

                  {model.priceRange && <p className="text-xs font-semibold text-primary">{model.priceRange}</p>}

                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link to={`/ibox-series/${model.id}`}>
                        <ChevronRight className="w-3.5 h-3.5 mr-1" /> รายละเอียด
                      </Link>
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

        {/* Use Cases */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">เหมาะสำหรับงาน</h2>
          <p className="text-center text-sm text-muted-foreground mb-8">ใช้โปรแกรมได้หลากหลาย ในสำนักงาน โรงงานอุตสาหกรรม โรงเรียน</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCasesData.map((uc) => (
              <div key={uc.title} className="group card-surface overflow-hidden hover:border-primary/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={uc.image} alt={uc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ iBox / AEOLUS Series?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกรุ่นและสเปกที่เหมาะกับงานของคุณ</p>
          <Button size="lg" onClick={() => setQuoteProduct("iBox Series")}>
            <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
          </Button>
        </div>
      </div>

      <QuoteDialog open={!!quoteProduct} onClose={() => setQuoteProduct(null)} productName={quoteProduct || ""} productCategory="iBox Series" />
      <MultiSelectQuoteBar selectedProducts={selectedProducts} onClear={clearSelection} productCategory="iBox Series" />
      <FooterCompact />
    </div>
  );
};

export default IBoxSeries;
