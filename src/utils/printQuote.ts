/* ─── Professional Quote Print (ENT Group Style — per PRINT_QUOTE_DESIGN_SPEC) ─── */

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
  company_address?: string | null;
  tax_id?: string | null;
  branch?: string | null;
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
    { bank: "ธนาคารกสิกรไทย", branch: "สาขา ปทุมธานี", type: "ออมทรัพย์", number: "841-2-05851-9" },
    { bank: "ธนาคารไทยพาณิชย์", branch: "สาขาบางบัวทอง (ปทุมธานี)", type: "ออมทรัพย์", number: "406-817747-1" },
  ],
  quote_terms: `1.) บริษัทฯ สงวนสิทธิ์ในการเรียกค่าปรับ 30% สำหรับการยกเลิก PO หรือการสั่งซื้อในทุกกรณี
2.) กรณีสินค้าพร้อมส่ง ลูกค้าต้องชำระค่าสินค้าและพร้อมรับสินค้าภายใน 15 วัน มิฉะนั้นถือว่าลูกค้าไม่พร้อมรับสินค้า ขอสงวนสิทธิ์ปล่อยสินค้าออกจากสต็อกทันที โดยไม่ต้องแจ้งให้ทราบ
3.) กรณีลูกค้าไม่พร้อมรับสินค้า บริษัทฯ ขอสงวนสิทธิ์ในการเรียกเก็บเงินมัดจำ 30% โดยลูกค้าไม่สามารถเรียกร้องใดๆ`,
  vat_percent: 7,
  withholding_tax_percent: 3,
};

/* ── Thai number text ── */
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

/* ── Clean description: strip price ranges ── */
function cleanDescription(desc: string): string {
  if (!desc) return "";
  let cleaned = desc;
  cleaned = cleaned.replace(/\|?\s*ราคา\s*฿[\d,]+\s*-\s*฿[\d,]+\s*\(\d+\s*configs?\)/gi, '');
  cleaned = cleaned.replace(/\s*\|\s*ราคา\s*฿[\d,]+\s*-\s*฿[\d,]+\s*\(.*?\)/gi, '');
  cleaned = cleaned.replace(/฿[\d,]+\s*-\s*฿[\d,]+\s*\(\d+\s*configs?\)/gi, '');
  return cleaned.trim();
}

/* ── Format specs as separate lines ── */
function formatSpecLines(specs: Record<string, string>): string {
  return Object.entries(specs)
    .filter(([, v]) => v && v !== "No" && v !== "-")
    .map(([k, v]) => {
      const label = SPEC_LABELS[k] || k;
      const val = v === "Yes" ? "✓" : v;
      return `<div class="spec-line">${label}: ${val}</div>`;
    })
    .join("");
}

/* ═══════════════════════════════════════════ */
/*  MAIN EXPORT                                */
/* ═══════════════════════════════════════════ */
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
  const discountAmt = items.reduce((s, i) => {
    return s + (i.discount_percent > 0 ? Math.round(i.unit_price * i.qty * i.discount_percent / 100 * 100) / 100 : 0);
  }, 0);
  const totalDiscount = (terms.discount_amount || 0) + discountAmt;
  const afterDiscount = subtotal;
  const beforeVat = afterDiscount;
  const vatPercent = terms.include_vat !== false ? (terms.vat_percent || c.vat_percent || 7) : 0;
  const vatAmount = vatPercent > 0 ? Math.round(beforeVat * vatPercent / 100 * 100) / 100 : 0;
  const grandTotal = beforeVat + vatAmount;
  const whtPercent = terms.include_withholding_tax ? (terms.withholding_tax_percent || c.withholding_tax_percent || 3) : 0;
  const whtAmount = whtPercent > 0 ? Math.round(beforeVat * whtPercent / 100 * 100) / 100 : 0;
  const netPayable = grandTotal - whtAmount;
  const finalAmount = whtPercent > 0 ? netPayable : grandTotal;

  // Item rows
  const itemRows = items.map((item, i) => {
    const specs = item._specs || item.custom_specs || {};
    const rawDesc = item._desc || item._name || "";
    const desc = cleanDescription(rawDesc);
    const specHtml = formatSpecLines(specs);
    const unit = item._unit || "เครื่อง";
    const lineDiscount = item.discount_percent > 0 ? Math.round(item.unit_price * item.qty * item.discount_percent / 100 * 100) / 100 : 0;

    return `<tr>
      <td class="c">${i + 1}</td>
      <td class="desc-cell">
        <div class="product-name">${item.model}</div>
        ${desc ? `<div class="product-desc">${desc}</div>` : ""}
        ${specHtml ? `<div class="spec-block">${specHtml}</div>` : ""}
        ${item.admin_notes ? `<div class="admin-note">* ${item.admin_notes}</div>` : ""}
      </td>
      <td class="c">${item.qty}</td>
      <td class="r">${fp(item.unit_price)}</td>
      <td class="r">${lineDiscount > 0 ? fp(lineDiscount) : "-"}</td>
      <td class="r">${fp(item.line_total)}</td>
    </tr>`;
  }).join("");

  /* ── Contact info for header right ── */
  const contactName = q.name || "-";
  const contactPhone = q.phone || "";

  const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
