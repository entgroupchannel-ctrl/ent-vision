import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Cpu, Zap, Shield, Monitor, Wifi, ThermometerSun, HardDrive, Server, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FooterCompact from "@/components/FooterCompact";

/* ── Category Navigation ── */
const categories = [
  { id: "entry", label: "Entry-Level", desc: "Fanless, ประหยัดไฟ" },
  { id: "high", label: "High Performance", desc: "Core i5/i7, Industrial" },
  { id: "education", label: "Education & Office", desc: "สำนักงาน, โรงเรียน" },
  { id: "nano", label: "Nano PC", desc: "ขนาดจิ๋ว" },
  { id: "firewall", label: "Firewall Appliance", desc: "Multi-LAN Router" },
  { id: "signage", label: "Digital Signage", desc: "X7 / R9 Android" },
  { id: "legacy", label: "Budget Series", desc: "K6-F13, GT/GQ" },
  { id: "pricelist", label: "Price List", desc: "ตารางราคา" },
];

/* ── Entry-Level Models ── */
const entryModels = [
  {
    id: "k6-f1",
    name: "K6-F1",
    tagline: "เงียบสนิท ประหยัดไฟ 6W Fanless",
    image: "https://static.wixstatic.com/media/0597a3_6300a3994d554da8bd26cf2a234b0e34~mv2.png/v1/fill/w_436,h_302,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_6300a3994d554da8bd26cf2a234b0e34~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_d277dec046804dc694ac329fa7204cc2.pdf",
    highlights: [
      "เงียบสนิท — ไม่มีพัดลม ไม่มีเสียงรบกวน",
      "ประหยัดไฟสุดๆ — กินไฟเพียง 6W ทำงาน 24/7 ได้",
      "ขนาดเล็กกะทัดรัด — ประหยัดพื้นที่สุดๆ",
      "CPU 4 แกน + Intel Graphics",
      "Network 2 ช่อง, USB 4 ช่อง, Type-C 1 ช่อง",
      "ต่อจอ VGA + HDMI, ติดตั้งยืดหยุ่น",
    ],
    specs: {
      CPU: "Intel N-Series 4 Cores",
      TDP: "6W",
      Cooling: "Fanless Passive",
      Memory: "DDR4, สูงสุด 16GB",
      Storage: "M.2 SSD",
      Network: "Dual Gigabit LAN",
      Display: "VGA + HDMI",
      "I/O": "USB 3.0 ×2, USB 2.0 ×2, Type-C ×1",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k6-f17h",
    name: "K6-F17H",
    tagline: "Intel N150 4-Core, Fanless 6W, Industrial",
    image: "https://static.wixstatic.com/media/0597a3_33167f5f1c224ae4a281dc30d836d9b6~mv2.png/v1/fill/w_392,h_232,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-22%20at%2010_41_58.png",
    datasheet: null,
    highlights: [
      "Intel N150 4-Core สูงสุด 3.6GHz, Cache 6MB",
      "Fanless เงียบ ประหยัดพลังงาน TDP 6W",
      "ทำงานต่อเนื่อง 24/7 ในสภาพแวดล้อมอุตสาหกรรม",
      "พอร์ตครบครัน USB 3.0, VGA, Serial, Ethernet",
      "Phoenix Connector จ่ายไฟ 9-36V",
      "ขนาดกะทัดรัด ติดตั้งง่าย",
    ],
    specs: {
      CPU: "Intel N150",
      "Clock Speed": "0.8-3.6GHz",
      "Cores/Threads": "4C / 4T",
      Cache: "6 MB",
      TDP: "6W",
      Memory: "DDR4/DDR5/LPDDR5, 2× slots, สูงสุด 16GB",
      Storage: "M.2 M KEY 2280 SATA + 2.5\" HDD expansion",
      Cooling: "Fanless",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k3-f18-6006",
    name: "K3-F18-6006",
    tagline: "Core i3-6006U, 6× COM Ports, Industrial Grade",
    image: "https://static.wixstatic.com/media/0597a3_74a5ab1d3b5b4f4b93ba96a0096e16de~mv2.png/v1/fill/w_351,h_170,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_74a5ab1d3b5b4f4b93ba96a0096e16de~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_31fb9b826f644de3a16ad9bbb78cbf76.pdf",
    highlights: [
      "Industrial-Grade ทำงาน -20°C ถึง 50°C",
      "6 Serial Ports RS232/RS485 สำหรับเครื่องจักร",
      "Dual LAN + 8 USB Ports",
      "Dual HDMI 4K แสดงผล 2 จอพร้อมกัน",
      "ขนาด 13.4×12.7×5.4 cm น้ำหนัก 1.25kg",
      "TDP 15W, Fanless, เงียบ 100%",
    ],
    specs: {
      CPU: "Intel Core i3-6006U @ 2.00GHz",
      "Cores/Threads": "2C / 4T",
      Cache: "3MB Smart Cache",
      TDP: "15W",
      Architecture: "Skylake",
      Memory: "2×DDR4L, สูงสุด 32GB",
      Storage: "M.2 2280 SSD + SATA3.0",
      Network: "Intel i211AT + Intel i219 Dual GbE",
      Display: "Dual HDMI 4K",
      "I/O": "6×COM, 4×USB3.0, 4×USB2.0",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k3-f17h",
    name: "K3-F17H",
    tagline: "Core i3-5005U, Dual GbE LAN, 4× COM, WiFi6 + 4G",
    image: "https://static.wixstatic.com/media/0597a3_fb38b6b4f7db40b2be215ba7ba711cb9~mv2.png/v1/fill/w_409,h_263,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_25_21.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_60bf722fa4d245beae9a5b3047a29f34.pdf",
    highlights: [
      "Dual Gigabit LAN — หายากใน Mini PC ทั่วไป",
      "COM Ports 4 ตัว Voltage Switching",
      "Built-in Socket Pins 20+ สำหรับขยายระบบ",
      "WiFi6 + 4G Module พร้อม SIM slot",
      "เปลือกอลูมิเนียม + Passive Cooling",
      "เหมาะ Industrial Automation, Network, OEM",
    ],
    specs: {
      CPU: "Intel Core i3-5005U @ 2.0GHz",
      "Cores/Threads": "2C / 4T",
      Cache: "3 MB",
      TDP: "15W",
      Architecture: "Broadwell (5th Gen)",
      Memory: "2× DDR3L, สูงสุด 16GB",
      Storage: "M.2 SATA + 2.5\" expansion",
      Network: "Dual Gigabit LAN",
      Wireless: "WiFi6 + 4G Module (optional)",
      "I/O": "4× COM, USB 3.0, USB 2.0",
      OS: "Windows & Linux",
    },
  },
];

/* ── High Performance Models ── */
const highModels = [
  {
    id: "k8-f18-4405",
    name: "K8-F18-4405",
    tagline: "Pentium 4405U, 6× COM, Dual HDMI 4K, Fanless",
    image: "https://static.wixstatic.com/media/0597a3_20f2fab2255a443db57fe7128d67d6e2~mv2.png/v1/fill/w_372,h_254,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2016_29_09.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_789e5ed0d54a486aa137e849c6fe15f0.pdf",
    highlights: [
      "Intel Pentium 4405U Skylake 2.10GHz",
      "Hyper-Threading เพิ่มประสิทธิภาพ",
      "DDR4L สูงสุด 32GB",
      "6× Serial COM, 8× USB, Dual HDMI 4K",
      "Dual Gigabit Ethernet",
      "Fanless อลูมิเนียม -20°C ถึง 50°C",
    ],
    specs: {
      CPU: "Intel Pentium 4405U @ 2.10GHz",
      "Cores/Threads": "2C / 4T (Hyper-Threading)",
      Cache: "2MB Smart Cache",
      TDP: "15W",
      Architecture: "Skylake",
      Memory: "2×DDR4L, สูงสุด 32GB",
      Storage: "M.2 2280 SSD + SATA3.0",
      Display: "Dual HDMI 4K",
      "I/O": "6×COM, 4×USB3.0, 4×USB2.0",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k3-f17hi",
    name: "K3-F17HI",
    tagline: "Core i3, Dual GbE, 4× COM, WiFi6 + 4G, 20+ Pins",
    image: "https://static.wixstatic.com/media/0597a3_fb38b6b4f7db40b2be215ba7ba711cb9~mv2.png/v1/fill/w_409,h_263,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_25_21.png",
    datasheet: null,
    highlights: [
      "Dual Gigabit LAN + 4× COM Voltage Switching",
      "Built-in Socket Pins 20+ สำหรับขยายระบบ",
      "WiFi6 + 4G Module + SIM slot",
      "เปลือกอลูมิเนียม + Passive Cooling",
      "เหมาะ Industrial Automation, OEM Integration",
    ],
    specs: {
      CPU: "Intel Core i3 Series",
      Network: "Dual Gigabit LAN",
      "I/O": "4× COM, USB 3.0/2.0, Expansion Pins 20+",
      Wireless: "WiFi6 + 4G Module",
      Cooling: "Passive (Fanless)",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k8-f17hi-3710",
    name: "K8-F17HI-3710",
    tagline: "Pentium 3710, Fanless 6W, -10°C~65°C",
    image: "https://static.wixstatic.com/media/0597a3_06a8fad9316b4c848ea8c185f1421ffb~mv2.png/v1/fill/w_409,h_254,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2016_20_38.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_4dfde2ac9b0244a39be6002e88614959.pdf",
    highlights: [
      "Intel Pentium 3710, 4C/4T, TDP 6W",
      "ทำงาน -10°C ถึง 65°C",
      "Fanless Passive Cooling เงียบสนิท",
      "4× COM, Dual GbE, USB หลายพอร์ต",
      "Dual HDMI 4K Display",
      "อลูมิเนียมอัลลอย Industrial Grade",
    ],
    specs: {
      CPU: "Intel Pentium 3710 @ 1.6-2.56GHz",
      "Cores/Threads": "4C / 4T",
      Cache: "2 MB L2",
      TDP: "6W",
      Architecture: "Braswell",
      Memory: "1×SO-DIMM DDR3",
      Storage: "mSATA SSD + 2.5\" HDD expansion",
      Display: "Dual HDMI 4K",
      "I/O": "4× COM, USB 3.0/2.0",
      "Temp Range": "-10°C ~ 65°C",
      OS: "Windows 10/11 & Linux",
    },
  },
  {
    id: "k5-f17h",
    name: "K5-F17H",
    tagline: "Core i5-5300U, 2.3-2.9GHz Turbo, Dual GbE",
    image: "https://static.wixstatic.com/media/0597a3_fb38b6b4f7db40b2be215ba7ba711cb9~mv2.png/v1/fill/w_409,h_263,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_25_21.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_c79cb4ba2db3485abf44477aeb2f817c.pdf",
    highlights: [
      "Core i5-5300U, 2.3-2.9GHz Turbo Boost",
      "ประสิทธิภาพสูงกว่า Mini PC ทั่วไป 30-40%",
      "Dual Gigabit LAN + Network Redundancy",
      "4× COM Voltage Switching (0/5/9/12V)",
      "WiFi6 + 4G Module + SIM Slot",
      "Passive Cooling, -10°C ~ 60°C",
    ],
    specs: {
      CPU: "Intel Core i5-5300U @ 2.3-2.9GHz",
      "Cores/Threads": "2C / 4T",
      Cache: "3 MB",
      TDP: "15W",
      Architecture: "Broadwell (5th Gen)",
      Memory: "2× DDR3L, สูงสุด 16GB",
      Storage: "M.2 SATA + 2.5\" expansion",
      Network: "Dual Gigabit LAN",
      Wireless: "WiFi6 + 4G (optional)",
      "I/O": "4× COM, USB 3.0/2.0, 20+ Expansion Pins",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k7-f17h",
    name: "K7-F17H",
    tagline: "Core i7-5500U, 2.4-3.0GHz Turbo, Workstation Level",
    image: "https://static.wixstatic.com/media/0597a3_fb38b6b4f7db40b2be215ba7ba711cb9~mv2.png/v1/fill/w_409,h_263,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_25_21.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_0f5e2b5c07ae4cd69726416340ec7210.pdf",
    highlights: [
      "Core i7-5500U, 2.4-3.0GHz Turbo",
      "ประสิทธิภาพระดับ Workstation ในรูปทรง Mini PC",
      "Dual Gigabit LAN, 4× COM, 20+ Expansion Pins",
      "WiFi6 + 4G Module + SIM Slot",
      "เปลือกอลูมิเนียม + Passive Cooling",
      "ทนสภาพแวดล้อม -10°C ~ 60°C",
    ],
    specs: {
      CPU: "Intel Core i7-5500U @ 2.4-3.0GHz",
      "Cores/Threads": "2C / 4T",
      TDP: "15W",
      Architecture: "Broadwell (5th Gen)",
      Memory: "2× DDR3L, สูงสุด 16GB",
      Storage: "M.2 SATA + 2.5\" expansion",
      Network: "Dual Gigabit LAN",
      "I/O": "4× COM, USB, 20+ Pins",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k5-f17f",
    name: "K5-F17F",
    tagline: "Core i5-1155G7 Tiger Lake Gen11, 4C/8T, 4.5GHz",
    image: "https://static.wixstatic.com/media/0597a3_3ba05883e1c342bb99e35d0436424602~mv2.png/v1/fill/w_409,h_307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_54_29.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_6c3dc8e3c4b3416489327d62c7fd5f8d.pdf",
    badge: "Tiger Lake",
    highlights: [
      "Intel Core i5-1155G7 (11th Gen Tiger Lake)",
      "4 Cores / 8 Threads — เพิ่มจาก 2C/4T",
      "2.50-4.50GHz Turbo, 8MB Smart Cache",
      "Dual Gigabit LAN + 4× COM",
      "WiFi + 5G Module ready",
      "Industrial Grade, Passive Cooling",
    ],
    specs: {
      CPU: "Intel Core i5-1155G7",
      "Cores/Threads": "4C / 8T",
      "Clock Speed": "2.50 - 4.50GHz Turbo",
      Cache: "8MB Smart Cache",
      Architecture: "Tiger Lake (11th Gen)",
      Memory: "DDR4, สูงสุด 32GB",
      Storage: "M.2 NVMe + 2.5\" expansion",
      Network: "Dual Gigabit LAN",
      "I/O": "4× COM, USB 3.0/2.0, 20+ Pins",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k7-f17f",
    name: "K7-F17F",
    tagline: "Core i7-1195G7 Flagship, 5.0GHz, 8K DisplayPort!",
    image: "https://static.wixstatic.com/media/0597a3_6ba1d01e29c34aefa206f89999813443~mv2.png/v1/fill/w_456,h_263,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2016_09_06.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_664a2b2f1d5f46438439d522687faa2c.pdf",
    badge: "Flagship",
    highlights: [
      "Intel Core i7-1195G7 Tiger Lake Flagship",
      "2.90-5.0GHz Turbo, 12MB Smart Cache",
      "Intel Iris Xe Graphics",
      "8K DisplayPort (7680×4320@60Hz)!",
      "Triple Display — HDMI 4K + VGA + DP 8K",
      "5G Module ready + SIM Slot",
    ],
    specs: {
      CPU: "Intel Core i7-1195G7",
      "Cores/Threads": "4C / 8T",
      "Clock Speed": "2.90 - 5.0GHz Turbo",
      Cache: "12MB Smart Cache",
      Graphics: "Intel Iris Xe",
      Display: "HDMI 4K + VGA + DisplayPort 8K",
      Memory: "DDR4, สูงสุด 64GB",
      Storage: "M.2 NVMe + 2.5\" expansion",
      Network: "Dual Gigabit LAN",
      Wireless: "WiFi + 5G Module",
      OS: "Windows & Linux",
    },
  },
];

/* ── Education & Office Models ── */
const educationModels = [
  {
    id: "g5",
    name: "G5 Nano Mini PC",
    tagline: "ขนาด 6×6 ซม. น้ำหนัก 150g กินไฟ 10W",
    image: "https://static.wixstatic.com/media/0597a3_039ae2b8d04549279975647939a97044~mv2.png/v1/fill/w_282,h_233,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2014_36_29.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_50922cf5dd954a769a7e5d9eacce5db0.pdf",
    highlights: [
      "ขนาดเพียง 61.6×61.6×42mm น้ำหนัก 0.15kg!",
      "Intel Celeron J4125, 4 Core, 2.0-2.7GHz",
      "TDP เพียง 10W ประหยัดกว่าหลอดไฟ LED",
      "HDMI 4K Ultra HD (4096×2304@60Hz)",
      "WiFi AC7265 + Bluetooth ในตัว",
      "อลูมิเนียมอัลลอย สีแดง-ดำ สวยงาม",
    ],
    specs: {
      CPU: "Intel Celeron J4125 @ 2.0-2.7GHz",
      "Cores/Threads": "4C / 4T",
      Cache: "4 MB Smart Cache",
      TDP: "10W",
      Graphics: "Intel UHD Graphics 600",
      Display: "HDMI 4K (4096×2304@60Hz)",
      Memory: "DDR4, สูงสุด 8GB",
      Storage: "M.2 SSD",
      Wireless: "Intel AC7265 WiFi 2.4G/5G + BT",
      "I/O": "USB 3.0 ×2, Type-C ×1, TF Card, Audio",
      Dimensions: "61.6 × 61.6 × 42 mm",
      Weight: "0.15 kg",
      OS: "Windows 10/11, Linux",
    },
  },
  {
    id: "k3-c7",
    name: "K3-C7",
    tagline: "Core i3-6157U, Iris Plus 650, 4K Dual Display",
    image: "https://static.wixstatic.com/media/0597a3_e9ef885f05854a988704e1b2e8c1521b~mv2.png/v1/fill/w_235,h_346,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2014_47_48.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_860b680d7b2847ff9e7f5730e5a52751.pdf",
    highlights: [
      "Intel Core i3-6157U, Iris Plus Graphics 650",
      "กราฟิกแรงกว่าคู่แข่ง รองรับ 4K",
      "ต่อจอ 2 จอพร้อมกัน (VGA + HDMI)",
      "ขยาย WiFi หรือ 4G ได้ตามต้องการ",
      "Internal I/O Pins 15+ สำหรับ OEM",
      "เหมาะ Digital Signage, Network Gateway",
    ],
    specs: {
      CPU: "Intel Core i3-6157U @ 2.40GHz",
      "Cores/Threads": "2C / 4T (Hyper-Threading)",
      Cache: "3 MB Smart Cache",
      TDP: "28W",
      Architecture: "Skylake",
      Graphics: "Intel Iris Plus 650, 4K Ready",
      Display: "VGA (1080p) + HDMI (4K)",
      Memory: "1× DDR3L, สูงสุด 8GB",
      Storage: "M.2 SSD",
      Wireless: "WiFi + 4G (optional)",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k5-n12",
    name: "K5-N12",
    tagline: "Core i5-8300H, 4C/8T, Gaming-Level Performance",
    image: "https://static.wixstatic.com/media/0597a3_9d19c68e9bce4cec92136118203f2b40~mv2.png/v1/fill/w_433,h_291,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2014_59_06.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_e9f354d5f1d14052a008f339b458ad19.pdf",
    highlights: [
      "Intel Core i5-8300H, 4C/8T, สูงสุด 4.0GHz",
      "แรงเทียบเท่า Laptop Gaming ระดับกลาง",
      "DDR4 สูงสุด 64GB",
      "USB 8 พอร์ต, Dual Display 4K",
      "เปลือกโลหะแท้ 100% ระบายความร้อนมืออาชีพ",
      "ขยาย WiFi, 4G, Storage ได้ครบ",
    ],
    specs: {
      CPU: "Intel Core i5-8300H @ 2.3-4.0GHz",
      "Cores/Threads": "4C / 8T",
      Cache: "8 MB Smart Cache",
      TDP: "35-45W",
      Architecture: "Coffee Lake (8th Gen)",
      Graphics: "Intel UHD 630",
      Display: "HDMI 4K + VGA, Dual Display",
      Memory: "2× DDR4L, สูงสุด 64GB",
      Storage: "M.2 SATA SSD",
      "I/O": "USB 3.0/2.0 ×8",
      OS: "Windows & Linux",
    },
  },
  {
    id: "k7-n12",
    name: "K7-N12",
    tagline: "Core i7-8750H, 6C/12T, Workstation Class!",
    image: "https://static.wixstatic.com/media/0597a3_9d19c68e9bce4cec92136118203f2b40~mv2.png/v1/fill/w_433,h_291,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2014_59_06.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_af7994bd251345b4bf89bc8864115f41.pdf",
    badge: "Most Powerful",
    highlights: [
      "Intel Core i7-8750H, 6C/12T, สูงสุด 4.1GHz",
      "แรงเทียบเท่า Laptop Gaming ระดับสูง!",
      "9MB Smart Cache, DDR4 สูงสุด 32GB",
      "USB 8 พอร์ต, HDMI 4K + VGA",
      "เปลือกโลหะแท้ 100%",
      "เหมาะ Video Editing, CAD, Server",
    ],
    specs: {
      CPU: "Intel Core i7-8750H @ 2.2-4.1GHz",
      "Cores/Threads": "6C / 12T (Hyper-Threading)",
      Cache: "9 MB Smart Cache",
      TDP: "35-45W",
      Architecture: "Coffee Lake (8th Gen)",
      Graphics: "Intel UHD 630",
      Display: "HDMI 4K (4096×2304@30Hz) + VGA (1080p)",
      Memory: "2× DDR4L, สูงสุด 32GB",
      Storage: "M.2 SATA SSD",
      "I/O": "USB 3.0/2.0 ×8",
      OS: "Windows & Linux",
    },
  },
];

/* ── Nano PC ── */
const nanoModels = [
  {
    id: "k1-f6-6400t",
    name: "K1-F6-6400T",
    tagline: "AMD A4, TDP 4.5W, ประหยัดพลังงานที่สุด!",
    image: "https://static.wixstatic.com/media/0597a3_53b1567a8a3e4825b92766a16e30a281~mv2.png/v1/fill/w_415,h_210,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2015_13_56.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_ad25ce5ea3f74504839c7ee7ca649943.pdf",
    highlights: [
      "AMD A4 Micro-6400T, 4 Core, TDP เพียง 4.5W!",
      "ประหยัดพลังงานที่สุดในโลก!",
      "Fanless 100% เงียบสนิท ทนทาน",
      "ขนาด 10×16 ซม. น้ำหนัก 600g",
      "เคสอลูมิเนียมแกร่ง + I/O ครบ",
      "RS232 COM port สำหรับ Industrial",
    ],
    specs: {
      CPU: "AMD A4 Micro-6400T",
      "Cores/Threads": "4C / 4T",
      TDP: "4.5W",
      Cooling: "Fanless 100%",
      Memory: "DDR3L",
      Storage: "mSATA SSD",
      Display: "Dual Display",
      "I/O": "RS232 COM, USB, HDMI, VGA",
      Dimensions: "~100 × 160 mm",
      Weight: "0.6 kg",
      OS: "Windows & Linux",
    },
  },
];

/* ── Firewall Models ── */
const firewallModels = [
  {
    id: "k8-f12",
    name: "K8-F12-N3700 (4 LAN)",
    tagline: "4× Gigabit LAN, Fanless 6W, Firewall/Router",
    image: "https://static.wixstatic.com/media/0597a3_ad7f2747d32c4f78b9f2fa33ffdc03c2~mv2.png/v1/fill/w_426,h_277,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2019_57_54.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_b97ed68def1a4060a1fd87cd21f45bb6.pdf",
    highlights: [
      "4 × RJ45 Gigabit LAN ports",
      "TDP เพียง 6W ประหยัดไฟสุดๆ",
      "น้ำหนักเพียง 0.6kg เบาที่สุด",
      "4K Ready + Dual Display",
      "Fanless design เงียบสนิท",
      "เหมาะ pfSense, OPNsense, Router/Firewall",
    ],
    specs: {
      CPU: "Intel Pentium N3700",
      TDP: "6W",
      Network: "4× Gigabit LAN",
      Cooling: "Fanless",
      Display: "Dual Display, 4K",
      Weight: "0.6 kg",
      OS: "Windows, Linux, pfSense, OPNsense",
    },
  },
  {
    id: "k8-f12c",
    name: "K8-F12C-N3700 (6 LAN)",
    tagline: "6× Gigabit LAN, Fanless 6W, Enterprise Router",
    image: "https://static.wixstatic.com/media/0597a3_a526198c6088458f9fcf2c7b4fb93994~mv2.png/v1/fill/w_377,h_286,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-30%20at%2019_51_47.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_9fe53a205d694b24b3d9790a580ce737.pdf",
    highlights: [
      "6 × RJ45 Gigabit LAN ports",
      "TDP เพียง 6W ประหยัดไฟสุดๆ",
      "น้ำหนักเพียง 0.6kg",
      "4K Ready + Dual Display",
      "Fanless design เงียบสนิท",
      "เหมาะ Enterprise Firewall, SOHO Router",
    ],
    specs: {
      CPU: "Intel Pentium N3700",
      TDP: "6W",
      Network: "6× Gigabit LAN",
      Cooling: "Fanless",
      Display: "Dual Display, 4K",
      Weight: "0.6 kg",
      OS: "Windows, Linux, pfSense, OPNsense",
    },
  },
];

/* ── Digital Signage Models ── */
const signageModels = [
  {
    id: "r9",
    name: "R9 Digital Signage Player",
    tagline: "Android, Dual LVDS, Dual HDMI 4K, IR Remote",
    image: "https://static.wixstatic.com/media/0597a3_42d62d54f19545129af65186b0a93cba~mv2.png/v1/fill/w_486,h_438,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R9%20(2).png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_ff0ba2e724c44d79ae076bb9a5e71e18.pdf",
    highlights: [
      "Dual LVDS 6/8 บิต แสดงผล 2 หน้าจอ",
      "1080P output, จอ 7 นิ้วขึ้นไป",
      "Dual HDMI + 4K video playback",
      "IR Remote Control, WiFi 2.4/5GHz",
      "Bluetooth 4.1-BLE, USB 3.0",
      "Android OS พร้อมใช้งาน",
    ],
    specs: {
      SoC: "ARM-based Processor",
      Display: "Dual LVDS 6/8-bit + Dual HDMI",
      Resolution: "สูงสุด 4K",
      Wireless: "WiFi 2.4/5GHz + BT 4.1-BLE",
      "I/O": "USB 3.0, IR Receiver",
      OS: "Android 7-10",
    },
    gallery: [
      "https://static.wixstatic.com/media/0597a3_789647ea8e3e491ea997ff3a263c5da9~mv2.png/v1/fill/w_376,h_376,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R9%20Digital%20signage.png",
      "https://static.wixstatic.com/media/0597a3_1155bccf1be749bea87d526d72cfd120~mv2.png/v1/fill/w_376,h_376,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R9%20Digital%20signage%20(4).png",
      "https://static.wixstatic.com/media/0597a3_9343a5429b1848da99e6d1dc07c1d001~mv2.png/v1/fill/w_376,h_376,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R9%20Digital%20signage%20(3).png",
      "https://static.wixstatic.com/media/0597a3_6909454cbcfa4b26a99be861183368d2~mv2.png/v1/fill/w_376,h_376,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R9%20Digital%20signage%20(2).png",
    ],
  },
  {
    id: "x7",
    name: "X7 Digital Signage Player",
    tagline: "RK3288 Quad-Core, Dual LVDS 2K, 4K HDMI",
    image: "https://static.wixstatic.com/media/005637_1a239b98b4f940c28220e5c71d0702ef~mv2.png/v1/crop/x_250,y_153,w_1392,h_719/fill/w_486,h_255,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_7275cc99c2504a12a02a3d098ea8ac8a.pdf",
    highlights: [
      "Rockchip RK3288 Quad-Core",
      "Dual LVDS 6/8/10-bit, หน้าจอ 7-108 นิ้ว",
      "2K resolution + eDP output",
      "4K×2K HDMI 2160P output",
      "IR Remote + Bluetooth + 4G/3G Module",
      "รองรับ Serial Port, IO Port, MIPI Camera",
    ],
    specs: {
      SoC: "Rockchip RK3288 Quad-Core",
      Display: "Dual LVDS 6/8/10-bit + HDMI + eDP",
      Resolution: "สูงสุด 4K×2K (2160P)",
      "Screen Size": "7\" - 108\"",
      Wireless: "WiFi + BT + 4G/3G (optional)",
      "I/O": "Serial Port, IO Port, USB, MIPI Camera, HDMI OUT",
      OS: "Android",
    },
  },
];

/* ── Legacy/Budget Models ── */
const legacyModels = [
  {
    id: "k6-f13a",
    name: "K6-F13A",
    tagline: "N2840 Quad Core, RAM 4GB, SSD 64GB, WiFi พร้อมใช้",
    image: "https://static.wixstatic.com/media/005637_7660fefadbf44ce595c021bbb10bc142~mv2.jpg/v1/crop/x_0,y_1,w_1040,h_1038/fill/w_640,h_639,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f13aNew2023.jpg",
    datasheet: "https://www.entgroup.co.th/_files/ugd/005637_f0d6b09fb3b748039badafd362ea6689.pdf",
    highlights: [
      "N2840 Quad Core 1.83-2.2GHz",
      "RAM 4GB + SSD 64GB (ปรับแต่งได้)",
      "Dual LAN + Dual HDMI",
      "4× USB (2×3.0 + 2×2.0)",
      "WiFi ในตัว พร้อมใช้งานทันที",
      "ขนาด 134×124×36 mm",
    ],
    specs: {
      CPU: "Intel N2840 Quad Core @ 1.83-2.2GHz",
      GPU: "Intel HD Graphics (Atom Z3700)",
      RAM: "4 GB (ปรับแต่งได้)",
      SSD: "64 GB (ปรับแต่งได้)",
      Network: "2× LAN (Intel I211-AT + RTL8111E)",
      Display: "2× HDMI",
      "I/O": "2×USB3.0, 2×USB2.0, 2×RJ45",
      Dimensions: "134 × 124 × 36 mm",
      OS: "Windows 7/8/10, Linux",
    },
  },
  {
    id: "k6-f13d",
    name: "K6-F13D",
    tagline: "N3710 Quad Core, RAM 2GB, SSD 64GB, WiFi",
    image: "https://static.wixstatic.com/media/005637_e1ed3b88204f40ffbe98269b03df27af~mv2.jpg/v1/crop/x_0,y_2,w_1040,h_1035/fill/w_640,h_637,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f13DNew2023.jpg",
    datasheet: "https://www.entgroup.co.th/_files/ugd/3e5003_c865b0cfae29409eadb38ef072d102ae.pdf",
    highlights: [
      "N3710 Quad Core 1.6-2.5GHz",
      "RAM 2GB + SSD 64GB (ปรับแต่งได้)",
      "VGA + HDMI output",
      "USB 2.0 ×2, GbE LAN",
      "WiFi ในตัว พร้อมใช้",
      "ขนาด 134×36.5×126 mm",
    ],
    specs: {
      CPU: "Intel N3710 Quad Core @ 1.6-2.5GHz",
      GPU: "Intel HD Graphics (Atom Z3700)",
      RAM: "2 GB (ปรับแต่งได้)",
      SSD: "64 GB (ปรับแต่งได้)",
      Display: "VGA + HDMI",
      "I/O": "USB2.0 ×2, MIC, SPK",
      Network: "Gigabit LAN",
      Dimensions: "134 × 36.5 × 126 mm",
      OS: "Windows 7/8/10, Linux",
    },
  },
];

/* ── Product Card Component ── */
const ProductCard = ({ model }: { model: any }) => (
  <div id={model.id} className="card-surface overflow-hidden scroll-mt-24">
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-1/3 flex items-center justify-center">
          <div className="bg-secondary/50 rounded-xl p-4 w-full flex items-center justify-center min-h-[200px]">
            <img src={model.image} alt={model.name} className="max-w-full max-h-[200px] object-contain" loading="lazy" />
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">{model.name}</h3>
            {model.badge && (
              <Badge className="bg-primary text-primary-foreground text-xs">{model.badge}</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{model.tagline}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {model.highlights?.map((h: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5 shrink-0">✅</span>
                <span className="text-foreground/80">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specs" className="w-full">
        <TabsList className="w-full justify-start bg-secondary/50 overflow-x-auto">
          <TabsTrigger value="specs" className="text-xs md:text-sm">►Specification</TabsTrigger>
          {model.gallery && <TabsTrigger value="gallery" className="text-xs md:text-sm">►Gallery</TabsTrigger>}
        </TabsList>
        <TabsContent value="specs">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {Object.entries(model.specs || {}).map(([key, val]) => (
              <div key={key} className="bg-secondary/30 rounded-lg p-3 border border-border/50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">{key}</div>
                <div className="text-sm font-medium text-foreground leading-snug">{val as string}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        {model.gallery && (
          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {model.gallery.map((img: string, i: number) => (
                <div key={i} className="bg-secondary/30 rounded-lg overflow-hidden">
                  <img src={img} alt={`${model.name} ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
        {model.datasheet && (
          <Button variant="outline" size="sm" asChild>
            <a href={model.datasheet} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Datasheet
            </a>
          </Button>
        )}
        <Button size="sm" asChild>
          <a href="/quote">
            ขอใบเสนอราคา
          </a>
        </Button>
      </div>
    </div>
  </div>
);

/* ── Section Component ── */
const CategorySection = ({ id, title, subtitle, icon: Icon, models }: {
  id: string; title: string; subtitle: string; icon: any; models: any[];
}) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-6">
      {models.map((m) => <ProductCard key={m.id} model={m} />)}
    </div>
  </section>
);

/* ── Main Page ── */
const MiniPC = () => {
  const [activeCategory, setActiveCategory] = useState("entry");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Mini PC Factory Outlet</Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Mini PC <span className="text-gradient">Series</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                คอมพิวเตอร์ขนาดเล็กสมรรถนะสูง จากโรงงานผู้ผลิตโดยตรง — ครอบคลุมทุกการใช้งานตั้งแต่ Entry-Level จนถึง Workstation Class
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/quote">
                  ขอใบเสนอราคา
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Why ENTGROUP */}
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Shield, title: "ความแกร่งที่พิสูจน์แล้ว", desc: "ออกแบบให้ใช้งานได้นาน ทนต่อสภาพแวดล้อมหนัก ไม่ต้องกังวลความร้อนหรือฝุ่น" },
            { icon: Cpu, title: "ขนาดกะทัดรัด แต่ครบครัน", desc: "ใช้พื้นที่น้อย เสียบใช้งานได้เลย รองรับสาย+อุปกรณ์ครบครัน" },
            { icon: Server, title: "ปรับแต่งได้ตามต้องการ", desc: "บริการ OEM สำหรับธุรกิจ สั่งทำพิเศษได้ ปริมาณขั้นต่ำไม่สูง" },
          ].map((f, i) => (
            <div key={i} className="card-surface p-5">
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Category Quick Nav */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 px-4 py-3 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-foreground/70 border-border hover:border-primary/30"
                }`}
              >
                <div>{cat.label}</div>
                <div className="text-[10px] opacity-70">{cat.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* All Sections */}
        <div className="space-y-16">
          <CategorySection id="entry" title="Industrial Mini PC — Entry Level" subtitle="Fanless, ประหยัดไฟ, เหมาะงาน 24/7" icon={Zap} models={entryModels} />
          <CategorySection id="high" title="Industrial Mini PC — High Performance" subtitle="Core i5/i7, Tiger Lake, Workstation Class" icon={Cpu} models={highModels} />
          <CategorySection id="education" title="Mini PC for Education & Office" subtitle="สำนักงาน, โรงเรียน, Workstation ทดแทน" icon={Monitor} models={educationModels} />
          <CategorySection id="nano" title="Nano PC" subtitle="ขนาดจิ๋ว ประหยัดพลังงานสูงสุด" icon={HardDrive} models={nanoModels} />
          <CategorySection id="firewall" title="Firewall Appliance" subtitle="Multi-LAN Router, pfSense/OPNsense" icon={Shield} models={firewallModels} />
          <CategorySection id="signage" title="Digital Signage Player" subtitle="Android-based, X7/R9 Series" icon={Monitor} models={signageModels} />
          <CategorySection id="legacy" title="Budget Series — K6-F13" subtitle="ราคาประหยัด สำหรับงานพื้นฐาน" icon={Server} models={legacyModels} />

          {/* Price List */}
          <section id="pricelist" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">ตารางราคาสินค้า Mini PC — Price List</h2>
                <p className="text-sm text-muted-foreground">ราคาอัปเดตล่าสุด 2025</p>
              </div>
            </div>

            <div className="card-surface overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5">
                      <TableHead className="font-bold text-foreground">รุ่น</TableHead>
                      <TableHead className="font-bold text-foreground">CPU</TableHead>
                      <TableHead className="font-bold text-foreground">RAM</TableHead>
                      <TableHead className="font-bold text-foreground">Storage</TableHead>
                      <TableHead className="font-bold text-foreground text-right">ราคา (฿)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Entry-Level */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 Entry-Level / Fanless</TableCell>
                    </TableRow>
                    {[
                      { model: "K6-F1", cpu: "Intel N-Series 4C", ram: "4GB", storage: "128GB SSD", price: "4,900" },
                      { model: "K6-F17H", cpu: "Intel N150 4C", ram: "4GB", storage: "128GB SSD", price: "5,500" },
                      { model: "K3-F18-6006", cpu: "Core i3-6006U", ram: "8GB", storage: "128GB SSD", price: "8,900" },
                      { model: "K3-F17H", cpu: "Core i3-5005U", ram: "8GB", storage: "128GB SSD", price: "8,500" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}

                    {/* High Performance */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 High Performance / Industrial</TableCell>
                    </TableRow>
                    {[
                      { model: "K8-F18-4405", cpu: "Pentium 4405U", ram: "8GB", storage: "128GB SSD", price: "9,500" },
                      { model: "K3-F17HI", cpu: "Core i3 Series", ram: "8GB", storage: "128GB SSD", price: "9,900" },
                      { model: "K8-F17HI-3710", cpu: "Pentium 3710", ram: "4GB", storage: "64GB SSD", price: "7,900" },
                      { model: "K5-F17H", cpu: "Core i5-5300U", ram: "8GB", storage: "128GB SSD", price: "11,900" },
                      { model: "K7-F17H", cpu: "Core i7-5500U", ram: "8GB", storage: "128GB SSD", price: "13,900" },
                      { model: "K5-F17F", cpu: "Core i5-1155G7", ram: "8GB", storage: "256GB SSD", price: "16,900" },
                      { model: "K7-F17F", cpu: "Core i7-1195G7", ram: "16GB", storage: "256GB SSD", price: "21,900" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}

                    {/* Education & Office */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 Education & Office</TableCell>
                    </TableRow>
                    {[
                      { model: "G5 Nano", cpu: "Celeron J4125", ram: "4GB", storage: "64GB SSD", price: "3,900" },
                      { model: "K3-C7", cpu: "Core i3-6157U", ram: "4GB", storage: "128GB SSD", price: "7,900" },
                      { model: "K5-N12", cpu: "Core i5-8300H", ram: "8GB", storage: "256GB SSD", price: "12,900" },
                      { model: "K7-N12", cpu: "Core i7-8750H", ram: "8GB", storage: "256GB SSD", price: "15,900" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}

                    {/* Nano & Firewall */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 Nano PC & Firewall Appliance</TableCell>
                    </TableRow>
                    {[
                      { model: "K1-F6-6400T", cpu: "AMD A4-6400T", ram: "2GB", storage: "32GB SSD", price: "3,500" },
                      { model: "K8-F12 (4LAN)", cpu: "Pentium N3700", ram: "4GB", storage: "64GB SSD", price: "6,900" },
                      { model: "K8-F12C (6LAN)", cpu: "Pentium N3700", ram: "4GB", storage: "64GB SSD", price: "7,900" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}

                    {/* Digital Signage */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 Digital Signage (Android)</TableCell>
                    </TableRow>
                    {[
                      { model: "R9 Player", cpu: "ARM SoC", ram: "2GB", storage: "16GB", price: "สอบถาม" },
                      { model: "X7 Player", cpu: "RK3288", ram: "2GB", storage: "16GB", price: "สอบถาม" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}

                    {/* Budget */}
                    <TableRow className="bg-primary/10">
                      <TableCell colSpan={5} className="font-bold text-primary text-sm">🔹 Budget Series</TableCell>
                    </TableRow>
                    {[
                      { model: "K6-F13A", cpu: "N2840 Quad Core", ram: "4GB", storage: "64GB SSD", price: "3,900" },
                      { model: "K6-F13D", cpu: "N3710 Quad Core", ram: "2GB", storage: "64GB SSD", price: "3,500" },
                    ].map((r) => (
                      <TableRow key={r.model}>
                        <TableCell className="font-medium text-foreground">{r.model}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.cpu}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.ram}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{r.storage}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{r.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Remarks */}
              <div className="p-5 bg-secondary/30 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2">📌 หมายเหตุ</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• ราคาสินค้าอาจเปลี่ยนแปลงได้โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
                  <li>• ราคาไม่รวม VAT 7%</li>
                  <li>• รับประกันมาตรฐาน 1 ปี ซื้อประกันเพิ่มได้สูงสุด 3 ปี</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Use Cases Banner */}
        <div className="mt-16 card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">เหมาะกับงานไหนบ้าง?</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              "งานโรงงาน / Industrial",
              "ระบบ POS หน้าร้าน",
              "Edge Computing",
              "pfSense Firewall",
              "Digital Signage",
              "สำนักงาน / Education",
              "IoT Gateway",
              "Kiosk / Self-Service",
              "Video Editing / CAD",
            ].map((u) => (
              <span key={u} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{u}</span>
            ))}
          </div>
          <Button asChild>
            <a href="/quote">
              ปรึกษาผู้เชี่ยวชาญ — ขอใบเสนอราคา
            </a>
          </Button>
        </div>
      </div>
      <FooterCompact />
    </div>
  );
};


export default MiniPC;
