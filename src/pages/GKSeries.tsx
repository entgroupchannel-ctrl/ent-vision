import SEOHead from "@/components/SEOHead";
import ProductJsonLd from "@/components/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Monitor, Shield, Zap, Server, Layers, Settings, Maximize, Wifi, ChevronDown, Smartphone, Factory, BarChart3, Gauge, Headphones, Play } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import WishlistHeart from "@/components/WishlistHeart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-entgroup.avif";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";
import { LineQRDialog } from "@/components/LineQRDialog";
import gk1506img1 from "@/assets/gk-series/gk1506-1.jpg";
import gk1506img2 from "@/assets/gk-series/gk1506-2.jpg";
import gk1506img3 from "@/assets/gk-series/gk1506-3.jpg";
import gk1506img4 from "@/assets/gk-series/gk1506-4.jpg";
import gk1506img5 from "@/assets/gk-series/gk1506-5.jpg";
import gk1506img6 from "@/assets/gk-series/gk1506-6.jpg";
import gk1506banner from "@/assets/gk-series/gk1506-banner.jpg";
import gk1501front from "@/assets/gk-series/gk1501-front.png";
import gk1501back from "@/assets/gk-series/gk1501-back.jpg";
import gk1501io1 from "@/assets/gk-series/gk1501-io1.jpg";
import gk1501io2 from "@/assets/gk-series/gk1501-io2.jpg";

/* ─── Concept: "One Body, Multiple Brains" ─── */
const concepts = [
  {
    icon: Layers,
    title: "One Body, Multiple Brains",
    titleEn: "คอนเซ็ปต์หลัก: ดีไซน์เดียว เลือก 'สมอง' ได้หลายแบบ",
    desc: "บอดี้ภายนอกทนทานมาตรฐานอุตสาหกรรม แต่เลือกสีพียูให้ตรงใจได้หลากหลายที่สุด",
  },
  {
    icon: Monitor,
    title: "เลือกรุ่นที่ใช่ ตอบโจทย์ทุกหน้างาน",
    titleEn: "Choose the right model for every application",
    desc: "ตั้งแต่ 10.4\" คอมแพกต์ ไปจนถึง 21\" Full HD — เลือกขนาดตามการใช้งาน",
  },
  {
    icon: Shield,
    title: "ทนทานทุกการใช้งาน",
    titleEn: "Industrial durability IP65",
    desc: "วัสดุอลูมิเนียม มาตรฐาน IP65 ทนฝุ่น น้ำ กรุรักษ์สูง",
  },
  {
    icon: Gauge,
    title: "เลือกขุมพลังให้ตรงกับซอฟต์แวร์",
    titleEn: "X86 (Windows/Linux) & ARM (Android/Linux)",
    desc: "Intel Core i3/i5/i7, AMD A6, ARM RK3399/RK3288 — เลือกตามงบและการใช้งาน",
  },
];

/* ─── GK Models ─── */
interface GKModel {
  id: string;
  name: string;
  screenSize: string;
  resolution: string;
  tagline: string;
  desc: string;
  image: string;
  bannerImage?: string;
  datasheetUrls: { label: string; url: string }[];
  highlights: string[];
  cpuOptions: string[];
  platform: string;
  specs: { label: string; value: string }[];
  priceTable: { cpu: string; configs: { ram: string; ssd: string; price: string }[] }[];
  applications: string[];
  youtubeId?: string;
  gallery?: string[];
}

