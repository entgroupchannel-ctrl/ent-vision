/**
 * Thai timezone date formatting utilities
 * All dates displayed in Asia/Bangkok (UTC+7) timezone
 */

const TZ = "Asia/Bangkok";

/** Format date: "9 เม.ย. 2569" */
export const formatThaiDate = (d: string | Date): string =>
  new Date(d).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  });

/** Format date+time: "9 เม.ย. 2569 14:30" */
export const formatThaiDateTime = (d: string | Date): string =>
  new Date(d).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });

/** Format date short: "09/04/2569" */
export const formatThaiDateShort = (d: string | Date): string =>
  new Date(d).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TZ,
  });

/** Format date compact: "09 เม.ย. 69 14:30" */
export const formatThaiDateCompact = (d: string | Date): string =>
  new Date(d).toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });

/** Format time only: "14:30" */
export const formatThaiTime = (d: string | Date): string =>
  new Date(d).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });

/** Format price: "฿12,345" */
export const formatThaiPrice = (n: number): string =>
  `฿${n.toLocaleString("th-TH")}`;

/** Format number with 2 decimals: "12,345.00" */
export const formatThaiNumber2 = (n: number): string =>
  n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Relative time: "5 นาทีที่แล้ว" */
export const formatThaiRelative = (d: string | Date): string => {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "เมื่อสักครู่";
  if (mins < 60) return `${mins} นาทีที่แล้ว`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} วันที่แล้ว`;
  return formatThaiDate(d);
};

/** Get current date in Thailand as ISO date string "2026-04-09" */
export const getThaiToday = (): string => {
  const now = new Date();
  // Format as YYYY-MM-DD in Bangkok timezone
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = parts.find(p => p.type === "year")!.value;
  const m = parts.find(p => p.type === "month")!.value;
  const dd = parts.find(p => p.type === "day")!.value;
  return `${y}-${m}-${dd}`;
};

/** Get current Thai datetime as ISO string */
export const getThaiNowISO = (): string => new Date().toISOString();

/** Thailand timezone constant for inline use */
export const THAI_TIMEZONE = TZ;
