import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Clock, CheckCircle, Phone, Building2,
  ChevronDown, ChevronUp, Loader2, CalendarClock, Hash, Wallet, RefreshCw,
  Download, ThumbsUp, MessageSquare, Package, Plus,
  MoreHorizontal, Printer, Share2, Copy, Trash2, ExternalLink, Link2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import QuoteDialog from "@/components/QuoteDialog";

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: "รอดำเนินการ", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  contacted: { label: "ติดต่อแล้ว", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  quoted: { label: "ส่งราคาแล้ว", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  negotiating: { label: "เจรจา", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  won: { label: "สำเร็จ", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  lost: { label: "ไม่สำเร็จ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
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
}

const MyAccountQuotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<Record<string, LineItem[]>>({});
  const [reQuoteProducts, setReQuoteProducts] = useState<any[] | null>(null);
  const [responding, setResponding] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleExpand = (quoteId: string) => {
    const isExpanding = expandedId !== quoteId;
    setExpandedId(isExpanding ? quoteId : null);
    if (isExpanding) fetchLineItems(quoteId);
  };

  const handleCustomerResponse = async (quoteId: string, response: "accepted" | "negotiating") => {
    setResponding(true);
    try {
      const newStatus = response === "accepted" ? "won" : "negotiating";
      await (supabase.from as any)("quote_requests")
        .update({ customer_response: response, status: newStatus })
        .eq("id", quoteId);
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

  // ── Actions ──
  const handlePrint = (q: QuoteRequest) => {
    // Simple print — open a print-friendly window
    const items = lineItems[q.id] || [];
    const html = `<html><head><title>${q.quote_number || "Quote"}</title><style>body{font-family:sans-serif;padding:40px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f5f5f5}.right{text-align:right}.total{font-size:18px;font-weight:bold}</style></head><body>
      <h1>ใบเสนอราคา ${q.quote_number || ""}</h1>
      <p>วันที่: ${new Date(q.created_at).toLocaleDateString("th-TH")}</p>
      ${q.valid_until ? `<p>ใช้ได้ถึง: ${q.valid_until}</p>` : ""}
      <table><thead><tr><th>#</th><th>รุ่น</th><th>จำนวน</th><th class="right">ราคา/หน่วย</th><th class="right">รวม</th></tr></thead><tbody>
      ${items.map((item, i) => `<tr><td>${i + 1}</td><td>${item.model}</td><td>${item.qty}</td><td class="right">${item.unit_price.toLocaleString()}</td><td class="right">${item.line_total.toLocaleString()}</td></tr>`).join("")}
      </tbody></table>
      ${q.grand_total > 0 ? `<p class="total" style="margin-top:20px;text-align:right">ยอดรวมสุทธิ: ฿${q.grand_total.toLocaleString()}</p>` : ""}
      ${q.payment_terms ? `<p>เงื่อนไขชำระ: ${q.payment_terms}</p>` : ""}
      ${q.delivery_terms ? `<p>เงื่อนไขจัดส่ง: ${q.delivery_terms}</p>` : ""}
    </body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); w.print(); }
    setMenuOpenId(null);
  };

  const handleShare = async (q: QuoteRequest) => {
    const text = `ใบเสนอราคา ${q.quote_number || ""}\nยอดรวม: ฿${q.grand_total > 0 ? q.grand_total.toLocaleString() : "รอราคา"}\nสถานะ: ${(statusConfig[q.status] || statusConfig.new).label}\n\nรายการ:\n${(q.products || []).map((p: any) => `- ${p.model} x${p.qty}`).join("\n")}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `ใบเสนอราคา ${q.quote_number}`, text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "คัดลอกข้อมูลใบเสนอราคาแล้ว", description: "วางส่งให้เจ้านายหรือทีมได้เลย" });
    }
    setMenuOpenId(null);
  };

  const handleCopyLink = async (q: QuoteRequest) => {
    if (q.pdf_url) {
      await navigator.clipboard.writeText(q.pdf_url);
      toast({ title: "คัดลอกลิงก์ PDF แล้ว" });
    } else {
      const text = `ใบเสนอราคา ${q.quote_number || ""} — ฿${q.grand_total > 0 ? q.grand_total.toLocaleString() : "รอราคา"}`;
      await navigator.clipboard.writeText(text);
      toast({ title: "คัดลอกข้อมูลแล้ว" });
    }
    setMenuOpenId(null);
  };

  const handleDuplicate = (q: QuoteRequest) => {
    setReQuoteProducts(q.products);
    setMenuOpenId(null);
  };

  const handleDelete = async (q: QuoteRequest) => {
    if (!confirm(`ลบใบเสนอราคา ${q.quote_number || "Draft"} ?`)) return;
    await (supabase.from as any)("quote_requests").delete().eq("id", q.id);
    toast({ title: "ลบใบเสนอราคาแล้ว" });
    fetchQuotes();
    setMenuOpenId(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" });

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(n);

  const productSummary = (products: any[]) => {
    if (!products || products.length === 0) return "";
    const first = products[0]?.model || "";
    if (products.length === 1) return first;
    return `${first} +${products.length - 1} รายการ`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileText size={20} className="text-primary" /> ใบเสนอราคาของฉัน
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={fetchQuotes} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card-surface rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={32} className="mx-auto mb-3 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground mb-2">ยังไม่มีใบเสนอราคา</p>
            <p className="text-xs text-muted-foreground/60">กดปุ่ม "สร้างใบเสนอราคา" ที่เมนูด้านซ้าย หรือกดปุ่ม "ขอใบเสนอราคา" ในหน้าสินค้า</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">วันที่</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">เลขที่เอกสาร</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">รายการสินค้า</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">ยอดรวมสุทธิ</th>
                  <th className="text-center px-4 py-3 text-muted-foreground font-medium">สถานะ</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const status = statusConfig[q.status] || statusConfig.new;
                  const isExpanded = expandedId === q.id;
                  const items = lineItems[q.id] || [];
                  const hasPrice = q.grand_total > 0;
                  const isQuoted = ["quoted", "negotiating"].includes(q.status);

                  return (
                    <tr key={q.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors group">
                      {/* Date */}
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {formatDate(q.created_at)}
                      </td>

                      {/* Quote number */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleExpand(q.id)}
                          className="text-left hover:text-primary transition-colors"
                        >
                          <span className="font-bold text-foreground">{q.quote_number || "Draft"}</span>
                          {q.customer_response === "accepted" && (
                            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">ยอมรับแล้ว</span>
                          )}
                        </button>
                      </td>

                      {/* Products summary */}
                      <td className="px-4 py-3 text-muted-foreground">
                        <span className="line-clamp-1">{productSummary(q.products)}</span>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3 text-right font-bold text-foreground whitespace-nowrap">
                        {hasPrice ? `฿${formatPrice(q.grand_total)}` : <span className="text-muted-foreground font-normal">รอราคา</span>}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>

                      {/* Action menu */}
                      <td className="px-2 py-3 text-center relative" ref={menuOpenId === q.id ? menuRef : undefined}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === q.id ? null : q.id); }}
                          className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {/* Dropdown menu */}
                        {menuOpenId === q.id && (
                          <div className="absolute right-2 top-10 z-20 bg-card border border-border rounded-xl shadow-xl py-1.5 w-44 animate-fade-in">
                            <button onClick={() => handleExpand(q.id)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                              <FileText size={14} /> ดูรายละเอียด
                            </button>
                            <button onClick={() => { fetchLineItems(q.id); setTimeout(() => handlePrint(q), 300); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                              <Printer size={14} /> พิมพ์
                            </button>
                            <button onClick={() => handleShare(q)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                              <Share2 size={14} /> แชร์
                            </button>
                            {q.pdf_url && (
                              <a href={q.pdf_url} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpenId(null)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                                <Download size={14} /> ดาวน์โหลด
                              </a>
                            )}
                            <button onClick={() => handleCopyLink(q)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                              <Link2 size={14} /> คัดลอกลิงก์
                            </button>
                            <button onClick={() => handleDuplicate(q)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary/60 transition-colors">
                              <Copy size={14} /> สร้างซ้ำ
                            </button>
                            <div className="border-t border-border my-1" />
                            <button onClick={() => handleDelete(q)} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                              <Trash2 size={14} /> ลบ
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Expanded detail (shows below table) */}
            {expandedId && (() => {
              const q = quotes.find((q) => q.id === expandedId);
              if (!q) return null;
              const items = lineItems[q.id] || [];
              const hasPrice = q.grand_total > 0;
              const isQuoted = ["quoted", "negotiating"].includes(q.status);
              const status = statusConfig[q.status] || statusConfig.new;

              return (
                <div className="border-t-2 border-primary/20 bg-secondary/5 p-5 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-foreground">{q.quote_number || "Draft"}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${status.color}`}>{status.label}</span>
                      {q.valid_until && <span className="text-xs text-muted-foreground">ใช้ได้ถึง {q.valid_until}</span>}
                    </div>
                    <button onClick={() => setExpandedId(null)} className="text-muted-foreground hover:text-foreground">
                      <ChevronUp size={16} />
                    </button>
                  </div>

                  {/* Line Items */}
                  {items.length > 0 ? (
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 text-muted-foreground font-medium">#</th>
                            <th className="text-left py-2 text-muted-foreground font-medium">รุ่น</th>
                            <th className="text-center py-2 text-muted-foreground font-medium">จำนวน</th>
                            <th className="text-right py-2 text-muted-foreground font-medium">ราคา/หน่วย</th>
                            <th className="text-right py-2 text-muted-foreground font-medium">รวม</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, i) => (
                            <tr key={item.id} className="border-b border-border/30">
                              <td className="py-2 text-muted-foreground">{i + 1}</td>
                              <td className="py-2 font-medium text-foreground">
                                {item.model}
                                {item.category && <span className="text-xs text-muted-foreground ml-2">{item.category}</span>}
                              </td>
                              <td className="py-2 text-center">{item.qty}</td>
                              <td className="py-2 text-right">{item.unit_price > 0 ? `฿${formatPrice(item.unit_price)}` : "รอราคา"}</td>
                              <td className="py-2 text-right font-bold">{item.line_total > 0 ? `฿${formatPrice(item.line_total)}` : "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    Array.isArray(q.products) && q.products.length > 0 && (
                      <div className="space-y-1 mb-4">
                        {q.products.map((p: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">{p.category}</span>
                            <span className="text-foreground font-medium">{p.model}</span>
                            <span className="text-primary">×{p.qty}</span>
                          </div>
                        ))}
                      </div>
                    )
                  )}

                  {/* Totals */}
                  {hasPrice && (
                    <div className="border-t border-border pt-3 mb-4 max-w-sm ml-auto">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">รวมก่อนส่วนลด</span>
                        <span>฿{formatPrice(q.subtotal)}</span>
                      </div>
                      {q.discount_amount > 0 && (
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">ส่วนลดรวม</span>
                          <span className="text-red-400">-฿{formatPrice(q.discount_amount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold pt-1 border-t border-border">
                        <span>ยอดรวมสุทธิ</span>
                        <span className="text-primary">฿{formatPrice(q.grand_total)}</span>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  {(q.payment_terms || q.delivery_terms) && (
                    <div className="text-xs text-muted-foreground mb-4 space-y-0.5">
                      {q.payment_terms && <p>เงื่อนไขชำระ: {q.payment_terms}</p>}
                      {q.delivery_terms && <p>เงื่อนไขจัดส่ง: {q.delivery_terms}</p>}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                    {q.pdf_url && (
                      <a
                        href={q.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
                      >
                        <Download size={14} /> ดาวน์โหลด PDF
                      </a>
                    )}
                    {isQuoted && !q.customer_response && (
                      <>
                        <button
                          onClick={() => handleCustomerResponse(q.id, "accepted")}
                          disabled={responding}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-bold hover:bg-green-500/20 transition-colors disabled:opacity-60"
                        >
                          <ThumbsUp size={14} /> ยอมรับราคา
                        </button>
                        <button
                          onClick={() => handleCustomerResponse(q.id, "negotiating")}
                          disabled={responding}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 text-sm font-bold hover:bg-orange-500/20 transition-colors disabled:opacity-60"
                        >
                          <MessageSquare size={14} /> เจรจาต่อ
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleShare(q)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Share2 size={14} /> แชร์ให้เจ้านาย
                    </button>
                    <button
                      onClick={() => { fetchLineItems(q.id); setTimeout(() => handlePrint(q), 300); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Printer size={14} /> พิมพ์
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Re-quote dialog */}
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
