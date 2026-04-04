import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, ChevronRight, Cpu, HardDrive, Monitor, Shield,
  Battery, Camera, Wifi, Smartphone, FileText, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import SEOHead from "@/components/SEOHead";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ProductJsonLd from "@/components/ProductJsonLd";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import WishlistHeart from "@/components/WishlistHeart";
import { getTabletProduct, getRelatedTablets, type TabletDetailProduct } from "@/data/rugged-tablet-products";

/* ── Related Card ── */
const RelatedCard = ({ product, onQuote }: { product: TabletDetailProduct; onQuote: (n: string) => void }) => (
  <Link to={`/rugged-tablet/${product.id}`} className="card-surface overflow-hidden group hover:border-primary/30 transition-all">
    <div className="bg-secondary/30 p-4 flex items-center justify-center h-48">
      <img src={product.image} alt={product.model} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground text-sm">{product.model}</h3>
        <Badge variant="secondary" className="text-xs">{product.screenSize}</Badge>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{product.nameTH}</p>
      <div className="flex flex-wrap gap-1">
        {product.badges.slice(0, 3).map((b) => (
          <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
        ))}
      </div>
      {product.price && <p className="text-sm font-bold text-primary">{product.price}</p>}
      <Button size="sm" className="w-full mt-2" onClick={(e) => { e.preventDefault(); onQuote(product.model); }}>
        <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอราคา
      </Button>
    </div>
  </Link>
);

