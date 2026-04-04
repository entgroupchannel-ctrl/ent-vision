// AI Edge Computing / GPU Products
// Embedded Box PC Products
import ibox601GtProMain from "@/assets/products/ibox-601-gt-pro-main.png";
import ibox601GtProAngle2 from "@/assets/products/ibox-601-gt-pro-angle2.png";
import ibox601GtProAngle3 from "@/assets/products/ibox-601-gt-pro-angle3.png";
import ibox601GtProDimension from "@/assets/products/ibox-601-gt-pro-dimension.png";

import ibox602GtProMain from "@/assets/products/ibox-602-gt-pro-main.png";
import ibox602GtProAngle2 from "@/assets/products/ibox-602-gt-pro-angle2.png";
import ibox602GtProAngle3 from "@/assets/products/ibox-602-gt-pro-angle3.png";
import ibox602GtProAngle4 from "@/assets/products/ibox-602-gt-pro-angle4.png";
import ibox602GtProDimension from "@/assets/products/ibox-602-gt-pro-dimension.png";

import ibox602Gt2pDimension from "@/assets/products/ibox-602-gt-2p-dimension.png";
import ibox602GtPro from "@/assets/products/ibox-602-gt-pro.png";
import ibox007pro from "@/assets/products/ibox-007pro.png";
import ibox007 from "@/assets/products/ibox-007.png";
import ibox601Gt2p from "@/assets/products/ibox-601-gt-2p.png";
import ibox601_9l2c4p from "@/assets/products/ibox-601-9l2c4p.png";

export interface IBoxProduct {
  id: string;
  name: string;
  nameTH: string;
  category: string;
  subcategory: string;
  formFactor: "fanless" | "mini" | "compact" | "embedded";
  performance: "entry" | "mid" | "high";
  image: string;
  dimensionImage?: string;
  gallery?: string[];
  specs: {
    cpu: string;
    cpuGen?: string;
    ram: string;
    storage: string;
    display?: string;
    io: string;
    comPorts?: number;
    lanPorts?: number;
    usbPorts?: number;
    poe?: boolean;
    pcie?: boolean;
    temp: string;
  };
  features: string[];
  applications: string[];
  datasheet: string;
  priceRange?: string;
  isNew?: boolean;
  isHot?: boolean;
}

