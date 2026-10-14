"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowRight,
  Award,
  Globe2,
  Clock,
  Layers,
} from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { dict } = useLanguage();
  const content = dict.heroSection;

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 py-16 lg:py-24 border-b border-slate-100">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-100/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
              >
                {content.primaryCta}
              </AppButton>

              <AppButton
                render={<Link href="/all-catalogs" />}
                variant="outline"
                size="lg"
                leftIcon={<Layers className="w-4 h-4 text-blue-600" />}
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold shadow-xs"
              >
                {content.secondaryCta}
              </AppButton>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Globe2 className="w-5 h-5" />
                  <span>{content.exportMarkets}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {content.metrics.exportMarkets}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Award className="w-5 h-5" />
                  <span>{content.qualityStandard}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {content.metrics.qualityStandard}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xl sm:text-2xl">
                  <Clock className="w-5 h-5" />
                  <span>{content.leadTime}</span>
                </div>
                <p className="text-slate-500 text-xs font-medium">
                  {content.metrics.leadTime}
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/80 shadow-md p-3">
              <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src="/banner1.jpg"
                  alt="Yee Fans Showroom"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay for contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Showroom Badge Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                  <div className="inline-block px-2.5 py-1 rounded bg-blue-600/90 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
                    {content.showroomBadge}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {content.showroomTitle}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal">
                    {content.showroomDesc}
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
