import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText } from "lucide-react";

/* ───── Price Data ───── */
type PriceItem = {
  processor: string;
  config: string;
  price: number | string;
  remark?: string;
};

const gb1000Data: PriceItem[] = [
  { processor: "i3-6157U", config: "Core i3-6157U RAM 4GB/SSD128GB/WIFI", price: 14390 },
  { processor: "", config: "Core i3-6157U RAM 8GB/SSD128GB/WIFI", price: 15090 },
  { processor: "", config: "Core i3-6157U RAM 4GB/SSD256GB/WIFI", price: 15790 },
  { processor: "", config: "Core i3-6157U RAM 8GB/SSD256GB/WIFI", price: 15990 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM 4GB/SSD128GB/WIFI", price: 16490 },
  { processor: "", config: "Core i3-7100U RAM 8GB/SSD128GB/WIFI", price: 17190 },
  { processor: "", config: "Core i3-7100U RAM 8GB/SSD128GB/WIFI", price: 17890 },
  { processor: "", config: "Core i3-7100U RAM 8GB/SSD256GB/WIFI", price: 18290 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM 4GB/SSD128GB/WIFI", price: 17390 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM 8GB/SSD256GB/WIFI", price: 18090 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM 8GB/SSD128GB/WIFI", price: 18790 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM 8GB/SSD256GB/WIFI", price: 19190 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM 4GB/SSD128GB/WIFI", price: 18390 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM 8GB/SSD128GB/WIFI", price: 19090 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM 8GB/SSD256GB/WIFI", price: 19790 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM 16GB/SSD256GB/WIFI", price: 21190 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM 8GB/SSD128GB/WIFI", price: 20390 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM 8GB/SSD256GB/WIFI", price: 21090 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM 16GB/SSD256GB/WIFI", price: 22490 },
  { processor: "i7-10510U", config: "Core i7-10510U RAM 8GB/SSD256GB/WIFI", price: 23290 },
  { processor: "i7-10510U", config: "Core i7-10510U RAM 16GB/SSD256GB/WIFI", price: 24690 },
];

const gb2000Data: PriceItem[] = [
  { processor: "i5-4278U", config: "Core i5-4278U RAM DDR3L 4GB/SSD128GB/WIFI", price: 18890 },
  { processor: "i5-4278U", config: "Core i5-4278U RAM DDR3L 8GB/SSD128GB/WIFI", price: 19290 },
  { processor: "i5-4278U", config: "Core i5-4278U RAM DDR3L 4GB/SSD256GB/WIFI", price: 19890 },
  { processor: "i5-4278U", config: "Core i5-4278U RAM DDR3L 8GB/SSD256GB/WIFI", price: 20190 },
  { processor: "i7-4578U", config: "Core i7-4578U RAM DDR3L 4GB/SSD128GB/WIFI", price: 18890 },
  { processor: "i7-4578U", config: "Core i7-4578U RAM DDR3L 8GB/SSD128GB/WIFI", price: 20990 },
  { processor: "i7-4578U", config: "Core i7-4578U RAM DDR3L 4GB/SSD256GB/WIFI", price: 21590 },
  { processor: "i7-4578U", config: "Core i7-4578U RAM DDR3L 8GB/SSD256GB/WIFI", price: 21990 },
  { processor: "i3-6157U", config: "Core i3-6157U RAM DDR4 4GB/SSD128GB/WIFI", price: 18190 },
  { processor: "i3-6157U", config: "Core i3-6157U RAM DDR4 8GB/SSD128GB/WIFI", price: 18590 },
  { processor: "i3-6157U", config: "Core i3-6157U RAM DDR4 4GB/SSD256GB/WIFI", price: 19190 },
  { processor: "i3-6157U", config: "Core i3-6157U RAM DDR4 8GB/SSD256GB/WIFI", price: 19490 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM DDR4 4GB/SSD128GB/WIFI", price: 19690 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM DDR4 8GB/SSD128GB/WIFI", price: 20090 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM DDR4 4GB/SSD256GB/WIFI", price: 20290 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM DDR4 8GB/SSD256GB/WIFI", price: 20590 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM DDR4 4GB/SSD128GB/WIFI", price: 20190 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM DDR4 8GB/SSD128GB/WIFI", price: 20590 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM DDR4 8GB/SSD256GB/WIFI", price: 21190 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM DDR4 8GB/SSD128GB/WIFI", price: 21690 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM DDR4 8GB/SSD256GB/WIFI", price: 22290 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM DDR4 16GB/SSD256GB/WIFI", price: 23690 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM DDR4 8GB/SSD128GB/WIFI", price: 22890 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM DDR4 8GB/SSD256GB/WIFI", price: 23490 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM DDR4 16GB/SSD256GB/WIFI", price: 24890 },
  { processor: "i7-10510U", config: "Core i7-10510U RAM DDR4 8GB/SSD256GB/WIFI", price: 25790 },
  { processor: "i7-10510U", config: "Core i7-10510U RAM DDR4 16GB/SSD256GB/WIFI", price: 27190 },
];

const gb4000Data: PriceItem[] = [
  { processor: "i5-4278U", config: "Core i5-4278U RAM DDR3L 4GB/SSD128GB/WIFI", price: 20969, remark: "4th GEN use DDR3L RAM" },
  { processor: "", config: "Core i5-4278U RAM DDR3L 8GB/SSD128GB/WIFI", price: 21239 },
  { processor: "", config: "Core i5-4278U RAM DDR3L 4GB/SSD256GB/WIFI", price: 21759 },
  { processor: "", config: "Core i5-4278U RAM DDR3L 8GB/SSD256GB/WIFI", price: 22019 },
  { processor: "i7-4578U", config: "Core i7-4578U RAM DDR3L 4GB/SSD128GB/WIFI", price: 22639 },
  { processor: "", config: "Core i7-4578U RAM DDR3L 8GB/SSD128GB/WIFI", price: 22899 },
  { processor: "", config: "Core i7-4578U RAM DDR3L 4GB/SSD256GB/WIFI", price: 22109 },
  { processor: "", config: "Core i7-4578U RAM DDR3L 8GB/SSD256GB/WIFI", price: 22369 },
  { processor: "i3-6157U", config: "Core i3-6157U RAM DDR4 4GB/SSD128GB/WIFI", price: 20449, remark: "6~11th GEN use DDR4 RAM" },
  { processor: "", config: "Core i3-6157U RAM DDR4 8GB/SSD128GB/WIFI", price: 20879 },
  { processor: "", config: "Core i3-6157U RAM DDR4 4GB/SSD256GB/WIFI", price: 21149 },
  { processor: "", config: "Core i3-6157U RAM DDR4 8GB/SSD256GB/WIFI", price: 21549 },
  { processor: "i3-7100U", config: "Core i3-7100U RAM DDR4 4GB/SSD128GB/WIFI", price: 21549 },
  { processor: "", config: "Core i3-7100U RAM DDR4 8GB/SSD128GB/WIFI", price: 21979 },
  { processor: "", config: "Core i3-7100U RAM DDR4 4GB/SSD256GB/WIFI", price: 22249 },
  { processor: "", config: "Core i3-7100U RAM DDR4 8GB/SSD256GB/WIFI", price: 22649 },
  { processor: "i3-8130U", config: "Core i3-8130U RAM DDR4 4GB/SSD128GB/WIFI", price: 22049 },
  { processor: "", config: "Core i3-8130U RAM DDR4 8GB/SSD128GB/WIFI", price: 22479 },
  { processor: "", config: "Core i3-8130U RAM DDR4 8GB/SSD256GB/WIFI", price: 23149 },
  { processor: "i5-8250U", config: "Core i5-8250U RAM DDR4 8GB/SSD128GB/WIFI", price: 23549 },
  { processor: "", config: "Core i5-8250U RAM DDR4 8GB/SSD256GB/WIFI", price: 24249 },
  { processor: "", config: "Core i5-8250U RAM DDR4 16GB/SSD256GB/WIFI", price: 25549 },
  { processor: "i5-10210U", config: "Core i5-10210U RAM DDR4 8GB/SSD128GB/WIFI", price: 25049 },
  { processor: "", config: "Core i5-10210U RAM DDR4 8GB/SSD256GB/WIFI", price: 25749 },
  { processor: "", config: "Core i5-10210U RAM DDR4 16GB/SSD256GB/WIFI", price: 27049 },
  { processor: "i5-1135G7", config: "Core i5-1135G7 RAM DDR4 8GB/SSD256GB/WIFI", price: 27249 },
  { processor: "", config: "Core i5-1135G7 RAM DDR4 16GB/SSD256GB/WIFI", price: 28549 },
  { processor: "i7-10510U", config: "Core i7-10510U RAM DDR4 8GB/SSD256GB/WIFI", price: 27849 },
  { processor: "", config: "Core i7-10510U RAM DDR4 16GB/SSD256GB/WIFI", price: 29149 },
  { processor: "i7-1165G7", config: "Core i7-1165G7 RAM DDR4 16GB/SSD256GB/WIFI", price: 31249 },
  { processor: "i7-1265U", config: "Core i7-1265U RAM DDR4 16GB/SSD256GB/WIFI", price: 33549, remark: "12th Gen" },
  { processor: "i7-1355U", config: "Core i7-1355U RAM DDR4 16GB/SSD256GB/WIFI", price: 34549, remark: "13th Gen" },
];

const gb5000Data: PriceItem[] = [
  { processor: "I5 8305G", config: "Core I5 8305G DDR4 RAM 4GB/SSD128GB/WIFI", price: 28990 },
  { processor: "I5 8305G", config: "Core I5 8305G DDR4 RAM 8GB/SSD128GB/WIFI", price: 29190 },
  { processor: "I5 8305G", config: "Core I5 8305G DDR4 RAM 4GB/SSD256GB/WIFI", price: 29590, remark: "4LAN Ports" },
  { processor: "I5 8305G", config: "Core I5 8305G DDR4 RAM 8GB/SSD256GB/WIFI", price: 29990, remark: "DDR4/DDR5 Support" },
  { processor: "i7 12650HX", config: "Core i7 12650HX DDR5 RAM 8GB/SSD128GB/WIFI", price: 34690, remark: "Industrial Grade" },
  { processor: "i7 12650HX", config: "Core i7 12650HX DDR5 RAM 8GB/SSD256GB/WIFI", price: 35290 },
  { processor: "i7 12650HX", config: "Core i7 12650HX DDR5 RAM 16GB/SSD128GB/WIFI", price: 36490 },
  { processor: "i7 12650HX", config: "Core i7 12650HX DDR5 RAM 16GB/SSD256GB/WIFI", price: 36990 },
  { processor: "i7 13650HX", config: "Core i7 13650HX DDR5 RAM 8GB/SSD128GB/WIFI", price: 37790 },
  { processor: "i7 13650HX", config: "Core i7 13650HX DDR5 RAM 8GB/SSD256GB/WIFI", price: 38390 },
  { processor: "i7 13650HX", config: "Core i7 13650HX DDR5 RAM 16GB/SSD256GB/WIFI", price: 39790 },
  { processor: "i7 13650HX", config: "Core i7 13650HX DDR5 RAM 32GB/SSD512GB/WIFI", price: 43590 },
];

const windowsData: PriceItem[] = [
  { processor: "Windows 10 IoT", config: "Windows 10 IoT Enterprise LTSC 2021 (Entry)", price: 3500, remark: "สำหรับ i3/i5" },
  { processor: "Windows 10 IoT", config: "Windows 10 IoT Enterprise LTSC 2021 (Value)", price: 5500, remark: "สำหรับ i5/i7" },
  { processor: "Windows 10 IoT", config: "Windows 10 IoT Enterprise LTSC 2021 (High End)", price: 7500, remark: "Full Feature" },
  { processor: "Windows 11 IoT", config: "Windows 11 IoT Enterprise LTSC (Entry)", price: 4500, remark: "สำหรับ i3/i5" },
  { processor: "Windows 11 IoT", config: "Windows 11 IoT Enterprise LTSC (Value)", price: 6500, remark: "สำหรับ i5/i7" },
  { processor: "Windows 11 Pro", config: "Windows 11 Pro OEM License", price: 4990, remark: "Standard License" },
  { processor: "4G/LTE Module", config: "4G/LTE Module (ติดตั้ง)", price: "Call", remark: "GB2000/GB5000" },
  { processor: "5G Module", config: "5G Module (ติดตั้ง)", price: "Call", remark: "GB5000 เท่านั้น" },
  { processor: "Extended Warranty", config: "ประกันเพิ่ม 1 ปี (รวม 2 ปี)", price: "Call" },
  { processor: "Extended Warranty", config: "ประกันเพิ่ม 2 ปี (รวม 3 ปี)", price: "Call" },
];

const ITEMS_PER_PAGE = 10;

type TabId = "gb1000" | "gb2000" | "gb4000" | "gb5000" | "windows";

const tabs: { id: TabId; label: string; data: PriceItem[]; hasRemark: boolean }[] = [
  { id: "gb1000", label: "GB1000 Price List", data: gb1000Data, hasRemark: false },
  { id: "gb2000", label: "GB2000 Price List", data: gb2000Data, hasRemark: false },
  { id: "gb4000", label: "GB4000 Price List", data: gb4000Data, hasRemark: true },
  { id: "gb5000", label: "GB5000 Price List", data: gb5000Data, hasRemark: true },
  { id: "windows", label: "Windows License / Options", data: windowsData, hasRemark: true },
];

const formatPrice = (price: number | string) => {
  if (typeof price === "string") return price;
  return `฿${price.toLocaleString()}`;
};

interface GBPriceListProps {
  onRequestQuote?: (product: string) => void;
}

const GBPriceList = ({ onRequestQuote }: GBPriceListProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("gb1000");
  const [pages, setPages] = useState<Record<TabId, number>>({ gb1000: 1, gb2000: 1, gb4000: 1, gb5000: 1, windows: 1 });

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const currentPage = pages[activeTab];
  const totalPages = Math.ceil(currentTab.data.length / ITEMS_PER_PAGE);
  const pagedData = currentTab.data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const setPage = (page: number) => setPages((prev) => ({ ...prev, [activeTab]: page }));

  return (
    <section className="border-t border-border bg-card" id="price-list">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
          💰 ราคา <span className="text-primary">GB Series</span> ทุกรุ่น
        </h2>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all border ${
                activeTab === tab.id
                  ? "bg-foreground text-background border-foreground shadow-lg"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-primary/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-[140px]">
                    {activeTab === "windows" ? "ประเภท" : "Processor"}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    {activeTab === "gb1000"
                      ? `Industrial MINI PC GB1000 (DDR4 RAM)`
                      : "Configuration"}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground w-[120px]">Price List</th>
                  {currentTab.hasRemark && (
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-[160px]">Remark</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pagedData.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-primary/5 ${idx % 2 === 1 ? "bg-secondary/20" : ""}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">{item.processor}</td>
                    <td className="px-4 py-2.5 text-foreground">{item.config}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-primary whitespace-nowrap">
                      {formatPrice(item.price)}
                    </td>
                    {currentTab.hasRemark && (
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">{item.remark || ""}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-1 px-4 py-3 border-t border-border bg-secondary/20">
              <button
                onClick={() => setPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded text-sm font-bold transition-colors ${
                    p === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Quote CTA */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-3">* ราคายังไม่รวม VAT 7% | ราคาอาจเปลี่ยนแปลงโดยไม่ต้องแจ้งล่วงหน้า | สอบถามราคาพิเศษสำหรับจำนวนมาก</p>
          {onRequestQuote && (
            <button
              onClick={() => onRequestQuote(`GB Series — ${currentTab.label}`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              <FileText size={16} /> ขอใบเสนอราคา {currentTab.label.replace(" Price List", "")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default GBPriceList;
