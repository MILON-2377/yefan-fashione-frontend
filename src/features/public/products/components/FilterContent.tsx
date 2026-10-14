"use client";

import { Check, RotateCcw, X, Layers, Sparkles } from "lucide-react";
import { PublicCategoryItem } from "@/features/public/categories/types/categoryTypes";
import { usePublicCollections } from "../../collections/hooks/usePublicCollection";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";

interface FilterContentProps {
  categories: PublicCategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  selectedCollection: string;
  onSelectCollection: (id: string) => void;
  onReset: () => void;
  onCloseMobile?: () => void;
}

export function FilterContent({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  onReset,
  onCloseMobile,
}: FilterContentProps) {
  const { dict } = useLanguage();
  const content = dict.filterContent;

  // Dynamic Collections Hook with fallback to dictionary items
  const { data: collectionsData, isLoading: isLoadingCollections } =
    usePublicCollections();
  const apiCollections = collectionsData?.items ?? [];
  const collectionsList =
    apiCollections.length > 0
      ? apiCollections.map((c) => ({ id: c.id, name: c.name }))
      : content.fallbackCollections || [];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          {content.title}
        </h3>
        {onCloseMobile && (
          <AppButton
            type="button"
            onClick={onCloseMobile}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg sm:hidden"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </AppButton>
        )}
      </div>

      {/* Categories Filter Section */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>{content.categories}</span>
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === ""
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{content.allCategories}</span>
            {selectedCategory === "" && (
              <Check className="w-3.5 h-3.5 text-blue-600" />
            )}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="truncate">{cat.name}</span>
              {selectedCategory === cat.id && (
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Collections Filter Section */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{content.collections}</span>
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCollection("")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCollection === ""
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{content.allCollections}</span>
            {selectedCollection === "" && (
              <Check className="w-3.5 h-3.5 text-blue-600" />
            )}
          </button>

          {isLoadingCollections ? (
            <p className="text-[11px] text-slate-400 italic px-3 py-1">
              {content.loadingCollections}
            </p>
          ) : (
            collectionsList.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectCollection(col.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCollection === col.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="truncate">{col.name}</span>
                {selectedCollection === col.id && (
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Reset Action */}
      <div className="pt-2">
        <AppButton
          type="button"
          onClick={onReset}
          variant="secondary"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="w-full justify-center border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition shadow-xs"
        >
          {content.resetFilters}
        </AppButton>
      </div>
    </div>
  );
}
