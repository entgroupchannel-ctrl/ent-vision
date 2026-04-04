import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WishlistHeart from "@/components/WishlistHeart";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Shield, Droplets, Battery, Smartphone, Monitor, Download, ChevronLeft, ChevronRight, Wifi, FileText, CheckSquare, Square, ShoppingCart, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ruggedHero from "@/assets/rugged-tablet-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FooterCompact from "@/components/FooterCompact";
import PriceDisclaimer from "@/components/PriceDisclaimer";
import QuoteDialog from "@/components/QuoteDialog";

/* ───── Product Categories ───── */

const goleRuggedTablets = [
  {
    id: "f7g",
    name: "Gole F7G",
    size: '7"',
    os: "Android / Windows",
    highlight: "หน้าจอสัมผัส 7 นิ้ว ทนทาน กันน้ำ กันฝุ่น",
    image: "https://static.wixstatic.com/media/0597a3_7ac8863aec774fe2a9f5ef3eae9490a1~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(2).png",
    datasheet: "https://docs.wixstatic.com/ugd/0597a3_92835c695be34af08b00b1dc3394fe83.pdf",
  },
  {
    id: "f7r",
    name: "Gole F7R",
    size: '7"',
    os: "Android",
    highlight: "คอมแพ็คท์ ทนทาน พกพาสะดวก สำหรับงานสนาม",
    image: "https://static.wixstatic.com/media/0597a3_f7670923b4fa410cb096b5a7357de026~mv2.png/v1/fill/w_350,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(2).png",
    datasheet: "https://docs.wixstatic.com/ugd/0597a3_b2fb7597f1b4458c862548e91b6bb6cc.pdf",
  },
  {
    id: "f9a",
    name: "Gole F9A",
    size: '9"',
    os: "Android",
    highlight: "หน้าจอกว้างขึ้น พร้อมแบตเตอรี่ขนาดใหญ่",
    image: "https://static.wixstatic.com/media/0597a3_aa3fa9aff52147e780c6bdbd364e8516~mv2.png/v1/crop/x_0,y_3,w_1040,h_998/fill/w_333,h_320,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(3).png",
    datasheet: "https://docs.wixstatic.com/ugd/0597a3_3a33965f742b4034b974ef56aab56170.pdf",
  },
];

const goleWindowsModels = [
  { name: "Rugged F3", price: "฿20,900", datasheet: "" },
  { name: "Rugged F3APL", price: "฿14,900", datasheet: "" },
  { name: "Rugged F6APL", price: "฿15,900", datasheet: "" },
  { name: "Rugged F11APL", price: "฿16,900", datasheet: "https://docs.wixstatic.com/ugd/005637_f02217601dad4d409461b2ddd18e56c4.pdf" },
  { name: "Rugged F12APL", price: "฿19,900", datasheet: "https://docs.wixstatic.com/ugd/005637_8b4c9a6183374654920d6774c95db305.pdf" },
  { name: "Rugged F15APL N3450", price: "฿20,900", datasheet: "https://docs.wixstatic.com/ugd/005637_b353baf418bc46279e6302dfd90a5848.pdf" },
  { name: "Rugged F15APL J3355", price: "฿19,900", datasheet: "https://docs.wixstatic.com/ugd/005637_1940ca9c1adf4d2296646195d8d9a347.pdf" },
];

const goleAndroidModels = [
  { name: "Rugged F3R", price: "฿10,900", datasheet: "https://docs.wixstatic.com/ugd/005637_f8525dea6d034b26b5b09324b8e15bbc.pdf" },
  { name: "Rugged F6R", price: "฿12,900", datasheet: "https://docs.wixstatic.com/ugd/005637_50b47eff40c94ec28d0ae8fcb77d0ef8.pdf" },
  { name: "Rugged F11R (RK3568)", price: "฿17,900", datasheet: "https://docs.wixstatic.com/ugd/005637_b93e6728b85440fc8dba1818fafbe943.pdf" },
  { name: "Rugged F12R", price: "฿17,900", datasheet: "https://docs.wixstatic.com/ugd/005637_b121d1a8618a4a0486d7ef4f6012bf1c.pdf" },
  { name: "Rugged F15R", price: "฿19,900", datasheet: "https://docs.wixstatic.com/ugd/005637_d99131aa2339461fadbb2b2e188cd0b7.pdf" },
];

