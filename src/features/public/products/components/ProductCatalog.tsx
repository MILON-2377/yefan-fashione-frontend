"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  FileText,
  ArrowUpRight,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

import { useCatalogProducts } from "@/features/public/products/hooks/useCatalogProducts";
import { ProductCard } from "@/features/public/products/components/ProductCard";
import { DesktopFilter } from "@/features/public/products/components/DesktopFilter";
import { MobileFilter } from "@/features/public/products/components/MobileFilter";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import { usePublicBrands } from "@/features/public/brands/hooks/usePublicBrands";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsCatalogContent() {
  const { dict } = useLanguage();
  const content = dict.productCatalog;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const { data: brandsResponse } = usePublicBrands();
  const brands = brandsResponse?.items ?? [];

  const { data: categoriesData } = usePublicCategories();
  const categories = categoriesData?.items ?? [];

  // Read filter state directly from the URL so browser back/forward
  // navigation and shared product URLs stay synchronized.
  const selectedBrand =
    searchParams.get("brand_id") || searchParams.get("brand") || "";

  const selectedCategory =
    searchParams.get("category_id") || searchParams.get("category") || "";

  const selectedCollection =
    searchParams.get("collection_id") || searchParams.get("collection") || "";

  const brandTabs = [
    {
      id: "all",
      name: content.brandTabs?.all || "All Brands & Lines",
    },
    ...brands,
  ];

  const {
    data: productsData,
    isLoading,
    isError,
  } = useCatalogProducts({
    category_id: selectedCategory || undefined,
    collection_id: selectedCollection || undefined,
    brand_id: selectedBrand || undefined,
    search: searchQuery.trim() || undefined,
    limit: 24,
  });

  const products = productsData?.items ?? [];

  const activeFilterCount =
    Number(Boolean(selectedBrand)) +
    Number(Boolean(selectedCategory)) +
    Number(Boolean(selectedCollection));

  // Update a single URL parameter without discarding other filters.
  const updateFilterParam = (keys: string[], value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of keys) {
      params.delete(key);
    }

    if (value) {
      params.set(keys[0], value);
    }

    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  };

  const handleBrandTabChange = (brandId: string) => {
    updateFilterParam(["brand_id", "brand"], brandId === "all" ? "" : brandId);
  };

  const handleCategoryChange = (categoryId: string) => {
    updateFilterParam(["category_id", "category"], categoryId);
  };

  const handleCollectionChange = (collectionId: string) => {
    updateFilterParam(["collection_id", "collection"], collectionId);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    router.push("/products", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#211F1C]">
      <div className="mx-auto max-w-7xl space-y-10 px-5 py-12 sm:px-8 sm:py-16 lg:space-y-12 lg:py-20">
        {/* Page Heading */}
        <section className="flex flex-col justify-between gap-8 border-b border-[#E7E1D9] pb-9 md:flex-row md:items-end lg:pb-12">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#9D8974]">
              <span className="h-px w-8 bg-[#9D8974]" />
              <Sparkles className="h-3.5 w-3.5" />
              <span>{content.badge}</span>
            </div>

            <h1 className="font-serif text-4xl font-normal leading-[1.12] tracking-tight text-[#211F1C] sm:text-5xl lg:text-6xl">
              {content.heading}
            </h1>

            <p className="max-w-xl text-sm leading-7 text-[#625D57] sm:text-base">
              {content.subheading}
            </p>
          </div>

          <AppButton
            render={<Link href="/downloads" />}
            variant="primary"
            leftIcon={<FileText className="h-4 w-4" />}
            className="group h-12 shrink-0 rounded-full border border-[#211F1C] bg-[#211F1C] px-6 text-xs font-medium uppercase tracking-[0.12em] text-white shadow-none transition-all duration-300 hover:border-[#51463B] hover:bg-[#51463B]"
          >
            {content.allCatalogsBtn}
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </AppButton>
        </section>

        {/* Brand Filters */}
        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
              Curated Collections
            </span>

            <span className="text-xs text-[#9D8974]">
              Select a brand to explore
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-[#E7E1D9] pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {brandTabs.map((tab) => {
              const isActive =
                (tab.id === "all" && !selectedBrand) ||
                selectedBrand === tab.id;

              return (
                <AppButton
                  key={tab.id}
                  type="button"
                  onClick={() => handleBrandTabChange(tab.id)}
                  variant="secondary"
                  size="sm"
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "border-[#211F1C] bg-[#211F1C] text-white hover:bg-[#51463B] hover:text-white"
                      : "border-[#E7E1D9] bg-transparent text-[#625D57] hover:border-[#9D8974] hover:bg-white hover:text-[#211F1C]"
                  }`}
                >
                  {tab.name}
                </AppButton>
              );
            })}
          </div>
        </section>

        {/* Search & Mobile Filters */}
        <section className="rounded-xl border border-[#E7E1D9] bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

              <input
                type="search"
                placeholder={content.searchPlaceholder}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label={content.searchPlaceholder}
                className="h-12 w-full rounded-lg border border-transparent bg-[#FAF8F4] pl-11 pr-4 text-sm text-[#211F1C] outline-none transition-all placeholder:text-[#9D8974] focus:border-[#D8C9B8] focus:bg-white"
              />
            </div>

            <div className="w-full sm:w-auto lg:hidden">
              <MobileFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                selectedCollection={selectedCollection}
                onSelectCollection={handleCollectionChange}
                onReset={handleResetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>
        </section>

        {/* Catalog Layout */}
        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Desktop Sidebar */}
          <aside className="sticky top-24 hidden lg:col-span-3 lg:block">
            <div className="rounded-xl border border-[#E7E1D9] bg-white p-5 xl:p-6">
              <div className="mb-6 flex items-center justify-between border-b border-[#E7E1D9] pb-4">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="h-4 w-4 text-[#806B55]" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Refine Selection
                  </h2>
                </div>
              </div>

              <DesktopFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                selectedCollection={selectedCollection}
                onSelectCollection={handleCollectionChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0 space-y-6 lg:col-span-9">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#E7E1D9] pb-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                  The Collection
                </p>

                <h2 className="mt-2 font-serif text-2xl font-normal tracking-tight sm:text-3xl">
                  {content.heading}
                </h2>
              </div>

              <span className="pb-1 text-xs text-[#806B55]">
                {isLoading ? "Loading collection…" : `${products.length} items`}
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-lg bg-[#F0ECE6]" />
                    <div className="mt-4 h-3 w-2/3 rounded bg-[#F0ECE6]" />
                    <div className="mt-3 h-3 w-1/2 rounded bg-[#F0ECE6]" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-[#D8C9B8] bg-white px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F4]">
                  <Search className="h-5 w-5 text-[#9D8974]" />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-normal text-[#211F1C]">
                  Unable to load products
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#625D57]">
                  Something went wrong while loading the catalog. Please try
                  again.
                </p>

                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full border border-[#D8C9B8] bg-transparent px-5 text-xs font-medium text-[#51463B] hover:bg-[#F0ECE6]"
                >
                  {content.clearFiltersBtn}
                </AppButton>
              </div>
            ) : products.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-[#D8C9B8] bg-white px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF8F4]">
                  <Search className="h-5 w-5 text-[#9D8974]" />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-normal text-[#211F1C]">
                  {content.noProductsFound}
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#625D57]">
                  Try adjusting your search or removing some filters to discover
                  more designs.
                </p>

                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full border border-[#D8C9B8] bg-transparent px-5 text-xs font-medium text-[#51463B] hover:bg-[#F0ECE6]"
                >
                  {content.clearFiltersBtn}
                </AppButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Closing Note */}
        <section className="border-t border-[#E7E1D9] pt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-7 text-[#625D57]">
              Looking for a specific design or a private-label solution? Our
              team can help you explore the right options for your collection.
            </p>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#211F1C] transition-colors hover:text-[#806B55]"
            >
              Discuss Your Requirements
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
