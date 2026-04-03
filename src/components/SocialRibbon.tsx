import { useState, useEffect } from "react";
import { Phone, Mail, ChevronLeft, ChevronRight, Facebook } from "lucide-react";
import { LineSvgIcon, LINE_ADD_URL } from "./LineQRDialog";

const SocialRibbon = () => {
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible || !expanded) return;
    const collapseTimer = setTimeout(() => setExpanded(false), 10000);
    return () => clearTimeout(collapseTimer);
  }, [visible, expanded]);

  if (!visible) return null;

  const socials = [
    {
      icon: <LineSvgIcon className="w-5 h-5" />,
      label: "LINE @entgroup",
      href: LINE_ADD_URL,
      bg: "bg-[#06C755]",
      text: "text-white",
    },
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      href: "https://www.facebook.com/entgroup.co.th",
      bg: "bg-[#1877F2]",
      text: "text-white",
    },
    {
      icon: <Phone size={20} />,
      label: "02-026-3854",
      href: "tel:02-026-3854",
      bg: "bg-primary",
      text: "text-primary-foreground",
    },
    {
      icon: <Mail size={20} />,
      label: "info@entgroup.co.th",
      href: "mailto:info@entgroup.co.th",
      bg: "bg-accent",
      text: "text-accent-foreground",
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      {/* Ribbon items */}
      <div
        className={`flex flex-col gap-1 transition-all duration-500 ease-in-out ${
          expanded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-3 px-4 py-3 ${s.bg} ${s.text} rounded-r-xl shadow-lg hover:pl-6 transition-all duration-200 group`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="shrink-0">{s.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{s.label}</span>
          </a>
        ))}
      </div>

      {/* Toggle tab */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center justify-center w-7 h-14 rounded-r-lg bg-primary text-primary-foreground shadow-md hover:w-8 transition-all duration-200 ${
          expanded ? "" : "ml-0"
        }`}
        aria-label={expanded ? "ซ่อนเมนู" : "แสดงเมนู"}
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default SocialRibbon;
