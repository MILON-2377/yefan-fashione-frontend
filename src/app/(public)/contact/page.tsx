"use client";

import { Loader2, Sparkles } from "lucide-react";
import { InquiryFormSection } from "@/features/public/inquiry/components/InquiryFormSection";
import { FactoryInfoSidebar } from "@/features/public/inquiry/components/FactoryInfoSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Suspense } from "react";

export default function ContactPage() {
  const { dict } = useLanguage();
  const content = dict.contactPage;

  return (
    <div className="bg-[#FAF8F4] text-[#211F1C] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Page Header */}
        <div className="mb-12 border-b border-[#E7E1D9] pb-8 sm:mb-14 sm:pb-10">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#D8C9B8] bg-[#F0ECE6] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#51463B] sm:text-xs">
            <Sparkles className="h-4 w-4" />
            <span>{content.badge}</span>
          </div>

          <h1 className="max-w-4xl font-serif text-3xl font-medium leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
            {content.heading}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
            {content.subheading}
          </p>
        </div>

        {/* Inquiry Form & Factory Information */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Suspense
              fallback={
                <div
                  className="flex min-h-64 items-center justify-center border border-[#E7E1D9] bg-white"
                  aria-label="Loading inquiry form"
                  role="status"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-[#9D8974]" />
                </div>
              }
            >
              <InquiryFormSection />
            </Suspense>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <FactoryInfoSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
