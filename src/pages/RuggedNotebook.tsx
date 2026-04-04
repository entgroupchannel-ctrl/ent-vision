import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Cpu, Monitor, Laptop, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ProductJsonLd from "@/components/ProductJsonLd";
import FooterCompact from "@/components/FooterCompact";
import PriceDisclaimer from "@/components/PriceDisclaimer";
import QuoteButton from "@/components/QuoteButton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ruggedNotebooks, type RuggedNotebook } from "@/data/rugged-notebook-products";

/* ───── Filter ───── */
type OsFilter = "all" | "Windows" | "Linux";

const stats = [
  { icon: Shield, value: "MIL-STD", label: "มาตรฐานทหาร" },
  { icon: Monitor, value: "10 รุ่น", label: "ให้เลือก" },
  { icon: Cpu, value: "Intel AI", label: "Ultra 5/7/i5/i7" },
  { icon: Sparkles, value: "IP65-IP67", label: "กันน้ำกันฝุ่น" },
];

const RuggedNotebookPage = () => {
  const [osFilter, setOsFilter] = useState<OsFilter>("all");

  const filtered = ruggedNotebooks.filter(
    (p) => osFilter === "all" || p.os === osFilter
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Rugged Notebook — โน้ตบุ๊กมาตรฐานทหาร MIL-STD"
        description="โน้ตบุ๊คทนทานเกรดทหาร MIL-STD-810G/H กันน้ำ IP65-IP67 Intel AI, Core i5/i7 สำหรับงานภาคสนาม โรงงาน โลจิสติกส์ จำหน่ายโดย ENT Group"
        path="/rugged-notebook"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "สินค้า", path: "/" },
          { name: "Rugged Notebook", path: "/rugged-notebook" },
        ]}
      />
      <ProductJsonLd
        products={ruggedNotebooks.map((p) => ({
          name: `${p.model} — ${p.title}`,
          price: p.priceStart?.replace(/[฿,]/g, "") || undefined,
          description: `${p.title} | ${p.protection}`,
          image: p.image,
          brand: "ENT Group",
          category: "Rugged Notebook",
        }))}
        collectionName="Rugged Notebook"
        collectionDescription="โน้ตบุ๊คทนทานเกรดทหาร MIL-STD กันน้ำ กันกระแทก"
        collectionUrl="/rugged-notebook"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground/95 via-foreground/85 to-foreground/95 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> หน้าแรก
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Laptop className="w-10 h-10 text-primary" />
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">MIL-STD-810G/H</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Rugged Notebook
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-8">
            โน้ตบุ๊กมาตรฐานทหาร ทนทานสุดขั้ว สำหรับงานภาคสนามและสภาพแวดล้อมที่ท้าทาย
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <s.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky Filter Tabs ─── */}
      <div className="sticky top-[57px] z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={osFilter} onValueChange={(v) => setOsFilter(v as OsFilter)}>
            <TabsList className="bg-transparent h-12 gap-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-5">
                ทั้งหมด ({ruggedNotebooks.length})
              </TabsTrigger>
              <TabsTrigger value="Windows" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-5">
                Windows ({ruggedNotebooks.filter((p) => p.os === "Windows").length})
              </TabsTrigger>
              <TabsTrigger value="Linux" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-5">
                Linux ({ruggedNotebooks.filter((p) => p.os === "Linux").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* ─── Product Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((nb) => (
            <NotebookCard key={nb.id} product={nb} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">ไม่พบสินค้าในหมวดนี้</p>
        )}
      </section>

      <PriceDisclaimer />
      <FooterCompact />
    </div>
  );
};

/* ───── Card ───── */
const NotebookCard = ({ product }: { product: RuggedNotebook }) => {
  const [selectedCfg, setSelectedCfg] = useState(0);
  const cfg = product.configs[selectedCfg];

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative bg-gradient-to-b from-muted/30 to-transparent p-6 flex items-center justify-center min-h-[200px]">
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px]">
          {product.os}
        </Badge>
        <img
          src={product.image}
          alt={product.model}
          className="max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-mono text-muted-foreground tracking-wider mb-1">{product.model}</p>
        <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2">{product.title}</h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.badges.map((b) => (
            <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/50 text-accent-foreground font-medium">{b}</span>
          ))}
        </div>

        {/* Specs mini */}
        <div className="text-xs text-muted-foreground space-y-1 mb-3">
          <p><span className="font-medium text-foreground">CPU:</span> {product.cpu}</p>
          <p><span className="font-medium text-foreground">Protection:</span> {product.protection}</p>
          <p><span className="font-medium text-foreground">Memory:</span> {product.memory}</p>
        </div>

        {/* Config selector */}
        {product.configs.length > 0 && (
          <div className="space-y-2 mb-3">
            <p className="text-xs font-semibold text-muted-foreground">เลือกคอนฟิก:</p>
            {product.configs.map((c, i) => (
              <button
                key={i}
                onClick={() => setSelectedCfg(i)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                  i === selectedCfg
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="font-bold">{c.label}</div>
                <div className="text-muted-foreground">{c.cpu}</div>
                <div className="text-muted-foreground">{c.ram}</div>
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <div>
            {cfg ? (
              <span className="text-lg font-extrabold text-primary">{cfg.price}</span>
            ) : (
              <span className="text-sm font-semibold text-muted-foreground">สอบถามราคา</span>
            )}
          </div>
          <QuoteButton productName={product.model} productCategory="Rugged Notebook" variant="compact" />
        </div>
      </div>
    </div>
  );
};

export default RuggedNotebookPage;