const emRuggedTablets = [
  {
    id: "f9e",
    name: "F9E Elite Mini PC",
    size: '10.1"',
    highlight: "Intel i5-1235U สูงสุด 4.4GHz, 16GB LPDDR4x / 256GB, จอ FHD 1200×1920 ประสิทธิภาพสูงสุด",
    image: "https://entgroup-rugged.com/assets/f9e-C3MseYpo.png",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/f9e",
  },
  {
    id: "w109u",
    name: "W109U Industrial Tablet",
    size: '10.95"',
    highlight: "Intel i5-1235U / i7-1255U (10-core), 16-48GB RAM, IP68 กันน้ำกันฝุ่นระดับสูงสุด",
    image: "https://entgroup-rugged.com/assets/w109u-main-C8XbCmqD.png",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/w109u",
  },
  {
    id: "w10y",
    name: "W10Y Industrial Tablet",
    size: '10"',
    highlight: "Intel Core i5-10210Y, จอ IPS ความสว่าง 700cd/㎡, IP68 กันน้ำกันฝุ่น",
    image: "https://entgroup-rugged.com/assets/w10y-main-woE420pE.png",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/w10y",
  },
  {
    id: "f7g",
    name: "F7G Rugged Tablet",
    size: '10.1"',
    highlight: "Intel N4120, 8GB/128GB, จอ FHD IPS 1920×1200, IP67 กันน้ำ ทนตก 1.5 เมตร",
    image: "https://entgroup-rugged.com/assets/f7g-DidJ5UAD.png",
    datasheet: "",
    price: "฿22,990",
    productUrl: "https://entgroup-rugged.com/product/f7g",
  },
  {
    id: "f9a",
    name: "F9A Professional Tablet",
    size: '10.1"',
    highlight: "Intel Alder Lake N100 สูงสุด 3.4GHz, 8-16GB RAM, แบตอึด Multi-Touch 10 จุด",
    image: "https://entgroup-rugged.com/assets/f9a-_j8J-x2I.jpg",
    datasheet: "",
    price: "฿27,990",
    productUrl: "https://entgroup-rugged.com/product/f9a",
  },
  {
    id: "f8ct",
    name: "F8CT Compact Tablet",
    size: '8"',
    highlight: "Intel x5-Z8350 Quad-Core, จอ IPS HD 8 นิ้ว, IP67 กันน้ำ กันฝุ่น ขนาดกะทัดรัด",
    image: "https://entgroup-rugged.com/assets/f8ct-CetUjj-d.png",
    datasheet: "",
    price: "฿21,990",
    productUrl: "https://entgroup-rugged.com/product/f8ct",
  },
  {
    id: "w10n",
    name: "W10N Value Tablet",
    size: '10"',
    highlight: "Intel Celeron N5100, จอ IPS 700cd/㎡, IP68 รองรับมือเปียกและถุงมือ ราคาคุ้มค่า",
    image: "https://entgroup-rugged.com/assets/w10n-main-DJomacwZ.png",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/w10n",
  },
  {
    id: "f9r",
    name: "F9R Android Powerhouse",
    size: '10.1"',
    highlight: "RK3588 Octa-Core (4×A76+4×A55), จอ IPS 600 nits, 8GB/128GB Android ประสิทธิภาพสูง",
    image: "https://entgroup-rugged.com/assets/f9r-V3GyP6IL.jpg",
    datasheet: "",
    price: "฿23,990",
    productUrl: "https://entgroup-rugged.com/product/f9r",
  },
  {
    id: "a10st",
    name: "A10ST Rugged Android 13",
    size: '10"',
    highlight: "MTK8781 Octa-Core 2.2GHz, จอ IPS 700cd/㎡ 1920×1200, IP68 Android 13",
    image: "https://entgroup-rugged.com/assets/a10st-13-CjHhtG0m.jpg",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/a10st-13",
  },
  {
    id: "a109t",
    name: "A109T Ultra-Slim Android 14",
    size: '10"',
    highlight: "MT6789V Octa-Core, จอ IPS 700cd/㎡, IP68 บางเฉียบ Android 14 รุ่นใหม่ล่าสุด",
    image: "https://entgroup-rugged.com/assets/a109t-product-main-BDvMNhIR.png",
    datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/a109t",
  },
];


