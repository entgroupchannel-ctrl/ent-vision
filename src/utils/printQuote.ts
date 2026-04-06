/* ─── Shared Quote Print Utility ─── */

const SPEC_LABELS: Record<string, string> = {
  cpu: "CPU", ram: "RAM", com: "COM", usb: "USB", lan: "LAN", display: "จอ",
  gpio: "GPIO", sim: "SIM", gen: "Gen", fanless: "Fanless", ip_rating: "IP",
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
  _specs?: Record<string, string>;
  custom_specs?: Record<string, string>;
}

interface PrintTerms {
  discount_amount: number;
  valid_until: string;
  payment_terms: string;
  delivery_terms: string;
}

export const printQuote = (q: PrintQuote, items: PrintLineItem[], terms: PrintTerms) => {
  const fp = (n: number) => new Intl.NumberFormat("th-TH").format(n);
  const subtotal = items.reduce((s, i) => s + i.line_total, 0);
  const grand = subtotal - (terms.discount_amount || 0);
  const today = new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
  const validDate = terms.valid_until
    ? new Date(terms.valid_until).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const itemRows = items.map((item, i) => {
    const specs = item._specs || item.custom_specs || {};
    const specStr = Object.entries(specs)
      .filter(([, v]) => v && v !== "No")
      .map(([k, v]) => `${SPEC_LABELS[k] || k}: ${v === "Yes" ? "✓" : v}`)
      .join(" | ");

    return `<tr>
      <td>${i + 1}</td>
      <td>
        <strong>${item.model}</strong>
        ${item._name ? `<br><span style="font-size:10px;color:#64748b">${item._name}</span>` : ""}
        ${specStr ? `<div style="font-size:10px;color:#64748b;margin-top:3px;line-height:1.4">${specStr}</div>` : ""}
        ${item.admin_notes ? `<div style="font-size:10px;color:#0ea5e9;margin-top:2px">* ${item.admin_notes}</div>` : ""}
      </td>
      <td>${item.qty}</td>
      <td>฿${fp(item.unit_price)}</td>
      <td>${item.discount_percent > 0 ? item.discount_percent + "%" : "—"}</td>
      <td>฿${fp(item.line_total)}</td>
    </tr>`;
  }).join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>ใบเสนอราคา ${q.quote_number || ""}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Sarabun','Noto Sans Thai',sans-serif;font-size:13px;color:#1a1a1a;padding:40px;max-width:800px;margin:0 auto}
@media print{body{padding:20px}@page{margin:15mm}}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #0ea5e9}
.logo-area h1{font-size:22px;font-weight:700;color:#0ea5e9}
.logo-area p{font-size:11px;color:#666;margin-top:2px}
.quote-info{text-align:right}
.quote-info h2{font-size:18px;font-weight:700}
.quote-info p{font-size:11px;color:#666}
.customer{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:20px}
.customer h3{font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.cg{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.cg span{font-size:12px}
.cg .lb{color:#64748b}
table{width:100%;border-collapse:collapse;margin-bottom:16px}
th{background:#0ea5e9;color:#fff;font-size:11px;font-weight:600;padding:8px 10px;text-align:left}
th:nth-child(3),th:nth-child(4),th:nth-child(5),th:nth-child(6){text-align:right}
td{padding:8px 10px;border-bottom:1px solid #e2e8f0;font-size:12px;vertical-align:top}
td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6){text-align:right}
.totals{float:right;width:280px;margin-bottom:20px}
.totals .row{display:flex;justify-content:space-between;padding:4px 0;font-size:12px}
.totals .grand{font-size:16px;font-weight:700;color:#0ea5e9;border-top:2px solid #0ea5e9;padding-top:8px;margin-top:4px}
.terms{clear:both;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:20px}
.terms h3{font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.tg{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.tg .lb{color:#64748b;font-size:11px}
.tg .vl{font-size:12px;font-weight:500}
.sigs{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:32px 0}
.sig{text-align:center;padding-top:60px;border-top:1px solid #cbd5e1}
.sig p{font-size:11px;color:#64748b}
.footer{text-align:center;padding-top:16px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8}
</style></head><body>
<div class="header">
  <div class="logo-area">
    <h1>ENT GROUP</h1>
    <p>บริษัท อี.เอ็น.ที. กรุ๊ป จำกัด</p>
    <p>Industrial Computer Solutions</p>
  </div>
  <div class="quote-info">
    <h2>ใบเสนอราคา</h2>
    <p>เลขที่: <strong>${q.quote_number || "—"}</strong></p>
    <p>วันที่: ${today}</p>
  </div>
</div>
<div class="customer">
  <h3>ข้อมูลลูกค้า</h3>
  <div class="cg">
    <span><span class="lb">ชื่อ:</span> ${q.name}</span>
    <span><span class="lb">อีเมล:</span> ${q.email}</span>
    ${q.company ? `<span><span class="lb">บริษัท:</span> ${q.company}</span>` : ""}
    ${q.phone ? `<span><span class="lb">โทร:</span> ${q.phone}</span>` : ""}
  </div>
  ${q.details ? `<p style="margin-top:6px;font-size:11px;color:#64748b">${q.details}</p>` : ""}
</div>
<table>
  <thead><tr><th style="width:30px">#</th><th>รายการ</th><th>จำนวน</th><th>ราคา/หน่วย</th><th>ส่วนลด</th><th>รวม</th></tr></thead>
  <tbody>${itemRows}</tbody>
</table>
<div class="totals">
  <div class="row"><span>รวมก่อนส่วนลด</span><span>฿${fp(subtotal)}</span></div>
  ${terms.discount_amount > 0 ? `<div class="row"><span>ส่วนลด</span><span>-฿${fp(terms.discount_amount)}</span></div>` : ""}
  <div class="row grand"><span>ยอดรวมสุทธิ</span><span>฿${fp(grand)}</span></div>
</div>
<div class="terms">
  <h3>เงื่อนไข</h3>
  <div class="tg">
    <div><span class="lb">ราคายืนถึง:</span><br><span class="vl">${validDate}</span></div>
    <div><span class="lb">เงื่อนไขชำระ:</span><br><span class="vl">${terms.payment_terms || "—"}</span></div>
    <div><span class="lb">เงื่อนไขจัดส่ง:</span><br><span class="vl">${terms.delivery_terms || "—"}</span></div>
    <div><span class="lb">การรับประกัน:</span><br><span class="vl">1 ปี Carry-in</span></div>
  </div>
</div>
<div class="sigs">
  <div class="sig"><p>ผู้เสนอราคา (ENT GROUP)</p></div>
  <div class="sig"><p>ผู้อนุมัติ / ลูกค้า</p></div>
</div>
<div class="footer">
  <p>บริษัท อี.เอ็น.ที. กรุ๊ป จำกัด | www.entgroup.co.th</p>
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
