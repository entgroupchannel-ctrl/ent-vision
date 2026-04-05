import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  TrendingUp, Eye, Activity,
  Users, Flame, RefreshCw, FileText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// ─── Constants ───
const EVENT_LABELS: Record<string, string> = {
  product_view: "ดูสินค้า",
  wishlist_add: "เพิ่ม Wishlist",
  wishlist_remove: "ลบ Wishlist",
  share_line: "แชร์ LINE",
  share_facebook: "แชร์ Facebook",
  share_copy_link: "คัดลอกลิงก์",
  quote_request: "ขอใบเสนอราคา",
  contact_submit: "ส่งข้อความ",
  chat_inquiry: "สอบถาม AI Chat",
};

const EVENT_COLORS: Record<string, string> = {
  product_view: "#60a5fa",
  wishlist_add: "#f472b6",
  wishlist_remove: "#9ca3af",
  share_line: "#06C755",
  share_facebook: "#1877F2",
  share_copy_link: "#8b5cf6",
  quote_request: "#10b981",
  contact_submit: "#f97316",
  chat_inquiry: "#6366f1",
};

const PIE_COLORS = ["#60a5fa", "#f472b6", "#06C755", "#1877F2", "#f59e0b", "#8b5cf6", "#10b981", "#f97316", "#6366f1", "#9ca3af"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "เมื่อสักครู่";
  if (mins < 60) return `${mins} นาทีที่แล้ว`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
  const days = Math.floor(hours / 24);
  return `${days} วันที่แล้ว`;
}

interface EngagementEvent {
  id: string;
  session_id: string;
  event_type: string;
  product_id: string | null;
  product_name: string | null;
  product_category: string | null;
  created_at: string;
}

interface LeadScore {
  session_id: string | null;
  user_id: string | null;
  total_score: number | null;
  total_events: number | null;
  unique_products: number | null;
  last_activity: string | null;
  first_activity: string | null;
  categories: string[] | null;
}

