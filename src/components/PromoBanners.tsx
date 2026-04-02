import { ExternalLink } from "lucide-react";

const bannerLinks = [
  {
    image: "https://static.wixstatic.com/media/0597a3_bba6f36ac07b4a7bac516546032aba6c~mv2.png/v1/fill/w_555,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-15%20at%2017_14_13.png",
    href: "https://www.entgroup.co.th/wp-pc",
    alt: "Waterproof PC",
  },
  {
    image: "https://static.wixstatic.com/media/0597a3_f3214cd9900b491e907ede50aa85dfea~mv2.png/v1/fill/w_506,h_194,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-15%20at%2017_24_07.png",
    href: "https://www.entgroup.co.th/newgenfirewall",
    alt: "New Gen Firewall",
  },
  {
    image: "https://static.wixstatic.com/media/0597a3_7f24aee4b923403b9b441f4b4a993317~mv2.png/v1/fill/w_555,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-01%20at%2021_21_01.png",
    href: "https://www.entgroup.co.th/kseries2025",
    alt: "K Series",
  },
  {
    image: "https://static.wixstatic.com/media/0597a3_6e34ac062104498984b585a310a8690d~mv2.png/v1/fill/w_382,h_170,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2023_24_21.png",
    href: "https://www.entgroup.co.th/gb-serie",
    alt: "GB Series",
  },
];

const PromoBanners = () => {
  return (
    <section className="section-padding" id="promotions">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Promotions</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            โปรโมชั่น<span className="text-gradient">พิเศษ</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8">
          {bannerLinks.map((banner) => (
            <a
              key={banner.alt}
              href={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface overflow-hidden group hover:border-primary/30 transition-all"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        {/* Promo images */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_7f7a40a025494408b070e78388f4d3a5~mv2.png/v1/fill/w_460,h_418,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_7f7a40a025494408b070e78388f4d3a5~mv2.png"
              alt="โปรโมชั่น 1"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_ed86c9eaeabe4e7e87b7496871572893~mv2.png/v1/fill/w_460,h_418,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_ed86c9eaeabe4e7e87b7496871572893~mv2.png"
              alt="โปรโมชั่น 2"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://www.entgroup.co.th/promotions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            ดูโปรโมชั่นเพิ่มเติม <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
