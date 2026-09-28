"use client";

import { NavCategory } from "@/types";
import { Check, RotateCcw, X } from "lucide-react";

interface FilterContentProps {
  categories: NavCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  onCloseMobile?: () => void;
}

export function FilterContent({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  onReset,
  onCloseMobile,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Filter Products
        </h3>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg sm:hidden"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category List */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Collections
        </label>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory("")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === ""
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>All Collections</span>
            {selectedCategory === "" && <Check className="w-3.5 h-3.5" />}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{cat.title}</span>
              {selectedCategory === cat.slug && (
                <Check className="w-3.5 h-3.5" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Price Range ($)
          </label>
          <span className="text-xs font-semibold text-blue-600">
            ${priceRange[0]} -${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1000}
          step={25}
          value={priceRange[1]}
          onChange={(e) =>
            onPriceChange([priceRange[0], parseInt(e.target.value, 10)])
          }
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>

      {/* Reset Action */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}