const EngagementAnalytics = () => {
  const [events, setEvents] = useState<EngagementEvent[]>([]);
  const [leads, setLeads] = useState<LeadScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"24h" | "7d" | "30d">("7d");

  const fetchData = async () => {
    setLoading(true);
    try {
      const since = new Date();
      if (period === "24h") since.setHours(since.getHours() - 24);
      else if (period === "7d") since.setDate(since.getDate() - 7);
      else since.setDate(since.getDate() - 30);

      const [eventsRes, leadsRes] = await Promise.all([
        supabase
          .from("engagement_events")
          .select("*")
          .gte("created_at", since.toISOString())
          .order("created_at", { ascending: false })
          .limit(5000),
        supabase
          .from("engagement_lead_scores")
          .select("*")
          .order("total_score", { ascending: false })
          .limit(200),
      ]);

      if (eventsRes.data) setEvents(eventsRes.data);
      if (leadsRes.data) setLeads(leadsRes.data as LeadScore[]);
    } catch (err) {
      console.error("[engagement-analytics]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [period]);

  // ─── Computed Stats ───
  const uniqueSessions = new Set(events.map((e) => e.session_id)).size;
  const hotLeads = leads.filter((l) => (l.total_score ?? 0) >= 30);
  const warmLeads = leads.filter((l) => (l.total_score ?? 0) >= 10 && (l.total_score ?? 0) < 30);

  const totalViews = events.filter((e) => e.event_type === "product_view").length;
  const totalWishlist = events.filter((e) => e.event_type === "wishlist_add").length;
  const totalQuotes = events.filter((e) => e.event_type === "quote_request").length;
  const conversionRate = totalViews > 0 ? ((totalQuotes / totalViews) * 100).toFixed(1) : "0";

  // Event type breakdown for pie chart
  const eventBreakdown = Object.entries(
    events.reduce<Record<string, number>>((acc, e) => {
      acc[e.event_type] = (acc[e.event_type] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([type, count]) => ({ name: EVENT_LABELS[type] || type, value: count, type }))
    .sort((a, b) => b.value - a.value);

  // Top products
  const topProducts = Object.entries(
    events
      .filter((e) => e.product_id)
      .reduce<Record<string, { views: number; wishlists: number; shares: number; quotes: number; name: string; category: string }>>((acc, e) => {
        const pid = e.product_id!;
        if (!acc[pid]) acc[pid] = { views: 0, wishlists: 0, shares: 0, quotes: 0, name: e.product_name || pid, category: e.product_category || "" };
        if (e.event_type === "product_view") acc[pid].views++;
        if (e.event_type === "wishlist_add") acc[pid].wishlists++;
        if (e.event_type.startsWith("share_")) acc[pid].shares++;
        if (e.event_type === "quote_request") acc[pid].quotes++;
        return acc;
      }, {})
  )
    .map(([pid, data]) => ({ pid, ...data, total: data.views + data.wishlists * 3 + data.shares * 5 + data.quotes * 10 }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  // Recent events
  const recentEvents = events.slice(0, 20);

  return (
    <div className="space-y-6">
      {/* Period Selector + Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {(["24h", "7d", "30d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {p === "24h" ? "24 ชม." : p === "7d" ? "7 วัน" : "30 วัน"}
            </button>
          ))}
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          รีเฟรช
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Events ทั้งหมด", value: events.length, icon: Activity, color: "text-blue-400" },
          { label: "Visitors", value: uniqueSessions, icon: Users, color: "text-green-400" },
          { label: "Hot Leads", value: hotLeads.length, icon: Flame, color: "text-red-400" },
          { label: "Warm Leads", value: warmLeads.length, icon: TrendingUp, color: "text-yellow-400" },
          { label: "Conversion", value: `${conversionRate}%`, icon: FileText, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className={s.color} />
              <span className="text-[11px] text-muted-foreground">{s.label}</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Event Type Breakdown (Pie) */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Eye size={14} className="text-primary" /> สัดส่วน Event
          </h3>
          {eventBreakdown.length > 0 ? (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={eventBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                    {eventBreakdown.map((entry, i) => (
                      <Cell key={i} fill={EVENT_COLORS[entry.type] || PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v} ครั้ง`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1.5">
                {eventBreakdown.slice(0, 6).map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: EVENT_COLORS[item.type] || PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-muted-foreground truncate">{item.name}</span>
                    <span className="ml-auto font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">ยังไม่มีข้อมูล</p>
          )}
        </div>

        {/* Top Products (Bar) */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" /> สินค้ายอดนิยม
          </h3>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topProducts.slice(0, 6)} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`${v} คะแนน`]} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">ยังไม่มีข้อมูล</p>
          )}
        </div>
      </div>

      {/* Hot Leads Table */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Flame size={14} className="text-red-400" /> Hot Leads (คะแนน ≥ 30)
        </h3>
        {hotLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-2">Session</th>
                  <th className="text-right py-2 px-2">คะแนน</th>
                  <th className="text-right py-2 px-2">Events</th>
                  <th className="text-right py-2 px-2">สินค้า</th>
                  <th className="text-left py-2 px-2">หมวดหมู่</th>
                  <th className="text-right py-2 px-2">ล่าสุด</th>
                </tr>
              </thead>
              <tbody>
                {hotLeads.slice(0, 15).map((lead) => (
                  <tr key={lead.session_id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-2 px-2 font-mono text-muted-foreground">{(lead.session_id || "").slice(0, 12)}…</td>
                    <td className="py-2 px-2 text-right font-bold text-red-400">{lead.total_score}</td>
                    <td className="py-2 px-2 text-right">{lead.total_events}</td>
                    <td className="py-2 px-2 text-right">{lead.unique_products}</td>
                    <td className="py-2 px-2">{(lead.categories || []).slice(0, 2).join(", ")}</td>
                    <td className="py-2 px-2 text-right text-muted-foreground">{lead.last_activity ? timeAgo(lead.last_activity) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">ยังไม่มี Hot Leads</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-bold text-foreground mb-3">กิจกรรมล่าสุด</h3>
        {recentEvents.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {recentEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-3 text-xs py-1.5 border-b border-border/30">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: EVENT_COLORS[e.event_type] || "#9ca3af" }}
                />
                <span className="text-foreground font-medium">{EVENT_LABELS[e.event_type] || e.event_type}</span>
                {e.product_name && <span className="text-muted-foreground truncate max-w-[150px]">{e.product_name}</span>}
                <span className="ml-auto text-muted-foreground shrink-0">{timeAgo(e.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">ยังไม่มีกิจกรรม</p>
        )}
      </div>
    </div>
  );
};

export default EngagementAnalytics;
