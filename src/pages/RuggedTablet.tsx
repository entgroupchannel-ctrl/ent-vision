import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Shield, Droplets, Battery, Smartphone, Monitor, Download, ChevronLeft, ChevronRight, Wifi } from "lucide-react";
import ruggedHero from "@/assets/rugged-tablet-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* ───── Product Categories ───── */

const goleRuggedTablets = [
  {
    id: "f7g",
    name: "Gole F7G",
    size: '7"',
    os: "Android / Windows",
    highlight: "หน้าจอสัมผัส 7 นิ้ว ทนทาน กันน้ำ กันฝุ่น",
    image: "https://static.wixstatic.com/media/0597a3_7ac8863aec774fe2a9f5ef3eae9490a1~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(2).png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_92835c695be34af08b00b1dc3394fe83.pdf",
  },
  {
    id: "f7r",
    name: "Gole F7R",
    size: '7"',
    os: "Android",
    highlight: "คอมแพ็คท์ ทนทาน พกพาสะดวก สำหรับงานสนาม",
    image: "https://static.wixstatic.com/media/0597a3_f7670923b4fa410cb096b5a7357de026~mv2.png/v1/fill/w_350,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(2).png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_b2fb7597f1b4458c862548e91b6bb6cc.pdf",
  },
  {
    id: "f9a",
    name: "Gole F9A",
    size: '9"',
    os: "Android",
    highlight: "หน้าจอกว้างขึ้น พร้อมแบตเตอรี่ขนาดใหญ่",
    image: "https://static.wixstatic.com/media/0597a3_aa3fa9aff52147e780c6bdbd364e8516~mv2.png/v1/crop/x_0,y_3,w_1040,h_998/fill/w_333,h_320,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(3).png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_3a33965f742b4034b974ef56aab56170.pdf",
  },
];

const goleWindowsModels = [
  { name: "Rugged F3", price: "฿20,900", datasheet: "" },
  { name: "Rugged F3APL", price: "฿14,900", datasheet: "" },
  { name: "Rugged F6APL", price: "฿15,900", datasheet: "" },
  { name: "Rugged F11APL", price: "฿16,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_f02217601dad4d409461b2ddd18e56c4.pdf" },
  { name: "Rugged F12APL", price: "฿19,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_8b4c9a6183374654920d6774c95db305.pdf" },
  { name: "Rugged F15APL N3450", price: "฿20,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_b353baf418bc46279e6302dfd90a5848.pdf" },
  { name: "Rugged F15APL J3355", price: "฿19,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_1940ca9c1adf4d2296646195d8d9a347.pdf" },
];

const goleAndroidModels = [
  { name: "Rugged F3R", price: "฿10,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_f8525dea6d034b26b5b09324b8e15bbc.pdf" },
  { name: "Rugged F6R", price: "฿12,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_50b47eff40c94ec28d0ae8fcb77d0ef8.pdf" },
  { name: "Rugged F11R (RK3568)", price: "฿17,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_b93e6728b85440fc8dba1818fafbe943.pdf" },
  { name: "Rugged F12R", price: "฿17,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_b121d1a8618a4a0486d7ef4f6012bf1c.pdf" },
  { name: "Rugged F15R", price: "฿19,900", datasheet: "https://www.entgroup.co.th/_files/ugd/005637_d99131aa2339461fadbb2b2e188cd0b7.pdf" },
];

