"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { X, FileText, ImageIcon } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";
import { CreateCatalogFormValues } from "../schemas/createCatalogSchema";

interface CatalogMediaSectionProps {
  uploadedPdf: UploadedMediaResult | null;
  uploadedCover: UploadedMediaResult | null;
  onPdfSuccess: (results: UploadedMediaResult[]) => void;
  onCoverSuccess: (results: UploadedMediaResult[]) => void;
  onClearPdf: () => void;
  onClearCover: () => void;
  disabled?: boolean;
}

export function CatalogMediaSection({
  uploadedPdf,
  uploadedCover,
  onPdfSuccess,
  onCoverSuccess,
  onClearPdf,
  onClearCover,
  disabled = false,
}: CatalogMediaSectionProps) {
  const {
    formState: { errors },
  } = useFormContext<CreateCatalogFormValues>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. PDF Document Upload Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              PDF Document Attachment <span className="text-blue-600">*</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload digital catalog PDF specifications (max 25MB).
          </p>
        </div>

        {uploadedPdf ? (
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                PDF
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {uploadedPdf.file.name}
                </p>
                <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                  {(uploadedPdf.file.size / (1024 * 1024)).toFixed(2)} MB • Storage Verified
                </p>
              </div>
            </div>
            <AppButton
              type="button"
              variant="ghost"
              iconOnly
              onClick={onClearPdf}
              disabled={disabled}
              className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 h-9 w-9 rounded-xl transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </AppButton>
          </div>
        ) : (
          <MediaUploader
            mode="single"
            maxSizeMB={25}
            acceptedTypes="application/pdf"
            namespace="catalogs/pdf"
            disabled={disabled}
            onUploadSuccess={onPdfSuccess}
          />
        )}

        {errors.pdf_media_asset_id && (
          <p className="text-[11px] text-rose-600 font-medium pt-1">
            {errors.pdf_media_asset_id.message}
          </p>
        )}
      </div>

      {/* 2. Cover Image Upload Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Catalog Cover Image <span className="text-slate-400 font-normal">(Optional)</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload a preview image cover for the public lookbook card (PNG, WebP, JPG).
          </p>
        </div>

        {uploadedCover ? (
          <div className="relative w-full h-44 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center p-2">
            <Image
              src={uploadedCover.previewUrl}
              alt="Catalog Cover Preview"
              fill
              unoptimized
              className="object-contain p-2"
            />
            <button
              type="button"
              onClick={onClearCover}
              disabled={disabled}
              className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-xl transition-colors shadow-md"
              title="Remove Cover Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <MediaUploader
            mode="single"
            maxSizeMB={10}
            acceptedTypes="image/png, image/jpeg, image/webp, image/avif"
            namespace="catalogs/covers"
            disabled={disabled}
            onUploadSuccess={onCoverSuccess}
          />
        )}

        {errors.cover_media_asset_id && (
          <p className="text-[11px] text-rose-600 font-medium pt-1">
            {errors.cover_media_asset_id.message}
          </p>
        )}
      </div>
    </div>
  );
}
