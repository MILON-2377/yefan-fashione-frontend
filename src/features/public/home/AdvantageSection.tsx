"use client";

import { ShieldCheck, Palette, Layers, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Palette, Layers, ShieldCheck, Clock];

export function AdvantageSection() {
  const { dict } = useLanguage();
  const content = dict.advantageSection;

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
            {content.companyTag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {content.heading}
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            {content.subheading}
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.advantages.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
