import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WishlistHeart from "@/components/WishlistHeart";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Thermometer, Wind, Shield, Zap, Server, Layers, Settings, Box, Maximize, ChevronDown, Monitor, HardDrive, Wifi, Power, PlugZap, Expand, Filter, SlidersHorizontal, DollarSign, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";
import FooterCompact from "@/components/FooterCompact";
import PriceDisclaimer from "@/components/PriceDisclaimer";
import QuoteDialog from "@/components/QuoteDialog";
import { LineQRDialog } from "@/components/LineQRDialog";

const features = [
  { icon: Wind, title: "Fanless Design", desc: "เงียบสนิท ไม่มีชิ้นส่วนเคลื่อนไหว อายุการใช้งานยาวนาน" },
  { icon: Layers, title: "LEGO Mode Design", desc: "ระบบโมดูลาร์ ปรับแต่งและขยายระบบได้ตามใจ ไม่ต้องเปลี่ยนเครื่องใหม่" },
  { icon: Shield, title: "Industrial-Grade จริง", desc: "ออกแบบ ทดสอบ และรับรองมาตรฐานสำหรับโรงงานจริง" },
  { icon: Thermometer, title: "ทำงาน 24/7", desc: "ทนทุกสภาพแวดล้อม ฝุ่น ความร้อน การสั่นสะเทือน MTBF 60,000 ชั่วโมง" },
];

const certifications = [
  "✅ วิศวกรรมเฉพาะทาง: ออกแบบเพื่อสภาพแวดล้อมโรงงานโดยตรง",
  "✅ ทดสอบเข้มงวด: ผ่านการทดสอบในสภาวะจริงหลากหลายรูปแบบ",
  "✅ รับรองมาตรฐาน: ได้รับการรับรองสำหรับการทำงานที่เชื่อถือได้",
  "✅ พิสูจน์ในสนาม: ใช้งานจริงในโรงงานทั่วโลก",
];

// Shared spec table structure
const sharedSpecs = {
  cpu: [
    "Intel® Celeron® Processor J1900 2.0~2.42GHz",
    "Intel® Celeron® Processor J6412 2.0~2.6GHz",
    "Intel® Core™ 10th i3-10110U 2.1~4.1GHz",
    "Intel® Core™ 10th i5-10210U 1.6~4.2GHz",
    "Intel® Core™ 10th i7-10710U 1.1~4.7GHz",
    "Intel® Core™ 12th i3-1215U 1.2~4.4GHz",
    "Intel® Core™ 12th i5-1235U 1.3~4.4GHz",
    "Intel® Core™ 12th i5-1240P 1.7~4.4GHz",
    "Intel® Core™ 12th i7-1255U 1.7~4.7GHz",
  ],
  memory: "4~8GB DDR3L / 4~32GB DDR4 / 4~32GB DDR5",
  storage: "1 × mSATA SSD",
  cooling: "Fan-less",
  os: "Windows 10/11 / Linux Ubuntu",
  display: "1×HDMI + 1×VGA Dual Display",
  audio: "1×Audio",
  expansion: "1×Mini PCIe Socket",
  ethernet: "2×10M/100M/1000M Intel I210 LAN",
  wireless: "4G Full Network Compatibility (Optional)",
  wifi: "Wi-Fi / Bluetooth",
  power: "1×3-pin Pluggable Terminal Block for 12V DC, 9-36V optional",
  booting: "AT / ATX",
};

