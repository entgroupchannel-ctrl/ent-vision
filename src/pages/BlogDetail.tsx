import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Tag, FileText } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} — ENT Group Blog`}
        description={post.excerpt}
        path={`/blog/${post.id}`}
      />

      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-4xl">
            <Badge className="mb-3 bg-primary/90 text-primary-foreground">{post.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white max-w-3xl">{post.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> กลับหน้าบทความ
        </Link>
      </div>

      <article className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold text-foreground text-sm">แท็ก</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {related.length > 0 && (
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-foreground text-sm">บทความที่เกี่ยวข้อง</h3>
                  {related.map((r) => (
                    <Link key={r.id} to={`/blog/${r.id}`} className="block group">
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold text-foreground text-sm">สนใจสินค้า?</h3>
                <Link to="/product-advisor">
                  <Button className="w-full" size="sm">
                    <FileText className="w-4 h-4 mr-2" /> ปรึกษาผู้เชี่ยวชาญ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
