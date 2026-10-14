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
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{content.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {content.heading}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            {content.subheading}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              }
            >
              <InquiryFormSection />
            </Suspense>
          </div>
          <div className="lg:col-span-5">
            <FactoryInfoSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
