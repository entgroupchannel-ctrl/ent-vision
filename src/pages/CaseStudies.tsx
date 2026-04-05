import { Link } from "react-router-dom";
import { ArrowLeft, Factory, Building2, Quote, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="กรณีศึกษา | Case Studies — ENT Group"
        description="ตัวอย่างลูกค้าจริงที่ใช้ Panel PC, Mini PC, Rugged Tablet จาก ENT Group ในโรงงาน โรงพยาบาล คลังสินค้า และอื่นๆ"
        path="/case-studies"
      />

      <PageBanner
        title="กรณีศึกษา"
        subtitle="ตัวอย่างการใช้งานจริงจากลูกค้าในหลากหลายอุตสาหกรรม"
        icon={<Building2 className="w-8 h-8" />}
      />

      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> กลับหน้าหลัก
        </Link>
      </div>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link key={cs.id} to={`/case-studies/${cs.id}`}>
              <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-border/60 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                    <Factory className="w-3 h-3 mr-1" />
                    {cs.industry}
                  </Badge>
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cs.challenge}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.products.map((p) => (
                      <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                    ))}
                  </div>
                  {cs.testimonial && (
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic line-clamp-2">
                        <Quote className="w-3 h-3 inline mr-1 text-primary" />
                        {cs.testimonial}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-primary font-medium">
                    อ่านเพิ่มเติม <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
