"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Download,
  Award,
  Globe2,
  Clock,
} from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { fetchApi } from "@/lib/api";

interface HeroData {
  badge?: string;
  title?: string;
  subtitle?: string;
  exportMarkets?: string;
  qualityStandard?: string;
  leadTime?: string;
}

const FALLBACK_HERO = {
  badge: "Verified OEM / ODM Manufacturer & Exporter",
  title: "High-Quality Custom Product Solutions for Global Brands",
  subtitle:
    "Direct factory manufacturing tailored to international standards. Delivering certified quality, competitive wholesale pricing, and reliable global shipping.",
  primaryCta: "Request Product Quote",
  secondaryCta: "Download Product Catalog",
  metrics: {
    exportMarkets: "Global Export Reach",
    qualityStandard: "Quality Certified",
    leadTime: "Sample Lead Time",
  },
};

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    async function loadHeroData() {
      try {
        const data = await fetchApi<HeroData>("/hero");
        setHeroData(data);
      } catch (err) {
        console.warn(
          "FastAPI hero endpoint unreachable, using local fallback content.",
        );
      }
    }

    loadHeroData();
  }, []);

  const content = {
    badge: heroData?.badge || FALLBACK_HERO.badge,
    title: heroData?.title || FALLBACK_HERO.title,
    subtitle: heroData?.subtitle || FALLBACK_HERO.subtitle,
    exportMarkets: heroData?.exportMarkets || "50+",
    qualityStandard: heroData?.qualityStandard || "ISO Certified",
    leadTime: heroData?.leadTime || "7-14 Days",
  };

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 py-16 lg:py-24 border-b border-slate-100">
      {/* Subtle ambient light glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-100/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Manufacturer Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{content.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              {content.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
              >
                {FALLBACK_HERO.primaryCta}
              </AppButton>

              <AppButton
                render={<Link href="/downloads" />}
                variant="outline"
                size="lg"
                leftIcon={<Download className="w-4 h-4 text-blue-600" />}
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold shadow-sm"
              >
                {FALLBACK_HERO.secondaryCta}
              </AppButton>
            </div>

            {/* B2B Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Globe2 className="w-5 h-5" />
                  <span>{content.exportMarkets}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {FALLBACK_HERO.metrics.exportMarkets}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Award className="w-5 h-5" />
                  <span>{content.qualityStandard}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {FALLBACK_HERO.metrics.qualityStandard}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Clock className="w-5 h-5" />
                  <span>{content.leadTime}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {FALLBACK_HERO.metrics.leadTime}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/80 shadow-md p-3">
              <div className="aspect-[4/5] rounded-xl bg-white border border-slate-200 overflow-hidden relative flex items-center justify-center text-slate-700">
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm">
                    EXPO
                  </div>
                  <p className="text-xs text-slate-900 uppercase tracking-widest font-semibold">
                    Global Factory Showroom
                  </p>
                  <p className="text-xs text-slate-500">
                    Custom manufacturing capabilities & export-ready products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
