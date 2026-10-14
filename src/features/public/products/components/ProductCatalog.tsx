"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Search, FileText } from "lucide-react";
import { useCatalogProducts } from "@/features/public/products/hooks/useCatalogProducts";
import { ProductCard } from "@/features/public/products/components/ProductCard";
import { DesktopFilter } from "@/features/public/products/components/DesktopFilter";
import { MobileFilter } from "@/features/public/products/components/MobileFilter";
import { usePublicCategories } from "@/features/public/categories/hooks/usePublicCategories";
import { AppButton } from "@/features/common/ui/AppButton";
import { useLanguage } from "@/context/LanguageContext";
import { usePublicBrands } from "@/features/public/brands/hooks/usePublicBrands";

export default function ProductsCatalogContent() {
  const { dict } = useLanguage();
  const content = dict.productCatalog;

  const searchParams = useSearchParams();
  const router = useRouter();

  // Dynamic Public Brands Hook
  const { data: brandsResponse } = usePublicBrands();
  const fetchedBrands = brandsResponse?.items ?? [];

  // Construct Brand Tabs (Default "All" + API Brands)
  const brandTabs = [
    { id: "all", name: content.brandTabs?.all || "All Brands & Lines" },
    ...fetchedBrands,
  ];

  // Dynamic Public Categories Hook
  const { data: categoriesData } = usePublicCategories();
  const categories = categoriesData?.items ?? [];

  // URL State Management
  const activeBrand = searchParams.get("brand") || "all";
  const activeCategory = searchParams.get("category") || "";
  const activeCollection = searchParams.get("collection") || "";

  const [selectedBrand, setSelectedBrand] = useState<string>(
    activeBrand !== "all" ? activeBrand : "",
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>(activeCategory);
  const [selectedCollection, setSelectedCollection] =
    useState<string>(activeCollection);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Live Products Query Hook (Includes dynamic brand_id filtering)
  const {
    data: productsData,
    isLoading,
    isError,
  } = useCatalogProducts({
    category_id: selectedCategory || undefined,
    collection_id: selectedCollection || undefined, // <-- Added collection_id
    brand_id: selectedBrand || undefined,
    search: searchQuery || undefined,
    limit: 24,
  });

  const products = productsData?.items ?? [];

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedCollection ? 1 : 0) +
    (selectedBrand ? 1 : 0);

  // Brand Pill Tab Change Handler
  const handleBrandTabChange = (brandId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brandId === "all") {
      params.delete("brand");
      setSelectedBrand("");
    } else {
      params.set("brand", brandId);
      setSelectedBrand(brandId);
    }
    router.push(`/products?${params.toString()}`);
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedCollection("");
    setSearchQuery("");
    const params = new URLSearchParams();
    router.push(`/products?${params.toString()}`);
  };

  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId);
    const params = new URLSearchParams(searchParams.toString());
    if (collectionId) {
      params.set("collection", collectionId);
    } else {
      params.delete("collection");
    }
    router.push(`/products?${params.toString()}`, { scroll: false }); // <-- Added scroll: false
  };

  return (
    <div className="bg-white text-slate-900 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* --- Page Title & Download Banner Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{content.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {content.heading}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {content.subheading}
            </p>
          </div>

          <AppButton
            render={<Link href="/downloads" />}
            variant="primary"
            leftIcon={<FileText className="w-4 h-4" />}
            className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shrink-0"
          >
            {content.allCatalogsBtn}
          </AppButton>
        </div>

        {/* --- Top Bar: Brand Pill Tabs --- */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
          {brandTabs.map((tab) => {
            const isActive =
              (tab.id === "all" && !selectedBrand) || selectedBrand === tab.id;
            return (
              <AppButton
                key={tab.id}
                type="button"
                onClick={() => handleBrandTabChange(tab.id)}
                variant="secondary"
                size="sm"
                className={`rounded-full text-xs font-bold whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {tab.name}
              </AppButton>
            );
          })}
        </div>

        {/* --- Search Input & Mobile Filter Action Header --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={content.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>

          {/* Mobile Filter Sheet Trigger */}
          <div className="w-full sm:w-auto lg:hidden">
            <MobileFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedCollection={selectedCollection}
              onSelectCollection={handleCollectionChange}
              onReset={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        {/* --- Main Content Grid: Sticky Left Filter Sidebar + Right Products Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <DesktopFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedCollection={selectedCollection}
              onSelectCollection={handleCollectionChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product Cards Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-slate-100 rounded-2xl border border-slate-200"
                  />
                ))}
              </div>
            ) : isError || products.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-slate-700">
                  {content.noProductsFound}
                </p>
                <AppButton
                  type="button"
                  variant="ghost"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  {content.clearFiltersBtn}
                </AppButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
