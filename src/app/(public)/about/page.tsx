"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shirt } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";
import { AboutOverviewSection } from "@/features/public/about-videos/components/AboutOverviewSection";
import { AboutVideosSection } from "@/features/public/about-videos/components/AboutVideosSection";
import { AboutFacilitiesSection } from "@/features/public/about-videos/components/AboutFacilitiesSection";
import { CatalogSidebarCategories } from "@/features/common/components/CatalogSidebarCategories";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
];

export default function AboutPage() {
  const { dict } = useLanguage();
  const content = dict.aboutPage;

  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT MAIN CONTENT AREA (~70% Width)                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-16">
            <AboutOverviewSection content={content} />

            <AboutVideosSection content={content} />

            <AboutFacilitiesSection content={content} />

            {/* Atelier Photo Gallery */}
            <section className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {content.galleryTitle}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {content.galleryItems.map((title: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 group shadow-sm bg-slate-100"
                  >
                    <Image
                      src={GALLERY_IMAGES[idx]}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-semibold text-white truncate">
                        {title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Custom Apparel CTA */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-slate-900">
                  {content.ctaHeading}
                </h4>
                <p className="text-sm text-slate-600">{content.ctaDesc}</p>
              </div>

              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shrink-0"
              >
                {content.ctaButton}
              </AppButton>
            </section>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDEBAR (~30% Width - Sticky)                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            <CatalogSidebarCategories />

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                <Shirt className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  {content.consultationTitle}
                </h4>
                <p className="text-xs text-slate-500">
                  {content.consultationDesc}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  {content.consultationButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
