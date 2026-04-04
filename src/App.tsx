import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import GTSeries from "./pages/GTSeries.tsx";
import GBSeries from "./pages/GBSeries.tsx";
import EPCBoxSeries from "./pages/EPCBoxSeries.tsx";
import MiniPC from "./pages/MiniPC.tsx";
import WaterproofPC from "./pages/WaterproofPC.tsx";
import Volktek from "./pages/Volktek.tsx";
import EPCSeries from "./pages/EPCSeries.tsx";
import RuggedTablet from "./pages/RuggedTablet.tsx";
import Handheld from "./pages/Handheld.tsx";
import GKSeries from "./pages/GKSeries.tsx";
import PanelPCGTG from "./pages/PanelPCGTG.tsx";
import SmartDisplay from "./pages/SmartDisplay.tsx";
import Promotions from "./pages/Promotions.tsx";
import UTCSeries from "./pages/UTCSeries.tsx";
import MiniPCFirewall from "./pages/MiniPCFirewall.tsx";
import VCloudPoint from "./pages/VCloudPoint.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import QuoteRequest from "./pages/QuoteRequest.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import MemberRegister from "./pages/MemberRegister.tsx";
import MyQuotes from "./pages/MyQuotes.tsx";
import WelcomeMember from "./pages/WelcomeMember.tsx";
import Warrantys from "./pages/Warrantys.tsx";
import Payment from "./pages/Payment.tsx";
import Delivery from "./pages/Delivery.tsx";
import Cabinets from "./pages/Cabinets.tsx";
import IBoxSeries from "./pages/IBoxSeries.tsx";
import IBoxDetail from "./pages/IBoxDetail.tsx";
import RuggedHandheldDetail from "./pages/RuggedHandheldDetail.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ProductAdvisor from "./pages/ProductAdvisor.tsx";
import RuggedNotebook from "./pages/RuggedNotebook.tsx";
import RuggedNotebookDetail from "./pages/RuggedNotebookDetail.tsx";
import AllInOnePC from "./pages/AllInOnePC.tsx";
import AIODetail from "./pages/AIODetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import FloatingContact from "./components/FloatingContact.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import SocialRibbon from "./components/SocialRibbon.tsx";
import AIChatWidget from "./components/AIChatWidget.tsx";

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
              <Route path="/rugged-tablet/:id" element={<RuggedHandheldDetail />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/product-advisor" element={<ProductAdvisor />} />
              <Route path="/rugged-notebook" element={<RuggedNotebook />} />
              <Route path="/rugged-notebook/:id" element={<RuggedNotebookDetail />} />
              <Route path="/aio" element={<AllInOnePC />} />
              <Route path="/aio/:id" element={<AIODetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingContact />
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