const emRuggedTablets = [
  {
    id: "em-i81f",
    name: "EM-i81F",
    size: '8"',
    highlight: "Rugged Tablet 8 นิ้ว ทนทานระดับอุตสาหกรรม",
    image: "https://static.wixstatic.com/media/0597a3_0fac1e058b80441ebdb821800f796177~mv2.png/v1/fill/w_1192,h_627,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_0fac1e058b80441ebdb821800f796177~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_2be728ad3b0349d3b33554ed04c0214e.pdf",
  },
  {
    id: "em-i10j",
    name: "EM-i10J",
    size: '10"',
    highlight: "Rugged Tablet 10 นิ้ว พร้อมพอร์ตเชื่อมต่อครบ",
    image: "https://static.wixstatic.com/media/0597a3_4812be49b75149b49d9639ef26aa1d00~mv2.png/v1/fill/w_1225,h_697,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_4812be49b75149b49d9639ef26aa1d00~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_6d72e4515e004620af862a7897168a95.pdf",
  },
  {
    id: "em-i17j",
    name: "EM-i17J",
    size: '17"',
    highlight: "Rugged Tablet 17 นิ้ว หน้าจอใหญ่ สำหรับงานภาคสนาม",
    image: "https://static.wixstatic.com/media/0597a3_d56f6ce910514784abf6e1838ec2dcfb~mv2.png/v1/fill/w_1378,h_943,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/EM-i17J%20Banner.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_d2a64ac1b5444600b9255fcae1311289.pdf",
  },
  {
    id: "em-hc195",
    name: "EM-HC195",
    size: '10.1"',
    highlight: "แท็บเล็ตทางการแพทย์ MT6833 Octa-core, RAM 8GB, สแกน 2D + NFC, IP65",
    image: "https://static.wixstatic.com/media/0597a3_effdffe99eeb4c9482e4367b8d4b48dcf001.jpg/v1/fill/w_316,h_510,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_effdffe99eeb4c9482e4367b8d4b48dcf001.jpg",
    datasheet: "",
  },
];

const ruggedNotebooks = [
  {
    id: "em-x15",
    name: "EM-X15 Rugged Notebook",
    size: '15.6"',
    highlight: "Rugged Notebook 15.6 นิ้ว ทนทาน มาตรฐานทหาร MIL-STD-810G",
    image: "https://static.wixstatic.com/media/0597a3_6ae40ba69bfb4762aa0e9c2ac9b5b89a~mv2.png/v1/crop/x_117,y_0,w_2057,h_894/fill/w_1323,h_575,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/em-x15.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_55b872cb254b4f0f8d8a1075e0934606.pdf",
  },
  {
    id: "x15m",
    name: "X15M Rugged Notebook",
    size: '15.6"',
    highlight: "Rugged Notebook รุ่นอัปเกรด ประสิทธิภาพสูงสำหรับงานหนัก",
    image: "https://static.wixstatic.com/media/0597a3_df606e2bfc04499c95a0acd2a00b195c~mv2.png/v1/fill/w_1181,h_616,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_df606e2bfc04499c95a0acd2a00b195c~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_55b872cb254b4f0f8d8a1075e0934606.pdf",
  },
];

const tpcSeries = [
  {
    id: "tpc-1062a",
    name: "TPC-1062A",
    size: '10"',
    highlight: "Rugged Tablet เกรดอุตสาหกรรม หน้าจอสัมผัส",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_70c1f8faf9cd4eadb93ffb5479aa6854.pdf",
  },
  {
    id: "tpc-1082a",
    name: "TPC-1082A",
    size: '10"',
    highlight: "Rugged Tablet เกรดอุตสาหกรรม สเปคสูง",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_288240e733304dba8334ca07cdc411cf.pdf",
  },
];

const pipoModels = [
  {
    id: "pipo-x10s",
    name: "PIPO X10s Pro",
    size: '10.1"',
    os: "Windows",
    highlight: "Mini PC Tablet จอ IPS 10.1 นิ้ว Full HD 1920×1280 มัลติทัช",
    image: "https://static.wixstatic.com/media/005637_1052a4dac1824ab7b2db7793b7435663~mv2.jpg/v1/fill/w_831,h_561,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9Apipo2.jpg",
    datasheet: "https://www.entgroup.co.th/_files/ugd/005637_ee3154a9a7794bb8a057f61639a279a7.pdf",
  },
  {
    id: "pipo-x11",
    name: "PIPO X11 Pro",
    size: '8.9"',
    os: "Windows",
    highlight: "Mini PC Tablet จอ IPS 8.9 นิ้ว 1920×1200 คอมแพ็คท์",
    image: "https://static.wixstatic.com/media/005637_1872094ebf1146b39f9cec6d05603756~mv2.jpg/v1/crop/x_0,y_0,w_996,h_781/fill/w_781,h_612,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/reS__12632141_1.jpg",
    datasheet: "https://www.entgroup.co.th/_files/ugd/005637_4c0589c2f2854c53bc8db087b8bd00e5.pdf",
  },
  {
    id: "pipo-x4",
    name: "PIPO X4",
    size: '10.1"',
    os: "Windows 10 Pro",
    highlight: "Rugged IP67 กันน้ำ กันฝุ่น Intel Pentium J4205 RAM 8GB สแกนลายนิ้วมือ",
    image: "https://static.wixstatic.com/media/0597a3_92168420e69d4c859d0b0f595e8b47c3~mv2.png/v1/fill/w_1224,h_450,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-11-18%20at%2011_27_58.png",
    datasheet: "",
  },
];

