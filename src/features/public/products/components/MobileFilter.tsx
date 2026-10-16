"use client";

import { useState } from "react";
import { FilterContent } from "./FilterContent";
import { SlidersHorizontal, X } from "lucide-react";
import { AppButton } from "@/features/common/ui/app-button";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";
import { useLanguage } from "@/context/LanguageContext";

interface MobileFilterProps {
  categories: PublicCategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedCollection: string;
  onSelectCollection: (id: string) => void;
  onReset: () => void;
  activeFilterCount: number;
}

export function MobileFilter(props: MobileFilterProps) {
  const { dict } = useLanguage();
  const content = dict.mobileFilter;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full lg:hidden">
      {/* Mobile Filter Trigger */}
      <AppButton
        type="button"
        onClick={() => setIsOpen(true)}
        leftIcon={<SlidersHorizontal className="h-4 w-4" />}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-[#E7E1D9] bg-white px-4 text-xs font-medium uppercase tracking-[0.12em] text-[#211F1C] shadow-none transition-all duration-300 hover:border-[#D8C9B8] hover:bg-[#FAF8F4]"
      >
        <span>{content.filterBtn}</span>

        {props.activeFilterCount > 0 && (
          <span className="ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#211F1C] px-1.5 text-[10px] font-semibold text-white">
            {props.activeFilterCount}
          </span>
        )}
      </AppButton>

      {/* Filter Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 cursor-default bg-[#211F1C]/35 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={content.filterBtn}
            className="animate-in slide-in-from-right relative z-10 flex h-full w-full max-w-sm flex-col overflow-hidden border-l border-[#E7E1D9] bg-[#FAF8F4] shadow-2xl duration-300"
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-[#E7E1D9] bg-white px-5 py-5 sm:px-6">
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                  Refine Your Selection
                </span>

                <h2 className="font-serif text-2xl font-normal tracking-tight text-[#211F1C]">
                  {content.filterBtn}
                </h2>

                <p className="text-xs leading-5 text-[#625D57]">
                  Choose categories and collections to explore.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E7E1D9] text-[#51463B] transition-colors hover:bg-[#F0ECE6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Active Filter Summary */}
            {props.activeFilterCount > 0 && (
              <div className="flex items-center justify-between border-b border-[#E7E1D9] px-5 py-3 sm:px-6">
                <span className="text-xs text-[#625D57]">
                  {props.activeFilterCount} active{" "}
                  {props.activeFilterCount === 1 ? "filter" : "filters"}
                </span>

                <button
                  type="button"
                  onClick={props.onReset}
                  className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#806B55] transition-colors hover:text-[#211F1C]"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Filter Options */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              <FilterContent
                {...props}
                onCloseMobile={() => setIsOpen(false)}
              />
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-[#E7E1D9] bg-white p-5 sm:px-6">
              <AppButton
                type="button"
                onClick={() => setIsOpen(false)}
                variant="primary"
                className="h-12 w-full rounded-full border border-[#211F1C] bg-[#211F1C] text-xs font-medium uppercase tracking-[0.14em] text-white shadow-none transition-colors hover:border-[#51463B] hover:bg-[#51463B]"
              >
                {content.applyBtn}
              </AppButton>

              <p className="mt-3 text-center text-[10px] leading-5 text-[#9D8974]">
                Find the right designs for your collection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
