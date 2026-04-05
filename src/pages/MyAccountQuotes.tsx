import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Clock, CheckCircle, Phone, Building2,
  ChevronDown, ChevronUp, Loader2, CalendarClock, Hash, Wallet, RefreshCw,
  Download, ThumbsUp, MessageSquare, DollarSign, Package, Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import QuoteDialog from "@/components/QuoteDialog";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: "รอดำเนินการ", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Clock },
  contacted: { label: "ติดต่อแล้ว", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Phone },
  quoted: { label: "ส่งใบเสนอราคาแล้ว", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: FileText },
  negotiating: { label: "เจรจา", color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: Building2 },
  won: { label: "สำเร็จ", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle },
  lost: { label: "ไม่สำเร็จ", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: CheckCircle },
};

const parseDetails = (details: string | null) => {
  if (!details) return { timeline: "", qty: "", budget: "", extra: "" };
  const timeline = details.match(/\[timeline:\s*([^\]]*)\]/)?.[1]?.trim() || "";
  const qty = details.match(/\[qty:\s*([^\]]*)\]/)?.[1]?.trim() || "";
  const budget = details.match(/\[budget:\s*([^\]]*)\]/)?.[1]?.trim() || "";
  const extra = details.replace(/\[timeline:[^\]]*\]/g, "").replace(/\[qty:[^\]]*\]/g, "").replace(/\[budget:[^\]]*\]/g, "").trim();
  return { timeline, qty, budget, extra };
};

interface QuoteRequest {
  id: string;
  quote_number: string | null;
  created_at: string;
  status: string;
  products: any[];
  details: string | null;
  subtotal: number;
  discount_amount: number;
  grand_total: number;
  valid_until: string | null;
  payment_terms: string | null;
  delivery_terms: string | null;
  pdf_url: string | null;
  customer_response: string | null;
}

interface LineItem {
  id: string;
  model: string;
  category: string | null;
  qty: number;
  unit_price: number;
  discount_percent: number;
  line_total: number;
  custom_specs: Record<string, string>;
}

