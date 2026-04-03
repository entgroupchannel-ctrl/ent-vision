import { Link } from "react-router-dom";
import { Monitor, Cpu, TabletSmartphone, Wifi, Shield, LayoutGrid, Server } from "lucide-react";

const categories = [
  {
    title: "GT Series",
    subtitle: "Fanless Embedded Computer",
    description: "คอมพิวเตอร์อุตสาหกรรมไร้พัดลม ทนทาน แข็งแกร่ง",
    icon: Cpu,
    href: "/gt-series",
    models: ["GT1000", "GT1200", "GT1300", "GT4500", "GT7000", "GT9000"],
    badge: "Hot",
    image: "https://static.wixstatic.com/media/0597a3_f71510351a7e4552a201130b156e2cb9~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_16_40.png",
  },
  {
    title: "GB Series",
    subtitle: "Industrial Grade Computer",
    description: "4 รุ่น 4 สไตล์ ตอบโจทย์ทุกความต้องการอุตสาหกรรม",
    icon: Server,
    href: "/gb-series",
    models: ["GB1000", "GB2000", "GB4000", "GB5000"],
    badge: "New",
    image: "https://static.wixstatic.com/media/0597a3_84464f31e83d47a982b5ee3b559db400~mv2.png/v1/fill/w_496,h_496,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GB5000%20(1).png",
  },
  {
    title: "Panel PC",
    subtitle: "Industrial Touch Panel",
    description: "จอสัมผัสอุตสาหกรรม GTG/GTY Series",
    icon: Monitor,
    href: "/panel-pc-gtg",
    models: ["GTG Series", "Stainless Steel"],
    image: "https://static.wixstatic.com/media/0597a3_12c253dfc8264f7bb7dce7ca19d03195~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_33_45.png",
  },
  {
    title: "Smart Display",
    subtitle: "Digital Signage & Kiosk",
    description: "จอแสดงผลอุตสาหกรรม Indoor/Outdoor และตู้ Kiosk",
    icon: LayoutGrid,
    href: "/smart-display",
    models: ["Indoor", "Outdoor", "Kiosk"],
    badge: "New",
    image: "https://static.wixstatic.com/media/0597a3_756a4a09e31d4b6d85eb8da1da91f781~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_39_10.png",
  },
  {
    title: "Rugged Devices",
    subtitle: "Tablet & Notebook",
    description: "แท็บเล็ตและโน้ตบุ๊กเกรดทหาร กันน้ำ กันกระแทก",
    icon: TabletSmartphone,
    href: "/rugged-tablet",
    models: ["Tablet", "Notebook", "Handheld"],
    image: "https://static.wixstatic.com/media/0597a3_1f3ca942da0a4a3d834c5e7e2cf03b7a~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_36_56.png",
  },
  {
    title: "Volktek",
    subtitle: "Industrial Network Switch",
    description: "สวิตช์เครือข่ายอุตสาหกรรม Managed/Unmanaged",
    icon: Wifi,
    href: "/volktek",
    models: ["Managed", "Unmanaged", "PoE"],
    image: "https://static.wixstatic.com/media/0597a3_756a4a09e31d4b6d85eb8da1da91f781~mv2.png/v1/fill/w_211,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_39_10.png",
  },
  {
    title: "EPC & Mini PC",
    subtitle: "Compact Embedded System",
    description: "คอมพิวเตอร์ขนาดเล็ก EPC Box, GK Series, Mini PC",
    icon: Shield,
    href: "/epc-box-series",
    models: ["EPC Box", "GK Series", "Mini PC"],
    image: "https://static.wixstatic.com/media/0597a3_47b98b7d2cc34a1da2b4e89e4499834d~mv2.png/v1/fill/w_204,h_229,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-04%20at%2010_23_10.png",
  },
];

const ProductHighlights = () => {
  return (
    <section className="section-padding" id="products">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Product Categories
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            สินค้า<span className="text-gradient">แนะนำ</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            โซลูชันคอมพิวเตอร์อุตสาหกรรมครบวงจร ตอบโจทย์ทุกความต้องการ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              className="group relative card-surface rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {cat.badge && (
                <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  cat.badge === "Hot" 
                    ? "bg-destructive text-destructive-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}>
                  {cat.badge}
                </span>
              )}

              <div className="flex items-start gap-4 p-5">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <cat.icon className="text-primary" size={22} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-primary/70 font-medium">{cat.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.description}</p>
                </div>
              </div>

              {/* Product image + models strip */}
              <div className="px-5 pb-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-16 h-16 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {cat.models.map((model) => (
                      <span
                        key={model}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-background border border-border text-muted-foreground"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom action hint */}
              <div className="px-5 pb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="font-medium">ดูรายละเอียด →</span>
                  <span>{cat.models.length} หมวดหมู่</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
