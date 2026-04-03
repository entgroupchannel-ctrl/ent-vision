import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index.tsx";
import GTSeries from "./pages/GTSeries.tsx";
import GBSeries from "./pages/GBSeries.tsx";
import EPCBoxSeries from "./pages/EPCBoxSeries.tsx";
import MiniPC from "./pages/MiniPC.tsx";
import WaterproofPC from "./pages/WaterproofPC.tsx";
import Volktek from "./pages/Volktek.tsx";
import EPCSeries from "./pages/EPCSeries.tsx";
import RuggedTablet from "./pages/RuggedTablet.tsx";
import GKSeries from "./pages/GKSeries.tsx";
import PanelPCGTG from "./pages/PanelPCGTG.tsx";
import SmartDisplay from "./pages/SmartDisplay.tsx";
import Promotions from "./pages/Promotions.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/panel-pc-gtg" element={<PanelPCGTG />} />
            <Route path="/smart-display" element={<SmartDisplay />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