/* ── Gallery ── */
const Gallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-3">
      <div className="card-surface bg-secondary/20 p-6 flex items-center justify-center min-h-[320px]">
        <img src={images[active]} alt={`${alt} - ${active + 1}`} className="max-h-[300px] max-w-full object-contain" loading="lazy" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${i === active ? "border-primary" : "border-border hover:border-primary/50"}`}>
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Tab Content ── */
type TabId = "overview" | "specs" | "warranty";

const OverviewTab = ({ product }: { product: TabletDetailProduct }) => (
  <div className="space-y-10">
    {product.overviewSections.map((sec, i) => (
      <div key={i} className={`grid grid-cols-1 ${sec.image ? "md:grid-cols-2" : ""} gap-6 items-center`}>
        {sec.image && i % 2 === 0 && (
          <div className="card-surface bg-secondary/20 p-4 flex items-center justify-center">
            <img src={sec.image} alt={sec.titleTH} className="max-h-64 max-w-full object-contain rounded-lg" loading="lazy" />
          </div>
        )}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground text-lg">{sec.titleTH}</h3>
          {sec.titleEN && <p className="text-xs text-muted-foreground">{sec.titleEN}</p>}
          <p className="text-sm text-muted-foreground leading-relaxed">{sec.descTH}</p>
          {sec.stats && (
            <div className="flex flex-wrap gap-3 pt-2">
              {sec.stats.map((s) => (
                <div key={s.label} className="bg-secondary/50 rounded-lg px-3 py-2 text-center">
                  <p className="font-bold text-primary text-sm">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {sec.bullets && (
            <ul className="space-y-1 pt-2">
              {sec.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3 text-primary shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        {sec.image && i % 2 !== 0 && (
          <div className="card-surface bg-secondary/20 p-4 flex items-center justify-center">
            <img src={sec.image} alt={sec.titleTH} className="max-h-64 max-w-full object-contain rounded-lg" loading="lazy" />
          </div>
        )}
      </div>
    ))}
    {/* Applications */}
    {product.applications.length > 0 && (
      <div>
        <h3 className="font-display font-bold text-foreground text-lg mb-3">เหมาะสำหรับ</h3>
        <div className="flex flex-wrap gap-2">
          {product.applications.map((a) => (
            <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
          ))}
        </div>
      </div>
    )}
    {/* Accessories */}
    {product.accessories && product.accessories.length > 0 && (
      <div>
        <h3 className="font-display font-bold text-foreground text-lg mb-4">อุปกรณ์เสริม</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {product.accessories.map((acc) => (
            <div key={acc.nameEN} className="card-surface p-3 text-center">
              {acc.image && <img src={acc.image} alt={acc.name} className="w-full h-24 object-contain mb-2" loading="lazy" />}
              <p className="text-xs font-bold text-foreground">{acc.name}</p>
              <p className="text-[10px] text-muted-foreground">{acc.nameEN}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{acc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const SpecsTab = ({ product }: { product: TabletDetailProduct }) => (
  <div className="space-y-6">
    {product.specGroups.map((group) => (
      <div key={group.groupName} className="card-surface overflow-hidden">
        <div className="bg-primary/10 px-4 py-2">
          <h4 className="font-bold text-primary text-sm">{group.groupName}</h4>
        </div>
        <Table>
          <TableBody>
            {group.items.map((item) => (
              <TableRow key={item.label}>
                <TableCell className="font-medium text-foreground text-xs w-1/3">{item.label}</TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-pre-line">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ))}
  </div>
);

const WarrantyTab = () => (
  <div className="space-y-6">
    {[
      { title: "รับประกัน 1 ปี", desc: "รับประกันสินค้า 1 ปีเต็ม ครอบคลุมความเสียหายจากการผลิต พร้อมบริการหลังการขายจากทีมผู้เชี่ยวชาญ" },
      { title: "จัดส่งทั่วไทย", desc: "จัดส่งทั่วประเทศไทย เช็คสต๊อกทุกครั้งกับพนักงานขาย ค่าขนส่งตามจริง" },
      { title: "สนับสนุนทางเทคนิค", desc: "ทีมวิศวกรพร้อมให้คำปรึกษาด้านเทคนิค การติดตั้ง และการใช้งานตลอดอายุสินค้า ทั้งทางโทรศัพท์ อีเมล และ Line" },
      { title: "อะไหล่และซ่อมบำรุง", desc: "บริการอะไหล่แท้จากโรงงาน พร้อมศูนย์ซ่อมบำรุงในประเทศไทย" },
    ].map((item) => (
      <div key={item.title} className="card-surface p-5">
        <h4 className="font-display font-bold text-foreground mb-2">{item.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
      </div>
    ))}
    <div className="card-surface p-5 bg-primary/5 border-primary/20">
      <h4 className="font-display font-bold text-foreground mb-2">เงื่อนไขการรับประกัน</h4>
      <ul className="space-y-1 text-sm text-muted-foreground">
        <li>• ครอบคลุมความเสียหายจากการผลิตเท่านั้น</li>
        <li>• ไม่ครอบคลุมความเสียหายจากการใช้งานผิดวิธี อุบัติเหตุ หรือภัยธรรมชาติ</li>
        <li>• ต้องแสดงหลักฐานการซื้อเพื่อรับบริการรับประกัน</li>
        <li>• สินค้าที่ถูกดัดแปลงหรือซ่อมโดยบุคคลภายนอกจะสิ้นสุดการรับประกัน</li>
      </ul>
    </div>
  </div>
);

/* ═══════ Main Component ═══════ */
const RuggedTabletDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);

  const product = getTabletProduct(id || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold text-foreground">ไม่พบสินค้า</h1>
          <Button asChild><Link to="/rugged-tablet"><ArrowLeft className="w-4 h-4 mr-2" /> กลับไปหน้า Rugged Tablet</Link></Button>
        </div>
      </div>
    );
  }

  const related = getRelatedTablets(product.id);
  const tabs: { id: TabId; label: string; labelEN: string }[] = [
    { id: "overview", label: "ภาพรวม", labelEN: "Overview" },
    { id: "specs", label: "สเปค", labelEN: "Specifications" },
    { id: "warranty", label: "การรับประกัน", labelEN: "Warranty" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={`${product.model} — ${product.name}`} description={`${product.nameTH} — ${product.keyFeatures.slice(0, 3).join(", ")}`} path={`/rugged-tablet/${product.id}`} />
      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "Rugged Tablet", path: "/rugged-tablet" }, { name: product.model, path: `/rugged-tablet/${product.id}` }]} />
      <ProductJsonLd collectionName={product.name} collectionDescription={product.nameTH} collectionUrl={`/rugged-tablet/${product.id}`} products={[{ name: product.name, price: product.price, category: "Rugged Tablet" }]} />

      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/30 to-background">
        <div className="container max-w-7xl mx-auto px-4 pt-4 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">หน้าหลัก</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/rugged-tablet" className="hover:text-primary transition-colors">Rugged Tablet</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{product.model}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <div className="relative">
              <WishlistHeart
                item={{ id: product.id, name: product.name, category: "Rugged Tablet", image: product.image, href: `/rugged-tablet/${product.id}`, specs: product.keyFeatures[0] }}
                className="absolute top-4 right-4 z-10"
              />
              <Gallery images={product.gallery} alt={product.model} />
            </div>

            {/* Info */}
            <div className="space-y-5">
              <div>
                <Badge className={`mb-2 text-[10px] ${product.os === "Windows" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-green-500/20 text-green-400 border-green-500/30"}`}>
                  {product.os} Series
                </Badge>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">{product.model}</h1>
                <p className="text-muted-foreground mt-1">{product.nameTH}</p>
              </div>

              {product.price && (
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              )}
              {!product.price && (
                <p className="text-sm text-muted-foreground">สอบถามราคา</p>
              )}
              <p className="text-xs text-muted-foreground">จัดส่ง: {product.delivery}</p>

              {/* Key Features */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">จุดเด่นสินค้า</h3>
                <ul className="space-y-1">
                  {product.keyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-primary shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-2">
                {product.quickSpecs.map((qs) => (
                  <div key={qs.label} className="bg-secondary/50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">{qs.label}</p>
                    <p className="text-xs font-bold text-foreground">{qs.value}</p>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                {product.badges.map((b) => (
                  <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-2">
                <Button className="flex-1" onClick={() => setQuoteProduct(product.model)}>
                  <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">ติดต่อเรา</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                }`}
              >
                {tab.label} / {tab.labelEN}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container max-w-7xl mx-auto px-4 py-10">
        {activeTab === "overview" && <OverviewTab product={product} />}
        {activeTab === "specs" && <SpecsTab product={product} />}
        {activeTab === "warranty" && <WarrantyTab />}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="container max-w-7xl mx-auto px-4 pb-10">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            สินค้าที่เกี่ยวข้อง — <span className="text-gradient">{product.os}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((r) => (
              <RelatedCard key={r.id} product={r} onQuote={setQuoteProduct} />
            ))}
          </div>
        </div>
      )}

      <QuoteDialog open={!!quoteProduct} onClose={() => setQuoteProduct(null)} productName={quoteProduct || ""} productCategory="Rugged Tablet" />
      <FooterCompact />
    </div>
  );
};

export default RuggedTabletDetail;
