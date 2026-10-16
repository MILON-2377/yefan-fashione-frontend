"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderPlus,
  Search,
  Filter,
  Plus,
  Layers,
  Building2,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from "lucide-react";
import { useCollections } from "@/features/admin/collections/hooks/useCollections";
import { useBrands } from "@/features/admin/brands/hooks/useBrands";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { Collection } from "@/features/admin/collections/types";
import { RecordStatus } from "@/features/admin/brands/types";
import { useDeleteCollection } from "@/features/admin/collections/hooks/useDeleteCollection";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";

export default function CollectionsPage() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Confirmation Modal State
  const [collectionToDelete, setCollectionToDelete] =
    useState<Collection | null>(null);

  // Fetch Collections
  const { data, isLoading, isFetching, refetch } = useCollections({
    brand_id: selectedBrand || undefined,
    search: search || undefined,
    status: selectedStatus !== "ALL" ? selectedStatus : undefined,
    page,
    page_size: pageSize,
  });

  // Fetch Brands for Filter Dropdown
  const { data: brandsData } = useBrands({ page_size: 100 });
  const brands = brandsData?.items ?? [];

  // Delete brand mutation
  const { mutateAsync: executeDelete, isPending: isDeleting } =
    useDeleteCollection();

  const collections = data?.items ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const hasActiveFilters = Boolean(
    search || selectedBrand || selectedStatus !== "ALL",
  );

  const resetFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedStatus("ALL");
    setPage(1);
  };

  const handleDeleteConfirm = async () => {
    if (!collectionToDelete) return;

    try {
      await executeDelete(collectionToDelete.id);
    } catch (error) {
      console.error("Failed to delete brand: ", error);
    } finally {
      setCollectionToDelete(null);
    }
  };

  const handleStatusBadge = (status: RecordStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ARCHIVED":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "DRAFT":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-1">
            <Layers className="w-4 h-4" />
            <span>Catalog Management</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Collections
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Group products into seasonal lines, capsules, and curated releases.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <ActionButton
            variant="secondary"
            size="md"
            icon={RefreshCw}
            onClick={() => refetch()}
            isLoading={isFetching}
          >
            Refresh
          </ActionButton>

          <Link href="/admin/catalog/collections/new">
            <ActionButton variant="primary" size="md" icon={Plus}>
              Create Collection
            </ActionButton>
          </Link>
        </div>
      </div>

      {/* Responsive Filter Container */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="relative lg:col-span-5 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search collections..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all truncate"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter by Brand */}
          <div className="relative lg:col-span-4 min-w-0">
            <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all appearance-none cursor-pointer truncate"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div className="relative sm:col-span-2 lg:col-span-3 min-w-0">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all appearance-none cursor-pointer truncate"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono text-slate-500">
          <div>
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            ) : (
              <span className="text-slate-400">Showing all records</span>
            )}
          </div>
          <div>
            Total:{" "}
            <span className="font-semibold text-slate-900">{totalItems}</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
            <p className="text-xs font-mono">Loading collections...</p>
          </div>
        ) : collections.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FolderPlus className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
            <h3 className="text-sm font-semibold text-slate-800">
              No collections found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {hasActiveFilters
                ? "Try adjusting your filters or search terms."
                : "Get started by creating your first collection."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Collection</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Parent Brand</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Updated</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {collections.map((collection: Collection) => {
                  const parentBrand = brands.find(
                    (b) => b.id === collection.brand_id,
                  );

                  return (
                    <tr
                      key={collection.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Name & Cover */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 block truncate">
                              {collection.name}
                            </span>
                            {collection.description && (
                              <span className="text-xs text-slate-500 block truncate max-w-xs">
                                {collection.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {collection.slug}
                      </td>

                      {/* Parent Brand */}
                      <td className="py-3.5 px-4 text-slate-700">
                        {parentBrand ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-800">
                            <Building2 className="w-3 h-3 text-slate-500" />
                            {parentBrand.name}
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-slate-400">
                            {collection.brand_id.substring(0, 8)}...
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold uppercase tracking-wider ${handleStatusBadge(
                            collection.status,
                          )}`}
                        >
                          {collection.status}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                        {new Date(collection.created_at).toLocaleDateString()}
                      </td>

                      {/* Updated At */}
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                        {new Date(collection.updated_at).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/catalog/collections/${collection.id}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                            title="Edit Collection"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setCollectionToDelete(collection)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Collection"
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
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs text-slate-500 font-mono">
              Page {page} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(collectionToDelete)}
        isPending={isDeleting}
        title="Delete Collection"
        entityName={collectionToDelete?.name}
        onConfirm={handleDeleteConfirm}
        onClose={() => setCollectionToDelete(null)}
      />
    </div>
  );
}