const tpcSeries = [
  {
    id: "tpc-1062a",
    name: "TPC-1062A",
    size: '10"',
    highlight: "Rugged Tablet เกรดอุตสาหกรรม หน้าจอสัมผัส",
    datasheet: "https://docs.wixstatic.com/ugd/0597a3_70c1f8faf9cd4eadb93ffb5479aa6854.pdf",
  },
  {
    id: "tpc-1082a",
    name: "TPC-1082A",
    size: '10"',
    highlight: "Rugged Tablet เกรดอุตสาหกรรม สเปคสูง",
    datasheet: "https://docs.wixstatic.com/ugd/0597a3_288240e733304dba8334ca07cdc411cf.pdf",
  },
];

const aioProducts = [
  {
    id: "h10pro", name: "H10PRO Box PC", size: '10"',
    highlight: "Intel J4125 Quad Core, จอ IPS Touch 1920x1200, แบต 10000mAh, VESA/Wall Mount",
    image: "https://entgroup-rugged.com/assets/h10pro-8mKFXuc7.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/h10pro",
  },
  {
    id: "h10f", name: "H10F Box PC + Scanner", size: '10.1"',
    highlight: "Intel J4125 Quad Core, 2D Scanner ในตัว, ถอดแบตได้, Desktop/Wall Mount",
    image: "https://entgroup-rugged.com/assets/h10f-BONJ3fIQ.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/h10f",
  },
  {
    id: "f10-aio", name: "F10 All-in-One PC", size: '10.1"',
    highlight: "Intel Celeron N5095, จอ IPS 1200x1920, Windows 11 Pro, VESA Mount",
    image: "https://entgroup-rugged.com/assets/f10-C93ZGwZ7.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/f10",
  },
  {
    id: "f15", name: "F15 Industrial AIO", size: '15.6"',
    highlight: "Intel Celeron N5095, จอ FHD IPS Touch 15.6 นิ้ว พร้อมขาตั้ง, Windows 11 Pro",
    image: "https://entgroup-rugged.com/assets/f15-fmf9sjOL.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/f15",
  },
  {
    id: "f3apl", name: "F3APL Mini Tablet", size: '8"',
    highlight: "Intel N4200, จอ HD IPS Touch 8 นิ้ว, Wall Mount, ขนาดกะทัดรัด",
    image: "https://entgroup-rugged.com/assets/f3apl-BmanKFN1.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/f3apl",
  },
  {
    id: "em-p18r", name: "EM-P18R Panel PC", size: '18.5"',
    highlight: "Rockchip RK3568 Quad Core, จอ HD+ Touch 18.5 นิ้ว, Panel/VESA Mount",
    image: "https://entgroup-rugged.com/assets/em-p18r-BXxSGPUz.jpg", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/em-p18r",
  },
  {
    id: "em-pt21", name: "EM-PT21 Panel Display", size: '21.5"',
    highlight: "Intel Processor, จอ FHD 1920x1080 Touch 21.5 นิ้ว, Panel/VESA Mount",
    image: "https://entgroup-rugged.com/assets/em-pt21-Bb8yF9hD.png", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/em-pt21",
  },
  {
    id: "em-p21r", name: "EM-P21R Android Panel PC", size: '21.5"',
    highlight: "Rockchip RK3568, จอ FHD Touch 21.5 นิ้ว, Android 12, Embedded Panel",
    image: "https://entgroup-rugged.com/assets/em-p21r-DY_u1Sch.png", datasheet: "",
    productUrl: "https://entgroup-rugged.com/product/em-p21r",
  },
];


