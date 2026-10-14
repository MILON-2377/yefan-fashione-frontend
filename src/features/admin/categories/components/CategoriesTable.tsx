"use client";

import { FolderTree, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Category,
  CategoryListItemResponse,
} from "@/features/admin/categories/types";
import { CategoryTableRow } from "./CategoryTableRow";

interface CategoriesTableProps {
  isLoading: boolean;
  categories: CategoryListItemResponse[];
  allCategories: CategoryListItemResponse[];
  hasActiveFilters: boolean;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onDeleteCategory: (category: Category) => void;
}

export function CategoriesTable({
  isLoading,
  categories,
  hasActiveFilters,
  page,
  totalPages,
  onPageChange,
  onDeleteCategory,
}: CategoriesTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
          <p className="text-xs font-mono">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center space-y-3">
          <FolderTree className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
          <h3 className="text-sm font-semibold text-slate-800">
            No categories found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms."
              : "Get started by creating your first category taxonomy."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Parent Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {categories.map((category) => {
                return (
                  <CategoryTableRow
                    key={category.id}
                    category={category}
                    onDeleteClick={onDeleteCategory}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs text-slate-500 font-mono">
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
