import { useState, useEffect } from "react";
import {
  FileText, CheckCircle, Clock, DollarSign, Edit3, Save,
  Loader2, RefreshCw, Eye, Send, XCircle, Plus, Trash2,
  Search, Download, User, Building2, Phone, Mail,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequest {
  id: string;
  quote_number: string | null;
  created_at: string;
  status: string;
  products: any[];
  details: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  user_id: string | null;
  subtotal: number;
  discount_amount: number;
  grand_total: number;
  valid_until: string | null;
  payment_terms: string | null;
  delivery_terms: string | null;
  approved_by: string | null;
  approved_at: string | null;
  pdf_url: string | null;
  customer_response: string | null;
  notes: string | null;
}

interface LineItem {
  id: string;
  quote_id: string;
  product_id: string | null;
  model: string;
  category: string | null;
  qty: number;
  unit_price: number;
  discount_percent: number;
  line_total: number;
  custom_specs: Record<string, string>;
  admin_notes: string | null;
  sort_order: number;
}

interface CatalogProduct {
  id: string;
  model: string;
  category: string;
  base_price: number;
  specs: Record<string, string>;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: "ใหม่", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  quoted: { label: "ส่งราคาแล้ว", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  negotiating: { label: "เจรจา", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  won: { label: "สำเร็จ", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  lost: { label: "ไม่สำเร็จ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const AdminQuoteReview = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>([]);
  const [lineLoading, setLineLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  // Quote-level editable fields
  const [quoteEdit, setQuoteEdit] = useState({
    discount_amount: 0,
    valid_until: "",
    payment_terms: "",
    delivery_terms: "",
    pdf_url: "",
    notes: "",
  });

  const fetchQuotes = async () => {
    setLoading(true);
    const { data } = await (supabase.from as any)("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  };

  const fetchCatalog = async () => {
    const { data } = await (supabase.from as any)("product_catalog")
      .select("id, model, category, base_price, specs")
      .eq("is_active", true)
      .order("model");
    if (data) setCatalogProducts(data);
  };

  useEffect(() => { fetchQuotes(); fetchCatalog(); }, []);

  const selectQuote = async (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setQuoteEdit({
      discount_amount: quote.discount_amount || 0,
      valid_until: quote.valid_until || "",
      payment_terms: quote.payment_terms || "30 วันหลังส่งมอบ",
      delivery_terms: quote.delivery_terms || "ส่งฟรีทั่วประเทศ",
      pdf_url: quote.pdf_url || "",
      notes: quote.notes || "",
    });

    // Fetch existing line items
    setLineLoading(true);
    const { data } = await (supabase.from as any)("quote_line_items")
      .select("*")
      .eq("quote_id", quote.id)
      .order("sort_order");

    if (data && data.length > 0) {
      setLineItems(data);
    } else {
      // Auto-generate line items from products JSONB
      const autoItems: LineItem[] = (quote.products || []).map((p: any, i: number) => {
        const catalogMatch = catalogProducts.find(
          (cp) => cp.model.toLowerCase() === (p.model || "").toLowerCase()
        );
        return {
          id: `temp-${i}`,
          quote_id: quote.id,
          product_id: catalogMatch?.id || null,
          model: p.model || "",
          category: p.category || catalogMatch?.category || "",
          qty: p.qty || 1,
          unit_price: catalogMatch?.base_price || 0,
          discount_percent: 0,
          line_total: (catalogMatch?.base_price || 0) * (p.qty || 1),
          custom_specs: catalogMatch?.specs || {},
          admin_notes: null,
          sort_order: i,
        };
      });
      setLineItems(autoItems);
    }
    setLineLoading(false);
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    setLineItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // Recalculate line_total
      const item = updated[index];
      updated[index].line_total = item.qty * item.unit_price * (1 - item.discount_percent / 100);
      return updated;
    });
  };

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        quote_id: selectedQuote?.id || "",
        product_id: null,
        model: "",
        category: "",
        qty: 1,
        unit_price: 0,
        discount_percent: 0,
        line_total: 0,
        custom_specs: {},
        admin_notes: null,
        sort_order: prev.length,
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const selectCatalogProduct = (index: number, productId: string) => {
    const product = catalogProducts.find((p) => p.id === productId);
    if (!product) return;
    setLineItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        product_id: product.id,
        model: product.model,
        category: product.category,
        unit_price: product.base_price,
        line_total: product.base_price * updated[index].qty,
        custom_specs: product.specs,
      };
      return updated;
    });
  };

  const calcSubtotal = () => lineItems.reduce((sum, item) => sum + item.line_total, 0);
  const calcGrandTotal = () => calcSubtotal() - quoteEdit.discount_amount;

  const handleApprove = async () => {
    if (!selectedQuote || !user) return;
    setSaving(true);
    try {
      // Delete old line items if any
      await (supabase.from as any)("quote_line_items")
        .delete()
        .eq("quote_id", selectedQuote.id);

      // Insert new line items
      const itemsToInsert = lineItems.map((item, i) => ({
        quote_id: selectedQuote.id,
        product_id: item.product_id,
        model: item.model,
        category: item.category,
        qty: item.qty,
        unit_price: item.unit_price,
        discount_percent: item.discount_percent,
        custom_specs: item.custom_specs,
        admin_notes: item.admin_notes,
        sort_order: i,
      }));

      if (itemsToInsert.length > 0) {
        const { error: lineError } = await (supabase.from as any)("quote_line_items")
          .insert(itemsToInsert);
        if (lineError) throw lineError;
      }

      // Update quote
      const subtotal = calcSubtotal();
      const grandTotal = calcGrandTotal();
      const { error } = await (supabase.from as any)("quote_requests")
        .update({
          status: "quoted",
          subtotal,
          discount_amount: quoteEdit.discount_amount,
          grand_total: grandTotal,
          valid_until: quoteEdit.valid_until || null,
          payment_terms: quoteEdit.payment_terms || null,
          delivery_terms: quoteEdit.delivery_terms || null,
          pdf_url: quoteEdit.pdf_url || null,
          notes: quoteEdit.notes || null,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", selectedQuote.id);
      if (error) throw error;

      // Send notification
      if (selectedQuote.user_id) {
        await (supabase.from as any)("notifications").insert({
          user_id: selectedQuote.user_id,
          type: "quote_status",
          title: "ใบเสนอราคาพร้อมแล้ว",
          message: `ใบเสนอราคา ${selectedQuote.quote_number || "#"} มูลค่า ฿${grandTotal.toLocaleString()} พร้อมให้ดาวน์โหลด`,
          link: "/my-account/quotes",
        }).catch(() => {});
      }

      toast({ title: "อนุมัติใบเสนอราคาสำเร็จ", description: `ส่งราคา ฿${grandTotal.toLocaleString()} ให้ลูกค้าแล้ว` });
      setSelectedQuote(null);
      fetchQuotes();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(n);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const filteredQuotes = statusFilter === "all" ? quotes : quotes.filter((q) => q.status === statusFilter);
  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-4">
      {/* Sub-header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          {[
            { value: "all", label: "ทั้งหมด" },
            { value: "new", label: `ใหม่ (${newCount})` },
            { value: "quoted", label: "ส่งราคาแล้ว" },
            { value: "negotiating", label: "เจรจา" },
            { value: "won", label: "สำเร็จ" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === f.value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button onClick={fetchQuotes} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Quote list */}
        <div className="lg:col-span-2 space-y-1.5">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={20} className="animate-spin text-muted-foreground" />
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="card-surface rounded-xl p-10 text-center text-muted-foreground text-sm">ไม่มีใบเสนอราคา</div>
          ) : (
            filteredQuotes.map((q) => {
              const status = STATUS_CONFIG[q.status] || STATUS_CONFIG.new;
              const isSelected = selectedQuote?.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => selectQuote(q)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-foreground">{q.quote_number || "Q-draft"}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                      {status.label}
                    </span>
                    {q.customer_response === "accepted" && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">ลูกค้ายอมรับ</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{q.name} · {q.company || q.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-muted-foreground">{formatDate(q.created_at)}</span>
                    {q.grand_total > 0 && (
                      <span className="text-sm font-bold text-primary">฿{formatPrice(q.grand_total)}</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right: Quote detail + line items editor */}
        <div className="lg:col-span-3">
          {selectedQuote ? (
            <div className="card-surface rounded-xl p-4 space-y-4 sticky top-24">
              {/* Customer info */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">{selectedQuote.quote_number || "Draft"}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${(STATUS_CONFIG[selectedQuote.status] || STATUS_CONFIG.new).color}`}>
                  {(STATUS_CONFIG[selectedQuote.status] || STATUS_CONFIG.new).label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><User size={11} /> {selectedQuote.name}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Mail size={11} /> {selectedQuote.email}</span>
                {selectedQuote.company && <span className="flex items-center gap-1 text-muted-foreground"><Building2 size={11} /> {selectedQuote.company}</span>}
                {selectedQuote.phone && <span className="flex items-center gap-1 text-muted-foreground"><Phone size={11} /> {selectedQuote.phone}</span>}
              </div>

              {/* Line Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-foreground">รายการสินค้า</h4>
                  <button onClick={addLineItem} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Plus size={10} /> เพิ่มรายการ
                  </button>
                </div>
                {lineLoading ? (
                  <div className="py-4 text-center"><Loader2 size={16} className="animate-spin text-muted-foreground mx-auto" /></div>
                ) : (
                  <div className="space-y-2">
                    {lineItems.map((item, i) => (
                      <div key={item.id} className="p-2.5 rounded-lg border border-border bg-secondary/10 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                          <select
                            value={item.product_id || ""}
                            onChange={(e) => e.target.value ? selectCatalogProduct(i, e.target.value) : null}
                            className={`${inputClass} text-sm flex-1`}
                          >
                            <option value="">เลือกจาก catalog...</option>
                            {catalogProducts.map((cp) => (
                              <option key={cp.id} value={cp.id}>{cp.model} — ฿{formatPrice(cp.base_price)}</option>
                            ))}
                          </select>
                          <button onClick={() => removeLineItem(i)} className="text-muted-foreground/40 hover:text-destructive">
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <label className="text-sm text-muted-foreground">รุ่น</label>
                            <input value={item.model} onChange={(e) => updateLineItem(i, "model", e.target.value)} className={`${inputClass} text-sm`} />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">จำนวน</label>
                            <input type="number" min="1" value={item.qty} onChange={(e) => updateLineItem(i, "qty", parseInt(e.target.value) || 1)} className={`${inputClass} text-sm`} />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">ราคา/หน่วย</label>
                            <input type="number" value={item.unit_price} onChange={(e) => updateLineItem(i, "unit_price", parseFloat(e.target.value) || 0)} className={`${inputClass} text-sm`} />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">ส่วนลด %</label>
                            <input type="number" min="0" max="100" value={item.discount_percent} onChange={(e) => updateLineItem(i, "discount_percent", parseFloat(e.target.value) || 0)} className={`${inputClass} text-sm`} />
                          </div>
                        </div>
                        <div className="text-right text-xs font-bold text-primary">
                          ฿{formatPrice(item.line_total)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">รวมก่อนส่วนลด</span>
                  <span className="text-foreground">฿{formatPrice(calcSubtotal())}</span>
                </div>
                <div className="flex justify-between text-xs items-center gap-2">
                  <span className="text-muted-foreground">ส่วนลดรวม (฿)</span>
                  <input
                    type="number"
                    value={quoteEdit.discount_amount}
                    onChange={(e) => setQuoteEdit((f) => ({ ...f, discount_amount: parseFloat(e.target.value) || 0 }))}
                    className={`${inputClass} text-xs w-28 text-right`}
                  />
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                  <span className="text-foreground">ยอดรวมสุทธิ</span>
                  <span className="text-primary">฿{formatPrice(calcGrandTotal())}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-muted-foreground">ราคาใช้ได้ถึง</label>
                  <input type="date" value={quoteEdit.valid_until} onChange={(e) => setQuoteEdit((f) => ({ ...f, valid_until: e.target.value }))} className={`${inputClass} text-sm`} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">เงื่อนไขชำระ</label>
                  <input value={quoteEdit.payment_terms} onChange={(e) => setQuoteEdit((f) => ({ ...f, payment_terms: e.target.value }))} className={`${inputClass} text-sm`} placeholder="30 วันหลังส่งมอบ" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">เงื่อนไขจัดส่ง</label>
                  <input value={quoteEdit.delivery_terms} onChange={(e) => setQuoteEdit((f) => ({ ...f, delivery_terms: e.target.value }))} className={`${inputClass} text-sm`} placeholder="ส่งฟรีทั่วประเทศ" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">URL ไฟล์ PDF</label>
                  <input value={quoteEdit.pdf_url} onChange={(e) => setQuoteEdit((f) => ({ ...f, pdf_url: e.target.value }))} className={`${inputClass} text-sm`} placeholder="https://..." />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleApprove}
                  disabled={saving || lineItems.length === 0}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {saving ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                  อนุมัติ + ส่งราคาให้ลูกค้า
                </button>
              </div>
            </div>
          ) : (
            <div className="card-surface rounded-xl p-10 text-center text-muted-foreground text-sm">
              <Eye size={24} className="mx-auto mb-2 opacity-30" />
              เลือกใบเสนอราคาเพื่อตรวจสอบ
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuoteReview;
