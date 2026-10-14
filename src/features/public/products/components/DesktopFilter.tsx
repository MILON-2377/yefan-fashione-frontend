"use client";

import { FilterContent } from "./FilterContent";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";

interface DesktopFilterProps {
  categories: PublicCategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedCollection: string;
  onSelectCollection: (id: string) => void;
  onReset: () => void;
}

export function DesktopFilter(props: DesktopFilterProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-28 h-fit bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
      <FilterContent {...props} />
    </aside>
  );
}
