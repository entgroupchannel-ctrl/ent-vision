import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Droplets, Shield, ThermometerSun, Cpu, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FooterCompact from "@/components/FooterCompact";

const models = [
  {
    id: "wp-10",
    name: "Water Proof — 10 inch",
    model: "UTC-S1061G (KLD-1061D)",
    image: "https://static.wixstatic.com/media/0597a3_af7e5b509d7746fc92da5800de490b80~mv2.png/v1/fill/w_284,h_195,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Wp-004.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_21f4cb97b2764af98b370fcc99f58592.pdf",
    specs: {
      "Screen Size": "10 inch LED",
      "Protection": "IP67 & IP69K",
      "Touch": "Capacitive Touch",
      "Material": "Industrial Grade",
      "Design": "Fanless",
      "OS": "Windows / Linux",
    },
  },
  {
    id: "wp-15",
    name: "Water Proof — 15 inch",
    model: "Touch Panel PC",
    image: "https://static.wixstatic.com/media/0597a3_bc6d3986e2d142f693bc7447618a1d3e~mv2.png/v1/fill/w_600,h_540,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IP67%20Standless%20(6).png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_844456de2ee747ed9114dee707ae3788.pdf",
    specs: {
      "Screen Size": "15 inch LED",
      "Resolution": "1920(H) × 1080(V) Full HD",
      "Touch": "10-point Capacitive Touch Screen",
      "CPU": "Intel Core i5-6200U",
      "RAM / Storage": "8GB DDR4 + 128GB SSD",
      "OS": "Windows 11",
      "Material": "Stainless Steel SUS304",
      "Protection": "IP67",
      "Design": "Fanless",
    },
  },
  {
    id: "wp-15-6",
    name: "Water Proof — 15.6 inch",
    model: "UTC-W1592G (KLD-1592GA)",
    image: "https://static.wixstatic.com/media/0597a3_c0a00a648d2143068e676c50a6d077df~mv2.jpg/v1/crop/x_0,y_39,w_718,h_493/fill/w_284,h_195,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WP15_edited.jpg",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_1459a6f9ce304306b4b973312f920066.pdf",
    specs: {
      "Screen Size": "15.6 inch LED",
      "Protection": "IP67 & IP69K",
      "Touch": "Capacitive Touch",
      "Material": "Industrial Grade",
      "Design": "Fanless",
      "OS": "Windows / Linux",
    },
  },
  {
    id: "wp-17",
    name: "Water Proof — 17 inch",
    model: "Stainless Steel Touch Panel PC",
    badge: "Best Seller",
    image: "https://static.wixstatic.com/media/0597a3_89215803eae94d8b8dfbd8bb1cb629b1~mv2.png/v1/fill/w_600,h_540,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_89215803eae94d8b8dfbd8bb1cb629b1~mv2.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_52b921b945d54d72a95465a7309152bc.pdf",
    specs: {
      "Screen Size": "17 inch LED",
      "Resolution": "1920(H) × 1080(V) Full HD",
      "Touch": "10-point Capacitive Touch Screen",
      "CPU": "Intel Core i5-6200U",
      "RAM / Storage": "8GB DDR4 + 128GB SSD",
      "OS": "Windows 11",
      "Material": "Stainless Steel SUS304",
      "Protection": "IP67",
      "Design": "Fanless",
    },
  },
  {
    id: "wp-21",
    name: "Water Proof — 21.5 inch (KLD)",
    model: "UTC-W2192G (KLD-2192GA)",
    image: "https://static.wixstatic.com/media/0597a3_265560fdc2694b42bfee0a5cfa89658f~mv2.png/v1/fill/w_284,h_195,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/WP%2021_5.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_8f9c5bb648384ba5b471eb4d369fa7b8.pdf",
    specs: {
      "Screen Size": "21.5 inch LED",
      "Protection": "IP67 & IP69K",
      "Touch": "Capacitive Touch",
      "Material": "Industrial Grade",
      "Design": "Fanless",
      "OS": "Windows / Linux",
    },
  },
  {
    id: "wp-21-ctn",
    name: "Water Proof — 21.5 inch (CTN)",
    model: "CTN-W21X2B",
    image: "https://static.wixstatic.com/media/0597a3_85962bd2b6c34f2eb110cfa091cb4ef4~mv2.png/v1/fill/w_284,h_195,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202568-07-30%20at%2018_14_33.png",
    datasheet: "https://www.entgroup.co.th/_files/ugd/0597a3_5aaca9bb9d554fdda93138cabb9582aa.pdf",
    specs: {
      "Screen Size": "21.5 inch LED",
      "Protection": "IP67 & IP69K",
      "Touch": "Capacitive Touch",
      "Material": "Industrial Grade",
      "Design": "Fanless",
      "OS": "Windows / Linux",
    },
  },
];

