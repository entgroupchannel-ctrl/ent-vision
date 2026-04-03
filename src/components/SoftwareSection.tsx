import { ExternalLink } from "lucide-react";
import LineQRButton from "@/components/LineQRButton";
import SoftwareInquiryDialog from "@/components/SoftwareInquiryDialog";

const softwareExamples = [
  { label: "HRM", href: "https://entgroup-job.lovable.app/" },
  { label: "ERP", href: "https://entronics-flow.lovable.app/" },
  { label: "CRM", href: "https://ent-crm.lovable.app/" },
  { label: "Webapp", href: "https://www.entgroup.biz/" },
  { label: "Travel & Mobile App", href: "https://www.thailandgo.co/" },
  { label: "Workflow", href: "https://www.vichakarn.co/" },
  { label: "Online Shopping", href: "https://ent-shopper-industrial.lovable.app/" },
  { label: "Social Media", href: "https://thonburi.lovable.app/" },
  { label: "POS", href: "https://ent-posmate.lovable.app/" },
  { label: "ร้านอาหาร", href: "https://phimm.lovable.app/" },
];

const SoftwareSection = () => {
  return (
    <section className="section-padding bg-surface/50" id="services">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="card-surface p-2 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/0597a3_9e1fa56a9a7c40f9813a78e9e8b4edce~mv2.jpg/v1/fill/w_600,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/about-team-collaboration-BHxS3QL6.jpg"
                alt="ทีมพัฒนาซอฟต์แวร์"
                className="w-full rounded-lg"
                loading="lazy"
                width={600}
                height={450}
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">บริการใหม่ 2026</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              เป็นเจ้าของ{" "}
              <span className="text-gradient">ซอฟต์แวร์</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              พัฒนาซอฟต์แวร์ตามความต้องการของธุรกิจคุณ ด้วยทีมงานมืออาชีพ
            </p>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">ตัวอย่างผลงาน:</p>
              <div className="flex flex-wrap gap-2">
                {softwareExamples.map((ex) => (
                  <a
                    key={ex.label}
                    href={ex.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs border border-border hover:border-primary/30 hover:bg-surface-hover transition-all"
                  >
                    {ex.label} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <SoftwareInquiryDialog>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  สอบถามบริการซอฟต์แวร์
                </button>
              </SoftwareInquiryDialog>
              <LineQRButton
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
              >
                เพิ่มเพื่อนขอรายละเอียด
              </LineQRButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareSection;
