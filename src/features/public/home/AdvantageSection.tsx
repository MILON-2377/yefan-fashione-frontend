"use client";

import { ShieldCheck, Palette, Layers, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const ICONS = [Palette, Layers, ShieldCheck, Clock];

export function AdvantageSection() {
  const { dict } = useLanguage();
  const content = dict.advantageSection;

  return (
    <section className="relative overflow-hidden border-b border-[#E7E1D9] bg-[#F0ECE6] py-20 sm:py-24 lg:py-28">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#D8C9B8]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Editorial Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#9D8974]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
              {content.companyTag}
            </p>
            <span className="h-px w-8 bg-[#9D8974]" />
          </div>

          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
            {content.subheading}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#E1D8CD] bg-[#E1D8CD] sm:grid-cols-2 lg:grid-cols-4">
          {content.advantages.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];

            return (
              <article
                key={item.title ?? index}
                className="group relative flex min-h-65 flex-col bg-[#FAF8F4] p-7 transition-colors duration-500 hover:bg-white sm:p-8 lg:min-h-72.5"
              >
                {/* Number and Icon */}
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-serif text-sm italic text-[#9D8974]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8C9B8] text-[#806B55] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-auto">
                  <h3 className="font-serif text-xl font-normal leading-snug text-[#211F1C] sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#625D57]">
                    {item.description}
                  </p>

                  <div className="mt-6 h-px w-8 bg-[#B9A995] transition-all duration-300 group-hover:w-14 group-hover:bg-[#51463B]" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing Statement */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#D8C9B8] pt-7 sm:flex-row">
          <p className="max-w-xl text-center text-xs leading-6 text-[#756C62] sm:text-left sm:text-sm">
            {content.subheading}
          </p>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[#211F1C] transition-colors hover:text-[#806B55]"
          >
            {content.primaryCta ?? "Work With Us"}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
