import { useState, useEffect } from "react";
import {
  FolderOpen, Upload, FileText, Download, Clock, CheckCircle,
  XCircle, Loader2, Send, Trash2, Eye, RefreshCw, Search,
  Shield, BookOpen, Link2, ExternalLink, Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// ─── Types ───
interface DocRequest {
  id: string;
  user_id: string;
  document_type: string;
  product_model: string | null;
  serial_number: string | null;
  notes: string | null;
  status: string;
  file_url: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string | null;
  // joined
  user_email?: string;
}

interface DocLibraryItem {
  id: string;
  document_type: string;
  title: string;
  description: string | null;
  file_url: string;
  product_model: string | null;
  is_public: boolean;
  download_count: number;
  created_at: string;
}

// ─── Constants ───
const DOC_TYPE_LABELS: Record<string, string> = {
  vendor_registration: "Vendor Registration Form",
  company_profile: "Company Profile",
  catalog: "Product Catalog",
  warranty_certificate: "ใบรับประกัน",
  certificate_of_conformity: "Certificate of Conformity",
  datasheet: "Datasheet",
  boq_template: "BOQ Template",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "รอดำเนินการ", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  approved: { label: "อนุมัติ", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  ready: { label: "พร้อมดาวน์โหลด", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  rejected: { label: "ไม่อนุมัติ", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const AdminDocumentManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"requests" | "library">("requests");
  const [requests, setRequests] = useState<DocRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<DocRequest | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyForm, setReplyForm] = useState({ file_url: "", admin_notes: "", status: "ready" });

  // Library state
  const [libraryItems, setLibraryItems] = useState<DocLibraryItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    document_type: "catalog",
    title: "",
    description: "",
    file_url: "",
    product_model: "",
    is_public: true,
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  // ─── Fetch Requests ───
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await (supabase.from as any)("document_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setRequests(data);
    } catch { /* silent */ }
    setLoading(false);
  };

  // ─── Fetch Library ───
  const fetchLibrary = async () => {
    setLibraryLoading(true);
    try {
      const { data } = await (supabase.from as any)("document_library")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setLibraryItems(data);
    } catch { /* table may not exist yet */ }
    setLibraryLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    fetchLibrary();
  }, []);

  // ─── Handle Request Action ───
  const handleUpdateRequest = async (requestId: string, newStatus: string, fileUrl?: string, adminNotes?: string) => {
    setActionLoading(true);
    try {
      const updateData: Record<string, unknown> = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      if (fileUrl) updateData.file_url = fileUrl;
      if (adminNotes) updateData.admin_notes = adminNotes;

      const { error } = await (supabase.from as any)("document_requests")
        .update(updateData)
        .eq("id", requestId);
      if (error) throw error;

      // Send notification to user
      const request = requests.find((r) => r.id === requestId);
      if (request?.user_id) {
        const notifTitle = newStatus === "ready"
          ? "เอกสารพร้อมดาวน์โหลด"
          : newStatus === "rejected"
          ? "คำขอเอกสารไม่ได้รับอนุมัติ"
          : "สถานะเอกสารอัปเดต";
        const notifMsg = `${DOC_TYPE_LABELS[request.document_type] || request.document_type} — ${STATUS_CONFIG[newStatus]?.label || newStatus}`;

        await (supabase.from as any)("notifications").insert({
          user_id: request.user_id,
          type: "document_ready",
          title: notifTitle,
          message: notifMsg + (adminNotes ? ` (${adminNotes})` : ""),
          link: "/my-account/documents",
        }).catch(() => {});
      }

      toast({ title: "อัปเดตสำเร็จ" });
      setSelectedRequest(null);
      setReplyForm({ file_url: "", admin_notes: "", status: "ready" });
      fetchRequests();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Handle Library Upload ───
  const handleUploadToLibrary = async () => {
    if (!uploadForm.title || !uploadForm.file_url) {
      toast({ title: "กรุณากรอกชื่อเอกสารและ URL", variant: "destructive" });
      return;
    }
    setUploadLoading(true);
    try {
      const { error } = await (supabase.from as any)("document_library").insert({
        document_type: uploadForm.document_type,
        title: uploadForm.title,
        description: uploadForm.description || null,
        file_url: uploadForm.file_url,
        product_model: uploadForm.product_model || null,
        is_public: uploadForm.is_public,
        download_count: 0,
      });
      if (error) throw error;
      toast({ title: "เพิ่มเอกสารสำเร็จ" });
      setUploadForm({ document_type: "catalog", title: "", description: "", file_url: "", product_model: "", is_public: true });
      setShowUploadForm(false);
      fetchLibrary();
    } catch (err: any) {
      toast({ title: "เกิดข้อผิดพลาด", description: err.message, variant: "destructive" });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteLibraryItem = async (id: string) => {
    if (!confirm("ลบเอกสารนี้?")) return;
    await (supabase.from as any)("document_library").delete().eq("id", id);
    fetchLibrary();
    toast({ title: "ลบเอกสารแล้ว" });
  };

  // ─── Helpers ───
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const filteredRequests = statusFilter === "all"
    ? requests
    : requests.filter((r) => r.status === statusFilter);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  // ─── Render ───
  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === "requests" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          📋 คำขอเอกสาร {pendingCount > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">{pendingCount}</span>}
        </button>
        <button
          onClick={() => setActiveTab("library")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === "library" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          📂 คลังเอกสาร ({libraryItems.length})
        </button>
        <div className="ml-auto">
          <button
            onClick={() => { fetchRequests(); fetchLibrary(); }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> รีเฟรช
          </button>
        </div>
      </div>

      {/* ═══════ TAB: Document Requests ═══════ */}
      {activeTab === "requests" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left: List */}
          <div className="lg:col-span-3 space-y-3">
            {/* Filter */}
            <div className="flex gap-1">
              {[
                { value: "all", label: "ทั้งหมด" },
                { value: "pending", label: "รอดำเนินการ" },
                { value: "ready", label: "พร้อม" },
                { value: "rejected", label: "ไม่อนุมัติ" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    statusFilter === f.value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={20} className="animate-spin text-muted-foreground" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="card-surface rounded-xl p-8 text-center text-muted-foreground text-xs">
                ไม่มีคำขอเอกสาร
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredRequests.map((req) => {
                  const status = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
                  const isSelected = selectedRequest?.id === req.id;
                  return (
                    <button
                      key={req.id}
                      onClick={() => { setSelectedRequest(req); setReplyForm({ file_url: req.file_url || "", admin_notes: req.admin_notes || "", status: req.status }); }}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-secondary/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-foreground">
                          {DOC_TYPE_LABELS[req.document_type] || req.document_type}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      {req.product_model && <p className="text-[11px] text-muted-foreground">รุ่น: {req.product_model}</p>}
                      {req.serial_number && <p className="text-[11px] text-muted-foreground">S/N: {req.serial_number}</p>}
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        User: {req.user_id.slice(0, 8)}... · {formatDate(req.created_at)}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Detail + Actions */}
          <div className="lg:col-span-2">
            {selectedRequest ? (
              <div className="card-surface rounded-xl p-4 space-y-4 sticky top-24">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText size={14} className="text-primary" />
                  {DOC_TYPE_LABELS[selectedRequest.document_type] || selectedRequest.document_type}
                </h3>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">User ID:</span>
                    <span className="ml-2 text-foreground font-mono text-[11px]">{selectedRequest.user_id}</span>
                  </div>
                  {selectedRequest.product_model && (
                    <div>
                      <span className="text-muted-foreground">รุ่นสินค้า:</span>
                      <span className="ml-2 text-foreground">{selectedRequest.product_model}</span>
                    </div>
                  )}
                  {selectedRequest.serial_number && (
                    <div>
                      <span className="text-muted-foreground">Serial Number:</span>
                      <span className="ml-2 text-foreground font-mono">{selectedRequest.serial_number}</span>
                    </div>
                  )}
                  {selectedRequest.notes && (
                    <div>
                      <span className="text-muted-foreground block mb-1">หมายเหตุจาก User:</span>
                      <p className="bg-muted/30 rounded-lg p-2 text-foreground">{selectedRequest.notes}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">วันที่ขอ:</span>
                    <span className="ml-2 text-foreground">{formatDate(selectedRequest.created_at)}</span>
                  </div>
                </div>

                {/* Action Form */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">URL ไฟล์เอกสาร</label>
                    <input
                      value={replyForm.file_url}
                      onChange={(e) => setReplyForm((f) => ({ ...f, file_url: e.target.value }))}
                      className={inputClass}
                      placeholder="https://... (ลิงก์ไฟล์ PDF / Google Drive)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">หมายเหตุจาก Admin</label>
                    <textarea
                      value={replyForm.admin_notes}
                      onChange={(e) => setReplyForm((f) => ({ ...f, admin_notes: e.target.value }))}
                      className={`${inputClass} resize-none`}
                      rows={2}
                      placeholder="ข้อความถึงลูกค้า (ไม่บังคับ)"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateRequest(selectedRequest.id, "ready", replyForm.file_url, replyForm.admin_notes)}
                      disabled={actionLoading}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold hover:bg-green-500/20 transition-colors disabled:opacity-60"
                    >
                      {actionLoading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                      อนุมัติ + ส่งไฟล์
                    </button>
                    <button
                      onClick={() => handleUpdateRequest(selectedRequest.id, "rejected", undefined, replyForm.admin_notes)}
                      disabled={actionLoading}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-colors disabled:opacity-60"
                    >
                      <XCircle size={12} /> ปฏิเสธ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-surface rounded-xl p-8 text-center text-muted-foreground text-xs">
                <Eye size={24} className="mx-auto mb-2 opacity-30" />
                เลือกคำขอเพื่อดูรายละเอียด
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════ TAB: Document Library ═══════ */}
      {activeTab === "library" && (
        <div className="space-y-4">
          {/* Upload button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} /> เพิ่มเอกสาร
            </button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <div className="card-surface rounded-xl p-5 space-y-3 animate-fade-in">
              <h3 className="text-sm font-bold text-foreground">เพิ่มเอกสารเข้าคลัง</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">ประเภทเอกสาร</label>
                  <select
                    value={uploadForm.document_type}
                    onChange={(e) => setUploadForm((f) => ({ ...f, document_type: e.target.value }))}
                    className={inputClass}
                  >
                    {Object.entries(DOC_TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">ชื่อเอกสาร *</label>
                  <input
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm((f) => ({ ...f, title: e.target.value }))}
                    className={inputClass}
                    placeholder="เช่น ENT Group Company Profile 2025"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">URL ไฟล์ *</label>
                  <input
                    value={uploadForm.file_url}
                    onChange={(e) => setUploadForm((f) => ({ ...f, file_url: e.target.value }))}
                    className={inputClass}
                    placeholder="https://... (Supabase Storage / Google Drive)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">รุ่นสินค้า (ถ้ามี)</label>
                  <input
                    value={uploadForm.product_model}
                    onChange={(e) => setUploadForm((f) => ({ ...f, product_model: e.target.value }))}
                    className={inputClass}
                    placeholder="เช่น GT9000"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-foreground mb-1">คำอธิบาย</label>
                  <input
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm((f) => ({ ...f, description: e.target.value }))}
                    className={inputClass}
                    placeholder="คำอธิบายสั้นๆ"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={uploadForm.is_public}
                    onChange={(e) => setUploadForm((f) => ({ ...f, is_public: e.target.checked }))}
                    className="rounded border-border text-primary w-4 h-4"
                  />
                  <span className="text-xs text-muted-foreground">สาธารณะ (User ดาวน์โหลดได้ทันทีเมื่อขอ)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleUploadToLibrary}
                  disabled={uploadLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {uploadLoading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                  บันทึก
                </button>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}

          {/* Library List */}
          <div className="card-surface rounded-xl p-5">
            {libraryLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-muted-foreground" />
              </div>
            ) : libraryItems.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen size={32} className="mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">ยังไม่มีเอกสารในคลัง</p>
                <p className="text-xs text-muted-foreground/60 mt-1">กดปุ่ม "เพิ่มเอกสาร" เพื่อเริ่มเพิ่ม</p>
              </div>
            ) : (
              <div className="space-y-2">
                {libraryItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/20 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{item.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {DOC_TYPE_LABELS[item.document_type] || item.document_type}
                        </span>
                        {item.is_public && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                            สาธารณะ
                          </span>
                        )}
                      </div>
                      {item.description && <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>}
                      {item.product_model && <p className="text-[10px] text-muted-foreground">รุ่น: {item.product_model}</p>}
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        ดาวน์โหลด {item.download_count} ครั้ง · {formatDate(item.created_at)}
                      </p>
                    </div>
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors shrink-0"
                      title="เปิดไฟล์"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => handleDeleteLibraryItem(item.id)}
                      className="text-muted-foreground/40 hover:text-destructive transition-colors shrink-0"
                      title="ลบ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocumentManager;
