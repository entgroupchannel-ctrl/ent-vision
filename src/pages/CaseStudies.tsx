import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Factory, Quote, ArrowRight, Play, Building2, Users, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { caseStudies, clientList, siteReferenceImages, installationImages } from "@/data/case-studies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import LineQRButton from "@/components/LineQRButton";

/* ── Client Trust — Collapsible ── */
const ClientTrustSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const companies = clientList.filter((n) => n.startsWith("บริษัท") || n.includes("Limited"));
  const schools = clientList.filter((n) => n.startsWith("โรงเรียน"));

  return (
    <section className="bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-base font-bold text-foreground">ลูกค้าบางส่วนที่ไว้วางใจ</h2>
              <p className="text-xs text-muted-foreground">{clientList.length} องค์กรทั่วประเทศ — คลิกเพื่อดูรายชื่อ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">{clientList.length} องค์กร</Badge>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> บริษัท & องค์กร
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {companies.map((name) => (
                  <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50 text-xs text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
            {schools.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> สถานศึกษา
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                  {schools.map((name) => (
                    <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50 text-xs text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">ใกล้ชิดกับเราได้มากขึ้น สอบถามได้สะดวกขึ้น</p>
              <LineQRButton />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const facebookVideos = [
  { title: "ทวีผล 1976 กับการใช้งาน vCloudPoint", videoId: "324284324837607" },
  { title: "IT Services กับผู้ผลิตรองเท้าชั้นนำ", videoId: "996005083891871" },
  { title: "ห้องเรียนอัจฉริยะ vCloudPoint — โรงเรียนนันทนวิทย์", videoId: "1004417266383986" },
  { title: "AmataSpring Golf Club มั่นใจกับทีมงาน ENT Group", videoId: "996009430558103" },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="กรณีศึกษา | Case Studies — ENT Group"
        description="ตัวอย่างลูกค้าจริงที่ใช้ Panel PC, Mini PC, Rugged Tablet จาก ENT Group ในสนามบิน, รถไฟฟ้า, โรงงาน, โรงพยาบาล และอื่นๆ"
        path="/case-studies"
      />

      <PageBanner
        title="กรณีศึกษาและผลงาน"
        subtitle="ลูกค้าจากหลากหลายอุตสาหกรรมไว้วางใจ ENT Group — จากสนามบิน รถไฟฟ้า โรงงาน ไปจนถึงสนามกอล์ฟ"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
      />

      {/* Site Reference Gallery */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">ภาพผลงานจริง</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {siteReferenceImages.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-colors">
              <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="container mx-auto px-4 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <Factory className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">กรณีศึกษาจากลูกค้า</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link key={cs.id} to={`/case-studies/${cs.id}`}>
              <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-border/60 hover:border-primary/30">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">
                    <Factory className="w-3 h-3 mr-1" />
                    {cs.industry}
                  </Badge>
                  {cs.facebookVideoId && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600/90 text-white text-xs">
                        <Play className="w-3 h-3 mr-1" /> มีวิดีโอ
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{cs.challenge}</p>
                  <div className="flex flex-wrap gap-1">
                    {cs.products.slice(0, 2).map((p) => (
                      <Badge key={p.name} variant="outline" className="text-[10px]">{p.name}</Badge>
                    ))}
                  </div>
                  {cs.testimonial && (
                    <p className="text-[11px] text-muted-foreground italic line-clamp-2 pt-1 border-t border-border/50">
                      <Quote className="w-3 h-3 inline mr-1 text-primary" />
                      {cs.testimonial}
                    </p>
                  )}
                  <div className="flex items-center text-xs text-primary font-medium pt-1">
                    อ่านเพิ่มเติม <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Facebook Videos */}
      <section className="bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-5">
            <Play className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">วิดีโอจากลูกค้าจริง</h2>
            <a
              href="https://www.facebook.com/entgroup.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-primary hover:underline"
            >
              ดูทั้งหมดบน Facebook →
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {facebookVideos.map((v) => (
              <div key={v.videoId} className="rounded-xl overflow-hidden border border-border/60 bg-card">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fentgroup.th%2Fvideos%2F${v.videoId}%2F&show_text=0&width=560`}
                    width="100%"
                    height="100%"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={v.title}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">{v.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Gallery */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">งานติดตั้ง Panel PC สำหรับ Production Line</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Industrial Grade Panel PC — เหมาะอย่างแรง แต่ราคาไม่แรง เราเป็นน้องใหม่ แต่ก็เก่ากว่า 8 ปี ในการจำหน่ายในประเทศไทย โรงงานของเรารับ OEM ให้กับแบรนด์ชั้นนำ
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {installationImages.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-border/50">
              <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Client Trust Section — Collapsible */}
      <ClientTrustSection />

      {/* CTA */}
      <section className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">สนใจโซลูชันสำหรับองค์กร?</h2>
        <p className="text-sm text-muted-foreground mb-5">ทีมวิศวกร ENT Group พร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย</p>
        <div className="flex gap-3 justify-center">
          <Link to="/contact-us">
            <Button>ติดต่อเรา</Button>
          </Link>
          <Link to="/corporate-pricing">
            <Button variant="outline">ดูราคาองค์กร</Button>
          </Link>
          <Link to="/product-advisor">
            <Button variant="outline">ปรึกษาผู้เชี่ยวชาญ</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
