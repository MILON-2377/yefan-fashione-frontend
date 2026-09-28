"use client";

import { useState, useEffect, useCallback } from "react";
import { HeroBanner } from "@/types";
import { HeroSlide } from "./HeroSlide";
import { HeroControls } from "./HeroControls";

const DEFAULT_BANNERS: HeroBanner[] = [
  {
    id: "1",
    badge: "Direct Factory Manufacturer",
    title: "High-Precision Industrial Machinery & OEM Solutions",
    subtitle:
      "Certified supplier providing custom engineering components, automated equipment, and global logistics for enterprise buyers in 80+ countries.",
    primaryCtaText: "Request Instant Quote",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Download Spec Sheet",
    secondaryCtaLink: "/downloads",
    bgImageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { value: "80+", label: "Export Markets" },
      { value: "ISO 9001", label: "Certified Facility" },
      { value: "15 Days", label: "Avg Lead Time" },
    ],
  },
  {
    id: "2",
    badge: "OEM/ODM Capabilities",
    title: "Tailored Custom Components Built to Blueprint",
    subtitle:
      "Advanced CNC machining, raw alloy processing, and rapid prototyping engineered strictly to your technical specifications.",
    primaryCtaText: "Explore OEM Process",
    primaryCtaLink: "/about",
    secondaryCtaText: "2026 E-Catalog",
    secondaryCtaLink: "/downloads",
    bgImageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { value: "0.005mm", label: "Precision Tolerance" },
      { value: "500+", label: "Active Clients" },
      { value: "100%", label: "QC Inspection" },
    ],
  },
];

interface HeroBannerSectionProps {
  initialBanners?: HeroBanner[];
}

export function HeroBannerSection({ initialBanners }: HeroBannerSectionProps) {
  const [banners] = useState<HeroBanner[]>(
    initialBanners && initialBanners.length > 0
      ? initialBanners
      : DEFAULT_BANNERS,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [banners.length, handleNext]);

  return (
    <section className="top-10 relative w-full z-0 overflow-hidden border-b border-slate-200">
      {banners.map((banner, idx) => (
        <HeroSlide
          key={banner.id}
          banner={banner}
          isActive={idx === currentIndex}
        />
      ))}

      <HeroControls
        total={banners.length}
        current={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={(index) => setCurrentIndex(index)}
      />
    </section>
  );
}
