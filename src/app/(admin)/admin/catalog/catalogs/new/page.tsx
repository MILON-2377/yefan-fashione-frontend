"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { useCreateCatalog } from "@/features/admin/catalogs/hooks/useCreateCatalog";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";
import { CreateCatalogFormValues, createCatalogSchema } from "@/features/admin/catalogs/schemas/createCatalogSchema";
import { CreateCatalogHeader } from "@/features/admin/catalogs/components/CreateCatalogHeader";
import { CreateCatalogBasicInfo } from "@/features/admin/catalogs/components/CreateCatalogBasicInfo";
import { CatalogMediaSection } from "@/features/admin/catalogs/components/CreateCatalogMedia";

export default function CreateCatalogPage() {
  const router = useRouter();
  const [uploadedPdf, setUploadedPdf] = useState<UploadedMediaResult | null>(null);
  const [uploadedCover, setUploadedCover] = useState<UploadedMediaResult | null>(null);
  const [activeError, setActiveError] = useState<string | null>(null);

  const createCatalogMutation = useCreateCatalog();

  const methods = useForm<CreateCatalogFormValues>({
    resolver: zodResolver(createCatalogSchema),
    defaultValues: {
      title: "",
      description: "",
      collection_id: null,
      pdf_media_asset_id: "",
      cover_media_asset_id: null,
    },
  });

  const handlePdfSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const pdf = results[0];
      setUploadedPdf(pdf);
      methods.setValue("pdf_media_asset_id", pdf.mediaAssetId, {
        shouldValidate: true,
      });
    }
  };

  const handleCoverSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const cover = results[0];
      setUploadedCover(cover);
      methods.setValue("cover_media_asset_id", cover.mediaAssetId, {
        shouldValidate: true,
      });
    }
  };

  const handleClearPdf = () => {
    setUploadedPdf(null);
    methods.setValue("pdf_media_asset_id", "", { shouldValidate: true });
  };

  const handleClearCover = () => {
    setUploadedCover(null);
    methods.setValue("cover_media_asset_id", null, { shouldValidate: true });
  };

  const handleSaveAction = methods.handleSubmit((data) => {
    setActiveError(null);
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
        onError: (err) => {
          setActiveError(
            err instanceof Error ? err.message : "Failed to create catalog entry."
          );
        },
      }
    );
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSaveAction}
        className="space-y-8 max-w-5xl mx-auto pb-12 p-6 lg:p-8"
      >
        <CreateCatalogHeader
          isPending={createCatalogMutation.isPending}
          onCancel={() => router.push("/admin/catalog/catalogs")}
          onSave={handleSaveAction}
        />

        {activeError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium">
            {activeError}
          </div>
        )}

        <div className="space-y-6">
          <CreateCatalogBasicInfo />

          <CatalogMediaSection
            uploadedPdf={uploadedPdf}
            uploadedCover={uploadedCover}
            onPdfSuccess={handlePdfSuccess}
            onCoverSuccess={handleCoverSuccess}
            onClearPdf={handleClearPdf}
            onClearCover={handleClearCover}
            disabled={createCatalogMutation.isPending}
          />
        </div>
      </form>
    </FormProvider>
  );
}
