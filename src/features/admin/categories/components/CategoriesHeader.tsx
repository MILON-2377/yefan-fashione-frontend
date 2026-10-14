"use client";

import Link from "next/link";
import { Layers, RefreshCw, Plus } from "lucide-react";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface CategoriesHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
}

export function CategoriesHeader({
  isFetching,
  onRefresh,
}: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-1">
          <Layers className="w-4 h-4" />
          <span>Catalog Management</span>
        </div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">
          Categories
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Organize products into hierarchical taxonomies and department trees.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <ActionButton
          variant="secondary"
          size="md"
          icon={RefreshCw}
          onClick={onRefresh}
          isLoading={isFetching}
        >
          Refresh
        </ActionButton>

        <Link href="/admin/catalog/categories/new">
          <ActionButton variant="primary" size="md" icon={Plus}>
            Create Category
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}
