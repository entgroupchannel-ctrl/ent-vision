import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Shield, Smartphone, Battery, Scan, Wifi, FileText,
  ShoppingCart, X, Fingerprint, Radio,
} from "lucide-react";
import handheldHero from "@/assets/handheld-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SEOHead from "@/components/SEOHead";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ProductJsonLd from "@/components/ProductJsonLd";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import WishlistHeart from "@/components/WishlistHeart";
import { handheldProducts, type HandheldProduct } from "@/data/rugged-handheld-products";

/* ───── Features ───── */
const features = [
  { icon: Shield, title: "IP65 – IP68 กันน้ำ กันฝุ่น", desc: "ใช้งานในฝน ฝุ่น สารเคมี ได้อย่างมั่นใจ" },
  { icon: Scan, title: "2D Barcode & UHF RFID", desc: "สแกนบาร์โค้ดทุกประเภท พร้อม RFID ระยะไกล" },
  { icon: Battery, title: "แบตอึดสุด 20,000mAh", desc: "ใช้งานได้หลายวัน ถอดเปลี่ยนได้ทันที" },
  { icon: Wifi, title: "5G / 4G LTE พร้อมเชื่อมต่อ", desc: "เครือข่ายเร็วแรง WiFi 6, Bluetooth, NFC ครบ" },
  { icon: Fingerprint, title: "ปลดล็อกลายนิ้วมือ & Face ID", desc: "ความปลอดภัยระดับสูง เข้าถึงข้อมูลได้เร็ว" },
  { icon: Radio, title: "Multi-GNSS Navigation", desc: "GPS, GLONASS, Galileo, Beidou — แม่นยำทุกพื้นที่" },
];

/* ───── Filter ───── */
const filterOptions = [
  { id: "all", label: "ทั้งหมด" },
  { id: "android", label: "Android" },
  { id: "windows", label: "Windows" },
];

/* ───── Product Card ───── */
const HandheldCard = ({
  product,
  selected,
  onToggleSelect,
  onQuote,
}: {
  product: HandheldProduct;
  selected: boolean;
  onToggleSelect: (name: string) => void;
  onQuote: (name: string) => void;
}) => (
  <Link
    to={`/handheld/${product.id}`}
    className={`card-surface overflow-hidden group transition-all block ${
      selected ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"
    }`}
  >
    <div className="relative bg-secondary/30 p-4 flex items-center justify-center h-52">
      <WishlistHeart
        item={{
          id: product.id,
          name: product.model,
          category: "Rugged Handheld",
          image: product.image,
          href: `/handheld/${product.id}`,
          specs: product.nameTH,
        }}
        className="absolute top-3 right-3"
      />
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleSelect(product.model); }}
        className="absolute top-3 left-3 z-10"
      >
        <Checkbox checked={selected} className="h-5 w-5" />
      </button>
      <img
        src={product.image}
        alt={product.model}
        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display font-bold text-foreground text-sm">{product.model}</h3>
        <Badge variant="secondary" className="text-xs shrink-0">{product.screenSize}</Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{product.nameTH}</p>
      <div className="flex flex-wrap gap-1">
        {product.badges.map((b) => (
          <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <span><Smartphone className="w-3.5 h-3.5 mr-1.5" /> ดูสเปก</span>
        </Button>
        <Button size="sm" className="flex-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuote(product.model); }}>
          <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอราคา
        </Button>
      </div>
    </div>
  </Link>
);

/* ───── Main Page ───── */
const Handheld = () => {
  const [filter, setFilter] = useState("all");
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showMultiQuote, setShowMultiQuote] = useState(false);

  const toggleSelect = useCallback((name: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const clearSelection = () => setSelectedProducts(new Set());

  const filtered = filter === "all"
    ? handheldProducts
    : handheldProducts.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Rugged Handheld & PDA กันน้ำ สแกนบาร์โค้ด"
        description="Rugged Handheld, PDA และมือถืออุตสาหกรรม กันน้ำ กันกระแทก IP65-IP68 พร้อม 2D Scanner, NFC, 5G สำหรับคลังสินค้า โลจิสติกส์ และงานภาคสนาม"
        path="/handheld"
      />
      <ProductJsonLd
        collectionName="Rugged Handheld & PDA"
        collectionDescription="มือถือและ PDA มาตรฐานอุตสาหกรรม กันน้ำ กันกระแทก"
        collectionUrl="/handheld"
        products={handheldProducts.map((p) => ({ name: p.name, image: p.image, category: "Rugged Handheld" }))}
      />
      <BreadcrumbJsonLd items={[
        { name: "สินค้า", path: "/products" },
        { name: "Handheld & PDA", path: "/handheld" },
      ]} />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>

          <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Rugged Handheld & PDA</Badge>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            Rugged <span className="text-gradient">Handheld & PDA</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">
            เครื่องพกพาและ PDA เกรดอุตสาหกรรม กันน้ำ กันกระแทก IP65-IP68 พร้อม Barcode Scanner, NFC, RFID
            สำหรับคลังสินค้า โลจิสติกส์ ขนส่ง และงานภาคสนาม — Windows & Android
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "ระดับกันน้ำ", value: "IP65 – IP68" },
              { label: "หน้าจอ", value: '4" – 10.95"' },
              { label: "ระบบ", value: "Android / Windows" },
              { label: "แบตเตอรี่", value: "สูงสุด 20,000 mAh" },
            ].map((s, i) => (
              <div key={i} className="card-surface p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="font-bold text-foreground text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Filter */}
      <div className="sticky top-[57px] z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === opt.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
          <span className="text-xs text-muted-foreground ml-auto shrink-0">{filtered.length} รุ่น</span>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Features */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">คุณสมบัติเด่น</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">ทนทาน พกพาง่าย สแกนเร็ว พร้อมลุยทุกสถานการณ์</p>
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

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            สินค้า <span className="text-gradient">Handheld & PDA</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <HandheldCard
                key={p.id}
                product={p}
                selected={selectedProducts.has(p.model)}
                onToggleSelect={toggleSelect}
                onQuote={setQuoteProduct}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ Rugged Handheld & PDA?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือก Handheld ที่เหมาะกับงานของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/rugged-tablet">ดู Rugged Tablet & Notebook</Link>
            </Button>
            <Button onClick={() => setQuoteProduct("Rugged Handheld & PDA")}>
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
            onClick={() => setShowMultiQuote(true)}
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
        productCategory="Rugged Handheld & PDA"
      />
      <QuoteDialog
        open={showMultiQuote}
        onClose={() => { setShowMultiQuote(false); clearSelection(); }}
        productCategory="Rugged Handheld & PDA"
        initialProducts={Array.from(selectedProducts).map((name) => ({
          category: "Rugged Handheld & PDA",
          model: name,
          qty: 1,
        }))}
      />
      <FooterCompact />
    </div>
  );
};

export default Handheld;