const features = [
  { icon: Shield, title: "ทนทานระดับอุตสาหกรรม", desc: "ผ่านมาตรฐาน MIL-STD-810G ทนการตกกระแทก สั่นสะเทือน อุณหภูมิสุดขั้ว" },
  { icon: Droplets, title: "กันน้ำ กันฝุ่น IP65/IP67", desc: "มาตรฐาน IP65-IP67 ปกป้องจากฝุ่น น้ำ สารเคมี ใช้งานในทุกสภาพแวดล้อม" },
  { icon: Battery, title: "แบตเตอรี่อึดทนนาน", desc: "แบตเตอรี่สูงสุด 6,000 mAh ถอดเปลี่ยนได้ ใช้งานต่อเนื่องยาวนาน" },
  { icon: Smartphone, title: "หน้าจอสัมผัสคุณภาพสูง", desc: "IPS Full HD รองรับมัลติทัช ใช้งานได้แม้ใส่ถุงมือ ความสว่างสูง" },
  { icon: Monitor, title: "หลากหลายขนาด 7-17 นิ้ว", desc: "เลือกได้ตั้งแต่ 7 นิ้วพกพาสะดวก จนถึง 17 นิ้วสำหรับงานภาคสนาม" },
  { icon: Wifi, title: "เชื่อมต่อครบครัน", desc: "WiFi, Bluetooth, 3G/4G, NFC, สแกนลายนิ้วมือ, กล้องคู่ ตามรุ่น" },
];

const categories = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "gole", label: "Gole Series" },
  { id: "em-rugged", label: "Rugged Tablet" },
  
  { id: "aio", label: "All-in-One PC" },
  
  { id: "tpc", label: "TPC Series" },
  { id: "pricelist", label: "Price List" },
  { id: "downloads", label: "Downloads" },
];

const ITEMS_PER_PAGE = 10;

