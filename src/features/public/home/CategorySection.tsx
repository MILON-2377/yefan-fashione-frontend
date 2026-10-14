"use client";

import { CategoryCarousel } from "./CategoryCarousel";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import { useLanguage } from "@/context/LanguageContext";

export function CategorySection() {
  const { dict } = useLanguage();
  const { data, isLoading, isError } = usePublicCategories();

  // Backend API data is passed untouched directly to CategoryCarousel
  const categories = data?.items ?? [];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {isLoading ? (
          <CategorySkeleton />
        ) : isError || categories.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 font-mono">
            {dict.categorySection?.noData ??
              "No product categories available at this moment."}
          </div>
        ) : (
          <CategoryCarousel categories={categories} />
        )}
      </div>
    </section>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="h-8 w-64 bg-slate-300 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
