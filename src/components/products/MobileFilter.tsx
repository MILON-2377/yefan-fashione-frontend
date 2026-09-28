"use client";

import { useState } from "react";
import { NavCategory } from "@/types";
import { FilterContent } from "./FilterContent";
import { SlidersHorizontal, X } from "lucide-react";

interface MobileFilterProps {
  categories: NavCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export function MobileFilter(props: MobileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Mobile Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-md active:scale-98 transition"
      >
        <SlidersHorizontal className="w-4 h-4 text-blue-400" />
        <span>Filter & Sort Products</span>
        {props.activeFilterCount > 0 && (
          <span className="ml-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center">
            {props.activeFilterCount}
          </span>
        )}
      </button>

      {/* Slide-over Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <FilterContent {...props} onCloseMobile={() => setIsOpen(false)} />

            {/* Apply & Close Button for Mobile */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
