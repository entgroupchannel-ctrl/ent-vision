import { useState, useEffect } from "react";
import {
  FolderOpen, FileText, Download, Clock, CheckCircle,
  XCircle, Loader2, Send, Plus, Shield, BookOpen,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

interface DocRequest {
  id: string;
  document_type: string;
  product_model: string | null;
  serial_number: string | null;
  notes: string | null;
  status: string;
  file_url: string | null;
  admin_notes: string | null;
  created_at: string;
}

const DOC_TYPES = [
  { value: "vendor_registration", label: "Vendor Registration Form", desc: "แบบฟอร์มขึ้นทะเบียนผู้ค้า", icon: Shield, instant: true },
  { value: "company_profile", label: "Company Profile / แคตตาล็อก", desc: "โปรไฟล์บริษัทและแคตตาล็อกสินค้า", icon: BookOpen, instant: true },
  { value: "catalog", label: "Product Catalog", desc: "แคตตาล็อกสินค้าทั้งหมด", icon: FolderOpen, instant: true },
  { value: "warranty_certificate", label: "ใบรับประกัน", desc: "ขอใบรับประกันสินค้า (ต้องระบุ S/N)", icon: Shield, instant: false },
  { value: "certificate_of_conformity", label: "Certificate of Conformity", desc: "หนังสือรับรองมาตรฐาน", icon: CheckCircle, instant: false },
  { value: "datasheet", label: "Datasheet", desc: "สเปคสินค้า (ระบุรุ่น)", icon: FileText, instant: true },
  { value: "boq_template", label: "BOQ Template", desc: "แบบฟอร์ม Bill of Quantities", icon: FileText, instant: true },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "รอดำเนินการ", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock },
  approved: { label: "อนุมัติแล้ว", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle },
  ready: { label: "พร้อมดาวน์โหลด", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: Download },
  rejected: { label: "ไม่อนุมัติ", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
};

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const MyDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { trackEvent } = useEngagementTracker();
  const [requests, setRequests] = useState<DocRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    document_type: "",
    product_model: "",
    serial_number: "",
    notes: "",
  });

  const fetchRequests = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await (supabase.from as any)("document_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setRequests(data);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, [user]);

  const handleSubmit = async () => {
    if (!user || !form.document_type) return;
    setSubmitting(true);
    try {
      const { error } = await (supabase.from as any)("document_requests").insert({
        user_id: user.id,
        document_type: form.document_type,
        product_model: form.product_model || null,
        serial_number: form.serial_number || null,
        notes: form.notes || null,
      });
      if (error) throw error;

      // Engagement tracking
      trackEvent({
        eventType: "contact_submit",
        metadata: { type: "document_request", document_type: form.document_type },
      });

      toast({ title: "ส่งคำขอเรียบร้อย", description: "ทีมงานจะดำเนินการและแจ้งผลให้ทราบ" });
      setForm({ document_type: "", product_model: "", serial_number: "", notes: "" });
      setShowForm(false);
      fetchRequests();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDocType = DOC_TYPES.find((d) => d.value === form.document_type);
  const needsSerial = form.document_type === "warranty_certificate";
  const needsModel = ["datasheet", "warranty_certificate", "certificate_of_conformity"].includes(form.document_type);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FolderOpen size={20} className="text-primary" /> ศูนย์เอกสาร
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> ขอเอกสาร
        </button>
      </div>

      {/* Request Form */}
      {showForm && (
        <div className="card-surface rounded-xl p-5 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-foreground">ขอเอกสารใหม่</h3>

          {/* Document Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DOC_TYPES.map((doc) => (
              <button
                key={doc.value}
                onClick={() => setForm((f) => ({ ...f, document_type: doc.value }))}
                className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                  form.document_type === doc.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-secondary/30"
                }`}
              >
                <doc.icon size={16} className={form.document_type === doc.value ? "text-primary" : "text-muted-foreground"} />
                <div>
                  <p className="text-xs font-bold text-foreground">{doc.label}</p>
                  <p className="text-[10px] text-muted-foreground">{doc.desc}</p>
                  {doc.instant && (
                    <span className="text-[9px] px-1.5 py-0.5 mt-1 inline-block rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                      ดาวน์โหลดได้ทันที
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Additional fields */}
          {form.document_type && (
            <div className="space-y-3 pt-2 border-t border-border">
              {needsModel && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">รุ่นสินค้า</label>
                  <input
                    value={form.product_model}
                    onChange={(e) => setForm((f) => ({ ...f, product_model: e.target.value }))}
                    className={inputClass}
                    placeholder="เช่น GT9000, GK1501"
                  />
                </div>
              )}
              {needsSerial && (
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Serial Number (S/N)</label>
                  <input
                    value={form.serial_number}
                    onChange={(e) => setForm((f) => ({ ...f, serial_number: e.target.value }))}
                    className={inputClass}
                    placeholder="หมายเลข S/N บนตัวเครื่อง"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">หมายเหตุเพิ่มเติม</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  rows={2}
                  placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {submitting ? "กำลังส่ง..." : "ส่งคำขอ"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Request History */}
      <div className="card-surface rounded-xl p-5">
        <h3 className="text-sm font-bold text-foreground mb-4">ประวัติการขอเอกสาร</h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">ยังไม่มีประวัติการขอเอกสาร</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => {
              const docType = DOC_TYPES.find((d) => d.value === req.document_type);
              const status = statusConfig[req.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              return (
                <div key={req.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-foreground">{docType?.label || req.document_type}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                        <StatusIcon size={10} /> {status.label}
                      </span>
                    </div>
                    {req.product_model && (
                      <p className="text-[11px] text-muted-foreground">รุ่น: {req.product_model}</p>
                    )}
                    {req.serial_number && (
                      <p className="text-[11px] text-muted-foreground">S/N: {req.serial_number}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">{formatDate(req.created_at)}</p>
                    {req.admin_notes && (
                      <p className="text-[11px] text-primary mt-1">หมายเหตุ: {req.admin_notes}</p>
                    )}
                  </div>
                  {req.file_url && req.status === "ready" && (
                    <a
                      href={req.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-medium hover:bg-green-500/20 transition-colors shrink-0"
                    >
                      <Download size={12} /> ดาวน์โหลด
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;