export const iboxProducts: IBoxProduct[] = [
  // ═══════ AI Edge Computing / GPU ═══════
  {
    id: "IBOX-601-GT-PRO",
    name: "Edge AI Industrial PC with GPU Support",
    nameTH: "คอมพิวเตอร์อุตสาหกรรม Edge AI พร้อมรองรับ GPU",
    category: "AI Edge Computing",
    subcategory: "GPU Box PC",
    formFactor: "embedded",
    performance: "high",
    image: ibox601GtProMain,
    gallery: [ibox601GtProAngle2, ibox601GtProAngle3],
    dimensionImage: ibox601GtProDimension,
    specs: {
      cpu: "Intel Core i9/i7/i5/i3 (12th/13th/14th Gen)",
      cpuGen: "12th-14th Gen",
      ram: "Up to 128GB DDR4 3200MHz (Dual Channel SO-DIMM)",
      storage: "2x M.2 NVMe + 4x SATA RAID 0/1/5/10 + mSATA",
      io: "8x USB (4x USB3.2 Gen2 + 4x USB3.0), 2x COM, 9x LAN",
      comPorts: 2,
      lanPorts: 9,
      usbPorts: 8,
      poe: true,
      pcie: true,
      temp: "-20°C ~ 55°C",
    },
    features: [
      "Intel 12th/13th/14th Gen Core Desktop CPU (LGA1700)",
      "Intel H770 Chipset",
      "PCIe 4.0 x16 สำหรับ GPU Discrete (หรือ 2x PCIe 4.0 x8)",
      "9x GbE LAN (Intel i210/i219/i226) รองรับ PoE",
      "Dual M.2 NVMe + 4x SATA RAID Support",
      "M.2 B-key สำหรับ 4G/5G Module",
      "Wide DC 19-36V Input",
      "Fanless Rugged Aluminum Chassis",
    ],
    applications: ["AI Inference", "Deep Learning", "Edge AI", "Machine Vision", "Autonomous Systems"],
    datasheet: "/datasheets/IBOX-601-GT-PRO.pdf",
    priceRange: "฿120,000 - ฿200,000",
    isHot: true,
    isNew: true,
  },
  {
    id: "IBOX-602-GT-PRO",
    name: "GPU Industrial PC for Edge AI with RTX Support",
    nameTH: "คอมพิวเตอร์อุตสาหกรรม GPU สำหรับ Edge AI รองรับ RTX 3090/4090",
    category: "AI Edge Computing",
    subcategory: "GPU Box PC",
    formFactor: "embedded",
    performance: "high",
    image: ibox602GtProMain,
    gallery: [ibox602GtProAngle2, ibox602GtProAngle3, ibox602GtProAngle4],
    dimensionImage: ibox602GtProDimension,
    specs: {
      cpu: "Intel Core i9/i7/i5/i3 (12th/13th/14th Gen)",
      cpuGen: "12th-14th Gen",
      ram: "Up to 128GB DDR4 3200MHz (Dual Channel SO-DIMM)",
      storage: "2x M.2 NVMe + 4x SATA RAID 0/1/5/10 + mSATA",
      io: "8x USB (4x USB3.2 Gen2 + 4x USB3.0), 6x COM, 3x LAN",
      comPorts: 6,
      lanPorts: 3,
      usbPorts: 8,
      poe: false,
      pcie: true,
      temp: "-10°C ~ 60°C",
    },
    features: [
      "Intel 12th/13th/14th Gen Core Desktop CPU (LGA1700)",
      "Intel H770 Chipset",
      "PCIe 4.0 x16 รองรับ NVIDIA RTX 3090/4090",
      "3x GbE LAN (Intel i210/i219)",
      "4x Isolated COM + 2x RS232",
      "Dual M.2 NVMe + 4x SATA RAID Support",
      "DP 8K + HDMI 4K Display Output",
      "Wide DC 19-36V Input",
      "8-bit GPIO + Dual SIM สำหรับ 4G/5G",
    ],
    applications: ["AI Training", "Deep Learning", "3D Rendering", "Edge AI", "Computer Vision"],
    datasheet: "/datasheets/IBOX-602-GT-PRO.pdf",
    priceRange: "฿150,000 - ฿250,000",
    isHot: true,
    isNew: true,
  },
  {
    id: "IBOX-601-GT-2P",
    name: "GPU Industrial PC for Machine Vision",
    nameTH: "คอมพิวเตอร์อุตสาหกรรม GPU สำหรับ Machine Vision",
    category: "AI Edge Computing",
    subcategory: "GPU Box PC",
    formFactor: "embedded",
    performance: "high",
    image: ibox007pro,
    gallery: [ibox602GtPro, ibox007, ibox601_9l2c4p],
    dimensionImage: ibox601Gt2p,
    specs: {
      cpu: "Intel Core i3/i5/i7/i9 (12th-14th Gen LGA1700)",
      cpuGen: "14th Gen",
      ram: "Up to 128GB DDR4 (2x SO-DIMM)",
      storage: "2.5\" SATA + 4x SATA RAID + mSATA + M.2 NVMe",
      io: "8x USB, 2x COM, 9x LAN (6x PoE)",
      comPorts: 2,
      lanPorts: 9,
      usbPorts: 8,
      poe: true,
      pcie: true,
      temp: "-10°C ~ 55°C",
    },
    features: [
      "PCIe 4.0 x16 GPU Expansion",
      "6x PoE GbE LAN (Intel i226)",
      "Intel H770 Chipset",
      "RAID 0/1/5/10 Support",
      "Triple Display Support",
    ],
    applications: ["Multi-camera Inspection", "AI Inference", "Smart Manufacturing", "Deep Learning"],
    datasheet: "/datasheets/IBOX-601-GT-2P.pdf",
    priceRange: "฿185,000 - ฿245,000",
    isNew: true,
  },
  {
    id: "IBOX-602-GT-2P",
    name: "AI Edge Computing Industrial PC with Dual PCIe GPU",
    nameTH: "คอมพิวเตอร์อุตสาหกรรม AI Edge พร้อม GPU คู่",
    category: "AI Edge Computing",
    subcategory: "GPU Box PC",
    formFactor: "embedded",
    performance: "high",
    image: ibox007pro,
    gallery: [ibox602GtPro, ibox007, ibox601Gt2p],
    dimensionImage: ibox602Gt2pDimension,
    specs: {
      cpu: "Intel Core i3/i5/i7/i9 (12th-14th Gen LGA1700)",
      cpuGen: "14th Gen",
      ram: "Up to 128GB DDR4 (2x SO-DIMM)",
      storage: "M.2 NVMe Gen4 + 4x SATA RAID + mSATA",
      io: "11x USB, 6x COM, 3x LAN",
      comPorts: 6,
      lanPorts: 3,
      usbPorts: 11,
      poe: false,
      pcie: true,
      temp: "-10°C ~ 55°C",
    },
    features: [
      "Dual PCIe Expansion (x16 + x4 หรือ 2x8)",
      "Intel UHD Graphics 770 (Xe Architecture)",
      "4x Isolated RS232/485 with ESD Protection",
      "Support RAID 0/1/5/10",
      "Wide 9-36V DC Input",
      "Hybrid Active + Passive Cooling",
    ],
    applications: ["AI Vision", "Deep Learning", "Machine Vision", "Video Analytics", "Edge Computing"],
    datasheet: "/datasheets/IBOX-602-GT-2P.pdf",
    priceRange: "฿175,000 - ฿220,000",
    isNew: true,
  },
];

// Helper: get product by id
export const getIBoxProduct = (id: string) => iboxProducts.find((p) => p.id === id);

// Helper: get related products
export const getRelatedProducts = (id: string, limit = 3) =>
  iboxProducts.filter((p) => p.id !== id && p.category === iboxProducts.find((x) => x.id === id)?.category).slice(0, limit);
