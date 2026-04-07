import { useState, useEffect } from "react";
import {
  CreditCard, CheckCircle, Clock, Loader2, RefreshCw, Search,
  Upload, Hash, XCircle, DollarSign, Calendar, Building2,
  Receipt, AlertCircle, ExternalLink, FileText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

/* ─── Types ─── */
interface PaymentRecord {
  id: string;
  payment_number: string;
  invoice_id: string | null;
  billing_note_id: string | null;
  quote_id: string | null;
  payment_date: string;
  payment_method: string;
  amount_paid: number;
  bank_name: string | null;
  reference_number: string | null;
  slip_url: string | null;
  status: string;
  confirmed_by: string | null;
  confirmed_at: string | null;
  notes: string | null;
  created_at: string;
}

interface PendingInvoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_company: string | null;
  grand_total: number;
  status: string;
  billing_note_id: string | null;
  quote_id: string | null;
}

/* ─── Constants ─── */
const STATUS_CFG: Record<string, { label: string; color: string }> = {
  pending: { label: "รอยืนยัน", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  confirmed: { label: "ยืนยันแล้ว", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  rejected: { label: "ปฏิเสธ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const PAYMENT_METHODS: Record<string, string> = {
  transfer: "โอนเงิน",
  cash: "เงินสด",
  cheque: "เช็ค",
  credit_card: "บัตรเครดิต",
};

const BANKS = [
  "ธ.กสิกรไทย", "ธ.ไทยพาณิชย์", "ธ.กรุงเทพ", "ธ.กรุงไทย",
  "ธ.กรุงศรี", "ธ.ทหารไทยธนชาต", "ธ.ออมสิน", "อื่นๆ",
];

const fmt = (n: number) => n.toLocaleString("th-TH", { minimumFractionDigits: 2 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

/* ═══════════════════════════════════════════════════ */
const AdminPaymentManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<PendingInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Record payment dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetInvoice, setTargetInvoice] = useState<PendingInvoice | null>(null);
  const [payMethod, setPayMethod] = useState("transfer");
  const [payAmount, setPayAmount] = useState("");
  const [payBank, setPayBank] = useState("");
  const [payRef, setPayRef] = useState("");
  const [payDate, setPayDate] = useState(new Date().toISOString().split("T")[0]);
  const [payNotes, setPayNotes] = useState("");
  const [paySlipFile, setPaySlipFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  /* ─── Fetch ─── */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [payRes, invRes] = await Promise.all([
        supabase.from("payment_records").select("*").order("created_at", { ascending: false }),
        supabase.from("invoices").select("id, invoice_number, customer_name, customer_company, grand_total, status, billing_note_id, quote_id").in("status", ["sent", "draft"]).order("created_at", { ascending: false }),
      ]);
      if (payRes.error) console.error("payment_records error:", payRes.error);
      if (invRes.error) console.error("invoices error:", invRes.error);
      setPayments((payRes.data || []) as any);
      setPendingInvoices((invRes.data || []) as any);
    } catch (err: any) {
      console.error("fetchAll (payments) crashed:", err);
      setPayments([]);
      setPendingInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  /* ─── Open dialog ─── */
  const openRecordPayment = (invoice: PendingInvoice) => {
    setTargetInvoice(invoice);
    setPayAmount(invoice.grand_total.toString());
    setPayMethod("transfer");
    setPayBank("");
    setPayRef("");
    setPayDate(new Date().toISOString().split("T")[0]);
    setPayNotes("");
    setPaySlipFile(null);
    setDialogOpen(true);
  };

  /* ─── Save Payment ─── */
  const handleSavePayment = async () => {
    if (!targetInvoice || !payAmount) return;
    setSaving(true);

    try {
      // Upload slip if provided
      let slipUrl: string | null = null;
      if (paySlipFile) {
        const ext = paySlipFile.name.split(".").pop();
        const path = `payment-slips/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("documents").upload(path, paySlipFile);
        if (!uploadErr) {
          const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
          slipUrl = urlData.publicUrl;
        }
      }

      // Create payment record
      const { data: payment, error } = await (supabase.from as any)("payment_records").insert({
        invoice_id: targetInvoice.id,
        billing_note_id: targetInvoice.billing_note_id,
        quote_id: targetInvoice.quote_id,
        payment_date: payDate,
        payment_method: payMethod,
        amount_paid: parseFloat(payAmount),
        bank_name: payBank || null,
        reference_number: payRef || null,
        slip_url: slipUrl,
        status: "confirmed",
        confirmed_by: user?.id,
        confirmed_at: new Date().toISOString(),
        notes: payNotes || null,
        created_by: user?.id,
      }).select().single();

      if (error) throw error;

      // Update invoice status → paid
      await (supabase.from as any)("invoices")
        .update({ status: "paid", updated_at: new Date().toISOString() })
        .eq("id", targetInvoice.id);

      // Auto-create receipt
      const { data: receipt } = await (supabase.from as any)("receipts").insert({
        invoice_id: targetInvoice.id,
        quote_id: targetInvoice.quote_id,
        payment_record_id: (payment as any).id,
        billing_note_id: targetInvoice.billing_note_id,
        customer_name: targetInvoice.customer_name,
        customer_company: targetInvoice.customer_company,
        amount_paid: parseFloat(payAmount),
        payment_method: payMethod,
        payment_date: payDate,
        status: "issued",
        created_by: user?.id,
      }).select().single();

      toast({
        title: "บันทึกการชำระเงินสำเร็จ",
        description: `${(payment as any).payment_number} — ฿${fmt(parseFloat(payAmount))} + ออกใบเสร็จ ${(receipt as any)?.receipt_number || ""} แล้ว`,
      });

      setDialogOpen(false);
      fetchAll();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  /* ─── Confirm/Reject pending ─── */
  const updatePaymentStatus = async (id: string, status: string) => {
    const updates: any = { status };
    if (status === "confirmed") {
      updates.confirmed_by = user?.id;
      updates.confirmed_at = new Date().toISOString();
    }
    await (supabase.from as any)("payment_records").update(updates).eq("id", id);
    toast({ title: "อัปเดตสถานะสำเร็จ" });
    fetchAll();
  };

  /* ─── Filter ─── */
  const filtered = payments.filter(p => {
    const matchSearch = !search || p.payment_number.toLowerCase().includes(search.toLowerCase()) || (p.reference_number || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === "pending").length,
    confirmed: payments.filter(p => p.status === "confirmed").length,
    totalAmount: payments.filter(p => p.status === "confirmed").reduce((s, p) => s + p.amount_paid, 0),
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">บันทึกการจ่ายเงิน (Payments)</h2>
          <p className="text-xs text-muted-foreground">บันทึกการชำระเงินจากใบแจ้งหนี้ → ออกใบเสร็จอัตโนมัติ</p>
        </div>
        <button onClick={fetchAll} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
          <RefreshCw size={12} /> รีเฟรช
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "ทั้งหมด", value: stats.total.toString(), color: "text-foreground" },
          { label: "รอยืนยัน", value: stats.pending.toString(), color: "text-yellow-600" },
          { label: "ยืนยันแล้ว", value: stats.confirmed.toString(), color: "text-green-500" },
          { label: "ยอดรับชำระ", value: `฿${fmt(stats.totalAmount)}`, color: "text-primary" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending Invoices — Quick Record */}
      {pendingInvoices.length > 0 && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
          <h3 className="text-sm font-bold text-yellow-600 mb-2 flex items-center gap-1">
            <AlertCircle size={14} /> ใบแจ้งหนี้ที่รอชำระ ({pendingInvoices.length})
          </h3>
          <div className="space-y-2">
            {pendingInvoices.slice(0, 5).map(inv => (
              <div key={inv.id} className="flex items-center justify-between bg-card rounded-lg p-2.5 border border-border">
                <div className="text-xs">
                  <span className="font-bold">{inv.invoice_number}</span>
                  <span className="text-muted-foreground ml-2">{inv.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">฿{fmt(inv.grand_total)}</span>
                  <button onClick={() => openRecordPayment(inv)}
                    className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold hover:bg-green-500/20">
                    <CreditCard size={10} className="inline mr-1" />บันทึกจ่ายเงิน
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาเลขที่ / Ref..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
          <option value="all">ทุกสถานะ</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
        </select>
      </div>

      {/* Payment List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" /> กำลังโหลด...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">ไม่พบรายการจ่ายเงิน</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(p => {
            const st = STATUS_CFG[p.status] || STATUS_CFG.pending;
            return (
              <div key={p.id} className="border border-border rounded-xl p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.color}`}>{st.label}</div>
                    <div>
                      <div className="font-bold text-sm">{p.payment_number}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {PAYMENT_METHODS[p.payment_method] || p.payment_method}
                        {p.bank_name ? ` · ${p.bank_name}` : ""}
                        {p.reference_number ? ` · Ref: ${p.reference_number}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-500">฿{fmt(p.amount_paid)}</div>
                    <div className="text-[10px] text-muted-foreground">{fmtDate(p.payment_date)}</div>
                  </div>
                </div>
                {p.slip_url && (
                  <div className="mt-2">
                    <a href={p.slip_url} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-primary hover:underline flex items-center gap-1">
                      <ExternalLink size={10} /> ดู Pay-in Slip
                    </a>
                  </div>
                )}
                {p.status === "pending" && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => updatePaymentStatus(p.id, "confirmed")}
                      className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold hover:bg-green-500/20">
                      <CheckCircle size={10} className="inline mr-1" />ยืนยัน
                    </button>
                    <button onClick={() => updatePaymentStatus(p.id, "rejected")}
                      className="px-2.5 py-1 rounded-lg text-[10px] text-muted-foreground hover:text-red-400">
                      <XCircle size={10} className="inline mr-1" />ปฏิเสธ
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Dialog */}
      {dialogOpen && targetInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setDialogOpen(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-1">บันทึกการจ่ายเงิน</h3>
            <p className="text-xs text-muted-foreground mb-4">
              {targetInvoice.invoice_number} — {targetInvoice.customer_name} — ฿{fmt(targetInvoice.grand_total)}
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">วิธีชำระ *</label>
                  <select value={payMethod} onChange={e => setPayMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                    {Object.entries(PAYMENT_METHODS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">จำนวนเงิน *</label>
                  <input type="number" step="0.01" value={payAmount} onChange={e => setPayAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                </div>
              </div>

              {payMethod === "transfer" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">ธนาคาร</label>
                    <select value={payBank} onChange={e => setPayBank(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                      <option value="">— เลือก —</option>
                      {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">เลขอ้างอิง</label>
                    <input value={payRef} onChange={e => setPayRef(e.target.value)} placeholder="Ref / เลขที่โอน"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">วันที่ชำระ</label>
                <input type="date" value={payDate} onChange={e => setPayDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">แนบ Pay-in Slip</label>
                <input type="file" accept="image/*,.pdf" onChange={e => setPaySlipFile(e.target.files?.[0] || null)}
                  className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border file:border-border file:text-xs file:bg-accent file:text-foreground" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">หมายเหตุ</label>
                <textarea value={payNotes} onChange={e => setPayNotes(e.target.value)} rows={2} placeholder="หมายเหตุเพิ่มเติม..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none" />
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-xs text-green-600">
                <Receipt size={12} className="inline mr-1" />
                เมื่อบันทึกสำเร็จ ระบบจะออกใบเสร็จรับเงินให้อัตโนมัติ
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={handleSavePayment} disabled={saving || !payAmount}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 disabled:opacity-40 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                  {saving ? "กำลังบันทึก..." : "ยืนยันรับชำระเงิน + ออกใบเสร็จ"}
                </button>
                <button onClick={() => setDialogOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-border text-sm hover:bg-accent">
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentManager;
