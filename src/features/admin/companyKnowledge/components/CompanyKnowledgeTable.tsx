"use client";

import Link from "next/link";
import { BookOpen, FileText, Edit, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/features/common/ui/DataTable";
import {
  CompanyKnowledgeItem,
  CompanyKnowledgeStatus,
} from "../types/companyKnowledge";

const STATUS_BADGE_STYLES: Record<CompanyKnowledgeStatus, string> = {
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

interface CompanyKnowledgeTableProps {
  isLoading: boolean;
  items: CompanyKnowledgeItem[];
  hasActiveFilters: boolean;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onDeleteClick: (item: CompanyKnowledgeItem) => void;
}

export function CompanyKnowledgeTable({
  isLoading,
  items,
  hasActiveFilters,
  page,
  totalPages,
  onPageChange,
  onDeleteClick,
}: CompanyKnowledgeTableProps) {
  const columns: Column<CompanyKnowledgeItem>[] = [
    {
      header: "Article Title",
      cell: (item) => (
        <div className="flex items-center gap-2 font-medium text-slate-900 max-w-xs truncate">
          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{item.title}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      className: "text-slate-600 font-mono text-[11px]",
    },
    {
      header: "Content Snippet",
      accessorKey: "content",
      className: "text-slate-500 max-w-sm truncate font-mono text-[11px]",
    },
    {
      header: "Status",
      cell: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold uppercase tracking-wider ${
            STATUS_BADGE_STYLES[item.status] || STATUS_BADGE_STYLES.DRAFT
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/company-knowledge/${item.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Article"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => onDeleteClick(item)}
            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Article"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      hasActiveFilters={hasActiveFilters}
      emptyIcon={BookOpen}
      emptyTitle="No knowledge articles found"
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      getRowKey={(item) => item.id}
    />
  );
}
