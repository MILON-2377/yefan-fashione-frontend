"use client";

import { Check, Loader2, UploadCloud } from "lucide-react";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface CategoryWorkflowHeaderProps {
  isEditing?: boolean;
  isPending: boolean;
  isUploading?: boolean;
  onCancel: () => void;
  onSave: () => void;
}


export function CategoryWorkflowHeader({
  isEditing = false,
  isPending,
  isUploading = false,
  onCancel,
  onSave,
}: CategoryWorkflowHeaderProps) {
  const getButtonLabel = () => {
    if (isUploading) return "Uploading media...";
    if (isPending) return "Saving...";
    return isEditing ? "Save Changes" : "Create Category";
  };

  const getButtonIcon = () => {
    if (isUploading) return UploadCloud;
    if (isPending) return Loader2;
    return Check;
  };


  return (
    <div className="flex items-center justify-between pb-6 border-b border-slate-200">
      {/* Title & Description */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {isEditing ? "Edit Category" : "Create New Category"}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 font-mono">
          {isEditing
            ? "Update category details, status, or manage its cover image."
            : "Fill in category details and attach an optional cover image asset."}
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        <ActionButton
          type="button"
          variant="secondary"
          size="sm"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </ActionButton>

        <ActionButton
          type="button"
          variant="primary"
          size="sm"
          icon={getButtonIcon()}
          onClick={onSave}
          disabled={isPending}
        >
          {getButtonLabel()}
        </ActionButton>
      </div>
    </div>
  );
}
