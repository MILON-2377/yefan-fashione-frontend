"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { CategoryFormInput } from "../schemas/categorySchema";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";

interface CategoryMediaSectionProps {
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onClearImage: () => void;
  disabled?: boolean;
  categoryId?: string;
}


export function CategoryMediaSection({
  previewUrl,
  onFileSelect,
  onClearImage,
  disabled = false,
  categoryId = "draft",
}: CategoryMediaSectionProps) {
  const { setValue } = useFormContext<CategoryFormInput>();

  const handleUploadSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const { mediaAssetId, file } = results[0];

      // Update form context state with uploaded asset details
      setValue("image_media_id", mediaAssetId, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Forward selected file to parent component state handler
      onFileSelect(file);
    }
  };

  const handleRemove = (_index: number) => {
    setValue("image_media_id", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("image_media_url", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    onClearImage();
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Category Cover Media
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Cover image asset used across store banners, navigation menus, and catalog lists.
        </p>
      </div>

      <MediaUploader
        mode="single"
        previewUrls={previewUrl ? [previewUrl] : []}
        maxSizeMB={5}
        acceptedTypes="image/png, image/jpeg, image/webp"
        disabled={disabled}
        entityId={categoryId}
        namespace="categories"
        onUploadSuccess={handleUploadSuccess}
        onRemovePreview={handleRemove}
      />
    </section>
  );
}
