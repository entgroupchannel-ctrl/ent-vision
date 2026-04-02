import { ExternalLink } from "lucide-react";

const gtModels = [
  { name: "GT1000", href: "https://www.entgroup.co.th/ipc-gt1000" },
  { name: "GT1200 / GT1400", href: "https://www.entgroup.co.th/gt-series-2023", badge: "ราคาใหม่!" },
  { name: "GT2000", href: "https://www.entgroup.co.th/mini-pc-gt2000" },
  { name: "GT3000", href: "https://www.entgroup.co.th/mini-pc-3000" },
  { name: "GT4000", href: "https://www.entgroup.co.th/minipc-gt4000" },
  { name: "GT4500", href: "https://www.entgroup.co.th/ipc-gt4500" },
  { name: "GT5000", href: "https://www.entgroup.co.th/gt5000" },
  { name: "GT6000", href: "https://www.entgroup.co.th/gt6000" },
  { name: "GT7000", href: "https://www.entgroup.co.th/ipc-gt7000" },
  { name: "GT8000", href: "https://www.entgroup.co.th/gt8000" },
  { name: "GT9000", href: "https://www.entgroup.co.th/gt9000" },
];

const panelPCModels = [
  { name: "FPM - Touch Monitor", href: "https://www.entgroup.co.th/industrial-touch-monitor" },
  { name: "UTC Series", href: "https://www.entgroup.co.th/utc-series" },
  { name: "GTP Series", href: "https://www.entgroup.co.th/gtp-series" },
  { name: "GK Series", href: "https://www.entgroup.co.th/gk-series" },
  { name: "GTC Series", href: "https://www.entgroup.co.th/gtc-series" },
  { name: "SPC Series", href: "https://www.entgroup.co.th/spc-series" },
];

const ProductLineup = () => {
  return (
    <section className="section-padding bg-surface/50">
      <div className="container max-w-7xl mx-auto space-y-16">
        {/* GT Series */}
        <div>
          <div className="card-surface overflow-hidden mb-6">
            <img
              src="https://static.wixstatic.com/media/3e5003_9a0970ee1f4f4d9aa2f4f3fef18faeb5~mv2.jpg/v1/fill/w_1261,h_459,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%A3%E0%B8%A7%E0%B8%A1%20gt.jpg"
              alt="GT Series Mini PC"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">GT Series — Mini PC</h3>
          <div className="flex flex-wrap gap-2">
            {gtModels.map((model) => (
              <a
                key={model.name}
                href={model.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface-hover hover:border-primary/30 transition-all"
              >
                {model.name}
                {model.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">
                    {model.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Panel PC */}
        <div>
          <div className="card-surface overflow-hidden mb-6">
            <img
              src="https://static.wixstatic.com/media/005637_ce8c0dbc2e5d4e2aa93e465ddb8d4dbe~mv2.jpg/v1/crop/x_0,y_3,w_1997,h_710/fill/w_1261,h_451,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%A3%E0%B8%A7%E0%B8%A1%20Panel%20PC.jpg"
              alt="Panel PC Series"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">Panel PC Series</h3>
          <div className="flex flex-wrap gap-2">
            {panelPCModels.map((model) => (
              <a
                key={model.name}
                href={model.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface-hover hover:border-primary/30 transition-all"
              >
                {model.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLineup;
