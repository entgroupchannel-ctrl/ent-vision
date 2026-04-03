import { useState, useRef, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Send, ShoppingCart, Plus, Trash2, FileText,
  Camera, Sparkles, Minus, Loader2,
} from "lucide-react";
import FooterCompact from "@/components/FooterCompact";

/* ───── Constants ───── */

const productCategories = [
  "เลือกหมวดหมู่",
  "GT Series — Mini PC",
  "GB Series — Compact",
  "EPC Series",
  "EPC Box Series",
  "GK Series — Panel PC",
  "Panel PC GTG/GTY",
  "UTC Series",
  "Smart Display & KIOSK",
  "Rugged Tablet / Notebook",
  "Volktek Switch",
  "Mini PC Firewall",
  "vCloudPoint",
  "Waterproof PC IP69K",
  "อื่นๆ",
];

const callbackTimes = [
  "เลือก",
  "เช้า (9:00-12:00)",
  "บ่าย (13:00-16:00)",
  "เย็น (16:00-18:00)",
  "เวลาใดก็ได้",
];

type ProductItem = { category: string; model: string; qty: number };

/* ───── Helpers ───── */

function guessCategory(product: string): string {
  const p = product.toLowerCase();
  if (p.startsWith("gt")) return "GT Series — Mini PC";
  if (p.startsWith("gb")) return "GB Series — Compact";
  if (p.startsWith("epc") && p.includes("box")) return "EPC Box Series";
  if (p.startsWith("epc")) return "EPC Series";
  if (p.startsWith("gk")) return "GK Series — Panel PC";
  if (p.startsWith("gtg") || p.startsWith("gty")) return "Panel PC GTG/GTY";
  if (p.startsWith("utc")) return "UTC Series";
  if (p.includes("volktek")) return "Volktek Switch";
  if (p.includes("firewall")) return "Mini PC Firewall";
  if (p.includes("vcloud")) return "vCloudPoint";
  if (p.includes("waterproof") || p.includes("ip69")) return "Waterproof PC IP69K";
  if (p.includes("rugged")) return "Rugged Tablet / Notebook";
  if (p.includes("kiosk") || p.includes("display")) return "Smart Display & KIOSK";
  return "";
}

/* ───── Sub‑components ───── */

