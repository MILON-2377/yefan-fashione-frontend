"use client";

import { RefreshCw, FolderTree, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCategory } from "../hooks/useCategory";
import { CategoryCreationWorkflow } from "@/features/admin/categories/components/CategoryCreationWorkflow";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface EditCategoryClientProps {
  categoryId: string;
  token?: string;
}

export function EditCategoryClient({ categoryId }: EditCategoryClientProps) {
  const {
    data: category,
    isLoading,
    isError,
    refetch,
  } = useCategory(categoryId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
        <p className="text-xs font-mono text-slate-500">
          Loading category details...
        </p>
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-slate-200 rounded-xl shadow-sm text-center space-y-4">
        <div className="p-3 bg-rose-50 w-fit mx-auto rounded-full text-rose-600">
          <FolderTree className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Category Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The category record you are attempting to edit could not be
            retrieved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/admin/catalog/categories">
            <ActionButton variant="secondary" size="md" icon={ArrowLeft}>
              Back to Categories
            </ActionButton>
          </Link>
          <ActionButton
            variant="primary"
            size="md"
            icon={RefreshCw}
            onClick={() => refetch()}
          >
            Retry
          </ActionButton>
        </div>
      </div>
    );
  }

  // Format prefilled initial values from existing category record
  const initialValues = {
    name: category.name || "",
    description: category.description || "",
    image_media_id: category.image_media_id || category.image?.id || "",
    image_media_url: category.image?.url || "",
    status: category.status || "DRAFT",
  };

  return (
    // Keying by categoryId guarantees the form resets cleanly if the record updates
    <CategoryCreationWorkflow
      key={category.updated_at || category.id}
      isEditing={true}
      categoryId={categoryId}
      initialValues={initialValues}
    />
  );
}
