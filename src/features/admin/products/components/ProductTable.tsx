"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Package, Eye, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/features/common/ui/DataTable";
import { ProductQueryParams, Product, RecordStatus } from "../types/display";
import { useProducts } from "../hooks/useGetProducts";

const STATUS_BADGE_STYLES: Record<RecordStatus, string> = {
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

export function ProductTable() {
  const [params, setParams] = useState<ProductQueryParams>({
    page: 1,
    page_size: 10,
    search: "",
    status: undefined,
  });

  const { data, isLoading, isError, error } = useProducts(params);

  const products = data?.items ?? [];
  const pagination = data?.pagination ?? {
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 1,
  };

  const hasActiveFilters = Boolean(params.search || params.status);

  const columns: Column<Product>[] = [
    {
      header: "Product",
      cell: (item) => (
        <div className="flex items-center gap-3">
          {item.image?.url ? (
            <Image
              src={item.image.url}
              alt={item.name}
              unoptimized
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 shrink-0 font-bold text-[10px]">
              IMG
            </div>
          )}
          <div className="min-w-0">
            <p className="font-bold text-slate-900 truncate">{item.name}</p>
            <p className="text-[11px] text-slate-500 font-mono truncate">
              {item.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Product Code",
      cell: (item) => (
        <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {item.product_code}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (item) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${
            STATUS_BADGE_STYLES[item.status] || STATUS_BADGE_STYLES.DRAFT
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Created",
      cell: (item) => (
        <span className="text-xs text-slate-500 font-mono">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/admin/catalog/products/${item.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              // Handle deletion workflow or modal trigger here
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or code..."
            value={params.search || ""}
            onChange={(e) => {
              setParams((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }));
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <select
            value={params.status || ""}
            onChange={(e) => {
              setParams((prev) => ({
                ...prev,
                status: (e.target.value as RecordStatus) || undefined,
                page: 1,
              }));
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Error Banner */}
      {isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-mono">
          {error?.message || "Failed to load product catalog records."}
        </div>
      )}

      {/* Reusable DataTable Component */}
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        emptyIcon={Package}
        emptyTitle="No products found"
        emptyDescription="Try adjusting your search query or status filter."
        page={pagination.page}
        totalPages={pagination.total_pages}
        onPageChange={(newPage) =>
          setParams((prev) => ({ ...prev, page: newPage }))
        }
        getRowKey={(item) => item.id}
      />
    </div>
  );
}
