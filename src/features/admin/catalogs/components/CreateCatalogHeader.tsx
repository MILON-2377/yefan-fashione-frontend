"use client";

import { ArrowLeft, Save, FileText } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface CreateCatalogHeaderProps {
  isPending: boolean;
  isUploading?: boolean;
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
}

export function CreateCatalogHeader({
  isPending,
  isUploading = false,
  onCancel,
  onSave,
}: CreateCatalogHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
      <div className="space-y-1">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogs List</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Create New Catalog
            </h1>
            <p className="text-xs text-slate-500">
              Upload PDF specification sheets and assign collection categories
              for client download.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
        <AppButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isPending || isUploading}
          className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl shrink-0"
        >
          Cancel
        </AppButton>

        <ActionButton
          onClick={onSave}
          variant="primary"
          size="md"
          isLoading={isPending || isUploading}
          loadingText={isUploading ? "Uploading PDF..." : "Saving Catalog..."}
          icon={Save}
          className="shrink-0"
        >
          Publish Catalog
        </ActionButton>
      </div>
    </div>
  );
}
