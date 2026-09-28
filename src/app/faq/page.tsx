import { Sparkles } from "lucide-react";
import { FaqChat } from "@/components/faq/FaqChat";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export default function FaqPage() {
  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Page Header */}
        <section className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Help Center & Interactive RAG Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Got Questions? Ask Our AI or Browse Common FAQs
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Interact with our RAG-enabled AI assistant on the left for tailored
            answers, or explore common wholesale, manufacturing, and shipping
            questions on the right.
          </p>
        </section>

        {/* Two-Column Grid: 70% Left (col-span-8) & 30% Right (col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: White AI RAG Chat Component (~70% Width) */}
          <div className="lg:col-span-8">
            <FaqChat />
          </div>

          {/* RIGHT SIDE: Interactive Accordion FAQs (~30% Width) */}
          <div className="lg:col-span-4">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
