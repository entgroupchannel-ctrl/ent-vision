import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react";

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.35 8.35 0 0 0 4.76 1.49V6.75a4.79 4.79 0 0 1-1-.06z" />
  </svg>
);

const socials = [
  {
    icon: <Facebook size={20} />,
    label: "Facebook",
    href: "https://www.facebook.com/entgroup.co.th",
    bg: "bg-[#1877F2]",
  },
  {
    icon: <Instagram size={20} />,
    label: "Instagram",
    href: "https://www.instagram.com/entgroup.co.th",
    bg: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]",
  },
  {
    icon: <TiktokIcon />,
    label: "TikTok",
    href: "https://www.tiktok.com/@entgroup",
    bg: "bg-[#010101]",
  },
  {
    icon: <Youtube size={20} />,
    label: "YouTube",
    href: "https://www.youtube.com/@entgroup",
    bg: "bg-[#FF0000]",
  },
];

const SocialRibbon = () => {
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(showTimer);
  }, []);

  // Auto-collapse after 10s whenever expanded becomes true
  useEffect(() => {
    if (!visible || !expanded) return;
    timerRef.current = setTimeout(() => setExpanded(false), 10000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, expanded]);

  if (!visible) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      <div
        className={`flex flex-col gap-1 transition-all duration-500 ease-in-out ${
          expanded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-4 py-3 ${s.bg} text-white rounded-r-xl shadow-lg hover:pl-6 transition-all duration-200`}
          >
            <span className="shrink-0">{s.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{s.label}</span>
          </a>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center w-7 h-14 rounded-r-lg bg-primary text-primary-foreground shadow-md hover:w-8 transition-all duration-200"
        aria-label={expanded ? "ซ่อนเมนู" : "แสดงเมนู"}
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default SocialRibbon;
