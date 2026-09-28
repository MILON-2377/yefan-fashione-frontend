"use client";

import { useState } from "react";
import {
  Filter,
  RotateCcw,
  ChevronDown,
  Check,
  SlidersHorizontal,
  X,
} from "lucide-react";

export interface FilterState {
  categories: string[];
  collections: string[];
  sizes: string[];
  fabrics: string[];
  moqTier: string;
  priceRange: [number, number];
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const CATEGORY_OPTIONS = [
  { id: "evening-gowns", label: "Couture Evening Gowns", count: 142 },
  { id: "bridal-wear", label: "Bridal Wear & Veils", count: 95 },
  { id: "cocktail-dresses", label: "Cocktail & Party Dresses", count: 88 },
  { id: "slip-dresses", label: "Silk & Satin Slip Dresses", count: 110 },
  { id: "tailored-suits", label: "Tailored Women Suits", count: 64 },
];

const COLLECTION_OPTIONS = [
  { id: "ss2026", label: "2026 Spring / Summer Lookbook" },
  { id: "bridal-2026", label: "2026 Royal Bridal Series" },
  { id: "ready-ship", label: "Ready-to-Ship Wholesale Stock" },
  { id: "oem-custom", label: "OEM Custom Tech-Pack Series" },
];

const FABRIC_OPTIONS = [
  { id: "mulberry-silk", label: "100% Mulberry Silk" },
  { id: "stretch-satin", label: "Heavy Stretch Satin" },
  { id: "french-lace", label: "French Chantilly Lace" },
  { id: "velvet-organza", label: "Silk Organza & Velvet" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL", "Custom Size"];

export function ProductFilter({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  isMobile = false,
  onCloseMobile,
}: ProductFilterProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    collections: true,
    fabrics: true,
    sizes: true,
    moq: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxToggle = (
    key: "categories" | "collections" | "fabrics" | "sizes",
    value: string,
  ) => {
    const currentList = filters[key];
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];

    onFilterChange({ ...filters, [key]: updated });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.collections.length +
    filters.fabrics.length +
    filters.sizes.length +
    (filters.moqTier ? 1 : 0);

  return (
    <aside
      className={`bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-5 space-y-6 shadow-sm ${
        isMobile ? "w-full" : "sticky top-28"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Filter Catalog
          </h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}

          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
          {[
            ...filters.categories,
            ...filters.collections,
            ...filters.fabrics,
            ...filters.sizes,
          ].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium"
            >
              {chip}
              <button
                onClick={() => {
                  if (filters.categories.includes(chip))
                    handleCheckboxToggle("categories", chip);
                  else if (filters.collections.includes(chip))
                    handleCheckboxToggle("collections", chip);
                  else if (filters.fabrics.includes(chip))
                    handleCheckboxToggle("fabrics", chip);
                  else if (filters.sizes.includes(chip))
                    handleCheckboxToggle("sizes", chip);
                }}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Accordion 1: Categories */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
        >
          <span>Dress Categories</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.categories ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.categories && (
          <div className="mt-3 space-y-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const isChecked = filters.categories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between group cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300 group-hover:border-blue-400 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      className={`${
                        isChecked
                          ? "font-bold text-slate-900"
                          : "text-slate-600"
                      } group-hover:text-slate-900 transition-colors`}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ({cat.count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Collections */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection("collections")}
          className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
        >
          <span>Boutique Collections</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.collections ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.collections && (
          <div className="mt-3 space-y-2">
            {COLLECTION_OPTIONS.map((col) => {
              const isChecked = filters.collections.includes(col.id);
              return (
                <label
                  key={col.id}
                  className="flex items-center gap-2.5 cursor-pointer text-xs group"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 group-hover:border-blue-400 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`${
                      isChecked ? "font-bold text-slate-900" : "text-slate-600"
                    } group-hover:text-slate-900 transition-colors`}
                  >
                    {col.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 3: Fabric & Materials */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection("fabrics")}
          className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
        >
          <span>Fabric Specifications</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.fabrics ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.fabrics && (
          <div className="mt-3 space-y-2">
            {FABRIC_OPTIONS.map((fab) => {
              const isChecked = filters.fabrics.includes(fab.id);
              return (
                <label
                  key={fab.id}
                  className="flex items-center gap-2.5 cursor-pointer text-xs group"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 group-hover:border-blue-400 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`${
                      isChecked ? "font-bold text-slate-900" : "text-slate-600"
                    } group-hover:text-slate-900 transition-colors`}
                  >
                    {fab.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 4: Available Sizing */}
      <div className="border-b border-slate-100 pb-4">
        <button
          onClick={() => toggleSection("sizes")}
          className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
        >
          <span>Size Grading</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.sizes ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.sizes && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SIZE_OPTIONS.map((size) => {
              const isChecked = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleCheckboxToggle("sizes", size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    isChecked
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 5: Wholesale MOQ Tier */}
      <div>
        <button
          onClick={() => toggleSection("moq")}
          className="w-full flex items-center justify-between py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 transition-colors"
        >
          <span>Minimum Order (MOQ)</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.moq ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.moq && (
          <div className="mt-3 space-y-2 text-xs">
            {[
              { id: "all", label: "All Quantities" },
              { id: "low-moq", label: "Ready Stock (MOQ 10 pcs)" },
              { id: "custom-moq", label: "OEM Custom (MOQ 50 pcs)" },
            ].map((moq) => (
              <label
                key={moq.id}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="moqTier"
                  checked={filters.moqTier === moq.id}
                  onChange={() =>
                    onFilterChange({ ...filters, moqTier: moq.id })
                  }
                  className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-slate-700 font-medium">{moq.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <p className="text-[11px] text-slate-400 text-center">
          Showing {totalResults} refined products
        </p>
      </div>
    </aside>
  );
}
