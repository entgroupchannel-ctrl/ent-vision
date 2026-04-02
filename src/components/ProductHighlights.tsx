import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    name: "GT Series",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
    href: "/gt-series",
    internal: true,
  },
  {
    name: "EPC Box Series",
    image: "https://static.wixstatic.com/media/0597a3_47b98b7d2cc34a1da2b4e89e4499834d~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_23_10.png",
    href: "/epc-box-series",
    internal: true,
  },
  {
    name: "GK Series",
    image: "https://static.wixstatic.com/media/0597a3_8e53a2e85b9f42088834c613e1a9d08f~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_25_08.png",
    href: "/gk-series",
    internal: true,
  },
  {
    name: "Mini PC",
    image: "https://static.wixstatic.com/media/0597a3_b9bf3c2c39ee4be6b009dd7b958fa43c~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_28_07.png",
    href: "/mini-pc",
    internal: true,
  },
  {
    name: "Waterproof PC",
    image: "https://static.wixstatic.com/media/0597a3_f28d1e4ae8534b4cbfe3a67e522ee979~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_40_50.png",
    href: "/waterproof-pc",
    internal: true,
  },
  {
    name: "Volktek",
    image: "https://static.wixstatic.com/media/0597a3_756a4a09e31d4b6d85eb8da1da91f781~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_39_10.png",
    href: "/volktek",
    internal: true,
  },
  {
    name: "Rugged Tablet",
    image: "https://static.wixstatic.com/media/0597a3_1f3ca942da0a4a3d834c5e7e2cf03b7a~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_36_56.png",
    href: "/rugged-tablet",
    internal: true,
  },
  {
    name: "EPC Panel PC",
    image: "https://static.wixstatic.com/media/0597a3_12c253dfc8264f7bb7dce7ca19d03195~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_33_45.png",
    href: "/epc-series",
    internal: true,
  },
];

const ProductHighlights = () => {
  return (
    <section className="section-padding" id="products">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Product Highlight</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            สินค้า<span className="text-gradient">แนะนำ</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item) => {
            const className = "group card-surface p-4 flex flex-col items-center text-center hover:border-primary/30 transition-all hover:-translate-y-1";
            const content = (
              <>
                <div className="w-full aspect-square flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-secondary/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </>
            );

            if ((item as any).internal) {
              return (
                <Link key={item.name} to={item.href} className={className}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
