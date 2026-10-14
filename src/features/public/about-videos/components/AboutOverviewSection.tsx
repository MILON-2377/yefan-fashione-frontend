import { Sparkles } from "lucide-react";
import { AboutPageDictContent } from "../types/aboutVideoTypes";

interface AboutOverviewSectionProps {
  content: AboutPageDictContent;
}
export function AboutOverviewSection({ content }: AboutOverviewSectionProps) {
  return (
    <section className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>{content.badge}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        {content.heading}
      </h2>

      <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
        <strong className="text-slate-900 font-semibold">
          {content.descriptionStrong}
        </strong>
        {content.descriptionText}
      </p>

      {/* Key Trust Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600">15+</div>
          <div className="text-xs font-medium text-slate-500">{content.metrics.experience}</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600">50k Pcs</div>
          <div className="text-xs font-medium text-slate-500">{content.metrics.output}</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600">120+</div>
          <div className="text-xs font-medium text-slate-500">{content.metrics.partners}</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-blue-600">BSCI</div>
          <div className="text-xs font-medium text-slate-500">{content.metrics.certified}</div>
        </div>
      </div>
    </section>
  );
}
