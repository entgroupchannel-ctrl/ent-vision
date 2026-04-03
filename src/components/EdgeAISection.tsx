import { ExternalLink } from "lucide-react";

const ThaiLinePattern = () => (
  <svg
    className="absolute inset-0 w-full h-full text-primary pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.15 }}
  >
    <defs>
      <pattern id="thai-line" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        {/* ลายประจำยาม — interlocking curves */}
        <path
          d="M60 0 Q75 15, 60 30 Q45 15, 60 0Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M60 30 Q75 45, 60 60 Q45 45, 60 30Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M60 60 Q75 75, 60 90 Q45 75, 60 60Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M60 90 Q75 105, 60 120 Q45 105, 60 90Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        {/* Horizontal leaf curves */}
        <path
          d="M0 60 Q15 45, 30 60 Q15 75, 0 60Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M30 60 Q45 45, 60 60 Q45 75, 30 60Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M60 60 Q75 45, 90 60 Q75 75, 60 60Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        <path
          d="M90 60 Q105 45, 120 60 Q105 75, 90 60Z"
          fill="none" stroke="currentColor" strokeWidth="0.8"
        />
        {/* Diagonal graceful S-curves — กนกเปลว */}
        <path
          d="M0 0 C10 10, 20 5, 30 15 S50 25, 60 15"
          fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"
        />
        <path
          d="M60 60 C70 70, 80 65, 90 75 S110 85, 120 75"
          fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"
        />
        <path
          d="M120 0 C110 10, 100 5, 90 15 S70 25, 60 15"
          fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"
        />
        <path
          d="M60 60 C50 70, 40 65, 30 75 S10 85, 0 75"
          fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"
        />
        {/* Small petal at center */}
        <circle cx="60" cy="60" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="60" cy="60" r="1" fill="currentColor" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#thai-line)" />
  </svg>
);

const EdgeAISection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="edge-ai">
      <ThaiLinePattern />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-[hsl(40,55%,55%)]/[0.03] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
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
