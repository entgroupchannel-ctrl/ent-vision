import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Check, FileText, Thermometer, Cpu, HardDrive,
  Monitor, Usb, Network, Zap, Shield, Mail, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import SEOHead from "@/components/SEOHead";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import WishlistHeart from "@/components/WishlistHeart";
import { cn } from "@/lib/utils";
import { iboxProducts, type IBoxProduct } from "@/data/iboxProducts";

/* ═══════ Image Gallery Sub-component ═══════ */
const ProductGalleryView = ({ product }: { product: IBoxProduct }) => {
  const allImages = [
    { src: product.image, label: "สินค้า" },
    ...(product.gallery?.map((img, i) => ({ src: img, label: `มุมที่ ${i + 2}` })) || []),
    ...(product.dimensionImage ? [{ src: product.dimensionImage, label: "Dimension" }] : []),
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-b from-secondary/50 to-secondary/20 rounded-2xl overflow-hidden relative">
        {product.isNew && (
          <Badge className="absolute top-4 left-4 bg-emerald-500 text-white z-10">NEW</Badge>
        )}
        {product.isHot && (
          <Badge className="absolute top-4 left-20 bg-red-500 text-white z-10">🔥 HOT</Badge>
        )}
        <WishlistHeart
          item={{ id: product.id, name: product.name, category: "iBox Series", image: product.image, href: `/ibox-series/${product.id}`, specs: product.cpu }}
          className="absolute top-4 right-4 z-10"
        />
        <img
          src={allImages[selectedIndex].src}
          alt={`${product.name} - ${allImages[selectedIndex].label}`}
          className="w-full h-full object-contain p-8 transition-opacity duration-300"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="text-sm font-medium text-foreground">{allImages[selectedIndex].label}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="text-sm text-muted-foreground">{selectedIndex + 1} / {allImages.length}</span>
        </div>
      </div>

      {allImages.length > 1 && (
        <>
          <div className="px-12">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-2">
                {allImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/5">
                    <button
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "aspect-square w-full rounded-lg overflow-hidden border-2 transition-all duration-200",
                        selectedIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <img src={image.src} alt={`${product.name} - ${image.label}`} className="w-full h-full object-contain p-2 bg-secondary/30" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-10" />
              <CarouselNext className="-right-10" />
            </Carousel>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-full transition-all",
                  selectedIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {image.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2">
        {product.subcategory && <Badge variant="secondary">{product.subcategory}</Badge>}
        {product.poe && <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">PoE+ Support</Badge>}
        {product.pcie && <Badge variant="outline">PCIe Expansion</Badge>}
      </div>
    </div>
  );
};

/* ═══════ Main Page ═══════ */
const IBoxProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);

  const product = iboxProducts.find((p) => p.id === productId);

  // Related products: same category, different product
  const relatedProducts = product
    ? iboxProducts
        .filter((p) => p.id !== product.id && p.category.some(c => product.category.includes(c) && c !== "all"))
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบสินค้า</h1>
          <Button onClick={() => navigate("/ibox-series")}>กลับหน้า iBox Series</Button>
        </div>
      </div>
    );
  }

  const specItems = [
    { key: "cpu", label: "Processor", icon: Cpu },
    { key: "cpuGen", label: "CPU Generation", icon: Cpu },
    { key: "ram", label: "Memory (RAM)", icon: HardDrive },
    { key: "storage", label: "Storage", icon: HardDrive },
    { key: "io", label: "I/O Ports", icon: Usb },
    { key: "temp", label: "Operating Temperature", icon: Thermometer },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${product.name} — ${product.nameTH}`}
        description={`${product.name} ${product.cpu} ${product.ram} สำหรับ ${product.applications.join(", ")}`}
        path={`/ibox-series/${product.id}`}
      />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground">หน้าหลัก</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <Link to="/ibox-series" className="text-muted-foreground hover:text-foreground">iBox Series</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductGalleryView product={product} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-mono text-primary font-semibold mb-2">Model: {product.name}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.nameTH}</h1>
              {product.priceRange && (
                <p className="text-lg font-semibold text-primary">{product.priceRange}</p>
              )}
            </div>

            {/* Contact */}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">สอบถามราคา / สั่งซื้อ</p>
              <p className="text-base font-semibold text-foreground mb-3">กรุณาติดต่อพนักงานขาย</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href={`mailto:sales@entgroup.co.th?subject=สอบถามราคา ${product.name}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" /> sales@entgroup.co.th
                </a>
                <a href="tel:020456104" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  📞 02-045-6104
                </a>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">CPU</span>
                </div>
                <p className="text-sm font-medium">{product.cpu}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">RAM</span>
                </div>
                <p className="text-sm font-medium">{product.ram}</p>
              </div>
              {product.lanPorts && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Network className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">LAN</span>
                  </div>
                  <p className="text-sm font-medium">{product.lanPorts} Ports{product.poe ? " (PoE)" : ""}</p>
                </div>
              )}
              {product.comPorts && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Usb className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">COM</span>
                  </div>
                  <p className="text-sm font-medium">{product.comPorts} Ports</p>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> คุณสมบัติเด่น
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">การใช้งาน</h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <Badge key={app} variant="outline">{app}</Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
              <Button className="flex-1" size="lg" onClick={() => setQuoteProduct(product.name)}>
                <FileText className="w-5 h-5 mr-2" /> ขอใบเสนอราคา
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/contact")}>
                <Mail className="w-5 h-5 mr-2" /> ติดต่อเรา
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" /> ข้อมูลจำเพาะเต็มรูปแบบ
          </h2>
          <div className="card-surface overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-1/3 font-semibold">รายการ</TableHead>
                  <TableHead className="font-semibold">ข้อมูลจำเพาะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specItems.map(({ key, label, icon: Icon }) => {
                  const value = (product as any)[key];
                  if (!value) return null;
                  return (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary" />
                          {label}
                        </div>
                      </TableCell>
                      <TableCell>{String(value)}</TableCell>
                    </TableRow>
                  );
                })}
                {product.lanPorts && (
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-primary" /> LAN Ports
                      </div>
                    </TableCell>
                    <TableCell>{product.lanPorts} ports{product.poe ? " (PoE+ Support)" : ""}</TableCell>
                  </TableRow>
                )}
                {product.comPorts && (
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Usb className="w-4 h-4 text-primary" /> COM Ports
                      </div>
                    </TableCell>
                    <TableCell>{product.comPorts} ports</TableCell>
                  </TableRow>
                )}
                {product.usbPorts && (
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Usb className="w-4 h-4 text-primary" /> USB Ports
                      </div>
                    </TableCell>
                    <TableCell>{product.usbPorts} ports</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-6">สินค้าที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/ibox-series/${p.id}`}
                  className="card-surface overflow-hidden group hover:border-primary/30 transition-all"
                >
                  <div className="relative bg-secondary/30 p-4 flex items-center justify-center h-40">
                    {p.isHot && <Badge className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px]">🔥 HOT</Badge>}
                    {p.isNew && <Badge className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px]">✨ NEW</Badge>}
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" loading="lazy" />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-foreground text-sm">{p.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{p.nameTH}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{p.cpu}</p>
                    {p.priceRange && <p className="text-xs font-semibold text-primary">{p.priceRange}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <QuoteDialog open={!!quoteProduct} onClose={() => setQuoteProduct(null)} productName={quoteProduct || ""} productCategory="iBox Series" />
      <FooterCompact />
    </div>
  );
};

export default IBoxProductDetail;
