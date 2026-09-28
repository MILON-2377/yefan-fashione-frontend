"use client";

import { NavCategory } from "@/types";
import { FilterContent } from "./FilterContent";

interface DesktopFilterProps {
  categories: NavCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export function DesktopFilter(props: DesktopFilterProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-28 h-fit bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
      <FilterContent {...props} />
    </aside>
  );
}