const ProductRow = ({
  product, index, total, onChange, onRemove,
}: {
  product: ProductItem; index: number; total: number;
  onChange: (i: number, f: keyof ProductItem, v: string | number) => void;
  onRemove: (i: number) => void;
}) => (
  <div className="flex gap-3 items-center group">
    <span className="w-5 text-xs text-muted-foreground/60 text-right shrink-0">{index + 1}.</span>
    <div className="flex-1 grid sm:grid-cols-[1fr_1fr_100px] gap-3">
      <select
        value={product.category}
        onChange={(e) => onChange(index, "category", e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      >
        {productCategories.map((c) => (
          <option key={c} value={c === "เลือกหมวดหมู่" ? "" : c}>{c}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="รุ่น / Model"
        value={product.model}
        onChange={(e) => onChange(index, "model", e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      />
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onChange(index, "qty", Math.max(1, product.qty - 1))}
          className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors">
          <Minus size={14} />
        </button>
        <input
          type="number" min="1" value={product.qty}
          onChange={(e) => onChange(index, "qty", Math.max(1, parseInt(e.target.value) || 1))}
          className="w-12 text-center px-1 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none"
        />
        <button type="button" onClick={() => onChange(index, "qty", product.qty + 1)}
          className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-colors">
          <Plus size={14} />
        </button>
      </div>
    </div>
    {total > 1 && (
      <button type="button" onClick={() => onRemove(index)}
        className="text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
        <Trash2 size={15} />
      </button>
    )}
  </div>
);

const BusinessCardScanner = ({
  onScan,
}: {
  onScan: (data: Record<string, string>) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setScanning(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      setPreview(base64);

      const { data, error } = await supabase.functions.invoke("scan-business-card", {
        body: { image: base64 },
      });

      if (error) throw error;
      if (data?.data) onScan(data.data);
    } catch (err) {
      console.error("Scan error:", err);
    } finally {
      setScanning(false);
    }
  }, [onScan]);

  return (
    <div className="card-surface rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-primary" />
        <h2 className="text-base font-bold text-foreground">AI สแกนนามบัตร</h2>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">AI</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        อัปโหลดรูปนามบัตร — ระบบ AI จะอ่านและกรอกข้อมูลให้อัตโนมัติทันที
      </p>

      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={scanning}
          className="w-32 h-24 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 flex flex-col items-center justify-center gap-1.5 text-primary/60 hover:text-primary transition-all shrink-0"
        >
          {scanning ? <Loader2 size={22} className="animate-spin" /> : <Camera size={22} />}
          <span className="text-[11px] font-medium">{scanning ? "กำลังสแกน..." : "อัปโหลดนามบัตร"}</span>
        </button>

        {preview && (
          <img src={preview} alt="business card preview" className="h-24 rounded-lg object-cover border border-border" />
        )}
      </div>
    </div>
  );
};

/* ───── Main Page ───── */

const QuoteRequest = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";
  const prefilledCategory = searchParams.get("category") || guessCategory(prefilledProduct);

  const [products, setProducts] = useState<ProductItem[]>([
    {
      category: prefilledCategory,
      model: prefilledProduct,
      qty: 1,
    },
  ]);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    lineId: "", whatsapp: "", callbackTime: "", details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index: number, field: keyof ProductItem, value: string | number) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const addProduct = () => setProducts([...products, { category: "", model: "", qty: 1 }]);
  const removeProduct = (i: number) => products.length > 1 && setProducts(products.filter((_, idx) => idx !== i));

  const handleCardScan = useCallback((data: Record<string, string>) => {
    setForm((prev) => ({
      ...prev,
      name: data.name || prev.name,
      email: data.email || prev.email,
      phone: data.phone || prev.phone,
      company: data.company || prev.company,
      lineId: data.lineId || prev.lineId,
      whatsapp: data.whatsapp || prev.whatsapp,
    }));
    toast({ title: "สแกนสำเร็จ!", description: "กรอกข้อมูลจากนามบัตรเรียบร้อย" });
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await (supabase.from as any)("quote_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        line_id: form.lineId || null,
        whatsapp: form.whatsapp || null,
        callback_time: form.callbackTime || null,
        products: products.filter((p) => p.category || p.model),
        details: form.details || null,
      });
      if (error) throw error;
      setSubmitted(true);
      toast({ title: "ส่งคำขอเรียบร้อย!", description: "ทีมฝ่ายขายจะติดต่อกลับภายใน 24 ชม." });
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-primary mb-6 hover:underline">
            <ArrowLeft size={12} /> กลับหน้าหลัก
          </Link>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
            ขอใบเสนอ<span className="text-gradient">ราคา</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            เลือกสินค้าและจำนวน หรือแจ้งรายละเอียดที่ต้องการ
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-16 md:pb-24 px-4">
        <div className="container max-w-3xl mx-auto">
          {submitted ? (
            <SuccessState onReset={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", phone: "", company: "", lineId: "", whatsapp: "", callbackTime: "", details: "" });
              setProducts([{ category: "", model: "", qty: 1 }]);
            }} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div className="card-surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart size={18} className="text-primary" />
                  <h2 className="text-base font-bold text-foreground">เลือกสินค้า</h2>
                </div>
                <div className="space-y-3">
                  {products.map((product, index) => (
                    <ProductRow key={index} product={product} index={index} total={products.length}
                      onChange={handleProductChange} onRemove={removeProduct} />
                  ))}
                </div>
                <button type="button" onClick={addProduct}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium">
                  <Plus size={14} /> เพิ่มสินค้า
                </button>
              </div>

              {/* Business Card Scanner */}
              <BusinessCardScanner onScan={handleCardScan} />

              {/* Contact Info */}
              <div className="card-surface rounded-xl p-6">
                <h2 className="text-base font-bold text-foreground mb-4">ข้อมูลติดต่อ</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">ชื่อ <span className="text-destructive">*</span></label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="ชื่อ-นามสกุล" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">อีเมล <span className="text-destructive">*</span></label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@company.com" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">โทรศัพท์</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="08x-xxx-xxxx" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">บริษัท</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="ชื่อบริษัท / หน่วยงาน" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">LINE ID</label>
                      <input type="text" name="lineId" value={form.lineId} onChange={handleChange} placeholder="@lineid" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">WhatsApp</label>
                      <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+66..." className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">เวลาที่สะดวกให้ติดต่อกลับ</label>
                    <select name="callbackTime" value={form.callbackTime} onChange={handleChange} className={inputClass}>
                      {callbackTimes.map((t) => (
                        <option key={t} value={t === "เลือก" ? "" : t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">รายละเอียดเพิ่มเติม</label>
                    <textarea name="details" rows={4} value={form.details} onChange={handleChange}
                      placeholder="สเปกที่ต้องการ, งบประมาณ, กำหนดส่ง, หรือคำถามเพิ่มเติม..."
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {loading ? "กำลังส่ง..." : "ส่งคำขอใบเสนอราคา"}
              </button>
            </form>
          )}
        </div>
      </section>

      <FooterCompact />
    </div>
  );
};

/* ───── Success State ───── */

const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <div className="card-surface rounded-xl p-8 text-center">
    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
      <FileText size={24} className="text-primary" />
    </div>
    <h3 className="text-lg font-bold text-foreground mb-2">ส่งคำขอเรียบร้อย!</h3>
    <p className="text-sm text-muted-foreground mb-4">
      ทีมฝ่ายขายจะจัดทำใบเสนอราคาและติดต่อกลับภายใน 24 ชั่วโมง
    </p>
    <button onClick={onReset} className="text-sm text-primary hover:underline">
      ส่งคำขออีกครั้ง
    </button>
  </div>
);

export default QuoteRequest;
