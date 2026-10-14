"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, BookOpen, FileText, Edit, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/features/common/ui/DataTable";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useCompanyKnowledges } from "../hooks/useCompanyKnowledges";
import { useDeleteCompanyKnowledge } from "../hooks/useDeleteCompanyKnowledge";
import {
  CompanyKnowledgeItem,
  CompanyKnowledgeStatus,
} from "../types/companyKnowledge";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";

const STATUS_BADGE_STYLES: Record<CompanyKnowledgeStatus, string> = {
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

export function CompanyKnowledgeList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    CompanyKnowledgeStatus | ""
  >("");

  // Delete modal state
  const [deletingItem, setDeletingItem] = useState<CompanyKnowledgeItem | null>(
    null,
  );

  const { data, isLoading, isError, error } = useCompanyKnowledges({
    page,
    page_size: pageSize,
    search: search || undefined,
    category: selectedCategory || undefined,
    status: selectedStatus || undefined,
  });

  const { mutate: deleteKnowledge, isPending: isDeleting } =
    useDeleteCompanyKnowledge();

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;
  const hasActiveFilters = Boolean(
    search || selectedCategory || selectedStatus,
  );

  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    deleteKnowledge(deletingItem.id, {
      onSuccess: () => {
        setDeletingItem(null);
      },
    });
  };

  // Define Table Columns for DataTable
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
            onClick={() => setDeletingItem(item)}
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
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Company Knowledge Base
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage operational rules, OEM guides, and policy reference documents
            for AI RAG indexing.
          </p>
        </div>

        <Link href="/admin/company-knowledge/new">
          <ActionButton variant="primary" size="md" icon={Plus}>
            New Knowledge Article
          </ActionButton>
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          >
            <option value="">All Categories</option>
            <option value="OEM & Manufacturing">OEM & Manufacturing</option>
            <option value="Ordering & Shipping">Ordering & Shipping</option>
            <option value="Fabric & Care">Fabric & Care</option>
            <option value="Company Policy">Company Policy</option>
            <option value="General FAQ">General FAQ</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as CompanyKnowledgeStatus | "");
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
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
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
          {error?.message || "Failed to load company knowledge records."}
        </div>
      )}

      {/* Reusable DataTable Component */}
      <DataTable
        columns={columns}
        data={data?.items || []}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        emptyIcon={BookOpen}
        emptyTitle="No knowledge articles found"
        emptyDescription="Get started by creating your first article or adjust your active search filters."
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        getRowKey={(item) => item.id}
      />

      {/* Delete Confirmation Modal */}
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingItem)}
        isPending={isDeleting}
        entityName={deletingItem?.title}
        title="Delete Knowledge Article"
        confirmText="Delete Article"
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
