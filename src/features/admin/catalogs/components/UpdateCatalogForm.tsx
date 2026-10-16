"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Folder, CheckCircle2, X, AlertCircle, Loader2 } from "lucide-react";
import { AppButton } from "@/features/common/ui/app-button";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";
import { AdminCatalogItem, UpdateCatalogRequest } from "../types/catalogTypes";
import { useUpdateCatalog } from "../hooks/useUpdateCatalog";
import {
  updateCatalogSchema,
  UpdateCatalogFormValues,
} from "../schemas/createCatalogSchema";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useUnusedCollections } from "../../collections/hooks/useUnusedCollections";

interface UpdateCatalogFormProps {
  catalogId: string;
  initialData: AdminCatalogItem & {
    collection?: { id: string; name: string };
  };
}

export function UpdateCatalogForm({
  catalogId,
  initialData,
}: UpdateCatalogFormProps) {
  const router = useRouter();
  const updateCatalogMutation = useUpdateCatalog(catalogId);

  const { data: collectionsData, isLoading: isCollectionsLoading } =
    useUnusedCollections();
  const unusedCollections = collectionsData?.items || [];


  // Ensure the currently linked collection is always available in the dropdown options
  const collections = (() => {
    const list = [...unusedCollections];
    if (
      initialData?.id &&
      initialData?.collection &&
      !list.some((c) => c.id === initialData.collection_id)
    ) {
      list.unshift({
        id: initialData.collection.id,
        name: initialData.collection.name,
        brand_id: "",
        slug: "",
        description: "",
        status: "PUBLISHED",
        created_at: "",
        updated_at: "",
      });
    }
    return list;
  })();

  const [uploadedPdf, setUploadedPdf] = useState<{
    name: string;
    size: number;
    url?: string;
  } | null>(
    initialData?.pdf_url
      ? { name: "Catalog Document.pdf", size: 0, url: initialData.pdf_url }
      : null,
  );

  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.cover_image_url || null,
  );
  const methods = useForm<UpdateCatalogFormValues>({
    resolver: zodResolver(updateCatalogSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "DRAFT",
      collection_id: initialData?.collection_id || "",
      pdf_media_asset_id: initialData?.pdf_media_asset_id || "",
      cover_media_asset_id: initialData?.cover_media_asset_id || null,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  // Force sync collection_id once data/options are available
  useEffect(() => {
    if (initialData?.collection_id) {
      setValue("collection_id", initialData.collection_id);
    }
  }, [initialData?.collection_id, setValue]);

  useEffect(() => {
    if (initialData?.collection_id) {
      setValue("collection_id", initialData.collection_id);
    }
  }, [initialData?.collection_id, setValue]);

  const handlePdfUploadSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const pdf = results[0];
      setUploadedPdf({
        name: pdf.file.name,
        size: pdf.file.size,
        url: pdf.previewUrl,
      });
      setValue("pdf_media_asset_id", pdf.mediaAssetId, {
        shouldValidate: true,
      });
    }
  };

  const handleRemovePdf = () => {
    setUploadedPdf(null);
    setValue("pdf_media_asset_id", "", { shouldValidate: true });
  };

  const handleCoverUploadSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const cover = results[0];
      setCoverPreview(cover.previewUrl);
      setValue("cover_media_asset_id", cover.mediaAssetId, {
        shouldValidate: true,
      });
    }
  };

  const handleRemoveCover = () => {
    setCoverPreview(null);
    setValue("cover_media_asset_id", null, { shouldValidate: true });
  };

  const onSubmit = (data: UpdateCatalogFormValues) => {
    const payload: UpdateCatalogRequest = {
      title: data.title,
      status: data.status,
      description: data.description || null,
      collection_id: data.collection_id || null,
      pdf_media_asset_id: data.pdf_media_asset_id,
      cover_media_asset_id: data.cover_media_asset_id || null,
    };

    updateCatalogMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/admin/catalog/catalogs");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto pb-12"
      >
        {/* Top Action Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs sticky top-4 z-10">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Catalog Management Actions
            </h2>
            <p className="text-[11px] text-slate-500">
              Save modifications or return to overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AppButton
              render={<Link href="/admin/catalog/catalogs" />}
              variant="secondary"
              nativeButton={false}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </AppButton>
            <ActionButton
              type="submit"
              variant="primary"
              size="md"
              icon={CheckCircle2}
              isLoading={updateCatalogMutation.isPending}
            >
              Update Catalog
            </ActionButton>
          </div>
        </div>

        {/* Global Error Notice */}
        {updateCatalogMutation.isError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {updateCatalogMutation.error?.message ||
                "Failed to update catalog entry. Please verify your inputs."}
            </span>
          </div>
        )}

        {/* Stacked Multi-Section Form */}
        <div className="space-y-6">
          {/* General Information Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                General Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Modify catalog details and link status.
              </p>
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Catalog Status
              </label>
              <select
                {...register("status")}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
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
                  disabled={isCollectionsLoading}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all appearance-none disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value="">
                    {isCollectionsLoading
                      ? "Loading available collections..."
                      : "No Collection Linked (Standalone)"}
                  </option>
                  {!isCollectionsLoading &&
                    collections.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                </select>
                {isCollectionsLoading ? (
                  <Loader2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 animate-spin pointer-events-none" />
                ) : (
                  <Folder className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                )}
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

          {/* Cover Image Upload Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Cover Image{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload a thumbnail or preview image for the catalog listing
                card.
              </p>
            </div>

            {coverPreview ? (
              <div className="relative w-40 h-48 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group flex items-center justify-center">
                <Image
                  src={coverPreview}
                  alt="Catalog Cover Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur hover:bg-rose-600 hover:text-white text-slate-700 rounded-lg shadow transition-colors"
                  title="Remove cover image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <MediaUploader
                mode="single"
                maxSizeMB={10}
                acceptedTypes="image/jpeg,image/png,image/webp"
                namespace="catalogs"
                entityId={catalogId}
                onUploadSuccess={handleCoverUploadSuccess}
              />
            )}

            {errors.cover_media_asset_id && (
              <p className="text-[11px] text-rose-600 font-medium pt-1">
                {errors.cover_media_asset_id.message}
              </p>
            )}
          </div>

          {/* PDF Document Upload Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                PDF Document File <span className="text-blue-600">*</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update the PDF catalog or tech-pack document file (max 25MB).
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
                      {uploadedPdf.name}
                    </p>
                    {uploadedPdf.url && (
                      <a
                        href={uploadedPdf.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-700 underline font-medium mt-0.5 block"
                      >
                        View Current PDF Asset
                      </a>
                    )}
                  </div>
                </div>
                <AppButton
                  type="button"
                  variant="ghost"
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
                entityId={catalogId}
                onUploadSuccess={handlePdfUploadSuccess}
              />
            )}

            {errors.pdf_media_asset_id && (
              <p className="text-[11px] text-rose-600 font-medium pt-1">
                {errors.pdf_media_asset_id.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
