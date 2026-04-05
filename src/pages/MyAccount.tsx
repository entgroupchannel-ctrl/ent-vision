import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  User, FileText, Heart, FolderOpen, Bell, Wrench,
  ArrowLeft, LogOut, ChevronRight, Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import FooterCompact from "@/components/FooterCompact";

const menuItems = [
  { id: "profile", label: "โปรไฟล์ของฉัน", icon: User, href: "/my-account" },
  { id: "quotes", label: "ใบเสนอราคา", icon: FileText, href: "/my-account/quotes" },
  { id: "wishlist", label: "รายการถูกใจ", icon: Heart, href: "/my-account/wishlist" },
  { id: "documents", label: "ศูนย์เอกสาร", icon: FolderOpen, href: "/my-account/documents" },
  { id: "notifications", label: "แจ้งเตือน", icon: Bell, href: "/my-account/notifications" },
  { id: "demos", label: "ทดลองใช้งาน", icon: Wrench, href: "/my-account/demos" },
];

const MyAccount = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
  }, [user, location.pathname]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="บัญชีของฉัน — ENT Group" description="จัดการบัญชี โปรไฟล์ ใบเสนอราคา และเอกสาร" path="/my-account" />

      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xs text-primary hover:underline flex items-center gap-1">
                <ArrowLeft size={12} /> กลับหน้าหลัก
              </Link>
              <h1 className="text-lg font-display font-bold text-foreground">บัญชีของฉัน</h1>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 hover:bg-primary/20 transition-colors"
                >
                  <Shield size={10} /> Admin Dashboard
                </Link>
              )}
              <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={14} /> ออก
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
            <nav className="card-surface rounded-xl p-2 space-y-0.5">
              {menuItems.map((item) => {
                const isActive =
                  item.href === "/my-account"
                    ? currentPath === "/my-account"
                    : currentPath.startsWith(item.href);
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                    {item.id === "notifications" && unreadCount > 0 && (
                      <span className="ml-auto px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                    {!isActive && item.id !== "notifications" && (
                      <ChevronRight size={12} className="ml-auto opacity-30" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <FooterCompact />
    </div>
  );
};

export default MyAccount;
