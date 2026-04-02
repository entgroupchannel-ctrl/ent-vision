import HeroSection from "@/components/HeroSection";
import EdgeAISection from "@/components/EdgeAISection";
import SoftwareSection from "@/components/SoftwareSection";
import ProductHighlights from "@/components/ProductHighlights";
import ProductBanners from "@/components/ProductBanners";
import ProductSections from "@/components/ProductSections";
import ProductLineup from "@/components/ProductLineup";
import PromoBanners from "@/components/PromoBanners";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <EdgeAISection />
      <SoftwareSection />
      <ProductHighlights />
      <ProductBanners />
      <ProductSections />
      <ProductLineup />
      <PromoBanners />
      <Footer />
    </div>
  );
};

export default Index;
