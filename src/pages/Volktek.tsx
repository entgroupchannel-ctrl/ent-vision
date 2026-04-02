import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Shield, Zap, Network, Server, ThermometerSun, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const productCategories = [
  {
    id: "managed",
    title: "Managed Switches",
    desc: "สวิตช์อัจฉริยะควบคุมผ่าน SNMP, VLAN, QoS, Ring Protocol",
    image: "https://static.wixstatic.com/media/0597a3_48bf9c799b124b9a9da5ef1e5a0681d9~mv2.png/v1/fill/w_1080,h_585,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_06_34.png",
    modelImage: "https://static.wixstatic.com/media/0597a3_e4054080649041dabe0efc39aa2951c7~mv2.png/v1/fill/w_1084,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_24_32.png",
  },
  {
    id: "unmanaged",
    title: "Unmanaged Switches",
    desc: "สวิตช์ Plug & Play ติดตั้งง่าย ใช้งานทันที เหมาะงานทั่วไป",
    image: "https://static.wixstatic.com/media/0597a3_9cbf5fb4839349cf93e849292e728cd8~mv2.png/v1/fill/w_1080,h_545,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_09_14.png",
    modelImage: "https://static.wixstatic.com/media/0597a3_d9937cea9cb147feaf1fe73f1e9d959b~mv2.png/v1/fill/w_1099,h_266,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_22_46.png",
  },
  {
    id: "standard",
    title: "Standard Switches",
    desc: "สวิตช์มาตรฐานสำหรับเครือข่ายพื้นฐาน",
    image: "https://static.wixstatic.com/media/0597a3_05c7f13bef77470f9deea1d2615dbeac~mv2.png/v1/fill/w_1084,h_359,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_11_20.png",
  },
  {
    id: "substation",
    title: "Substation Certified Switches",
    desc: "สวิตช์ที่ผ่านการรับรองสำหรับสถานีไฟฟ้า",
    image: "https://static.wixstatic.com/media/0597a3_b83747428b3c4d8cabc421f12481a73b~mv2.png/v1/fill/w_1107,h_209,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_13_24.png",
    modelImage: "https://static.wixstatic.com/media/0597a3_19127454a9974f01bb23f7c61e860a89~mv2.png/v1/fill/w_1131,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_25_43.png",
  },
  {
    id: "railway",
    title: "Railway Certified Switches",
    desc: "สวิตช์ที่ผ่านมาตรฐานสำหรับระบบราง",
    image: "https://static.wixstatic.com/media/0597a3_1de8b4b957214fb491d35bbfc6151c43~mv2.png/v1/fill/w_1082,h_222,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_14_16.png",
  },
  {
    id: "dnv",
    title: "DNV Certified Switches",
    desc: "สวิตช์ที่ผ่านมาตรฐาน DNV สำหรับงานทางทะเล",
    image: "https://static.wixstatic.com/media/0597a3_18695496fbc24aa8b5a965d98a37ed8f~mv2.png/v1/fill/w_1072,h_368,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_15_00.png",
  },
  {
    id: "profinet",
    title: "Profinet Certified Switches",
    desc: "สวิตช์ Profinet สำหรับระบบอัตโนมัติอุตสาหกรรม",
    image: "https://static.wixstatic.com/media/0597a3_36b9080d86624aae8c54f11bf0603b16~mv2.png/v1/fill/w_1072,h_193,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_19_52.png",
  },
  {
    id: "ethernetip",
    title: "EtherNet/IP Certified Switches",
    desc: "สวิตช์ EtherNet/IP สำหรับ Industrial Protocol",
    image: "https://static.wixstatic.com/media/0597a3_a12ee0f5c79f4d74a17f41fd57aacb30~mv2.png/v1/fill/w_1061,h_248,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_29_08.png",
  },
];

const features = [
  {
    icon: Shield,
    title: "Industrial Grade EMC",
    desc: "ป้องกันไฟกระชาก ESD ตามมาตรฐาน EN61000-6-2/6-4 อินพุตไฟคู่เพื่อความน่าเชื่อถือ",
  },
  {
    icon: ThermometerSun,
    title: "Robust Performance",
    desc: "ตัวเรือน IP30 ทนแรงสั่นสะเทือน กระแทก ความชื้น อุณหภูมิ -40°C ถึง 75°C",
  },
  {
    icon: Zap,
    title: "Power Isolation",
    desc: "แยกวงจรป้องกันไฟกระชากและ ESD ปกป้องวงจรภายในจากความผันผวนพลังงาน",
  },
  {
    icon: Network,
    title: "Xpress Ring & ERPS",
    desc: "กู้คืนเครือข่ายระดับมิลลิวินาที รับประกันการส่งข้อมูลแบบ Real-time ต่อเนื่อง",
  },
  {
    icon: Server,
    title: "SNMP Monitoring",
    desc: "แจ้งเตือนผู้ดูแลระบบเมื่อเกิดความผิดปกติ ลดเวลาหยุดทำงาน",
  },
  {
    icon: Globe,
    title: "Certified Worldwide",
    desc: "DNV/GL, ISO, FCC, CE, VCCI — ได้รับการรับรองจากหน่วยงานระดับสากล",
  },
];