const gkModels: GKModel[] = [
  {
    id: "gk1004",
    name: "GK1004",
    screenSize: "10.4\"",
    resolution: "1024×768",
    tagline: "Compact & Versatile",
    desc: "คอมพิวเตอร์แผงควบคุมสมรรถนะสูง มาตรฐาน IP65 หน้าจอสัมผัส 10 นิ้ว เลือกได้ทั้ง Windows/Linux (Intel/AMD) และ Android (ARM) — เล็กที่สุด แต่ฟีเจอร์ครบที่สุด",
    image: "https://static.wixstatic.com/media/005637_63354c2396e945468024a1170057f661~mv2.png/v1/crop/x_499,y_265,w_870,h_738/fill/w_453,h_385,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%871.png",
    bannerImage: "https://static.wixstatic.com/media/005637_e086c00fa8d945c4abf7defd3a9d838d~mv2.jpg/v1/crop/x_63,y_0,w_1937,h_328/fill/w_1245,h_224,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%9B%E0%B8%81.jpg",
    datasheetUrls: [
      { label: "GK1004 Core i3/i5/i7", url: "https://docs.wixstatic.com/ugd/0597a3_494ff783ace94e86b75a19186e846b4c.pdf" },
      { label: "GK1004 AMD A6", url: "https://docs.wixstatic.com/ugd/0597a3_6f2939c704d64ad9815751e73437e63d.pdf" },
      { label: "GK1004 A10-X7 (RK3288)", url: "https://docs.wixstatic.com/ugd/0597a3_8862e83a07ef4fd588e0a969382a2037.pdf" },
      { label: "GK1004 A10-X9 (RK3399)", url: "https://docs.wixstatic.com/ugd/0597a3_f13b4842a3454efea01f796ecb37781d.pdf" },
    ],
    highlights: [
      "หน้าจอสัมผัส 10.4\" มาตรฐาน IP65 ทนฝุ่น น้ำ 10 จุดสัมผัส",
      "รองรับไฟฟ้าแรงดันกว้าง 12-64V ใช้กับระบบไฟโรงงานทุกประเภท",
      "พอร์ตครบ: COM (RS232/RS485), LAN, USB, VGA, HDMI",
      "รองรับ 4G LTE + mini PCIe/M.2 expansion",
      "ติดตั้งได้หลากหลาย: VESA / ขาตั้ง / ฝังติดผนัง",
    ],
    youtubeId: "v33ZXk1KZLA",
    cpuOptions: ["Intel Core i3/i5/i7", "AMD A6-6500T", "ARM RK3288 (Android)", "ARM RK3399 (Android)"],
    platform: "Windows / Linux / Android",
    specs: [
      { label: "Display", value: "10.4\" Capacitive Touch, 1024×768, 10 Points" },
      { label: "CPU (Windows)", value: "Intel Core i3-5005U / i5-5300U / i7-5500U" },
      { label: "CPU (AMD)", value: "AMD A6 Micro-6500T" },
      { label: "CPU (Android)", value: "RK3288 / RK3399" },
      { label: "RAM", value: "DDR3 2GB/4GB/8GB (DDR3L 4GB for RK3399)" },
      { label: "Storage", value: "SSD 16GB~512GB / EMMC 16~128GB" },
      { label: "I/O", value: "1~2×RS232/RS485, 2~6×USB, 2×RJ45, VGA+HDMI" },
      { label: "Protection", value: "IP65 Front Panel" },
      { label: "Dimension", value: "283×225.2×56 mm" },
      { label: "Power", value: "AC100-240V / DC12V 5A / DC 12-64V" },
      { label: "Certification", value: "CE, FCC, ROHS, ISO" },
      { label: "Mounting", value: "Wall Mount / Embedded / VESA / Vertical Stand" },
    ],
    priceTable: [
      {
        cpu: "i3-5005U (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "25,990" },
          { ram: "4GB", ssd: "256GB", price: "26,990" },
          { ram: "8GB", ssd: "128GB", price: "26,990" },
          { ram: "8GB", ssd: "256GB", price: "27,990" },
        ],
      },
      {
        cpu: "i5-5300 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "26,990" },
          { ram: "4GB", ssd: "256GB", price: "27,990" },
          { ram: "8GB", ssd: "128GB", price: "27,990" },
          { ram: "8GB", ssd: "256GB", price: "29,900" },
        ],
      },
      {
        cpu: "i7-5500 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "29,900" },
          { ram: "4GB", ssd: "256GB", price: "30,990" },
          { ram: "8GB", ssd: "128GB", price: "30,990" },
          { ram: "8GB", ssd: "256GB", price: "31,990" },
        ],
      },
      {
        cpu: "i5-1155G7 (2LAN 4USB HDMI DP VGA 2RS232, 3 Displays)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "34,990" },
          { ram: "4GB", ssd: "256GB+Wifi", price: "35,990" },
          { ram: "8GB", ssd: "128GB+Wifi", price: "35,990" },
          { ram: "8GB", ssd: "256GB+Wifi", price: "36,990" },
          { ram: "8GB", ssd: "512GB+Wifi", price: "37,990" },
          { ram: "16GB", ssd: "512GB+Wifi", price: "38,990" },
        ],
      },
    ],
    applications: ["Industrial Automation", "PLC / SCADA", "Production Line", "Security & Surveillance", "Kiosk / Queuing", "Digital Signage"],
  },
  {
    id: "gk1501",
    name: "GK1501",
    screenSize: "15\"",
    resolution: "1024×768",
    tagline: "Standard Size",
    desc: "Panel PC อุตสาหกรรม 15 นิ้ว จอสัมผัส Capacitive 10 จุด โครงสร้าง IP65 กันฝุ่นกันน้ำ รองรับ CPU ตั้งแต่ Core i5 ถึง i7 หลาย Generation — เหมาะกับงาน HMI, SCADA และ Factory Automation",
    image: gk1501front,
    datasheetUrls: [
      { label: "GK1501 Core i5 Datasheet (PDF)", url: "/datasheets/GK1501_i5.pdf" },
      { label: "GK1501 Core i7 Gen3 Datasheet (PDF)", url: "/datasheets/GK1501_i7_Gen3.pdf" },
      { label: "GK1501 Core i7 Gen6 Datasheet (PDF)", url: "/datasheets/GK1501_i7_Gen6.pdf" },
    ],
    highlights: [
      "หน้าจอ 15\" Capacitive Touch 10 จุด (1024×768)",
      "IP65 กันฝุ่น กันน้ำ ระดับอุตสาหกรรม",
      "รองรับ CPU Core i5 Gen3 / i7 Gen3 / i7 Gen6",
      "RAM DDR3 2GB/4GB/8GB, SSD สูงสุด 512GB",
      "2× LAN, 6× USB, 2× RS232, HDMI + VGA",
      "ติดตั้งได้หลายแบบ: Wall Mount / Embedded / VESA",
      "อุณหภูมิใช้งาน -10°C ถึง 60°C",
      "รองรับ Windows / Linux",
    ],
    cpuOptions: ["Intel Core i5 (Gen3)", "Intel Core i7 (Gen3)", "Intel Core i7 (Gen6)"],
    platform: "Windows 10/11 / Linux",
    specs: [
      { label: "Display", value: "15\" TFT-LCD, 1024×768, Anti-Glare" },
      { label: "Touch", value: "Capacitive 10-Point, Response <10ms" },
      { label: "Brightness", value: "250-400 nits" },
      { label: "CPU (Gen3)", value: "Intel Core i5-3337U / i7-3537U" },
      { label: "CPU (Gen6)", value: "Intel Core i7-6500U" },
      { label: "RAM", value: "DDR3 2GB/4GB/8GB (1-2 Slots)" },
      { label: "Storage", value: "SSD 16GB/32GB/64GB/128GB/256GB/512GB" },
      { label: "Ethernet", value: "2× RJ45 Gigabit LAN" },
      { label: "USB", value: "6× USB2.0/USB3.0" },
      { label: "Serial Port", value: "2× RS232" },
      { label: "Video Output", value: "1× VGA + 1× HDMI" },
      { label: "Audio", value: "1× Audio IN/OUT" },
      { label: "Expansion", value: "mini PCIe — WiFi, Bluetooth, 3G/4G LTE" },
      { label: "Protection", value: "IP65 Front Panel" },
      { label: "Dimension", value: "385×305×55 mm" },
      { label: "Weight", value: "4.5 kg" },
      { label: "Power Input", value: "AC 100-240V 50-60Hz / DC 12V" },
      { label: "Temperature", value: "Operating: -10~60°C / Storage: -20~75°C" },
      { label: "Humidity", value: "0%~95% (Non-condensing)" },
      { label: "Certification", value: "CE, FCC, ROHS" },
      { label: "Mounting", value: "Wall Mount / Embedded / VESA 100×100" },
      { label: "OS", value: "Windows 10/11, Linux" },
    ],
    priceTable: [
      {
        cpu: "i5 Gen3 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "28,990" },
          { ram: "4GB", ssd: "256GB", price: "29,990" },
          { ram: "8GB", ssd: "128GB", price: "29,990" },
          { ram: "8GB", ssd: "256GB", price: "30,990" },
        ],
      },
      {
        cpu: "i7 Gen3 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "30,990" },
          { ram: "4GB", ssd: "256GB", price: "31,990" },
          { ram: "8GB", ssd: "128GB", price: "31,990" },
          { ram: "8GB", ssd: "256GB", price: "32,990" },
        ],
      },
      {
        cpu: "i7 Gen6 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "32,990" },
          { ram: "4GB", ssd: "256GB", price: "33,990" },
          { ram: "8GB", ssd: "128GB", price: "33,990" },
          { ram: "8GB", ssd: "256GB", price: "34,990" },
        ],
      },
    ],
    applications: ["HMI Control", "Factory Automation", "Warehouse Management", "SCADA", "POS & Queuing", "Digital Signage"],
    gallery: [
      gk1501front,
      gk1501back,
      gk1501io1,
      gk1501io2,
    ],
  },
  {
    id: "gk1506",
    name: "GK1506 (A15)",
    screenSize: "15.6\"",
    resolution: "1920×1080 Full HD",
    tagline: "Full HD — Best Seller!",
    desc: "Panel PC อุตสาหกรรม 15.6 นิ้ว Full HD จอสัมผัส 10 จุด โครงสร้าง IP65 ทั้งด้านหน้าและด้านหลัง ทนฝุ่น ทนน้ำ รองรับ CPU ตั้งแต่ Pentium ถึง Core i7 — เลือกสเปกให้ตรงกับงบประมาณและการใช้งาน",
    image: gk1506img1,
    bannerImage: gk1506banner,
    datasheetUrls: [
      { label: "A15 Datasheet (PDF)", url: "https://www.sharevdi.com/upload/portal/20250704/202507042002221664.pdf" },
      { label: "GK1506 Datasheet", url: "https://docs.wixstatic.com/ugd/0597a3_d2a55f290be74f049d8099a7666f5153.pdf" },
    ],
    highlights: [
      "หน้าจอ Full HD 15.6\" (1920×1080) Capacitive Touch 10 จุด",
      "IP65 ทั้งด้านหน้าและด้านหลัง — กันฝุ่น กันน้ำระดับอุตสาหกรรม",
      "รองรับไฟฟ้าแรงดันกว้าง 12-64V + AC 100-240V",
      "พอร์ต COM (RS232/RS485) สูงสุด 4 พอร์ต, USB สูงสุด 6 พอร์ต",
      "รองรับ 4G LTE Module, mini PCIe/M.2 expansion",
      "ติดตั้งได้ 4 แบบ: VESA / ขาตั้ง / ฝังผนัง / Wall Mount",
      "อุณหภูมิใช้งาน -10°C ถึง 60°C ทนสภาพแวดล้อมรุนแรง",
      "ความสว่างสูงสุด 1,000 nits ใช้กลางแจ้งได้",
    ],
    cpuOptions: ["Intel Pentium A1020", "Intel Core i3-5005U", "Intel Core i5-5300U", "Intel Core i7-5500U"],
    platform: "Windows 10/11 / Windows IoT / Linux",
    specs: [
      { label: "Display", value: "15.6\" Full HD 1920×1080, TFT-LCD, Anti-Glare" },
      { label: "Touch", value: "Capacitive 10-Point, Response <10ms, Accuracy 2-2.5mm" },
      { label: "Brightness", value: "250-1,000 nits (ปรับได้)" },
      { label: "Contrast", value: "1000:1, 16.7M สี, Full Viewing Angle" },
      { label: "CPU (Pentium)", value: "Intel Pentium A1020" },
      { label: "CPU (Core)", value: "Intel Core i3-5005U / i5-5300U / i7-5500U" },
      { label: "RAM", value: "DDR3 4GB/8GB (1-2 Slots)" },
      { label: "Storage", value: "SSD 64GB/128GB/256GB/512GB" },
      { label: "Ethernet", value: "2× RJ45 Gigabit LAN (Upgradable)" },
      { label: "USB", value: "6× USB2.0/USB3.0 (Upgradable)" },
      { label: "Serial Port", value: "2-4× RS232/RS485 (Upgradable)" },
      { label: "Video Output", value: "1× VGA + 1× HDMI" },
      { label: "Audio", value: "1× Audio IN/OUT" },
      { label: "Expansion", value: "mini PCIe/M.2 — WiFi, Bluetooth, 4G/5G LTE" },
      { label: "Extendable", value: "RS485, Phoenix terminal (9-36V), GPIO" },
      { label: "Protection", value: "IP65 Full Panel (Front + Back)" },
      { label: "Dimension", value: "391×276×51 mm" },
      { label: "Weight", value: "4.2 kg" },
      { label: "Power Input", value: "AC 100-240V 50-60Hz / DC 12V 5A" },
      { label: "Wide Voltage", value: "DC 9-36V (Phoenix connector)" },
      { label: "Temperature", value: "Operating: -10~60°C / Storage: -20~75°C" },
      { label: "Humidity", value: "0%~95% (Non-condensing)" },
      { label: "Certification", value: "CE, FCC, ROHS, ISO" },
      { label: "Mounting", value: "Wall Mount / Embedded / VESA / Vertical Stand" },
      { label: "OS", value: "Windows 10/11, Windows IoT, Linux (Custom image supported)" },
      { label: "Color", value: "Gray" },
    ],
    priceTable: [
      {
        cpu: "i3-5005U (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "31,990" },
          { ram: "4GB", ssd: "256GB", price: "32,990" },
          { ram: "8GB", ssd: "128GB", price: "32,990" },
          { ram: "8GB", ssd: "256GB", price: "33,990" },
        ],
      },
      {
        cpu: "i5-5300 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "32,990" },
          { ram: "4GB", ssd: "256GB", price: "33,990" },
          { ram: "8GB", ssd: "128GB", price: "33,990" },
          { ram: "8GB", ssd: "256GB", price: "34,990" },
        ],
      },
      {
        cpu: "i7-5500 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "34,990" },
          { ram: "4GB", ssd: "256GB", price: "35,990" },
        ],
      },
    ],
    applications: ["HMI Dashboard", "Quality Control", "Factory Monitoring", "Self-Service Terminal", "Kiosk & POS", "Digital Signage"],
    gallery: [
      gk1506img1,
      gk1506img2,
      gk1506img3,
      gk1506img4,
      gk1506img5,
      gk1506img6,
    ],
  },
  {
    id: "gk1901",
    name: "GK1901",
    screenSize: "19\"",
    resolution: "1280×1024",
    tagline: "Large Display",
    desc: "Panel PC อุตสาหกรรม 19 นิ้ว จอสัมผัส Capacitive 10 จุด IP65 กันฝุ่นกันน้ำ พื้นที่แสดงผลกว้าง รองรับ CPU Core i5 Gen4/Gen8 และ Core i7 Gen3/Gen6 — เหมาะกับ Control Room, SCADA และ Production Monitoring",
    image: "https://static.wixstatic.com/media/3e5003_90384e2e610a43438fe307816e83b2d2~mv2.jpg/v1/fill/w_215,h_161,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/222.jpg",
    datasheetUrls: [
      { label: "GK1901 Core i5 Gen4 (PDF)", url: "/datasheets/GK1901_i5_Gen4.pdf" },
      { label: "GK1901 Core i5 Gen8 (PDF)", url: "/datasheets/GK1901_i5_Gen8.pdf" },
      { label: "GK1901 Core i7 Gen3 (PDF)", url: "/datasheets/GK1901_i7_Gen3.pdf" },
      { label: "GK1901 Core i7 Gen6 (PDF)", url: "/datasheets/GK1901_i7_Gen6.pdf" },
    ],
    highlights: [
      "หน้าจอ 19\" Capacitive Touch 10 จุด (1280×1024)",
      "IP65 กันฝุ่น กันน้ำ ระดับอุตสาหกรรม",
      "รองรับ CPU Core i5 Gen4/Gen8 และ Core i7 Gen3/Gen6",
      "RAM DDR3/DDR4, SSD สูงสุด 512GB",
      "2× LAN, USB, RS232/RS485, HDMI + VGA",
      "ติดตั้งได้หลายแบบ: Wall Mount / Embedded / VESA / Stand",
      "อุณหภูมิใช้งาน -10°C ถึง 60°C",
      "ใช้งานได้หลากหลาย ตั้งแต่ Office ไปจนถึงโปรแกรมออกแบบ",
    ],
    cpuOptions: ["Intel Core i5 (Gen4)", "Intel Core i5 (Gen8)", "Intel Core i7 (Gen3)", "Intel Core i7 (Gen6)"],
    platform: "Windows 10/11 / Linux",
    specs: [
      { label: "Display", value: "19\" TFT-LCD, 1280×1024, Anti-Glare" },
      { label: "Touch", value: "Capacitive 10-Point, Response <10ms" },
      { label: "Brightness", value: "250-400 nits" },
      { label: "CPU (Gen4)", value: "Intel Core i5-4200U" },
      { label: "CPU (Gen8)", value: "Intel Core i5-8250U" },
      { label: "CPU (Gen3)", value: "Intel Core i7-3537U" },
      { label: "CPU (Gen6)", value: "Intel Core i7-6500U" },
      { label: "RAM", value: "DDR3/DDR4 4GB/8GB (1-2 Slots)" },
      { label: "Storage", value: "SSD 64GB/128GB/256GB/512GB" },
      { label: "Ethernet", value: "2× RJ45 Gigabit LAN" },
      { label: "USB", value: "4-6× USB2.0/USB3.0" },
      { label: "Serial Port", value: "2× RS232/RS485" },
      { label: "Video Output", value: "1× VGA + 1× HDMI" },
      { label: "Audio", value: "1× Audio IN/OUT" },
      { label: "Expansion", value: "mini PCIe — WiFi, Bluetooth, 3G/4G LTE" },
      { label: "Protection", value: "IP65 Front Panel" },
      { label: "Dimension", value: "445×360×60 mm" },
      { label: "Weight", value: "5.5 kg" },
      { label: "Power Input", value: "AC 100-240V 50-60Hz / DC 12V" },
      { label: "Temperature", value: "Operating: -10~60°C / Storage: -20~75°C" },
      { label: "Humidity", value: "0%~95% (Non-condensing)" },
      { label: "Certification", value: "CE, FCC, ROHS" },
      { label: "Mounting", value: "Wall Mount / Embedded / VESA 100×100 / Stand" },
      { label: "OS", value: "Windows 10/11, Linux" },
    ],
    priceTable: [
      {
        cpu: "i5 Gen4 (2LAN USB HDMI VGA RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "29,990" },
          { ram: "4GB", ssd: "256GB", price: "30,990" },
          { ram: "8GB", ssd: "128GB", price: "30,990" },
          { ram: "8GB", ssd: "256GB", price: "31,990" },
        ],
      },
      {
        cpu: "i5 Gen8 (2LAN USB HDMI VGA RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "32,990" },
          { ram: "4GB", ssd: "256GB", price: "33,990" },
          { ram: "8GB", ssd: "128GB", price: "33,990" },
          { ram: "8GB", ssd: "256GB", price: "34,990" },
        ],
      },
      {
        cpu: "i7 Gen3 (2LAN USB HDMI VGA RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "31,990" },
          { ram: "4GB", ssd: "256GB", price: "32,990" },
          { ram: "8GB", ssd: "128GB", price: "32,990" },
          { ram: "8GB", ssd: "256GB", price: "33,990" },
        ],
      },
      {
        cpu: "i7 Gen6 (2LAN USB HDMI VGA RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "33,990" },
          { ram: "4GB", ssd: "256GB", price: "34,990" },
          { ram: "8GB", ssd: "128GB", price: "34,990" },
          { ram: "8GB", ssd: "256GB", price: "35,990" },
        ],
      },
    ],
    applications: ["Control Room", "SCADA Display", "Production Monitoring", "Factory Dashboard", "Digital Signage", "HMI"],
  },
  {
    id: "gk2101",
    name: "GK2101",
    screenSize: "21\"",
    resolution: "1920×1080 Full HD",
    tagline: "Flagship — จอใหญ่ Full HD",
    desc: "จอใหญ่ Full HD สำหรับงานแสดงผลแดชบอร์ด เปิดใช้งาน 24/7 — Panel PC 21 นิ้ว สมรรถนะสูง ทนอุณหภูมิ -10°C ถึง 60°C โครงสร้างจากอะลูมิเนียมอัลลอยด์และเหล็กกล้าคุณภาพสูง",
    image: "https://static.wixstatic.com/media/0597a3_1edf4296661742bab6366020a3910ac7~mv2.png/v1/fill/w_543,h_452,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK2101-008.png",
    datasheetUrls: [
      { label: "Core i5 (Gen4)", url: "https://docs.wixstatic.com/ugd/0597a3_9201a0dcffcf47e0a4f3b884b05724f3.pdf" },
      { label: "Core i5 (Gen6)", url: "https://docs.wixstatic.com/ugd/0597a3_1ab3580679584c548439ae4c648d3830.pdf" },
      { label: "Core i5 (Gen7)", url: "https://docs.wixstatic.com/ugd/0597a3_446a7000d3d244b5939a52de27087245.pdf" },
      { label: "Core i7 (Gen3)", url: "https://docs.wixstatic.com/ugd/0597a3_e9faa73e77324168a78bdf8360d76203.pdf" },
      { label: "Core i7 (Gen6)", url: "https://docs.wixstatic.com/ugd/0597a3_2de7a57857dd4c0b96dc32c688e82e0a.pdf" },
    ],
    highlights: [
      "หน้าจอ Full HD 21\" (1920×1080) Capacitive Touch IP65",
      "รองรับ 24/7 ต่อเนื่อง 365 วัน",
      "ทนอุณหภูมิ -10°C ถึง 60°C",
      "โครงสร้างอะลูมิเนียมอัลลอยด์ + เหล็กกล้า น้ำหนัก 9-10 kg",
      "ขนาด 554×355×150 mm หน้าจอ 537×305 mm",
      "รองรับ Core i5/i7 หลาย Generation",
    ],
    cpuOptions: ["Core i5 Gen4", "Core i5 Gen5", "Core i5 Gen6", "Core i5 Gen7", "Core i7 Gen3", "Core i7 Gen6"],
    platform: "Windows / Linux",
    specs: [
      { label: "Display", value: "21.5\" Full HD 1920×1080, Capacitive 10 Points, IP65" },
      { label: "CPU", value: "Intel Core i5 (Gen4/5/6/7) / i7 (Gen3/6)" },
      { label: "RAM", value: "4GB DDR4" },
      { label: "Storage", value: "SSD 128GB" },
      { label: "Ethernet", value: "Gigabit + WiFi" },
      { label: "I/O", value: "HDMI, USB (upgradable), COM 1/2 (RS232/RS485), LAN 1/2" },
      { label: "4G/Wireless", value: "4G LTE Module, mini PCIe/M.2" },
      { label: "Dimension", value: "554×355×150 mm, ~9-10 kg" },
      { label: "Power", value: "12-64V wide voltage" },
      { label: "Temperature", value: "-10°C ~ 60°C" },
      { label: "Mounting", value: "VESA / Stand / Embedded / Wall Mount" },
    ],
    priceTable: [
      {
        cpu: "i3-5005U (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "30,990" },
          { ram: "4GB", ssd: "256GB", price: "31,990" },
          { ram: "8GB", ssd: "128GB", price: "31,990" },
          { ram: "8GB", ssd: "256GB", price: "32,990" },
        ],
      },
      {
        cpu: "i5-5300 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "31,990" },
          { ram: "4GB", ssd: "256GB", price: "32,990" },
          { ram: "8GB", ssd: "128GB", price: "32,990" },
          { ram: "8GB", ssd: "256GB", price: "33,990" },
        ],
      },
      {
        cpu: "i7-5500 (2LAN 6USB HDMI VGA 2RS232)",
        configs: [
          { ram: "4GB", ssd: "128GB", price: "32,990" },
          { ram: "4GB", ssd: "256GB", price: "33,990" },
        ],
      },
    ],
    applications: ["Real-time Dashboard", "ระบบอัตโนมัติและควบคุม", "Control Room", "วิเคราะห์ข้อมูลขั้นสูง"],
    youtubeId: "POvzJ1FWtTU",
    gallery: [
      "https://static.wixstatic.com/media/0597a3_a5ca89bcac5f44579e8c6cd8fad31808~mv2.png/v1/fill/w_600,h_561,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK2101-001.png",
      "https://static.wixstatic.com/media/0597a3_93758bd8180f4db2b702f56db6241a3a~mv2.png/v1/fill/w_625,h_426,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK2101-002.png",
      "https://static.wixstatic.com/media/0597a3_3ca0c2e94496439097bfdfdfdf11fc1c~mv2.png/v1/fill/w_633,h_461,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK2101-003.png",
    ],
  },
];

