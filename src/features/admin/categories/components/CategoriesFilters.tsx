"use client";

import { Search, FolderTree, Filter, X } from "lucide-react";
import { CategoryListItemResponse } from "@/features/admin/categories/types";

interface CategoriesFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedParent: string;
  onParentChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  totalItems: number;
  parentCategories: CategoryListItemResponse[];
}

export function CategoriesFilters({
  search,
  onSearchChange,
  selectedParent,
  onParentChange,
  selectedStatus,
  onStatusChange,
  hasActiveFilters,
  onResetFilters,
  totalItems,
  parentCategories,
}: CategoriesFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="relative lg:col-span-5 min-w-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all truncate"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter by Parent Category */}
        <div className="relative lg:col-span-4 min-w-0">
          <FolderTree className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={selectedParent}
            onChange={(e) => onParentChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all appearance-none cursor-pointer truncate"
          >
            <option value="">All Parent Categories</option>
            {parentCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Status */}
        <div className="relative sm:col-span-2 lg:col-span-3 min-w-0">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all appearance-none cursor-pointer truncate"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Filter Summary & Reset Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono text-slate-500">
        <div>
          {hasActiveFilters ? (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-medium transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          ) : (
            <span className="text-slate-400">Showing all records</span>
          )}
        </div>
        <div>
          Total:{" "}
          <span className="font-semibold text-slate-900">{totalItems}</span>
        </div>
      </div>
    </div>
  );
}
