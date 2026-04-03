import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Monitor, Cpu, Shield, Puzzle, Droplets, ThermometerSun, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import epcLegoBanner from "@/assets/epc-lego-banner.png";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";

/* ───── Product Data ───── */

const squareModels = [
  {
    id: "epc-s10",
    name: "EPC-S10X2A",
    size: '10"',
    ratio: "4:3",
    image: "https://static.wixstatic.com/media/0597a3_8989217128734f62bd47299daa9ad880~mv2.png/v1/fill/w_287,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_31_48.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_ad14d113fe1e48bdb0fb90684f6a347e.pdf",
    com: "2×RS232 + 1×RS485 DB9",
  },
  {
    id: "epc-s12",
    name: "EPC-S12X2A",
    size: '12"',
    ratio: "4:3",
    image: "https://static.wixstatic.com/media/0597a3_8d0b05f5ca794468b05502a273c955f3~mv2.png/v1/crop/x_0,y_14,w_910,h_767/fill/w_287,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_33_48.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_5bed0468c86a4b44867336905051e6fb.pdf",
    com: "2×RS232 + 1×RS485 DB9",
  },
  {
    id: "epc-s15",
    name: "EPC-S15X2A",
    size: '15"',
    ratio: "4:3",
    image: "https://static.wixstatic.com/media/0597a3_1044f895f5d842f7a7c68fcc6caf36c9~mv2.png/v1/crop/x_11,y_0,w_908,h_766/fill/w_287,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_35_15.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_7c51ca4ca1d4424f976232df9557f7e4.pdf",
    com: "4×RS232 + 2×RS485 DB9",
  },
  {
    id: "epc-s19",
    name: "EPC-S19X2A",
    size: '19"',
    ratio: "4:3",
    image: "https://static.wixstatic.com/media/0597a3_74801b56e37c4badb8f6ab099f0b5651~mv2.png/v1/crop/x_5,y_0,w_892,h_752/fill/w_287,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_36_07.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_8425d3dbc3034586ac78ec28d4b12811.pdf",
    com: "4×RS232 + 2×RS485 DB9",
  },
];

const wideModels = [
  {
    id: "epc-w13",
    name: "EPC-W13X2A",
    size: '13.3"',
    ratio: "16:9",
    image: "https://static.wixstatic.com/media/0597a3_a24a2701c3274227be9a623a39fcad77~mv2.png/v1/crop/x_0,y_13,w_950,h_801/fill/w_279,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_41_32.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_a40c0b0f82054de78ad202b3a6bce9c1.pdf",
    com: "2×RS232 + 1×RS485 DB9",
  },
  {
    id: "epc-w15",
    name: "EPC-W15X2A",
    size: '15.6"',
    ratio: "16:9",
    image: "https://static.wixstatic.com/media/0597a3_f72a672e77bc413a90eaa099e8bcfe0e~mv2.png/v1/crop/x_15,y_0,w_904,h_762/fill/w_279,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_42_24.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_b6d3208d5bfb494bb029a23ff133f57e.pdf",
    com: "2×RS232 + 1×RS485 DB9",
  },
  {
    id: "epc-w18",
    name: "EPC-W18X2A",
    size: '18.5"',
    ratio: "16:9",
    image: "https://static.wixstatic.com/media/0597a3_1afba5b0dac84a259a2dd29c1fda6909~mv2.png/v1/crop/x_0,y_3,w_910,h_757/fill/w_279,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_45_41.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_7018ff96f96e4a97bbd0ecdce6e4805f.pdf",
    com: "4×RS232 + 2×RS485 DB9",
  },
  {
    id: "epc-w21",
    name: "EPC-W21X2A",
    size: '21.5"',
    ratio: "16:9",
    image: "https://static.wixstatic.com/media/0597a3_cfe6c90e6ba44ef3ba3a0aa5a698f32d~mv2.png/v1/crop/x_0,y_5,w_906,h_753/fill/w_279,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_46_24.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_bc28e143cffa491a9a38bcf5098a87d8.pdf",
    com: "4×RS232 + 2×RS485 DB9",
  },
  {
    id: "epc-w24",
    name: "EPC-W24X2A",
    size: '23.6"',
    ratio: "16:9",
    image: "https://static.wixstatic.com/media/0597a3_67653d20f0ad4119b45a29a2927e5a2f~mv2.png/v1/crop/x_0,y_1,w_902,h_750/fill/w_279,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2011_47_19.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_899307542dca4df6b763b3a52e2af574.pdf",
    com: "4×RS232 + 2×RS485 DB9",
  },
];

