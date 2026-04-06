/* ─── Professional Quote Print Utility (FlowAccount Style) ─── */

const SPEC_LABELS: Record<string, string> = {
  cpu: "CPU", ram: "RAM", com: "COM", usb: "USB", lan: "LAN", display: "จอ",
  gpio: "GPIO", sim: "SIM", gen: "Gen", fanless: "Fanless", ip_rating: "IP",
  os: "OS", power: "Power", dimension: "ขนาด", weight: "น้ำหนัก", certification: "Cert",
};

interface PrintQuote {
  quote_number: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  details: string | null;
}

interface PrintLineItem {
  model: string;
  qty: number;
  unit_price: number;
  discount_percent: number;
  line_total: number;
  admin_notes: string | null;
  _name?: string;
  _desc?: string;
  _specs?: Record<string, string>;
  _unit?: string;
  custom_specs?: Record<string, string>;
}

interface PrintTerms {
  discount_amount: number;
  valid_until: string;
  payment_terms: string;
  delivery_terms: string;
  include_vat?: boolean;
  vat_percent?: number;
  include_withholding_tax?: boolean;
  withholding_tax_percent?: number;
}

interface CompanyInfo {
  company_name_th?: string;
  company_name_en?: string;
  branch?: string;
  address_line1?: string;
  address_line2?: string;
  district?: string;
  province?: string;
  tax_id?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  website?: string;
  email?: string;
  logo_url?: string;
  bank_accounts?: { bank: string; branch: string; type: string; number: string }[];
  quote_terms?: string;
  vat_percent?: number;
  withholding_tax_percent?: number;
}

// Default company info (used if company_settings not loaded)
const DEFAULT_COMPANY: CompanyInfo = {
  company_name_th: "บริษัท อี เอ็น ที กรุ๊ป จำกัด",
  company_name_en: "ENT Group Co., Ltd.",
  branch: "สำนักงานใหญ่",
  address_line1: "เลขที่ 70/5",
  address_line2: "หมู่บ้าน เมทโทร บิซทาวน์ แจ้งวัฒนะ 2 หมู่ 4",
  district: "ตำบลคลองพระอุดม อำเภอปากเกร็ด",
  province: "จังหวัดนนทบุรี 11120",
  tax_id: "0135558013167",
  phone: "02-045-6104",
  mobile: "095-7391053, 082-2497922",
  fax: "02-045-6105",
  website: "www.entgroup.co.th",
  email: "sales@entgroup.co.th",
  bank_accounts: [
    { bank: "ธนาคารไทยพาณิชย์", branch: "สาขาบางบัวทอง (ปทุมธานี)", type: "ออมทรัพย์", number: "406-817747-1" },
    { bank: "ธนาคารกสิกรไทย", branch: "สาขา ปทุมธานี", type: "ออมทรัพย์", number: "841-2-05851-9" },
  ],
  quote_terms: `1. กรณีสินค้าหมดสต็อก รอสินค้า By Order 30-45 วัน หรือมากกว่านั้น ขึ้นอยู่กับจำนวนสินค้าที่สั่ง
2. กรณีลูกค้าสั่งซื้อสินค้า ลูกค้าต้องชำระเงินก่อนการสั่งซื้อ 70% หรือ 100% เต็มเท่านั้น
3. สินค้าเป็น By Order หลังจากสินค้าพร้อมส่งแล้วลูกค้าชำระเงินยอดที่เหลือทั้งหมด (ก่อนการจัดส่งสินค้าให้ลูกค้า)
4. สินค้าพร้อมส่ง ลูกค้าต้องชำระเงินเต็มจำนวน 100% ก่อนการจัดส่งสินค้าเท่านั้น
5. เอกสารใบกำกับภาษีและใบเสร็จรับเงินจัดส่งพร้อมกับสินค้าในส่วนที่โอนที่เหลือ หรือ ชำระเต็มจำนวน 100%
6. สินค้าที่เป็น By Order จากโรงงานต่างประเทศ กรณีถ้าลูกค้ามัดจำเงิน 100% (มีส่วนลดเพิ่มอีก 1%) แต่ถ้าสินค้ามีพร้อมส่งจะไม่ได้ลด 1%
7. ของแถม ไม่สามารถใช้เป็นส่วนลดเงินสดได้
8. การพิจารณาเสนอเงื่อนไขการขายหรือโปรโมชั่นจากบริษัทฯ ถือเป็นอันสิ้นสุด
9. ใบเสนอราคายืนราคา 30 วันเท่านั้น นับตั้งแต่วันที่ลูกค้าขอราคา
10. ลูกค้าเป็นผู้รับผิดชอบค่าใช้จ่าย ค่าธรรมเนียมในการโอนเงินเท่านั้น`,
  vat_percent: 7,
  withholding_tax_percent: 3,
};

