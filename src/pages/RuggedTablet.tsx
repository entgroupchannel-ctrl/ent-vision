import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WishlistHeart from "@/components/WishlistHeart";
import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Shield, Droplets, Battery, Smartphone, Monitor,
  Download, ChevronLeft, ChevronRight, Wifi, FileText,
  ShoppingCart, X, ExternalLink,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FooterCompact from "@/components/FooterCompact";
import PriceDisclaimer from "@/components/PriceDisclaimer";
import QuoteDialog from "@/components/QuoteDialog";
import ruggedHero from "@/assets/rugged-tablet-hero.jpg";

/* ═══════ Product Data — 15 models ═══════ */
type TabletProduct = {
  id: string;
  model: string;
  name: string;
  os: "Windows" | "Android";
  size: string;
  cpu: string;
  ram: string;
  display: string;
  highlights: string[];
  image: string;
  price?: string;
  badge?: string;
  productUrl: string;
};

const tablets: TabletProduct[] = [
  // ── Windows (9) ──
  {
    id: "f9e", model: "F9E", name: "Elite Mini PC F9E", os: "Windows",
    size: '10.1"', cpu: "Intel i5-1235U Max 4.4GHz", ram: "16GB LPDDR4x / 256GB",
    display: "10.1\" 1200×1920 FHD",
    highlights: ["Intel i5 Processor", "FHD Display"],
    image: "https://entgroup-rugged.com/assets/f9e-C3MseYpo.png",
    badge: "Best Seller",
    productUrl: "https://entgroup-rugged.com/product/f9e",
  },
  {
    id: "f9a", model: "F9A", name: "Professional Tablet F9A", os: "Windows",
    size: '10.1"', cpu: "Intel Alder Lake-N100 up to 3.4GHz", ram: "8GB/16GB / 128GB/256GB",
    display: "10.1\" 800×1280 HD or 1920×1200 FHD",
    highlights: ["Long Battery Life", "10-Point Multi-Touch"],
    image: "https://entgroup-rugged.com/assets/f9a-_j8J-x2I.jpg",
    price: "฿27,990",
    productUrl: "https://entgroup-rugged.com/product/f9a",
  },
  {
    id: "f7g", model: "F7G", name: "แท็บเล็ตอึดทนทาน F7G ขนาด 10.1 นิ้ว", os: "Windows",
    size: '10.1"', cpu: "Intel Gemini Lake N4120", ram: "8GB LPDDR4 / 128GB eMMC",
    display: "10.1\" 1920×1200 FHD IPS",
    highlights: ["หน้าจอ FHD IPS 1920×1200", "IP67 กันน้ำ ทนตก 1.5 เมตร"],
    image: "https://entgroup-rugged.com/assets/f7g-DidJ5UAD.png",
    price: "฿22,990",
    productUrl: "https://entgroup-rugged.com/product/f7g",
  },
  {
    id: "f7n", model: "F7N", name: "Essential Tablet F7N", os: "Windows",
    size: '10.1"', cpu: "Intel Gemini lake N4100", ram: "4GB / 64GB",
    display: "10.1\" 800×1280 HD",
    highlights: ["Affordable", "Long Battery"],
    image: "https://entgroup-rugged.com/assets/f7-series-main-DzoEL2Ov.png",
    price: "฿19,990",
    productUrl: "https://entgroup-rugged.com/product/f7n",
  },
  {
    id: "f8ct", model: "F8CT", name: "แท็บเล็ตอึดทนทาน IP67 ขนาด 8 นิ้ว F8CT", os: "Windows",
    size: '8"', cpu: "Intel Cherry Trail x5-Z8350 Quad-Core", ram: "4GB / 64GB eMMC",
    display: "8\" 800×1280 IPS (300 ANSI)",
    highlights: ["หน้าจอ IPS HD 8 นิ้ว 300 ANSI", "IP67 กันน้ำ กันฝุ่น"],
    image: "https://entgroup-rugged.com/assets/f8ct-CetUjj-d.png",
    price: "฿21,990",
    productUrl: "https://entgroup-rugged.com/product/f8ct",
  },
  {
    id: "f10", model: "F10", name: "All-in-One Touch PC F10", os: "Windows",
    size: '10.1"', cpu: "Intel Celeron N5100", ram: "8GB LPDDR4 / 128GB",
    display: "10.1\" 1920×1200",
    highlights: ["FHD Display", "Dual HDMI"],
    image: "https://entgroup-rugged.com/assets/f10-8McJcNcK.jpg",
    price: "฿17,990",
    productUrl: "https://entgroup-rugged.com/product/f10",
  },
  {
    id: "w109u", model: "W109U", name: "แท็บเล็ทอึดทนทานระดับอุตสาหกรรม W109U", os: "Windows",
    size: '10.95"', cpu: "Intel i5-1235U / i7-1255U (10-core)", ram: "16GB-48GB / 256GB-2TB",
    display: "10.95\" 1920×1200 IPS",
    highlights: ["IPS 10.95\" ป้องกันรอยขีดข่วน", "IP68 กันน้ำ กันฝุ่น ทนทานสูงสุด"],
    image: "https://entgroup-rugged.com/assets/w109u-main-C8XbCmqD.png",
    productUrl: "https://entgroup-rugged.com/product/w109u",
  },
  {
    id: "w10y", model: "W10Y", name: "แท็บเล็ตอุตสาหกรรมทนทาน W10Y", os: "Windows",
    size: '10"', cpu: "Intel Core i5-10210Y", ram: "8GB / 16GB / 128GB / 256GB",
    display: "10\" 1920×1200 IPS 700cd/㎡",
    highlights: ["IPS 10\" ความสว่าง 700cd/㎡", "IP68 กันน้ำ กันฝุ่น"],
    image: "https://entgroup-rugged.com/assets/w10y-main-woE420pE.png",
    productUrl: "https://entgroup-rugged.com/product/w10y",
  },
  {
    id: "w10n", model: "W10N", name: "แท็บเล็ตอุตสาหกรรมทนทาน W10N ราคาคุ้มค่า", os: "Windows",
    size: '10"', cpu: "Intel Celeron N5100 (1.1-2.8GHz)", ram: "8GB / 128GB",
    display: "10\" 1280×800 IPS 700cd/㎡",
    highlights: ["IPS 10\" รองรับมือเปียก/ถุงมือ", "IP68 กันน้ำ กันฝุ่น"],
    image: "https://entgroup-rugged.com/assets/w10n-main-DJomacwZ.png",
    productUrl: "https://entgroup-rugged.com/product/w10n",
  },
  // ── Android (6) ──
  {
    id: "f9r", model: "F9R", name: "Android Powerhouse F9R", os: "Android",
    size: '10.1"', cpu: "RK3588 Octa-Core (4×A76 + 4×A55)", ram: "8GB / 128GB",
    display: "10.1\" 1200×1920 IPS 600 nits",
    highlights: ["Octa-Core Power", "Bright 600 nits"],
    image: "https://entgroup-rugged.com/assets/f9r-V3GyP6IL.jpg",
    price: "฿23,990",
    productUrl: "https://entgroup-rugged.com/product/f9r",
  },
  {
    id: "f7r", model: "F7R", name: "Android Tablet F7R", os: "Android",
    size: '10.1"', cpu: "RK3399 Hexa-Core (2×A72 + 4×A53)", ram: "4GB / 64GB",
    display: "10.1\" 800×1280 IPS",
    highlights: ["Massive Battery", "Hexa-Core CPU"],
    image: "https://entgroup-rugged.com/assets/f7-series-main-DzoEL2Ov.png",
    price: "฿18,990",
    productUrl: "https://entgroup-rugged.com/product/f7r",
  },
  {
    id: "f8r", model: "F8R", name: "Compact Android F8R", os: "Android",
    size: '8"', cpu: "Rockchip RK3566 Cortex A55 Quad-Core", ram: "2GB/4GB / 32GB/64GB",
    display: "8\" 1280×800 IPS 300ANSI",
    highlights: ["Compact Size", "Quad-Core"],
    image: "https://entgroup-rugged.com/assets/f8r-main-CXDYaSDl.png",
    price: "฿13,990",
    productUrl: "https://entgroup-rugged.com/product/f8r",
  },
  {
    id: "f12r", model: "F12R", name: "Android AiO F12R", os: "Android",
    size: '11.6"', cpu: "RK3399", ram: "4GB / 64GB",
    display: "11.6\" 1366×768 IPS",
    highlights: ["Large Screen", "VESA Mount"],
    image: "https://entgroup-rugged.com/assets/f12r-A9I7xqWg.jpg",
    price: "฿12,990",
    productUrl: "https://entgroup-rugged.com/product/f12r",
  },
  {
    id: "a10st", model: "A10ST", name: "Rugged Tablet A10ST (Android 13)", os: "Android",
    size: '10"', cpu: "MTK8781 Octa-Core 2.2GHz", ram: "8GB / 12GB / 128GB / 256GB",
    display: "10\" 1920×1200 IPS 700cd/㎡",
    highlights: ["IP68 Protection", "MTK8781 Octa-Core"],
    image: "https://entgroup-rugged.com/assets/a10st-13-CjHhtG0m.jpg",
    productUrl: "https://entgroup-rugged.com/product/a10st-13",
  },
  {
    id: "a109t", model: "A109T", name: "Ultra-Slim Tablet A109T", os: "Android",
    size: '10"', cpu: "MT6789V Octa-Core", ram: "8GB / 128GB",
    display: "10\" 700cd/㎡ IPS",
    highlights: ["IP68 Rated", "Android 14"],
    image: "https://entgroup-rugged.com/assets/a109t-product-main-BDvMNhIR.png",
    productUrl: "https://entgroup-rugged.com/product/a109t",
  },
];

