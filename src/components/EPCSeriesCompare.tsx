import { useState, useMemo } from "react";
import { Monitor, Cpu, DollarSign, TrendingUp, Filter, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ───── Data ───── */
type EPCModel = {
  id: string;
  name: string;
  displayType: "Square 4:3" | "Wide 16:9";
  size: string;
  sizeNum: number;
  resolution: string;
  cpuTier: "entry" | "mid" | "high";
  cpu: string;
  cpuShort: string;
  price: number;
  priceLabel: string;
  config: string;
  com: string;
  tierColor: string;
  tierLabel: string;
};

const allModels: EPCModel[] = [
  // Square 10"
  { id: "s10-j1900", name: "EPC-S1062A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 27990, priceLabel: "฿27,990", config: "J1900 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s10-j6412", name: "EPC-S1072A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J6412", cpuShort: "J6412", price: 27990, priceLabel: "฿27,990", config: "J6412 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s10-i3", name: "EPC-S1092A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i3-10110U", cpuShort: "i3-10110U", price: 31990, priceLabel: "฿31,990", config: "i3-10110U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s10-i5", name: "EPC-S1092A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i5-10210U", cpuShort: "i5-10210U", price: 34990, priceLabel: "฿34,990", config: "i5-10210U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s10-i3g12", name: "EPC-S1022A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i3-1215U", cpuShort: "i3-1215U", price: 31990, priceLabel: "฿31,990", config: "i3-1215U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  { id: "s10-i5g12", name: "EPC-S1022A", displayType: "Square 4:3", size: '10"', sizeNum: 10, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 33990, priceLabel: "฿33,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Square 12"
  { id: "s12-j1900", name: "EPC-S1262A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 27990, priceLabel: "฿27,990", config: "J1900 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s12-j6412", name: "EPC-S1272A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J6412", cpuShort: "J6412", price: 27990, priceLabel: "฿27,990", config: "J6412 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s12-i3", name: "EPC-S1292A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i3-10110U", cpuShort: "i3-10110U", price: 32990, priceLabel: "฿32,990", config: "i3-10110U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s12-i5", name: "EPC-S1292A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i5-10210U", cpuShort: "i5-10210U", price: 34990, priceLabel: "฿34,990", config: "i5-10210U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s12-i7", name: "EPC-S1292A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i7-10510U", cpuShort: "i7-10510U", price: 36990, priceLabel: "฿36,990", config: "i7-10510U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s12-i3g12", name: "EPC-S1222A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i3-1215U", cpuShort: "i3-1215U", price: 32990, priceLabel: "฿32,990", config: "i3-1215U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  { id: "s12-i5g12", name: "EPC-S1222A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 33990, priceLabel: "฿33,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  { id: "s12-i7g12", name: "EPC-S1222A", displayType: "Square 4:3", size: '12"', sizeNum: 12, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i7-1250U", cpuShort: "i7-1250U", price: 36990, priceLabel: "฿36,990", config: "i7-1250U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Square 15"
  { id: "s15-j1900", name: "EPC-S1562A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 27990, priceLabel: "฿27,990", config: "J1900 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s15-j6412", name: "EPC-S1572A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "entry", cpu: "Intel® Celeron® J6412", cpuShort: "J6412", price: 27990, priceLabel: "฿27,990", config: "J6412 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s15-i3", name: "EPC-S1592A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i3-10110U", cpuShort: "i3-10110U", price: 32990, priceLabel: "฿32,990", config: "i3-10110U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s15-i5", name: "EPC-S1592A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i5-10210U", cpuShort: "i5-10210U", price: 35990, priceLabel: "฿35,990", config: "i5-10210U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s15-i7", name: "EPC-S1592A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "mid", cpu: "Intel® Core™ i7-10510U", cpuShort: "i7-10510U", price: 36990, priceLabel: "฿36,990", config: "i7-10510U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s15-i3g12", name: "EPC-S1522A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i3-1215U", cpuShort: "i3-1215U", price: 32990, priceLabel: "฿32,990", config: "i3-1215U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  { id: "s15-i5g12", name: "EPC-S1522A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 34990, priceLabel: "฿34,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  { id: "s15-i7g12", name: "EPC-S1522A", displayType: "Square 4:3", size: '15"', sizeNum: 15, resolution: "1024×768", cpuTier: "high", cpu: "Intel® Core™ i7-1250U", cpuShort: "i7-1250U", price: 36990, priceLabel: "฿36,990", config: "i7-1250U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Square 17"
  { id: "s17-j1900", name: "EPC-S1762A", displayType: "Square 4:3", size: '17"', sizeNum: 17, resolution: "1280×1024", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 29990, priceLabel: "฿29,990", config: "J1900 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "s17-i5", name: "EPC-S1792A", displayType: "Square 4:3", size: '17"', sizeNum: 17, resolution: "1280×1024", cpuTier: "mid", cpu: "Intel® Core™ i5-10210U", cpuShort: "i5-10210U", price: 36990, priceLabel: "฿36,990", config: "i5-10210U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "s17-i5g12", name: "EPC-S1722A", displayType: "Square 4:3", size: '17"', sizeNum: 17, resolution: "1280×1024", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 36990, priceLabel: "฿36,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Wide 13.3"
  { id: "w13-j1900", name: "EPC-W1362A", displayType: "Wide 16:9", size: '13.3"', sizeNum: 13.3, resolution: "1920×1080", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 29990, priceLabel: "฿29,990", config: "J1900 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "w13-i5", name: "EPC-W1392A", displayType: "Wide 16:9", size: '13.3"', sizeNum: 13.3, resolution: "1920×1080", cpuTier: "mid", cpu: "Intel® Core™ i5-10210U", cpuShort: "i5-10210U", price: 36990, priceLabel: "฿36,990", config: "i5-10210U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  { id: "w13-i5g12", name: "EPC-W1322A", displayType: "Wide 16:9", size: '13.3"', sizeNum: 13.3, resolution: "1920×1080", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 36990, priceLabel: "฿36,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Wide 15.6"
  { id: "w15-j1900", name: "EPC-W1562A", displayType: "Wide 16:9", size: '15.6"', sizeNum: 15.6, resolution: "1920×1080", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 29990, priceLabel: "฿29,990", config: "J1900 / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "w15-i5g12", name: "EPC-W1522A", displayType: "Wide 16:9", size: '15.6"', sizeNum: 15.6, resolution: "1920×1080", cpuTier: "high", cpu: "Intel® Core™ i5-1235U", cpuShort: "i5-1235U", price: 37990, priceLabel: "฿37,990", config: "i5-1235U / 4G RAM / 128G SSD", com: "2×RS232 + 1×RS485", tierColor: "text-amber-500", tierLabel: "Gen 12" },
  // Wide 18.5"
  { id: "w18-j1900", name: "EPC-W1862A", displayType: "Wide 16:9", size: '18.5"', sizeNum: 18.5, resolution: "1920×1080", cpuTier: "entry", cpu: "Intel® Celeron® J1900", cpuShort: "J1900", price: 32990, priceLabel: "฿32,990", config: "J1900 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  { id: "w18-i3", name: "EPC-W1892A", displayType: "Wide 16:9", size: '18.5"', sizeNum: 18.5, resolution: "1920×1080", cpuTier: "mid", cpu: "Intel® Core™ i3-10110U", cpuShort: "i3-10110U", price: 34990, priceLabel: "฿34,990", config: "i3-10110U / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-sky-500", tierLabel: "Standard" },
  // Wide 21.5"
  { id: "w21-j6412", name: "EPC-W2172A", displayType: "Wide 16:9", size: '21.5"', sizeNum: 21.5, resolution: "1920×1080", cpuTier: "entry", cpu: "Intel® Celeron® J6412", cpuShort: "J6412", price: 34990, priceLabel: "฿34,990", config: "J6412 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
  // Wide 23.6"
  { id: "w24-j6412", name: "EPC-W2472A", displayType: "Wide 16:9", size: '23.6"', sizeNum: 23.6, resolution: "1920×1080", cpuTier: "entry", cpu: "Intel® Celeron® J6412", cpuShort: "J6412", price: 36990, priceLabel: "฿36,990", config: "J6412 / 4G RAM / 128G SSD", com: "4×RS232 + 2×RS485", tierColor: "text-emerald-500", tierLabel: "Entry" },
];

const viewModes = [
  { id: "specs" as const, label: "สเปก", icon: Cpu },
  { id: "price" as const, label: "ราคา", icon: DollarSign },
  { id: "value" as const, label: "ความคุ้มค่า", icon: TrendingUp },
];

const displayTypes = ["ทั้งหมด", "Square 4:3", "Wide 16:9"];
const cpuTiers = ["ทุกระดับ", "entry", "mid", "high"];
const cpuTierLabels: Record<string, string> = { "ทุกระดับ": "ทุกระดับ CPU", entry: "Celeron (Entry)", mid: "Core Gen 10", high: "Core Gen 12" };

interface Props {
  onQuote: (name: string) => void;
}

const EPCSeriesCompare = ({ onQuote }: Props) => {
  const [viewMode, setViewMode] = useState<"specs" | "price" | "value">("specs");
  const [displayFilter, setDisplayFilter] = useState("ทั้งหมด");
  const [cpuFilter, setCpuFilter] = useState("ทุกระดับ");

  const filtered = useMemo(() => {
    return allModels.filter((m) => {
      if (displayFilter !== "ทั้งหมด" && m.displayType !== displayFilter) return false;
      if (cpuFilter !== "ทุกระดับ" && m.cpuTier !== cpuFilter) return false;
      return true;
    });
  }, [displayFilter, cpuFilter]);

  const getValueScore = (m: EPCModel) => {
    const cpuScore = m.cpuTier === "high" ? 90 : m.cpuTier === "mid" ? 70 : 50;
    const sizeScore = Math.min(100, (m.sizeNum / 24) * 100);
    const priceEfficiency = ((cpuScore + sizeScore) / 2) / (m.price / 10000);
    return Math.round(priceEfficiency * 10);
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
          {viewModes.map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                viewMode === v.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <v.icon size={14} />
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-muted-foreground" />
            <select
              value={displayFilter}
              onChange={(e) => setDisplayFilter(e.target.value)}
              className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
            >
              {displayTypes.map((d) => (
                <option key={d} value={d}>{d === "ทั้งหมด" ? "ทุกประเภทจอ" : d}</option>
              ))}
            </select>
          </div>
          <select
            value={cpuFilter}
            onChange={(e) => setCpuFilter(e.target.value)}
            className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
          >
            {cpuTiers.map((t) => (
              <option key={t} value={t}>{cpuTierLabels[t]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-xs text-muted-foreground">
        แสดง {filtered.length} รายการ จาก {allModels.length} คอนฟิกทั้งหมด
      </p>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">ไม่พบสินค้าที่ตรงกับตัวกรอง</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <div key={m.id} className="card-surface rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
              {/* Header */}
              <div className="px-4 pt-4 pb-3 border-b border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-foreground text-sm">{m.name}</h4>
                  <Badge variant="outline" className="text-[10px]">{m.displayType}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] ${m.tierColor} bg-transparent border ${m.cpuTier === "entry" ? "border-emerald-500/30" : m.cpuTier === "mid" ? "border-sky-500/30" : "border-amber-500/30"}`}>
                    {m.tierLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{m.size} • {m.resolution}</span>
                </div>
              </div>

              {/* Body — varies by viewMode */}
              <div className="p-4 space-y-3">
                {viewMode === "specs" && (
                  <>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span className="font-medium text-foreground">{m.cpuShort}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Display</span><span className="font-medium">{m.size} ({m.displayType.split(" ")[1]})</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Resolution</span><span className="font-medium">{m.resolution}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">COM</span><span className="font-medium">{m.com}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Config</span><span className="font-medium">{m.config}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Cooling</span><span className="font-medium">Fanless</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Protection</span><span className="font-medium">IP65 Front</span></div>
                    </div>
                  </>
                )}

                {viewMode === "price" && (
                  <div className="text-center py-2">
                    <p className="text-2xl font-bold text-primary">{m.priceLabel}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{m.config}</p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <Monitor size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{m.size} {m.displayType}</span>
                    </div>
                  </div>
                )}

                {viewMode === "value" && (() => {
                  const score = getValueScore(m);
                  const stars = score >= 80 ? 5 : score >= 65 ? 4 : score >= 50 ? 3 : 2;
                  return (
                    <div className="text-center py-2">
                      <div className="flex justify-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} className={i < stars ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"} />
                        ))}
                      </div>
                      <p className="text-lg font-bold text-foreground">{score}/100</p>
                      <p className="text-[10px] text-muted-foreground">คะแนนความคุ้มค่า</p>
                      <div className="mt-3 text-xs space-y-1">
                        <div className="flex justify-between"><span className="text-muted-foreground">ราคา</span><span className="font-medium text-primary">{m.priceLabel}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span className="font-medium">{m.cpuShort}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">จอ</span><span className="font-medium">{m.size}</span></div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Footer */}
              <div className="px-4 pb-4">
                <Button size="sm" className="w-full text-xs" onClick={() => onQuote(m.name)}>
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EPCSeriesCompare;
