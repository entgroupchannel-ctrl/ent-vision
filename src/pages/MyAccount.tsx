import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User, FileText, Heart, FolderOpen, Bell, Wrench,
  ArrowLeft, LogOut, Shield, PanelLeftClose, PanelLeft,
  Plus,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import FooterCompact from "@/components/FooterCompact";

// ─── Lazy-import child pages (render inline, no routing) ───
import MyProfile from "@/pages/MyProfile";
import MyAccountQuotes from "@/pages/MyAccountQuotes";
import MyAccountWishlist from "@/pages/MyAccountWishlist";
import MyDocuments from "@/pages/MyDocuments";
import MyNotifications from "@/pages/MyNotifications";
import MyDemos from "@/pages/MyDemos";
import UserQuoteCreate from "@/pages/UserQuoteCreate";

type Tab = "profile" | "quotes" | "quote_create" | "wishlist" | "documents" | "notifications" | "demos";

const MyAccount = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect initial tab from URL for backward compatibility
  const getTabFromPath = (path: string): Tab => {
    if (path.includes("/quotes/create")) return "quote_create";
    if (path.includes("/quotes")) return "quotes";
    if (path.includes("/wishlist")) return "wishlist";
    if (path.includes("/documents")) return "documents";
    if (path.includes("/notifications")) return "notifications";
    if (path.includes("/demos")) return "demos";
    return "profile";
  };

  // Check sessionStorage for tab override (from FloatingQuoteBar)
  const getInitialTab = (): Tab => {
    try {
      const override = sessionStorage.getItem("ent_myaccount_tab");
      if (override) {
        sessionStorage.removeItem("ent_myaccount_tab");
        return override as Tab;
      }
    } catch { /* silent */ }
    return getTabFromPath(location.pathname);
  };

  const [tab, setTab] = useState<Tab>(getInitialTab());
  const [sidebarMode, setSidebarMode] = useState<"full" | "icon" | "hidden">("full");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin-login", { replace: true });
    }
  }, [authLoading, user, navigate]);

  // Fetch unread notification count
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { count } = await (supabase.from as any)("notifications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("read", false);
        setUnreadCount(count || 0);
      } catch { /* silent */ }
    })();
  }, [user, tab]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // Menu items
  const menuItems: { id: Tab; label: string; icon: typeof User; badge?: number }[] = [
    { id: "profile", label: "โปรไฟล์ของฉัน", icon: User },
    { id: "quotes", label: "ใบเสนอราคา", icon: FileText },
    { id: "quote_create", label: "สร้างใบเสนอราคา", icon: Plus },
    { id: "wishlist", label: "รายการถูกใจ", icon: Heart },
    { id: "documents", label: "ศูนย์เอกสาร", icon: FolderOpen },
    { id: "notifications", label: "แจ้งเตือน", icon: Bell, badge: unreadCount },
    { id: "demos", label: "ทดลองใช้งาน", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="บัญชีของฉัน — ENT Group" description="จัดการบัญชี โปรไฟล์ ใบเสนอราคา และเอกสาร" path="/my-account" />

      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-primary hover:underline flex items-center gap-1.5">
                <ArrowLeft size={14} /> กลับหน้าหลัก
              </Link>
              <h1 className="text-xl font-display font-bold text-foreground">บัญชีของฉัน</h1>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 hover:bg-primary/20 transition-colors"
                >
                  <Shield size={12} /> Admin Dashboard
                </Link>
              )}
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={16} /> ออก
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-0">
          {/* ═══ Sidebar — 3 states ═══ */}
          {sidebarMode !== "hidden" && (
            <aside
              className={`shrink-0 hidden md:block transition-all duration-200 ${
                sidebarMode === "full" ? "w-56" : "w-14"
              }`}
              style={{ marginRight: sidebarMode === "full" ? 20 : 10 }}
            >
              <nav className="card-surface rounded-xl p-2 sticky top-20">
                {/* Toggle */}
                <button
                  onClick={() => setSidebarMode(sidebarMode === "full" ? "icon" : "full")}
                  className="w-full flex items-center justify-center py-2 mb-1 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-secondary/60 transition-colors"
                  title={sidebarMode === "full" ? "ยุบเมนู" : "ขยายเมนู"}
                >
                  {sidebarMode === "full" ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
                </button>

                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                      tab === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    } ${sidebarMode === "icon" ? "justify-center" : ""}`}
                    title={sidebarMode === "icon" ? item.label : undefined}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {sidebarMode === "full" && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {sidebarMode === "full" && item.badge && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                    {sidebarMode === "icon" && item.badge && item.badge > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
                    )}
                  </button>
                ))}

                {/* Hide sidebar */}
                <div className="border-t border-border/50 mt-2 pt-1">
                  <button
                    onClick={() => setSidebarMode("hidden")}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground/40 hover:text-foreground hover:bg-secondary/60 transition-colors"
                    title="ซ่อนเมนูทั้งหมด"
                  >
                    <PanelLeftClose size={12} className="shrink-0" />
                    {sidebarMode === "full" && <span>ซ่อนเมนู</span>}
                  </button>
                </div>
              </nav>
            </aside>
          )}

          {/* ═══ Mobile tab bar ═══ */}
          <div className="md:hidden w-full mb-4 overflow-x-auto flex gap-1 border-b border-border pb-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors relative ${
                  tab === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/60"
                }`}
              >
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="ml-1 px-1 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ═══ Main Content ═══ */}
          <main className="flex-1 min-w-0">
            {/* Show sidebar button when hidden */}
            {sidebarMode === "hidden" && (
              <button
                onClick={() => setSidebarMode("icon")}
                className="hidden md:flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <PanelLeft size={12} /> แสดงเมนู
              </button>
            )}

            {/* Render active tab */}
            {tab === "profile" && <MyProfile />}
            {tab === "quotes" && <MyAccountQuotes />}
            {tab === "quote_create" && <UserQuoteCreate />}
            {tab === "wishlist" && <MyAccountWishlist />}
            {tab === "documents" && <MyDocuments />}
            {tab === "notifications" && <MyNotifications />}
            {tab === "demos" && <MyDemos />}
          </main>
        </div>
      </div>

      <FooterCompact className="mt-auto" />
    </div>
  );
};

export default MyAccount;
