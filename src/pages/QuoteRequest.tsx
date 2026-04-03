import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Send, ShoppingCart, Plus, Trash2, FileText,
} from "lucide-react";
import FooterCompact from "@/components/FooterCompact";

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

type ProductItem = {
  category: string;
  model: string;
  qty: string;
};

const QuoteRequest = () => {
  const [products, setProducts] = useState<ProductItem[]>([
    { category: "", model: "", qty: "1" },
  ]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    lineId: "",
    whatsapp: "",
    callbackTime: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index: number, field: keyof ProductItem, value: string) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { category: "", model: "", qty: "1" }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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
        products: products.filter(p => p.category),
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
            <div className="card-surface rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">ส่งคำขอเรียบร้อย!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ทีมฝ่ายขายจะจัดทำใบเสนอราคาและติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", phone: "", company: "", lineId: "", whatsapp: "", callbackTime: "", details: "" });
                  setProducts([{ category: "", model: "", qty: "1" }]);
                }}
                className="text-sm text-primary hover:underline"
              >
                ส่งคำขออีกครั้ง
              </button>
            </div>
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
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1 grid sm:grid-cols-3 gap-3">
                        <select
                          value={product.category}
                          onChange={(e) => handleProductChange(index, "category", e.target.value)}
                          className={inputClass}
                        >
                          {productCategories.map((c) => (
                            <option key={c} value={c === "เลือกหมวดหมู่" ? "" : c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="รุ่น / Model (ถ้าทราบ)"
                          value={product.model}
                          onChange={(e) => handleProductChange(index, "model", e.target.value)}
                          className={inputClass}
                        />
                        <input
                          type="number"
                          min="1"
                          placeholder="จำนวน"
                          value={product.qty}
                          onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      {products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="mt-2.5 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addProduct}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                >
                  <Plus size={14} /> เพิ่มสินค้า
                </button>
              </div>

              {/* Contact Info */}
              <div className="card-surface rounded-xl p-6">
                <h2 className="text-base font-bold text-foreground mb-4">ข้อมูลติดต่อ</h2>

                <div className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        ชื่อ <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="ชื่อ-นามสกุล"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        อีเมล <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">โทรศัพท์</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="08x-xxx-xxxx"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">บริษัท</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="ชื่อบริษัท / หน่วยงาน"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* LINE ID + WhatsApp */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">LINE ID</label>
                      <input
                        type="text"
                        name="lineId"
                        value={form.lineId}
                        onChange={handleChange}
                        placeholder="@lineid"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">WhatsApp</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="+66..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Callback time */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      เวลาที่สะดวกให้ติดต่อกลับ
                    </label>
                    <select
                      name="callbackTime"
                      value={form.callbackTime}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {callbackTimes.map((t) => (
                        <option key={t} value={t === "เลือก" ? "" : t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional details */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      รายละเอียดเพิ่มเติม
                    </label>
                    <textarea
                      name="details"
                      rows={4}
                      value={form.details}
                      onChange={handleChange}
                      placeholder="สเปกที่ต้องการ, งบประมาณ, กำหนดส่ง, หรือคำถามเพิ่มเติม..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                <Send size={15} /> ส่งคำขอใบเสนอราคา
              </button>
            </form>
          )}
        </div>
      </section>

      <FooterCompact />
    </div>
  );
};

export default QuoteRequest;
