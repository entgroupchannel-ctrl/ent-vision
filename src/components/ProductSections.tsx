import { ExternalLink } from "lucide-react";
import outdoorDisplayBanner from "@/assets/outdoor-display-banner.jpg";
import waterproofPcBanner from "@/assets/waterproof-pc-banner.jpg";
import ruggedDevicesBanner from "@/assets/rugged-devices-banner.jpg";
import volktekBanner from "@/assets/volktek-banner.jpg";

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
    description: "วางกลางแดดกลางฝนได้สบาย — ออกแบบมาเพื่อสภาพอากาศเมืองไทยโดยเฉพาะ IP55 กันน้ำกันฝุ่น ความสว่างสูง 1,500-2,500 nits มองเห็นชัดแม้แดดจัด เริ่มต้น ฿69,000 รับประกัน 1 ปี",
    image: outdoorDisplayBanner,
    fullBackground: true,
    price: "เริ่มต้น ฿69,000",
    links: [{ label: "ดูรุ่นทั้งหมด", href: "/smart-display?tab=outdoor" }],
  },
  {
    title: "Waterproof Panel PC — สแตนเลส สำหรับไลน์ผลิตอาหาร",
    description: "ตัวเครื่องสแตนเลส IP65/IP69K ทำความสะอาดง่าย ทนน้ำ ทนสารเคมี ออกแบบมาสำหรับโรงงานอาหาร ห้องเย็น และสายการผลิตที่ต้องล้างทำความสะอาดบ่อย",
    image: waterproofPcBanner,
    fullBackground: true,
    links: [{ label: "ข้อมูลเพิ่มเติม", href: "https://www.entgroup.co.th/wp-pc" }],
  },
  {
    title: "Rugged Devices — ทนร้อน ทนกระแทก เกรดทหาร",
    description: "Tablet, Notebook และ Handheld สำหรับงานคลังสินค้า งานภาคสนาม สแกน QR/Barcode กันระเบิด MIL-STD-810G มีให้เลือกหลายรุ่น",
    image: ruggedDevicesBanner,
    fullBackground: true,
    links: [{ label: "ดูรุ่นทั้งหมด", href: "/rugged-tablet" }],
  },
  {
    title: "Volktek Industrial Switch — เครือข่ายโรงงานที่เชื่อถือได้",
    description: "Managed/Unmanaged Switch สำหรับงานอุตสาหกรรม DIN-Rail ทนอุณหภูมิสูง รองรับ PoE สำหรับกล้องวงจรปิดและอุปกรณ์ IoT",
    image: volktekBanner,
    fullBackground: true,
    links: [{ label: "ดูรุ่นทั้งหมด", href: "/volktek" }],
  },
];

const ProductSections = () => {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto space-y-12">
        {sections.map((section, i) =>
          section.fullBackground ? (
            <div key={section.title} className="card-surface overflow-hidden relative rounded-2xl min-h-[340px] flex items-end">
              <img
                src={section.image}
                alt={section.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 p-8 md:p-10 w-full">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{section.title}</h3>
                    {section.description && (
                      <p className="text-white/80 text-sm md:text-base mb-4">{section.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3">
                      {section.price && (
                        <span className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                          {section.price}
                        </span>
                      )}
                      {section.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white text-sm font-semibold hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all"
                        >
                          {link.label} <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
          )
        )}
      </div>
    </section>
  );
};

export default ProductSections;
