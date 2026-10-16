"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, X, SlidersHorizontal, Loader2 } from "lucide-react";
import { RecordStatus, ProductSortField, SortOrder } from "../../types/display";
import { useCatalogLookups } from "../../hooks/useCatalogLookups";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useRouter } from "next/navigation";

interface ProductTableToolbarProps {
  search?: string;
  status?: RecordStatus;
  categoryId?: string;
  collectionId?: string;
  brandId?: string;
  sortBy?: ProductSortField;
  sortOrder?: SortOrder;

  onSearchChange: (value: string) => void;
  onStatusChange: (status: RecordStatus | undefined) => void;
  onCategoryChange: (categoryId: string | undefined) => void;
  onCollectionChange: (collectionId: string | undefined) => void;
  onBrandChange: (brandId: string | undefined) => void;
  onSortChange: (sortBy: ProductSortField, sortOrder: SortOrder) => void;
  onClearFilters: () => void;
}

export function ProductTableToolbar({
  search = "",
  status,
  categoryId,
  collectionId,
  brandId,
  sortBy = "created_at",
  sortOrder = "desc",
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onCollectionChange,
  onBrandChange,
  onSortChange,
  onClearFilters,
}: ProductTableToolbarProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setSearchValue(search);
  }

  const {
    categories,
    brands,
    collections,
    isLoading: isLookupsLoading,
  } = useCatalogLookups();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== search) {
        onSearchChange(searchValue);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchValue, search, onSearchChange]);

  const hasActiveFilters = Boolean(
    search || status || categoryId || collectionId || brandId,
  );

  const handleNavigateCreateProductPage = () => {
    router.push("/admin/catalog/products/new");
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search products by name or code..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                onSearchChange("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <ActionButton
          type="submit"
          variant="primary"
          size="md"
          icon={Plus}
          onClick={handleNavigateCreateProductPage}
        >
          Create Product
        </ActionButton>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100 text-xs">
        <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider pr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
        </span>

        <select
          value={status || ""}
          onChange={(e) =>
            onStatusChange(
              e.target.value ? (e.target.value as RecordStatus) : undefined,
            )
          }
          className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-900"
        >
          <option value="">Status: All</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={categoryId || ""}
          disabled={isLookupsLoading}
          onChange={(e) => onCategoryChange(e.target.value || undefined)}
          className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-900 max-w-40 truncate disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">Category: All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={collectionId || ""}
          disabled={isLookupsLoading}
          onChange={(e) => onCollectionChange(e.target.value || undefined)}
          className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-900 max-w-40 truncate disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">Collection: All</option>
          {collections.map((col) => (
            <option key={col.id} value={col.id}>
              {col.name}
            </option>
          ))}
        </select>

        <select
          value={brandId || ""}
          disabled={isLookupsLoading}
          onChange={(e) => onBrandChange(e.target.value || undefined)}
          className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-900 max-w-40 truncate disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">Brand: All</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {isLookupsLoading && (
          <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
            <Loader2 className="w-3 h-3 animate-spin" /> Loading options...
          </span>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-slate-400 font-mono text-[11px] uppercase">
            Sort:
          </span>
          <select
            value={`${sortBy}:${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split(":") as [
                ProductSortField,
                SortOrder,
              ];
              onSortChange(field, order);
            }}
            className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:border-slate-900"
          >
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="product_code:asc">Code (A-Z)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchValue("");
              onClearFilters();
            }}
            className="px-2.5 py-1.5 font-mono text-[11px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 font-semibold"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
