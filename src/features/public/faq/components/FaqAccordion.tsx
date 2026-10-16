"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FaqAccordion() {
  const { dict } = useLanguage();
  const content = dict.faqAccordion;

  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 border-b border-[#D8C9B8] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#9D8974]">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h3 className="font-serif text-xl font-normal tracking-tight text-[#211F1C] sm:text-2xl">
            {content.title}
          </h3>
        </div>
        <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.14em] text-[#817970] sm:text-[10px]">
          {content.items.length} {content.qaCountSuffix}
        </span>
      </div>

      <div className="space-y-3">
        {content.items.map(
          (item: {
            id: string;
            category: string;
            question: string;
            answer: string;
          }) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-[#D8C9B8] bg-[#F0ECE6]"
                    : "border-[#E7E1D9] bg-white hover:border-[#D8C9B8]"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9D8974] sm:p-5"
                >
                  <div className="min-w-0 space-y-2">
                    <span className="block text-[9px] font-medium uppercase tracking-[0.18em] text-[#9D8974]">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-medium leading-6 text-[#211F1C] sm:text-base">
                      {item.question}
                    </h4>
                  </div>

                  <div
                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-[#211F1C] bg-[#211F1C] text-white"
                        : "border-[#E7E1D9] bg-[#FAF8F4] text-[#817970]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="mx-4 border-t border-[#D8C9B8] sm:mx-5">
                    <div className="py-4 text-xs leading-7 text-[#625D57] sm:py-5 sm:text-sm sm:leading-7">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