const productSelectionTable = [
  { no: 1, model: "EPC-S1062A", partNumber: "C11.01.01.001", cpu: "Intel® Celeron® J1900" },
  { no: 2, model: "EPC-S1072A", partNumber: "C11.01.05.001", cpu: "Intel® Celeron® J6412" },
  { no: 3, model: "EPC-S1092A", partNumber: "C11.01.03.001", cpu: "Intel® Core™ i3-10110U" },
  { no: 4, model: "EPC-S1092A", partNumber: "C11.01.03.002", cpu: "Intel® Core™ i5-10210U" },
  { no: 5, model: "EPC-S1092A", partNumber: "C11.01.03.003", cpu: "Intel® Core™ i7-10710U" },
  { no: 6, model: "EPC-S1022A", partNumber: "C11.01.04.001", cpu: "Intel® Core™ i3-1215U" },
  { no: 7, model: "EPC-S1022A", partNumber: "C11.01.04.002", cpu: "Intel® Core™ i5-1235U" },
  { no: 8, model: "EPC-S1022A", partNumber: "C11.01.04.003", cpu: "Intel® Core™ i5-1240P" },
  { no: 9, model: "EPC-S1022A", partNumber: "C11.01.04.004", cpu: "Intel® Core™ i7-1255U" },
];

const features = [
  {
    icon: Monitor,
    title: "หน้าจอสัมผัสหลากหลายขนาด",
    desc: "ขนาด 8-24 นิ้ว ทั้ง 4:3 และ 16:9 เทคโนโลยี Resistive และ Capacitive ใส่ถุงมือได้ ทนฝุ่นและน้ำ",
  },
  {
    icon: Cpu,
    title: "ประสิทธิภาพระดับพรีเมียม",
    desc: "Intel® Celeron ถึง Core i7 Gen 12 รองรับ RAM สูงสุด 64GB สำหรับ ERP, MES, SCADA",
  },
  {
    icon: Puzzle,
    title: "ออกแบบแบบ LEGO — ต่อเชื่อมง่าย",
    desc: "COM, USB, LAN, VGA, HDMI ครบ ขยายระบบได้เหมือน LEGO เปลี่ยนชิ้นส่วนง่าย ไม่ต้องเปลี่ยนทั้งเครื่อง",
  },
  {
    icon: Shield,
    title: "การติดตั้งที่ยืดหยุ่น",
    desc: "Panel Mount ฝังในตู้ควบคุม VESA Stand วางบนโต๊ะหรือแขวนผนัง เหมาะทุกพื้นที่",
  },
  {
    icon: Droplets,
    title: "มาตรฐานป้องกัน IP65",
    desc: "ป้องกันฝุ่น เศษโลหะ สายน้ำแรงดันสูง และสารทำความสะอาด สำหรับสภาพแวดล้อมที่เข้มงวด",
  },
  {
    icon: ThermometerSun,
    title: "ชิ้นส่วนอุตสาหกรรมแท้",
    desc: "ทนอุณหภูมิสุดขั้ว การสั่นสะเทือน ความชื้นสูง ทำงานต่อเนื่อง 24/7 อัตราขัดข้อง 0.5% ต่อปี",
  },
];

