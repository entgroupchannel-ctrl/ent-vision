import { ExternalLink } from "lucide-react";

const EdgeAISection = () => {
  return (
    <section className="section-padding" id="edge-ai">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">NVIDIA Jetson Partner</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              โซลูชัน Edge AI{" "}
              <span className="text-gradient">สำหรับประเทศไทย</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              อีเอ็นที กรุ๊ป พันธมิตรธุรกิจที่คุณไว้วางใจขอนำเสนอ โมดูล, ชุดพัฒนา และคอมพิวเตอร์อุตสาหกรรม — ขับเคลื่อนด้วยแพลตฟอร์ม NVIDIA Jetson
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://nvidia-jetson.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                ดูเว็บไซต์ <ExternalLink size={16} />
              </a>
              <a
                href="https://nvidia-jetson.com/products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
              >
                ดูสินค้าทั้งหมด
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="card-surface p-2 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/0597a3_7d5978c45ea74e10adbb64a435de3709~mv2.jpg/v1/fill/w_518,h_518,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/hero-ai-jetson-BVF_902O.jpg"
                alt="NVIDIA Jetson Edge AI"
                className="w-full rounded-lg"
                loading="lazy"
                width={518}
                height={518}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EdgeAISection;
