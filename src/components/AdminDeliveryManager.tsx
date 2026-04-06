import { useState, useEffect } from "react";
import {
  Truck, Package, CheckCircle, Clock, Loader2, RefreshCw, Search,
  Eye, MapPin, Hash, AlertCircle, XCircle, Send, Calendar,
  Building2, Phone, Printer, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

/* ─── Types ─── */
interface DeliveryNote {
  id: string;
  delivery_number: string;
  invoice_id: string | null;
  billing_note_id: string | null;
  quote_id: string | null;
  order_id: string | null;
  customer_name: string;
  customer_company: string | null;
  customer_address: string | null;
  customer_phone: string | null;
  delivery_address: string | null;
  delivery_date: string;
  courier: string | null;
  tracking_number: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

interface DeliveryItem {
  id: string;
  model: string;
  description: string | null;
  qty: number;
  serial_numbers: string[] | null;
  sort_order: number;
}

/* ─── Status Config ─── */
const STATUS_CFG: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  preparing: { label: "กำลังจัดเตรียม", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Package },
  shipped: { label: "จัดส่งแล้ว", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Truck },
  delivered: { label: "ส่งมอบแล้ว", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle },
};

const COURIERS = [
  "Kerry Express", "Flash Express", "J&T Express", "Thailand Post (EMS)",
  "DHL Express", "Ninja Van", "BEST Express", "จัดส่งเอง", "อื่นๆ",
];

const fmtDate = (d: string) => new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

/* ═══════════════════════════════════════════════════ */
const AdminDeliveryManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [deliveries, setDeliveries] = useState<DeliveryNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryNote | null>(null);
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([]);

  // Ship dialog
  const [shipDialogOpen, setShipDialogOpen] = useState(false);
  const [shipCourier, setShipCourier] = useState("");
  const [shipTracking, setShipTracking] = useState("");
  const [shipTarget, setShipTarget] = useState<DeliveryNote | null>(null);

  /* ─── Fetch ─── */
  const fetchDeliveries = async () => {
    setLoading(true);
    const { data } = await supabase.from("delivery_notes").select("*").order("created_at", { ascending: false });
    if (data) setDeliveries(data as any);
    setLoading(false);
  };

  useEffect(() => { fetchDeliveries(); }, []);

  const fetchItems = async (deliveryId: string) => {
    const { data } = await supabase.from("delivery_note_items").select("*").eq("delivery_note_id", deliveryId).order("sort_order");
    setDeliveryItems((data as any) || []);
  };

  /* ─── Mark Shipped ─── */
  const handleShip = async () => {
    if (!shipTarget || !shipCourier) return;
    const { error } = await (supabase.from as any)("delivery_notes").update({
      status: "shipped",
      courier: shipCourier,
      tracking_number: shipTracking || null,
      updated_at: new Date().toISOString(),
    }).eq("id", shipTarget.id);

    if (error) {
      toast({ title: "เกิดข้อผิดพลาด", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "บันทึกการจัดส่งสำเร็จ", description: `${shipTarget.delivery_number} — ${shipCourier}${shipTracking ? ` (${shipTracking})` : ""}` });
      setShipDialogOpen(false);
      setShipCourier("");
      setShipTracking("");
      setShipTarget(null);
      fetchDeliveries();
    }
  };

  /* ─── Mark Delivered ─── */
  const markDelivered = async (id: string) => {
    const { error } = await (supabase.from as any)("delivery_notes").update({
      status: "delivered",
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (!error) { toast({ title: "บันทึกส่งมอบสำเร็จ" }); fetchDeliveries(); }
  };

  /* ─── Filter ─── */
  const filtered = deliveries.filter(d => {
    const matchSearch = !search || d.delivery_number.toLowerCase().includes(search.toLowerCase()) || d.customer_name.toLowerCase().includes(search.toLowerCase()) || (d.tracking_number || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: deliveries.length,
    preparing: deliveries.filter(d => d.status === "preparing").length,
    shipped: deliveries.filter(d => d.status === "shipped").length,
    delivered: deliveries.filter(d => d.status === "delivered").length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">ใบส่งสินค้า (Delivery Notes)</h2>
          <p className="text-xs text-muted-foreground">ติดตามการจัดส่ง — สร้างจากใบแจ้งหนี้</p>
        </div>
        <button onClick={fetchDeliveries} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
          <RefreshCw size={12} /> รีเฟรช
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "ทั้งหมด", value: stats.total, color: "text-foreground" },
          { label: "กำลังจัดเตรียม", value: stats.preparing, color: "text-yellow-600" },
          { label: "จัดส่งแล้ว", value: stats.shipped, color: "text-blue-500" },
          { label: "ส่งมอบแล้ว", value: stats.delivered, color: "text-green-500" },
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ค้นหาเลขที่ / ลูกค้า / tracking..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
          <option value="all">ทุกสถานะ</option>
          {Object.entries(STATUS_CFG).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" /> กำลังโหลด...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">ไม่พบใบส่งสินค้า</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(d => {
            const st = STATUS_CFG[d.status] || STATUS_CFG.preparing;
            const isSelected = selectedDelivery?.id === d.id;
            return (
              <div key={d.id} className="border border-border rounded-xl overflow-hidden bg-card">
                <div className="p-4 cursor-pointer hover:bg-accent/30 transition-colors" onClick={() => {
                  if (isSelected) { setSelectedDelivery(null); setDeliveryItems([]); }
                  else { setSelectedDelivery(d); fetchItems(d.id); }
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.color}`}>{st.label}</div>
                      <div>
                        <div className="font-bold text-sm text-foreground">{d.delivery_number}</div>
                        <div className="text-xs text-muted-foreground">{d.customer_name}{d.customer_company ? ` · ${d.customer_company}` : ""}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div>{fmtDate(d.delivery_date)}</div>
                      {d.tracking_number && (
                        <div className="font-medium text-foreground mt-0.5">
                          <Truck size={10} className="inline mr-1" />{d.courier}: {d.tracking_number}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="border-t border-border p-4 bg-accent/5 space-y-4">
                    {/* Delivery Info */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        {d.delivery_address && <div className="flex items-start gap-1"><MapPin size={11} className="mt-0.5 shrink-0" /><span>{d.delivery_address}</span></div>}
                        {d.customer_phone && <div className="flex items-center gap-1"><Phone size={11} />{d.customer_phone}</div>}
                      </div>
                      <div className="space-y-1">
                        {d.courier && <div>ขนส่ง: <span className="font-medium">{d.courier}</span></div>}
                        {d.tracking_number && <div>Tracking: <span className="font-medium">{d.tracking_number}</span></div>}
                        {d.notes && <div className="text-muted-foreground">{d.notes}</div>}
                      </div>
                    </div>

                    {/* Items */}
                    {deliveryItems.length > 0 && (
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground">
                            <th className="text-left py-1">#</th>
                            <th className="text-left py-1">รายการ</th>
                            <th className="text-right py-1">จำนวน</th>
                            <th className="text-left py-1">Serial No.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deliveryItems.map((item, i) => (
                            <tr key={item.id} className="border-b border-border/50">
                              <td className="py-1.5 text-muted-foreground">{i + 1}</td>
                              <td className="py-1.5">
                                <div className="font-medium">{item.model}</div>
                                {item.description && <div className="text-muted-foreground">{item.description}</div>}
                              </td>
                              <td className="py-1.5 text-right">{item.qty}</td>
                              <td className="py-1.5 text-muted-foreground">{item.serial_numbers?.join(", ") || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                      {d.status === "preparing" && (
                        <button onClick={() => { setShipTarget(d); setShipDialogOpen(true); }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-medium hover:bg-blue-500/20">
                          <Truck size={12} /> บันทึกจัดส่ง
                        </button>
                      )}
                      {d.status === "shipped" && (
                        <button onClick={() => markDelivered(d.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-xs font-medium hover:bg-green-500/20">
                          <CheckCircle size={12} /> ยืนยันส่งมอบแล้ว
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

      {/* Ship Dialog */}
      {shipDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShipDialogOpen(false)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">บันทึกการจัดส่ง — {shipTarget?.delivery_number}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">บริษัทขนส่ง *</label>
                <select value={shipCourier} onChange={e => setShipCourier(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm">
                  <option value="">— เลือกบริษัทขนส่ง —</option>
                  {COURIERS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Tracking Number</label>
                <input value={shipTracking} onChange={e => setShipTracking(e.target.value)}
                  placeholder="เลข tracking (ถ้ามี)"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleShip} disabled={!shipCourier}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 disabled:opacity-40">
                  ยืนยันจัดส่ง
                </button>
                <button onClick={() => setShipDialogOpen(false)}
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

export default AdminDeliveryManager;
