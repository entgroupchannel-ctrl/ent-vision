import { BarChart3, Search } from "lucide-react";
import { Link } from "react-router-dom";

const gtModels = [
  { name: "GT1000", href: "/gt-series" },
  { name: "GT1200 / GT1400", href: "/gt-series", badge: "ราคาใหม่!" },
  { name: "GT2000", href: "/gt-series" },
  { name: "GT3000", href: "/gt-series" },
  { name: "GT4000", href: "/gt-series" },
  { name: "GT4500", href: "/gt-series" },
  { name: "GT5000", href: "/gt-series" },
  { name: "GT6000", href: "/gt-series" },
  { name: "GT7000", href: "/gt-series" },
  { name: "GT8000", href: "/gt-series" },
  { name: "GT9000", href: "/gt-series" },
];

const panelPCModels = [
  { name: "FPM - Touch Monitor", href: "/panel-pc-gtg" },
  { name: "UTC Series", href: "/utc-series" },
  { name: "GTP Series", href: "/panel-pc-gtg" },
  { name: "GK Series", href: "/gk-series" },
  { name: "GTC Series", href: "/panel-pc-gtg" },
  { name: "SPC Series", href: "/panel-pc-gtg" },
];

const ProductLineup = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-surface/50">
      <div className="container max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2 block">
            Product Finder
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold">
            เลือกรุ่น<span className="text-gradient">ที่ใช่</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            เปรียบเทียบสเปก เลือกรุ่นที่เหมาะกับงาน พร้อมเครื่องมือช่วยตัดสินใจ
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* GT Series Card */}
          <div className="card-surface rounded-xl overflow-hidden">
            {/* Compact banner */}
            <div className="relative h-36 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/3e5003_9a0970ee1f4f4d9aa2f4f3fef18faeb5~mv2.jpg/v1/fill/w_1261,h_459,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%A3%E0%B8%A7%E0%B8%A1%20gt.jpg"
                alt="GT Series Mini PC"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-3 left-4 z-10">
                <h3 className="text-lg font-display font-bold text-foreground">GT Series — Mini PC</h3>
                <p className="text-xs text-muted-foreground">Fanless Industrial Computer · {gtModels.length} รุ่น</p>
              </div>
            </div>

            <div className="p-4">
              {/* Feature CTAs */}
              <div className="flex gap-2 mb-3">
                <Link
                  to="/gt-series"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                >
                  <BarChart3 size={13} /> เปรียบเทียบรุ่น
                </Link>
                <Link
                  to="/gt-series"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors"
                >
                  <Search size={13} /> ช่วยเลือกรุ่น
                </Link>
              </div>

              {/* Model chips */}
              <div className="flex flex-wrap gap-1.5">
                {gtModels.map((model) => (
                  <a
                    key={model.name}
                    href={model.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    {model.name}
                    {model.badge && (
                      <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground leading-none">
                        {model.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Panel PC Card */}
          <div className="card-surface rounded-xl overflow-hidden">
            {/* Compact banner */}
            <div className="relative h-36 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/005637_ce8c0dbc2e5d4e2aa93e465ddb8d4dbe~mv2.jpg/v1/crop/x_0,y_3,w_1997,h_710/fill/w_1261,h_451,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%A3%E0%B8%A7%E0%B8%A1%20Panel%20PC.jpg"
                alt="Panel PC Series"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-3 left-4 z-10">
                <h3 className="text-lg font-display font-bold text-foreground">Panel PC Series</h3>
                <p className="text-xs text-muted-foreground">Industrial Touch Panel · {panelPCModels.length} ซีรีส์</p>
              </div>
            </div>

            <div className="p-4">
              {/* Feature CTAs */}
              <div className="flex gap-2 mb-3">
                <Link
                  to="/panel-pc-gtg"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                >
                  <BarChart3 size={13} /> เปรียบเทียบซีรีส์
                </Link>
                <Link
                  to="/utc-series"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors"
                >
                  <Search size={13} /> ดู UTC Series
                </Link>
              </div>

              {/* Model chips */}
              <div className="flex flex-wrap gap-1.5">
                {panelPCModels.map((model) => (
                  <a
                    key={model.name}
                    href={model.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    {model.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLineup;
