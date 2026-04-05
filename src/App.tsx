import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import FloatingContact from "./components/FloatingContact.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import SocialRibbon from "./components/SocialRibbon.tsx";
import AIChatWidget from "./components/AIChatWidget.tsx";

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

/* ── Loading fallback ── */
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">กำลังโหลด...</span>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            
            <SocialRibbon />
            <AIChatWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
