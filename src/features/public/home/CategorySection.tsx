
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
    <section className="border-y border-[#E7E1D9] bg-[#FAF8F4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {isLoading ? (
          <CategorySkeleton />
        ) : isError || categories.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#625D57]">
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
    <div className="animate-pulse space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 rounded bg-[#E7E1D9]" />
        <div className="h-8 w-64 rounded bg-[#E7E1D9]" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 rounded-lg bg-[#F0ECE6]"
          />
        ))}
      </div>
    </div>
  );
}
