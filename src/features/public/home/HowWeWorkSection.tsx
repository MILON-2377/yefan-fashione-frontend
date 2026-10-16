"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ClipboardList,
  PackageCheck,
  Ruler,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const STEP_ICONS = [ClipboardList, Ruler, PackageCheck, Truck];

export function HowWeWorkSection() {
  const { dict } = useLanguage();
  const content = dict.howWeWorkSection;

  return (
    <section className="relative overflow-hidden border-y border-[#E7E1D9] bg-[#FAF8F4] py-20 sm:py-24 lg:py-32">
      {/* Background details */}
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#E9E0D5]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D8974]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
                {content.tagline}
              </p>
            </div>

            <h2 className="max-w-2xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl xl:text-6xl">
              {content.heading}
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
              {content.subheading}
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-[#211F1C] transition-colors hover:text-[#806B55]"
            >
              {content.primaryCta}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Process steps */}
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-[#D8C9B8] lg:block" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {content.steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? ClipboardList;

              return (
                <article
                  key={step.title}
                  className="group relative flex min-h-[270px] flex-col border border-[#E7E1D9] bg-white/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C9B8] hover:bg-white sm:p-7 lg:min-h-[310px] lg:p-8"
                >
                  <div className="relative z-10 mb-9 flex items-center justify-between">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8C9B8] bg-[#FAF8F4] text-[#806B55] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.35} />
                    </span>

                    <span className="font-serif text-3xl font-normal text-[#D8C9B8] transition-colors duration-300 group-hover:text-[#9D8974]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-serif text-xl font-normal leading-snug text-[#211F1C] sm:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#625D57]">
                      {step.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#E7E1D9] pt-4">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                        {content.stepLabel} {String(index + 1).padStart(2, "0")}
                      </span>

                      {index < content.steps.length - 1 ? (
                        <ArrowDownRight
                          className="h-4 w-4 text-[#9D8974] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <PackageCheck
                          className="h-4 w-4 text-[#9D8974]"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#E7E1D9] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-6 text-[#756C62] sm:text-sm">
            {content.footerNote}
          </p>

          <Link
            href="/all-catalogs"
            className="inline-flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#51463B] transition-colors hover:text-[#9D8974]"
          >
            {content.secondaryCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