const MyAccountQuotes = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<Record<string, LineItem[]>>({});
  const [reQuoteProducts, setReQuoteProducts] = useState<any[] | null>(null);
  const [responding, setResponding] = useState(false);

  const fetchQuotes = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await (supabase.from as any)("quote_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  };

  const fetchLineItems = async (quoteId: string) => {
    if (lineItems[quoteId]) return;
    const { data } = await (supabase.from as any)("quote_line_items")
      .select("*")
      .eq("quote_id", quoteId)
      .order("sort_order");
    if (data) setLineItems((prev) => ({ ...prev, [quoteId]: data }));
  };

  useEffect(() => { fetchQuotes(); }, [user]);

  const handleExpand = (quoteId: string) => {
    const isExpanding = expandedId !== quoteId;
    setExpandedId(isExpanding ? quoteId : null);
    if (isExpanding) fetchLineItems(quoteId);
  };

  const handleCustomerResponse = async (quoteId: string, response: "accepted" | "negotiating") => {
    setResponding(true);
    try {
      const newStatus = response === "accepted" ? "won" : "negotiating";
      const { error } = await (supabase.from as any)("quote_requests")
        .update({ customer_response: response, status: newStatus })
        .eq("id", quoteId);
      if (error) throw error;
      toast({
        title: response === "accepted" ? "ยืนยันยอมรับราคาแล้ว" : "ส่งคำขอเจรจาแล้ว",
        description: response === "accepted" ? "ทีมขายจะติดต่อเพื่อดำเนินการต่อ" : "ทีมขายจะติดต่อกลับเร็วๆ นี้",
      });
      fetchQuotes();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setResponding(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileText size={20} className="text-primary" /> ใบเสนอราคาของฉัน
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={fetchQuotes} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
          <button
            onClick={() => onNavigate?.("quote_create")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Plus size={14} /> สร้างใบเสนอราคา
          </button>
        </div>
      </div>

      <div className="card-surface rounded-xl p-5">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={32} className="mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">ยังไม่มีใบเสนอราคา</p>
          </div>
        ) : (
          <div className="space-y-2">
            {quotes.map((q) => {
              const status = statusConfig[q.status] || statusConfig.new;
              const StatusIcon = status.icon;
              const isExpanded = expandedId === q.id;
              const parsed = parseDetails(q.details);
              const items = lineItems[q.id] || [];
              const hasPrice = q.grand_total > 0;
              const isQuoted = ["quoted", "negotiating"].includes(q.status);

              return (
                <div key={q.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleExpand(q.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-bold text-foreground">{q.quote_number || "Draft"}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                          <StatusIcon size={10} /> {status.label}
                        </span>
                        {q.customer_response === "accepted" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">ยอมรับแล้ว</span>
                        )}
                        {hasPrice && (
                          <span className="text-xs font-bold text-primary">฿{formatPrice(q.grand_total)}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {formatDate(q.created_at)}
                        {q.valid_until && <span className="ml-2">· ใช้ได้ถึง {q.valid_until}</span>}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-4 space-y-3 border-t border-border pt-3 animate-fade-in">
                      {/* Line Items */}
                      {items.length > 0 ? (
                        <div>
                          <h4 className="text-[11px] font-bold text-foreground mb-2 flex items-center gap-1.5">
                            <Package size={12} className="text-primary" /> รายการสินค้า
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-[11px]">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left py-1.5 text-muted-foreground font-medium">#</th>
                                  <th className="text-left py-1.5 text-muted-foreground font-medium">รุ่น</th>
                                  <th className="text-center py-1.5 text-muted-foreground font-medium">จำนวน</th>
                                  <th className="text-right py-1.5 text-muted-foreground font-medium">ราคา/หน่วย</th>
                                  <th className="text-right py-1.5 text-muted-foreground font-medium">ส่วนลด</th>
                                  <th className="text-right py-1.5 text-muted-foreground font-medium">รวม</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item, i) => (
                                  <tr key={item.id} className="border-b border-border/30">
                                    <td className="py-1.5 text-muted-foreground">{i + 1}</td>
                                    <td className="py-1.5 font-medium text-foreground">
                                      {item.model}
                                      {item.category && <span className="block text-[10px] text-muted-foreground">{item.category}</span>}
                                    </td>
                                    <td className="py-1.5 text-center">{item.qty}</td>
                                    <td className="py-1.5 text-right">฿{formatPrice(item.unit_price)}</td>
                                    <td className="py-1.5 text-right text-muted-foreground">{item.discount_percent > 0 ? `${item.discount_percent}%` : "-"}</td>
                                    <td className="py-1.5 text-right font-bold text-foreground">฿{formatPrice(item.line_total)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {hasPrice && (
                            <div className="mt-2 pt-2 border-t border-border space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-muted-foreground">รวมก่อนส่วนลด</span>
                                <span className="text-foreground">฿{formatPrice(q.subtotal)}</span>
                              </div>
                              {q.discount_amount > 0 && (
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-muted-foreground">ส่วนลดรวม</span>
                                  <span className="text-red-400">-฿{formatPrice(q.discount_amount)}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm font-bold pt-1 border-t border-border">
                                <span className="text-foreground">ยอดรวมสุทธิ</span>
                                <span className="text-primary">฿{formatPrice(q.grand_total)}</span>
                              </div>
                            </div>
                          )}
                          {(q.payment_terms || q.delivery_terms) && (
                            <div className="mt-2 text-[10px] text-muted-foreground space-y-0.5">
                              {q.payment_terms && <p>เงื่อนไขชำระ: {q.payment_terms}</p>}
                              {q.delivery_terms && <p>เงื่อนไขจัดส่ง: {q.delivery_terms}</p>}
                            </div>
                          )}
                        </div>
                      ) : (
                        Array.isArray(q.products) && q.products.length > 0 && (
                          <div className="space-y-1">
                            {q.products.map((p: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="text-muted-foreground">{p.category}</span>
                                <span className="text-foreground font-medium">{p.model}</span>
                                <span className="text-primary">×{p.qty}</span>
                              </div>
                            ))}
                          </div>
                        )
                      )}

                      {/* Details */}
                      {(parsed.timeline || parsed.qty || parsed.budget) && (
                        <div className="grid grid-cols-3 gap-2">
                          {parsed.timeline && (
                            <div className="rounded-lg bg-muted/40 p-2 text-center">
                              <CalendarClock size={12} className="mx-auto mb-0.5 text-primary" />
                              <p className="text-[10px] text-muted-foreground">ระยะเวลา</p>
                              <p className="text-[11px] font-medium text-foreground">{parsed.timeline}</p>
                            </div>
                          )}
                          {parsed.qty && (
                            <div className="rounded-lg bg-muted/40 p-2 text-center">
                              <Hash size={12} className="mx-auto mb-0.5 text-primary" />
                              <p className="text-[10px] text-muted-foreground">จำนวน</p>
                              <p className="text-[11px] font-medium text-foreground">{parsed.qty}</p>
                            </div>
                          )}
                          {parsed.budget && (
                            <div className="rounded-lg bg-muted/40 p-2 text-center">
                              <Wallet size={12} className="mx-auto mb-0.5 text-primary" />
                              <p className="text-[10px] text-muted-foreground">งบประมาณ</p>
                              <p className="text-[11px] font-medium text-foreground">{parsed.budget}</p>
                            </div>
                          )}
                        </div>
                      )}
                      {parsed.extra && (
                        <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">{parsed.extra}</p>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                        {q.pdf_url && (
                          <a
                            href={q.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-bold hover:bg-primary/20 transition-colors"
                          >
                            <Download size={12} /> ดาวน์โหลด PDF
                          </a>
                        )}
                        {isQuoted && !q.customer_response && (
                          <>
                            <button
                              onClick={() => handleCustomerResponse(q.id, "accepted")}
                              disabled={responding}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold hover:bg-green-500/20 transition-colors disabled:opacity-60"
                            >
                              <ThumbsUp size={12} /> ยอมรับราคา
                            </button>
                            <button
                              onClick={() => handleCustomerResponse(q.id, "negotiating")}
                              disabled={responding}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 text-xs font-bold hover:bg-orange-500/20 transition-colors disabled:opacity-60"
                            >
                              <MessageSquare size={12} /> เจรจาต่อ
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setReQuoteProducts(q.products)}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
                        >
                          <RefreshCw size={12} /> ขอราคาซ้ำ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {reQuoteProducts && (
        <QuoteDialog
          open={true}
          onClose={() => setReQuoteProducts(null)}
          initialProducts={reQuoteProducts}
        />
      )}
    </div>
  );
};

export default MyAccountQuotes;
