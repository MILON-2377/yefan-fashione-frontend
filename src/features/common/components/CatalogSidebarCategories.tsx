"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Shirt, Sparkles } from "lucide-react";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import { useLanguage } from "@/context/LanguageContext";

export function CatalogSidebarCategories() {
  const { dict } = useLanguage();
  const content = dict.catalogSidebarCategories;

  const { data: categoryResponse, isLoading } = usePublicCategories();
  const categories = categoryResponse?.items ?? [];

  return (
    <div className="space-y-8 sticky top-28">
      {/* Category Navigation Widget with Real Category Data */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {content.title}
          </h3>
          <Link
            href="/products"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            {content.viewAll}
          </Link>
        </div>

        {isLoading ? (
          <div className="p-4 text-center text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin mx-auto mb-1" />
            {content.loading}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            {content.noCategories}
          </p>
        ) : (
          <div className="space-y-3">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category_id=${encodeURIComponent(cat.id)}`}
                className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all group"
              >
                {/* Thumbnail Image */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  {cat.image?.url ? (
                    <Image
                      src={cat.image.url}
                      alt={cat.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Shirt className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Text Details (Backend Category Name Preserved) */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {cat.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {content.exploreCollection}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Merchandiser Consultation CTA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs text-center">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
          <Shirt className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">
            {content.consultationTitle}
          </h4>
          <p className="text-xs text-slate-500">{content.consultationDesc}</p>
        </div>

        <div className="pt-2">
          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            {content.contactBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
