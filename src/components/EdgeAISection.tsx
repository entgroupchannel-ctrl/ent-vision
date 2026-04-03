import { ExternalLink } from "lucide-react";

const ThaiPatternBg = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 800 600"
  >
    <defs>
      <pattern id="thai-lai" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        {/* Kranok (กระหนก) — Thai flame motif */}
        <path
          d="M40 8 C44 14, 50 16, 52 24 C54 32, 48 36, 40 40 C32 36, 26 32, 28 24 C30 16, 36 14, 40 8Z"
          fill="currentColor"
        />
        <path
          d="M40 40 C44 46, 50 48, 52 56 C54 64, 48 68, 40 72 C32 68, 26 64, 28 56 C30 48, 36 46, 40 40Z"
          fill="currentColor"
        />
        {/* Small diamond accents */}
        <path d="M12 40 L20 36 L28 40 L20 44Z" fill="currentColor" opacity="0.5" />
        <path d="M52 40 L60 36 L68 40 L60 44Z" fill="currentColor" opacity="0.5" />
        {/* Corner petals */}
        <circle cx="0" cy="0" r="6" fill="currentColor" opacity="0.3" />
        <circle cx="80" cy="0" r="6" fill="currentColor" opacity="0.3" />
        <circle cx="0" cy="80" r="6" fill="currentColor" opacity="0.3" />
        <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.3" />
        {/* Connecting lines */}
        <line x1="20" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="60" y1="0" x2="60" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#thai-lai)" />
  </svg>
);

const EdgeAISection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="edge-ai">
      {/* Thai pattern background */}
      <ThaiPatternBg />
      {/* Subtle gold-teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-[hsl(40,60%,50%)]/[0.04] pointer-events-none" />

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
