"use client";

import Link from "next/link";
import Image from "next/image";
import { Shirt } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";
import { AboutOverviewSection } from "@/features/public/about-videos/components/AboutOverviewSection";
import { AboutVideosSection } from "@/features/public/about-videos/components/AboutVideosSection";
import { AboutFacilitiesSection } from "@/features/public/about-videos/components/AboutFacilitiesSection";
import { CatalogSidebarCategories } from "@/features/common/components/CatalogSidebarCategories";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
];

export default function AboutPage() {
  const { dict } = useLanguage();
  const content = dict.aboutPage;

  return (
    <div className="bg-[#FAF8F4] py-12 text-[#211F1C] sm:py-16 lg:py-20">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Content */}
          <div className="space-y-16 lg:col-span-8 lg:space-y-20">
            <AboutOverviewSection content={content} />

            <AboutVideosSection content={content} />

            <AboutFacilitiesSection content={content} />

            {/* Atelier Photo Gallery */}
            <section className="border-t border-[#D8C9B8] pt-10 sm:pt-12">
              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#9D8974]">
                    Inside Our Atelier
                  </span>
                  <h3 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#211F1C] sm:text-4xl">
                    {content.galleryTitle}
                  </h3>
                </div>
                <p className="max-w-xs text-xs leading-6 text-[#625D57]">
                  A closer look at our workspace, craftsmanship, and production
                  environment.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {content.galleryItems.map((title: string, idx: number) => (
                  <div
                    key={idx}
                    className="group relative aspect-[4/3] overflow-hidden border border-[#E7E1D9] bg-[#F0ECE6]"
                  >
                    <Image
                      src={GALLERY_IMAGES[idx]}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211F1C]/75 via-[#211F1C]/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                      <span className="line-clamp-2 text-[10px] font-medium uppercase leading-5 tracking-[0.12em] text-white sm:text-xs">
                        {title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#E9E0D5] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Custom Apparel CTA */}
            <section className="relative overflow-hidden border border-[#D8C9B8] bg-[#F0ECE6] px-6 py-8 sm:px-9 sm:py-10 lg:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border border-[#D8C9B8]/80"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -top-9 h-36 w-36 rounded-full border border-[#D8C9B8]/70"
              />

              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="max-w-lg space-y-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                    Made for Your Brand
                  </span>
                  <h4 className="font-serif text-2xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-3xl">
                    {content.ctaHeading}
                  </h4>
                  <p className="max-w-md text-sm leading-7 text-[#625D57]">
                    {content.ctaDesc}
                  </p>
                </div>

                <AppButton
                  render={<Link href="/contact" />}
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shrink-0 border border-[#211F1C] bg-[#211F1C] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#51463B] hover:bg-[#51463B]"
                >
                  {content.ctaButton}
                </AppButton>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-7 lg:sticky lg:top-28 lg:col-span-4">
            <CatalogSidebarCategories />

            {/* Consultation Card */}
            <div className="border border-[#E7E1D9] bg-white p-6 text-center shadow-[0_8px_30px_rgba(33,31,28,0.03)] sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#D8C9B8] bg-[#FAF8F4] text-[#806B55]">
                <Shirt className="h-5 w-5" />
              </div>

              <div className="mt-5 space-y-3">
                <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                  Personal Assistance
                </span>
                <h4 className="font-serif text-xl font-normal leading-snug text-[#211F1C]">
                  {content.consultationTitle}
                </h4>
                <p className="text-xs leading-6 text-[#625D57]">
                  {content.consultationDesc}
                </p>
              </div>

              <div className="mt-6 border-t border-[#F0ECE6] pt-5">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 bg-[#211F1C] px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#51463B]"
                >
                  {content.consultationButton}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Brand Note */}
            <div className="border-l-2 border-[#9D8974] bg-[#F0ECE6]/70 py-4 pl-5 pr-4">
              <p className="font-serif text-lg italic leading-relaxed text-[#51463B]">
                Thoughtfully crafted. Made for your collection.
              </p>
              <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#9D8974]">
                Yifan Bridal & Couture
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
