"use client";

import { useState, useEffect, useCallback } from "react";
import { HeroBanner } from "@/types";
import { HeroSlide } from "./HeroSlide";
import { HeroControls } from "./HeroControls";
import { useHeroBanners } from "./hooks/useHeroBanners";

interface HeroBannerSectionProps {
  initialBanners?: HeroBanner[];
}

export function HeroBannerSection({ initialBanners }: HeroBannerSectionProps) {
  const localizedBanners = useHeroBanners();

  // Prefer initialBanners if explicitly provided, otherwise use dynamic localized banners
  const banners =
    initialBanners && initialBanners.length > 0
      ? initialBanners
      : localizedBanners;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard against out-of-bounds index if banners count changes dynamically
  const safeIndex =
    banners.length > 0 ? Math.min(currentIndex, banners.length - 1) : 0;

  const handleNext = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Auto-play interval
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [banners.length, handleNext]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="top-10 relative w-full z-0 overflow-hidden bg-slate-950 border-b border-slate-800">
      {banners.map((banner, idx) => (
        <HeroSlide
          key={banner.id}
          banner={banner}
          isActive={idx === safeIndex}
        />
      ))}

      <HeroControls
        total={banners.length}
        current={safeIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={(index) => setCurrentIndex(index)}
      />
    </section>
  );
}