const features = [
  { icon: Shield, title: "ทนทานระดับอุตสาหกรรม", desc: "ผ่านมาตรฐาน MIL-STD-810G ทนการตกกระแทก สั่นสะเทือน อุณหภูมิสุดขั้ว" },
  { icon: Droplets, title: "กันน้ำ กันฝุ่น IP65/IP67", desc: "มาตรฐาน IP65-IP67 ปกป้องจากฝุ่น น้ำ สารเคมี ใช้งานในทุกสภาพแวดล้อม" },
  { icon: Battery, title: "แบตเตอรี่อึดทนนาน", desc: "แบตเตอรี่สูงสุด 6,000 mAh ถอดเปลี่ยนได้ ใช้งานต่อเนื่องยาวนาน" },
  { icon: Smartphone, title: "หน้าจอสัมผัสคุณภาพสูง", desc: "IPS Full HD รองรับมัลติทัช ใช้งานได้แม้ใส่ถุงมือ ความสว่างสูง" },
  { icon: Monitor, title: "หลากหลายขนาด 7-17 นิ้ว", desc: "เลือกได้ตั้งแต่ 7 นิ้วพกพาสะดวก จนถึง 17 นิ้วสำหรับงานภาคสนาม" },
  { icon: Wifi, title: "เชื่อมต่อครบครัน", desc: "WiFi, Bluetooth, 3G/4G, NFC, สแกนลายนิ้วมือ, กล้องคู่ ตามรุ่น" },
];

const categories = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "gole", label: "Gole Series" },
  { id: "em-rugged", label: "EM Rugged" },
  { id: "notebook", label: "Rugged Notebook" },
  { id: "tpc", label: "TPC Series" },
  { id: "pipo", label: "PIPO" },
  { id: "pricelist", label: "Price List" },
  { id: "downloads", label: "Downloads" },
];

const ITEMS_PER_PAGE = 10;

/* ───── Product Card ───── */
const ProductCard = ({ product }: { product: { name: string; size?: string; highlight: string; image?: string; datasheet: string } }) => (
  <div className="card-surface overflow-hidden group hover:border-primary/30 transition-all">
    {product.image && (
      <div className="bg-secondary/30 p-4 flex items-center justify-center h-48">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
    )}
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display font-bold text-foreground text-sm">{product.name}</h3>
        {product.size && <Badge variant="secondary" className="text-xs shrink-0">{product.size}</Badge>}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{product.highlight}</p>
      <div className="flex gap-2">
        {product.datasheet && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={product.datasheet} target="_blank" rel="noopener noreferrer">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Datasheet
            </a>
          </Button>
        )}
        <Button size="sm" asChild className="flex-1">
          <a href="https://line.me/R/ti/p/%40njm2688e" target="_blank" rel="noopener noreferrer">
            ขอราคา
          </a>
        </Button>
      </div>
    </div>
  </div>
);

