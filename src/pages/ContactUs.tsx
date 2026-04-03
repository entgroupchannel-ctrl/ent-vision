import SEOHead from "@/components/SEOHead";
import { useState } from "react";
import bannerContact from "@/assets/banner-contact.jpg";
import teamSky from "@/assets/team-sky.png";
import teamSom from "@/assets/team-som.png";
import teamPreaw from "@/assets/team-preaw.png";
import { Link } from "react-router-dom";
import LineQRButton from "@/components/LineQRButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Phone, Mail, MapPin, ArrowLeft, Send, MessageCircle, Users,
} from "lucide-react";
import FooterCompact from "@/components/FooterCompact";
import QuoteDialog from "@/components/QuoteDialog";

const categories = [
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

const ContactUs = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    lineId: "",
    whatsapp: "",
    callbackTime: "",
    category: "",
    message: "",
    subscribe: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await (supabase.from as any)("contact_submissions").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        line_id: form.lineId || null,
        whatsapp: form.whatsapp || null,
        callback_time: form.callbackTime || null,
        category: form.category || null,
        message: form.message,
      });
      if (error) throw error;

      if (form.subscribe && form.email) {
        await (supabase.from as any)("subscribers").insert({
          email: form.email,
          name: form.name || null,
          source: "contact_form",
        }).then(() => {});
      }
      setSubmitted(true);
      toast({ title: "ส่งข้อความเรียบร้อย!", description: "ทีมงานจะตอบกลับภายใน 24 ชม." });
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
      <SEOHead title="ติดต่อเรา — ENT Group" description="ติดต่อ ENT Group สอบถามสินค้า Mini PC, Panel PC, Industrial Computer ขอใบเสนอราคา โทร สำนักงานปากเกร็ด นนทบุรี" path="/contact" />
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={bannerContact} alt="ติดต่อเรา" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
              ติดต่อเรา
            </h1>
            <p className="text-sm md:text-base text-white/80">
              ติดต่อทีมงานของเรา — พร้อมให้คำปรึกษาและดูแลทุกโครงการ
            </p>
          </div>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto px-6 py-3 border-b border-border">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={14} /> กลับหน้าหลัก
        </Link>
      </div>

      {/* Content */}
      <section className="pb-16 md:pb-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left — Contact info + Map */}
            <div className="lg:col-span-2 space-y-5">
              {/* Phone */}
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">โทรศัพท์</h3>
                    <a href="tel:020456104" className="block text-sm text-primary hover:underline">02-045-6104</a>
                    <a href="tel:0957391053" className="block text-sm text-primary hover:underline">095-739-1053</a>
                    <p className="text-xs text-muted-foreground mt-1">Fax: 02-045-6105</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">อีเมลฝ่ายขาย</h3>
                    <a href="mailto:Sale@entgroup.co.th" className="text-sm text-primary hover:underline">
                      Sale@entgroup.co.th
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">สำนักงานใหญ่ & สำนักงานขาย</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      เมทโทร บิซทาวน์ แจ้งวัฒนะ 2, 70/5 หมู่ 4<br />
                      ตำบลคลองพระอุดม อำเภอปากเกร็ด<br />
                      นนทบุรี 11120
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2">
                      เลขประจำตัวผู้เสียภาษี: 0135558013167
                    </p>
                  </div>
                </div>
              </div>

              {/* LINE */}
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(120,60%,40%)]/10 border border-[hsl(120,60%,40%)]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={16} className="text-[hsl(120,60%,40%)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2">LINE Official</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://nvidia-jetson.com/images/line-qr.png"
                        alt="LINE QR Code @entgroup"
                        className="w-24 h-24 rounded-lg border border-border bg-white p-1"
                      />
                      <LineQRButton
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(120,60%,40%)] text-white text-xs font-bold hover:bg-[hsl(120,60%,35%)] transition-colors"
                      >
                        แอดไลน์ @entgroup
                      </LineQRButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="card-surface rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.5!2d100.4793839!3d13.9320709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2839e781a7a99%3A0xfae548f49721eb09!2sENT%20GROUP%20Co.%2CLtd.!5e0!3m2!1sth!2sth!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ENTGroup Office Location"
                  className="w-full"
                />
                <div className="p-3">
                  <a
                    href="https://maps.app.goo.gl/vuvJHVwy2n2G3o7e6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <MapPin size={11} /> เปิดใน Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <div className="card-surface rounded-xl p-6 md:p-8">
                <h2 className="text-lg font-display font-bold text-foreground mb-1">ส่งข้อความถึงเรา</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Send size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">ส่งข้อความเรียบร้อย!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับโดยเร็วที่สุด
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", phone: "", company: "", lineId: "", whatsapp: "", callbackTime: "", category: "", message: "" });
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      ส่งข้อความอีกครั้ง
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    {/* Category + Callback time */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">หมวดหมู่สินค้า</label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          {categories.map((c) => (
                            <option key={c} value={c === "เลือกหมวดหมู่" ? "" : c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">เวลาที่สะดวกให้ติดต่อกลับ</label>
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
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        ข้อความ <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="รายละเอียดที่ต้องการสอบถาม เช่น จำนวน สเปกที่ต้องการ งบประมาณ..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Subscribe */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.subscribe}
                        onChange={(e) => setForm({ ...form, subscribe: e.target.checked })}
                        className="rounded border-border text-primary focus:ring-primary/30 w-4 h-4"
                      />
                      <span className="text-xs text-muted-foreground">สมัครรับข่าวสาร โปรโมชั่น และอัปเดตจาก ENT Group</span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      <Send size={15} /> ส่งข้อความ
                    </button>
                  </form>
                )}
              </div>

              {/* Sales Team */}
              <div className="mt-6 card-surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-primary" />
                  <h3 className="text-base font-display font-bold text-foreground">ติดต่อทีมขายของเรา</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  ติดต่อได้ที่ <a href="mailto:Sale@entgroup.co.th" className="text-primary hover:underline">Sale@entgroup.co.th</a>
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Sky - Adisak", role: "ผู้เชี่ยวชาญงานขาย", img: teamSky },
                    { name: "Som - Rungaroon", role: "เจ้าหน้าที่ฝ่ายขาย", img: teamSom },
                    { name: "Preaw - Unthikan", role: "เจ้าหน้าที่ฝ่ายขาย", img: teamPreaw },
                  ].map((person) => (
                    <div key={person.name} className="text-center">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 border-primary/20"
                      />
                      <p className="text-xs font-bold text-foreground">{person.name}</p>
                      <p className="text-[10px] text-muted-foreground">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to Quote page */}
              <div className="mt-6 card-surface rounded-xl p-5 border-l-4 border-primary">
                <p className="text-sm text-foreground font-medium mb-1">ต้องการใบเสนอราคา?</p>
                <p className="text-xs text-muted-foreground mb-3">
                  เลือกสินค้าและจำนวนที่ต้องการ — ฝ่ายขายจะจัดทำใบเสนอราคาให้ภายใน 24 ชม.
                </p>
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
                >
                  ขอใบเสนอราคา →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteDialog
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
      <FooterCompact />
    </div>
  );
};

export default ContactUs;