const productGallery = [
  "https://static.wixstatic.com/media/0597a3_6ca4cc5c13dd494cae13b9496d742c13~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.png",
  "https://static.wixstatic.com/media/0597a3_bacbf34c36704fce95f1e0dd7c47a148~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_bacbf34c36704fce95f1e0dd7c47a148~mv2.png",
  "https://static.wixstatic.com/media/0597a3_9fa5509272ea4cd0af1809c12c3a6267~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.png",
  "https://static.wixstatic.com/media/0597a3_f82fea86a23a4d368ac4dfe9530a8094~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.png",
  "https://static.wixstatic.com/media/0597a3_2d85bf5136fc48debd9e6b4bee94ccdc~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.png",
  "https://static.wixstatic.com/media/0597a3_f1c99ab866a440538221428b13ba0903~mv2.png/v1/fill/w_358,h_323,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.png",
];

const applicationGallery = [
  "https://static.wixstatic.com/media/0597a3_4493b0eb74f24944ad49b9e2545e739b~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9.png",
  "https://static.wixstatic.com/media/0597a3_fe5e0b8b405145dc90e4fa4fa3b9adc0~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_fe5e0b8b405145dc90e4fa4fa3b9adc0~mv2.png",
  "https://static.wixstatic.com/media/0597a3_067c41cc6f614e9a9787d4437cacafa3~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_067c41cc6f614e9a9787d4437cacafa3~mv2.png",
  "https://static.wixstatic.com/media/0597a3_ed37ee94be24498fb50ded257ef0443e~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8.png",
  "https://static.wixstatic.com/media/0597a3_ade08d50e1164d7bbcc2d37dc18e2387~mv2.png/v1/fill/w_383,h_345,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_ade08d50e1164d7bbcc2d37dc18e2387~mv2.png",
  "https://static.wixstatic.com/media/0597a3_4968fd66fa9a4ecf9d5090fd6151c434~mv2.png/v1/fill/w_383,h_345,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_4968fd66fa9a4ecf9d5090fd6151c434~mv2.png",
  "https://static.wixstatic.com/media/0597a3_cfd98f82e82845adbdbd09a0a8834698~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0597a3_cfd98f82e82845adbdbd09a0a8834698~mv2.png",
  "https://static.wixstatic.com/media/0597a3_804332b8a4774899a1a14df53907b7c9~mv2.png/v1/fill/w_377,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.png",
];

