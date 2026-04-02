import { ExternalLink } from "lucide-react";

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
    title: "Industrial PC สำหรับโรงงาน",
    image: "https://static.wixstatic.com/media/0597a3_b165c663a83644b3bb1a42f6dc632939~mv2.png/v1/fill/w_600,h_259,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202569-03-31%20at%2022_23_51.png",
    productImage: "https://static.wixstatic.com/media/0597a3_9da395dc92f646e4a2f6c558d1b0976e~mv2.png/v1/fill/w_600,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202569-03-31%20at%2022_30_15.png",
    links: [
      { label: "ดูเว็บไซต์", href: "https://rugged-ipc.lovable.app/" },
      { label: "ดูรุ่นทั้งหมด", href: "https://rugged-ipc.lovable.app/products" },
    ],
  },
];

const ProductBanners = () => {
  return (
    <section className="section-padding bg-surface/50">
      <div className="container max-w-7xl mx-auto space-y-8">
        {productBanners.map((banner, i) => (
          <div
            key={banner.title}
            className={`card-surface overflow-hidden grid md:grid-cols-2 gap-0 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
          >
            <div className="p-8 md:p-12 flex flex-col justify-center md:[direction:ltr]">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-surface-hover hover:border-primary/30 transition-all"
                  >
                    {link.label} <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-secondary/30 p-6 flex items-center justify-center md:[direction:ltr]">
              <img
                src={banner.productImage || banner.image}
                alt={banner.title}
                className="max-w-full max-h-64 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductBanners;
