import { AboutSection } from "@/components/home/AboutSection";
import { AdvantageSection } from "@/components/home/AdvantageSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ClientReviewsSection } from "@/components/home/ClientReviewsSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroBannerSection } from "@/components/home/hero/HeroBannerSection";
import { HeroSection } from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* 1. Production Hero Bannjer */}
      <HeroBannerSection />

      {/* 2. Product Category Auto-Sliding Carousel */}
      <CategorySection />

      {/* Hero section */}
      <HeroSection />

      {/* 3. Company Advantage / Why Choose Us Section */}
      <AdvantageSection />

      {/* 3. Featured Products Slider Section */}
      <FeaturedProducts />

      {/* About section */}
      <AboutSection />

      {/* Client Reviews Section */}
      <ClientReviewsSection />
    </div>
  );
}