const features = [
  {
    icon: Droplets,
    title: "IP67 / IP69K Protection",
    desc: "กันน้ำ กันฝุ่นสมบูรณ์ จุ่มน้ำลึก 1 เมตร นาน 30 นาที ทนแรงดันน้ำ IP69K",
  },
  {
    icon: Shield,
    title: "Stainless Steel SUS304",
    desc: "วัสดุสแตนเลสเกรดอาหาร ทนทานสูง เหมาะอุตสาหกรรมอาหาร ยา เนื้อสัตว์",
  },
  {
    icon: ThermometerSun,
    title: "Fanless Design",
    desc: "ไร้พัดลม ลดจุดเสี่ยงความเสียหาย ไม่สะสมฝุ่น บำรุงรักษาต่ำ",
  },
  {
    icon: Cpu,
    title: "Industrial-Grade Components",
    desc: "ชิ้นส่วนระดับอุตสาหกรรม ทนทานต่อการทำงานหนักต่อเนื่อง 24/7",
  },
  {
    icon: Monitor,
    title: "Capacitive Touch Screen",
    desc: "หน้าจอสัมผัส 10 จุด ใช้งานด้วยถุงมือได้ แม้มือเปียก",
  },
];

const gallery = [
  "https://static.wixstatic.com/media/0597a3_4c1c8d61641743aabf446588dba6bb76~mv2.png/v1/fill/w_405,h_365,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IP67%20Standless%20(5).png",
  "https://static.wixstatic.com/media/0597a3_349f3590742946d59757e82db9058351~mv2.png/v1/fill/w_405,h_365,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IP67%20Standless%20(4).png",
  "https://static.wixstatic.com/media/0597a3_2572d551426a494fb15f36a62888af4f~mv2.png/v1/fill/w_400,h_365,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IP67%20Standless%20(3).png",
  "https://static.wixstatic.com/media/0597a3_8a82f1f1b9834e13adfcb0d5b60392f6~mv2.png/v1/fill/w_358,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/WP%20PC%20(3).png",
  "https://static.wixstatic.com/media/0597a3_395098f7c1a249cdbe9eacd4db009eb5~mv2.png/v1/fill/w_396,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_395098f7c1a249cdbe9eacd4db009eb5~mv2.png",
  "https://static.wixstatic.com/media/0597a3_0e8e591a5b0b47348effb95ee8e90cba~mv2.png/v1/fill/w_401,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_0e8e591a5b0b47348effb95ee8e90cba~mv2.png",
  "https://static.wixstatic.com/media/0597a3_09cd9c375cb741aa96abd2e2a32eded7~mv2.png/v1/fill/w_401,h_360,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E0%B8%88%E0%B8%AD%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%20(2).png",
];

const useCases = [
  "อุตสาหกรรมอาหารและเครื่องดื่ม",
  "โรงงานแปรรูปเนื้อสัตว์",
  "อุตสาหกรรมยาและเวชภัณฑ์",
  "ห้องปลอดเชื้อ / Clean Room",
  "โรงงานเคมีภัณฑ์",
  "พื้นที่เปียกชื้น / ล้างน้ำได้",
];

