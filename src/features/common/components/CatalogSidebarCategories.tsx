"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronRight, Shirt, Sparkles } from "lucide-react";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import { useLanguage } from "@/context/LanguageContext";

export function CatalogSidebarCategories() {
  const { dict } = useLanguage();
  const content = dict.catalogSidebarCategories;

  const { data: categoryResponse, isLoading } = usePublicCategories();
  const categories = categoryResponse?.items ?? [];

  return (
    <div className="sticky top-28 space-y-7">
      {/* Category Navigation */}
      <div className="space-y-5 border border-[#E7E1D9] bg-white p-5 shadow-[0_8px_30px_rgba(33,31,28,0.03)] sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-[#E7E1D9] pb-4">
          <div>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
              Discover
            </span>
            <h3 className="mt-1 font-serif text-xl font-normal tracking-tight text-[#211F1C]">
              {content.title}
            </h3>
          </div>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#806B55] transition-colors hover:text-[#211F1C]"
          >
            {content.viewAll}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex animate-pulse items-center gap-3">
                <div className="h-14 w-14 shrink-0 bg-[#F0ECE6]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-[#F0ECE6]" />
                  <div className="h-2.5 w-1/2 bg-[#F0ECE6]" />
                </div>
              </div>
            ))}
            <p className="pt-2 text-center text-[10px] uppercase tracking-[0.12em] text-[#817970]">
              {content.loading}
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-5 text-center">
            <Shirt className="mx-auto mb-3 h-6 w-6 text-[#9D8974]" />
            <p className="text-xs leading-6 text-[#625D57]">
              {content.noCategories}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {categories.slice(0, 5).map((cat, index) => (
              <Link
                key={cat.id}
                href={`/products?category_id=${encodeURIComponent(cat.id)}`}
                className="group flex items-center gap-3 border border-transparent p-2.5 transition-all duration-300 hover:border-[#D8C9B8] hover:bg-[#FAF8F4]"
              >
                {/* Category Thumbnail */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#E7E1D9] bg-[#F0ECE6]">
                  {cat.image?.url ? (
                    <Image
                      src={cat.image.url}
                      alt={cat.name}
                      fill
                      sizes="56px"
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#F0ECE6] text-[#9D8974]">
                      <Shirt className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Category Information */}
                <div className="min-w-0 flex-1">
                  <span className="mb-1 block text-[9px] font-medium uppercase tracking-[0.16em] text-[#B0A092]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="truncate text-xs font-medium text-[#211F1C] transition-colors group-hover:text-[#806B55]">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-[#817970]">
                    {content.exploreCollection}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-[#B5AAA0] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#806B55]" />
              </Link>
            ))}
          </div>
        )}

        <div className="border-t border-[#E7E1D9] pt-4">
          <Link
            href="/products"
            className="group flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.17em] text-[#625D57] transition-colors hover:text-[#211F1C]"
          >
            Browse All Collections
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Merchandiser Consultation */}
      <div className="relative overflow-hidden border border-[#D8C9B8] bg-[#F0ECE6] p-6 text-center sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#D8C9B8]/80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full border border-[#D8C9B8]/70"
        />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#D8C9B8] bg-[#FAF8F4] text-[#806B55]">
            <Shirt className="h-5 w-5" />
          </div>

          <span className="mt-5 block text-[9px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
            Personal Assistance
          </span>

          <h4 className="mt-2 font-serif text-xl font-normal leading-snug text-[#211F1C]">
            {content.consultationTitle}
          </h4>

          <p className="mt-3 text-xs leading-6 text-[#625D57]">
            {content.consultationDesc}
          </p>

          <div className="mt-6 border-t border-[#D8C9B8] pt-5">
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 bg-[#211F1C] px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-[#51463B]"
            >
              {content.contactBtn}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-4 text-[9px] uppercase tracking-[0.12em] text-[#817970]">
            Yifan Bridal & Couture
          </p>
        </div>
      </div>
    </div>
  );
}