const sharedSpecs = {
  memory: "4~8GB DDR3L / 4~32GB DDR4 / 4~32GB DDR5",
  storage: "mSATA SSD",
  cooling: "Fan-less",
  os: "Windows 10/11 / Linux Ubuntu",
  usb2: "5×USB2.0 / 2×USB2.0",
  usb3: "1×USB3.0 / 4×USB3.0",
  display: "1×HDMI + 1×VGA Dual Display",
  audio: "1×Audio",
  expansion: "1×Mini PCIe Socket",
  ethernet: "2×10M/100M/1000M Intel I210 LAN",
  cpuOptions: [
    "Intel® Celeron® J1900 2.0~2.42GHz",
    "Intel® Celeron® J6412 2.0~2.6GHz",
    "Intel® Core™ i3-10110U 2.1~4.1GHz",
    "Intel® Core™ i5-10210U 1.6~4.2GHz",
    "Intel® Core™ i7-10710U 1.1~4.7GHz",
    "Intel® Core™ i3-1215U 1.2~4.4GHz",
    "Intel® Core™ i5-1235U 1.3~4.4GHz",
    "Intel® Core™ i5-1240P 1.7~4.4GHz",
    "Intel® Core™ i7-1255U 1.7~4.7GHz",
  ],
};

const priceListSquare = [
  // 10 Inch
  { size: '10"', res: "1024×768", cpu: "J1900", model: "EPC-S1062A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '10"', res: "1024×768", cpu: "J6412", model: "EPC-S1072A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '10"', res: "1024×768", cpu: "i3-10110U", model: "EPC-S1092A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿31,990" },
  { size: '10"', res: "1024×768", cpu: "i5-10210U", model: "EPC-S1092A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿34,990" },
  { size: '10"', res: "1024×768", cpu: "i3-1215U", model: "EPC-S1022A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿31,990" },
  { size: '10"', res: "1024×768", cpu: "i5-1235U", model: "EPC-S1022A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  // 12 Inch
  { size: '12"', res: "1024×768", cpu: "J1900", model: "EPC-S1262A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '12"', res: "1024×768", cpu: "J6412", model: "EPC-S1272A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '12"', res: "1024×768", cpu: "i3-10110U", model: "EPC-S1292A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '12"', res: "1024×768", cpu: "i5-10210U", model: "EPC-S1292A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿34,990" },
  { size: '12"', res: "1024×768", cpu: "i7-10510U", model: "EPC-S1292A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '12"', res: "1024×768", cpu: "i3-1215U", model: "EPC-S1222A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '12"', res: "1024×768", cpu: "i5-1235U", model: "EPC-S1222A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '12"', res: "1024×768", cpu: "i7-1250U", model: "EPC-S1222A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  // 15 Inch
  { size: '15"', res: "1024×768", cpu: "J1900", model: "EPC-S1562A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '15"', res: "1024×768", cpu: "J6412", model: "EPC-S1572A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿27,990" },
  { size: '15"', res: "1024×768", cpu: "i3-10110U", model: "EPC-S1592A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '15"', res: "1024×768", cpu: "i5-10210U", model: "EPC-S1592A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿35,990" },
  { size: '15"', res: "1024×768", cpu: "i7-10510U", model: "EPC-S1592A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '15"', res: "1024×768", cpu: "i3-1215U", model: "EPC-S1522A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '15"', res: "1024×768", cpu: "i5-1235U", model: "EPC-S1522A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿34,990" },
  { size: '15"', res: "1024×768", cpu: "i7-1250U", model: "EPC-S1522A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  // 17 Inch
  { size: '17"', res: "1280×1024", cpu: "J1900", model: "EPC-S1762A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿29,990" },
  { size: '17"', res: "1280×1024", cpu: "J6412", model: "EPC-S1772A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿29,990" },
  { size: '17"', res: "1280×1024", cpu: "i3-10110U", model: "EPC-S1792A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '17"', res: "1280×1024", cpu: "i5-10210U", model: "EPC-S1792A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '17"', res: "1280×1024", cpu: "i7-10510U", model: "EPC-S1792A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  { size: '17"', res: "1280×1024", cpu: "i3-1215U", model: "EPC-S1722A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '17"', res: "1280×1024", cpu: "i5-1235U", model: "EPC-S1722A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '17"', res: "1280×1024", cpu: "i7-1250U", model: "EPC-S1722A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
];

const priceListWide = [
  // 12.5 Inch
  { size: '12.5"', res: "1920×1080", cpu: "J1900", model: "EPC-W1262A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿28,990" },
  { size: '12.5"', res: "1920×1080", cpu: "J6412", model: "EPC-W1272A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿28,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i3-10110U", model: "EPC-W1292A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i5-10210U", model: "EPC-W1292A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i7-10510U", model: "EPC-W1292A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i3-1215U", model: "EPC-W1222A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i5-1235U", model: "EPC-W1222A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '12.5"', res: "1920×1080", cpu: "i7-1250U", model: "EPC-W1222A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  // 13.3 Inch
  { size: '13.3"', res: "1920×1080", cpu: "J1900", model: "EPC-W1362A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿29,990" },
  { size: '13.3"', res: "1920×1080", cpu: "J6412", model: "EPC-W1372A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿29,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i3-10110U", model: "EPC-W1392A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i5-10210U", model: "EPC-W1392A", config: "i5-10210U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i7-10510U", model: "EPC-W1392A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿38,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i3-1215U", model: "EPC-W1322A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿33,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i5-1235U", model: "EPC-W1322A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿36,990" },
  { size: '13.3"', res: "1920×1080", cpu: "i7-1250U", model: "EPC-W1322A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿38,990" },
  // 15.6 Inch
  { size: '15.6"', res: "1920×1080", cpu: "J1900", model: "EPC-W1562A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿29,990" },
  { size: '15.6"', res: "1920×1080", cpu: "i7-10510U", model: "EPC-W1592A", config: "i7-10510U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  { size: '15.6"', res: "1920×1080", cpu: "i3-1215U", model: "EPC-W1522A", config: "i3-1215U / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '15.6"', res: "1920×1080", cpu: "i5-1235U", model: "EPC-W1522A", config: "i5-1235U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  { size: '15.6"', res: "1920×1080", cpu: "i7-1250U", model: "EPC-W1522A", config: "i7-1250U / 4G RAM / 128G SSD / 12V", price: "฿37,990" },
  // 18.5 Inch
  { size: '18.5"', res: "1920×1080", cpu: "J1900", model: "EPC-W1862A", config: "J1900 / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '18.5"', res: "1920×1080", cpu: "J6412", model: "EPC-W1872A", config: "J6412 / 4G RAM / 128G SSD / 12V", price: "฿32,990" },
  { size: '18.5"', res: "1920×1080", cpu: "i3-10110U", model: "EPC-W1892A", config: "i3-10110U / 4G RAM / 128G SSD / 12V", price: "฿34,990" },
];

const optionsList = [
  { no: 1, product: "Windows 10 Pro OEM", price: "฿3,950" },
  { no: 2, product: "Windows 11 Pro OEM", price: "฿4,590" },
  { no: 3, product: "Windows 10 IOT", price: "฿3,950" },
  { no: 4, product: "Windows 11 IOT", price: "฿4,590" },
  { no: 5, product: "Upgrade Wifi ABGN/AC → Wifi6", price: "Call" },
  { no: 6, product: "4G Sim Card", price: "Call" },
  { no: 7, product: "5G Sim Card", price: "Call" },
  { no: 8, product: "ซื้อประกันเพิ่ม ปีที่ 2", price: "15%" },
  { no: 9, product: "ซื้อประกันเพิ่ม ปีที่ 3", price: "20%" },
];

const categories = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "square", label: "Square Display" },
  { id: "wide", label: "Wide Display" },
  { id: "specs", label: "Specifications" },
  { id: "selection", label: "Product Selection" },
  { id: "pricelist", label: "Price List" },
  { id: "downloads", label: "Downloads" },
];

/* ───── Spec Table Component ───── */
const SpecTable = ({ model }: { model: typeof squareModels[0] }) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="text-center bg-primary/10 text-primary font-bold text-base">
            {model.name} Industrial Panel PC — {model.size} ({model.ratio})
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell className="font-medium w-1/3">CPU</TableCell><TableCell className="text-xs leading-relaxed">{sharedSpecs.cpuOptions.join(" / ")}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Memory</TableCell><TableCell>{sharedSpecs.memory}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Storage</TableCell><TableCell>{sharedSpecs.storage}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Cooling</TableCell><TableCell>{sharedSpecs.cooling}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">OS</TableCell><TableCell>{sharedSpecs.os}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">USB 2.0</TableCell><TableCell>{sharedSpecs.usb2}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">USB 3.0</TableCell><TableCell>{sharedSpecs.usb3}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">COM</TableCell><TableCell>{model.com}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Display</TableCell><TableCell>{sharedSpecs.display}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Audio</TableCell><TableCell>{sharedSpecs.audio}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Expansion</TableCell><TableCell>{sharedSpecs.expansion}</TableCell></TableRow>
        <TableRow><TableCell className="font-medium">Ethernet</TableCell><TableCell>{sharedSpecs.ethernet}</TableCell></TableRow>
      </TableBody>
    </Table>
  </div>
);

/* ───── Model Card ───── */
const ModelCard = ({ model }: { model: typeof squareModels[0] }) => (
  <div className="card-surface overflow-hidden group hover:border-primary/30 transition-all">
    <div className="bg-secondary/30 p-6 flex items-center justify-center">
      <img src={model.image} alt={model.name} className="max-h-44 object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground">{model.name}</h3>
        <Badge variant="secondary" className="text-xs">{model.size} ({model.ratio})</Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <a href={model.datasheet} target="_blank" rel="noopener noreferrer">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Datasheet
          </a>
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onQuote?.(model.name)}>
          <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
        </Button>
      </div>
    </div>
  </div>
);

const ITEMS_PER_PAGE = 10;

/* ───── Main Component ───── */
const EPCSeries = () => {
  const [activeCategory, setActiveCategory] = useState("overview");
  const [squarePage, setSquarePage] = useState(1);
  const [widePage, setWidePage] = useState(1);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="md:w-1/2">
              <img
                src="https://static.wixstatic.com/media/0597a3_b15aa4e6e65b4d66a09d5e51e22985b8~mv2.png/v1/fill/w_600,h_335,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/EPC%20Series.png"
                alt="EPC Panel PC Series"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">CESIPC Industrial Panel PC</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                EPC <span className="text-gradient">Panel PC</span> Series
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Global Industrial Panel PC Solutions for Thai Industries
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                โซลูชั่นที่ยืดหยุ่นเหมือน LEGO สำหรับโรงงานไทย นำเสนอหน้าจอ HD คุณภาพสูง พร้อมสถาปัตยกรรมแบบโมดูลาร์ที่ปรับเปลี่ยนได้ตามความต้องการ ด้วยหน้าจอขนาด 8"-24" นิ้ว ในอัตราส่วน 4:3 และ 16:9
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.entgroup.co.th/_files/ugd/0597a3_2521046b3a214087a30e851159a6b428.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Product Overview
                  </a>
                </Button>
                <Button size="sm" onClick={() => setQuoteProduct("EPC Series")}>
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> ขอใบเสนอราคา
                </Button>
              </div>
            </div>
          </div>

          {/* Key highlights strip */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
            {[
              { label: "เมนบอร์ดอุตสาหกรรมแท้", icon: "✨" },
              { label: "ผลิตโดยตรงจากโรงงาน", icon: "✨" },
              { label: "ขัดข้อง 0.5%/ปี", icon: "✨" },
              { label: "ปรับแต่งเฉพาะลูกค้า", icon: "✨" },
              { label: "รับประกัน 1-3 ปี", icon: "✨" },
              { label: "มาตรฐานสากลครบ", icon: "✨" },
            ].map((item, i) => (
              <div key={i} className="card-surface p-3 text-center text-xs font-medium text-foreground">
                <span className="block text-lg mb-1">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Nav */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">

        {/* Overview / Certifications */}
        <section id="overview">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_7c3f2bd701f340ee993f725c168c1bec~mv2.png/v1/fill/w_757,h_143,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-06-23%20at%2008_10_03.png"
              alt="CESIPC Certifications"
              className="w-full h-auto p-6"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-3">สินค้าของเราได้รับการยอมรับและติดตั้งใช้งานกับอุตสาหกรรมระดับโลก</p>
        </section>

        {/* Industrial Grade Section */}
        <section className="card-surface p-6 md:p-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            อะไรทำให้คอมพิวเตอร์ของเราเป็น Industrial-Grade จริงๆ?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            CESIPC Industrial Panel PC ไม่ได้แค่ติดป้าย "มาตรฐานอุตสาหกรรม" แต่ถูกออกแบบและผลิตให้ตอบสนองความต้องการที่เข้มงวดของสภาพแวดล้อมโรงงานจริง ผ่านการทดสอบอย่างครอบคลุม และได้รับการรับรองสำหรับการทำงานที่เชื่อถือได้
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "💧",
                title: "มาตรฐานป้องกัน IP65",
                desc: "แผงหน้าระดับ IP65 ปกป้องชิ้นส่วนภายในจากฝุ่น เศษโลหะ สายน้ำแรงดันสูง และสารทำความสะอาด",
              },
              {
                icon: "🔧",
                title: "ชิ้นส่วนระดับอุตสาหกรรมแท้",
                desc: "ทนทานต่ออุณหภูมิสุดขั้ว การสั่นสะเทือน ความชื้นสูง การทำงานต่อเนื่อง 24/7 ต่างจากชิ้นส่วนระดับผู้บริโภค",
              },
              {
                icon: "☀️",
                title: "หน้าจอคมชัด",
                desc: "ความสว่างสูง 1,000 nits เหมาะกลางแจ้ง เคลือบ Anti-glare ลดแสงสะท้อน เพิ่มการมองเห็นที่ชัดเจน",
              },
            ].map((item, i) => (
              <div key={i} className="card-surface p-5">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">คุณสมบัติและประโยชน์เด่น</h2>
          <p className="text-muted-foreground text-center mb-8">LEGO Mode Architecture — ยืดหยุ่น ขยายได้ ปรับแต่งง่าย</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="card-surface p-5">
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Square Display Models */}
        <section id="square">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            หน้าจอแบบสี่เหลี่ยมจตุรัส <span className="text-gradient">Square Display</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            อัตราส่วน 4:3 — พื้นที่แนวตั้งมาก เหมาะกับ List, Portrait, ระบบ Legacy และ Industrial เสถียรในการแสดงผล
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {squareModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>

        {/* Wide Display Models */}
        <section id="wide">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            หน้าจอแบบสี่เหลี่ยมผืนผ้า <span className="text-gradient">Wide Display</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            อัตราส่วน 16:9 — พื้นที่กว้างขวาง แสดงข้อมูลหลายชุดพร้อมกัน ลดการเปลี่ยนหน้าจอ รูปทรงทันสมัย
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wideModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>

        {/* Specifications */}
        <section id="specs">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Specifications</h2>
          <Tabs defaultValue="epc-s10" className="w-full">
            <TabsList className="flex flex-wrap gap-1 h-auto bg-secondary/30 p-1.5 rounded-lg mb-6">
              {[...squareModels, ...wideModels].map((m) => (
                <TabsTrigger key={m.id} value={m.id} className="text-xs px-3 py-1.5">
                  {m.size} {m.ratio === "4:3" ? "□" : "▬"}
                </TabsTrigger>
              ))}
            </TabsList>
            {[...squareModels, ...wideModels].map((m) => (
              <TabsContent key={m.id} value={m.id}>
                <div className="card-surface overflow-hidden">
                  <SpecTable model={m} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Product Selection Table */}
        <section id="selection">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Product Selection Guide</h2>
          <div className="card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10">
                    <TableHead className="text-primary font-bold">No.</TableHead>
                    <TableHead className="text-primary font-bold">Model</TableHead>
                    <TableHead className="text-primary font-bold">Part Number</TableHead>
                    <TableHead className="text-primary font-bold">Processor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productSelectionTable.map((row) => (
                    <TableRow key={row.no}>
                      <TableCell className="font-medium">{row.no}</TableCell>
                      <TableCell className="font-mono text-sm">{row.model}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.partNumber}</TableCell>
                      <TableCell className="text-sm">{row.cpu}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Price List */}
        <section id="pricelist">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            Price List <span className="text-gradient">ราคาสินค้า</span>
          </h2>

          <Tabs defaultValue="square-price" className="w-full" onValueChange={() => { setSquarePage(1); setWidePage(1); }}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="square-price">จอแบบสี่เหลี่ยมจตุรัส</TabsTrigger>
              <TabsTrigger value="wide-price">จอภาพแบบสี่เหลี่ยมผืนผ้า</TabsTrigger>
              <TabsTrigger value="options">Windows / Options</TabsTrigger>
            </TabsList>

            {["square-price", "wide-price"].map((tabValue) => {
              const data = tabValue === "square-price" ? priceListSquare : priceListWide;
              const page = tabValue === "square-price" ? squarePage : widePage;
              const setPage = tabValue === "square-price" ? setSquarePage : setWidePage;
              const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
              const paginatedData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

              return (
                <TabsContent key={tabValue} value={tabValue}>
                  <div className="card-surface overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-primary/10">
                            <TableHead className="text-primary font-bold">Display Size</TableHead>
                            <TableHead className="text-primary font-bold">Resolution</TableHead>
                            <TableHead className="text-primary font-bold">Processor</TableHead>
                            <TableHead className="text-primary font-bold">Model</TableHead>
                            <TableHead className="text-primary font-bold">Configuration</TableHead>
                            <TableHead className="text-primary font-bold text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedData.map((row, i) => (
                            <TableRow key={i}>
                              <TableCell>{row.size}</TableCell>
                              <TableCell>{row.res}</TableCell>
                              <TableCell className="text-sm">{row.cpu}</TableCell>
                              <TableCell className="font-mono text-sm">{row.model}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{row.config}</TableCell>
                              <TableCell className="text-right font-bold text-primary">{row.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          แสดง {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, data.length)} จาก {data.length} รายการ
                        </p>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="h-8 w-8 p-0"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                              key={p}
                              variant={p === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPage(p)}
                              className="h-8 w-8 p-0 text-xs"
                            >
                              {p}
                            </Button>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="h-8 w-8 p-0"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}

            <TabsContent value="options">
              <div className="card-surface overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10">
                        <TableHead className="text-primary font-bold w-16">No.</TableHead>
                        <TableHead className="text-primary font-bold">Product</TableHead>
                        <TableHead className="text-primary font-bold text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {optionsList.map((row) => (
                        <TableRow key={row.no}>
                          <TableCell className="font-medium">{row.no}</TableCell>
                          <TableCell>{row.product}</TableCell>
                          <TableCell className="text-right font-bold text-primary">{row.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Remarks */}
          <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">📌 หมายเหตุ</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• ราคาสินค้าอาจเปลี่ยนแปลงได้โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
              <li>• ราคาไม่รวม VAT 7%</li>
              <li>• รับประกันมาตรฐาน 1 ปี ซื้อประกันเพิ่มได้สูงสุด 3 ปี</li>
            </ul>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "CESIPC & ENTGROUP E-Catalog", url: "https://www.entgroup.co.th/_files/ugd/0597a3_9dad5caa6c4d4410a723cab33c3177bf.pdf" },
              ...squareModels.map((m) => ({ name: m.name, url: m.datasheet })),
              { name: "EPC-S17X2A", url: "https://www.entgroup.co.th/_files/ugd/0597a3_4aadb2eda8ae4dcdb9e1eab7d5ecf42e.pdf" },
              ...wideModels.map((m) => ({ name: m.name, url: m.datasheet })),
              { name: "EPC-W12X2A", url: "https://www.entgroup.co.th/_files/ugd/0597a3_06738f7618f84058a4f0c1d3cc9d8a95.pdf" },
            ].map((dl, i) => (
              <a
                key={i}
                href={dl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface p-4 flex items-center gap-3 hover:border-primary/30 transition-all group"
              >
                <Download className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{dl.name}</p>
                  <p className="text-xs text-muted-foreground">PDF Datasheet</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section>
          <div className="card-surface overflow-hidden rounded-lg">
            <img src={epcLegoBanner} alt="EPC-S10X2A LEGO MODE Technology" className="w-full h-auto" loading="lazy" />
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ EPC Panel PC Series?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือก Panel PC ที่เหมาะกับโรงงานของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a href="https://www.entgroup.co.th/_files/ugd/0597a3_9dad5caa6c4d4410a723cab33c3177bf.pdf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" /> ดาวน์โหลด E-Catalog
              </a>
            </Button>
            <Button asChild>
              <a href="/quote">
                ขอใบเสนอราคา
              </a>
            </Button>
          </div>
        </div>
      </div>
      <FooterCompact />
    </div>
  );
};


export default EPCSeries;
