import { ExternalLink } from "lucide-react";
import kioskBanner from "@/assets/kiosk-banner.jpg";

const productBanners = [
  {
    title: "Panel PC จอสัมผัสอุตสาหกรรม",
    image: "https://static.wixstatic.com/media/0597a3_9be85d6ea85c4eecad1fb95ad76b7414~mv2.png/v1/fill/w_578,h_449,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202569-03-31%20at%2021_53_08.png",
    productImage: "https://static.wixstatic.com/media/0597a3_f2ee4bdde8a64cbc970eb9f33c141b3d~mv2.png/v1/fill/w_413,h_449,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GTY150%20(4).png",
    links: [
      { label: "ดูราคาสินค้า", href: "https://gty-gtg-panelpc.lovable.app/#pricing" },
      { label: "ดูรุ่นทั้งหมด", href: "https://gty-gtg-panelpc.lovable.app/#models" },
    ],
  },
  {
    title: "Rugged Devices ทนทานทุกสภาพ",
    image: "https://entgroup-rugged.com/assets/f7g-DiEQ_Pjf.png",
    productImage: "https://entgroup-rugged.com/assets/f9a-_j8J-x2I.jpg",
    links: [
      { label: "ดูเว็บไซต์", href: "https://entgroup-rugged.com/" },
      { label: "ดูรุ่นทั้งหมด", href: "https://entgroup-rugged.com/products" },
    ],
  },
  {
    title: "คอมพิวเตอร์อุตสาหกรรม งานประมูล งานโครงการ",
    image: "https://rugged-ipc.lovable.app/assets/ibox-007-main-BOyAzQqp.png",
    productImage: "https://rugged-ipc.lovable.app/assets/ibox-601-gt-pro-main-DGne0Wqp.png",
    hot: true,
    links: [
      { label: "ดูสินค้าทั้งหมด", href: "https://rugged-ipc.lovable.app/products" },
      { label: "ขอใบเสนอราคา", href: "https://rugged-ipc.lovable.app/rfq" },
    ],
  },
  {
    title: "ตู้ KIOSK สำเร็จรูป พร้อม Windows 11",
    subtitle: "ทุกคนเป็นเจ้าของได้ — ประหยัดกว่าตลาด 15-30%",
    image: kioskBanner,
    productImage: "",
    fullBackground: true,
    links: [
      { label: "ดู KIOSK ทั้งหมด", href: "/smart-display?tab=kiosk" },
      { label: "ดูจอ Smart Display", href: "/smart-display" },
    ],
  },
];

const ProductBanners = () => {
  return (
    <section className="section-padding bg-surface/50">
      <div className="container max-w-7xl mx-auto space-y-8">
        {productBanners.map((banner, i) =>
          banner.fullBackground ? (
            <div
              key={banner.title}
              className="card-surface overflow-hidden relative rounded-2xl min-h-[320px] flex items-center"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10 p-8 md:p-12 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">
                  {banner.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {banner.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white text-sm font-semibold transition-all hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
                    >
                      {link.label} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={banner.title}
              className={`card-surface overflow-hidden grid md:grid-cols-2 gap-0 ${i % 2 === 1 ? "md:[direction:rtl]" : ""} ${banner.hot ? "ring-2 ring-primary/30 shadow-lg shadow-primary/5" : ""}`}
            >
              <div className="p-8 md:p-12 flex flex-col justify-center md:[direction:ltr]">
                <div className="flex items-center gap-3 mb-4">
                  {banner.hot && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider animate-pulse">
                      🔥 Hot
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground">
                  {banner.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {banner.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                        banner.hot
                          ? "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                          : "border-border text-foreground hover:bg-surface-hover hover:border-primary/30"
                      }`}
                    >
                      {link.label} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
              <div className={`relative p-6 flex items-center justify-center md:[direction:ltr] ${banner.hot ? "bg-gradient-to-br from-primary/5 via-secondary/30 to-primary/10" : "bg-secondary/30"}`}>
                {banner.hot && banner.image && (
                  <img
                    src={banner.image}
                    alt=""
                    className="absolute left-4 bottom-4 max-h-36 object-contain opacity-60 blur-[0.5px]"
                    loading="lazy"
                  />
                )}
                <img
                  src={banner.productImage || banner.image}
                  alt={banner.title}
                  className={`relative z-10 max-w-full object-contain drop-shadow-xl ${banner.hot ? "max-h-72 hover:scale-105 transition-transform duration-500" : "max-h-64"}`}
                  loading="lazy"
                />
                {banner.hot && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                    นำเข้าจากโรงงานโดยตรง
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ProductBanners;
