"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Video,
  Edit,
  Trash2,
  Film,
  Play,
  RefreshCw,
} from "lucide-react";
import { DataTable, Column } from "@/features/common/ui/DataTable";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";
import { useAboutVideos } from "../hooks/useAboutVideos";
import { useDeleteAboutVideo } from "../hooks/useDeleteAboutVideo";
import { AboutVideoItem, AboutVideoStatus } from "../types/aboutVideoTypes";

const STATUS_BADGE_STYLES: Record<AboutVideoStatus, string> = {
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

export function AboutVideosList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<AboutVideoStatus | "">(
    "",
  );

  const [deletingItem, setDeletingItem] = useState<AboutVideoItem | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useAboutVideos({
      page,
      page_size: pageSize,
      search: search || undefined,
      status: selectedStatus || undefined,
    });

  const { mutate: deleteVideo, isPending: isDeleting } = useDeleteAboutVideo();

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;
  const hasActiveFilters = Boolean(search || selectedStatus);

  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    deleteVideo(deletingItem.id, {
      onSuccess: () => setDeletingItem(null),
    });
  };

  const columns: Column<AboutVideoItem>[] = [
    {
      header: "Video Showcase",
      cell: (item) => (
        <div className="flex items-center gap-3 max-w-sm">
          <div className="relative w-16 h-10 rounded-lg bg-slate-900 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center group">
            {item.video_url ? (
              <video
                src={item.video_url}
                className="w-full h-full object-cover"
                muted
                preload="metadata"
              />
            ) : (
              <Film className="w-5 h-5 text-slate-500" />
            )}
            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-white fill-white" />
            </div>
          </div>
          <div className="space-y-0.5 truncate">
            <div className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
              {item.title}
            </div>
            {item.description && (
              <div className="text-[11px] text-slate-500 truncate">
                {item.description}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Sort Order",
      cell: (item) => (
        <span className="font-mono text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
          #{item.sort_order}
        </span>
      ),
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
      header: "Created Date",
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
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/about-videos/${item.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Video"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setDeletingItem(item)}
            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Video"
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            About Brand Videos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage highlight video assets, promotional clips, and display
            sequencing for your brand story.
          </p>
        </div>

        {/* Top Action Controls */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors disabled:opacity-50 h-10"
            title="Refresh Data"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isFetching ? "animate-spin text-blue-600" : "text-slate-500"
              }`}
            />
            <span>{isFetching ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link href="/admin/about-videos/new" className="w-full sm:w-auto">
            <ActionButton variant="primary" size="md" icon={Plus}>
              New About Video
            </ActionButton>
          </Link>
        </div>
      </div>

      {/* Filters Toolbar & Refresh Button */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as AboutVideoStatus | "");
              setPage(1);
            }}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
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
          {error?.message || "Failed to load about videos."}
        </div>
      )}

      {/* Reusable DataTable Component */}
      <DataTable
        columns={columns}
        data={data?.items || []}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        emptyIcon={Video}
        emptyTitle="No about videos found"
        emptyDescription="Get started by creating your first brand video showcase."
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        getRowKey={(item) => item.id}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingItem)}
        isPending={isDeleting}
        entityName={deletingItem?.title}
        title="Delete Brand Video"
        confirmText="Delete Video"
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