// Product selection data for each series
const productSelection10XA = [
  { no: 1, model: "EPC-106A", partNo: "C10.01.01.001", cpu: "Intel® Celeron® J1900", memory: "4GB", storage: "mSATA SSD 128GB" },
  { no: 2, model: "EPC-107A", partNo: "C10.01.05.001", cpu: "Intel® Celeron® J6412", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 3, model: "EPC-109A", partNo: "C10.01.03.001", cpu: "Intel® Core™ i3-10110U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 4, model: "EPC-109A", partNo: "C10.01.03.002", cpu: "Intel® Core™ i5-10210U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 5, model: "EPC-109A", partNo: "C10.01.03.003", cpu: "Intel® Core™ i7-10710U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 6, model: "EPC-102A", partNo: "C10.01.04.001", cpu: "Intel® Core™ i3-1215U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 7, model: "EPC-102A", partNo: "C10.01.04.002", cpu: "Intel® Core™ i5-1235U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 8, model: "EPC-102A", partNo: "C10.01.04.003", cpu: "Intel® Core™ i5-1240P", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 9, model: "EPC-102A", partNo: "C10.01.04.004", cpu: "Intel® Core™ i7-1255U", memory: "8GB", storage: "mSATA SSD 256GB" },
];

const productSelection20XA = [
  { no: 1, model: "EPC-206A", partNo: "C10.02.01.001", cpu: "Intel® Celeron® J1900", memory: "4GB", storage: "mSATA SSD 128GB" },
  { no: 2, model: "EPC-207A", partNo: "C10.02.05.001", cpu: "Intel® Celeron® J6412", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 3, model: "EPC-209A", partNo: "C10.02.03.001", cpu: "Intel® Core™ i3-10110U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 4, model: "EPC-209A", partNo: "C10.02.03.002", cpu: "Intel® Core™ i5-10210U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 5, model: "EPC-209A", partNo: "C10.02.03.003", cpu: "Intel® Core™ i7-10710U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 6, model: "EPC-202A", partNo: "C10.02.04.001", cpu: "Intel® Core™ i3-1215U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 7, model: "EPC-202A", partNo: "C10.02.04.002", cpu: "Intel® Core™ i5-1235U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 8, model: "EPC-202A", partNo: "C10.02.04.003", cpu: "Intel® Core™ i5-1240P", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 9, model: "EPC-202A", partNo: "C10.02.04.004", cpu: "Intel® Core™ i7-1255U", memory: "8GB", storage: "mSATA SSD 256GB" },
];

const productSelection30XA = [
  { no: 1, model: "EPC-306A", partNo: "C10.03.01.001", cpu: "Intel® Celeron® J1900", memory: "4GB", storage: "mSATA SSD 128GB" },
  { no: 2, model: "EPC-307A", partNo: "C10.03.04.001", cpu: "Intel® Celeron® J6412", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 3, model: "EPC-309A", partNo: "C10.03.03.001", cpu: "Intel® Core™ i3-10110U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 4, model: "EPC-309A", partNo: "C10.03.03.002", cpu: "Intel® Core™ i5-10210U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 5, model: "EPC-309A", partNo: "C10.03.03.003", cpu: "Intel® Core™ i7-10710U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 6, model: "EPC-302A", partNo: "C10.03.04.001", cpu: "Intel® Core™ i3-1215U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 7, model: "EPC-302A", partNo: "C10.03.04.002", cpu: "Intel® Core™ i5-1235U", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 8, model: "EPC-302A", partNo: "C10.03.04.003", cpu: "Intel® Core™ i5-1240P", memory: "8GB", storage: "mSATA SSD 256GB" },
  { no: 9, model: "EPC-302A", partNo: "C10.03.04.004", cpu: "Intel® Core™ i7-1255U", memory: "8GB", storage: "mSATA SSD 256GB" },
];

interface SeriesData {
  id: string;
  name: string;
  tagline: string;
  taglineEn: string;
  desc: string;
  image: string;
  datasheetUrl: string;
  comPorts: string;
  usbPorts: { usb2: string; usb3: string };
  dimensions?: string;
  highlight: string;
  badge?: boolean;
  gallery?: string[];
  features: { title: string; titleEn: string; points: string[] }[];
  productSelection: typeof productSelection10XA;
  applications: string[];
}

const epcSeries: SeriesData[] = [
  {
    id: "10xa",
    name: "EPC-10XA Series",
    tagline: "Compact & Affordable",
    taglineEn: "Entry-Level Industrial PC",
    desc: "คอมพิวเตอร์อุตสาหกรรมระดับเริ่มต้นที่ไม่ธรรมดา เงียบจริง ทนจริง ด้วยเทคโนโลยี Fanless — ยืดหยุ่นสุดขีดด้วยระบบ LEGO MODE โครงสร้างอลูมิเนียม 200mm แกร่งกว่าที่คิด",
    image: "https://static.wixstatic.com/media/0597a3_e66a5a6616b64254a920d2c6f05b93f8~mv2.png/v1/fill/w_258,h_261,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_24_48.png",
    datasheetUrl: "https://docs.wixstatic.com/ugd/0597a3_7c5d5ac786764ef2b4fd3910060c41b6.pdf",
    comPorts: "2×RS232 + 1×RS485 DB9",
    usbPorts: { usb2: "5×USB2.0 / 2×USB2.0", usb3: "1×USB3.0 / 4×USB3.0" },
    dimensions: "200mm compact",
    highlight: "เริ่มต้น",
    gallery: [
      "https://static.wixstatic.com/media/0597a3_4681e86fee384a13953cfc1477fe4eeb~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
      "https://static.wixstatic.com/media/0597a3_7043dbbbf77841f599d56ca8bd1c8eeb~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
      "https://static.wixstatic.com/media/0597a3_a33086dc821449789942597ff318195f~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_a33086dc821449789942597ff318195f~mv2.png",
    ],
    features: [
      {
        title: "Fanless ออกแบบแบบไร้พัดลม",
        titleEn: "Silent & Reliable",
        points: ["เงียบสนิท ไม่มีชิ้นส่วนเคลื่อนไหวที่จะเสียหาย", "อายุการใช้งานที่ยาวนานกว่าเดิม"],
      },
      {
        title: "ยืดหยุ่นสุดขีดด้วย LEGO MODE",
        titleEn: "Modular Flexibility",
        points: ["ปรับแต่งและขยายระบบได้ตามใจ", "ไม่ต้องเปลี่ยนเครื่องใหม่ทั้งหมด"],
      },
      {
        title: "พลังประมวลผลที่เลือกได้",
        titleEn: "Scalable Performance",
        points: ["Celeron J1900/J6412 ประหยัดไฟ", "Intel Core 10th/12th Gen สมรรถนะสูง"],
      },
      {
        title: "โครงสร้างอลูมิเนียม 200mm",
        titleEn: "Robust Chassis",
        points: ["แข็งแกร่งทนทานสภาพแวดล้อมอุตสาหกรรมหนัก", "มีระดับป้องกันสูง"],
      },
    ],
    productSelection: productSelection10XA,
    applications: ["ระบบควบคุมอัตโนมัติ (Automation Control)", "การประมวลผลริมขอบ (Edge Computing)", "งานที่ต้องการความน่าเชื่อถือสูง"],
  },
  {
    id: "20xa",
    name: "EPC-20XA Series",
    tagline: "Enhanced Expansion",
    taglineEn: "Enhanced Expansion Design",
    desc: "ความสูงเพิ่มจาก 47mm เป็น 79mm (+68% พื้นที่) พื้นที่ภายในมากขึ้นรองรับการขยายและระบายความร้อนดีขึ้น เหมาะกับ CPU ประสิทธิภาพสูง ทำงาน 24/7 ในโรงงานได้มั่นใจ",
    image: "https://static.wixstatic.com/media/0597a3_373c66cd76674aafb9d631325e3e3a26~mv2.png/v1/fill/w_347,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_57_50.png",
    datasheetUrl: "https://docs.wixstatic.com/ugd/0597a3_88901736999d4c28bf68d683143988c3.pdf",
    comPorts: "2×RS232 + 1×RS485 DB9",
    usbPorts: { usb2: "5×USB2.0 / 2×USB2.0", usb3: "1×USB3.0 / 4×USB3.0" },
    dimensions: "79mm height (+68%)",
    highlight: "ขยายได้",
    features: [
      {
        title: "Enhanced Expansion Design",
        titleEn: "การขยายตัวที่ดีขึ้น",
        points: ["ความสูงเพิ่มขึ้น: จาก 47mm เป็น 79mm (+68% พื้นที่)", "พื้นที่ภายในมากขึ้น: รองรับการขยายและระบายความร้อนดีขึ้น", "เหมาะสำหรับอุปกรณ์เสริมและโมดูลเพิ่มเติม"],
      },
      {
        title: "Superior Thermal Management",
        titleEn: "การระบายความร้อนที่เหนือกว่า",
        points: ["Cooling Space เพิ่มขึ้น: รองรับ CPU ประสิทธิภาพสูง", "Stable Operation: ทำงานต่อเนื่องในสภาพแวดล้อมหนัก", "High-Performance Ready: เหมาะกับ Core i5/i7 รุ่นใหม่"],
      },
      {
        title: "Professional Grade Applications",
        titleEn: "ระดับมืออาชีพ",
        points: ["Complex Industrial Control: ระบบควบคุมที่ซับซ้อน", "Multi-Device Connectivity: เชื่อมต่ออุปกรณ์หลายตัวพร้อมกัน", "Extended Operating Hours: ทำงาน 24/7 ได้มั่นใจ"],
      },
    ],
    productSelection: productSelection20XA,
    applications: ["Complex Industrial Control", "Multi-Device Connectivity", "24/7 Heavy-Duty Operation"],
  },
  {
    id: "30xa",
    name: "EPC-30XA Series",
    tagline: "Wider Form Factor",
    taglineEn: "Wider Form Factor Design",
    desc: "กว้าง 337mm (+47% จาก EPC-20XA) ความสูงเพียง 47.5mm (บางกว่า EPC-20XA) — ครีบระบายความร้อนขนาดใหญ่พิเศษ เหมาะกับ Rack Mount และ Panel Mount",
    image: "https://static.wixstatic.com/media/0597a3_66f688e771804493b4e10e4daf7dd19a~mv2.png/v1/fill/w_410,h_247,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2022_19_47.png",
    datasheetUrl: "https://docs.wixstatic.com/ugd/0597a3_95fc75ebfd0641c6be57dc1491e93f43.pdf",
    comPorts: "4×RS232 + 2×RS485 DB9",
    usbPorts: { usb2: "5×USB2.0 / 2×USB2.0", usb3: "1×USB3.0 / 4×USB3.0" },
    dimensions: "337mm wide, Low Profile 47.5mm",
    highlight: "Rack Mount",
    gallery: [
      "https://static.wixstatic.com/media/0597a3_58406a7c4f4f4150ae07b2d6376366b0~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_58406a7c4f4f4150ae07b2d6376366b0~mv2.png",
      "https://static.wixstatic.com/media/0597a3_0367da74dfe34d24971aeda0f990b9a2~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_0367da74dfe34d24971aeda0f990b9a2~mv2.png",
      "https://static.wixstatic.com/media/0597a3_722adc2902d94e0aa1c6d285e63a01b5~mv2.png/v1/fill/w_335,h_303,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_722adc2902d94e0aa1c6d285e63a01b5~mv2.png",
    ],
    features: [
      {
        title: "Wider Form Factor Design",
        titleEn: "รูปทรงกว้างเพื่อประสิทธิภาพ",
        points: ["ความกว้าง: 337mm (+47% จาก EPC-20XA)", "Low Profile: ความสูงเพียง 47.5mm", "พื้นที่ระบายความร้อนเพิ่มขึ้นอย่างมีนัยสำคัญ"],
      },
      {
        title: "Superior Thermal Performance",
        titleEn: "การระบายความร้อนเหนือชั้น",
        points: ["Larger Heat Dissipation Surface", "Extended Cooling Fins ขนาดใหญ่พิเศษ", "รองรับ Core i5/i7 12th Gen ได้เต็มประสิทธิภาพ"],
      },
      {
        title: "Professional Installation Flexibility",
        titleEn: "ความยืดหยุ่นในการติดตั้ง",
        points: ["Rack Mount Friendly", "Panel Mount Options: cutout 327×100mm", "Industrial Cabinet Integration"],
      },
      {
        title: "Enhanced Stability",
        titleEn: "ความเสถียรที่เหนือกว่า",
        points: ["Better Weight Distribution", "Reduced Vibration Impact", "MTBF 60,000 ชั่วโมง"],
      },
    ],
    productSelection: productSelection30XA,
    applications: ["Rack Mount Systems", "Panel Mount Installations", "Industrial Cabinet Integration"],
  },
  {
    id: "40xa",
    name: "EPC-40XA Series",
    tagline: "Flagship Model",
    taglineEn: "รุ่นเรือธงของซีรีส์",
    desc: "Maximum Form Factor: 337×160×79.5mm (ใหญ่ที่สุดในซีรีส์) รวมจุดเด่นของ EPC-20XA (สูง) + EPC-30XA (กว้าง) — พื้นผิวระบายความร้อน +168% จาก EPC-10XA พร้อมสำหรับงานวิกฤต",
    image: "https://static.wixstatic.com/media/0597a3_97f200930e3047dc887b96a9e8c48203~mv2.png/v1/fill/w_398,h_225,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2022_28_06.png",
    datasheetUrl: "https://docs.wixstatic.com/ugd/0597a3_d306bb34abe6432eba8b356ecbe755e1.pdf",
    comPorts: "4×RS232 + 2×RS485 DB9",
    usbPorts: { usb2: "5×USB2.0 / 2×USB2.0", usb3: "1×USB3.0 / 4×USB3.0" },
    dimensions: "337×160×79.5mm Flagship",
    highlight: "Flagship",
    badge: true,
    features: [
      {
        title: "Flagship Model",
        titleEn: "รุ่นเรือธงของซีรีส์",
        points: ["Maximum Form Factor: 337×160×79.5mm", "Best of Both Worlds: EPC-20XA (สูง) + EPC-30XA (กว้าง)", "Ultimate Performance Platform"],
      },
      {
        title: "Maximum Thermal Excellence",
        titleEn: "ระบายความร้อนสูงสุด",
        points: ["Largest Heat Dissipation Area (+168% จาก EPC-10XA)", "Optimized Thermal Channels", "Extreme Performance Ready"],
      },
      {
        title: "Ultimate Expansion & Stability",
        titleEn: "ขยายและเสถียรสูงสุด",
        points: ["Maximum Internal Space สำหรับโมดูลเสริม", "Enhanced Mechanical Robustness", "Superior Vibration Resistance"],
      },
      {
        title: "Mission-Critical Ready",
        titleEn: "พร้อมสำหรับงานวิกฤต",
        points: ["24/7 Heavy-Duty Operation ทำงานหนักต่อเนื่อง", "Extreme Environment Capable", "Maximum Reliability: MTBF 60,000 ชั่วโมง"],
      },
    ],
    productSelection: [], // Same as 30XA models with 4xx naming
    applications: ["24/7 Heavy-Duty Operation", "Mission-Critical Systems", "Extreme Environment"],
  },
];

const priceList = [
  { no: 1, model: "EPC-106A / EPC-206A", spec: "J1900/4G RAM/128G SSD/12V DC", price: "14,990" },
  { no: 2, model: "EPC-107A / EPC-207A", spec: "J6412/4G RAM/128G SSD/12V DC", price: "13,990" },
  { no: 3, model: "EPC-109A / EPC-209A", spec: "i3-10110U/4G RAM/128G SSD/12V DC", price: "30,990" },
  { no: 4, model: "EPC-109A / EPC-209A", spec: "i5-10210U/4G RAM/128G SSD/12V DC", price: "36,990" },
  { no: 5, model: "EPC-109A / EPC-209A", spec: "i7-10510U/4G RAM/128G SSD/12V DC", price: "39,990" },
  { no: 6, model: "EPC-102A / EPC-202A", spec: "i3-1215U/4G RAM/128G SSD/12V DC", price: "30,990" },
  { no: 7, model: "EPC-102A / EPC-202A", spec: "i5-1235U/4G RAM/128G SSD/12V DC", price: "35,990" },
  { no: 8, model: "EPC-102A / EPC-202A", spec: "i7-1250U/4G RAM/128G SSD/12V DC", price: "39,990" },
];

const windowsOptions = [
  { no: 1, product: "Windows 10 Pro OEM", price: "฿3,950" },
  { no: 2, product: "Windows 11 Pro OEM", price: "฿4,590" },
  { no: 3, product: "Windows 10 IOT", price: "฿3,950" },
  { no: 4, product: "Windows 11 IOT", price: "฿4,590" },
  { no: 5, product: "Upgrade จาก Wifi ABGN/AC > Wifi6", price: "Call" },
  { no: 6, product: "4G Sim Card", price: "Call" },
  { no: 7, product: "5G Sim Card", price: "Call" },
  { no: 8, product: "ซื้อประกันเพิ่ม ปีที่ 2", price: "15%" },
  { no: 9, product: "ซื้อประกันเพิ่ม ปีที่ 3", price: "20%" },
];

// Spec Table Component
const SpecTable = ({ series }: { series: SeriesData }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <tbody className="divide-y divide-border">
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground w-40 align-top bg-muted/20">CPU</td>
          <td className="px-4 py-3 text-muted-foreground">
            <div className="space-y-1">
              {sharedSpecs.cpu.map((c, i) => (
                <div key={i} className="text-sm">{c}</div>
              ))}
            </div>
          </td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Memory</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.memory}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Storage</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.storage}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Cooling</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.cooling}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">OS</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.os}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20" rowSpan={2}>I/O Ports</td>
          <td className="px-4 py-3 text-muted-foreground">
            <span className="font-medium text-foreground">USB2.0:</span> {series.usbPorts.usb2}
          </td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 text-muted-foreground">
            <span className="font-medium text-foreground">USB3.0:</span> {series.usbPorts.usb3}
          </td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">COM</td>
          <td className="px-4 py-3 text-muted-foreground">{series.comPorts}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Display</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.display}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Audio</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.audio}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Expansion</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.expansion}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Ethernet</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.ethernet}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Wireless</td>
          <td className="px-4 py-3 text-muted-foreground">
            <div>{sharedSpecs.wireless}</div>
            <div>{sharedSpecs.wifi}</div>
          </td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Power Supply</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.power}</td>
        </tr>
        <tr className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3 font-semibold text-foreground bg-muted/20">Booting</td>
          <td className="px-4 py-3 text-muted-foreground">{sharedSpecs.booting}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// Product Selection Table Component
