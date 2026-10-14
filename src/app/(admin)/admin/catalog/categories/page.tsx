"use client";

import { useState } from "react";
import { useCategories } from "@/features/admin/categories/hooks/useCategories";
import { useDeleteCategory } from "@/features/admin/categories/hooks/useDeleteCategory";
import { Category } from "@/features/admin/categories/types";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";

import { CategoriesHeader } from "@/features/admin/categories/components/CategoriesHeader";
import { CategoriesFilters } from "@/features/admin/categories/components/CategoriesFilters";
import { CategoriesTable } from "@/features/admin/categories/components/CategoriesTable";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Modal State
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  // Data Fetching
  const { data, isLoading, isFetching, refetch } = useCategories({
    parent_id: selectedParent || undefined,
    search: search || undefined,
    status: selectedStatus !== "ALL" ? selectedStatus : undefined,
    page,
    page_size: pageSize,
  });

  const { data: parentCategoriesData } = useCategories({ page_size: 100 });
  const allCategories = parentCategoriesData?.items ?? [];

  // Mutations
  const { mutateAsync: executeDelete, isPending: isDeleting } =
    useDeleteCategory();

  const categories = data?.items ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const hasActiveFilters = Boolean(
    search || selectedParent || selectedStatus !== "ALL",
  );

  const resetFilters = () => {
    setSearch("");
    setSelectedParent("");
    setSelectedStatus("ALL");
    setPage(1);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      await executeDelete(categoryToDelete.id);
    } catch (error) {
      console.error("Failed to delete category: ", error);
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 px-4 sm:px-6">
      {/* Header Section */}
      <CategoriesHeader isFetching={isFetching} onRefresh={() => refetch()} />

      {/* Filter Section */}
      <CategoriesFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        selectedParent={selectedParent}
        onParentChange={(val) => {
          setSelectedParent(val);
          setPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(val) => {
          setSelectedStatus(val);
          setPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
        totalItems={totalItems}
        parentCategories={allCategories}
      />

      {/* Table Section */}
      <CategoriesTable
        isLoading={isLoading}
        categories={categories}
        allCategories={allCategories}
        hasActiveFilters={hasActiveFilters}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onDeleteCategory={setCategoryToDelete}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(categoryToDelete)}
        isPending={isDeleting}
        title="Delete Category"
        entityName={categoryToDelete?.name}
        onConfirm={handleDeleteConfirm}
        onClose={() => setCategoryToDelete(null)}
      />
    </div>
  );
}
