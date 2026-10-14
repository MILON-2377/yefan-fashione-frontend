"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "../../types/display";

interface ProductPaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ProductPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) {
  const { page, page_size, total, total_pages } = pagination;

  const startRecord = Math.min((page - 1) * page_size + 1, total);
  const endRecord = Math.min(page * page_size, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      {/* Records Information */}
      <div className="text-xs text-slate-500 font-mono">
        Showing{" "}
        <span className="font-semibold text-slate-900">{startRecord}</span> to{" "}
        <span className="font-semibold text-slate-900">{endRecord}</span> of{" "}
        <span className="font-semibold text-slate-900">{total}</span> products
      </div>

      <div className="flex items-center gap-4">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Per page:</span>
          <select
            value={page_size}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-slate-200 rounded-md bg-white font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-2 text-slate-600">
            {page} / {total_pages || 1}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= total_pages}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
