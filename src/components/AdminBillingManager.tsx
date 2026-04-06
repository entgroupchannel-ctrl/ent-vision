import { useState, useEffect } from "react";
import {
  FileText, Send, CheckCircle, Clock, Loader2, RefreshCw, Search,
  Eye, ChevronDown, Building2, Phone, Mail, Hash, ArrowRight,
  AlertCircle, XCircle, CreditCard, Receipt, Printer, Calendar,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

/* ─── Types ─── */
interface BillingNote {
  id: string;
  billing_number: string;
  quote_id: string | null;
  order_id: string | null;
  customer_name: string;
  customer_company: string | null;
  customer_address: string | null;
  customer_tax_id: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  po_number: string | null;
  subtotal: number;
  discount_amount: number;
  vat_amount: number;
  withholding_tax: number;
  grand_total: number;
  billing_date: string;
  due_date: string | null;
  payment_terms: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

interface BillingItem {
  id: string;
  model: string;
  category: string | null;
  description: string | null;
  qty: number;
  unit_price: number;
  discount_percent: number;
  line_total: number;
  sort_order: number;
}

/* ─── Status Config ─── */
const STATUS_CFG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  draft: { label: "ร่าง", color: "bg-muted text-muted-foreground border-border", icon: Clock },
  sent: { label: "ส่งแล้ว", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Send },
  invoiced: { label: "สร้างใบแจ้งหนี้แล้ว", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle },
  cancelled: { label: "ยกเลิก", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
};

const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

/* ═══════════════════════════════════════════════════ */
const AdminBillingManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [billings, setBillings] = useState<BillingNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBilling, setSelectedBilling] = useState<BillingNote | null>(null);
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);

  /* ─── Fetch ─── */
  const fetchBillings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("billing_notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBillings(data as any);
    if (error) console.error(error);
    setLoading(false);
  };

  useEffect(() => { fetchBillings(); }, []);

  const fetchBillingItems = async (billingId: string) => {
    const { data } = await supabase
      .from("billing_note_items")
      .select("*")
      .eq("billing_note_id", billingId)
      .order("sort_order");
    setBillingItems((data as any) || []);
  };

  /* ─── Create Invoice from Billing ─── */
  const createInvoiceFromBilling = async (billing: BillingNote) => {
    try {
      // Fetch billing items
      const { data: items } = await supabase
        .from("billing_note_items")
        .select("*")
        .eq("billing_note_id", billing.id)
        .order("sort_order");

      // Create invoice
      const { data: inv, error } = await (supabase.from as any)("invoices").insert({
        quote_id: billing.quote_id,
        order_id: billing.order_id,
        billing_note_id: billing.id,
        customer_name: billing.customer_name,
        customer_company: billing.customer_company,
        customer_address: billing.customer_address,
        customer_tax_id: billing.customer_tax_id,
        customer_email: billing.customer_email,
        customer_phone: billing.customer_phone,
        subtotal: billing.subtotal,
        discount_amount: billing.discount_amount,
        vat_amount: billing.vat_amount,
        withholding_tax: billing.withholding_tax,
        grand_total: billing.grand_total,
        payment_terms: billing.payment_terms,
        due_date: billing.due_date,
        created_by: user?.id,
      }).select().single();

      if (error) throw error;

      // Copy items
      if (inv && items && items.length > 0) {
        const invoiceItems = (items as any[]).map((bi: any) => ({
          invoice_id: (inv as any).id,
          product_id: bi.product_id,
          model: bi.model,
          category: bi.category,
          description: bi.description,
          qty: bi.qty,
          unit_price: bi.unit_price,
          discount_percent: bi.discount_percent,
          line_total: bi.line_total,
          sort_order: bi.sort_order,
        }));
        await (supabase.from as any)("invoice_items").insert(invoiceItems);
      }

      // Update billing status
      await (supabase.from as any)("billing_notes")
        .update({ status: "invoiced", updated_at: new Date().toISOString() })
        .eq("id", billing.id);

      toast({ title: "สร้างใบแจ้งหนี้สำเร็จ", description: `เลขที่ ${(inv as any).invoice_number}` });
      fetchBillings();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    }
  };

  /* ─── Update Status ─── */
  const updateStatus = async (id: string, status: string) => {
    const { error } = await (supabase.from as any)("billing_notes")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "อัปเดตสถานะสำเร็จ" }); fetchBillings(); }
  };

  /* ─── Filter ─── */
  const filtered = billings.filter(b => {
    const matchSearch = !search || b.billing_number.toLowerCase().includes(search.toLowerCase()) || b.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  /* ─── Stats ─── */
  const stats = {
    total: billings.length,
    draft: billings.filter(b => b.status === "draft").length,
    sent: billings.filter(b => b.status === "sent").length,
    invoiced: billings.filter(b => b.status === "invoiced").length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">ใบวางบิล (Billing Notes)</h2>
          <p className="text-xs text-muted-foreground">สร้างอัตโนมัติเมื่ออนุมัติ PO — สร้างใบแจ้งหนี้จากใบวางบิล</p>
        </div>
        <button onClick={fetchBillings} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
          <RefreshCw size={12} /> รีเฟรช
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "ทั้งหมด", value: stats.total, color: "text-foreground" },
          { label: "ร่าง", value: stats.draft, color: "text-muted-foreground" },
          { label: "ส่งแล้ว", value: stats.sent, color: "text-blue-500" },
          { label: "สร้าง Invoice แล้ว", value: stats.invoiced, color: "text-green-500" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาเลขที่ / ชื่อลูกค้า..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
        >
          <option value="all">ทุกสถานะ</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" /> กำลังโหลด...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">ไม่พบใบวางบิล</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => {
            const st = STATUS_CFG[b.status] || STATUS_CFG.draft;
            const isSelected = selectedBilling?.id === b.id;
            return (
              <div key={b.id} className="border border-border rounded-xl overflow-hidden bg-card">
                {/* Row */}
                <div
                  className="p-4 cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    if (isSelected) { setSelectedBilling(null); setBillingItems([]); }
                    else { setSelectedBilling(b); fetchBillingItems(b.id); }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.color}`}>
                        {st.label}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{b.billing_number}</div>
                        <div className="text-xs text-muted-foreground">{b.customer_name}{b.customer_company ? ` · ${b.customer_company}` : ""}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">฿{fmt(b.grand_total)}</div>
                      <div className="text-[10px] text-muted-foreground">{fmtDate(b.created_at)}</div>
                    </div>
                  </div>
                  {b.po_number && (
                    <div className="mt-2 text-[10px] text-muted-foreground">
                      <Hash size={10} className="inline mr-1" />PO: {b.po_number}
                    </div>
                  )}
                </div>

                {/* Expanded Detail */}
                {isSelected && (
                  <div className="border-t border-border p-4 bg-accent/5 space-y-4">
                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-muted-foreground mb-1 font-medium">ข้อมูลลูกค้า</div>
                        <div className="space-y-1">
                          {b.customer_company && <div className="flex items-center gap-1"><Building2 size={11} />{b.customer_company}</div>}
                          {b.customer_email && <div className="flex items-center gap-1"><Mail size={11} />{b.customer_email}</div>}
                          {b.customer_phone && <div className="flex items-center gap-1"><Phone size={11} />{b.customer_phone}</div>}
                          {b.customer_tax_id && <div className="flex items-center gap-1"><Hash size={11} />Tax: {b.customer_tax_id}</div>}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1 font-medium">รายละเอียด</div>
                        <div className="space-y-1">
                          <div>วันที่วางบิล: {fmtDate(b.billing_date)}</div>
                          {b.due_date && <div>ครบกำหนด: {fmtDate(b.due_date)}</div>}
                          {b.payment_terms && <div>เงื่อนไข: {b.payment_terms}</div>}
                        </div>
                      </div>
                    </div>

                    {/* Items Table */}
                    {billingItems.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">รายการสินค้า ({billingItems.length})</div>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-border text-muted-foreground">
                              <th className="text-left py-1 pr-2">#</th>
                              <th className="text-left py-1">รายการ</th>
                              <th className="text-right py-1">จำนวน</th>
                              <th className="text-right py-1">ราคา</th>
                              <th className="text-right py-1">รวม</th>
                            </tr>
                          </thead>
                          <tbody>
                            {billingItems.map((item, i) => (
                              <tr key={item.id} className="border-b border-border/50">
                                <td className="py-1.5 pr-2 text-muted-foreground">{i + 1}</td>
                                <td className="py-1.5">
                                  <div className="font-medium">{item.model}</div>
                                  {item.description && item.description !== item.model && (
                                    <div className="text-muted-foreground">{item.description}</div>
                                  )}
                                </td>
                                <td className="py-1.5 text-right">{item.qty}</td>
                                <td className="py-1.5 text-right">{fmt(item.unit_price)}</td>
                                <td className="py-1.5 text-right font-medium">{fmt(item.line_total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Totals */}
                        <div className="mt-3 flex justify-end">
                          <div className="w-48 space-y-1 text-xs">
                            <div className="flex justify-between"><span className="text-muted-foreground">รวม</span><span>{fmt(b.subtotal)}</span></div>
                            {b.discount_amount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">ส่วนลด</span><span className="text-red-400">-{fmt(b.discount_amount)}</span></div>}
                            {b.vat_amount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">VAT 7%</span><span>{fmt(b.vat_amount)}</span></div>}
                            {b.withholding_tax > 0 && <div className="flex justify-between"><span className="text-muted-foreground">หัก ณ ที่จ่าย</span><span className="text-red-400">-{fmt(b.withholding_tax)}</span></div>}
                            <div className="flex justify-between font-bold border-t border-border pt-1"><span>รวมทั้งสิ้น</span><span>฿{fmt(b.grand_total)}</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                      {b.status === "draft" && (
                        <button onClick={() => updateStatus(b.id, "sent")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-medium hover:bg-blue-500/20">
                          <Send size={12} /> ส่งใบวางบิล
                        </button>
                      )}
                      {(b.status === "draft" || b.status === "sent") && (
                        <button onClick={() => createInvoiceFromBilling(b)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20">
                          <ArrowRight size={12} /> สร้างใบแจ้งหนี้จากใบวางบิลนี้
                        </button>
                      )}
                      {b.status !== "cancelled" && b.status !== "invoiced" && (
                        <button onClick={() => updateStatus(b.id, "cancelled")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-red-400">
                          <XCircle size={12} /> ยกเลิก
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBillingManager;
