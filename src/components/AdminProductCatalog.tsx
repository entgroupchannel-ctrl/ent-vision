import { useState, useEffect } from "react";
import {
  Package, Plus, Search, Edit3, Trash2, Save, X,
  Loader2, RefreshCw, ChevronDown, ChevronUp, Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CatalogProduct {
  id: string;
  model: string;
  name_th: string | null;
  category: string;
  subcategory: string | null;
  base_price: number;
  specs: Record<string, string>;
  configurable_options: any[];
  min_qty: number;
  lead_days: number;
  is_active: boolean;
  notes: string | null;
  created_at: string;
}

const CATEGORIES = [
  "GT Series — Mini PC",
  "GB Series — Compact",
  "EPC Series",
  "EPC Box Series",
  "GK Series — Panel PC",
  "Panel PC GTG/GTY",
  "UTC Series",
  "Smart Display & KIOSK",
  "Rugged Tablet",
  "Rugged Notebook",
  "Rugged Handheld",
  "Volktek Switch",
  "Mini PC Firewall",
  "vCloudPoint",
  "Waterproof PC IP69K",
  "iBox Series",
  "All-in-One PC",
  "อื่นๆ",
];

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const emptyProduct = {
  model: "",
  name_th: "",
  category: "",
  subcategory: "",
  base_price: 0,
  specs_cpu: "",
  specs_ram: "",
  specs_storage: "",
  specs_other: "",
  min_qty: 1,
  lead_days: 7,
  is_active: true,
  notes: "",
};

const AdminProductCatalog = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await (supabase.from as any)("product_catalog")
        .select("*")
        .order("category", { ascending: true })
        .order("model", { ascending: true });
      if (data) setProducts(data);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    if (!form.model || !form.category) {
      toast({ title: "กรุณากรอกรุ่นสินค้าและหมวดหมู่", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const specs: Record<string, string> = {};
      if (form.specs_cpu) specs.cpu = form.specs_cpu;
      if (form.specs_ram) specs.ram = form.specs_ram;
      if (form.specs_storage) specs.storage = form.specs_storage;
      if (form.specs_other) specs.other = form.specs_other;

      const payload = {
        model: form.model,
        name_th: form.name_th || null,
        category: form.category,
        subcategory: form.subcategory || null,
        base_price: form.base_price,
        specs,
        min_qty: form.min_qty,
        lead_days: form.lead_days,
        is_active: form.is_active,
        notes: form.notes || null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error } = await (supabase.from as any)("product_catalog")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast({ title: "อัปเดตสินค้าสำเร็จ" });
      } else {
        const { error } = await (supabase.from as any)("product_catalog")
          .insert(payload);
        if (error) throw error;
        toast({ title: "เพิ่มสินค้าสำเร็จ" });
      }
      setEditingId(null);
      setShowAddForm(false);
      setForm(emptyProduct);
      fetchProducts();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: CatalogProduct) => {
    setEditingId(product.id);
    setShowAddForm(true);
    setForm({
      model: product.model,
      name_th: product.name_th || "",
      category: product.category,
      subcategory: product.subcategory || "",
      base_price: product.base_price,
      specs_cpu: product.specs?.cpu || "",
      specs_ram: product.specs?.ram || "",
      specs_storage: product.specs?.storage || "",
      specs_other: product.specs?.other || "",
      min_qty: product.min_qty,
      lead_days: product.lead_days,
      is_active: product.is_active,
      notes: product.notes || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ลบสินค้านี้?")) return;
    await (supabase.from as any)("product_catalog").delete().eq("id", id);
    toast({ title: "ลบสินค้าแล้ว" });
    fetchProducts();
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyProduct);
  };

  const filtered = products.filter((p) => {
    const matchSearch = !searchQuery ||
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.name_th || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Package size={18} className="text-primary" /> สินค้าทั้งหมด ({products.length})
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={fetchProducts} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
          <button
            onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); setForm(emptyProduct); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Plus size={14} /> เพิ่มสินค้า
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputClass} pl-9`}
            placeholder="ค้นหารุ่น หรือชื่อสินค้า..."
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${inputClass} w-auto max-w-[200px]`}
        >
          <option value="all">ทุกหมวดหมู่</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card-surface rounded-xl p-5 space-y-3 animate-fade-in">
          <h4 className="text-sm font-bold text-foreground">
            {editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">รุ่น (Model) *</label>
              <input value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))} className={inputClass} placeholder="เช่น GT9000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">ชื่อภาษาไทย</label>
              <input value={form.name_th} onChange={(e) => setForm((f) => ({ ...f, name_th: e.target.value }))} className={inputClass} placeholder="มินิพีซี รุ่น..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">หมวดหมู่ *</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputClass}>
                <option value="">เลือกหมวดหมู่</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">ราคาพื้นฐาน (฿) *</label>
              <input type="number" value={form.base_price} onChange={(e) => setForm((f) => ({ ...f, base_price: parseFloat(e.target.value) || 0 }))} className={inputClass} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">สั่งขั้นต่ำ (ชิ้น)</label>
              <input type="number" value={form.min_qty} onChange={(e) => setForm((f) => ({ ...f, min_qty: parseInt(e.target.value) || 1 }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Lead time (วัน)</label>
              <input type="number" value={form.lead_days} onChange={(e) => setForm((f) => ({ ...f, lead_days: parseInt(e.target.value) || 7 }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">CPU</label>
              <input value={form.specs_cpu} onChange={(e) => setForm((f) => ({ ...f, specs_cpu: e.target.value }))} className={inputClass} placeholder="Intel Core i5-1235U" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">RAM</label>
              <input value={form.specs_ram} onChange={(e) => setForm((f) => ({ ...f, specs_ram: e.target.value }))} className={inputClass} placeholder="8GB DDR4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Storage</label>
              <input value={form.specs_storage} onChange={(e) => setForm((f) => ({ ...f, specs_storage: e.target.value }))} className={inputClass} placeholder="256GB SSD" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">หมายเหตุ</label>
              <input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className={inputClass} placeholder="หมายเหตุเพิ่มเติม" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="rounded border-border text-primary w-4 h-4" />
              <span className="text-xs text-muted-foreground">เปิดขาย</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60">
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
              {editingId ? "อัปเดต" : "บันทึก"}
            </button>
            <button onClick={handleCancel} className="px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="card-surface rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            {products.length === 0 ? "ยังไม่มีสินค้าในระบบ" : "ไม่พบสินค้าที่ค้นหา"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">รุ่น</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">หมวดหมู่</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">CPU</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground font-medium">ราคาพื้นฐาน</th>
                  <th className="text-center px-4 py-2.5 text-muted-foreground font-medium">สถานะ</th>
                  <th className="text-center px-4 py-2.5 text-muted-foreground font-medium">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold text-foreground">{p.model}</span>
                      {p.name_th && <span className="block text-xs text-muted-foreground">{p.name_th}</span>}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{p.specs?.cpu || "-"}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-foreground">{formatPrice(p.base_price)}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full border font-medium ${
                        p.is_active ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted text-muted-foreground border-border"
                      }`}>
                        {p.is_active ? "เปิดขาย" : "ปิด"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors">
                          <Edit3 size={12} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductCatalog;
