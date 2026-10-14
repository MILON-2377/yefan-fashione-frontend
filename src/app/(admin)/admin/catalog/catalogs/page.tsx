"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  RefreshCw,
  BookOpen,
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
  Archive,
  Filter,
} from "lucide-react";

import { useCatalogs } from "@/features/admin/catalogs/hooks/useCatalogs";
import { AdminCatalogItem,  } from "@/features/admin/catalogs/types/catalogTypes";
import { RecordStatus } from "@/features/admin/brands/types";
import { useDeleteCatalog } from "@/features/admin/catalogs/hooks/useDeleteCatalog";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";
import ChangeStatusModal from "@/features/admin/catalogs/components/UpdateCatalogsStatusModal";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useUpdateCatalogStatus } from "@/features/admin/catalogs/hooks/useUpdateCatalogStatus";

export default function CatalogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RecordStatus | "ALL">("ALL");

  // Deletion & Status Modal state
  const [catalogToDelete, setCatalogToDelete] = useState<AdminCatalogItem | null>(null);
  const [catalogToUpdateStatus, setCatalogToUpdateStatus] =
    useState<AdminCatalogItem | null>(null);

  // Queries & Mutations
  const { data, isLoading, isError, error, refetch } = useCatalogs({
    search: searchTerm,
    status: statusFilter,
  });

  const { mutateAsync: executeDelete, isPending: isDeleting } = useDeleteCatalog();
  const { mutateAsync: executeStatusUpdate, isPending: isUpdatingStatus } =
    useUpdateCatalogStatus();

  const catalogs = data?.items ?? [];

  const handleConfirmDelete = async () => {
    if (!catalogToDelete) return;

    try {
      await executeDelete(catalogToDelete.id);
    } catch (err) {
      console.error("Failed to delete catalog:", err);
    } finally {
      setCatalogToDelete(null);
    }
  };

  const handleConfirmStatusChange = async (newStatus: RecordStatus) => {
    if (!catalogToUpdateStatus) return;

    try {
      await executeStatusUpdate({
        id: catalogToUpdateStatus.id,
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setCatalogToUpdateStatus(null);
    }
  };

  const getStatusBadge = (status: RecordStatus) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Published
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Draft
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Archive className="w-3.5 h-3.5 text-slate-500" />
            Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Confirmation Delete Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(catalogToDelete)}
        isPending={isDeleting}
        title="Delete Catalog Document"
        entityName={catalogToDelete?.title}
        onConfirm={handleConfirmDelete}
        onClose={() => setCatalogToDelete(null)}
      />

      {/* Quick Change Status Modal (Key prop resets internal state on selection change) */}
      <ChangeStatusModal
        key={catalogToUpdateStatus?.id}
        isOpen={Boolean(catalogToUpdateStatus)}
        isPending={isUpdatingStatus}
        catalog={catalogToUpdateStatus}
        onConfirm={handleConfirmStatusChange}
        onClose={() => setCatalogToUpdateStatus(null)}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            PDF Catalogs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage lookbooks, digital brochures, and showroom publishing states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/catalog/catalogs/new">
            <ActionButton variant="primary" size="md" icon={Plus}>
              Create Catalog
            </ActionButton>
          </Link>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog title..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 hidden sm:block" />
          {(["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono transition-all ${
                statusFilter === status
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Error View */}
      {isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-rose-700 text-sm">
          <span>Failed to load catalogs: {(error as Error).message}</span>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1 font-mono text-xs underline hover:text-rose-900"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-600" />
          <span className="text-xs font-mono">Fetching catalog records...</span>
        </div>
      ) : catalogs.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  <th className="py-3.5 px-6">Catalog Document</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">PDF Document</th>
                  <th className="py-3.5 px-6">Last Updated</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {catalogs.map((catalog) => {
                  const coverImage =
                    catalog.cover_image_url ||
                    catalog.cover_url ||
                    catalog.cover_media_asset?.url;

                  const pdfUrl =
                    catalog.pdf_url ||
                    catalog.catalog_url ||
                    catalog.pdf_media_asset?.url;

                  return (
                    <tr
                      key={catalog.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-10 h-12 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {coverImage ? (
                              <Image
                                src={coverImage}
                                alt={catalog.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <BookOpen className="w-5 h-5 text-slate-400 stroke-[1.5]" />
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/admin/catalog/catalogs/${catalog.id}`}
                              className="font-semibold text-slate-900 hover:text-amber-700 transition-colors block"
                            >
                              {catalog.title}
                            </Link>
                            {catalog.description && (
                              <p className="text-xs text-slate-500 truncate max-w-xs mt-0.5">
                                {catalog.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        {getStatusBadge(catalog.status)}
                      </td>

                      <td className="py-4 px-6">
                        {pdfUrl ? (
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            View PDF
                            <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-slate-400">
                            {catalog.pdf_media_asset_id.slice(0, 8)}...
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                        {new Date(catalog.updated_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          {/* Quick Change Status Trigger */}
                          <button
                            title="Change Status"
                            onClick={() => setCatalogToUpdateStatus(catalog)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete Modal Trigger */}
                          <button
                            title="Delete Catalog"
                            disabled={isDeleting}
                            onClick={() => setCatalogToDelete(catalog)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 font-serif">
              No catalogs found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || statusFilter !== "ALL"
                ? "No PDF catalogs match your current search parameters or status filters."
                : "Get started by uploading your first lookbook catalog."}
            </p>
          </div>
          {(searchTerm || statusFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("ALL");
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 underline font-mono"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
