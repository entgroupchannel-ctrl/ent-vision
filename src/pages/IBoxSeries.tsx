import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import WishlistHeart from "@/components/WishlistHeart";
import {
  ArrowLeft, Cpu, Thermometer, Shield, Usb, Wifi, Download,
  FileText, ChevronRight, Layers, HardDrive, Monitor, Zap, Box,
  Factory, Stethoscope, Truck, ScanLine, Tv, Warehouse, Flame, Sparkles,
  Network, Eye, BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import MultiSelectQuoteBar, { useMultiSelect } from "@/components/MultiSelectQuoteBar";
import bannerIBox from "@/assets/banner-ibox-series.jpg";
import usecaseAutomation from "@/assets/ibox-usecase-automation.jpg";
import usecaseMedical from "@/assets/ibox-usecase-medical.jpg";
import usecaseLogistics from "@/assets/ibox-usecase-logistics.jpg";
import usecaseWarehouse from "@/assets/ibox-usecase-warehouse.jpg";
import usecaseVision from "@/assets/ibox-usecase-vision.jpg";
import usecaseSignage from "@/assets/ibox-usecase-signage.jpg";

// New product images from rugged-ipc
import ibox007Main from "@/assets/products/ibox-007-main.png";
import ibox601GtProMain from "@/assets/products/ibox-601-gt-pro-main.png";
import ibox602GtProMain from "@/assets/products/ibox-602-gt-pro-main.png";
import aeolusTl9Main from "@/assets/products/aeolus-tl9-6l2c4p-main.png";
import aeolusSv9Main from "@/assets/products/aeolus-sv9-6l2c-1p-main.png";
import aeolusSva35Main from "@/assets/products/aeolus-sva35-2l10c-main.png";
import aeolusSv9_6l2c from "@/assets/products/aeolus-sv9-6l2c.png";
import aeolusSv9Vision from "@/assets/products/aeolus-sv9-vision.png";
import ibox103Img from "@/assets/products/ibox-103.png";
import ibox104v2Img from "@/assets/products/ibox-104v2.png";
import ibox603Img from "@/assets/products/ibox-603-2l4c-1p.png";
import ibox604Img from "@/assets/products/ibox-604-main.png";
import ibox205Img from "@/assets/products/ibox-205-4l2c2p.png";
import vbox105Img from "@/assets/products/vbox-105-2l6c.png";
import ibox103_2l2cImg from "@/assets/products/ibox-103-2l2c.png";
import aeolusTl9_2l2cImg from "@/assets/products/aeolus-tl9-2l2c.png";

/* ═══════ Types ═══════ */
type ProductCategory = "all" | "hot" | "embedded" | "edge" | "vision" | "arm" | "classic";

interface IBoxProduct {
  id: string;
  name: string;
  nameTH: string;
  category: ProductCategory[];
  cpu: string;
  cpuGen?: string;
  ram: string;
  storage: string;
  io: string;
  temp: string;
  lanPorts?: number;
  comPorts?: number;
  usbPorts?: number;
  poe?: boolean;
  pcie?: boolean;
  image: string;
  features: string[];
  applications: string[];
  priceRange?: string;
  isNew?: boolean;
  isHot?: boolean;
  externalUrl?: string;
}

/* ═══════ Product Data ═══════ */
const allProducts: IBoxProduct[] = [
  // === HOT / HIGH-END ===
  {
    id: "ibox-007",
    name: "IBOX-007",
    nameTH: "Fanless Industrial PC 10 LAN PoE",
    category: ["hot", "embedded"],
    cpu: "Intel Core i9/i7/i5/i3 (12th Gen Alder Lake-S)",
    cpuGen: "12th Gen",
    ram: "Up to 64GB DDR4 3200MHz",
    storage: "M.2 NVMe + 4× SATA RAID",
    io: "8× USB, 4× COM, 10× LAN (8× PoE)",
    temp: "-20°C ~ 55°C",
    lanPorts: 10, comPorts: 4, usbPorts: 8, poe: true, pcie: true,
    image: ibox007Main,
    features: [
      "Intel 12th Gen Core i9/i7/i5/i3 Desktop CPU (LGA1700)",
      "10× GbE LAN (8× PoE สำหรับ Machine Vision)",
      "4× Swappable 2.5\" SSD RAID 0/1/5/10",
      "Fanless Aluminum Enclosure",
    ],
    applications: ["AI Inference", "Edge Computing", "Machine Vision"],
    priceRange: "฿95,000 - ฿150,000",
    isHot: true,
    externalUrl: "https://www.tpipc.com/product/ibox-007/",
  },
  {
    id: "ibox-601-gt-pro",
    name: "IBOX-601-GT-PRO",
    nameTH: "Edge AI Industrial PC + GPU",
    category: ["hot", "embedded", "edge"],
    cpu: "Intel Core i9/i7/i5/i3 (12th-14th Gen)",
    cpuGen: "12th-14th Gen",
    ram: "Up to 128GB DDR4",
    storage: "2× M.2 NVMe + 4× SATA RAID",
    io: "8× USB, 2× COM, 9× LAN",
    temp: "-20°C ~ 55°C",
    lanPorts: 9, comPorts: 2, usbPorts: 8, poe: true, pcie: true,
    image: ibox601GtProMain,
    features: [
      "PCIe 4.0 x16 สำหรับ GPU Discrete",
      "Intel H770 Chipset",
      "9× GbE LAN รองรับ PoE",
      "Fanless Rugged Aluminum Chassis",
    ],
    applications: ["AI Inference", "Deep Learning", "Edge AI"],
    priceRange: "฿120,000 - ฿200,000",
    isHot: true, isNew: true,
  },
  {
    id: "ibox-602-gt-pro",
    name: "IBOX-602-GT-PRO",
    nameTH: "GPU Industrial PC รองรับ RTX 3090/4090",
    category: ["hot", "embedded", "edge"],
    cpu: "Intel Core i9/i7/i5/i3 (12th-14th Gen)",
    cpuGen: "12th-14th Gen",
    ram: "Up to 128GB DDR4",
    storage: "2× M.2 NVMe + 4× SATA RAID",
    io: "8× USB, 6× COM, 3× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 3, comPorts: 6, usbPorts: 8, poe: false, pcie: true,
    image: ibox602GtProMain,
    features: [
      "PCIe 4.0 x16 รองรับ NVIDIA RTX 3090/4090",
      "DP 8K + HDMI 4K Display",
      "4× Isolated COM + 2× RS232",
      "8-bit GPIO + Dual SIM 4G/5G",
    ],
    applications: ["AI Training", "Deep Learning", "3D Rendering"],
    priceRange: "฿150,000 - ฿250,000",
    isHot: true, isNew: true,
  },

  // === MACHINE VISION ===
  {
    id: "aeolus-tl9-6l2c4p",
    name: "AEOLUS-TL9-6L2C4P",
    nameTH: "Machine Vision PC PoE + Light Controller",
    category: ["hot", "vision"],
    cpu: "Intel Core i7/i5/i3 (8th/9th Gen)",
    cpuGen: "8th-9th Gen",
    ram: "Up to 32GB DDR4",
    storage: "2× M.2 2280 NVMe/SATA",
    io: "6× USB, 2× Isolated COM, 6× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 6, comPorts: 2, usbPorts: 6, poe: true,
    image: aeolusTl9Main,
    features: [
      "6× GbE LAN (4× PoE IEEE 802.3af)",
      "4-Channel Light Source Controller",
      "4-Channel External Trigger Signal",
      "16-bit GPIO (8-in/8-out)",
    ],
    applications: ["Machine Vision", "AOI Inspection", "Quality Control"],
    priceRange: "฿85,000 - ฿120,000",
    isHot: true, isNew: true,
  },
  {
    id: "aeolus-sv9-6l2c",
    name: "AEOLUS-SV9-6L2C",
    nameTH: "Machine Vision Industrial PC",
    category: ["vision"],
    cpu: "Intel Core i7-1365URE (13th Gen)",
    cpuGen: "13th Gen",
    ram: "Up to 64GB DDR5",
    storage: "M.2 NVMe SSD",
    io: "6× USB 3.2, 2× COM, 6× LAN",
    temp: "-20°C ~ 60°C",
    lanPorts: 6, comPorts: 2, usbPorts: 6, poe: true, pcie: true,
    image: aeolusSv9_6l2c,
    features: [
      "Intel 13th Gen Raptor Lake",
      "6× PoE+ GbE LAN",
      "Fanless Design",
      "TPM 2.0 Support",
    ],
    applications: ["Machine Vision", "AI Edge Computing", "AOI Inspection"],
    priceRange: "฿85,000 - ฿120,000",
    isNew: true,
  },
  {
    id: "apollo-sv12-8p",
    name: "APOLLO-SV12-8P",
    nameTH: "Vision Controller 8 Port PoE",
    category: ["vision"],
    cpu: "Intel Core i7-1185G7E (11th Gen)",
    cpuGen: "11th Gen",
    ram: "Up to 64GB DDR4",
    storage: "2× M.2 NVMe",
    io: "4× USB 3.2, 2× COM, 8× PoE LAN",
    temp: "-20°C ~ 60°C",
    lanPorts: 8, comPorts: 2, usbPorts: 4, poe: true, pcie: true,
    image: aeolusSv9Vision,
    features: [
      "8× PoE+ GbE LAN สำหรับกล้อง Vision",
      "Intel 11th Gen Tiger Lake",
      "Fanless Industrial Grade",
      "TPM 2.0 + Secure Boot",
    ],
    applications: ["Machine Vision", "AOI Inspection", "Multi-Camera"],
    priceRange: "฿95,000 - ฿130,000",
  },

  // === EDGE CONTROLLER ===
  {
    id: "aeolus-sv9-6l2c-1p",
    name: "AEOLUS-SV9-6L2C-1P",
    nameTH: "Edge Controller 6 LAN + PCIe",
    category: ["hot", "edge"],
    cpu: "Intel Core i7/i5/i3 (6th-9th Gen)",
    cpuGen: "6th-9th Gen",
    ram: "Up to 64GB DDR4",
    storage: "M.2 2280 NVMe/SATA",
    io: "5× USB, 2× COM, 6× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 6, comPorts: 2, usbPorts: 5, poe: false, pcie: true,
    image: aeolusSv9Main,
    features: [
      "6× GbE LAN (Intel i210/i219) WoL/PXE",
      "1× PCIe x8 Expansion Slot",
      "Mini-PCIe + Nano SIM สำหรับ 4G LTE",
      "Wall/DIN-rail/Vertical Mount",
    ],
    applications: ["Industrial Gateway", "Edge Computing", "Network Appliance"],
    priceRange: "฿65,000 - ฿95,000",
    isHot: true, isNew: true,
  },
  {
    id: "kronos-sv6-4l8c",
    name: "KRONOS-SV6-4L8C",
    nameTH: "Multi-LAN Industrial PC 6 LAN",
    category: ["edge"],
    cpu: "Intel Core i7/i5/i3 (LGA1151)",
    cpuGen: "6th-9th Gen",
    ram: "Up to 64GB DDR4",
    storage: "M.2 NVMe + SATA 3.0",
    io: "4× USB 3.0, 2× COM, 6× LAN",
    temp: "-20°C ~ 60°C",
    lanPorts: 6, comPorts: 2, usbPorts: 4, poe: false, pcie: true,
    image: aeolusSv9_6l2c,
    features: [
      "6× Intel Gigabit LAN",
      "Active Cooling Design",
      "Wide DC 12V/19V/24V Input",
      "Mini-PCIe + Nano SIM",
    ],
    applications: ["Network Appliance", "Edge Gateway", "Industrial IoT"],
    priceRange: "฿65,000 - ฿85,000",
  },

  // === ARM CONTROLLER ===
  {
    id: "aeolus-sva35-2l10c",
    name: "AEOLUS-SVA35-2L10C",
    nameTH: "ARM Edge Controller 10× RS485 + AI NPU",
    category: ["hot", "arm"],
    cpu: "Rockchip RK3568 Quad-Core ARM Cortex-A55",
    cpuGen: "ARM",
    ram: "4GB/8GB LPDDR4X",
    storage: "64GB eMMC + M.2 NVMe",
    io: "3× USB, 10× RS485, 2× CAN, 2× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 2, comPorts: 10, usbPorts: 3,
    image: aeolusSva35Main,
    features: [
      "1T NPU สำหรับ AI Acceleration",
      "10× RS485 + 2× CAN Bus",
      "8-bit Isolated GPIO",
      "รองรับ Linux และ Android 11",
    ],
    applications: ["IoT Gateway", "Building Automation", "Energy Monitoring"],
    priceRange: "฿35,000 - ฿55,000",
    isHot: true, isNew: true,
  },

  // === EMBEDDED BOX PC (TPIPC) ===
  {
    id: "ibox-103",
    name: "IBOX-103",
    nameTH: "Compact Fanless Mini PC",
    category: ["embedded"],
    cpu: "Intel Celeron J4125 / N5105",
    cpuGen: "Gemini Lake / Jasper Lake",
    ram: "Up to 16GB DDR4",
    storage: "M.2 SATA + 2.5\" SATA",
    io: "4× USB, 2× COM, 2-4× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 4, comPorts: 2, usbPorts: 4,
    image: ibox103Img,
    features: [
      "Ultra-compact Fanless Design",
      "2-4× GbE LAN",
      "Low Power TDP 10W",
      "DIN-rail Mount Support",
    ],
    applications: ["Edge Gateway", "Digital Signage", "Thin Client"],
    priceRange: "฿15,000 - ฿25,000",
  },
  {
    id: "ibox-104v2",
    name: "IBOX-104V2",
    nameTH: "Compact Fanless Network PC",
    category: ["embedded"],
    cpu: "Intel Celeron J4125 / N5105",
    cpuGen: "Gemini Lake / Jasper Lake",
    ram: "Up to 16GB DDR4",
    storage: "M.2 SATA + mSATA",
    io: "4× USB, 2× COM, 4× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 4, comPorts: 2, usbPorts: 4,
    image: ibox104v2Img,
    features: [
      "4× Intel GbE LAN",
      "Fanless Passive Cooling",
      "Compact Size",
      "pfSense/OPNsense Compatible",
    ],
    applications: ["Firewall", "Network Gateway", "VPN Router"],
    priceRange: "฿18,000 - ฿28,000",
  },
  {
    id: "ibox-205",
    name: "IBOX-205",
    nameTH: "Embedded PC 4 LAN 2 COM",
    category: ["embedded"],
    cpu: "Intel Core i3/i5/i7 (12th Gen)",
    cpuGen: "12th Gen",
    ram: "Up to 64GB DDR4",
    storage: "M.2 NVMe + 2.5\" SATA",
    io: "6× USB, 2× COM, 4× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 4, comPorts: 2, usbPorts: 6, pcie: true,
    image: ibox205Img,
    features: [
      "Intel 12th Gen Core Processor",
      "4× Intel GbE LAN",
      "PCIe Expansion Support",
      "Fanless Industrial Grade",
    ],
    applications: ["Industrial Automation", "Edge Computing", "IoT Gateway"],
    priceRange: "฿45,000 - ฿75,000",
  },
  {
    id: "ibox-603",
    name: "IBOX-603",
    nameTH: "Mid-range Embedded Box PC",
    category: ["embedded"],
    cpu: "Intel Core i3/i5/i7 (6th-8th Gen)",
    cpuGen: "6th-8th Gen",
    ram: "Up to 32GB DDR4",
    storage: "M.2 SATA + 2.5\" SATA",
    io: "6× USB, 4× COM, 2× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 2, comPorts: 4, usbPorts: 6,
    image: ibox603Img,
    features: [
      "Rich COM Ports (4× RS232/RS485)",
      "Dual GbE LAN",
      "Compact Fanless Design",
      "Wide Voltage Input",
    ],
    applications: ["Factory Automation", "POS System", "Kiosk"],
    priceRange: "฿35,000 - ฿55,000",
  },
  {
    id: "ibox-604",
    name: "IBOX-604",
    nameTH: "Multi-LAN Embedded Box PC",
    category: ["embedded"],
    cpu: "Intel Core i3/i5/i7 (6th-8th Gen)",
    cpuGen: "6th-8th Gen",
    ram: "Up to 32GB DDR4",
    storage: "M.2 + 2.5\" SATA",
    io: "4× USB, 2× COM, 5× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 5, comPorts: 2, usbPorts: 4,
    image: ibox604Img,
    features: [
      "5× GbE LAN Ports",
      "Fanless Aluminum Chassis",
      "PCIe Expansion",
      "Wide DC Input",
    ],
    applications: ["Network Appliance", "Edge Gateway", "Firewall"],
    priceRange: "฿40,000 - ฿65,000",
  },
  {
    id: "vbox-105",
    name: "VBOX-105",
    nameTH: "Ultra-compact Fanless Box PC",
    category: ["embedded"],
    cpu: "Intel Celeron / Core i3 (10th Gen)",
    cpuGen: "10th Gen",
    ram: "Up to 16GB DDR4",
    storage: "M.2 2242 + 2.5\" SATA",
    io: "4× USB, 2× COM, 2× LAN",
    temp: "-10°C ~ 60°C",
    lanPorts: 2, comPorts: 2, usbPorts: 4,
    image: vbox105Img,
    features: [
      "Ultra-compact Size",
      "Dual GbE LAN",
      "Fanless Silent Operation",
      "VESA/DIN-rail Mount",
    ],
    applications: ["Digital Signage", "Thin Client", "IoT Edge"],
    priceRange: "฿20,000 - ฿35,000",
  },

  // === CLASSIC iBox (existing) ===
  {
    id: "ibox-501",
    name: "iBox-501",
    nameTH: "Fanless Mini PC Celeron",
    category: ["classic"],
    cpu: "Intel Celeron Haswell 2980U Dual Core 1.6GHz",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_f038b57570074d0ab2559ba322f4bc66~mv2.png/v1/fill/w_427,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.png",
    features: ["Fanless Design", "Aluminum Body", "Auto Power On"],
    applications: ["Digital Signage", "Thin Client"],
  },
  {
    id: "ibox-502",
    name: "iBox-502",
    nameTH: "Fanless Mini PC Kaby Lake",
    category: ["classic"],
    cpu: "Intel Celeron Kaby Lake R 3867U Dual Core 1.8GHz",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_9a7f36ff7ec74fe9a0948c574d3a11e7~mv2.png/v1/fill/w_427,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
    features: ["Fanless Design", "Aluminum Body", "Auto Power On"],
    applications: ["Digital Signage", "Thin Client"],
  },
  {
    id: "ibox-601-classic",
    name: "iBox-601",
    nameTH: "Fanless Mini PC Skylake",
    category: ["classic"],
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_d29508368a6a4e8f818fddbf462bc218~mv2.png/v1/fill/w_415,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
    features: ["Fanless Design", "Aluminum Body", "PXE Boot"],
    applications: ["Factory Automation", "POS System"],
  },
  {
    id: "ibox-602-classic",
    name: "iBox-602",
    nameTH: "Fanless Mini PC Skylake",
    category: ["classic"],
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_58cd008689cf4744a2bd3ef684f1c79a~mv2.png/v1/fill/w_427,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
    features: ["Fanless Design", "Aluminum Body", "Watchdog Timer"],
    applications: ["Industrial Automation", "Kiosk"],
  },
  {
    id: "ibox-603-classic",
    name: "iBox-603",
    nameTH: "Fanless Mini PC Pure Aluminum",
    category: ["classic"],
    cpu: "Intel Core 6th Gen Skylake",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_6683a1156b064f5f9b0cd7ad4ec1ae1b~mv2.png/v1/fill/w_427,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
    features: ["Pure Aluminum Body", "Fanless Design", "Timing Boot"],
    applications: ["Digital Signage", "Automation"],
  },
  {
    id: "ibox-701",
    name: "iBox-701",
    nameTH: "Fanless Mini PC Core i5",
    category: ["classic"],
    cpu: "Intel Core i5-7200U",
    ram: "4 GB (ปรับแต่งได้)",
    storage: "SSD 128 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_d29cb490908741ba9094eef2a7ea3904~mv2.png/v1/fill/w_415,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
    features: ["Core i5 Performance", "Fanless Design", "Aluminum Body"],
    applications: ["Edge Computing", "Thin Client"],
  },
  {
    id: "ibox-801",
    name: "iBox-801",
    nameTH: "Fanless Mini PC 8th Gen",
    category: ["classic"],
    cpu: "Intel Celeron / Core i5-8265U / Core i7-8565U",
    ram: "8 GB (ปรับแต่งได้)",
    storage: "SSD 256 GB (ปรับแต่งได้)",
    io: "USB, COM, LAN",
    temp: "0°C ~ 60°C",
    image: "https://static.wixstatic.com/media/0597a3_d29508368a6a4e8f818fddbf462bc218~mv2.png/v1/fill/w_415,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
    features: ["8th Gen Core i5/i7", "Fanless Design", "Aluminum Body"],
    applications: ["Industrial Automation", "Edge Computing"],
  },
];

const categories: { key: ProductCategory; label: string; icon: typeof Cpu }[] = [
  { key: "all", label: "ทั้งหมด", icon: Box },
  { key: "hot", label: "🔥 Hot Products", icon: Flame },
  { key: "embedded", label: "Embedded Box PC", icon: HardDrive },
  { key: "edge", label: "Edge AI / GPU", icon: BrainCircuit },
  { key: "vision", label: "Machine Vision", icon: Eye },
  { key: "arm", label: "ARM Controller", icon: Cpu },
  { key: "classic", label: "Classic iBox", icon: Monitor },
];

const highlights = [
  { icon: Thermometer, title: "ทนอุณหภูมิ -20°C ถึง 60°C", desc: "ออกแบบให้ทำงานได้ในสภาพแวดล้อมที่มีอุณหภูมิสูงหรือต่ำ" },
  { icon: Zap, title: "Fanless — ไร้พัดลม", desc: "ครีบระบายความร้อนอะลูมิเนียม ไม่มีพัดลม ลดปัญหาฝุ่นและเสียง" },
  { icon: Layers, title: "PCI Express Expansion", desc: "เพิ่มการ์ดได้ รองรับ GPU, PoE, LAN Card" },
  { icon: Network, title: "Multi-LAN สูงสุด 10 พอร์ต", desc: "เชื่อมต่อเครือข่ายหลายช่องพร้อม PoE สำหรับ Machine Vision" },
  { icon: Wifi, title: "4G/5G Module Ready", desc: "M.2 B-Key + Nano SIM สำหรับเชื่อมต่อมือถือ" },
  { icon: Shield, title: "Industrial Grade Chassis", desc: "อะลูมิเนียมเกรดสูง ทนทาน ระบายความร้อนดีเยี่ยม" },
];

const useCasesData = [
  { title: "Industrial Automation", desc: "ควบคุมระบบ PLC, SCADA และ HMI บนสายการผลิต", icon: Factory, image: usecaseAutomation },
  { title: "Medical & Healthcare", desc: "ระบบ EMR, มอนิเตอร์สัญญาณชีพ ในโรงพยาบาล", icon: Stethoscope, image: usecaseMedical },
  { title: "Logistics & Transportation", desc: "ศูนย์ควบคุมการขนส่ง ติดตามยานพาหนะ Real-time", icon: Truck, image: usecaseLogistics },
  { title: "Warehouse Management", desc: "ระบบจัดการคลังสินค้า สแกนบาร์โค้ด ตรวจนับสต็อก", icon: Warehouse, image: usecaseWarehouse },
  { title: "Machine Vision", desc: "ตรวจสอบคุณภาพชิ้นงาน ด้วยกล้องอุตสาหกรรมและ AI", icon: ScanLine, image: usecaseVision },
  { title: "Digital Signage", desc: "ป้ายโฆษณาดิจิทัล แสดงผลต่อเนื่อง 24/7", icon: Tv, image: usecaseSignage },
];

/* ═══════ Component ═══════ */
const IBoxSeries = () => {
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const { selectedProducts, toggleSelect, clearSelection } = useMultiSelect();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return allProducts;
    return allProducts.filter(p => p.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="iBox Series — Embedded Fanless Industrial PC" description="iBox Series คอมพิวเตอร์อุตสาหกรรมแบบ Fanless รองรับ Intel Core i9, GPU RTX, Machine Vision, Edge AI สำหรับงานอุตสาหกรรม" path="/ibox-series" />
      <ProductJsonLd
        collectionName="iBox Series Embedded Fanless Industrial PC"
        collectionDescription="iBox Series คอมพิวเตอร์อุตสาหกรรม Fanless สำหรับ Edge Computing, Machine Vision, AI Inference"
        collectionUrl="/ibox-series"
        products={allProducts.map(m => ({ name: m.name, image: m.image, description: m.nameTH, category: "Embedded Fanless Industrial PC" }))}
      />
      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "iBox Series", path: "/ibox-series" }]} />

      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={bannerIBox} alt="iBox Series — Industrial Mini PC" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">iBox & AEOLUS Series</h1>
            <p className="text-sm md:text-base text-white/80">Industrial PC — Fanless Embedded, Edge AI, Machine Vision, ARM Controller</p>
          </div>
        </div>
      </div>

      {/* Category Tabs - Sticky */}
      <div className="sticky top-[57px] z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-foreground whitespace-nowrap mr-2">📦 หมวดสินค้า:</span>
            {categories.map((cat) => (
              <Button
                key={cat.key}
                size="sm"
                variant={activeCategory === cat.key ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.key)}
                className="text-xs gap-1.5"
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4">สินค้า {filteredProducts.length} รุ่น</Badge>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
            คอมพิวเตอร์อุตสาหกรรม — iBox & AEOLUS Series
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            ครอบคลุมทุกความต้องการ ตั้งแต่ Embedded Box PC ขนาดเล็ก, Edge AI พร้อม GPU, Machine Vision Controller 
            ไปจนถึง ARM IoT Gateway — ทั้งหมดเป็น Industrial Grade ทนทานสำหรับงานอุตสาหกรรม
          </p>
        </section>

        {/* Highlights */}
        {activeCategory === "all" && (
          <section>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-8">จุดเด่น</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {highlights.map((h) => (
                <div key={h.title} className="card-surface p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{h.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Product Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">
            {activeCategory === "all" ? "รุ่นสินค้าทั้งหมด" : categories.find(c => c.key === activeCategory)?.label}
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {filteredProducts.length} รุ่น — คลิกเลือกเพื่อเปรียบเทียบหรือขอใบเสนอราคา
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((model) => (
              <div key={model.id} className={`card-surface overflow-hidden group transition-all ${selectedProducts.has(model.name) ? "ring-2 ring-primary border-primary/50" : "hover:border-primary/30"}`}>
                <div className="relative bg-secondary/30 p-6 flex items-center justify-center h-52">
                  <button onClick={() => toggleSelect(model.name)} className="absolute top-3 left-3 z-10">
                    <Checkbox checked={selectedProducts.has(model.name)} className="h-5 w-5" />
                  </button>
                  <WishlistHeart
                    item={{ id: model.id, name: model.name, category: "iBox Series", image: model.image, href: "/ibox-series", specs: model.cpu }}
                    className="absolute top-3 right-3"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-10 flex gap-1.5">
                    {model.isHot && <Badge className="bg-red-500/90 text-white text-[10px] px-1.5">🔥 HOT</Badge>}
                    {model.isNew && <Badge className="bg-emerald-500/90 text-white text-[10px] px-1.5">✨ NEW</Badge>}
                  </div>
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-foreground text-base">{model.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {model.cpuGen || "Fanless"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{model.nameTH}</p>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><span className="font-medium text-foreground">CPU:</span> {model.cpu}</p>
                    <p><span className="font-medium text-foreground">RAM:</span> {model.ram}</p>
                    <p><span className="font-medium text-foreground">Storage:</span> {model.storage}</p>
                    <p><span className="font-medium text-foreground">I/O:</span> {model.io}</p>
                    <p><span className="font-medium text-foreground">Temp:</span> {model.temp}</p>
                  </div>

                  {/* Quick Spec Badges */}
                  <div className="flex flex-wrap gap-1">
                    {model.lanPorts && <Badge variant="outline" className="text-[10px]">{model.lanPorts}× LAN</Badge>}
                    {model.comPorts && <Badge variant="outline" className="text-[10px]">{model.comPorts}× COM</Badge>}
                    {model.poe && <Badge variant="outline" className="text-[10px] border-amber-500/50 text-amber-600">PoE</Badge>}
                    {model.pcie && <Badge variant="outline" className="text-[10px] border-blue-500/50 text-blue-600">PCIe</Badge>}
                  </div>

                  {model.priceRange && (
                    <p className="text-xs font-semibold text-primary">{model.priceRange}</p>
                  )}

                  <div className="flex gap-2 pt-2 border-t border-border">
                    {model.externalUrl ? (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={model.externalUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3.5 h-3.5 mr-1" /> รายละเอียด
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setQuoteProduct(model.name)}>
                        <Download className="w-3.5 h-3.5 mr-1" /> สเปก
                      </Button>
                    )}
                    <Button size="sm" className="flex-1" onClick={() => setQuoteProduct(model.name)}>
                      <FileText className="w-3.5 h-3.5 mr-1" /> ขอราคา
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground text-center mb-2">เหมาะสำหรับงาน</h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            ใช้โปรแกรมได้หลากหลาย ในสำนักงาน โรงงานอุตสาหกรรม โรงเรียน
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCasesData.map((uc) => (
              <div key={uc.title} className="group card-surface overflow-hidden hover:border-primary/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={uc.image} alt={uc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
                      <uc.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{uc.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ iBox / AEOLUS Series?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกรุ่นและสเปกที่เหมาะกับงานของคุณ</p>
          <Button size="lg" onClick={() => setQuoteProduct("iBox Series")}>
            <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
          </Button>
        </div>
      </div>

      <QuoteDialog open={!!quoteProduct} onClose={() => setQuoteProduct(null)} productName={quoteProduct || ""} productCategory="iBox Series" />
      <MultiSelectQuoteBar selectedProducts={selectedProducts} onClear={clearSelection} productCategory="iBox Series" />
      <FooterCompact />
    </div>
  );
};

export default IBoxSeries;
