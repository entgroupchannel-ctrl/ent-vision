import { ExternalLink } from "lucide-react";

const sections = [
  {
    title: "หน้าจอสัมผัสและคีออสก์",
    description: "เราเป็นผู้ผลิตและซัพพลายเออร์หน้าจอสัมผัสและคีออสก์แบบสัมผัสคาปาซิทีฟ เรานำโซลูชันหน้าจอสัมผัสเพื่อปรับปรุงประสิทธิภาพการดำเนินงาน ให้ประสบการณ์ของลูกค้า รวมถึงความพึงพอใจในการใช้ชีวิตของผู้คน",
    image: "https://static.wixstatic.com/media/0597a3_5453527d666d4a7a82b7cb8d89360b84~mv2.png/v1/fill/w_1253,h_452,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-29%20at%2014_11_01.png",
    links: [
      { label: "EPC Series", href: "https://www.entgroup.co.th/epc-series" },
      { label: "EPC Box Series", href: "https://www.entgroup.co.th/epcboxseries" },
      { label: "Touch Work", href: "https://www.entgroup.co.th/touchwork" },
    ],
  },
  {
    title: "จอภาพติดตั้งภายนอกอาคาร",
    description: "จอภาพสำหรับการติดตั้งภายนอกอาคาร ชนิดความสว่างสูง ทนต่อสภาพการใช้งานที่รุนแรง เช่น ฝุ่นละออง อากาศเย็นและอากาศร้อน ผู้ผลิตจะออกแบบกล่องสำหรับบรรจุตัวเครื่องเพื่อเสนอก่อนผลิต ทดสอบการป้องกันน้ำ ความเย็น ความร้อน จากโรงงานผู้ผลิต รับประกันสินค้า 1 ปี",
    image: "https://static.wixstatic.com/media/0597a3_b235aa9ba0be42bdb1ab4b8064dc9183~mv2.png/v1/fill/w_1247,h_455,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-11-05%20at%2011_06_39.png",
    links: [{ label: "ข้อมูลเพิ่มเติม", href: "https://www.entgroup.co.th/smartdisplay" }],
  },
  {
    title: "Waterproof PC",
    description: "",
    image: "https://static.wixstatic.com/media/0597a3_957aaea5b8ae466e81b39ce9792a3f66~mv2.png/v1/fill/w_1242,h_455,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-11-05%20at%2011_17_08.png",
    links: [{ label: "ข้อมูลเพิ่มเติม", href: "https://www.entgroup.co.th/wp-pc" }],
  },
  {
    title: "Rugged Devices",
    description: "",
    image: "https://static.wixstatic.com/media/0597a3_1fb35f4acfc247a4b87385bbc7414fd9~mv2.png/v1/fill/w_1254,h_459,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-11-05%20at%2011_31_49.png",
    links: [{ label: "ข้อมูลเพิ่มเติม", href: "https://www.entgroup.co.th/rugged" }],
  },
  {
    title: "Volktek Industrial Switch",
    description: "",
    image: "https://static.wixstatic.com/media/0597a3_99a9b12f4cef439f9d5ac74bd3e7d647~mv2.png/v1/fill/w_1254,h_459,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-11-05%20at%2011_38_57.png",
    links: [{ label: "ข้อมูลเพิ่มเติม", href: "https://www.entgroup.co.th/volktek" }],
  },
];

const ProductSections = () => {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto space-y-12">
        {sections.map((section, i) => (
          <div key={section.title} className="card-surface overflow-hidden">
            <div className="relative">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">{section.title}</h3>
              {section.description && (
                <p className="text-muted-foreground text-sm md:text-base mb-4 max-w-3xl">{section.description}</p>
              )}
              <div className="flex flex-wrap gap-3">
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-surface-hover hover:border-primary/30 transition-all"
                  >
                    {link.label} <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSections;