const features = [
  { icon: Shield, title: "ทนทานระดับอุตสาหกรรม", desc: "ผ่านมาตรฐาน MIL-STD-810G ทนการตกกระแทก สั่นสะเทือน อุณหภูมิสุดขั้ว" },
  { icon: Droplets, title: "กันน้ำ กันฝุ่น IP65-IP68", desc: "มาตรฐาน IP65-IP68 ปกป้องจากฝุ่น น้ำ สารเคมี ใช้งานในทุกสภาพแวดล้อม" },
  { icon: Battery, title: "แบตเตอรี่อึดทนนาน", desc: "แบตเตอรี่สูงสุด 6,000 mAh ถอดเปลี่ยนได้ ใช้งานต่อเนื่องยาวนาน" },
  { icon: Smartphone, title: "หน้าจอสัมผัสคุณภาพสูง", desc: "IPS Full HD รองรับมัลติทัช ใช้งานได้แม้ใส่ถุงมือ ความสว่างสูง" },
  { icon: Monitor, title: 'หลากหลายขนาด 8"-12"', desc: 'เลือกได้ตั้งแต่ 8 นิ้วกะทัดรัด จนถึง 11.6 นิ้วสำหรับงานภาคสนาม' },
  { icon: Wifi, title: "เชื่อมต่อครบครัน", desc: "WiFi, Bluetooth, 4G LTE, NFC, สแกนลายนิ้วมือ, กล้องคู่ ตามรุ่น" },
];

