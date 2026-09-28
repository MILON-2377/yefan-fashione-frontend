"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Search, FileText } from "lucide-react";
import { ProductCard, Product } from "@/components/products/ProductCard";
import { DesktopFilter } from "@/components/products/DesktopFilter";
import { MobileFilter } from "@/components/products/MobileFilter";
import { useCategories } from "@/hooks/useCategories";

// Sample Product Dataset
const SAMPLE_PRODUCTS: (Product & { slug: string })[] = [
  {
    id: "prod-1",
    slug: "celestial-draped-mulberry-silk-evening-gown",
    title: "Celestial Draped Mulberry Silk Evening Gown",
    category: "evening-gowns",
    collection: "2026 Spring / Summer Lookbook",
    priceEstimate: "$85.00 - $120.00 / pc",
    moq: "MOQ: 10 pcs",
    primaryImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    fabric: "100% Mulberry Silk",
    colors: ["#1E293B", "#94A3B8", "#E2E8F0"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
  },
  {
    id: "prod-2",
    slug: "hand-beaded-french-lace-bridal-dress",
    title: "Hand-Beaded French Lace Bridal Dress",
    category: "bridal-wear",
    collection: "2026 Royal Bridal Series",
    priceEstimate: "$140.00 - $210.00 / pc",
    moq: "MOQ: 5 pcs",
    primaryImage:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80",
    fabric: "French Lace & Tulle",
    colors: ["#FFFFFF", "#F8FAFC"],
    sizes: ["S", "M", "L", "Custom"],
    inStock: true,
    isNew: true,
  },
  {
    id: "prod-3",
    slug: "satin-asymmetric-bodycon-cocktail-mini",
    title: "Satin Asymmetric Bodycon Cocktail Mini",
    category: "cocktail-dresses",
    collection: "Ready-to-Ship Wholesale Stock",
    priceEstimate: "$38.00 - $55.00 / pc",
    moq: "MOQ: 20 pcs",
    primaryImage:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
    fabric: "Heavy Stretch Satin",
    colors: ["#991B1B", "#1E1B4B", "#047857"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    isNew: false,
  },
  {
    id: "prod-4",
    slug: "backless-cowl-neck-slip-evening-dress",
    title: "Backless Cowl-Neck Slip Evening Dress",
    category: "slip-dresses",
    collection: "2026 Spring / Summer Lookbook",
    priceEstimate: "$45.00 - $68.00 / pc",
    moq: "MOQ: 10 pcs",
    primaryImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    fabric: "Grade 6A Mulberry Silk",
    colors: ["#D97706", "#0284C7", "#475569"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
  },
  {
    id: "prod-5",
    slug: "bespoke-double-breasted-women-tuxedo-suit",
    title: "Bespoke Double-Breasted Women Tuxedo Suit",
    category: "tailored-suits",
    collection: "OEM Custom Tech-Pack Series",
    priceEstimate: "$95.00 - $135.00 / pc",
    moq: "MOQ: 30 pcs",
    primaryImage:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    fabric: "Fine Wool Blend",
    colors: ["#0F172A", "#FFFFFF"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    inStock: true,
    isNew: false,
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Collections" },
  { id: "evening-gowns", label: "Evening Gowns" },
  { id: "bridal-wear", label: "Bridal Wear" },
  { id: "cocktail-dresses", label: "Cocktail Dresses" },
  { id: "slip-dresses", label: "Slip Dresses" },
  { id: "tailored-suits", label: "Tailored Suits" },
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Dynamic backend categories hook
  const { data: categories = [] } = useCategories();

  // Active state handlers
  const activeCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeCategory !== "all" ? activeCategory : "",
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (priceRange[1] < 500 ? 1 : 0);

  const handleCategoryTabChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
      setSelectedCategory("");
    } else {
      params.set("category", categoryId);
      setSelectedCategory(categoryId);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 500]);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push(`/products?${params.toString()}`);
  };

  // Filter evaluation logic
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white text-slate-900 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>2026 Wholesale & OEM Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Boutique Apparel & Dress Collections
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore high-resolution tech-packs, luxury silk eveningwear, and
              ready-to-ship boutique dresses designed in Guangzhou.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>Download 2026 Catalog PDF</span>
          </Link>
        </div>

        {/* Category Pill Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive =
              (tab.id === "all" && !selectedCategory) ||
              selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryTabChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Mobile Filter Trigger Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dress style or fabric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>

          {/* Mobile View Filter Trigger Button */}
          <div className="w-full sm:w-auto lg:hidden">
            <MobileFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onReset={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        {/* Main Section: Left Sticky Desktop Filter Sidebar & Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filter Component */}
          <div className="hidden lg:block lg:col-span-3">
            <DesktopFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <p className="text-sm font-bold text-slate-700">
                  No dresses found matching your criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-xs font-bold text-slate-500">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}

// "use client";

// import { useState, use, Suspense } from "react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Sparkles, SlidersHorizontal, Search, FileText } from "lucide-react";
// import {
//   ProductFilter,
//   FilterState,
// } from "@/components/products/ProductFilter";
// import { ProductCard, Product } from "@/components/products/ProductCard";
// import { DesktopFilter } from "@/components/products/DesktopFilter";
// import { MobileFilter } from "@/components/products/MobileFilter";
// import { useCategories } from "@/hooks/useCategories";

// // Catalog Dataset with Slugs
// const SAMPLE_PRODUCTS: (Product & { slug: string })[] = [
//   {
//     id: "prod-1",
//     slug: "celestial-draped-mulberry-silk-evening-gown",
//     title: "Celestial Draped Mulberry Silk Evening Gown",
//     category: "evening-gowns",
//     collection: "2026 Spring / Summer Lookbook",
//     priceEstimate: "$85.00 - $120.00 / pc",
//     moq: "MOQ: 10 pcs",
//     primaryImage:
//       "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
//     secondaryImage:
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
//     fabric: "100% Mulberry Silk",
//     colors: ["#1E293B", "#94A3B8", "#E2E8F0"],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     inStock: true,
//     isNew: true,
//   },
//   {
//     id: "prod-2",
//     slug: "hand-beaded-french-lace-bridal-dress",
//     title: "Hand-Beaded French Lace Bridal Dress",
//     category: "bridal-wear",
//     collection: "2026 Royal Bridal Series",
//     priceEstimate: "$140.00 - $210.00 / pc",
//     moq: "MOQ: 5 pcs",
//     primaryImage:
//       "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80",
//     secondaryImage:
//       "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80",
//     fabric: "French Lace & Tulle",
//     colors: ["#FFFFFF", "#F8FAFC"],
//     sizes: ["S", "M", "L", "Custom"],
//     inStock: true,
//     isNew: true,
//   },
//   {
//     id: "prod-3",
//     slug: "satin-asymmetric-bodycon-cocktail-mini",
//     title: "Satin Asymmetric Bodycon Cocktail Mini",
//     category: "cocktail-dresses",
//     collection: "Ready-to-Ship Wholesale Stock",
//     priceEstimate: "$38.00 - $55.00 / pc",
//     moq: "MOQ: 20 pcs",
//     primaryImage:
//       "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
//     secondaryImage:
//       "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
//     fabric: "Heavy Stretch Satin",
//     colors: ["#991B1B", "#1E1B4B", "#047857"],
//     sizes: ["XS", "S", "M", "L"],
//     inStock: true,
//     isNew: false,
//   },
//   {
//     id: "prod-4",
//     slug: "backless-cowl-neck-slip-evening-dress",
//     title: "Backless Cowl-Neck Slip Evening Dress",
//     category: "slip-dresses",
//     collection: "2026 Spring / Summer Lookbook",
//     priceEstimate: "$45.00 - $68.00 / pc",
//     moq: "MOQ: 10 pcs",
//     primaryImage:
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
//     secondaryImage:
//       "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
//     fabric: "Grade 6A Mulberry Silk",
//     colors: ["#D97706", "#0284C7", "#475569"],
//     sizes: ["S", "M", "L", "XL"],
//     inStock: true,
//     isNew: true,
//   },
//   {
//     id: "prod-5",
//     slug: "bespoke-double-breasted-women-tuxedo-suit",
//     title: "Bespoke Double-Breasted Women Tuxedo Suit",
//     category: "tailored-suits",
//     collection: "OEM Custom Tech-Pack Series",
//     priceEstimate: "$95.00 - $135.00 / pc",
//     moq: "MOQ: 30 pcs",
//     primaryImage:
//       "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
//     secondaryImage:
//       "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
//     fabric: "Fine Wool Blend",
//     colors: ["#0F172A", "#FFFFFF"],
//     sizes: ["XS", "S", "M", "L", "XL", "2XL"],
//     inStock: true,
//     isNew: false,
//   },
// ];

// const CATEGORY_TABS = [
//   { id: "all", label: "All Collections" },
//   { id: "evening-gowns", label: "Evening Gowns" },
//   { id: "bridal-wear", label: "Bridal Wear" },
//   { id: "cocktail-dresses", label: "Cocktail Dresses" },
//   { id: "slip-dresses", label: "Slip Dresses" },
//   { id: "tailored-suits", label: "Tailored Suits" },
// ];

// function ProductsCatalogContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const activeCategory = searchParams.get("category") || "all";

//   const [filters, setFilters] = useState<FilterState>({
//     categories: activeCategory !== "all" ? [activeCategory] : [],
//     collections: [],
//     sizes: [],
//     fabrics: [],
//     moqTier: "all",
//     priceRange: [0, 500],
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//   const handleCategoryTabChange = (categoryId: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (categoryId === "all") {
//       params.delete("category");
//     } else {
//       params.set("category", categoryId);
//     }
//     router.push(`/products?${params.toString()}`);

//     setFilters((prev) => ({
//       ...prev,
//       categories: categoryId !== "all" ? [categoryId] : [],
//     }));
//   };

//   const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
//     if (activeCategory !== "all" && product.category !== activeCategory) {
//       return false;
//     }
//     if (
//       searchQuery &&
//       !product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     ) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <div className="bg-white text-slate-900 py-10 lg:py-14">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
//         {/* Page Title Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
//           <div className="space-y-3 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
//               <Sparkles className="w-4 h-4 text-blue-600" />
//               <span>2026 Wholesale & OEM Catalog</span>
//             </div>
//             <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
//               Boutique Apparel & Dress Collections
//             </h1>
//             <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
//               Explore high-resolution tech-packs, luxury silk eveningwear, and
//               ready-to-ship boutique dresses designed in Guangzhou.
//             </p>
//           </div>

//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0"
//           >
//             <FileText className="w-4 h-4" />
//             <span>Download 2026 Catalog PDF</span>
//           </Link>
//         </div>

//         {/* Category Pill Tabs Navigation */}
//         <div className="flex items-center gap-2 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
//           {CATEGORY_TABS.map((tab) => {
//             const isActive = activeCategory === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => handleCategoryTabChange(tab.id)}
//                 className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-sm"
//                     : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Search & Mobile Filter Controls */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
//           <div className="relative w-full sm:w-80">
//             <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//             <input
//               type="text"
//               placeholder="Search dress style or fabric..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-all"
//             />
//           </div>

//           <button
//             onClick={() => setMobileFilterOpen(true)}
//             className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl shadow-2xs w-full sm:w-auto justify-center"
//           >
//             <SlidersHorizontal className="w-4 h-4 text-blue-600" />
//             <span>Filter Catalog</span>
//           </button>
//         </div>

//         {/* Main Grid: Left Filter Sidebar & Right Products Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           <div className="hidden lg:block lg:col-span-3">
//             <ProductFilter
//               filters={filters}
//               onFilterChange={setFilters}
//               onReset={() => {
//                 setFilters({
//                   categories: [],
//                   collections: [],
//                   sizes: [],
//                   fabrics: [],
//                   moqTier: "all",
//                   priceRange: [0, 500],
//                 });
//                 handleCategoryTabChange("all");
//               }}
//               totalResults={filteredProducts.length}
//             />
//           </div>

//           <div className="lg:col-span-9 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="p-10 text-center text-xs font-bold">
//           Loading catalog...
//         </div>
//       }
//     >
//       <ProductsCatalogContent />
//     </Suspense>
//   );
// }
