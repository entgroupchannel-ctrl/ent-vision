import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Factory, CheckCircle, Quote, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { useState } from "react";

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cs = caseStudies.find((c) => c.id === id);
  const [showQuote, setShowQuote] = useState(false);

  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${cs.title} — กรณีศึกษา | ENT Group`}
        description={cs.challenge}
        path={`/case-studies/${cs.id}`}
      />

      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Badge className="mb-3 bg-primary/90 text-primary-foreground">
              <Factory className="w-3 h-3 mr-1" /> {cs.industry}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white max-w-3xl">{cs.title}</h1>
            <p className="text-white/70 mt-1">{cs.client}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> กลับหน้ากรณีศึกษา
        </Link>
      </div>

      <article className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            {/* Challenge */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-destructive rounded-full" /> ปัญหาและความท้าทาย
              </h2>
              <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" /> โซลูชัน
              </h2>
              <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-green-500 rounded-full" /> ผลลัพธ์
              </h2>
              <ul className="space-y-3">
                {cs.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimonial */}
            {cs.testimonial && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/40 mb-3" />
                  <p className="text-foreground italic text-lg leading-relaxed mb-4">
                    "{cs.testimonial}"
                  </p>
                  {cs.testimonialAuthor && (
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">{cs.testimonialAuthor}</span>
                      {cs.testimonialRole && (
                        <span className="text-muted-foreground"> — {cs.testimonialRole}</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-bold text-foreground">สินค้าที่ใช้</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.products.map((p) => (
                    <Badge key={p} variant="secondary">{p}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* External & Internal Links */}
            {(cs.externalLinks?.length || cs.internalLinks?.length) && (
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-foreground">ลิงก์ที่เกี่ยวข้อง</h3>
                  <div className="space-y-2">
                    {cs.internalLinks?.map((link) => (
                      <Link key={link.path} to={link.path}>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ArrowRight className="w-4 h-4 mr-2" /> {link.label}
                        </Button>
                      </Link>
                    ))}
                    {cs.externalLinks?.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" /> {link.label}
                        </Button>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-bold text-foreground">สนใจโซลูชันนี้?</h3>
                <p className="text-sm text-muted-foreground">ทีมวิศวกรพร้อมให้คำปรึกษาและออกแบบระบบตามความต้องการ</p>
                <Button className="w-full" onClick={() => setShowQuote(true)}>
                  <FileText className="w-4 h-4 mr-2" /> ขอใบเสนอราคา
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>

      <QuoteDialog
        open={showQuote}
        onClose={() => setShowQuote(false)}
        productCategory={cs.industry}
        initialProducts={cs.products.map((p) => ({ category: cs.industry, model: p, qty: 1 }))}
      />

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
