import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export function AdminPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: AdminPaginationProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  if (total === 0) return null;

  const startRange = (page - 1) * pageSize + 1;
  const endRange = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium text-slate-600">
      <div>
        Showing <span className="font-bold text-slate-900">{startRange}</span>{" "}
        to <span className="font-bold text-slate-900">{endRange}</span> of{" "}
        <span className="font-bold text-slate-900">{total}</span> records
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-2 font-mono">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
