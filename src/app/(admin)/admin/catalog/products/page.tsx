"use client";

import { useState } from "react";
import { useProducts } from "@/features/admin/products/hooks/useGetProducts";
import { ProductTableToolbar } from "@/features/admin/products/components/display/ProductTableToolbar";
import { ProductPagination } from "@/features/admin/products/components/display/ProductPagination";
import {
  ProductQueryParams,
  RecordStatus,
  Product,
  ProductSortField,
  SortOrder,
} from "@/features/admin/products/types/display";
import { ProductTable } from "@/features/admin/products/components/display/ProductTable";

export default function AdminProductsPage() {
  const [params, setParams] = useState<ProductQueryParams>({
    page: 1,
    page_size: 20,
    search: "",
    status: undefined,
    category_id: undefined,
    collection_id: undefined,
    brand_id: undefined,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const { data, isLoading, isError, error } = useProducts(params);

  // Filter Handlers
  const handleSearchChange = (search: string) => {
    setParams((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleStatusChange = (status: RecordStatus | undefined) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleCategoryChange = (category_id: string | undefined) => {
    setParams((prev) => ({ ...prev, category_id, page: 1 }));
  };

  const handleCollectionChange = (collection_id: string | undefined) => {
    setParams((prev) => ({ ...prev, collection_id, page: 1 }));
  };

  const handleBrandChange = (brand_id: string | undefined) => {
    setParams((prev) => ({ ...prev, brand_id, page: 1 }));
  };

  const handleSortChange = (
    sort_by: ProductSortField,
    sort_order: SortOrder,
  ) => {
    setParams((prev) => ({ ...prev, sort_by, sort_order }));
  };

  const handleClearFilters = () => {
    setParams((prev) => ({
      ...prev,
      search: "",
      status: undefined,
      category_id: undefined,
      collection_id: undefined,
      brand_id: undefined,
      page: 1,
    }));
  };

  // Pagination Handlers
  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (page_size: number) => {
    setParams((prev) => ({ ...prev, page_size, page: 1 }));
  };

  // Delete Action Placeholder
  const handleDeleteClick = (product: Product) => {
    console.log("Delete product selected:", product.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Context */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Product Catalog
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Manage product catalog entries, monitor draft statuses, and edit
          inventory details.
        </p>
      </div>

      {/* Toolbar Controls */}
      <ProductTableToolbar
        search={params.search}
        status={params.status}
        categoryId={params.category_id}
        collectionId={params.collection_id}
        brandId={params.brand_id}
        sortBy={params.sort_by}
        sortOrder={params.sort_order}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCategoryChange={handleCategoryChange}
        onCollectionChange={handleCollectionChange}
        onBrandChange={handleBrandChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      {/* Error Banner */}
      {isError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          Failed to load products:{" "}
          {error?.message || "An unexpected error occurred."}
        </div>
      )}

      {/* Main Data Table */}
      <ProductTable
        products={data?.items || []}
        isLoading={isLoading}
        onDeleteClick={handleDeleteClick}
      />

      {/* Pagination Controls */}
      {data?.pagination && (
        <ProductPagination
          pagination={data.pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
