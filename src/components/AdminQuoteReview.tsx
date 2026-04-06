import { useState, useEffect, useRef } from "react";
import {
  FileText, CheckCircle, Clock, DollarSign, Edit3, Save,
  Loader2, RefreshCw, Eye, Send, XCircle, Plus, Trash2,
  Search, Download, User, Building2, Phone, Mail, Upload,
  ChevronDown, MapPin, Hash, CreditCard, Truck, Package,
  FileUp, Link2, Paperclip, Info, X, ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

/* ─── Types ─── */
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
  _catalogName?: string;
  _catalogDesc?: string;
  _catalogSpecs?: Record<string, string>;
}

interface CatalogProduct {
  id: string;
  model: string;
  name_th: string;
  category: string;
  base_price: number;
  specs: Record<string, string>;
  description: string;
}

interface DocLibraryItem {
  id: string;
  title: string;
  file_url: string;
  category: string;
}

/* ─── Constants ─── */
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: "ใหม่", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  quoted: { label: "ส่งราคาแล้ว", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  negotiating: { label: "เจรจา", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  won: { label: "สำเร็จ", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  lost: { label: "ไม่สำเร็จ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const DELIVERY_OPTIONS = [
  "ส่งฟรีทั่วประเทศ",
  "ส่งฟรีในเขต กทม. และปริมณฑล",
  "จัดส่งภายใน 3-5 วันทำการ",
  "จัดส่งภายใน 7-14 วันทำการ",
  "จัดส่งภายใน 15-30 วันทำการ (สินค้าสั่งผลิต)",
  "รับสินค้าเองที่บริษัท",
  "จัดส่งพร้อมติดตั้ง (คิดค่าบริการเพิ่ม)",
  "ตามที่ตกลง",
];

const PAYMENT_OPTIONS = [
  "ชำระเต็มจำนวนก่อนจัดส่ง",
  "30 วันหลังส่งมอบ",
  "60 วันหลังส่งมอบ",
  "มัดจำ 50% ที่เหลือจ่ายก่อนจัดส่ง",
  "เครดิต 30 วัน",
  "เครดิต 45 วัน",
  "ตามที่ตกลง",
];

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const labelClass = "text-xs font-medium text-muted-foreground mb-1 block";

/* ─── Component ─── */
const AdminQuoteReview = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>([]);
  const [lineLoading, setLineLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Quote edit fields
  const [quoteEdit, setQuoteEdit] = useState({
    discount_amount: 0, valid_until: "", payment_terms: "30 วันหลังส่งมอบ",
    delivery_terms: "ส่งฟรีทั่วประเทศ", pdf_url: "", notes: "",
  });

  // PDF upload
  const [pdfUploading, setPdfUploading] = useState(false);

  // Document library browse
  const [showDocPicker, setShowDocPicker] = useState(false);
  const [docLibrary, setDocLibrary] = useState<DocLibraryItem[]>([]);

  /* ─── Fetch ─── */
  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await (supabase.from as any)("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setQuotes(data);
    } catch {}
    setLoading(false);
  };

  const fetchCatalog = async () => {
    try {
      const { data } = await (supabase.from as any)("product_catalog")
        .select("id, model, name_th, category, base_price, specs, description")
        .eq("is_active", true)
        .order("category")
        .order("model");
      if (data) setCatalogProducts(data);
    } catch {}
  };

  const fetchDocLibrary = async () => {
    try {
      const { data } = await (supabase.from as any)("document_library")
        .select("id, title, file_url, category")
        .order("title");
      if (data) setDocLibrary(data);
    } catch {}
  };

  useEffect(() => {
    fetchQuotes();
    fetchCatalog();
    fetchDocLibrary();
  }, []);

  /* ─── Select Quote ─── */
  const selectQuote = async (q: QuoteRequest) => {
    setSelectedQuote(q);
    setExpandedItem(null);
    setQuoteEdit({
      discount_amount: q.discount_amount || 0,
      valid_until: q.valid_until ? q.valid_until.split("T")[0] : "",
      payment_terms: q.payment_terms || "30 วันหลังส่งมอบ",
      delivery_terms: q.delivery_terms || "ส่งฟรีทั่วประเทศ",
      pdf_url: q.pdf_url || "",
      notes: q.notes || "",
    });

    setLineLoading(true);
    try {
      const { data: existingItems } = await (supabase.from as any)("quote_line_items")
        .select("*")
        .eq("quote_id", q.id)
        .order("sort_order");

      if (existingItems && existingItems.length > 0) {
        // Enrich with catalog data
        const enriched = existingItems.map((item: LineItem) => {
          const cat = catalogProducts.find((p) => p.id === item.product_id || p.model === item.model);
          return {
            ...item,
            _catalogName: cat?.name_th || "",
            _catalogDesc: cat?.description || "",
            _catalogSpecs: cat?.specs || item.custom_specs || {},
          };
        });
        setLineItems(enriched);
      } else {
        // Create from quote products
        const items: LineItem[] = (q.products || []).map((p: any, i: number) => {
          const cat = catalogProducts.find((cp) => cp.model === p.model);
          return {
            id: `temp-${i}`,
            quote_id: q.id,
            product_id: cat?.id || null,
            model: p.model || "",
            category: p.category || cat?.category || "",
            qty: p.qty || 1,
            unit_price: cat?.base_price || 0,
            discount_percent: 0,
            line_total: (cat?.base_price || 0) * (p.qty || 1),
            custom_specs: cat?.specs || {},
            admin_notes: null,
            sort_order: i,
            _catalogName: cat?.name_th || "",
            _catalogDesc: cat?.description || "",
            _catalogSpecs: cat?.specs || {},
          };
        });
        setLineItems(items);
      }
    } catch {}
    setLineLoading(false);
  };

  /* ─── Line Items ─── */
  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`, quote_id: selectedQuote?.id || "", product_id: null,
        model: "", category: "", qty: 1, unit_price: 0, discount_percent: 0, line_total: 0,
        custom_specs: {}, admin_notes: null, sort_order: prev.length,
        _catalogName: "", _catalogDesc: "", _catalogSpecs: {},
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    setLineItems((prev) => {
      const updated = [...prev];
      (updated[index] as any)[field] = value;
      const item = updated[index];
      const discounted = item.unit_price * (1 - item.discount_percent / 100);
      item.line_total = Math.round(discounted * item.qty);
      return updated;
    });
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
        _catalogName: product.name_th,
        _catalogDesc: product.description,
        _catalogSpecs: product.specs,
      };
      return updated;
    });
  };

  /* ─── Upload PDF ─── */
  const handlePdfUpload = async (file: File) => {
    setPdfUploading(true);
    try {
      const filePath = `quotes/${selectedQuote?.quote_number || "draft"}_${Date.now()}.pdf`;
      const { error } = await supabase.storage.from("documents").upload(filePath, file, { contentType: "application/pdf" });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(filePath);
      const url = urlData?.publicUrl || "";
      setQuoteEdit((f) => ({ ...f, pdf_url: url }));
      toast({ title: "อัปโหลด PDF สำเร็จ" });
    } catch (err: any) {
      toast({ title: "อัปโหลดไม่ได้", description: err.message, variant: "destructive" });
    } finally {
      setPdfUploading(false);
    }
  };

  /* ─── Attach from Document Library ─── */
  const handleAttachDoc = (doc: DocLibraryItem) => {
    setQuoteEdit((f) => ({ ...f, pdf_url: doc.file_url }));
    setShowDocPicker(false);
    toast({ title: `แนบ "${doc.title}" แล้ว` });
  };

  /* ─── Approve ─── */
  const calcSubtotal = () => lineItems.reduce((sum, item) => sum + item.line_total, 0);
  const calcGrandTotal = () => calcSubtotal() - quoteEdit.discount_amount;

  const handleApprove = async () => {
    if (!selectedQuote || !user) return;
    setSaving(true);
    try {
      await (supabase.from as any)("quote_line_items").delete().eq("quote_id", selectedQuote.id);

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
        const { error: lineError } = await (supabase.from as any)("quote_line_items").insert(itemsToInsert);
        if (lineError) throw lineError;
      }

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

      if (selectedQuote.user_id) {
        await (supabase.from as any)("notifications").insert({
          user_id: selectedQuote.user_id,
          type: "quote_status",
          title: "ใบเสนอราคาพร้อมแล้ว",
          message: `ใบเสนอราคา ${selectedQuote.quote_number || "#"} มูลค่า ฿${grandTotal.toLocaleString()} พร้อมให้ดาวน์โหลด`,
          link: "/my-account?tab=quotes",
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

  /* ─── Helpers ─── */
  const fp = (n: number) => new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(n);
  const fd = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false;
    if (searchText) {
      const s = searchText.toLowerCase();
      if (!q.name.toLowerCase().includes(s) && !q.email.toLowerCase().includes(s) && !(q.quote_number || "").toLowerCase().includes(s) && !(q.company || "").toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 flex-wrap">
          {[
            { value: "all", label: "ทั้งหมด" },
            { value: "new", label: `ใหม่ (${newCount})` },
            { value: "quoted", label: "ส่งราคาแล้ว" },
            { value: "negotiating", label: "เจรจา" },
            { value: "won", label: "สำเร็จ" },
          ].map((f) => (
            <button key={f.value} onClick={() => setStatusFilter(f.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === f.value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/60"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="ค้นหา..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
              className={`${inputClass} pl-8 py-1.5 text-xs w-40`} />
          </div>
          <button onClick={fetchQuotes} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ═══ Left: Quote List ═══ */}
        <div className="lg:col-span-2 space-y-1.5 max-h-[80vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-muted-foreground" /></div>
          ) : filteredQuotes.length === 0 ? (
            <div className="card-surface rounded-xl p-10 text-center text-muted-foreground text-sm">ไม่มีใบเสนอราคา</div>
          ) : (
            filteredQuotes.map((q) => {
              const status = STATUS_CONFIG[q.status] || STATUS_CONFIG.new;
              const isSelected = selectedQuote?.id === q.id;
              return (
                <button key={q.id} onClick={() => selectQuote(q)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-foreground">{q.quote_number || "Q-draft"}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${status.color}`}>{status.label}</span>
                    {q.customer_response === "accepted" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">ลูกค้ายอมรับ</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{q.name} · {q.company || q.email}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-muted-foreground">{fd(q.created_at)}</span>
                    {q.grand_total > 0 && <span className="text-xs font-bold text-primary">฿{fp(q.grand_total)}</span>}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* ═══ Right: Quote Detail ═══ */}
        <div className="lg:col-span-3">
          {selectedQuote ? (
            <div className="card-surface rounded-xl p-5 space-y-5 sticky top-24 max-h-[85vh] overflow-y-auto">
              {/* Quote Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{selectedQuote.quote_number || "Draft"}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border font-bold ${(STATUS_CONFIG[selectedQuote.status] || STATUS_CONFIG.new).color}`}>
                  {(STATUS_CONFIG[selectedQuote.status] || STATUS_CONFIG.new).label}
                </span>
              </div>

              {/* Customer Info Card */}
              <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">ข้อมูลลูกค้า</h4>
                <div className="grid grid-cols-2 gap-2.5 text-sm">
                  <span className="flex items-center gap-2 text-foreground"><User size={13} className="text-primary shrink-0" /> {selectedQuote.name}</span>
                  <span className="flex items-center gap-2 text-foreground"><Mail size={13} className="text-primary shrink-0" /> {selectedQuote.email}</span>
                  {selectedQuote.company && <span className="flex items-center gap-2 text-foreground"><Building2 size={13} className="text-primary shrink-0" /> {selectedQuote.company}</span>}
                  {selectedQuote.phone && <span className="flex items-center gap-2 text-foreground"><Phone size={13} className="text-primary shrink-0" /> {selectedQuote.phone}</span>}
                </div>
                {selectedQuote.details && (
                  <p className="text-xs text-muted-foreground mt-2 p-2 rounded bg-background border border-border">{selectedQuote.details}</p>
                )}
              </div>

              {/* ═══ Line Items ═══ */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-foreground">รายการสินค้า</h4>
                  <button onClick={addLineItem} className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium">
                    <Plus size={12} /> เพิ่มรายการ
                  </button>
                </div>
                {lineLoading ? (
                  <div className="py-4 text-center"><Loader2 size={16} className="animate-spin text-muted-foreground mx-auto" /></div>
                ) : (
                  <div className="space-y-3">
                    {lineItems.map((item, i) => (
                      <div key={item.id} className="rounded-xl border border-border bg-secondary/10 overflow-hidden">
                        {/* Product Selector */}
                        <div className="p-3 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-5 shrink-0 font-bold">{i + 1}.</span>
                          <select value={item.product_id || ""} onChange={(e) => e.target.value ? selectCatalogProduct(i, e.target.value) : null}
                            className={`${inputClass} text-xs flex-1`}>
                            <option value="">เลือกจาก catalog...</option>
                            {catalogProducts.map((cp) => (
                              <option key={cp.id} value={cp.id}>{cp.model} — ฿{fp(cp.base_price)}</option>
                            ))}
                          </select>
                          <button onClick={() => setExpandedItem(expandedItem === i ? null : i)}
                            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors" title="ดูรายละเอียด">
                            <Info size={14} />
                          </button>
                          <button onClick={() => removeLineItem(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground/40 hover:text-red-500 transition-colors">
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {/* Product Specs (expanded) */}
                        {expandedItem === i && (item._catalogName || item._catalogDesc || Object.keys(item._catalogSpecs || {}).length > 0) && (
                          <div className="px-3 pb-3 mx-3 mb-2 rounded-lg bg-background border border-border/50 space-y-2">
                            {item._catalogName && <p className="text-xs font-semibold text-foreground pt-2">{item._catalogName}</p>}
                            {item._catalogDesc && <p className="text-[11px] text-muted-foreground line-clamp-3">{item._catalogDesc}</p>}
                            {item._catalogSpecs && Object.keys(item._catalogSpecs).length > 0 && (
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                                {Object.entries(item._catalogSpecs).map(([key, val]) => {
                                  if (!val || val === "No") return null;
                                  const labels: Record<string, string> = { cpu: "CPU", ram: "RAM", com: "COM", usb: "USB", lan: "LAN", display: "จอ", gpio: "GPIO", sim: "SIM", gen: "Gen", fanless: "Fanless", ip_rating: "IP" };
                                  return (
                                    <span key={key} className="text-muted-foreground">
                                      <span className="font-medium text-foreground/60">{labels[key] || key}:</span> {val === "Yes" ? "✓" : val}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Editable Fields */}
                        <div className="px-3 pb-3 grid grid-cols-4 gap-2">
                          <div>
                            <label className={labelClass}>รุ่น</label>
                            <input value={item.model} onChange={(e) => updateLineItem(i, "model", e.target.value)} className={`${inputClass} text-xs`} />
                          </div>
                          <div>
                            <label className={labelClass}>จำนวน</label>
                            <input type="number" min="1" value={item.qty} onChange={(e) => updateLineItem(i, "qty", parseInt(e.target.value) || 1)} className={`${inputClass} text-xs`} />
                          </div>
                          <div>
                            <label className={labelClass}>ราคา/หน่วย</label>
                            <input type="number" value={item.unit_price} onChange={(e) => updateLineItem(i, "unit_price", parseFloat(e.target.value) || 0)} className={`${inputClass} text-xs`} />
                          </div>
                          <div>
                            <label className={labelClass}>ส่วนลด %</label>
                            <input type="number" min="0" max="100" value={item.discount_percent} onChange={(e) => updateLineItem(i, "discount_percent", parseFloat(e.target.value) || 0)} className={`${inputClass} text-xs`} />
                          </div>
                        </div>

                        {/* Admin notes per item */}
                        <div className="px-3 pb-3">
                          <input value={item.admin_notes || ""} onChange={(e) => updateLineItem(i, "admin_notes", e.target.value)}
                            placeholder="หมายเหตุสินค้า (เช่น config พิเศษ, lead time)" className={`${inputClass} text-[11px]`} />
                        </div>

                        {/* Line total */}
                        <div className="px-3 pb-3 text-right text-xs font-bold text-primary">฿{fp(item.line_total)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══ Totals ═══ */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">รวมก่อนส่วนลด</span>
                  <span className="text-foreground font-medium">฿{fp(calcSubtotal())}</span>
                </div>
                <div className="flex justify-between text-xs items-center gap-2">
                  <span className="text-muted-foreground">ส่วนลดรวม (฿)</span>
                  <input type="number" value={quoteEdit.discount_amount}
                    onChange={(e) => setQuoteEdit((f) => ({ ...f, discount_amount: parseFloat(e.target.value) || 0 }))}
                    className={`${inputClass} text-xs w-28 text-right`} />
                </div>
                <div className="flex justify-between text-base font-bold border-t border-border pt-3">
                  <span className="text-foreground">ยอดรวมสุทธิ</span>
                  <span className="text-primary">฿{fp(calcGrandTotal())}</span>
                </div>
              </div>

              {/* ═══ Terms & Conditions ═══ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">เงื่อนไข</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>ราคาใช้ได้ถึง</label>
                    <input type="date" value={quoteEdit.valid_until} onChange={(e) => setQuoteEdit((f) => ({ ...f, valid_until: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>เงื่อนไขชำระ</label>
                    <select value={quoteEdit.payment_terms} onChange={(e) => setQuoteEdit((f) => ({ ...f, payment_terms: e.target.value }))} className={inputClass}>
                      {PAYMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>เงื่อนไขจัดส่ง</label>
                    <select value={quoteEdit.delivery_terms} onChange={(e) => setQuoteEdit((f) => ({ ...f, delivery_terms: e.target.value }))} className={inputClass}>
                      {DELIVERY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ═══ PDF Attachment ═══ */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">แนบไฟล์</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Upload PDF */}
                  <input ref={pdfInputRef} type="file" accept=".pdf" className="hidden"
                    onChange={(e) => e.target.files?.[0] && handlePdfUpload(e.target.files[0])} />
                  <button onClick={() => pdfInputRef.current?.click()} disabled={pdfUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-xs text-muted-foreground hover:text-primary transition-all">
                    {pdfUploading ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
                    {pdfUploading ? "กำลังอัปโหลด..." : "Browse อัปโหลด PDF"}
                  </button>

                  {/* Attach from Document Library */}
                  <button onClick={() => setShowDocPicker(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-xs text-muted-foreground hover:text-primary transition-all">
                    <Paperclip size={14} /> แนบจากคลังเอกสาร
                  </button>
                </div>

                {quoteEdit.pdf_url && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-500/5 border border-green-500/20 text-xs">
                    <FileText size={14} className="text-green-500 shrink-0" />
                    <a href={quoteEdit.pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate flex-1">
                      {quoteEdit.pdf_url.split("/").pop() || "ไฟล์แนบ"}
                    </a>
                    <button onClick={() => setQuoteEdit((f) => ({ ...f, pdf_url: "" }))} className="text-muted-foreground hover:text-red-500"><X size={13} /></button>
                  </div>
                )}
              </div>

              {/* Admin Notes */}
              <div>
                <label className={labelClass}>หมายเหตุ Admin (ไม่แสดงให้ลูกค้า)</label>
                <textarea value={quoteEdit.notes} onChange={(e) => setQuoteEdit((f) => ({ ...f, notes: e.target.value }))}
                  className={`${inputClass} resize-none`} rows={2} placeholder="บันทึกภายใน..." />
              </div>

              {/* ═══ Action ═══ */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <button onClick={handleApprove} disabled={saving || lineItems.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
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

      {/* ═══ Modal: Document Picker ═══ */}
      {showDocPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDocPicker(false)}>
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2"><Paperclip size={16} className="text-primary" /> เลือกจากคลังเอกสาร</h3>
              <button onClick={() => setShowDocPicker(false)} className="p-1 rounded-lg hover:bg-secondary"><X size={16} /></button>
            </div>
            <div className="p-4 space-y-1">
              {docLibrary.filter((d) => d.file_url).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">ไม่มีเอกสารในคลัง</p>
              ) : (
                docLibrary.filter((d) => d.file_url).map((doc) => (
                  <button key={doc.id} onClick={() => handleAttachDoc(doc)}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors flex items-center gap-3">
                    <FileText size={16} className="text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                      <p className="text-[11px] text-muted-foreground">{doc.category}</p>
                    </div>
                    <ExternalLink size={13} className="text-muted-foreground shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuoteReview;
