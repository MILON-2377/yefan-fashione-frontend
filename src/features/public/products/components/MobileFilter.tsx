"use client";

import { useState } from "react";
import { FilterContent } from "./FilterContent";
import { SlidersHorizontal } from "lucide-react";
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
    <div className="lg:hidden w-full">
      {/* Mobile Filter Trigger Button */}
      <AppButton
        type="button"
        onClick={() => setIsOpen(true)}
        leftIcon={<SlidersHorizontal className="w-4 h-4 text-blue-400" />}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
      >
        <span>{content.filterBtn}</span>
        {props.activeFilterCount > 0 && (
          <span className="ml-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center">
            {props.activeFilterCount}
          </span>
        )}
      </AppButton>

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

            {/* Apply & Close Button */}
            <div className="pt-6 border-t border-slate-100 mt-auto">
              <AppButton
                type="button"
                onClick={() => setIsOpen(false)}
                variant="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                {content.applyBtn}
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
