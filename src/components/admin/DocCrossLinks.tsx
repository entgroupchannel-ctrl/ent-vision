import { useState, useEffect } from "react";
import {
  FileText, Package, CreditCard, Receipt, Truck, DollarSign,
  ExternalLink, Loader2, Link2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RelatedDoc {
  type: "quote" | "order" | "billing" | "invoice" | "delivery" | "payment" | "receipt";
  number: string;
  status: string;
  id: string;
}

const DOC_CFG: Record<string, { label: string; icon: typeof FileText; tab: string; color: string }> = {
  quote: { label: "ใบเสนอราคา", icon: FileText, tab: "quote_review", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  order: { label: "Sales Order", icon: Package, tab: "sales_orders", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  billing: { label: "ใบวางบิล", icon: CreditCard, tab: "billing", color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20" },
  invoice: { label: "ใบแจ้งหนี้", icon: Receipt, tab: "invoices", color: "text-primary bg-primary/10 border-primary/20" },
  delivery: { label: "ใบส่งสินค้า", icon: Truck, tab: "delivery", color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
  payment: { label: "การชำระเงิน", icon: DollarSign, tab: "payments", color: "text-green-500 bg-green-500/10 border-green-500/20" },
  receipt: { label: "ใบเสร็จ", icon: Receipt, tab: "invoices", color: "text-teal-600 bg-teal-500/10 border-teal-500/20" },
};

interface DocCrossLinksProps {
  quoteId?: string | null;
  orderId?: string | null;
  billingId?: string | null;
  invoiceId?: string | null;
  /** Hide these doc types from the links */
  exclude?: string[];
}

const DocCrossLinks = ({ quoteId, orderId, billingId, invoiceId, exclude = [] }: DocCrossLinksProps) => {
  const [docs, setDocs] = useState<RelatedDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelated();
  }, [quoteId, orderId, billingId, invoiceId]);

  const fetchRelated = async () => {
    setLoading(true);
    const results: RelatedDoc[] = [];

    try {
      // Fetch quote
      if (quoteId) {
        const { data } = await supabase
          .from("quote_requests")
          .select("id, quote_number, status")
          .eq("id", quoteId)
          .single();
        if (data) results.push({ type: "quote", number: (data as any).quote_number || "—", status: (data as any).status, id: (data as any).id });
      }

      // Fetch sales order by quote_id or order_id
      const orderQuery = orderId
        ? (supabase.from as any)("sales_orders").select("id, order_number, status").eq("id", orderId)
        : quoteId
        ? (supabase.from as any)("sales_orders").select("id, order_number, status").eq("quote_id", quoteId)
        : null;
      if (orderQuery) {
        const { data } = orderId ? await orderQuery.single() : await orderQuery;
        const items = orderId ? (data ? [data] : []) : (data || []);
        items.forEach((o: any) => results.push({ type: "order", number: o.order_number, status: o.status, id: o.id }));
      }

      // Fetch billing notes
      const billingQuery = billingId
        ? supabase.from("billing_notes").select("id, billing_number, status").eq("id", billingId)
        : quoteId
        ? supabase.from("billing_notes").select("id, billing_number, status").eq("quote_id", quoteId)
        : orderId
        ? supabase.from("billing_notes").select("id, billing_number, status").eq("order_id", orderId)
        : null;
      if (billingQuery) {
        const { data } = await billingQuery;
        (data || []).forEach((b: any) => results.push({ type: "billing", number: b.billing_number, status: b.status, id: b.id }));
      }

      // Fetch invoices
      const invoiceQuery = invoiceId
        ? supabase.from("invoices").select("id, invoice_number, status").eq("id", invoiceId)
        : billingId
        ? supabase.from("invoices").select("id, invoice_number, status").eq("billing_note_id", billingId)
        : quoteId
        ? supabase.from("invoices").select("id, invoice_number, status").eq("quote_id", quoteId)
        : orderId
        ? supabase.from("invoices").select("id, invoice_number, status").eq("order_id", orderId)
        : null;
      if (invoiceQuery) {
        const { data } = await invoiceQuery;
        (data || []).forEach((inv: any) => results.push({ type: "invoice", number: inv.invoice_number, status: inv.status, id: inv.id }));
      }

      // Fetch delivery notes
      const dnQuery = quoteId
        ? (supabase.from as any)("delivery_notes").select("id, delivery_number, status").eq("quote_id", quoteId)
        : orderId
        ? (supabase.from as any)("delivery_notes").select("id, delivery_number, status").eq("order_id", orderId)
        : null;
      if (dnQuery) {
        const { data } = await dnQuery;
        (data || []).forEach((d: any) => results.push({ type: "delivery", number: d.delivery_number, status: d.status, id: d.id }));
      }

      // Fetch payment records
      const payQuery = quoteId
        ? (supabase.from as any)("payment_records").select("id, payment_number, status").eq("quote_id", quoteId)
        : invoiceId
        ? (supabase.from as any)("payment_records").select("id, payment_number, status").eq("invoice_id", invoiceId)
        : billingId
        ? (supabase.from as any)("payment_records").select("id, payment_number, status").eq("billing_note_id", billingId)
        : null;
      if (payQuery) {
        const { data } = await payQuery;
        (data || []).forEach((p: any) => results.push({ type: "payment", number: p.payment_number, status: p.status, id: p.id }));
      }

      // Fetch receipts
      const rcpQuery = invoiceId
        ? supabase.from("receipts").select("id, receipt_number, status").eq("invoice_id", invoiceId)
        : orderId
        ? supabase.from("receipts").select("id, receipt_number, status").eq("order_id", orderId)
        : null;
      if (rcpQuery) {
        const { data } = await rcpQuery;
        (data || []).forEach((r: any) => results.push({ type: "receipt", number: r.receipt_number, status: r.status, id: r.id }));
      }
    } catch {}

    try {
      // De-duplicate by id
      const unique = results.filter((r, i, arr) => arr.findIndex((a) => a.id === r.id) === i);
      setDocs(unique.filter((d) => !exclude.includes(d.type)));
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (doc: RelatedDoc) => {
    const cfg = DOC_CFG[doc.type];
    if (!cfg) return;
    window.dispatchEvent(new CustomEvent("admin-switch-tab", { detail: cfg.tab }));
  };

  if (loading) return <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Loader2 size={10} className="animate-spin" /> โหลดเอกสารที่เกี่ยวข้อง...</div>;
  if (docs.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
        <Link2 size={10} /> เอกสารที่เกี่ยวข้อง
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {docs.map((doc) => {
          const cfg = DOC_CFG[doc.type];
          if (!cfg) return null;
          const Icon = cfg.icon;
          return (
            <button
              key={doc.id}
              onClick={() => handleNavigate(doc)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-medium transition-all hover:ring-1 hover:ring-primary/30 ${cfg.color}`}
              title={`ไปที่ ${cfg.label}: ${doc.number}`}
            >
              <Icon size={10} />
              <span className="font-bold">{doc.number}</span>
              <ExternalLink size={8} className="opacity-50" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DocCrossLinks;
