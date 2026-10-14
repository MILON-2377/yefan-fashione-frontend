import { AboutSection } from "@/features/public/home/AboutSection";
import { AdvantageSection } from "@/features/public/home/AdvantageSection";
import { CategorySection } from "@/features/public/home/CategorySection";
import { ClientReviewsSection } from "@/features/public/home/ClientReviewsSection";
import { FeaturedProducts } from "@/features/public/home/FeaturedProducts";
import { HeroBannerSection } from "@/features/public/home/hero/HeroBannerSection";
import { HeroSection } from "@/features/public/home/HeroSection";

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