/* ───── Product Card ───── */
const ProductCard = ({ product, onQuote, selected, onToggleSelect }: { 
  product: { name: string; size?: string; highlight: string; image?: string; datasheet: string; price?: string; productUrl?: string; internalUrl?: string }; 
  onQuote?: (name: string) => void;
  selected?: boolean;
  onToggleSelect?: (name: string) => void;
}) => {
  const cardContent = (
    <>
      {product.image && (
        <div className="relative bg-secondary/30 p-4 flex items-center justify-center h-48">
          <WishlistHeart
            item={{ id: product.name.toLowerCase().replace(/\s+/g, "-"), name: product.name, category: "Rugged Tablet", image: product.image, href: product.internalUrl || "/rugged-tablet", specs: product.highlight }}
            className="absolute top-3 right-3"
          />
          {onToggleSelect && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSelect(product.name); }}
              className="absolute top-3 left-3 z-10"
            >
              <Checkbox checked={selected} className="h-5 w-5" />
            </button>
          )}
          <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      )}
      {!product.image && onToggleSelect && (
        <div className="flex justify-end p-3 pb-0">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSelect(product.name); }}>
            <Checkbox checked={selected} className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display font-bold text-foreground text-sm">{product.name}</h3>
          {product.size && <Badge variant="secondary" className="text-xs shrink-0">{product.size}</Badge>}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{product.highlight}</p>
        {product.price && (
          <p className="text-sm font-bold text-primary">{product.price}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {product.internalUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to={product.internalUrl}>
                <Monitor className="w-3.5 h-3.5 mr-1.5" /> ดูสเปก
              </Link>
            </Button>
          )}
          {!product.internalUrl && product.productUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> ดูสเปก
              </a>
            </Button>
          )}
          {product.datasheet && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={product.datasheet} target="_blank" rel="noopener noreferrer">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Datasheet
              </a>
            </Button>
          )}
          <Button size="sm" className="flex-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuote?.(product.name); }}>
            <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอราคา
          </Button>
        </div>
      </div>
    </>
  );

  if (product.internalUrl) {
    return (
      <Link to={product.internalUrl} className={`card-surface overflow-hidden group transition-all block ${selected ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`card-surface overflow-hidden group transition-all ${selected ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
      {cardContent}
    </div>
  );
};

/* ───── Main Component ───── */
const RuggedTablet = () => {
  const [activeCategory, setActiveCategory] = useState("overview");
  const [winPage, setWinPage] = useState(1);
  const [androidPage, setAndroidPage] = useState(1);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showMultiQuote, setShowMultiQuote] = useState(false);

  const toggleSelect = useCallback((name: string) => {
    setSelectedProducts(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const clearSelection = () => setSelectedProducts(new Set());

  const openMultiQuote = () => {
    setShowMultiQuote(true);
  };
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Rugged Tablet & Notebook กันน้ำ กันกระแทก" description="Rugged Tablet และ Notebook ทนทาน กันน้ำ กันกระแทก MIL-STD-810G สำหรับงานภาคสนาม ทหาร โลจิสติกส์ และอุตสาหกรรม" path="/rugged-tablet" />
      <ProductJsonLd
        collectionName="Rugged Tablet & Notebook กันน้ำ กันกระแทก"
        collectionDescription="Rugged Tablet และ Notebook ทนทาน กันน้ำ กันกระแทก MIL-STD-810G สำหรับงานภาคสนาม ทหาร โลจิสติกส์"
        collectionUrl="/rugged-tablet"
        products={[...goleWindowsModels, ...goleAndroidModels].map(m => ({ name: m.name, price: m.price, category: "Rugged Tablet" }))}      />

      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "Rugged Tablet", path: "/rugged-tablet" }]} />
      <div className="relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img src={ruggedHero} alt="" className="w-full h-full object-cover" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Rugged & Industrial Grade</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                Rugged <span className="text-gradient">Tablet & Notebook</span>
              </h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                คอมพิวเตอร์หน้าจอสัมผัสเกรดอุตสาหกรรมที่ทนทานและอเนกประสงค์ รองรับทั้ง Android และ Windows พร้อมมาตรฐาน IP65/IP67 กันน้ำ กันฝุ่น ทนกระแทก เหมาะกับงานภาคสนามและโรงงานอุตสาหกรรม
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button variant="outline" size="sm" asChild>
                <a href="https://docs.wixstatic.com/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Product Overview
                </a>
              </Button>
              <Button size="sm" onClick={() => setQuoteProduct("Rugged Tablet")}>
                <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Overview */}
        <section id="overview">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_c353892b50a549d3971cb83d643de648~mv2.png/v1/crop/x_0,y_27,w_2260,h_1162/fill/w_1314,h_667,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/RuggedBanner01.png"
              alt="Rugged Tablet Overview"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: "กันน้ำ กันฝุ่น", value: "IP65 / IP67" },
              { label: "ขนาดหน้าจอ", value: '7" - 17"' },
              { label: "ระบบปฏิบัติการ", value: "Android / Windows" },
              { label: "แบตเตอรี่", value: "สูงสุด 6,000 mAh" },
            ].map((item, i) => (
              <div key={i} className="card-surface p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
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

        {/* Gole Rugged Series */}
        <section id="gole">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Gole <span className="text-gradient">Rugged Series</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Rugged Tablet มาพร้อมหน้าจอสัมผัสความละเอียดสูง ลำโพงในตัว WiFi รองรับทั้ง Android & Windows
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {goleRuggedTablets.map((p) => (
              <ProductCard key={p.id} product={p} onQuote={(name) => setQuoteProduct(name)} selected={selectedProducts.has(p.name)} onToggleSelect={toggleSelect} />
            ))}
          </div>

          {/* Gole product images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://static.wixstatic.com/media/0597a3_d864fa53281f401c87833762e860a193~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(3).png",
              "https://static.wixstatic.com/media/0597a3_cf5add6fc863487f82013b5de835a8ae~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(4).png",
              "https://static.wixstatic.com/media/0597a3_0eca70dbf64e441eb910eb4623be9857~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(6).png",
              "https://static.wixstatic.com/media/0597a3_a351201828184c4785720ce6336a78eb~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(5).png",
            ].map((img, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={img} alt={`Gole Rugged ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Rugged Tablets - Windows & Android */}
        <section id="em-rugged">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Rugged <span className="text-gradient">Tablet Collection</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">แท็บเล็ตทนทานระดับอุตสาหกรรม Windows & Android พร้อมมาตรฐาน IP65-IP68</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emRuggedTablets.map((p) => (
              <ProductCard key={p.id} product={p} onQuote={(name) => setQuoteProduct(name)} selected={selectedProducts.has(p.name)} onToggleSelect={toggleSelect} />
            ))}
          </div>
        </section>

        {/* Rugged Notebook — Link to dedicated page */}
        <section id="notebook-link">
          <Link to="/rugged-notebook" className="card-surface p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-1">
                Rugged <span className="text-gradient">Notebook</span>
              </h2>
              <p className="text-sm text-muted-foreground">โน้ตบุ๊คทนทานมาตรฐานทหาร MIL-STD-810G/H — 10 รุ่น พร้อม AI PC, 2-in-1 และ Convertible</p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </Link>
        </section>

        {/* All-in-One PC */}
        <section id="aio">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            All-in-One <span className="text-gradient">Industrial PC</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">คอมพิวเตอร์ All-in-One จอสัมผัส สำหรับอุตสาหกรรม ประหยัดพื้นที่ VESA/Panel Mount</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aioProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuote={(name) => setQuoteProduct(name)} selected={selectedProducts.has(p.name)} onToggleSelect={toggleSelect} />
            ))}
          </div>
        </section>

        {/* Handheld & PDA — Link to dedicated page */}
        <section id="handheld-link">
          <Link to="/handheld" className="card-surface p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-1">
                Rugged <span className="text-gradient">Handheld & PDA</span>
              </h2>
              <p className="text-sm text-muted-foreground">เครื่องพกพาและ PDA มาตรฐานอุตสาหกรรม — 16 รุ่น พร้อม Barcode Scanner, NFC, RFID</p>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </Link>
        </section>

        <section id="tpc">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            TPC <span className="text-gradient">Series</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Rugged Tablet คอมพิวเตอร์หน้าจอสัมผัสเกรดอุตสาหกรรม ทนทานและอเนกประสงค์</p>

          <div className="card-surface overflow-hidden mb-6">
            <img
              src="https://static.wixstatic.com/media/0597a3_635e82bd628b488aa39a0efce082f43a~mv2.png/v1/fill/w_1316,h_456,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/tpc-banner02.png"
              alt="TPC Series Banner"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tpcSeries.map((p) => (
              <ProductCard key={p.id} product={{ ...p, image: undefined }} onQuote={(name) => setQuoteProduct(name)} selected={selectedProducts.has(p.name)} onToggleSelect={toggleSelect} />
            ))}
          </div>
        </section>

        {/* Buying Guide Banner */}
        <section>
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_8b5479cc6a1342db890862413f797f37~mv2.png/v1/fill/w_849,h_474,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%8B%E0%B8%B7%E0%B9%89%E0%B8%AD%20Gole%20Rugged%20Banner.png"
              alt="คู่มือเลือกซื้อ PC และแท็บเล็ตหน้าจอสัมผัส"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>

        {/* Price List */}
        <section id="pricelist">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            Price List <span className="text-gradient">ราคาสินค้า</span>
          </h2>

          <Tabs defaultValue="windows" className="w-full" onValueChange={() => { setWinPage(1); setAndroidPage(1); }}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>

            {[
              { value: "windows", data: goleWindowsModels, page: winPage, setPage: setWinPage },
              { value: "android", data: goleAndroidModels, page: androidPage, setPage: setAndroidPage },
            ].map(({ value, data, page, setPage }) => {
              const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
              const paginated = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

              return (
                <TabsContent key={value} value={value}>
                  <div className="card-surface overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-primary/10">
                            <TableHead className="text-primary font-bold w-12">No.</TableHead>
                            <TableHead className="text-primary font-bold">Model</TableHead>
                            <TableHead className="text-primary font-bold text-right">Price</TableHead>
                            <TableHead className="text-primary font-bold text-center w-28">Datasheet</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginated.map((row, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{(page - 1) * ITEMS_PER_PAGE + i + 1}</TableCell>
                              <TableCell className="font-semibold">{row.name}</TableCell>
                              <TableCell className="text-right font-bold text-primary">{row.price}</TableCell>
                              <TableCell className="text-center">
                                {row.datasheet ? (
                                  <a href={row.datasheet} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                    <Download className="w-4 h-4 inline" />
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground text-xs">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          แสดง {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, data.length)} จาก {data.length} รายการ
                        </p>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="h-8 w-8 p-0">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="h-8 w-8 p-0 text-xs">
                              {p}
                            </Button>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="h-8 w-8 p-0">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          <PriceDisclaimer />
        </section>

        {/* Downloads */}
        <section id="downloads">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Gole Product Overview", url: "https://docs.wixstatic.com/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" },
              { name: "Rugged Knowledge", url: "https://docs.wixstatic.com/ugd/0597a3_990b58aea85c404f923495453e23b027.pdf" },
              { name: "EM Rugged Notebook", url: "https://docs.wixstatic.com/ugd/0597a3_e2bfa41d47a1445b87da80e961544e2d.pdf" },
              { name: "EM-X15 / X15M Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_55b872cb254b4f0f8d8a1075e0934606.pdf" },
              { name: "EM-i81F Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_2be728ad3b0349d3b33554ed04c0214e.pdf" },
              { name: "EM-i10J Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_6d72e4515e004620af862a7897168a95.pdf" },
              { name: "TPC-1062A Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_70c1f8faf9cd4eadb93ffb5479aa6854.pdf" },
              { name: "TPC-1082A Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_288240e733304dba8334ca07cdc411cf.pdf" },
              
              { name: "วารสาร Rugged", url: "https://docs.wixstatic.com/ugd/0597a3_064a791320d74e85957143c869a8c0fd.pdf" },
              { name: "Gole F9A Overview", url: "https://docs.wixstatic.com/ugd/0597a3_3a33965f742b4034b974ef56aab56170.pdf" },
              { name: "EM-i17J Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_d2a64ac1b5444600b9255fcae1311289.pdf" },
            ].map((dl, i) => (
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

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ Rugged Tablet & Notebook?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือก Rugged Device ที่เหมาะกับงานของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a href="https://docs.wixstatic.com/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" /> ดาวน์โหลด Catalog
              </a>
            </Button>
            <Button onClick={() => setQuoteProduct("Rugged Tablet")}>
              <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Selection Bar */}
      {selectedProducts.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-full shadow-2xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-bold text-sm">{selectedProducts.size} รุ่น</span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full font-bold"
            onClick={openMultiQuote}
          >
            <FileText className="w-4 h-4 mr-1.5" /> ขอใบเสนอราคารวม
          </Button>
          <button onClick={clearSelection} className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <QuoteDialog
        open={!!quoteProduct}
        onClose={() => setQuoteProduct(null)}
        productName={quoteProduct || ""}
        productCategory="Rugged Tablet"
      />
      <QuoteDialog
        open={showMultiQuote}
        onClose={() => { setShowMultiQuote(false); clearSelection(); }}
        productCategory="Rugged Tablet"
        initialProducts={Array.from(selectedProducts).map(name => ({
          category: "Rugged Tablet / Notebook",
          model: name,
          qty: 1,
        }))}
      />
      <FooterCompact />
    </div>
  );
};


export default RuggedTablet;
