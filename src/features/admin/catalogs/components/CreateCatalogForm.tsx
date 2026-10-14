"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle2, Folder } from "lucide-react";
import Link from "next/link";
import { AppButton } from "@/features/common/ui/AppButton";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";
import { useCreateCatalog } from "../hooks/useCreateCatalog";
import {
  CreateCatalogFormValues,
  createCatalogSchema,
} from "../schemas/createCatalogSchema";

interface CreateCatalogFormProps {
  collections?: { id: string; title: string }[];
}

export function CreateCatalogForm({
  collections = [],
}: CreateCatalogFormProps) {
  const router = useRouter();
  const [uploadedPdf, setUploadedPdf] = useState<UploadedMediaResult | null>(
    null,
  );
  const createCatalogMutation = useCreateCatalog();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCatalogFormValues>({
    resolver: zodResolver(createCatalogSchema),
    defaultValues: {
      title: "",
      description: "",
      collection_id: null,
      pdf_media_asset_id: "",
    },
  });

  const handleUploadSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const pdf = results[0];
      setUploadedPdf(pdf);
      setValue("pdf_media_asset_id", pdf.mediaAssetId, { shouldValidate: true });
    }
  };

  const handleRemovePdf = () => {
    setUploadedPdf(null);
    setValue("pdf_media_asset_id", "", { shouldValidate: true });
  };

  const onSubmit = (data: CreateCatalogFormValues) => {
    createCatalogMutation.mutate(
      {
        title: data.title,
        description: data.description || undefined,
        collection_id: data.collection_id || undefined,
        pdf_media_asset_id: data.pdf_media_asset_id,
        cover_media_asset_id: data.cover_media_asset_id || undefined,
      },
      {
        onSuccess: () => {
          router.push("/admin/catalogs");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {createCatalogMutation.isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium">
          {createCatalogMutation.error?.message ||
            "Failed to create catalog entry. Please verify your PDF upload and form inputs."}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Section Header */}
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            General Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Set catalog details and link optional collection categories.
          </p>
        </div>

        {/* Catalog Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Catalog Title <span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Spring / Summer 2026 Collection Tech-Pack"
            {...register("title")}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
          {errors.title && (
            <p className="text-[11px] text-rose-600 font-medium">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Link Collection (Optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Link to Collection{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <select
              {...register("collection_id")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all appearance-none"
            >
              <option value="">No Collection Linked (Standalone)</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
            <Folder className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Summary / Notes
          </label>
          <textarea
            rows={4}
            placeholder="Provide brief details about MOQ tiers, fabric options, or season highlights..."
            {...register("description")}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
          />
        </div>
      </div>

      {/* PDF Document Upload Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            PDF Document File <span className="text-blue-600">*</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload the PDF catalog or tech-pack document file (max 25MB).
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
                  {(uploadedPdf.file.size / (1024 * 1024)).toFixed(2)} MB •
                  Cloudinary Upload Confirmed
                </p>
              </div>
            </div>
            <AppButton
              type="button"
              variant="ghost"
              iconOnly
              onClick={handleRemovePdf}
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
            namespace="catalogs"
            entityId="catalog-draft"
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {errors.pdf_media_asset_id && (
          <p className="text-[11px] text-rose-600 font-medium pt-1">
            {errors.pdf_media_asset_id.message}
          </p>
        )}
      </div>

      {/* Form Action Controls */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <AppButton
          render={<Link href="/admin/catalogs" />}
          variant="secondary"
          className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl shrink-0"
        >
          Cancel
        </AppButton>
        <AppButton
          type="submit"
          variant="primary"
          isLoading={createCatalogMutation.isPending}
          loadingText="Publishing Catalog..."
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
          className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shrink-0"
        >
          Publish Catalog
        </AppButton>
      </div>
    </form>
  );
}
