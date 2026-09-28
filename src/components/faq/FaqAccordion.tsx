"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "Ordering & MOQs",
    question:
      "What is the Minimum Order Quantity (MOQ) for custom vs ready stock?",
    answer:
      "For custom OEM/ODM manufacturing (bespoke patterns, colors, or tech-packs), our standard MOQ is 50 to 100 pieces per style. For ready-to-ship boutique stock from our 2026 lookbook, the MOQ is 10 pieces with mixed sizing permitted.",
  },
  {
    id: "faq-2",
    category: "Sampling & Lead Times",
    question: "How long does pattern making and sample creation take?",
    answer:
      "Once tech-packs, CAD sketches, and fabric selections are finalized, initial samples take 7 to 10 working days. Rush sampling (5 days) is available for urgent fashion show or boutique launching events.",
  },
  {
    id: "faq-3",
    category: "Materials & Fabrics",
    question:
      "Can I request custom fabric dyeing, lace appliques, or embroidery?",
    answer:
      "Yes. We partner with OEKO-TEX certified dye houses and lace mills in Guangdong. We can match Pantone color codes and source custom hand-beaded lace, stretch satin, or 100% Mulberry silk according to your specifications.",
  },
  {
    id: "faq-4",
    category: "Production & Quality Control",
    question:
      "What quality control standards does Guangzhou Yifan Atelier follow?",
    answer:
      "We operate an inline AQL 2.5 inspection process. Every evening gown and bridal dress undergoes fabric stress testing, zipper durability checks, seam reinforcement audits, and strict thread trimming before final steaming and poly-bagging.",
  },
  {
    id: "faq-5",
    category: "Shipping & Logistics",
    question: "Do you offer international DDP (Delivered Duty Paid) shipping?",
    answer:
      "Yes, we ship globally via DHL, FedEx, UPS, air freight, and sea freight. We offer full DDP services to North America, Europe, Australia, and the Middle East, handling all import customs and tariffs on your behalf.",
  },
  {
    id: "faq-6",
    category: "Branding & Packaging",
    question:
      "Can you attach our brand's custom woven labels, hangtags, and garment bags?",
    answer:
      "Absolutely. We offer complete private label packaging services, including woven neck labels, care tags, custom satin garment bags, and branded shipping boxes.",
  },
];

export function FaqAccordion() {
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
            Frequently Asked Questions
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          {FAQ_DATA.length} Standard Q&As
        </span>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-blue-50/40 border-blue-300 shadow-sm"
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

              {/* Answer Content (Revealed at the bottom of the question) */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/80 mt-1">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
