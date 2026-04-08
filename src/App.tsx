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
      refetchOnWindowFocus: true, // ENABLED: Auto-refetch when tab becomes visible
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
    // Session Recovery Handler (No Reload Version)
    // ═══════════════════════════════════════════════════════════════════════
    // When tab becomes visible after being hidden for >30s, we:
    // 1. Refresh Supabase session (in case token expired while away)
    // 2. Invalidate React Query cache (triggers refetch of all queries)
    // This recovers from stale state WITHOUT full page reload.
    // ═══════════════════════════════════════════════════════════════════════

    let lastHiddenTime: number | null = null;
    const STALE_THRESHOLD = 30 * 1000; // 30 seconds

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        lastHiddenTime = Date.now();
        console.log('[Session] Tab hidden');
      } else {
        const hiddenDuration = lastHiddenTime ? Date.now() - lastHiddenTime : 0;
        console.log('[Session] Tab visible after', Math.round(hiddenDuration / 1000), 'seconds');

        if (hiddenDuration >= STALE_THRESHOLD) {
          console.log('[Session] Recovering session (no reload)...');
          
          try {
            // 1. Force refresh Supabase session
            const { data, error } = await supabase.auth.getSession();
            if (error) {
              console.error('[Session] getSession error:', error);
            } else {
              console.log('[Session] Session status:', data.session ? 'valid' : 'none');
            }

            // 2. Invalidate all React Query caches → triggers refetch
            qc.invalidateQueries();
            console.log('[Session] All queries invalidated');
          } catch (e) {
            console.error('[Session] Recovery error:', e);
          }
        }

        lastHiddenTime = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Idle timeout - only reload after 10 min of complete inactivity
    const RELOAD_INTERVAL = 12 * 60 * 1000;
    const IDLE_THRESHOLD = 10 * 60 * 1000;
    let lastActivity = Date.now();

    const updateActivity = () => { lastActivity = Date.now(); };

    window.addEventListener('click', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);

    const intervalId = setInterval(() => {
      if (Date.now() - lastActivity >= IDLE_THRESHOLD) {
        console.log('[Session] User idle for 10+ min, reloading...');
        window.location.reload();
      }
    }, RELOAD_INTERVAL);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
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