const ProductSelectionTable = ({ products }: { products: typeof productSelection10XA }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-primary/10 border-b border-border">
          <th className="text-left px-4 py-3 font-semibold text-foreground w-12">No.</th>
          <th className="text-left px-4 py-3 font-semibold text-foreground">Model</th>
          <th className="text-left px-4 py-3 font-semibold text-foreground">Part Number</th>
          <th className="text-left px-4 py-3 font-semibold text-foreground">CPU</th>
          <th className="text-left px-4 py-3 font-semibold text-foreground">Memory</th>
          <th className="text-left px-4 py-3 font-semibold text-foreground">Storage</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {products.map((p) => (
          <tr key={`${p.model}-${p.partNo}`} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 text-muted-foreground">{p.no}</td>
            <td className="px-4 py-3 font-medium text-primary">{p.model}</td>
            <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.partNo}</td>
            <td className="px-4 py-3 text-foreground">{p.cpu}</td>
            <td className="px-4 py-3 text-muted-foreground">{p.memory}</td>
            <td className="px-4 py-3 text-muted-foreground">{p.storage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Series Section Component with Tabs
const SeriesSection = ({ series, index }: { series: SeriesData; index: number }) => {
  const isReversed = index % 2 === 1;

  return (
    <div className="card-surface overflow-hidden" id={series.id}>
      {/* Header with image and features */}
      <div className={`grid lg:grid-cols-5 gap-0`}>
        {/* Image side - 2 cols */}
        <div className={`lg:col-span-2 relative bg-secondary/30 p-8 flex flex-col items-center justify-center ${isReversed ? "lg:order-2" : ""}`}>
          {series.badge ? (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {series.highlight}
            </span>
          ) : (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border">
              {series.highlight}
            </span>
          )}
          <WishlistHeart
            item={{ id: series.id, name: series.name, category: "EPC Box Series", image: series.image, href: "/epc-box-series", specs: series.tagline }}
            className="absolute top-4 right-4 z-10"
          />
          <img
            src={series.image}
            alt={series.name}
            className="max-h-[220px] object-contain mb-4"
            loading="lazy"
          />
          {series.gallery && (
            <div className="flex gap-2 mt-2">
              {series.gallery.map((img, i) => (
                <img key={i} src={img} alt="" className="w-16 h-16 object-contain rounded-lg bg-background/50 p-1" loading="lazy" />
              ))}
            </div>
          )}
          <a
            href={series.datasheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Datasheet <ExternalLink size={14} />
          </a>
        </div>

        {/* Content side - 3 cols */}
        <div className={`lg:col-span-3 p-8 lg:p-10 ${isReversed ? "lg:order-1" : ""}`}>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{series.tagline}</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">{series.name}</h3>
          <p className="text-sm text-muted-foreground italic mb-4">{series.taglineEn}</p>
          <p className="text-muted-foreground mb-6 leading-relaxed">{series.desc}</p>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {series.features.map((f, i) => (
              <div key={i} className="rounded-lg border border-border p-4 hover:border-primary/30 transition-colors bg-background/50">
                <h4 className="text-sm font-bold text-foreground mb-1">{f.title}</h4>
                <p className="text-xs text-primary mb-2">{f.titleEn}</p>
                <ul className="space-y-1">
                  {f.points.map((p, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <Zap size={10} className="text-primary mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="flex flex-wrap gap-2">
            {series.applications.map((app, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-border">
        <Tabs defaultValue="spec" className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto border-b border-border bg-muted/30 p-0">
            <TabsTrigger
              value="spec"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold"
            >
              ►Specification
            </TabsTrigger>
            {series.productSelection.length > 0 && (
              <TabsTrigger
                value="selection"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold"
              >
                ►Product Selection
              </TabsTrigger>
            )}
            <TabsTrigger
              value="video"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold"
            >
              ►Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spec" className="mt-0 p-0">
            <SpecTable series={series} />
          </TabsContent>

          {series.productSelection.length > 0 && (
            <TabsContent value="selection" className="mt-0 p-0">
              <ProductSelectionTable products={series.productSelection} />
            </TabsContent>
          )}

          <TabsContent value="video" className="mt-0 p-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-muted/50 border border-border">
                <Monitor size={24} className="text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">EPC Box {series.name}</p>
                  <p className="text-sm text-muted-foreground">วิดีโอแนะนำสินค้า — ติดต่อทีมขายเพื่อรับลิงก์วิดีโอ</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const EPCBoxSeries = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="EPC Box Series — Fanless Modular Industrial PC" description="EPC Box Series คอมพิวเตอร์อุตสาหกรรม Fanless แบบ Modular LEGO MODE รองรับ Intel N100 ถึง Core i7 สำหรับโรงงานและ IoT" path="/epc-box-series" />
      <ProductJsonLd
        collectionName="EPC Box Series Fanless Modular Industrial PC"
        collectionDescription="EPC Box Series คอมพิวเตอร์อุตสาหกรรม Fanless แบบ Modular สำหรับโรงงานและ IoT"
        collectionUrl="/epc-box-series"
        products={priceList.map(m => ({ name: m.model, price: m.price, description: m.spec, category: "Fanless Modular Industrial PC" }))}      />

      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "EPC Box Series", path: "/epc-box-series" }]} />
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">EPC Box Series</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="relative container max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                CESIPC Partner
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 tracking-tight">
                EPC Box <span className="text-gradient">Series</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                โซลูชั่น Industrial Box PC ระดับโลก สำหรับอุตสาหกรรมไทย
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                คอมพิวเตอร์อุตสาหกรรมระบบ LEGO MODE ที่ใช้เทคโนโลยี Intel Core
                พร้อมการออกแบบแบบไร้พัดลมและโครงสร้างอลูมิเนียมที่แข็งแกร่ง
                เหมาะสำหรับงานอุตสาหกรรมหนักและระบบอัตโนมัติ
              </p>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                ในยุคที่ Industry 4.0 กำลังเปลี่ยนโฉมหน้าการผลิต
                การเลือกคอมพิวเตอร์อุตสาหกรรมที่เหมาะสมจึงเป็นกุญแจสำคัญของความสำเร็จ
                — Box PC จึงกลายเป็นตัวเลือกอันดับหนึ่งของโรงงานชั้นนำทั่วโลก
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://docs.wixstatic.com/ugd/0597a3_9dad5caa6c4d4410a723cab33c3177bf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  CESIPC E-Catalog <ExternalLink size={16} />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  ดูราคาสินค้า
                </a>
                <a
                  href="#10xa"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  ดูสินค้าทั้งหมด <ChevronDown size={16} />
                </a>
              </div>
            </div>
            <div className="card-surface p-6 flex items-center justify-center">
              <img
                src="https://static.wixstatic.com/media/0597a3_390ed059c959423d9c40be95b414b68f~mv2.png/v1/fill/w_403,h_293,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-28%20at%2021_03_54.png"
                alt="EPC Box Series"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-8 border-y border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <img
            src="https://static.wixstatic.com/media/0597a3_7c3f2bd701f340ee993f725c168c1bec~mv2.png/v1/fill/w_757,h_143,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2008_10_03.png"
            alt="Trusted by global industries"
            className="w-full max-w-3xl mx-auto h-auto opacity-70"
            loading="lazy"
          />
          <p className="text-center text-sm text-muted-foreground mt-4">
            สินค้าของเราได้รับการยอมรับและติดตั้งใช้งานกับอุตสาหกรรมระดับโลก
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">คุณสมบัติและประโยชน์เด่น</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              เทคโนโลยีชั้นนำ<span className="text-gradient">สำหรับอุตสาหกรรม</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-surface p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
                <f.icon className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Grade */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              อะไรทำให้เป็น <span className="text-gradient">Industrial-Grade จริงๆ?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CESIPC Industrial Box PC ไม่ได้แค่ติดป้าย "มาตรฐานอุตสาหกรรม" แต่ถูกออกแบบและผลิตให้ตอบสนองความต้องการที่เข้มงวดของสภาพแวดล้อมโรงงานจริง
            </p>
          </div>
          <div className="max-w-2xl mx-auto card-surface p-8">
            <div className="space-y-3">
              {certifications.map((c, i) => (
                <p key={i} className="text-muted-foreground">{c}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-6 border-b border-border sticky top-[65px] z-40 bg-background/90 backdrop-blur-lg">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground shrink-0 mr-2">Quick Nav:</span>
            {epcSeries.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all"
              >
                {s.name.replace(" Series", "")}
              </a>
            ))}
            <a
              href="#pricing"
              className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              ราคา
            </a>
          </div>
        </div>
      </section>

      {/* All Series with Tabs */}
      <section className="section-padding" id="models">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Product Lineup</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              ซีรีส์<span className="text-gradient">ทั้งหมด</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              เลือกขนาดที่เหมาะกับพื้นที่และความต้องการ — ตั้งแต่ Compact จนถึง Flagship พร้อม Specification, Product Selection และ Video ครบถ้วน
            </p>
          </div>

          <div className="space-y-10">
            {epcSeries.map((series, idx) => (
              <SeriesSection key={series.id} series={series} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Compare System */}
      <section className="section-padding bg-muted/30" id="comparison">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Quick Compare</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">เปรียบเทียบ<span className="text-gradient">ซีรีส์ทั้งหมด</span></h2>
            <p className="text-muted-foreground mt-3">เลือกมุมมอง สเปก / ราคา / ความคุ้มค่า พร้อมระบบกรอง</p>
          </div>
          <EPCComparisonSystem onQuote={(name) => { setQuoteProduct(name); setQuoteOpen(true); }} />
        </div>
      </section>

      {/* Price List */}
      <section className="section-padding" id="pricing">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Price List</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              ราคา<span className="text-gradient">สินค้า</span>
            </h2>
          </div>

          {/* Main price table */}
          <div className="card-surface overflow-hidden mb-8">
            <div className="px-6 py-4 bg-primary/10 border-b border-border">
              <h3 className="font-bold text-foreground">EPC Box Series — ราคาเริ่มต้น</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="text-left px-6 py-3 font-semibold text-foreground w-12">No.</th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Model</th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Specification</th>
                    <th className="text-right px-6 py-3 font-semibold text-foreground">ราคา (฿)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {priceList.map((item) => (
                    <tr key={`${item.model}-${item.no}`} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 text-muted-foreground">{item.no}</td>
                      <td className="px-6 py-3 font-medium text-foreground">{item.model}</td>
                      <td className="px-6 py-3 text-muted-foreground">{item.spec}</td>
                      <td className="px-6 py-3 text-right font-bold text-primary text-lg">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Windows / Options table */}
          <div className="card-surface overflow-hidden">
            <div className="px-6 py-4 bg-muted/30 border-b border-border">
              <h3 className="font-bold text-foreground">Windows License / Options</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/20 border-b border-border">
                    <th className="text-left px-6 py-3 font-semibold text-foreground w-12">No.</th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Product</th>
                    <th className="text-right px-6 py-3 font-semibold text-foreground">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {windowsOptions.map((opt) => (
                    <tr key={opt.no} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 text-muted-foreground">{opt.no}</td>
                      <td className="px-6 py-3 text-foreground">{opt.product}</td>
                      <td className="px-6 py-3 text-right font-semibold text-primary">{opt.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PriceDisclaimer />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl mx-auto text-center">
          <Settings className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            สนใจ EPC Box Series?<span className="text-gradient"> ปรึกษาเรา</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            ให้ทีมผู้เชี่ยวชาญช่วยเลือกรุ่นและ Configuration ที่เหมาะกับงานของคุณ
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setQuoteOpen(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors">
              ขอใบเสนอราคา
            </button>
            <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} productCategory="EPC Box Series" />
            <button
              onClick={() => setShowLineQR(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[hsl(142,70%,45%)] text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              LINE @entgroup
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-bold text-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft size={18} /> กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </section>
      <FooterCompact />
      <LineQRDialog open={showLineQR} onClose={() => setShowLineQR(false)} />
    </div>
  );
};

export default EPCBoxSeries;
