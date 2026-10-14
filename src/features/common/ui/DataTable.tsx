"use client";

import React from "react";
import { FolderTree, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<TData> {
  header: string;
  accessorKey?: keyof TData;
  className?: string;
  headerClassName?: string;
  cell?: (item: TData) => React.ReactNode;
}

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  isLoading?: boolean;
  hasActiveFilters?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ElementType;
  page?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  getRowKey: (item: TData) => string | number;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  hasActiveFilters = false,
  emptyTitle = "No records found",
  emptyDescription,
  emptyIcon: EmptyIcon = FolderTree,
  page,
  totalPages,
  onPageChange,
  getRowKey,
}: DataTableProps<TData>) {
  const showPagination =
    typeof page === "number" &&
    typeof totalPages === "number" &&
    totalPages > 1 &&
    !!onPageChange;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
          <p className="text-xs font-mono">Loading data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="p-12 text-center space-y-3">
          <EmptyIcon className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
          <h3 className="text-sm font-semibold text-slate-800">{emptyTitle}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {emptyDescription ||
              (hasActiveFilters
                ? "Try adjusting your filters or search terms."
                : "Get started by creating your first entry.")}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                {columns.map((col, index) => (
                  <th
                    key={col.header || index}
                    className={`py-3 px-4 ${col.headerClassName || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {data.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {columns.map((col, index) => (
                    <td
                      key={col.header || index}
                      className={`py-3 px-4 ${col.className || ""}`}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                        ? String(row[col.accessorKey] ?? "")
                        : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Unified Pagination Bar */}
      {showPagination && (
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