function numberToThaiText(num: number): string {
  const digits = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const units = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
  if (num === 0) return "ศูนย์บาทถ้วน";
  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);
  let result = "";
  const str = intPart.toString();
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const d = parseInt(str[i]);
    const pos = len - i - 1;
    if (d === 0) continue;
    if (pos === 1 && d === 1) { result += "สิบ"; continue; }
    if (pos === 1 && d === 2) { result += "ยี่สิบ"; continue; }
    if (pos === 0 && d === 1 && len > 1) { result += "เอ็ด"; continue; }
    result += digits[d] + units[pos];
  }
  result += "บาท";
  if (decPart > 0) {
    const d1 = Math.floor(decPart / 10);
    const d2 = decPart % 10;
    if (d1 === 1) result += "สิบ";
    else if (d1 === 2) result += "ยี่สิบ";
    else if (d1 > 0) result += digits[d1] + "สิบ";
    if (d2 === 1 && d1 > 0) result += "เอ็ด";
    else if (d2 > 0) result += digits[d2];
    result += "สตางค์";
  } else {
    result += "ถ้วน";
  }
  return result;
}

export const printQuote = (
  q: PrintQuote,
  items: PrintLineItem[],
  terms: PrintTerms,
  company?: CompanyInfo,
  saleName?: string,
  salePhone?: string,
  saleEmail?: string,
) => {
  const c = { ...DEFAULT_COMPANY, ...company };
  const fp = (n: number) => new Intl.NumberFormat("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const today = new Date().toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" });
  const validDate = terms.valid_until
    ? new Date(terms.valid_until).toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "—";

  const subtotal = items.reduce((s, i) => s + i.line_total, 0);
  const discountTotal = terms.discount_amount || 0;
  const afterDiscount = subtotal - discountTotal;
  const vatPercent = terms.include_vat !== false ? (terms.vat_percent || c.vat_percent || 7) : 0;
  const vatAmount = vatPercent > 0 ? Math.round(afterDiscount * vatPercent / 100 * 100) / 100 : 0;
  const grandBeforeTax = afterDiscount + vatAmount;
  const whtPercent = terms.include_withholding_tax ? (terms.withholding_tax_percent || c.withholding_tax_percent || 3) : 0;
  const whtAmount = whtPercent > 0 ? Math.round(afterDiscount * whtPercent / 100 * 100) / 100 : 0;
  const netPayable = grandBeforeTax - whtAmount;

  const itemRows = items.map((item, i) => {
    const specs = item._specs || item.custom_specs || {};
    const specStr = Object.entries(specs)
      .filter(([, v]) => v && v !== "No")
      .map(([k, v]) => `${SPEC_LABELS[k] || k}: ${v === "Yes" ? "✓" : v}`)
      .join(" | ");
    const desc = item._desc || item._name || "";
    const unit = item._unit || "เครื่อง";
    const discountAmt = item.discount_percent > 0 ? Math.round(item.unit_price * item.qty * item.discount_percent / 100 * 100) / 100 : 0;

    return `<tr>
      <td class="c">${i + 1}</td>
      <td>
        <strong>${item.model}</strong>
        ${desc ? `<div class="desc">${desc}</div>` : ""}
        ${specStr ? `<div class="desc">${specStr}</div>` : ""}
        ${item.admin_notes ? `<div class="desc" style="color:#0891b2">* ${item.admin_notes}</div>` : ""}
      </td>
      <td class="r">${fp(item.qty)}</td>
      <td class="c">${unit}</td>
      <td class="r">${fp(item.unit_price)}</td>
      <td class="r">${fp(discountAmt)}</td>
      <td class="r">${fp(item.line_total)}</td>
    </tr>`;
  }).join("");

  // Terms as a special row
  const termsRow = c.quote_terms ? `<tr>
    <td class="c">${items.length + 1}</td>
    <td colspan="6">
      <strong>เงื่อนไขการสั่งสินค้า และชำระเงินฝ่ายบัญชี</strong>
      <div class="desc" style="white-space:pre-line;margin-top:6px;line-height:1.7">${c.quote_terms}</div>
      ${(c.bank_accounts || []).length > 0 ? `<div style="margin-top:12px">${c.bank_accounts!.map((b) => `<div class="desc"><strong>${b.bank}</strong> ${b.branch}<br>${b.type} ${b.number}</div>`).join('<br>')}</div>` : ""}
    </td>
  </tr>` : "";

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>ใบเสนอราคา ${q.quote_number || ""}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Sarabun','Noto Sans Thai',sans-serif;font-size:12px;color:#1a1a2e;padding:30px;max-width:820px;margin:0 auto}
@media print{body{padding:15px}@page{margin:10mm;size:A4}}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:12px;border-bottom:3px solid #0891b2}
.co{font-size:11px;line-height:1.6;color:#444}
.co strong{font-size:14px;color:#1a1a2e;display:block}
.co .tax{color:#666;font-size:10px}
.qt{text-align:right}
.qt h2{font-size:22px;color:#0891b2;margin-bottom:4px;font-weight:700}
.qt p{font-size:11px;color:#666}
.qt .num{font-size:16px;color:#1a1a2e;font-weight:700}
.info{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.info-box{border:1px solid #e2e8f0;border-radius:6px;padding:12px}
.info-box h4{font-size:10px;color:#0891b2;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.info-box p{font-size:11px;line-height:1.6;color:#333}
.info-box .lb{color:#888;font-size:10px}
.meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px}
.meta-item{font-size:11px}
.meta-item .lb{color:#888;font-size:10px;display:block}
.meta-item .vl{font-weight:600}
table{width:100%;border-collapse:collapse;margin-bottom:0}
th{background:#0891b2;color:#fff;font-size:10px;font-weight:600;padding:7px 8px;text-align:left}
th.c,td.c{text-align:center}
th.r,td.r{text-align:right}
td{padding:7px 8px;border-bottom:1px solid #e5e7eb;font-size:11px;vertical-align:top}
tr:nth-child(even){background:#fafbfc}
.desc{font-size:10px;color:#64748b;margin-top:3px;line-height:1.5}
.totals{margin-top:12px;margin-left:auto;width:300px}
.totals .row{display:flex;justify-content:space-between;padding:3px 0;font-size:11px;color:#444}
.totals .row.hl{font-weight:700;color:#0891b2;font-size:13px;border-top:2px solid #0891b2;padding-top:8px;margin-top:4px}
.totals .row.vat{color:#0891b2}
.totals .row.wht{color:#ef4444}
.totals .row.net{font-weight:700;font-size:14px;color:#1a1a2e;border-top:2px solid #1a1a2e;padding-top:8px;margin-top:4px}
.thai-text{font-size:11px;color:#666;margin:8px 0;text-align:right;font-style:italic}
.sigs{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin:40px 20px 20px}
.sig{text-align:center;padding-top:50px;border-top:1px solid #999}
.sig p{font-size:10px;color:#666;margin-top:4px}
.sig .name{font-size:11px;color:#1a1a2e;font-weight:600}
.footer{text-align:center;padding-top:12px;border-top:1px solid #e5e7eb;font-size:9px;color:#999}
</style></head><body>

<!-- Header -->
<div class="header">
  <div class="co">
    <strong>${c.company_name_th}</strong>
    <span style="font-size:11px;color:#666">${c.company_name_en} (${c.branch})</span><br>
    ${c.address_line1} ${c.address_line2}<br>
    ${c.district} ${c.province}<br>
    <span class="tax">เลขประจำตัวผู้เสียภาษี ${c.tax_id}</span><br>
    โทร. ${c.phone}<br>
    เบอร์มือถือ ${c.mobile}<br>
    โทรสาร ${c.fax}<br>
    ${c.website}
  </div>
  <div class="qt">
    <h2>ใบเสนอราคา</h2>
    <p class="num">${q.quote_number || "—"}</p>
    <div style="margin-top:12px;text-align:left;font-size:11px">
      <div style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px">
        <span class="lb" style="color:#888">วันที่:</span><span>${today}</span>
        <span class="lb" style="color:#888">ยืนราคาถึง:</span><span>${validDate}</span>
        ${saleName ? `<span class="lb" style="color:#888">พนักงานขาย:</span><span>${saleName}${salePhone ? ` ${salePhone}` : ""}${saleEmail ? ` ${saleEmail}` : ""}</span>` : ""}
      </div>
    </div>
  </div>
</div>

<!-- Customer + Contact Info -->
<div class="info">
  <div class="info-box">
    <h4>ลูกค้า</h4>
    ${q.company ? `<p><strong>${q.company}</strong></p>` : ""}
    <p>${q.name}</p>
    ${q.phone ? `<p><span class="lb">โทร:</span> ${q.phone}</p>` : ""}
    <p><span class="lb">อีเมล:</span> ${q.email}</p>
  </div>
  <div class="info-box">
    <h4>ผู้ติดต่อ</h4>
    <p><span class="lb">ชื่องาน:</span> ${items.length > 0 ? items[0].model : "-"}</p>
    <p><span class="lb">ผู้ติดต่อ:</span> ${q.name}</p>
    ${q.phone ? `<p><span class="lb">เบอร์โทร:</span> ${q.phone}</p>` : ""}
  </div>
</div>

<!-- Product Table -->
<table>
  <thead>
    <tr>
      <th class="c" style="width:35px">ลำดับ</th>
      <th>ชื่อสินค้า / รายละเอียด</th>
      <th class="r" style="width:60px">จำนวน</th>
      <th class="c" style="width:55px">หน่วย</th>
      <th class="r" style="width:85px">ราคาต่อหน่วย</th>
      <th class="r" style="width:70px">ส่วนลด (฿)</th>
      <th class="r" style="width:85px">ราคารวม</th>
    </tr>
  </thead>
  <tbody>
    ${itemRows}
    ${termsRow}
  </tbody>
</table>

<!-- Totals -->
<div class="totals">
  <div class="row"><span>รวมเป็นเงิน</span><span>${fp(subtotal)}</span></div>
  ${discountTotal > 0 ? `<div class="row"><span>ส่วนลดรวม</span><span>-${fp(discountTotal)}</span></div>` : ""}
  ${discountTotal > 0 ? `<div class="row"><span>ราคาหลังหักส่วนลด</span><span>${fp(afterDiscount)}</span></div>` : ""}
  ${vatPercent > 0 ? `<div class="row vat"><span>☑ ภาษีมูลค่าเพิ่ม ${vatPercent}%</span><span>${fp(vatAmount)}</span></div>` : ""}
  <div class="row hl"><span>จำนวนเงินรวมทั้งสิ้น</span><span>${fp(grandBeforeTax)}</span></div>
  ${whtPercent > 0 ? `<div class="row wht"><span>หัก ณ ที่จ่าย ${whtPercent}%</span><span>-${fp(whtAmount)}</span></div>
  <div class="row net"><span>ยอดชำระ</span><span>${fp(netPayable)}</span></div>` : ""}
</div>

<div class="thai-text">(${numberToThaiText(whtPercent > 0 ? netPayable : grandBeforeTax)})</div>

<!-- Signatures -->
<div class="sigs">
  <div>
    <div class="sig">
      <p>ในนาม ${q.company || q.name}</p>
      <p class="name">ผู้สั่งซื้อสินค้า &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; วันที่</p>
    </div>
  </div>
  <div>
    <div class="sig">
      <p>ในนาม ${c.company_name_th}</p>
      <p class="name">ผู้อนุมัติ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; วันที่</p>
    </div>
  </div>
</div>

<div class="footer">
  <p>${c.company_name_th} | ${c.phone} | ${c.website} | ${c.email}</p>
</div>

</body></html>`;

  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  }
};

export default printQuote;