const downloads = [
  { name: "Gole Product Overview", url: "https://docs.wixstatic.com/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" },
  { name: "Rugged Knowledge", url: "https://docs.wixstatic.com/ugd/0597a3_990b58aea85c404f923495453e23b027.pdf" },
  { name: "วารสาร Rugged", url: "https://docs.wixstatic.com/ugd/0597a3_064a791320d74e85957143c869a8c0fd.pdf" },
  { name: "TPC-1062A Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_70c1f8faf9cd4eadb93ffb5479aa6854.pdf" },
  { name: "TPC-1082A Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_288240e733304dba8334ca07cdc411cf.pdf" },
  { name: "Gole F9A Overview", url: "https://docs.wixstatic.com/ugd/0597a3_3a33965f742b4034b974ef56aab56170.pdf" },
];

type OsFilter = "all" | "Windows" | "Android";

/* ═══════ Product Card ═══════ */
const TabletCard = ({
  product, onQuote, selected, onToggleSelect,
}: {
  product: TabletProduct;
  onQuote: (name: string) => void;
  selected: boolean;
  onToggleSelect: (name: string) => void;
}) => (
  <div className={`card-surface overflow-hidden group transition-all ${selected ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
    <div className="relative bg-secondary/30 p-4 flex items-center justify-center h-52">
      <WishlistHeart
        item={{ id: product.id, name: product.name, category: "Rugged Tablet", image: product.image, href: "/rugged-tablet", specs: product.cpu }}
        className="absolute top-3 right-3"
      />
      <button
        onClick={() => onToggleSelect(product.model)}
        className="absolute top-3 left-3 z-10"
      >
        <Checkbox checked={selected} className="h-5 w-5" />
      </button>
      {/* OS badge */}
      <Badge className={`absolute top-3 left-12 text-[10px] ${product.os === "Windows" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}`}>
        {product.os}
      </Badge>
      {product.badge && (
        <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-[10px]">{product.badge}</Badge>
      )}
      <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">{product.model}</p>
          <h3 className="font-display font-bold text-foreground text-sm leading-tight">{product.name}</h3>
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">{product.size}</Badge>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>{product.display}</p>
        <p>{product.cpu}</p>
        <p>{product.ram}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {product.highlights.map((h) => (
          <span key={h} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary text-foreground/70">{h}</span>
        ))}
      </div>
      {product.price && (
        <p className="text-base font-bold text-primary">{product.price}</p>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link to={`/rugged-tablet/${product.id}`}>
            <Monitor className="w-3.5 h-3.5 mr-1.5" /> ดูสเปก
          </Link>
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onQuote(product.model)}>
          <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอราคา
        </Button>
      </div>
    </div>
  </div>
);

/* ═══════ Main Component ═══════ */
const RuggedTablet = () => {
  const [osFilter, setOsFilter] = useState<OsFilter>("all");
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showMultiQuote, setShowMultiQuote] = useState(false);

  const filtered = useMemo(() => {
    if (osFilter === "all") return tablets;
    return tablets.filter((t) => t.os === osFilter);
  }, [osFilter]);

  const winCount = tablets.filter((t) => t.os === "Windows").length;
  const androidCount = tablets.filter((t) => t.os === "Android").length;

  const toggleSelect = useCallback((model: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(model)) next.delete(model);
      else next.add(model);
      return next;
    });
  }, []);

  const clearSelection = () => setSelectedProducts(new Set());

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Rugged Tablet กันน้ำ กันกระแทก — 15 รุ่น"
        description="Rugged Tablet ทนทาน กันน้ำ IP65-IP68 กันกระแทก MIL-STD-810G สำหรับงานภาคสนาม ทหาร โลจิสติกส์ — Windows & Android 15 รุ่น"
        path="/rugged-tablet"
      />
      <ProductJsonLd
        collectionName="Rugged Tablet กันน้ำ กันกระแทก"
        collectionDescription="Rugged Tablet ทนทาน กันน้ำ IP65-IP68 กันกระแทก MIL-STD-810G — 15 รุ่น Windows & Android"
        collectionUrl="/rugged-tablet"
        products={tablets.filter((t) => t.price).map((t) => ({ name: t.name, price: t.price, category: "Rugged Tablet" }))}
      />
      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "Rugged Tablet", path: "/rugged-tablet" }]} />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={ruggedHero} alt="" className="w-full h-full object-cover" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Rugged & Industrial Grade</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                Rugged <span className="text-gradient">Tablet</span>
              </h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                แท็บเล็ตสำหรับงานภาคสนาม คลังสินค้า โรงงาน และการใช้งานกลางแจ้ง ผ่านมาตรฐาน IP65-IP68 ทนทานต่อการตกกระแทก
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button size="sm" onClick={() => setQuoteProduct("Rugged Tablet")}>
                <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
              </Button>
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {["IP65-IP68 Protection", '8"-12" Display', "Windows & Android", "รับประกัน 1 ปี"].map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-background/60 backdrop-blur border border-border">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky OS Filter ── */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {([
              { id: "all" as OsFilter, label: `ทั้งหมด (${tablets.length})` },
              { id: "Windows" as OsFilter, label: `Windows (${winCount})` },
              { id: "Android" as OsFilter, label: `Android (${androidCount})` },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setOsFilter(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  osFilter === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Quick nav links */}
            <div className="ml-auto flex items-center gap-1">
              {[
                { label: "Features", href: "#features" },
                { label: "Downloads", href: "#downloads" },
              ].map((nav) => (
                <a
                  key={nav.href}
                  href={nav.href}
                  className="shrink-0 px-3 py-2 rounded-lg text-xs font-medium text-foreground/50 hover:bg-secondary/50 transition-colors"
                >
                  {nav.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* ── Product Grid ── */}
        <section id="products">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                Rugged <span className="text-gradient">Tablet Collection</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                แท็บเล็ตทนทานระดับอุตสาหกรรม — แสดง {filtered.length} รุ่น
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <TabletCard
                key={p.id}
                product={p}
                onQuote={setQuoteProduct}
                selected={selectedProducts.has(p.model)}
                onToggleSelect={toggleSelect}
              />
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">คุณสมบัติเด่น</h2>
          <p className="text-muted-foreground text-center mb-8">ทนทาน ยืดหยุ่น พร้อมลุยทุกสถานการณ์</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="card-surface p-5">
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Categories ── */}
        <section className="space-y-3">
          <h2 className="text-lg font-display font-bold text-foreground mb-2">หมวดหมู่ที่เกี่ยวข้อง</h2>
          {[
            { to: "/rugged-notebook", title: "Rugged Notebook", desc: "โน้ตบุ๊คทนทานมาตรฐานทหาร MIL-STD-810G/H — 10 รุ่น", gradient: "Notebook" },
            { to: "/handheld", title: "Rugged Handheld & PDA", desc: "เครื่องพกพาและ PDA มาตรฐานอุตสาหกรรม — 16 รุ่น", gradient: "Handheld & PDA" },
            { to: "/aio", title: "All-in-One Industrial PC", desc: "คอมพิวเตอร์ All-in-One จอสัมผัสอุตสาหกรรม — 15 รุ่น", gradient: "Industrial PC" },
          ].map((cat) => (
            <Link key={cat.to} to={cat.to} className="card-surface p-5 flex items-center justify-between group hover:border-primary/30 transition-all">
              <div>
                <h3 className="text-base font-display font-bold text-foreground">
                  {cat.title.replace(cat.gradient, "")} <span className="text-gradient">{cat.gradient}</span>
                </h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </section>

        {/* ── Downloads ── */}
        <section id="downloads">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {downloads.map((dl, i) => (
              <a key={i} href={dl.url} target="_blank" rel="noopener noreferrer" className="card-surface p-4 flex items-center gap-3 hover:border-primary/30 transition-all group">
                <Download className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{dl.name}</p>
                  <p className="text-xs text-muted-foreground">PDF</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <PriceDisclaimer />

        {/* ── CTA ── */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ Rugged Tablet?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือก Rugged Tablet ที่เหมาะกับงานของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/contact">ติดต่อเรา</Link>
            </Button>
            <Button onClick={() => setQuoteProduct("Rugged Tablet")}>
              <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
            </Button>
          </div>
        </div>
      </div>

      {/* ── Floating Selection Bar ── */}
      {selectedProducts.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold text-sm">{selectedProducts.size} รุ่น</span>
          </div>
          <Button size="sm" variant="secondary" className="rounded-full font-bold" onClick={() => setShowMultiQuote(true)}>
            <FileText className="w-4 h-4 mr-1.5" /> ขอใบเสนอราคารวม
          </Button>
          <button onClick={clearSelection} className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <QuoteDialog open={!!quoteProduct} onClose={() => setQuoteProduct(null)} productName={quoteProduct || ""} productCategory="Rugged Tablet" />
      <QuoteDialog
        open={showMultiQuote}
        onClose={() => { setShowMultiQuote(false); clearSelection(); }}
        productCategory="Rugged Tablet"
        initialProducts={Array.from(selectedProducts).map((model) => ({ category: "Rugged Tablet", model, qty: 1 }))}
      />
      <FooterCompact />
    </div>
  );
};

export default RuggedTablet;
