import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Clock, CheckCircle, Phone, Building2,
  ChevronDown, ChevronUp, Loader2, CalendarClock, Hash, Wallet, RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  created_at: string;
  status: string;
  products: any[];
  details: string | null;
}

const MyAccountQuotes = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reQuoteProducts, setReQuoteProducts] = useState<any[] | null>(null);

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

  useEffect(() => { fetchQuotes(); }, [user]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileText size={20} className="text-primary" /> ใบเสนอราคาของฉัน
        </h2>
        <button onClick={fetchQuotes} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
        </button>
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
              return (
                <div key={q.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-foreground">
                          {Array.isArray(q.products) ? q.products.map((p: any) => p.model || p.category).filter(Boolean).join(", ") || "ใบเสนอราคา" : "ใบเสนอราคา"}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                          <StatusIcon size={10} /> {status.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{formatDate(q.created_at)}</p>
                    </div>
                    {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-2 border-t border-border pt-3 animate-fade-in">
                      {/* Products */}
                      {Array.isArray(q.products) && q.products.length > 0 && (
                        <div className="space-y-1">
                          {q.products.map((p: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">{p.category}</span>
                              <span className="text-foreground font-medium">{p.model}</span>
                              <span className="text-primary">×{p.qty}</span>
                            </div>
                          ))}
                        </div>
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
                      {/* Re-quote button */}
                      <button
                        onClick={() => setReQuoteProducts(q.products)}
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                      >
                        <RefreshCw size={12} /> ขอใบเสนอราคาซ้ำ
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
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