const WaterproofPC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8 py-6">
            <div className="md:w-1/2">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">IP67 & IP69K Certified</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Waterproof <span className="text-gradient">Panel PC</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                คอมพิวเตอร์อุตสาหกรรมกันน้ำ กันฝุ่น IP67/IP69K สแตนเลส SUS304 เกรดอาหาร ออกแบบไร้พัดลม เหมาะสำหรับอุตสาหกรรมอาหาร เครื่องดื่ม ยา และพื้นที่ที่ต้องล้างทำความสะอาดได้
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <a href="/quote">
                    ขอใบเสนอราคา
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.entgroup.co.th/_files/ugd/0597a3_9c183e569b0c43bd9fe64184fff90503.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1.5" /> Product Overview
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://static.wixstatic.com/media/0597a3_af08675d14124a59a86c4be31805907a~mv2.png/v1/fill/w_1314,h_604,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/WP%20Banner02.png"
                alt="Waterproof Panel PC Banner"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Features */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            ทำไมต้อง <span className="text-gradient">Waterproof Panel PC</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <div key={i} className="card-surface p-5 text-center">
                <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IP67 Explanation */}
        <section className="card-surface p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src="https://static.wixstatic.com/media/0597a3_0ad34056abce4284bb55ec5a2fb4ea1b~mv2.png/v1/fill/w_1233,h_646,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/WP-003.png"
                alt="IP67 Protection"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-display font-bold text-foreground mb-3">ระดับการป้องกัน IP67 & IP69K</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0">✅</span>
                  <span>ปิดผนึกป้องกันฝุ่นอย่างสมบูรณ์ 100%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0">✅</span>
                  <span>ทนต่อการแช่น้ำลึก 1 เมตร นาน 30 นาที (IP67)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0">✅</span>
                  <span>ทนแรงดันน้ำสูง สเปรย์ล้างทำความสะอาดได้ (IP69K)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0">✅</span>
                  <span>ไร้พัดลม ลดจุดเสี่ยงความเสียหาย ไม่สะสมฝุ่น</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0">✅</span>
                  <span>ส่วนประกอบระดับอุตสาหกรรม ทนทานต่อสภาพแวดล้อมที่รุนแรง</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">เหมาะสำหรับอุตสาหกรรม</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {useCases.map((u) => (
              <span key={u} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">{u}</span>
            ))}
          </div>
        </section>

        {/* Product Lineup */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            รุ่นสินค้า <span className="text-gradient">Waterproof Panel PC</span>
          </h2>

          {/* Quick Nav */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {models.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="shrink-0 px-3 py-2 rounded-lg text-xs font-medium bg-secondary/50 text-foreground/70 border border-border hover:border-primary/30 transition-all"
              >
                {m.name}
              </a>
            ))}
          </div>

          <div className="space-y-6">
            {models.map((m) => (
              <div key={m.id} id={m.id} className="card-surface overflow-hidden scroll-mt-24">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="md:w-1/3 flex items-center justify-center">
                      <div className="bg-secondary/50 rounded-xl p-4 w-full flex items-center justify-center min-h-[200px]">
                        <img src={m.image} alt={m.name} className="max-w-full max-h-[220px] object-contain" loading="lazy" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">{m.name}</h3>
                        {m.badge && <Badge className="bg-primary text-primary-foreground text-xs">{m.badge}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{m.model}</p>

                      <Tabs defaultValue="specs" className="w-full">
                        <TabsList className="w-full justify-start bg-secondary/50">
                          <TabsTrigger value="specs" className="text-xs md:text-sm">►Specification</TabsTrigger>
                        </TabsList>
                        <TabsContent value="specs">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {Object.entries(m.specs).map(([key, val]) => (
                              <div key={key} className="bg-secondary/30 rounded-lg p-3 border border-border/50">
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-1">{key}</div>
                                <div className="text-sm font-medium text-foreground leading-snug">{val}</div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" asChild>
                      <a href={m.datasheet} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Datasheet
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href="/quote">
                        ขอใบเสนอราคา
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            ภาพผลิตภัณฑ์ <span className="text-gradient">Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((img, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={img} alt={`Waterproof PC ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Application Images */}
        <section className="card-surface overflow-hidden">
          <img
            src="https://static.wixstatic.com/media/0597a3_ffe271d4f86b4f699e9760cb18da5733~mv2.png/v1/fill/w_1218,h_658,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_ffe271d4f86b4f699e9760cb18da5733~mv2.png"
            alt="Waterproof PC Applications"
            className="w-full h-auto"
            loading="lazy"
          />
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจ Waterproof Panel PC?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกรุ่นที่เหมาะกับอุตสาหกรรมของคุณ</p>
          <Button size="lg" asChild>
            <a href="/quote">
              ขอใบเสนอราคา
            </a>
          </Button>
        </div>
      </div>
      <FooterCompact />
    </div>
  );
};


export default WaterproofPC;