<title>ใบเสนอราคา ${q.quote_number || ""}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Sarabun',sans-serif;font-size:11px;color:#1a1a2e;padding:0;margin:0}
@media print{
  body{padding:0}
  @page{margin:12mm 15mm;size:A4}
  .page-break{page-break-before:always}
}
@media screen{
  body{max-width:820px;margin:0 auto;padding:20px}
}

/* ── Colors ── */
:root{
  --orange:#E87722;
  --orange-light:#FFF3E8;
  --dark:#1a1a2e;
  --gray:#666;
  --light-gray:#f5f5f5;
  --border:#ddd;
}

/* ── Header ── */
.header{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;padding-bottom:10px;border-bottom:3px solid var(--orange)}
.header-left{font-size:10px;line-height:1.7;color:var(--gray)}
.header-left .co-name{font-size:15px;font-weight:700;color:var(--dark);display:block;margin-bottom:2px}
.header-left .co-en{font-size:10px;color:var(--gray)}
.header-left .tax-line{color:#888;font-size:9.5px}
.header-right{text-align:right}
.header-right .title{font-size:24px;font-weight:700;color:var(--orange);margin-bottom:6px}
.header-right .info-grid{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;text-align:left;font-size:11px}
.header-right .info-grid .lb{color:var(--gray);font-weight:600;text-align:right;white-space:nowrap}
.header-right .info-grid .vl{color:var(--dark)}

/* ── Customer Info ── */
.customer-box{border:1.5px solid var(--border);border-radius:4px;padding:10px 14px;margin-bottom:14px}
.customer-box .section-label{font-size:10px;font-weight:700;color:var(--orange);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px}
.customer-box p{font-size:11px;line-height:1.6;color:#333}
.customer-box .cust-name{font-weight:700;font-size:12px;color:var(--dark)}

/* ── Product Table ── */
table.items{width:100%;border-collapse:collapse;margin-bottom:0}
table.items th{background:var(--dark);color:#fff;font-size:10px;font-weight:600;padding:8px 6px;text-align:left;white-space:nowrap}
table.items th.c{text-align:center}
table.items th.r{text-align:right}
table.items td{padding:7px 6px;border-bottom:1px solid #e5e7eb;font-size:11px;vertical-align:top}
table.items td.c{text-align:center}
table.items td.r{text-align:right;white-space:nowrap}
table.items tr:nth-child(even){background:#fafbfc}
.product-name{font-weight:700;font-size:11.5px;color:var(--dark)}
.product-desc{font-size:10px;color:#555;margin-top:2px;line-height:1.5}
.spec-block{margin-top:4px}
.spec-line{font-size:9.5px;color:#666;line-height:1.6;padding-left:8px}
.admin-note{font-size:9.5px;color:var(--orange);margin-top:3px;font-style:italic}
.desc-cell{max-width:360px}

/* ── Totals ── */
.totals-section{margin-top:12px;display:flex;justify-content:flex-end}
.totals{width:320px}
.totals .row{display:flex;justify-content:space-between;padding:4px 0;font-size:11px;color:#444}
.totals .row.sub{border-top:1px solid var(--border);padding-top:6px;margin-top:2px}
.totals .row.vat{color:var(--orange);font-weight:600}
.totals .row.grand{font-weight:700;font-size:14px;color:var(--dark);border-top:2.5px solid var(--orange);padding-top:8px;margin-top:4px}
.totals .row.wht{color:#dc2626;font-size:11px}
.totals .row.net{font-weight:700;font-size:13px;color:var(--dark);border-top:2px solid var(--dark);padding-top:6px;margin-top:4px}
.thai-text{font-size:11px;color:var(--gray);margin:6px 0 16px;text-align:right;font-style:italic}

/* ── Notes & Bank ── */
.notes-section{margin-top:16px;padding-top:10px;border-top:1.5px solid var(--border)}
.notes-section h3{font-size:12px;font-weight:700;color:var(--orange);margin-bottom:6px}
.notes-section p,.notes-section div{font-size:10.5px;line-height:1.7;color:#444}
.bank-block{margin-top:10px;padding:8px 12px;background:var(--light-gray);border-radius:4px}
.bank-item{margin-bottom:6px}
.bank-item strong{color:var(--dark)}
.bank-item div{font-size:10px;color:var(--gray)}
.payslip-note{font-size:10px;color:var(--orange);font-weight:600;margin-top:6px}

/* ── Terms ── */
.terms-section{margin-top:14px;padding-top:10px;border-top:1.5px solid var(--border)}
.terms-section h3{font-size:12px;font-weight:700;color:var(--orange);margin-bottom:6px}
.terms-section .terms-body{font-size:10px;line-height:1.8;color:#555;white-space:pre-line}

/* ── Signatures ── */
.sigs{display:grid;grid-template-columns:1fr auto 1fr;gap:20px;margin:40px 10px 20px;align-items:end}
.sig{text-align:center;padding-top:50px;border-top:1px solid #999}
.sig p{font-size:10px;color:var(--gray);margin-top:4px}
.sig .name{font-size:11px;color:var(--dark);font-weight:600}
.sig-stamp{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-end}
.sig-stamp .stamp-placeholder{width:80px;height:80px;border:2px dashed var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;color:#ccc;margin-bottom:8px}

/* ── Footer ── */
.page-footer{text-align:center;padding-top:10px;border-top:1px solid #e5e7eb;font-size:9px;color:#999;margin-top:20px}
</style></head><body>

<!-- ═══ HEADER ═══ -->
<div class="header">
  <div class="header-left">
    ${c.logo_url ? `<img src="${c.logo_url}" alt="Logo" style="height:50px;margin-bottom:6px;display:block">` : ""}
    <span class="co-name">${c.company_name_th}</span>
    <span class="co-en">${c.company_name_en} (${c.branch})</span><br>
    ${c.address_line1} ${c.address_line2}<br>
    ${c.district} ${c.province}<br>
    <span class="tax-line">เลขประจำตัวผู้เสียภาษี ${c.tax_id}</span><br>
    โทร. ${c.phone} | แฟกซ์ ${c.fax}<br>
    เบอร์มือถือ ${c.mobile}<br>
    ${c.website}
  </div>
  <div class="header-right">
    <div class="title">ใบเสนอราคา</div>
    <div class="info-grid">
      <span class="lb">เลขที่:</span><span class="vl">${q.quote_number || "—"}</span>
      <span class="lb">วันที่:</span><span class="vl">${today}</span>
      <span class="lb">ยืนราคาถึง:</span><span class="vl">${validDate}</span>
      ${saleEmail ? `<span class="lb">ผู้ขาย:</span><span class="vl">${saleEmail}</span>` : ""}
      ${saleName ? `<span class="lb"></span><span class="vl">${saleName}${salePhone ? ` ${salePhone}` : ""}</span>` : ""}
      <span class="lb">ชื่องาน:</span><span class="vl">${items.length > 0 ? items[0].model : "-"}</span>
      <span class="lb">ผู้ติดต่อ:</span><span class="vl">${contactName}</span>
      ${contactPhone ? `<span class="lb">เบอร์โทร:</span><span class="vl">${contactPhone}</span>` : ""}
    </div>
  </div>
</div>

<!-- ═══ CUSTOMER INFO ═══ -->
<div class="customer-box">
  <div class="section-label">ลูกค้า</div>
  <p class="cust-name">${q.company ? `${q.company}` : ""} ${q.name}${q.branch ? ` (${q.branch})` : ""}</p>
  ${q.company_address ? `<p>${q.company_address}</p>` : ""}
  ${q.tax_id ? `<p style="font-size:10px;color:#888">เลขประจำตัวผู้เสียภาษี ${q.tax_id}</p>` : ""}
  <p><span style="color:#888">อีเมล:</span> ${q.email}${q.phone ? ` | <span style="color:#888">โทร:</span> ${q.phone}` : ""}</p>
</div>

<!-- ═══ PRODUCT TABLE ═══ -->
<table class="items">
  <thead>
    <tr>
      <th class="c" style="width:30px">#</th>
      <th>รายละเอียด</th>
      <th class="c" style="width:50px">จำนวน</th>
      <th class="r" style="width:90px">ราคาต่อหน่วย</th>
      <th class="r" style="width:70px">ส่วนลด</th>
      <th class="r" style="width:90px">มูลค่า</th>
    </tr>
  </thead>
  <tbody>
    ${itemRows}
  </tbody>
</table>

<!-- ═══ TOTALS ═══ -->
<div class="totals-section">
  <div class="totals">
    <div class="row"><span>รวมเป็นเงิน</span><span>${fp(subtotal + totalDiscount)} บาท</span></div>
    ${totalDiscount > 0 ? `<div class="row"><span>ส่วนลด</span><span>${fp(totalDiscount)} บาท</span></div>
    <div class="row sub"><span>จำนวนเงินหลังหักส่วนลด</span><span>${fp(afterDiscount)} บาท</span></div>` : ""}
    ${vatPercent > 0 ? `<div class="row vat"><span>ภาษีมูลค่าเพิ่ม ${vatPercent}%</span><span>${fp(vatAmount)} บาท</span></div>` : ""}
    <div class="row grand"><span>จำนวนเงินรวมทั้งสิ้น</span><span>${fp(grandTotal)} บาท</span></div>
    ${whtPercent > 0 ? `<div class="row wht"><span>หัก ณ ที่จ่าย ${whtPercent}%</span><span>-${fp(whtAmount)} บาท</span></div>
    <div class="row net"><span>ยอดชำระ</span><span>${fp(netPayable)} บาท</span></div>` : ""}
  </div>
</div>
<div class="thai-text">(${numberToThaiText(finalAmount)})</div>

<!-- ═══ NOTES & BANK ═══ -->
<div class="notes-section">
  <h3>หมายเหตุ</h3>
  <p>วิธีการชำระเงิน</p>
  <p>ลูกค้าเป็นผู้รับผิดชอบค่าใช้จ่าย ค่าธรรมเนียมในการโอนเงิน</p>
  ${(c.bank_accounts || []).length > 0 ? `
  <div class="bank-block">
    ${c.bank_accounts!.map(b => `<div class="bank-item">
      <strong>${c.company_name_th}</strong>
      <div>${b.bank} ${b.branch}</div>
      <div>${b.type} ${b.number}</div>
    </div>`).join("")}
    <div class="payslip-note">Pay in slip มายัง: accountant@entgroup.co.th</div>
  </div>` : ""}
</div>

<!-- ═══ TERMS ═══ -->
${c.quote_terms ? `<div class="terms-section">
  <h3>เงื่อนไข</h3>
  <div class="terms-body">${c.quote_terms}</div>
</div>` : ""}

<!-- ═══ SIGNATURES ═══ -->
<div class="sigs">
  <div>
    <div class="sig">
      <p>ในนาม ${q.company || q.name}</p>
      <p class="name">ผู้สั่งซื้อสินค้า &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; วันที่</p>
    </div>
  </div>
  <div class="sig-stamp">
    <div class="stamp-placeholder">ตราประทับ</div>
  </div>
  <div>
    <div class="sig">
      <p>ในนาม ${c.company_name_th}</p>
      <p class="name">ผู้อนุมัติ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; วันที่ ${today}</p>
    </div>
  </div>
</div>

<!-- ═══ FOOTER ═══ -->
<div class="page-footer">
  <p>${c.company_name_th} | โทร. ${c.phone} | ${c.website} | ${c.email}</p>
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
