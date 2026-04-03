import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Users, FileText, Mail, TrendingUp,
  Filter, RefreshCw, Eye, Clock, CheckCircle, XCircle,
  Star, Phone, Building2, MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Tab = "contacts" | "quotes" | "subscribers";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  qualified: "bg-primary/10 text-primary border-primary/20",
  closed: "bg-muted text-muted-foreground border-border",
  quoted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  negotiating: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  won: "bg-green-500/10 text-green-400 border-green-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  new: "ใหม่",
  contacted: "ติดต่อแล้ว",
  qualified: "มีศักยภาพ",
  closed: "ปิดแล้ว",
  quoted: "ส่งใบเสนอราคาแล้ว",
  negotiating: "เจรจา",
  won: "สำเร็จ",
  lost: "ไม่สำเร็จ",
};

const LeadScoreBadge = ({ score }: { score: number }) => {
  const color =
    score >= 60 ? "text-green-400" :
    score >= 40 ? "text-yellow-400" :
    score >= 20 ? "text-orange-400" : "text-muted-foreground";
  return (
    <span className={`flex items-center gap-1 text-xs font-bold ${color}`}>
      <Star size={12} /> {score}
    </span>
  );
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const [c, q, s] = await Promise.all([
      (supabase.from as any)("contact_submissions").select("*").order("created_at", { ascending: false }),
      (supabase.from as any)("quote_requests").select("*").order("created_at", { ascending: false }),
      (supabase.from as any)("subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    if (c.data) setContacts(c.data);
    if (q.data) setQuotes(q.data);
    if (s.data) setSubscribers(s.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (table: string, id: string, status: string) => {
    const { error } = await (supabase.from(table as any) as any).update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "อัปเดตสถานะเรียบร้อย" });
      fetchData();
    }
  };

  const stats = {
    totalContacts: contacts.length,
    totalQuotes: quotes.length,
    totalSubscribers: subscribers.length,
    newLeads: contacts.filter(c => c.status === "new").length + quotes.filter(q => q.status === "new").length,
    highScoreLeads: [...contacts, ...quotes].filter(i => i.lead_score >= 50).length,
  };

  const filteredContacts = statusFilter === "all" ? contacts : contacts.filter(c => c.status === statusFilter);
  const filteredQuotes = statusFilter === "all" ? quotes : quotes.filter(q => q.status === statusFilter);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("th-TH", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xs text-primary hover:underline flex items-center gap-1">
                <ArrowLeft size={12} /> กลับหน้าหลัก
              </Link>
              <h1 className="text-lg font-display font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> รีเฟรช
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "ติดต่อเข้ามา", value: stats.totalContacts, icon: MessageSquare, color: "text-blue-400" },
            { label: "ขอใบเสนอราคา", value: stats.totalQuotes, icon: FileText, color: "text-purple-400" },
            { label: "สมาชิก", value: stats.totalSubscribers, icon: Mail, color: "text-green-400" },
            { label: "Lead ใหม่", value: stats.newLeads, icon: Users, color: "text-yellow-400" },
            { label: "Lead คุณภาพสูง", value: stats.highScoreLeads, icon: TrendingUp, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="card-surface rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon size={14} className={s.color} />
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 border-b border-border">
          {([
            { id: "contacts" as Tab, label: "ติดต่อเข้ามา", count: contacts.length },
            { id: "quotes" as Tab, label: "ใบเสนอราคา", count: quotes.length },
            { id: "subscribers" as Tab, label: "สมาชิก", count: subscribers.length },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setStatusFilter("all"); setSelectedItem(null); }}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label} <span className="text-xs opacity-60">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Filter */}
        {tab !== "subscribers" && (
          <div className="flex items-center gap-2 mb-4">
            <Filter size={14} className="text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="all">ทั้งหมด</option>
              {(tab === "contacts"
                ? ["new", "contacted", "qualified", "closed"]
                : ["new", "quoted", "negotiating", "won", "lost"]
              ).map((s) => (
                <option key={s} value={s}>{statusLabels[s]}</option>
              ))}
            </select>
          </div>
        )}

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* List */}
          <div className="lg:col-span-2 space-y-2">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground text-sm">กำลังโหลด...</div>
            ) : tab === "contacts" ? (
              filteredContacts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">ยังไม่มีข้อมูล</div>
              ) : filteredContacts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem({ ...item, _type: "contact" })}
                  className={`w-full text-left card-surface rounded-xl p-4 hover:border-primary/30 transition-colors ${
                    selectedItem?.id === item.id ? "border-primary/50 ring-1 ring-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-foreground">{item.name}</span>
                      {item.company && (
                        <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1 inline-flex">
                          <Building2 size={10} /> {item.company}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <LeadScoreBadge score={item.lead_score} />
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{item.message}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
                    <span>{item.email}</span>
                    {item.phone && <span className="flex items-center gap-0.5"><Phone size={8} /> {item.phone}</span>}
                    <span className="flex items-center gap-0.5"><Clock size={8} /> {formatDate(item.created_at)}</span>
                  </div>
                </button>
              ))
            ) : tab === "quotes" ? (
              filteredQuotes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">ยังไม่มีข้อมูล</div>
              ) : filteredQuotes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem({ ...item, _type: "quote" })}
                  className={`w-full text-left card-surface rounded-xl p-4 hover:border-primary/30 transition-colors ${
                    selectedItem?.id === item.id ? "border-primary/50 ring-1 ring-primary/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-foreground">{item.name}</span>
                      {item.company && (
                        <span className="ml-2 text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Building2 size={10} /> {item.company}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <LeadScoreBadge score={item.lead_score} />
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    สินค้า: {Array.isArray(item.products) ? item.products.filter((p: any) => p.category).map((p: any) => p.category).join(", ") || "ไม่ระบุ" : "ไม่ระบุ"}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
                    <span>{item.email}</span>
                    {item.phone && <span className="flex items-center gap-0.5"><Phone size={8} /> {item.phone}</span>}
                    <span className="flex items-center gap-0.5"><Clock size={8} /> {formatDate(item.created_at)}</span>
                  </div>
                </button>
              ))
            ) : (
              subscribers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">ยังไม่มีสมาชิก</div>
              ) : subscribers.map((item) => (
                <div key={item.id} className="card-surface rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-foreground">{item.email}</span>
                      {item.name && <span className="ml-2 text-xs text-muted-foreground">({item.name})</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.is_active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                      <span className="text-[10px] text-muted-foreground/70">{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedItem ? (
              <div className="card-surface rounded-xl p-5 sticky top-20">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Eye size={14} /> รายละเอียด
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">ชื่อ:</span>
                    <span className="ml-2 text-foreground font-medium">{selectedItem.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">อีเมล:</span>
                    <a href={`mailto:${selectedItem.email}`} className="ml-2 text-primary hover:underline">{selectedItem.email}</a>
                  </div>
                  {selectedItem.phone && (
                    <div>
                      <span className="text-muted-foreground">โทรศัพท์:</span>
                      <a href={`tel:${selectedItem.phone}`} className="ml-2 text-primary hover:underline">{selectedItem.phone}</a>
                    </div>
                  )}
                  {selectedItem.company && (
                    <div>
                      <span className="text-muted-foreground">บริษัท:</span>
                      <span className="ml-2 text-foreground">{selectedItem.company}</span>
                    </div>
                  )}
                  {selectedItem.line_id && (
                    <div>
                      <span className="text-muted-foreground">LINE:</span>
                      <span className="ml-2 text-foreground">{selectedItem.line_id}</span>
                    </div>
                  )}
                  {selectedItem.whatsapp && (
                    <div>
                      <span className="text-muted-foreground">WhatsApp:</span>
                      <span className="ml-2 text-foreground">{selectedItem.whatsapp}</span>
                    </div>
                  )}
                  {selectedItem.callback_time && (
                    <div>
                      <span className="text-muted-foreground">เวลาติดต่อ:</span>
                      <span className="ml-2 text-foreground">{selectedItem.callback_time}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground">Lead Score:</span>
                    <span className="ml-2"><LeadScoreBadge score={selectedItem.lead_score} /></span>
                  </div>

                  {selectedItem._type === "contact" && (
                    <>
                      {selectedItem.category && (
                        <div>
                          <span className="text-muted-foreground">หมวดหมู่:</span>
                          <span className="ml-2 text-foreground">{selectedItem.category}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground block mb-1">ข้อความ:</span>
                        <p className="text-foreground bg-muted/30 rounded-lg p-3 text-xs leading-relaxed">{selectedItem.message}</p>
                      </div>
                    </>
                  )}

                  {selectedItem._type === "quote" && (
                    <>
                      <div>
                        <span className="text-muted-foreground block mb-1">สินค้า:</span>
                        <div className="space-y-1">
                          {Array.isArray(selectedItem.products) && selectedItem.products.filter((p: any) => p.category).map((p: any, i: number) => (
                            <div key={i} className="bg-muted/30 rounded-lg p-2 text-xs">
                              <span className="font-medium">{p.category}</span>
                              {p.model && <span className="text-muted-foreground ml-1">— {p.model}</span>}
                              <span className="text-primary ml-1">×{p.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {selectedItem.details && (
                        <div>
                          <span className="text-muted-foreground block mb-1">รายละเอียด:</span>
                          <p className="text-foreground bg-muted/30 rounded-lg p-3 text-xs leading-relaxed">{selectedItem.details}</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Status update */}
                  <div className="pt-3 border-t border-border">
                    <label className="text-muted-foreground block mb-1.5">เปลี่ยนสถานะ:</label>
                    <select
                      value={selectedItem.status}
                      onChange={(e) => {
                        const table = selectedItem._type === "contact" ? "contact_submissions" : "quote_requests";
                        updateStatus(table, selectedItem.id, e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground"
                    >
                      {(selectedItem._type === "contact"
                        ? ["new", "contacted", "qualified", "closed"]
                        : ["new", "quoted", "negotiating", "won", "lost"]
                      ).map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-surface rounded-xl p-8 text-center text-muted-foreground text-xs">
                <Eye size={24} className="mx-auto mb-2 opacity-30" />
                เลือกรายการเพื่อดูรายละเอียด
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
