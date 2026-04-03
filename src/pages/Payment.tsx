import { CreditCard, Building2, Phone, Mail, AlertCircle, Send, Info } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const bankAccounts = [
  {
    bank: "ธนาคารกสิกรไทย",
    branch: "สาขาบางเดื่อ ปทุมธานี",
    type: "ออมทรัพย์",
    account: "841-2-05851-9",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-900/30",
  },
  {
    bank: "ธนาคารไทยพาณิชย์",
    branch: "สาขาบางเดื่อ (ปทุมธานี)",
    type: "ออมทรัพย์",
    account: "406-817747-1",
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-900/30",
  },
];

const taxNotes = [
  "สำหรับลูกค้าเป็นบริษัท อัตราค่าบริการดังกล่าวยังไม่รวมภาษีมูลค่าเพิ่ม 7%",
  "สำหรับลูกค้าที่ต้องการใบเสร็จ/ใบกำกับภาษี หากไม่ได้รับภายใน 2 อาทิตย์ รบกวนติดต่อเจ้าหน้าที่ทันที",
  "ขอสงวนสิทธิ์ในการออกใบเสร็จ/ใบกำกับภาษีย้อนหลัง",
  "กรณีที่มีการหักภาษี ณ ที่จ่าย ใบเสร็จ/ใบกำกับภาษีจะถูกส่งหลังจากบริษัทได้รับหนังสือหักฯ เรียบร้อยแล้วเท่านั้น",
  "สำหรับนิติบุคคลที่ยอดค่าบริการตั้งแต่ 1,000 บ. ขึ้นไป สามารถหักภาษี ณ ที่จ่าย 3%",
];

const Payment = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CreditCard size={16} />
            Payment
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            วิธีการชำระเงิน
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ท่านสามารถชำระเงินผ่านช่องทางดังต่อไปนี้
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-4 bg-background">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-sm text-muted-foreground">
            <Building2 size={16} />
            <span className="font-semibold text-foreground">บริษัท อี เอ็นที กรุ๊ป จำกัด</span>
            <span className="mx-1">|</span>
            เลขประจำตัวผู้เสียภาษี 0135558013167
          </div>
        </div>
      </section>

      {/* Bank Accounts */}
      <section className="py-10 bg-background">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankAccounts.map((bank, i) => (
              <div key={i} className={`rounded-2xl border ${bank.borderColor} ${bank.bgLight} p-6`}>
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${bank.color} text-white text-xs font-bold mb-4`}>
                  {bank.bank}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{bank.branch}</p>
                <p className="text-sm text-muted-foreground mb-3">ประเภท: {bank.type}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground tracking-wider">{bank.account}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax & Invoice Notes */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
              <Info size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">หมายเหตุ — ใบเสร็จ / ภาษี</h2>
          </div>
          <div className="space-y-3">
            {taxNotes.map((note, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transfer Notification */}
      <section className="py-12 bg-background">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Send size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">วิธีการแจ้งการโอนเงิน</h2>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            <p className="text-sm text-foreground leading-relaxed mb-6">
              หลังจากทำการชำระเงินเรียบร้อยแล้ว ท่านสามารถแจ้งการชำระเงินได้ โดยให้ท่านทำการ
              <strong> Scan สลิป ATM หรือหลักฐานใบโอนเงิน</strong> มาที่
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="mailto:accountant@entgroup.co.th"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail size={16} />
                accountant@entgroup.co.th
              </a>
              <a
                href="tel:020456104"
                className="inline-flex items-center gap-2 px-5 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Phone size={16} />
                02-045-6104
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border">
                <Phone size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Accountant</p>
                  <p className="text-sm font-semibold text-foreground">02-045-6104</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border">
                <Phone size={16} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">จัดซื้อ</p>
                  <p className="text-sm font-semibold text-foreground">Khun Phatrawan — 082-249-7922</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
