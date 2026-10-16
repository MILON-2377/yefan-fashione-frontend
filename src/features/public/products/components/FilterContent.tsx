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
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-4">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
            Collection Preferences
          </span>
          <h3 className="mt-1 font-serif text-xl font-normal tracking-tight text-[#211F1C]">
            {content.title}
          </h3>
        </div>

        {onCloseMobile && (
          <AppButton
            type="button"
            onClick={onCloseMobile}
            variant="secondary"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E1D9] bg-white p-0 text-[#625D57] shadow-none transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C] sm:hidden"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </AppButton>
        )}
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E7E1D9] bg-white text-[#806B55]">
            <Layers className="h-4 w-4" />
          </span>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.13em] text-[#211F1C]">
              {content.categories}
            </h4>
            <p className="mt-0.5 text-[11px] text-[#9D8974]">
              Browse by product category
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className={`group flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left text-xs transition-all duration-200 ${
              selectedCategory === ""
                ? "border-[#D8C9B8] bg-white font-medium text-[#211F1C]"
                : "border-transparent text-[#625D57] hover:border-[#E7E1D9] hover:bg-white"
            }`}
          >
            <span>{content.allCategories}</span>
            {selectedCategory === "" && (
              <Check className="h-4 w-4 shrink-0 text-[#806B55]" />
            )}
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                aria-pressed={isActive}
                className={`group flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left text-xs transition-all duration-200 ${
                  isActive
                    ? "border-[#D8C9B8] bg-white font-medium text-[#211F1C]"
                    : "border-transparent text-[#625D57] hover:border-[#E7E1D9] hover:bg-white"
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isActive && (
                  <Check className="h-4 w-4 shrink-0 text-[#806B55]" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Collections */}
      <section className="space-y-4 border-t border-[#E7E1D9] pt-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E7E1D9] bg-white text-[#806B55]">
            <Sparkles className="h-4 w-4" />
          </span>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.13em] text-[#211F1C]">
              {content.collections}
            </h4>
            <p className="mt-0.5 text-[11px] text-[#9D8974]">
              Discover curated designs
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCollection("")}
            aria-pressed={selectedCollection === ""}
            className={`group flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left text-xs transition-all duration-200 ${
              selectedCollection === ""
                ? "border-[#D8C9B8] bg-white font-medium text-[#211F1C]"
                : "border-transparent text-[#625D57] hover:border-[#E7E1D9] hover:bg-white"
            }`}
          >
            <span>{content.allCollections}</span>
            {selectedCollection === "" && (
              <Check className="h-4 w-4 shrink-0 text-[#806B55]" />
            )}
          </button>

          {isLoadingCollections ? (
            <div className="space-y-3 px-3.5 py-4">
              <div className="h-3 w-2/3 animate-pulse rounded bg-[#E7E1D9]" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-[#E7E1D9]" />
              <p className="text-[11px] text-[#9D8974]">
                {content.loadingCollections}
              </p>
            </div>
          ) : (
            collectionsList.map((col) => {
              const isActive = selectedCollection === col.id;

              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onSelectCollection(col.id)}
                  aria-pressed={isActive}
                  className={`group flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-3 text-left text-xs transition-all duration-200 ${
                    isActive
                      ? "border-[#D8C9B8] bg-white font-medium text-[#211F1C]"
                      : "border-transparent text-[#625D57] hover:border-[#E7E1D9] hover:bg-white"
                  }`}
                >
                  <span className="truncate">{col.name}</span>
                  {isActive && (
                    <Check className="h-4 w-4 shrink-0 text-[#806B55]" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Reset Filters */}
      <div className="border-t border-[#E7E1D9] pt-5">
        <AppButton
          type="button"
          onClick={onReset}
          variant="secondary"
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          className="h-11 w-full justify-center rounded-full border border-[#D8C9B8] bg-transparent text-xs font-medium text-[#625D57] shadow-none transition-all duration-300 hover:border-[#211F1C] hover:bg-white hover:text-[#211F1C]"
        >
          {content.resetFilters}
        </AppButton>
      </div>
    </div>
  );
}