/* ───── Main Component ───── */
const RuggedTablet = () => {
  const [activeCategory, setActiveCategory] = useState("overview");
  const [winPage, setWinPage] = useState(1);
  const [androidPage, setAndroidPage] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img src={ruggedHero} alt="" className="w-full h-full object-cover" width={1920} height={640} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Rugged & Industrial Grade</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                Rugged <span className="text-gradient">Tablet & Notebook</span>
              </h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                คอมพิวเตอร์หน้าจอสัมผัสเกรดอุตสาหกรรมที่ทนทานและอเนกประสงค์ รองรับทั้ง Android และ Windows พร้อมมาตรฐาน IP65/IP67 กันน้ำ กันฝุ่น ทนกระแทก เหมาะกับงานภาคสนามและโรงงานอุตสาหกรรม
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.entgroup.co.th/_files/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Product Overview
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href="https://line.me/R/ti/p/%40njm2688e" target="_blank" rel="noopener noreferrer">
                  ขอใบเสนอราคา
                </a>
              </Button>
            </div>
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
        {/* Overview */}
        <section id="overview">
          <div className="card-surface overflow-hidden">
            <img
              src="https://static.wixstatic.com/media/0597a3_c353892b50a549d3971cb83d643de648~mv2.png/v1/crop/x_0,y_27,w_2260,h_1162/fill/w_1314,h_667,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/RuggedBanner01.png"
              alt="Rugged Tablet Overview"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: "กันน้ำ กันฝุ่น", value: "IP65 / IP67" },
              { label: "ขนาดหน้าจอ", value: '7" - 17"' },
              { label: "ระบบปฏิบัติการ", value: "Android / Windows" },
              { label: "แบตเตอรี่", value: "สูงสุด 6,000 mAh" },
            ].map((item, i) => (
              <div key={i} className="card-surface p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">คุณสมบัติเด่น</h2>
          <p className="text-muted-foreground text-center mb-8">ทนทาน ยืดหยุ่น พร้อมลุยทุกสถานการณ์</p>
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

        {/* Gole Rugged Series */}
        <section id="gole">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Gole <span className="text-gradient">Rugged Series</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Rugged Tablet มาพร้อมหน้าจอสัมผัสความละเอียดสูง ลำโพงในตัว WiFi รองรับทั้ง Android & Windows
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {goleRuggedTablets.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Gole product images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://static.wixstatic.com/media/0597a3_d864fa53281f401c87833762e860a193~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(3).png",
              "https://static.wixstatic.com/media/0597a3_cf5add6fc863487f82013b5de835a8ae~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(4).png",
              "https://static.wixstatic.com/media/0597a3_0eca70dbf64e441eb910eb4623be9857~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(6).png",
              "https://static.wixstatic.com/media/0597a3_a351201828184c4785720ce6336a78eb~mv2.png/v1/fill/w_391,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Rugged%20Tablet%20(5).png",
            ].map((img, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={img} alt={`Gole Rugged ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* EM Rugged Tablets */}
        <section id="em-rugged">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            EM <span className="text-gradient">Rugged Tablet</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Rugged Tablet ระดับมืออาชีพ สำหรับงานอุตสาหกรรม โลจิสติกส์ และการแพทย์</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emRuggedTablets.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Rugged Notebook */}
        <section id="notebook">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Rugged <span className="text-gradient">Notebook</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">โน้ตบุ๊คทนทานมาตรฐานทหาร MIL-STD-810G สำหรับงานภาคสนาม</p>

          <div className="card-surface overflow-hidden mb-6">
            <img
              src="https://static.wixstatic.com/media/0597a3_326a8c23999d4b11b058da0668a45aa1~mv2.png/v1/fill/w_1314,h_561,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_326a8c23999d4b11b058da0668a45aa1~mv2.png"
              alt="Rugged Notebook Banner"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ruggedNotebooks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* TPC Series */}
        <section id="tpc">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            TPC <span className="text-gradient">Series</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Rugged Tablet คอมพิวเตอร์หน้าจอสัมผัสเกรดอุตสาหกรรม ทนทานและอเนกประสงค์</p>

          <div className="card-surface overflow-hidden mb-6">
            <img
              src="https://static.wixstatic.com/media/0597a3_635e82bd628b488aa39a0efce082f43a~mv2.png/v1/fill/w_1316,h_456,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/tpc-banner02.png"
              alt="TPC Series Banner"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tpcSeries.map((p) => (
              <ProductCard key={p.id} product={{ ...p, image: undefined }} />
            ))}
          </div>
        </section>

        {/* PIPO */}
        <section id="pipo">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            PIPO <span className="text-gradient">Tablet PC</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Mini PC Tablet ผลิตภัณฑ์ดิจิทัลรวมทั้งแท็บเล็ต กล่องทีวี และมินิพีซี จอสัมผัส IPS Full HD</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipoModels.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Price List */}
        <section id="pricelist">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            Price List <span className="text-gradient">ราคาสินค้า</span>
          </h2>

          <Tabs defaultValue="windows" className="w-full" onValueChange={() => { setWinPage(1); setAndroidPage(1); }}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>

            {[
              { value: "windows", data: goleWindowsModels, page: winPage, setPage: setWinPage },
              { value: "android", data: goleAndroidModels, page: androidPage, setPage: setAndroidPage },
            ].map(({ value, data, page, setPage }) => {
              const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
              const paginated = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

              return (
                <TabsContent key={value} value={value}>
                  <div className="card-surface overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-primary/10">
                            <TableHead className="text-primary font-bold w-12">No.</TableHead>
                            <TableHead className="text-primary font-bold">Model</TableHead>
                            <TableHead className="text-primary font-bold text-right">Price</TableHead>
                            <TableHead className="text-primary font-bold text-center w-28">Datasheet</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginated.map((row, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{(page - 1) * ITEMS_PER_PAGE + i + 1}</TableCell>
                              <TableCell className="font-semibold">{row.name}</TableCell>
                              <TableCell className="text-right font-bold text-primary">{row.price}</TableCell>
                              <TableCell className="text-center">
                                {row.datasheet ? (
                                  <a href={row.datasheet} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                    <Download className="w-4 h-4 inline" />
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground text-xs">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          แสดง {(page - 1) * ITEMS_PER_PAGE + 1}-{Math.min(page * ITEMS_PER_PAGE, data.length)} จาก {data.length} รายการ
                        </p>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="h-8 w-8 p-0">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="h-8 w-8 p-0 text-xs">
                              {p}
                            </Button>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="h-8 w-8 p-0">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          <div className="mt-4 p-4 bg-secondary/30 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">📌 หมายเหตุ</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• ราคาสินค้าอาจเปลี่ยนแปลงได้โดยมิต้องแจ้งให้ทราบล่วงหน้า</li>
              <li>• ราคาไม่รวม VAT 7%</li>
              <li>• รับประกันมาตรฐาน 1 ปี</li>
            </ul>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Gole Product Overview", url: "https://www.entgroup.co.th/_files/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" },
              { name: "Rugged Knowledge", url: "https://www.entgroup.co.th/_files/ugd/0597a3_990b58aea85c404f923495453e23b027.pdf" },
              { name: "EM Rugged Notebook", url: "https://www.entgroup.co.th/_files/ugd/0597a3_e2bfa41d47a1445b87da80e961544e2d.pdf" },
              { name: "EM-X15 / X15M Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_55b872cb254b4f0f8d8a1075e0934606.pdf" },
              { name: "EM-i81F Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_2be728ad3b0349d3b33554ed04c0214e.pdf" },
              { name: "EM-i10J Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_6d72e4515e004620af862a7897168a95.pdf" },
              { name: "TPC-1062A Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_70c1f8faf9cd4eadb93ffb5479aa6854.pdf" },
              { name: "TPC-1082A Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_288240e733304dba8334ca07cdc411cf.pdf" },
              { name: "PIPO X10s Pro Datasheet", url: "https://www.entgroup.co.th/_files/ugd/005637_ee3154a9a7794bb8a057f61639a279a7.pdf" },
              { name: "วารสาร Rugged", url: "https://www.entgroup.co.th/_files/ugd/0597a3_064a791320d74e85957143c869a8c0fd.pdf" },
              { name: "Gole F9A Overview", url: "https://www.entgroup.co.th/_files/ugd/0597a3_3a33965f742b4034b974ef56aab56170.pdf" },
              { name: "EM-i17J Datasheet", url: "https://www.entgroup.co.th/_files/ugd/0597a3_d2a64ac1b5444600b9255fcae1311289.pdf" },
            ].map((dl, i) => (
              <a key={i} href={dl.url} target="_blank" rel="noopener noreferrer" className="card-surface p-4 flex items-center gap-3 hover:border-primary/30 transition-all group">
                <Download className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{dl.name}</p>
                  <p className="text-xs text-muted-foreground">PDF</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ Rugged Tablet & Notebook?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือก Rugged Device ที่เหมาะกับงานของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a href="https://www.entgroup.co.th/_files/ugd/0597a3_67de374f10ce40cbb6008623c5212a03.pdf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" /> ดาวน์โหลด Catalog
              </a>
            </Button>
            <Button asChild>
              <a href="https://line.me/R/ti/p/%40njm2688e" target="_blank" rel="noopener noreferrer">
                ขอใบเสนอราคา
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuggedTablet;
