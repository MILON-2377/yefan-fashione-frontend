"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Globe2, Clock } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { dict } = useLanguage();
  const content = dict.heroSection;

  return (
    <section className="relative overflow-hidden border-b border-[#E7E1D9] bg-[#FAF8F4] py-20 sm:py-24 lg:py-32">
      {/* Subtle editorial background accents */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#E9E0D5]/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[350px] w-[350px] rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Editorial Content */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#9D8974]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
                {content.badge}
              </span>
            </div>

            <h2 className="font-serif text-4xl font-normal leading-[1.12] tracking-[-0.035em] text-[#211F1C] sm:text-5xl lg:text-6xl xl:text-[68px]">
              {content.title}
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
              {content.subtitle}
            </p>

            {/* Refined CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                size="lg"
                rightIcon={
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                }
                className="group min-h-12 rounded-none border border-[#211F1C] bg-[#211F1C] px-7 text-xs font-medium tracking-wide text-white shadow-none transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B]"
              >
                {content.primaryCta}
              </AppButton>

              <Link
                href="/downloads"
                className="group inline-flex items-center gap-2 border-b border-[#B9A995] py-2 text-xs font-medium tracking-wide text-[#51463B] transition-colors hover:border-[#211F1C] hover:text-[#211F1C]"
              >
                {content.secondaryCta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Minimal business credentials */}
            <div className="mt-12 grid grid-cols-3 border-t border-[#E1D8CD] pt-7 sm:mt-16 sm:pt-8">
              <div className="pr-3 sm:pr-5">
                <Globe2 className="mb-3 h-5 w-5 text-[#9D8974]" />
                <p className="text-lg font-medium tracking-tight text-[#211F1C] sm:text-2xl">
                  {content.exportMarkets}
                </p>
                <p className="mt-1.5 text-[10px] leading-5 text-[#756C62] sm:text-xs">
                  {content.metrics.exportMarkets}
                </p>
              </div>

              <div className="border-l border-[#E1D8CD] px-3 sm:px-5">
                <Award className="mb-3 h-5 w-5 text-[#9D8974]" />
                <p className="text-lg font-medium tracking-tight text-[#211F1C] sm:text-2xl">
                  {content.qualityStandard}
                </p>
                <p className="mt-1.5 text-[10px] leading-5 text-[#756C62] sm:text-xs">
                  {content.metrics.qualityStandard}
                </p>
              </div>

              <div className="border-l border-[#E1D8CD] pl-3 sm:pl-5">
                <Clock className="mb-3 h-5 w-5 text-[#9D8974]" />
                <p className="text-lg font-medium tracking-tight text-[#211F1C] sm:text-2xl">
                  {content.leadTime}
                </p>
                <p className="mt-1.5 text-[10px] leading-5 text-[#756C62] sm:text-xs">
                  {content.metrics.leadTime}
                </p>
              </div>
            </div>
          </div>

          {/* Fashion Editorial Image */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-none">
            {/* Decorative frame */}
            <div className="absolute -right-3 -top-3 h-full w-full border border-[#D8C9B8] sm:-right-5 sm:-top-5" />

            <div className="relative aspect-4/5 overflow-hidden bg-[#F0ECE6]">
              <Image
                src="/b2.png"
                alt="Yee Fans womenswear collection"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#211F1C]/55 via-transparent to-transparent" />

              {/* Image caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div className="max-w-xs text-white">
                  <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/75 sm:text-[10px]">
                    {content.showroomBadge}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-normal leading-tight sm:text-3xl">
                    {content.showroomTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/80 sm:text-sm">
                    {content.showroomDesc}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Small editorial note */}
            <div className="absolute -left-5 top-12 hidden max-w-35 bg-[#FAF8F4] px-4 py-5 shadow-sm sm:block lg:-left-12">
              <p className="font-serif text-lg leading-snug text-[#51463B]">
                Beautiful details.
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#9D8974]">
                Thoughtfully crafted
              </p>
              <span className="mt-4 block h-px w-8 bg-[#B9A995]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
