import { useState } from "react";
import { ChevronDown, X, Filter, Cpu, Network, Zap, Flame, Factory, Globe, Radio, Car, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface IBoxFilterState {
  category: string;
  cpuGen: string;
  comPorts: string;
  lanPorts: string;
  poe: boolean | null;
  pcie: boolean | null;
  formFactor: string;
  performance: string;
}

export const defaultFilters: IBoxFilterState = {
  category: "all",
  cpuGen: "all",
  comPorts: "all",
  lanPorts: "all",
  poe: null,
  pcie: null,
  formFactor: "all",
  performance: "all",
};

const categoryOptions = [
  { id: "all", name: "ทั้งหมด", icon: null },
  { id: "AI Edge Computing", name: "AI Edge Computing / GPU", icon: Flame },
  { id: "Embedded Box PC", name: "Embedded Box PC", icon: Factory },
  { id: "Gateway", name: "Gateway / DIN Rail", icon: Globe },
  { id: "PoE & Multi-LAN", name: "PoE & Multi-LAN", icon: Radio },
  { id: "Vehicle & Special", name: "Vehicle & Special", icon: Car },
  { id: "Machine Vision", name: "Machine Vision (AEOLUS)", icon: Eye },
];

const cpuGenerations = [
  { id: "all", name: "ทุกรุ่น CPU" },
  { id: "14th Gen", name: "Intel 14th Gen" },
  { id: "13th Gen", name: "Intel 13th Gen (Raptor Lake)" },
  { id: "12th-14th Gen", name: "Intel 12th-14th Gen" },
  { id: "12th Gen", name: "Intel 12th Gen (Alder Lake)" },
  { id: "11th Gen", name: "Intel 11th Gen (Tiger Lake)" },
  { id: "10th Gen", name: "Intel 10th Gen" },
  { id: "8th-9th Gen", name: "Intel 8th-9th Gen" },
  { id: "6th-9th Gen", name: "Intel 6th-9th Gen" },
  { id: "9th Gen", name: "Intel 9th Gen" },
  { id: "Gemini Lake", name: "Intel Celeron (Gemini Lake)" },
  { id: "Elkhart Lake", name: "Intel Celeron (Elkhart Lake)" },
  { id: "ARM", name: "ARM Processor" },
];

const formFactorOptions = [
  { id: "all", name: "ทุกรูปแบบ" },
  { id: "fanless", name: "Fanless Box PC" },
  { id: "mini", name: "Mini PC" },
  { id: "compact", name: "Compact PC" },
  { id: "embedded", name: "Embedded PC" },
];

const performanceOptions = [
  { id: "all", name: "ทุกระดับ" },
  { id: "entry", name: "Entry-level" },
  { id: "mid", name: "Mid-range" },
  { id: "high", name: "High-performance" },
];

export const portFilters = {
  comPorts: [
    { id: "all", name: "ทุกจำนวน", min: 0, max: 99 },
    { id: "1-2", name: "1-2 พอร์ต", min: 1, max: 2 },
    { id: "3-4", name: "3-4 พอร์ต", min: 3, max: 4 },
    { id: "5+", name: "5+ พอร์ต", min: 5, max: 99 },
  ],
  lanPorts: [
    { id: "all", name: "ทุกจำนวน", min: 0, max: 99 },
    { id: "1-2", name: "1-2 พอร์ต", min: 1, max: 2 },
    { id: "3-4", name: "3-4 พอร์ต", min: 3, max: 4 },
    { id: "5-6", name: "5-6 พอร์ต", min: 5, max: 6 },
    { id: "7+", name: "7+ พอร์ต", min: 7, max: 99 },
  ],
};

interface IBoxProductFilterProps {
  filters: IBoxFilterState;
  onFilterChange: (filters: IBoxFilterState) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  resultCount: number;
}

const IBoxProductFilter = ({
  filters,
  onFilterChange,
  isMobileOpen,
  onMobileClose,
  resultCount,
}: IBoxProductFilterProps) => {

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.cpuGen !== "all" ||
    filters.comPorts !== "all" ||
    filters.lanPorts !== "all" ||
    filters.poe !== null ||
    filters.pcie !== null ||
    filters.formFactor !== "all" ||
    filters.performance !== "all";

  const clearFilters = () => onFilterChange({ ...defaultFilters });

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          ตัวกรองสินค้า
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive hover:text-destructive/80 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            ล้าง
          </Button>
        )}
      </div>

      {/* Result Count */}
      <div className="px-3 py-2 bg-primary/5 rounded-lg">
        <p className="text-sm text-primary font-medium">
          พบ {resultCount} รายการ
        </p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "formFactor", "performance", "cpu", "ports", "features"]}
        className="space-y-2"
      >
        {/* Category */}
        <AccordionItem value="category" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            หมวดสินค้า
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-1">
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange({ ...filters, category: option.id })}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.category === option.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {option.name}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Form Factor */}
        <AccordionItem value="formFactor" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            ตาม Form Factor
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-1">
            {formFactorOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange({ ...filters, formFactor: option.id })}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.formFactor === option.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {option.name}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Performance */}
        <AccordionItem value="performance" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            ตามระดับประสิทธิภาพ
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-1">
            {performanceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange({ ...filters, performance: option.id })}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.performance === option.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {option.name}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* CPU Generation */}
        <AccordionItem value="cpu" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Processor
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-1 max-h-48 overflow-y-auto">
            {cpuGenerations.map((gen) => (
              <button
                key={gen.id}
                onClick={() => onFilterChange({ ...filters, cpuGen: gen.id })}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.cpuGen === gen.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {gen.name}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Ports */}
        <AccordionItem value="ports" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              I/O Ports
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-4">
            {/* COM Ports */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">COM Ports</p>
              <div className="flex flex-wrap gap-2">
                {portFilters.comPorts.map((port) => (
                  <button
                    key={port.id}
                    onClick={() => onFilterChange({ ...filters, comPorts: port.id })}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      filters.comPorts === port.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {port.name}
                  </button>
                ))}
              </div>
            </div>

            {/* LAN Ports */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">LAN Ports</p>
              <div className="flex flex-wrap gap-2">
                {portFilters.lanPorts.map((port) => (
                  <button
                    key={port.id}
                    onClick={() => onFilterChange({ ...filters, lanPorts: port.id })}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      filters.lanPorts === port.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {port.name}
                  </button>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Features */}
        <AccordionItem value="features" className="border border-border rounded-lg px-3">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              คุณสมบัติพิเศษ
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground cursor-pointer">
                PoE Support
              </label>
              <Switch
                checked={filters.poe === true}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, poe: checked ? true : null })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground cursor-pointer">
                PCIe Expansion
              </label>
              <Switch
                checked={filters.pcie === true}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, pcie: checked ? true : null })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 card-surface p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-card z-50 lg:hidden overflow-y-auto animate-in slide-in-from-left">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">ตัวกรองสินค้า</h2>
                <button
                  onClick={onMobileClose}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
              <div className="mt-4 pt-4 border-t border-border">
                <Button onClick={onMobileClose} className="w-full">
                  ดูผลลัพธ์ ({resultCount} รายการ)
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default IBoxProductFilter;
