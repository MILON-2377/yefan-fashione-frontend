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
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {content.title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
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
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-blue-50/40 border-blue-300 shadow-xs"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {item.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-white text-slate-400 border border-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/80 mt-1">
                    {item.answer}
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
