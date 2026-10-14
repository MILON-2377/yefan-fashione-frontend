import { Search, Filter, RotateCcw } from "lucide-react";
import { UserRole, ListAdminsParams } from "../types";

interface AdminTableFiltersProps {
  filters: ListAdminsParams;
  onFilterChange: (filters: Partial<ListAdminsParams>) => void;
  onReset: () => void;
}

export function AdminTableFilters({
  filters,
  onFilterChange,
  onReset,
}: AdminTableFiltersProps) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.role) ||
    filters.is_active !== undefined;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search administrators by email..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-900 transition"
        />
      </div>

      {/* Select Filters & Actions */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Role Filter */}
        <div className="relative">
          <select
            value={filters.role || ""}
            onChange={(e) =>
              onFilterChange({
                role: (e.target.value as UserRole) || undefined,
                page: 1,
              })
            }
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-slate-900 transition"
          >
            <option value="">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={
              filters.is_active === undefined
                ? ""
                : filters.is_active
                  ? "true"
                  : "false"
            }
            onChange={(e) =>
              onFilterChange({
                is_active:
                  e.target.value === "" ? undefined : e.target.value === "true",
                page: 1,
              })
            }
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-slate-900 transition"
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
