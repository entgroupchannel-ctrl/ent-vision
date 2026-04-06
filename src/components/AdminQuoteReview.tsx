import { useState, useEffect, useRef, useMemo } from "react";
import {
  FileText, CheckCircle, Clock, Loader2, RefreshCw, Eye, Plus, Trash2,
  Search, User, Building2, Phone, Mail, Upload, Info, X, ExternalLink,
  FileUp, Paperclip, Printer, Share2, ChevronDown, CalendarDays, Link2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import QuoteTimeline from "@/components/QuoteTimeline";

/* ─── Types ─── */
interface QuoteRequest {
  id: string; quote_number: string | null; created_at: string; status: string;
  products: any[]; details: string | null; name: string; email: string;
  phone: string | null; company: string | null; user_id: string | null;
  subtotal: number; discount_amount: number; grand_total: number;
  valid_until: string | null; payment_terms: string | null; delivery_terms: string | null;
  approved_by: string | null; approved_at: string | null; pdf_url: string | null;
  customer_response: string | null; notes: string | null;
}

interface LineItem {
  id: string; quote_id: string; product_id: string | null; model: string;
  category: string | null; qty: number; unit_price: number; discount_percent: number;
  line_total: number; custom_specs: Record<string, string>; admin_notes: string | null;
  sort_order: number;
  _name?: string; _desc?: string; _specs?: Record<string, string>;
}

interface CatalogProduct {
  id: string; model: string; name_th: string; category: string;
  base_price: number; specs: Record<string, string>; description: string;
}

interface DocLibraryItem { id: string; title: string; file_url: string; category: string; }

/* ─── Constants ─── */
const STATUS_CFG: Record<string, { label: string; color: string }> = {
  new: { label: "ใหม่", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  quoted: { label: "ส่งราคาแล้ว", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  negotiating: { label: "เจรจา", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  won: { label: "สำเร็จ", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  lost: { label: "ไม่สำเร็จ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const DELIVERY_OPTS = [
  "ส่งฟรีทั่วประเทศ", "ส่งฟรีในเขต กทม. และปริมณฑล",
  "จัดส่งภายใน 3-5 วันทำการ", "จัดส่งภายใน 7-14 วันทำการ",
  "จัดส่งภายใน 15-30 วันทำการ (สินค้าสั่งผลิต)", "รับสินค้าเองที่บริษัท",
  "จัดส่งพร้อมติดตั้ง", "ตามที่ตกลง",
];

const PAYMENT_OPTS = [
  "มัดจำ 70% ส่วนที่เหลือจ่ายก่อนส่งสินค้า",
  "ชำระเต็มจำนวนก่อนจัดส่ง", "มัดจำ 50% ที่เหลือจ่ายก่อนจัดส่ง",
  "30 วันหลังส่งมอบ", "60 วันหลังส่งมอบ",
  "เครดิต 30 วัน", "เครดิต 45 วัน", "ตามที่ตกลง",
];

const VALIDITY_PRESETS = [
  { label: "15 วัน", days: 15 }, { label: "30 วัน", days: 30 }, { label: "45 วัน", days: 45 },
];

const SPEC_LABELS: Record<string, string> = {
  cpu: "CPU", ram: "RAM", com: "COM", usb: "USB", lan: "LAN", display: "จอ",
  gpio: "GPIO", sim: "SIM", gen: "Gen", fanless: "Fanless", ip_rating: "IP",
};

const inp = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
const lbl = "text-[11px] font-medium text-muted-foreground mb-1 block";

/* ─── Print Template ─── */
const buildPrintHtml = (q: QuoteRequest, items: LineItem[], edit: any) => {
  const fp = (n: number) => new Intl.NumberFormat("th-TH").format(n);
  const subtotal = items.reduce((s, i) => s + i.line_total, 0);
  const grand = subtotal - (edit.discount_amount || 0);
  const today = new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
  const validDate = edit.valid_until ? new Date(edit.valid_until).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" }) : "—";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ใบเสนอราคา ${q.quote_number || ""}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Sarabun','Noto Sans Thai',sans-serif;font-size:13px;color:#1a1a1a;padding:40px;max-width:800px;margin:0 auto}
@media print{body{padding:20px}}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #0ea5e9}
.logo-area h1{font-size:22px;font-weight:700;color:#0ea5e9}
.logo-area p{font-size:11px;color:#666;margin-top:2px}
.quote-info{text-align:right}
.quote-info h2{font-size:18px;font-weight:700;color:#1a1a1a}
.quote-info p{font-size:11px;color:#666}
.customer{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:20px}
.customer h3{font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.customer-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.customer-grid span{font-size:12px}
.customer-grid .label{color:#64748b}
table{width:100%;border-collapse:collapse;margin-bottom:16px}
th{background:#0ea5e9;color:#fff;font-size:11px;font-weight:600;padding:8px 10px;text-align:left}
th:nth-child(3),th:nth-child(4),th:nth-child(5),th:nth-child(6){text-align:right}
td{padding:8px 10px;border-bottom:1px solid #e2e8f0;font-size:12px;vertical-align:top}
td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6){text-align:right}
.spec-text{font-size:10px;color:#64748b;margin-top:3px;line-height:1.4}
.totals{float:right;width:280px;margin-bottom:20px}
.totals .row{display:flex;justify-content:space-between;padding:4px 0;font-size:12px}
.totals .grand{font-size:16px;font-weight:700;color:#0ea5e9;border-top:2px solid #0ea5e9;padding-top:8px;margin-top:4px}
.terms{clear:both;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:20px}
.terms h3{font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.terms-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.terms-grid .label{color:#64748b;font-size:11px}
.terms-grid .value{font-size:12px;font-weight:500}
.footer{text-align:center;padding-top:16px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8}
.signatures{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:32px 0;padding-top:20px}
.sig-box{text-align:center;padding-top:60px;border-top:1px solid #cbd5e1}
.sig-box p{font-size:11px;color:#64748b}
</style></head><body>
<div class="header">
  <div class="logo-area">
    <h1>ENT GROUP</h1>
    <p>บริษัท อี.เอ็น.ที. กรุ๊ป จำกัด</p>
    <p>Industrial Computer Solutions</p>
  </div>
  <div class="quote-info">
    <h2>ใบเสนอราคา</h2>
    <p>เลขที่: <strong>${q.quote_number || "—"}</strong></p>
    <p>วันที่: ${today}</p>
  </div>
</div>
<div class="customer">
  <h3>ข้อมูลลูกค้า</h3>
  <div class="customer-grid">
    <span><span class="label">ชื่อ:</span> ${q.name}</span>
    <span><span class="label">อีเมล:</span> ${q.email}</span>
    ${q.company ? `<span><span class="label">บริษัท:</span> ${q.company}</span>` : ""}
    ${q.phone ? `<span><span class="label">โทร:</span> ${q.phone}</span>` : ""}
  </div>
  ${q.details ? `<p style="margin-top:6px;font-size:11px;color:#64748b">${q.details}</p>` : ""}
</div>
<table>
  <thead><tr><th style="width:30px">#</th><th>รายการ</th><th>จำนวน</th><th>ราคา/หน่วย</th><th>ส่วนลด</th><th>รวม</th></tr></thead>
  <tbody>${items.map((item, i) => {
    const specs = item._specs || item.custom_specs || {};
    const specStr = Object.entries(specs).filter(([, v]) => v && v !== "No").map(([k, v]) => `${SPEC_LABELS[k] || k}: ${v === "Yes" ? "✓" : v}`).join(" | ");
    return `<tr>
      <td>${i + 1}</td>
      <td><strong>${item.model}</strong>${item._name ? `<br><span style="font-size:10px;color:#64748b">${item._name}</span>` : ""}${specStr ? `<div class="spec-text">${specStr}</div>` : ""}${item.admin_notes ? `<div class="spec-text" style="color:#0ea5e9">* ${item.admin_notes}</div>` : ""}</td>
      <td>${item.qty}</td>
      <td>฿${fp(item.unit_price)}</td>
      <td>${item.discount_percent > 0 ? item.discount_percent + "%" : "—"}</td>
      <td>฿${fp(item.line_total)}</td>
    </tr>`;
  }).join("")}</tbody>
</table>
<div class="totals">
  <div class="row"><span>รวมก่อนส่วนลด</span><span>฿${fp(subtotal)}</span></div>
  ${edit.discount_amount > 0 ? `<div class="row"><span>ส่วนลด</span><span>-฿${fp(edit.discount_amount)}</span></div>` : ""}
  <div class="row grand"><span>ยอดรวมสุทธิ</span><span>฿${fp(grand)}</span></div>
</div>
<div class="terms">
  <h3>เงื่อนไข</h3>
  <div class="terms-grid">
    <div><span class="label">ราคายืนถึง:</span><br><span class="value">${validDate}</span></div>
    <div><span class="label">เงื่อนไขชำระ:</span><br><span class="value">${edit.payment_terms || "—"}</span></div>
    <div><span class="label">เงื่อนไขจัดส่ง:</span><br><span class="value">${edit.delivery_terms || "—"}</span></div>
    <div><span class="label">การรับประกัน:</span><br><span class="value">1 ปี Carry-in</span></div>
  </div>
</div>
<div class="signatures">
  <div class="sig-box"><p>ผู้เสนอราคา (ENT GROUP)</p></div>
  <div class="sig-box"><p>ผู้อนุมัติ / ลูกค้า</p></div>
</div>
<div class="footer">
  <p>บริษัท อี.เอ็น.ที. กรุ๊ป จำกัด | www.entgroup.co.th | 02-XXX-XXXX</p>
  <p>เอกสารนี้สร้างจากระบบ ENT Vision — ${new Date().toISOString()}</p>
</div>
</body></html>`;
};

/* ─── Component ─── */
const AdminQuoteReview = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLInputElement>(null);

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [items, setItems] = useState<LineItem[]>([]);
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [lineLoading, setLineLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [expandItem, setExpandItem] = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState("all");
  const [pdfUp, setPdfUp] = useState(false);
  const [showDocPick, setShowDocPick] = useState(false);
  const [docLib, setDocLib] = useState<DocLibraryItem[]>([]);

  const [edit, setEdit] = useState({
    discount_amount: 0, valid_until: "", payment_terms: "มัดจำ 70% ส่วนที่เหลือจ่ายก่อนส่งสินค้า",
    delivery_terms: "ส่งฟรีทั่วประเทศ", pdf_url: "", notes: "",
  });

  // Derived: categories from catalog
  const categories = useMemo(() => {
    const cats = new Set(catalog.map((p) => p.category));
    return Array.from(cats).sort();
  }, [catalog]);

  const filteredCatalog = useMemo(() => {
    if (catFilter === "all") return catalog;
    return catalog.filter((p) => p.category === catFilter);
  }, [catalog, catFilter]);

  /* ─── Fetch ─── */
  const fetchQuotes = async () => {
    setLoading(true);
    const { data } = await (supabase.from as any)("quote_requests").select("*").order("created_at", { ascending: false });
    if (data) setQuotes(data);
    setLoading(false);
  };

  const fetchCatalog = async () => {
    const { data } = await (supabase.from as any)("product_catalog")
      .select("id, model, name_th, category, base_price, specs, description")
      .eq("is_active", true).order("category").order("model");
    if (data) setCatalog(data);
  };

  const fetchDocLib = async () => {
    const { data } = await (supabase.from as any)("document_library").select("id, title, file_url, category").order("title");
    if (data) setDocLib(data);
  };

  useEffect(() => { fetchQuotes(); fetchCatalog(); fetchDocLib(); }, []);

  /* ─── Select Quote ─── */
  const selectQuote = async (q: QuoteRequest) => {
    setSelected(q);
    setExpandItem(null);
    setCatFilter("all");
    const validDate = q.valid_until ? q.valid_until.split("T")[0] : addDays(15);
    setEdit({
      discount_amount: q.discount_amount || 0,
      valid_until: validDate,
      payment_terms: q.payment_terms || "มัดจำ 70% ส่วนที่เหลือจ่ายก่อนส่งสินค้า",
      delivery_terms: q.delivery_terms || "ส่งฟรีทั่วประเทศ",
      pdf_url: q.pdf_url || "", notes: q.notes || "",
    });

    setLineLoading(true);
    try {
      const { data: ex } = await (supabase.from as any)("quote_line_items").select("*").eq("quote_id", q.id).order("sort_order");
      if (ex && ex.length > 0) {
        setItems(ex.map((it: LineItem) => enrich(it)));
      } else {
        setItems((q.products || []).map((p: any, i: number) => {
          const cat = catalog.find((c) => c.model === p.model);
          return enrich({
            id: `t-${i}`, quote_id: q.id, product_id: cat?.id || null, model: p.model || "",
            category: p.category || cat?.category || "", qty: p.qty || 1,
            unit_price: cat?.base_price || 0, discount_percent: 0,
            line_total: (cat?.base_price || 0) * (p.qty || 1),
            custom_specs: cat?.specs || {}, admin_notes: null, sort_order: i,
          });
        }));
      }
    } catch {}
    setLineLoading(false);
  };

  const enrich = (it: LineItem): LineItem => {
    const cat = catalog.find((c) => c.id === it.product_id || c.model === it.model);
    return { ...it, _name: cat?.name_th || "", _desc: cat?.description || "", _specs: cat?.specs || it.custom_specs || {} };
  };

  /* ─── Line Items ─── */
  const addLine = () => setItems((p) => [...p, {
    id: `t-${Date.now()}`, quote_id: selected?.id || "", product_id: null,
    model: "", category: "", qty: 1, unit_price: 0, discount_percent: 0,
    line_total: 0, custom_specs: {}, admin_notes: null, sort_order: p.length,
    _name: "", _desc: "", _specs: {},
  }]);

  const removeLine = (i: number) => items.length > 1 && setItems((p) => p.filter((_, idx) => idx !== i));

  const updateLine = (i: number, field: string, value: any) => {
    setItems((prev) => {
      const u = [...prev];
      (u[i] as any)[field] = value;
      u[i].line_total = Math.round(u[i].unit_price * (1 - u[i].discount_percent / 100) * u[i].qty);
      return u;
    });
  };

  const pickProduct = (i: number, pid: string) => {
    const p = catalog.find((c) => c.id === pid);
    if (!p) return;
    setItems((prev) => {
      const u = [...prev];
      u[i] = { ...u[i], product_id: p.id, model: p.model, category: p.category,
        unit_price: p.base_price, line_total: p.base_price * u[i].qty,
        custom_specs: p.specs, _name: p.name_th, _desc: p.description, _specs: p.specs };
      return u;
    });
  };

  /* ─── PDF Upload ─── */
  const handlePdfUp = async (file: File) => {
    setPdfUp(true);
    try {
      const path = `quotes/${selected?.quote_number || "q"}_${Date.now()}.pdf`;
      const { error } = await supabase.storage.from("documents").upload(path, file, { contentType: "application/pdf" });
      if (error) throw error;
      const { data } = supabase.storage.from("documents").getPublicUrl(path);
      setEdit((f) => ({ ...f, pdf_url: data?.publicUrl || "" }));
      toast({ title: "อัปโหลด PDF สำเร็จ" });
    } catch (err: any) {
      toast({ title: "อัปโหลดไม่ได้", description: err.message, variant: "destructive" });
    }
    setPdfUp(false);
  };

  /* ─── Print ─── */
  const handlePrint = () => {
    if (!selected) return;
    const html = buildPrintHtml(selected, items, edit);
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500); }
  };

  /* ─── Share Link ─── */
  const handleShare = async () => {
    if (!selected) return;
    const url = `${window.location.origin}/my-account?tab=quotes&id=${selected.id}`;
    if (navigator.share) {
      await navigator.share({ title: `ใบเสนอราคา ${selected.quote_number}`, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "คัดลอกลิงก์แล้ว" });
    }
  };

  /* ─── Approve ─── */
  const subtotal = items.reduce((s, i) => s + i.line_total, 0);
  const grand = subtotal - edit.discount_amount;

  const handleApprove = async () => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      await (supabase.from as any)("quote_line_items").delete().eq("quote_id", selected.id);
      const toInsert = items.map((it, i) => ({
        quote_id: selected.id, product_id: it.product_id, model: it.model,
        category: it.category, qty: it.qty, unit_price: it.unit_price,
        discount_percent: it.discount_percent, custom_specs: it.custom_specs,
        admin_notes: it.admin_notes, sort_order: i,
      }));
      if (toInsert.length) {
        const { error } = await (supabase.from as any)("quote_line_items").insert(toInsert);
        if (error) throw error;
      }
      const { error: qErr } = await (supabase.from as any)("quote_requests").update({
        status: "quoted", subtotal, discount_amount: edit.discount_amount, grand_total: grand,
        valid_until: edit.valid_until || null, payment_terms: edit.payment_terms || null,
        delivery_terms: edit.delivery_terms || null, pdf_url: edit.pdf_url || null,
        notes: edit.notes || null, approved_by: user.id, approved_at: new Date().toISOString(),
      }).eq("id", selected.id);
      if (qErr) throw qErr;

      if (selected.user_id) {
        await (supabase.from as any)("notifications").insert({
          user_id: selected.user_id, type: "quote_status",
          title: "ใบเสนอราคาพร้อมแล้ว",
          message: `${selected.quote_number || "#"} มูลค่า ฿${grand.toLocaleString()}`,
          link: "/my-account?tab=quotes",
        }).catch(() => {});
      }
      toast({ title: "อนุมัติสำเร็จ", description: `฿${grand.toLocaleString()}` });
      setSelected(null);
      fetchQuotes();
    } catch (err: any) {
      toast({ title: "ผิดพลาด", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  /* ─── Helpers ─── */
  const fp = (n: number) => new Intl.NumberFormat("th-TH").format(n);
  const fd = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const addDays = (d: number) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split("T")[0]; };

  const filtered = quotes.filter((q) => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false;
    if (searchText) { const s = searchText.toLowerCase(); if (![q.name, q.email, q.quote_number || "", q.company || ""].some((f) => f.toLowerCase().includes(s))) return false; }
    return true;
  });

  const newCount = quotes.filter((q) => q.status === "new").length;

  const renderSpecs = (specs: Record<string, string>) => (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px]">
      {Object.entries(specs).filter(([, v]) => v && v !== "No").map(([k, v]) => (
        <span key={k} className="text-muted-foreground"><span className="font-medium text-foreground/60">{SPEC_LABELS[k] || k}:</span> {v === "Yes" ? "✓" : v}</span>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 flex-wrap">
          {[{ v: "all", l: "ทั้งหมด" }, { v: "new", l: `ใหม่ (${newCount})` }, { v: "quoted", l: "ส่งราคาแล้ว" }, { v: "negotiating", l: "เจรจา" }, { v: "won", l: "สำเร็จ" }].map((f) => (
            <button key={f.v} onClick={() => setStatusFilter(f.v)} className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === f.v ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/60"}`}>{f.l}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="ค้นหา..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className={`${inp} pl-8 py-1.5 text-xs w-40`} />
          </div>
          <button onClick={fetchQuotes} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><RefreshCw size={12} className={loading ? "animate-spin" : ""} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* ═══ LEFT — Quote List ═══ */}
        <div className="lg:col-span-2 space-y-1.5 max-h-[80vh] overflow-y-auto pr-1">
          {loading ? <div className="text-center py-12"><Loader2 size={20} className="animate-spin text-muted-foreground" /></div>
          : filtered.length === 0 ? <div className="card-surface rounded-xl p-10 text-center text-muted-foreground text-sm">ไม่มีใบเสนอราคา</div>
          : filtered.map((q) => {
            const st = STATUS_CFG[q.status] || STATUS_CFG.new;
            return (
              <button key={q.id} onClick={() => selectQuote(q)} className={`w-full text-left p-3 rounded-lg border transition-all ${selected?.id === q.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-foreground">{q.quote_number || "Q-draft"}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${st.color}`}>{st.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{q.name} · {q.company || q.email}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-muted-foreground">{fd(q.created_at)}</span>
                  {q.grand_total > 0 && <span className="text-xs font-bold text-primary">฿{fp(q.grand_total)}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* ═══ RIGHT — Quote Detail ═══ */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="card-surface rounded-xl p-5 space-y-5 sticky top-24 max-h-[85vh] overflow-y-auto">
              {/* Header + Actions */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{selected.quote_number || "Draft"}</h3>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrint} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="พิมพ์"><Printer size={16} /></button>
                  <button onClick={handleShare} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="แชร์"><Share2 size={16} /></button>
                  <span className={`text-xs px-2 py-1 rounded-full border font-bold ${(STATUS_CFG[selected.status] || STATUS_CFG.new).color}`}>{(STATUS_CFG[selected.status] || STATUS_CFG.new).label}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-2">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">ข้อมูลลูกค้า</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="flex items-center gap-2 text-foreground"><User size={13} className="text-primary" /> {selected.name}</span>
                  <span className="flex items-center gap-2 text-foreground"><Mail size={13} className="text-primary" /> {selected.email}</span>
                  {selected.company && <span className="flex items-center gap-2 text-foreground"><Building2 size={13} className="text-primary" /> {selected.company}</span>}
                  {selected.phone && <span className="flex items-center gap-2 text-foreground"><Phone size={13} className="text-primary" /> {selected.phone}</span>}
                </div>
                {selected.details && <p className="text-xs text-muted-foreground p-2 rounded bg-background border border-border">{selected.details}</p>}
              </div>

              {/* ═══ Line Items ═══ */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-foreground">รายการสินค้า</h4>
                  <button onClick={addLine} className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"><Plus size={12} /> เพิ่มรายการ</button>
                </div>

                {/* Category filter for product dropdown */}
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-[11px] text-muted-foreground shrink-0">กรองหมวด:</label>
                  <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className={`${inp} text-xs py-1.5`}>
                    <option value="all">ทุกหมวด ({catalog.length} รุ่น)</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c} ({catalog.filter((p) => p.category === c).length})</option>
                    ))}
                  </select>
                </div>

                {lineLoading ? <div className="py-4 text-center"><Loader2 size={16} className="animate-spin text-muted-foreground mx-auto" /></div>
                : (
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={item.id} className="rounded-xl border border-border bg-secondary/10 overflow-hidden">
                        <div className="p-3 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-5 shrink-0 font-bold">{i + 1}.</span>
                          <select value={item.product_id || ""} onChange={(e) => e.target.value && pickProduct(i, e.target.value)} className={`${inp} text-xs flex-1`}>
                            <option value="">เลือกสินค้า ({filteredCatalog.length} รุ่น)...</option>
                            {filteredCatalog.map((cp) => (
                              <option key={cp.id} value={cp.id}>{cp.model} — ฿{fp(cp.base_price)}</option>
                            ))}
                          </select>
                          <button onClick={() => setExpandItem(expandItem === i ? null : i)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary" title="รายละเอียด"><Info size={14} /></button>
                          <button onClick={() => removeLine(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground/40 hover:text-red-500"><Trash2 size={13} /></button>
                        </div>

                        {/* Expanded Specs */}
                        {expandItem === i && (item._name || item._desc) && (
                          <div className="mx-3 mb-2 p-3 rounded-lg bg-background border border-border/50 space-y-1.5">
                            {item._name && <p className="text-xs font-semibold text-foreground">{item._name}</p>}
                            {item._desc && <p className="text-[10px] text-muted-foreground line-clamp-3">{item._desc}</p>}
                            {item._specs && Object.keys(item._specs).length > 0 && renderSpecs(item._specs)}
                          </div>
                        )}

                        {/* Always show mini specs when product selected */}
                        {expandItem !== i && item._name && (
                          <div className="mx-3 mb-2 px-2 py-1.5 rounded bg-background/50 text-[10px] text-muted-foreground">
                            {item._name}
                            {item._specs && Object.entries(item._specs).filter(([, v]) => v && v !== "No" && v !== "Yes").slice(0, 4).map(([k, v]) => (
                              <span key={k} className="ml-2">{SPEC_LABELS[k] || k}: {v}</span>
                            ))}
                          </div>
                        )}

                        <div className="px-3 pb-2 grid grid-cols-4 gap-2">
                          <div><label className={lbl}>รุ่น</label><input value={item.model} onChange={(e) => updateLine(i, "model", e.target.value)} className={`${inp} text-xs`} /></div>
                          <div><label className={lbl}>จำนวน</label><input type="number" min="1" value={item.qty} onChange={(e) => updateLine(i, "qty", parseInt(e.target.value) || 1)} className={`${inp} text-xs`} /></div>
                          <div><label className={lbl}>ราคา/หน่วย</label><input type="number" value={item.unit_price} onChange={(e) => updateLine(i, "unit_price", parseFloat(e.target.value) || 0)} className={`${inp} text-xs`} /></div>
                          <div><label className={lbl}>ส่วนลด %</label><input type="number" min="0" max="100" value={item.discount_percent} onChange={(e) => updateLine(i, "discount_percent", parseFloat(e.target.value) || 0)} className={`${inp} text-xs`} /></div>
                        </div>
                        <div className="px-3 pb-2"><input value={item.admin_notes || ""} onChange={(e) => updateLine(i, "admin_notes", e.target.value)} placeholder="หมายเหตุ (config, lead time)" className={`${inp} text-[11px]`} /></div>
                        <div className="px-3 pb-3 text-right text-xs font-bold text-primary">฿{fp(item.line_total)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══ Totals ═══ */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">รวมก่อนส่วนลด</span><span className="font-medium">฿{fp(subtotal)}</span></div>
                <div className="flex justify-between text-xs items-center gap-2"><span className="text-muted-foreground">ส่วนลดรวม (฿)</span><input type="number" value={edit.discount_amount} onChange={(e) => setEdit((f) => ({ ...f, discount_amount: parseFloat(e.target.value) || 0 }))} className={`${inp} text-xs w-28 text-right`} /></div>
                <div className="flex justify-between text-base font-bold border-t border-border pt-3"><span>ยอดรวมสุทธิ</span><span className="text-primary">฿{fp(grand)}</span></div>
              </div>

              {/* ═══ Terms ═══ */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">เงื่อนไข</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Validity */}
                  <div>
                    <label className={lbl}>ราคายืนถึง</label>
                    <div className="flex gap-1.5">
                      {VALIDITY_PRESETS.map((p) => (
                        <button key={p.days} onClick={() => setEdit((f) => ({ ...f, valid_until: addDays(p.days) }))} className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors ${edit.valid_until === addDays(p.days) ? "bg-primary/10 text-primary border-primary/30" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                          {p.label}
                        </button>
                      ))}
                    </div>
                    <input type="date" value={edit.valid_until} onChange={(e) => setEdit((f) => ({ ...f, valid_until: e.target.value }))} className={`${inp} text-xs mt-1.5`} />
                  </div>
                  {/* Payment */}
                  <div>
                    <label className={lbl}>เงื่อนไขชำระ</label>
                    <select value={edit.payment_terms} onChange={(e) => setEdit((f) => ({ ...f, payment_terms: e.target.value }))} className={inp}>
                      {PAYMENT_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  {/* Delivery */}
                  <div className="col-span-2">
                    <label className={lbl}>เงื่อนไขจัดส่ง</label>
                    <select value={edit.delivery_terms} onChange={(e) => setEdit((f) => ({ ...f, delivery_terms: e.target.value }))} className={inp}>
                      {DELIVERY_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ═══ PDF / Attach ═══ */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">แนบไฟล์</h4>
                <div className="flex gap-2">
                  <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handlePdfUp(e.target.files[0])} />
                  <button onClick={() => pdfRef.current?.click()} disabled={pdfUp} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs text-muted-foreground hover:text-primary transition-all">
                    {pdfUp ? <Loader2 size={13} className="animate-spin" /> : <FileUp size={13} />} {pdfUp ? "กำลังอัปโหลด..." : "อัปโหลด PDF"}
                  </button>
                  <button onClick={() => setShowDocPick(true)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:border-primary/50 text-xs text-muted-foreground hover:text-primary transition-all">
                    <Paperclip size={13} /> จากคลังเอกสาร
                  </button>
                </div>
                {edit.pdf_url && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/5 border border-green-500/20 text-xs">
                    <FileText size={13} className="text-green-500" />
                    <a href={edit.pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate flex-1">{edit.pdf_url.split("/").pop()}</a>
                    <button onClick={() => setEdit((f) => ({ ...f, pdf_url: "" }))} className="text-muted-foreground hover:text-red-500"><X size={12} /></button>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className={lbl}>หมายเหตุ Admin</label>
                <textarea value={edit.notes} onChange={(e) => setEdit((f) => ({ ...f, notes: e.target.value }))} className={`${inp} resize-none`} rows={2} placeholder="บันทึกภายใน..." />
              </div>

              {/* ═══ Timeline / Conversation ═══ */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">สนทนา / ต่อรอง</h4>
                <QuoteTimeline
                  quoteId={selected.id}
                  quoteNumber={selected.quote_number || ""}
                  currentUserId={user?.id}
                  isAdmin={true}
                  onQuoteUpdated={() => { fetchQuotes(); if (selected) selectQuote(selected); }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <button onClick={handlePrint} className="px-4 py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                  <Printer size={14} /> พิมพ์ใบเสนอราคา
                </button>
                <button onClick={handleApprove} disabled={saving || items.length === 0} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                  อนุมัติ + ส่งราคาให้ลูกค้า
                </button>
              </div>
            </div>
          ) : (
            <div className="card-surface rounded-xl p-10 text-center text-muted-foreground text-sm">
              <Eye size={24} className="mx-auto mb-2 opacity-30" />เลือกใบเสนอราคาเพื่อตรวจสอบ
            </div>
          )}
        </div>
      </div>

      {/* Doc Picker Modal */}
      {showDocPick && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDocPick(false)}>
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <h3 className="text-sm font-bold flex items-center gap-2"><Paperclip size={16} className="text-primary" /> เลือกจากคลังเอกสาร</h3>
              <button onClick={() => setShowDocPick(false)} className="p-1 rounded-lg hover:bg-secondary"><X size={16} /></button>
            </div>
            <div className="p-4 space-y-1">
              {docLib.filter((d) => d.file_url).map((doc) => (
                <button key={doc.id} onClick={() => { setEdit((f) => ({ ...f, pdf_url: doc.file_url })); setShowDocPick(false); toast({ title: `แนบ "${doc.title}"` }); }}
                  className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors flex items-center gap-3">
                  <FileText size={16} className="text-primary shrink-0" />
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{doc.title}</p><p className="text-[11px] text-muted-foreground">{doc.category}</p></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuoteReview;
