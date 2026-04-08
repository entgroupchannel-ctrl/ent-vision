import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider, QueryCache, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { I18nProvider } from "@/contexts/I18nContext";
import { AuthProvider } from "@/hooks/useAuth";
import { QuoteCartProvider } from "@/hooks/useQuoteCart";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import SocialRibbon from "./components/SocialRibbon.tsx";
import LiveChatWidget from "./components/LiveChatWidget.tsx";
import FloatingQuoteBar from "./components/FloatingQuoteBar.tsx";
import GlobalFloatingToolbar from "./components/GlobalFloatingToolbar.tsx";

/* ── Lazy-loaded pages ── */
const GTSeries = lazy(() => import("./pages/GTSeries.tsx"));
const GBSeries = lazy(() => import("./pages/GBSeries.tsx"));
const EPCBoxSeries = lazy(() => import("./pages/EPCBoxSeries.tsx"));
const MiniPC = lazy(() => import("./pages/MiniPC.tsx"));
const WaterproofPC = lazy(() => import("./pages/WaterproofPC.tsx"));
const Volktek = lazy(() => import("./pages/Volktek.tsx"));
const EPCSeries = lazy(() => import("./pages/EPCSeries.tsx"));
const RuggedTablet = lazy(() => import("./pages/RuggedTablet.tsx"));
const Handheld = lazy(() => import("./pages/Handheld.tsx"));
const GKSeries = lazy(() => import("./pages/GKSeries.tsx"));
const PanelPCGTG = lazy(() => import("./pages/PanelPCGTG.tsx"));
const SmartDisplay = lazy(() => import("./pages/SmartDisplay.tsx"));
const Promotions = lazy(() => import("./pages/Promotions.tsx"));
const UTCSeries = lazy(() => import("./pages/UTCSeries.tsx"));
const MiniPCFirewall = lazy(() => import("./pages/MiniPCFirewall.tsx"));
const VCloudPoint = lazy(() => import("./pages/VCloudPoint.tsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.tsx"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest.tsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const MemberRegister = lazy(() => import("./pages/MemberRegister.tsx"));
const MyQuotes = lazy(() => import("./pages/MyQuotes.tsx"));
const WelcomeMember = lazy(() => import("./pages/WelcomeMember.tsx"));
const Warrantys = lazy(() => import("./pages/Warrantys.tsx"));
const Payment = lazy(() => import("./pages/Payment.tsx"));
const Delivery = lazy(() => import("./pages/Delivery.tsx"));
const Cabinets = lazy(() => import("./pages/Cabinets.tsx"));
const IBoxSeries = lazy(() => import("./pages/IBoxSeries.tsx"));
const IBoxDetail = lazy(() => import("./pages/IBoxDetail.tsx"));
const RuggedHandheldDetail = lazy(() => import("./pages/RuggedHandheldDetail.tsx"));
const RuggedTabletDetail = lazy(() => import("./pages/RuggedTabletDetail.tsx"));
const WishlistPage = lazy(() => import("./pages/WishlistPage.tsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
const ProductAdvisor = lazy(() => import("./pages/ProductAdvisor.tsx"));
const RuggedNotebook = lazy(() => import("./pages/RuggedNotebook.tsx"));
const RuggedNotebookDetail = lazy(() => import("./pages/RuggedNotebookDetail.tsx"));
const AllInOnePC = lazy(() => import("./pages/AllInOnePC.tsx"));
const AIODetail = lazy(() => import("./pages/AIODetail.tsx"));
const CaseStudies = lazy(() => import("./pages/CaseStudies.tsx"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail.tsx"));
const CorporatePricing = lazy(() => import("./pages/CorporatePricing.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const MyAccount = lazy(() => import("./pages/MyAccount.tsx"));
const QuoteBuilder = lazy(() => import("./pages/QuoteBuilder.tsx"));
const PlatformTour = lazy(() => import("./pages/PlatformTour.tsx"));
const AdminLiveChatPage = lazy(() => import("./pages/AdminLiveChat.tsx"));

/* ── Loading fallback ── */
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">กำลังโหลด...</span>
    </div>
  </div>
);

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      const status = error?.status ?? error?.code ?? error?.statusCode;
      const message = String(error?.message || "").toLowerCase();
      const is401 =
        status === 401 ||
        status === "401" ||
        status === "PGRST301" ||
        message.includes("jwt expired") ||
        message.includes("invalid jwt") ||
        message.includes("unauthorized");

      if (is401 && window.location.pathname.startsWith("/admin")) {
        console.warn("[Auth] Session expired — redirecting to login");
        try {
          Object.keys(localStorage).forEach((k) => {
            if (k.includes("auth-token") || k.includes("supabase")) {
              localStorage.removeItem(k);
            }
          });
        } catch {}
        window.location.replace("/admin-login");
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // DISABLED: We handle refetch manually in AppInner after token recovery
      refetchOnReconnect: true,
      staleTime: 60_000,
      gcTime: 30 * 60_000,
      networkMode: "always",
      retry: (failureCount, error: any) => {
        const status = error?.status ?? error?.code;
        if (status === 401 || status === "401" || status === "PGRST301") return false;
        return failureCount < 1;
      },
      retryDelay: 1000,
    },
    mutations: {
      retry: 0,
      networkMode: "always",
    },
  },
});

const AppInner = () => {
  const qc = useQueryClient();

  useEffect(() => {
    // ═══════════════════════════════════════════════════════════════════════
    // Session Recovery v2 — Fixes "silent death" after tab switch
    // ═══════════════════════════════════════════════════════════════════════
    // Key fixes:
    // 1. expires_at is Unix seconds → multiply by 1000 for JS Date
    // 2. In-flight guard prevents concurrent refresh from visibility + health check
    // 3. Only refetch active queries instead of global invalidateQueries()
    // 4. Skip refresh if token still has > 2 min left
    // ═══════════════════════════════════════════════════════════════════════

    let lastHiddenTime: number | null = null;
    let isRefreshing = false;
    const STALE_THRESHOLD = 30 * 1000; // 30 seconds

    /** Convert Supabase expires_at (Unix seconds) to milliseconds */
    const expiresAtToMs = (expiresAt: number | string | undefined | null): number => {
      if (!expiresAt) return 0;
      const num = typeof expiresAt === 'string' ? parseInt(expiresAt, 10) : expiresAt;
      // Supabase returns Unix seconds; if it looks like seconds (< year 2100 in seconds), convert
      if (num < 10_000_000_000) return num * 1000;
      return num; // already milliseconds
    };

    /** Guarded session refresh — prevents concurrent calls */
    const guardedRefresh = async (source: string): Promise<boolean> => {
      if (isRefreshing) {
        console.log(`[Session] Skipping ${source} — refresh already in-flight`);
        return false;
      }
      isRefreshing = true;
      try {
        const refreshPromise = supabase.auth.refreshSession();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Refresh timeout')), 5000)
        );

        const { data, error } = await Promise.race([
          refreshPromise,
          timeoutPromise,
        ]) as any;

        if (error) {
          console.error(`[Session] ${source} refresh failed:`, error.message);
          return false;
        }

        if (data?.session) {
          const expiresIn = Math.round(
            (expiresAtToMs(data.session.expires_at) - Date.now()) / 1000
          );
          console.log(`[Session] ${source} refreshed OK, expires in ${expiresIn}s`);
        }
        return true;
      } catch (e: any) {
        console.error(`[Session] ${source} error:`, e.message);
        return false;
      } finally {
        isRefreshing = false;
      }
    };

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        lastHiddenTime = Date.now();
        return;
      }

      const hiddenDuration = lastHiddenTime ? Date.now() - lastHiddenTime : 0;
      lastHiddenTime = null;

      if (hiddenDuration < STALE_THRESHOLD) return;

      console.log('[Session] Tab visible after', Math.round(hiddenDuration / 1000), 's');

      // Check if token actually needs refresh before hitting the network
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) return; // not logged in

        const timeLeftMs = expiresAtToMs(data.session.expires_at) - Date.now();
        const timeLeftS = Math.round(timeLeftMs / 1000);

        if (timeLeftS > 120) {
          console.log(`[Session] Token still valid (${timeLeftS}s left), skipping refresh`);
          // Just refetch active queries with existing valid token
          qc.refetchQueries({ type: 'active' });
          return;
        }

        console.log(`[Session] Token expiring soon (${timeLeftS}s), refreshing...`);
        const ok = await guardedRefresh('visibility');
        if (ok) {
          qc.refetchQueries({ type: 'active' });
        } else {
          // Last resort: reload page
          console.log('[Session] Forcing reload as fallback...');
          window.location.reload();
        }
      } catch (e: any) {
        console.error('[Session] Recovery error:', e.message);
        window.location.reload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ── Periodic health check (every 4 min instead of 2) ──
    const healthCheckInterval = setInterval(async () => {
      if (document.hidden) return;

      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) return;

        const timeLeftS = Math.round(
          (expiresAtToMs(data.session.expires_at) - Date.now()) / 1000
        );

        // Only log if something interesting
        if (timeLeftS < 300) {
          console.log('[Session Health] Token expires in', timeLeftS, 's');
        }

        if (timeLeftS < 120) {
          console.log('[Session Health] Token expiring soon, refreshing...');
          const ok = await guardedRefresh('health-check');
          if (ok) {
            qc.refetchQueries({ type: 'active' });
          }
        }
      } catch (e) {
        console.error('[Session Health] Check failed:', e);
      }
    }, 4 * 60 * 1000);

    return () => {
      clearInterval(healthCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [qc]);

  return null;
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <I18nProvider>
      <AuthProvider>
        <QuoteCartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppInner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/gt-series" element={<GTSeries />} />
                <Route path="/gb-series" element={<GBSeries />} />
                <Route path="/epc-box-series" element={<EPCBoxSeries />} />
                <Route path="/gk-series" element={<GKSeries />} />
                <Route path="/mini-pc" element={<MiniPC />} />
                <Route path="/waterproof-pc" element={<WaterproofPC />} />
                <Route path="/volktek" element={<Volktek />} />
                <Route path="/epc-series" element={<EPCSeries />} />
                <Route path="/rugged-tablet" element={<RuggedTablet />} />
                <Route path="/handheld" element={<Handheld />} />
                <Route path="/panel-pc-gtg" element={<PanelPCGTG />} />
                <Route path="/smart-display" element={<SmartDisplay />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/utc-series" element={<UTCSeries />} />
                <Route path="/minipc-firewall" element={<MiniPCFirewall />} />
                <Route path="/mini-pc-firewall" element={<MiniPCFirewall />} />
                <Route path="/vcloudpoint" element={<VCloudPoint />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/quote" element={<QuoteRequest />} />
                <Route path="/quote-builder" element={<QuoteBuilder />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/member-register" element={<MemberRegister />} />
                <Route path="/my-quotes" element={<MyQuotes />} />
                <Route path="/welcome-member" element={<WelcomeMember />} />
                <Route path="/warrantys" element={<Warrantys />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/cabinets" element={<Cabinets />} />
                <Route path="/ibox-series" element={<IBoxSeries />} />
                <Route path="/ibox-series/:id" element={<IBoxDetail />} />
                <Route path="/handheld/:id" element={<RuggedHandheldDetail />} />
                <Route path="/rugged-tablet/:id" element={<RuggedTabletDetail />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/product-advisor" element={<ProductAdvisor />} />
                <Route path="/rugged-notebook" element={<RuggedNotebook />} />
                <Route path="/rugged-notebook/:id" element={<RuggedNotebookDetail />} />
                <Route path="/aio" element={<AllInOnePC />} />
                <Route path="/aio/:id" element={<AIODetail />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                <Route path="/corporate-pricing" element={<CorporatePricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/my-account/*" element={<MyAccount />} />
                <Route path="/platform" element={<PlatformTour />} />
                <Route path="/admin/livechat" element={<AdminLiveChatPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            
            <SocialRibbon />
            <FloatingQuoteBar />
            <GlobalFloatingToolbar />
            <LiveChatWidget />
          </BrowserRouter>
        </TooltipProvider>
        </QuoteCartProvider>
      </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