const Volktek = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container max-w-7xl mx-auto px-4 py-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
          </Link>
          <div className="card-surface overflow-hidden mb-8">
            <img
              src="https://static.wixstatic.com/media/0597a3_acc5fb9c15d549868644c80cf3d94d4f~mv2.png/v1/fill/w_1296,h_479,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2012_39_50.png"
              alt="Volktek Industrial Ethernet"
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">Official Partner</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                Volktek <span className="text-gradient">Industrial Ethernet</span>
              </h1>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                Volktek ก่อตั้งในปี 1994 จากไต้หวัน ผู้เชี่ยวชาญด้านออกแบบและผลิตอุปกรณ์เครือข่ายอุตสาหกรรมคุณภาพสูง รองรับ Ethernet ทั้งรุ่นปัจจุบันและ Next Generation สำหรับ Metro, Surveillance และ Industrial Automation — ได้รับการรับรอง DNV/GL, ISO, FCC, CE, VCCI
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.entgroup.co.th/_files/ugd/0597a3_888cab8832d1411582ecb607c1719677.pdf" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Datasheet
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

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* About Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                image: "https://static.wixstatic.com/media/0597a3_0b5ba123241440f18f3216c8e81f0d16~mv2.jpg/v1/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Solution%20of%20industrial%20grade%20networking_.jpg",
                title: "Volktek Solutions",
                desc: "โซลูชั่นที่ได้รับการพิสูจน์จากการใช้งานจริงทั่วโลก",
              },
              {
                image: "https://static.wixstatic.com/media/0597a3_5a253786558044848ea83dbb340e88d1~mv2.jpg/v1/crop/x_75,y_0,w_874,h_1024/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ethernet%20Next%20Generation.jpg",
                title: "Next Generation",
                desc: "รองรับทั้ง Ethernet ปัจจุบันและ Next Generation Platform",
              },
              {
                image: "https://static.wixstatic.com/media/0597a3_300d948b2d424bacafe7adbda7ed890e~mv2.jpg/v1/crop/x_75,y_0,w_874,h_1024/fill/w_286,h_335,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Industrial%20grade%20networking%20switch.jpg",
                title: "Certified Quality",
                desc: "ได้รับการรับรอง DNV/GL, ISO, FCC, CE, VCCI ระดับสากล",
              },
            ].map((card, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Banner */}
        <section className="card-surface overflow-hidden">
          <img
            src="https://static.wixstatic.com/media/0597a3_146ea60e05f840d080033b7e61ad1574~mv2.png/v1/fill/w_1296,h_479,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2012_45_34.png"
            alt="Volktek Certifications"
            className="w-full h-auto"
            loading="lazy"
          />
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2 text-center">Product Features & Benefits</h2>
          <p className="text-muted-foreground text-center mb-8">Powering Next Generation Automation Network Solutions</p>
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

        {/* Factory Automation Use Case */}
        <section className="card-surface p-6 md:p-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Factory Automation — Use Case</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 space-y-4 text-sm text-muted-foreground">
              <p>PLC และ RTU สื่อสารกับเครื่องจักร เซ็นเซอร์ และอุปกรณ์ปลายทาง จากนั้นส่งข้อมูลไปยังระบบ SCADA ผ่านสวิตช์เครือข่ายอุตสาหกรรม Volktek</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-primary shrink-0">■</span> ทำงานที่อุณหภูมิวิกฤต -40°C ถึง 75°C</li>
                <li className="flex items-start gap-2"><span className="text-primary shrink-0">■</span> ป้องกัน ESD + EMI/EMC Certified</li>
                <li className="flex items-start gap-2"><span className="text-primary shrink-0">■</span> ทนทานสำหรับ Mission-Critical Applications</li>
                <li className="flex items-start gap-2"><span className="text-primary shrink-0">■</span> SNMP Monitoring แจ้งเตือนเมื่อฮาร์ดแวร์ผิดปกติ</li>
                <li className="flex items-start gap-2"><span className="text-primary shrink-0">■</span> รวมเข้ากับ SCADA แบบกระจายขนาดใหญ่ได้</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://static.wixstatic.com/media/0597a3_d5a5792c655647a392507ede27ec62a6~mv2.png/v1/fill/w_1019,h_572,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202567-08-15%20at%2013_04_13.png"
                alt="Factory Automation Diagram"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Product Introduction</h2>
          <p className="text-muted-foreground mb-6">Powering Next Generation Automation Network Solutions</p>

          {/* Quick Nav */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {productCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="shrink-0 px-3 py-2 rounded-lg text-xs font-medium bg-secondary/50 text-foreground/70 border border-border hover:border-primary/30 transition-all"
              >
                {cat.title}
              </a>
            ))}
          </div>

          <div className="space-y-8">
            {productCategories.map((cat) => (
              <div key={cat.id} id={cat.id} className="card-surface overflow-hidden scroll-mt-24">
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                  <div className="space-y-4">
                    <img src={cat.image} alt={cat.title} className="w-full h-auto rounded-lg" loading="lazy" />
                    {cat.modelImage && (
                      <img src={cat.modelImage} alt={`${cat.title} models`} className="w-full h-auto rounded-lg" loading="lazy" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Gallery */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">ผลิตภัณฑ์ <span className="text-gradient">Volktek</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {productGallery.map((img, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={img} alt={`Volktek Product ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Application Gallery */}
        <section>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Application <span className="text-gradient">Gallery</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {applicationGallery.map((img, i) => (
              <div key={i} className="card-surface overflow-hidden">
                <img src={img} alt={`Application ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="card-surface p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">สนใจผลิตภัณฑ์ Volktek?</h2>
          <p className="text-muted-foreground mb-6">ปรึกษาผู้เชี่ยวชาญเพื่อเลือกสวิตช์ที่เหมาะกับเครือข่ายของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a href="https://www.entgroup.co.th/_files/ugd/0597a3_888cab8832d1411582ecb607c1719677.pdf" target="_blank" rel="noopener noreferrer">
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

export default Volktek;