/* ─── Model Card Component ─── */
const ModelSection = ({ model, index }: { model: GKModel; index: number }) => {
  const isReversed = index % 2 === 1;

  return (
    <div className="card-surface overflow-hidden" id={model.id}>
      {/* Header area */}
      <div className="grid lg:grid-cols-5 gap-0">
        {/* Image side */}
        <div className={`lg:col-span-2 relative bg-secondary/30 p-8 flex flex-col items-center justify-center ${isReversed ? "lg:order-2" : ""}`}>
          <div className="absolute top-4 left-4 flex items-center gap-2">
      
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {model.screenSize}
            </span>
            {model.resolution.includes("Full HD") && (
              <span className="px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                Full HD
              </span>
            )}
          </div>
          <WishlistHeart
            item={{
              id: model.id,
              name: model.name,
              category: "GK Series — Panel PC",
              image: model.image,
              href: `/gk-series#${model.id}`,
              specs: `${model.screenSize} ${model.resolution} ${model.platform}`,
            }}
            className="absolute top-4 right-4"
          />
          <img
            src={model.image}
            alt={model.name}
            className="max-h-[240px] object-contain mb-4"
            loading="lazy"
          />
          {model.gallery && (
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {model.gallery.slice(0, 3).map((img, i) => (
                <img key={i} src={img} alt="" className="w-16 h-16 object-contain rounded-lg bg-background/50 p-1" loading="lazy" />
              ))}
            </div>
          )}
          {model.datasheetUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {model.datasheetUrls.map((ds, i) => (
                <a
                  key={i}
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {ds.label} <ExternalLink size={10} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Content side */}
        <div className={`lg:col-span-3 p-8 lg:p-10 ${isReversed ? "lg:order-1" : ""}`}>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{model.tagline}</p>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">{model.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{model.screenSize} • {model.resolution} • {model.platform}</p>
          <p className="text-muted-foreground mb-6 leading-relaxed">{model.desc}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {model.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Zap size={12} className="text-primary mt-1 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {/* CPU Options */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">ตัวเลือก CPU:</p>
            <div className="flex flex-wrap gap-2">
              {model.cpuOptions.map((cpu, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {cpu}
                </span>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">เหมาะสำหรับ:</p>
            <div className="flex flex-wrap gap-2">
              {model.applications.map((app, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border">
        <Tabs defaultValue="spec" className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto border-b border-border bg-muted/30 p-0 overflow-x-auto">
            <TabsTrigger
              value="spec"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold shrink-0"
            >
              ►Specification
            </TabsTrigger>
            {model.priceTable.length > 0 && (
              <TabsTrigger
                value="price"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold shrink-0"
              >
                ►ราคา
              </TabsTrigger>
            )}
            {model.youtubeId && (
              <TabsTrigger
                value="video"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold shrink-0"
              >
                ►Video
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="spec" className="mt-0 p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {model.specs.map((s, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-foreground w-36 bg-muted/20 align-top">{s.label}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {model.priceTable.length > 0 && (
            <TabsContent value="price" className="mt-0 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10 border-b border-border">
                      <th className="text-left px-4 py-3 font-semibold text-foreground">CPU</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">RAM</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">SSD</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">ราคา (฿)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {model.priceTable.map((group) =>
                      group.configs.map((c, ci) => (
                        <tr key={`${group.cpu}-${ci}`} className="hover:bg-muted/30 transition-colors">
                          {ci === 0 && (
                            <td className="px-4 py-3 font-medium text-foreground align-top" rowSpan={group.configs.length}>
                              {group.cpu}
                            </td>
                          )}
                          <td className="px-4 py-3 text-muted-foreground">{c.ram}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.ssd}</td>
                          <td className="px-4 py-3 text-right font-bold text-primary text-lg">{c.price}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          {model.youtubeId && (
            <TabsContent value="video" className="mt-0 p-6">
              <div className="aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${model.youtubeId}`}
                  title={`${model.name} Video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

/* ─── Comparison Quick View ─── */
const ComparisonTable = () => (
  <div className="card-surface overflow-hidden">
    <div className="px-6 py-4 bg-primary/10 border-b border-border">
      <h3 className="font-bold text-foreground">คุณสมบัติเด่นของแต่ละรุ่น — เปรียบเทียบเร็ว</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/30 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-foreground">คุณสมบัติ</th>
            <th className="text-center px-4 py-3 font-semibold text-primary">GK1004</th>
            <th className="text-center px-4 py-3 font-semibold text-foreground">GK1506</th>
            <th className="text-center px-4 py-3 font-semibold text-foreground">GK2101</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            { label: "ขนาดจอ", gk1004: "10.4\"", gk1506: "15.6\"", gk2101: "21\"" },
            { label: "ความละเอียด", gk1004: "1024×768", gk1506: "Full HD", gk2101: "Full HD" },
            { label: "มาตรฐาน", gk1004: "IP65", gk1506: "IP65", gk2101: "IP65" },
            { label: "ซีพียู X86", gk1004: "i3/i5/i7 + AMD", gk1506: "i3/i5/i7", gk2101: "i5/i7" },
            { label: "ซีพียู ARM", gk1004: "RK3288/RK3399", gk1506: "—", gk2101: "—" },
            { label: "ระบบปฏิบัติการ", gk1004: "Win/Linux/Android", gk1506: "Win/Linux", gk2101: "Win/Linux" },
            { label: "ราคาเริ่มต้น", gk1004: "฿25,990", gk1506: "฿31,990", gk2101: "฿30,990" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium text-foreground bg-muted/10">{row.label}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{row.gk1004}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{row.gk1506}</td>
              <td className="px-4 py-3 text-center text-muted-foreground">{row.gk2101}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── Page ─── */
const GKSeries = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);
  const [activeVideoTab, setActiveVideoTab] = useState("ทั้งหมด");
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="GK Series — Industrial Panel PC จอสัมผัสอุตสาหกรรม" description="GK Series Panel PC อุตสาหกรรม จอสัมผัส 10.4-21 นิ้ว เลือก CPU ได้ตามใจ ทนร้อน ทนฝุ่น สำหรับโรงงาน POS และงานควบคุม" path="/gk-series" />
      <ProductJsonLd
        collectionName="GK Series Industrial Panel PC"
        collectionDescription="Panel PC อุตสาหกรรม จอสัมผัส 10.4-21 นิ้ว IP65 เลือก CPU ได้ สำหรับโรงงาน POS และงานควบคุม"
        collectionUrl="/gk-series"
        products={gkModels.map(m => ({ name: m.name, price: m.priceTable?.[0]?.configs?.[0]?.price, image: m.image, description: `${m.screenSize} ${m.tagline}`, category: "Industrial Panel PC" }))}
      />
      <BreadcrumbJsonLd items={[{ name: "สินค้า", path: "/products" }, { name: "GK Series", path: "/gk-series" }]} />
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="ENT GROUP" className="h-8 w-auto" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">GK Series</span>
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
                Industrial Panel PC
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 tracking-tight">
                GK <span className="text-gradient">Series</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                คอมพิวเตอร์อุตสาหกรรมที่เลือก 'สมอง' ได้ตามใจคุณ
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Panel PC อุตสาหกรรม GK Series โดดเด่นด้านความยืดหยุ่นสูงที่สุด — สามารถเลือกขนาดหน้าจอและ CPU/OS ที่แตกต่างกันได้ในบอดี้ที่ทนทานเหมือนกัน ตั้งแต่ 10.4" ถึง 21" Full HD
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://docs.wixstatic.com/ugd/0597a3_b7e91a40254040a3b28e20e2641312cd.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Product Overview <ExternalLink size={16} />
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  เปรียบเทียบรุ่น
                </a>
                <a
                  href="#gk1004"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  ดูสินค้าทั้งหมด <ChevronDown size={16} />
                </a>
              </div>
            </div>
            <div className="card-surface p-4 overflow-hidden">
              <img
                src="https://static.wixstatic.com/media/3e5003_dc1a50e64b414a36a9c92b209078e0df~mv2.jpg/v1/crop/x_0,y_5,w_2007,h_596/fill/w_1134,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.jpg"
                alt="GK Series Industrial Panel PC"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Concept Cards */}
      <section className="section-padding">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Why GK Series?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              เลือก<span className="text-gradient">ได้ตามใจคุณ</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {concepts.map((c) => (
              <div key={c.title} className="card-surface p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
                <c.icon className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-foreground mb-1 text-sm">{c.title}</h3>
                <p className="text-xs text-primary mb-2">{c.titleEn}</p>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Overview */}
      <section className="section-padding bg-muted/30" id="comparison">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Quick Compare</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              เปรียบเทียบ<span className="text-gradient">รุ่นยอดนิยม</span>
            </h2>
          </div>
          <ComparisonTable />
          <div className="mt-6 card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_42dd7aa07bae417897f2e57c49c981e1~mv2.jpg/v1/fill/w_864,h_482,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK%20Series%20%E0%B9%80%E0%B8%9B%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%9A%20GK1004%20GK1506%20GK21.jpg"
              alt="GK Series Comparison"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-6 border-b border-border sticky top-[65px] z-40 bg-background/90 backdrop-blur-lg">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground shrink-0 mr-2">รุ่น:</span>
            {gkModels.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground transition-all"
              >
                {m.name} <span className="text-muted-foreground text-xs">({m.screenSize})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Models */}
      <section className="section-padding" id="models">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Product Lineup</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              สินค้า<span className="text-gradient">ทั้งหมด</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              เลือกขนาดหน้าจอที่ตอบโจทย์ — พร้อม Specification, ราคา และ Video ครบถ้วน
            </p>
          </div>

          <div className="space-y-10">
            {gkModels.map((model, idx) => (
              <ModelSection key={model.id} model={model} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Real-world photos */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              GK Series <span className="text-gradient">ใช้งานจริง</span>
            </h2>
            <p className="text-muted-foreground mt-2">ภาพถ่ายจากไซต์งานจริง เพื่อความมั่นใจในคุณภาพ</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://static.wixstatic.com/media/0597a3_7de2c07f966b4371b16dde472b035298~mv2.jpg/v1/fill/w_237,h_238,q_90,enc_avif,quality_auto/0597a3_7de2c07f966b4371b16dde472b035298~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_0660fba37ffe49a2a004047745c69797~mv2.jpg/v1/fill/w_237,h_237,fp_0.71_0.21,q_90,enc_avif,quality_auto/0597a3_0660fba37ffe49a2a004047745c69797~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_9b8e671a00504f9784c84c5aa6a03134~mv2.jpg/v1/fill/w_237,h_238,fp_0.79_0.37,q_90,enc_avif,quality_auto/0597a3_9b8e671a00504f9784c84c5aa6a03134~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_61a977e88e8d4c12ad37c88712ee9cef~mv2.jpg/v1/fill/w_237,h_237,fp_0.8_0.28,q_90,enc_avif,quality_auto/0597a3_61a977e88e8d4c12ad37c88712ee9cef~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_0774793f619b458d87404f6058b4d179~mv2.jpg/v1/fill/w_237,h_238,q_90,enc_avif,quality_auto/0597a3_0774793f619b458d87404f6058b4d179~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_3ad6e6ac09f04cc08bb72b10ef484871~mv2.jpg/v1/fill/w_237,h_237,q_90,enc_avif,quality_auto/0597a3_3ad6e6ac09f04cc08bb72b10ef484871~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_1e39ed0fe74245629b16b5e5ea5d0a6c~mv2.jpg/v1/fill/w_237,h_238,fp_0.76_0.21,q_90,enc_avif,quality_auto/0597a3_1e39ed0fe74245629b16b5e5ea5d0a6c~mv2.jpg",
              "https://static.wixstatic.com/media/0597a3_27159c0c9ec54624b72408d7a94b8065~mv2.jpg/v1/fill/w_237,h_237,q_90,enc_avif,quality_auto/0597a3_27159c0c9ec54624b72408d7a94b8065~mv2.jpg",
            ].map((img, i) => (
              <img key={i} src={img} alt="GK Series installation" className="w-full aspect-square object-cover rounded-xl" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section — Tabbed by model */}
      {(() => {
        const videoTabs: Record<string, { id: string; title: string }[]> = {
          "ทั้งหมด": [
            { id: "v33ZXk1KZLA", title: "GK1004 Introduction" },
            { id: "cUqG6xWQegE", title: "GK1004 How to Choose" },
            { id: "jWM0vEKoAAE", title: "GK1004 รายละเอียดเพิ่มเติม" },
            { id: "xXaUYlbVy5o", title: "GK1004 การใช้งาน" },
            { id: "_UqXHR6iCMA", title: "GK1501 Introduction" },
            { id: "JVnNQcTupgE", title: "GK1501 รีวิวเพิ่มเติม" },
            { id: "O5fd-_ZfWR0", title: "GK1506 Introduction" },
            { id: "szVVTv5tmJs", title: "GK1506 รีวิวเพิ่มเติม" },
            { id: "ZZlkdSgJAzs", title: "GK1506 สาธิตการใช้งาน" },
            { id: "PeOizgJEVBc", title: "GK1506 เปรียบเทียบสเปก" },
            { id: "_CZTxWtK3rw", title: "รีวิว Industrial Panel PC - GK Series" },
            { id: "POvzJ1FWtTU", title: "Panel PC - GK2101" },
          ],
          "GK1004": [
            { id: "v33ZXk1KZLA", title: "Introduction" },
            { id: "cUqG6xWQegE", title: "How to Choose" },
            { id: "jWM0vEKoAAE", title: "รายละเอียดเพิ่มเติม" },
            { id: "xXaUYlbVy5o", title: "การใช้งาน" },
          ],
          "GK1501": [
            { id: "_UqXHR6iCMA", title: "Introduction" },
            { id: "JVnNQcTupgE", title: "รีวิวเพิ่มเติม" },
          ],
          "GK1506": [
            { id: "O5fd-_ZfWR0", title: "Introduction" },
            { id: "szVVTv5tmJs", title: "รีวิวเพิ่มเติม" },
            { id: "ZZlkdSgJAzs", title: "สาธิตการใช้งาน" },
            { id: "PeOizgJEVBc", title: "เปรียบเทียบสเปก" },
          ],
          "GK2101": [
            { id: "POvzJ1FWtTU", title: "Panel PC - GK2101" },
          ],
          "GK Series": [
            { id: "_CZTxWtK3rw", title: "รีวิว Industrial Panel PC" },
          ],
        };
        const tabKeys = Object.keys(videoTabs);
        const currentVideos = videoTabs[activeVideoTab] || videoTabs["ทั้งหมด"];

        return (
          <section className="section-padding">
            <div className="container max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  วิดีโอ<span className="text-gradient">แนะนำ</span>
                </h2>
              </div>
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {tabKeys.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveVideoTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      activeVideoTab === tab
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {currentVideos.map((v) => (
                  <div key={v.id} className="card-surface overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">{v.title}</p>
                      <ShareButtons url={`https://youtu.be/${v.id}`} title={v.title} compact />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Podcast Section */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              <Headphones className="inline-block mr-2 text-primary" size={28} />
              Podcast<span className="text-gradient"> GK Series</span>
            </h2>
            <p className="text-muted-foreground mt-2">ฟังข้อมูลสินค้าแบบสบายๆ — เปิดฟังระหว่างทำงานได้เลย</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "🎙️ GK1004 Intro", desc: "แนะนำ GK1004 Panel PC สเปก ฟีเจอร์ และจุดเด่น", src: "/audio/GK1004_Podcast1.wav" },
              { title: "🎙️ GK1004 How to Choose", desc: "วิธีเลือกรุ่น CPU ที่เหมาะกับงานของคุณ", src: "/audio/GK1004_Podcast2.wav" },
              { title: "🎙️ GK1506 Intro", desc: "แนะนำ GK1506 Panel PC 15.6\" Full HD จุดเด่นและสเปก", src: "/audio/GK1506_Podcast1.wav" },
              { title: "🎙️ GK1506 Sale Scenario", desc: "สถานการณ์การขายและการเลือกรุ่น GK1506", src: "/audio/GK1506_Podcast2.wav" },
            ].map((pod, i) => (
              <div key={i} className="card-surface p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Play size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{pod.title}</p>
                    <p className="text-xs text-muted-foreground">{pod.desc}</p>
                  </div>
                </div>
                <audio controls className="w-full h-10" preload="metadata">
                  <source src={pod.src} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3G/4G SIM Feature */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="card-surface p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Wifi className="text-primary mb-4" size={40} />
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  ใช้อินเทอร์เน็ต<span className="text-gradient"> ไม่ต้องง้อ WiFi</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GK Series มีช่องเสียบ SIM สามารถใช้ 3G/4G LTE ได้เลย — เชื่อมต่อได้ทุกที่ ไม่ต้องตามหา WiFi สะดวกสำหรับไซต์งานที่ไม่มีเครือข่ายอินเทอร์เน็ตสาย
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://static.wixstatic.com/media/005637_9307d91084e2433eb766e611c65c7518~mv2.jpg/v1/crop/x_127,y_51,w_4147,h_1557/fill/w_983,h_369,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GK_Series1.jpg"
                  alt="GK Series SIM slot"
                  className="rounded-xl max-w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto text-center">
          <Settings className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            สนใจ GK Series?<span className="text-gradient"> ปรึกษาเรา</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            ให้ทีมผู้เชี่ยวชาญช่วยเลือกรุ่นและ Configuration ที่เหมาะกับงานของคุณ
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setQuoteOpen(true)} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors">
              ขอใบเสนอราคา
            </button>
            <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} productCategory="GK Series — Panel PC" />
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

export default GKSeries;
