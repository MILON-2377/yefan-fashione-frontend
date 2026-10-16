"use client";

import { Sparkles } from "lucide-react";
import { FaqChat } from "@/features/public/faq/components/FaqChat";
import { FaqAccordion } from "@/features/public/faq/components/FaqAccordion";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqPage() {
  const { dict } = useLanguage();
  const content = dict.faqPage;

  return (
    <div className="bg-[#FAF8F4] py-12 text-[#211F1C] lg:py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-8 lg:space-y-12">
        {/* Page Header */}
        <section className="relative max-w-3xl space-y-5 border-b border-[#D8C9B8] pb-8 sm:pb-10">
          <div className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-white px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#806B55] sm:text-[10px]">
            <Sparkles className="h-4 w-4 text-[#9D8974]" />
            <span>{content.badge}</span>
          </div>

          <h1 className="max-w-3xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
            {content.heading}
          </h1>

          <p className="max-w-2xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
            {content.subheading}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <span className="h-px w-10 bg-[#9D8974]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#817970]">
              Knowledge · Guidance · Support
            </span>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* AI-Powered FAQ Chat */}
          <div className="min-w-0 lg:col-span-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-[#9D8974]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#806B55]">
                Ask Our Assistant
              </span>
            </div>
            <div className="border border-[#E7E1D9] bg-white shadow-[0_4px_24px_rgba(65,52,39,0.03)]">
              <FaqChat />
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-[#9D8974]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#806B55]">
                Quick Answers
              </span>
            </div>
            <div className="border border-[#E7E1D9] bg-white p-4 sm:p-5">
              <FaqAccordion />
            </div>

            <div className="mt-5 border border-[#D8C9B8] bg-[#F0ECE6] p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center border border-[#D8C9B8] bg-white text-[#9D8974]">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="font-serif text-lg text-[#211F1C]">Here to help</p>
              <p className="mt-2 text-xs leading-6 text-[#625D57]">
                Find clear answers to your questions and explore the information
                you need to move forward with confidence.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
