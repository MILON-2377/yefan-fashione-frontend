"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  FileText,
  ImageIcon,
  Scissors,
  Ruler,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { ActionButton } from "@/features/common/ui/ActionButton";
import { EditBasicInfoSection } from "./EditBasicInfoSection";
import { EditCustomizationSection } from "./EditCustomizationSection";
import { ProductMediaUploader } from "../ProductMediaUpload";

import {
  UpdateProductInput,
  updateProductSchema,
} from "../../schemas/product.edit";
import { EditGarmentDetailsSection } from "./EditGarmentDetailsSection";
import { EditSizesAndColorsSection } from "./EditSizesAndColorsSection";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useProduct } from "../../hooks/useGetProduct";
import { z } from "zod";

type TabKey = "basic" | "media" | "details" | "sizes" | "customization";

const TABS: { id: TabKey; label: string; icon: React.ElementType }[] = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "media", label: "Media Assets", icon: ImageIcon },
  { id: "details", label: "Garment Details", icon: Scissors },
  { id: "sizes", label: "Sizes & Colors", icon: Ruler },
  { id: "customization", label: "Customization", icon: CheckCircle2 },
];

export function ProductEditWorkflow({ productId }: { productId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  const { data: product, isLoading, isError, error } = useProduct(productId);

  const updateProductMutation = useUpdateProduct(productId);

  const methods = useForm<
    z.input<typeof updateProductSchema>,
    any,
    UpdateProductInput
  >({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      collection_id: "",
      category_id: "",
      status: "DRAFT",
      media: [],
      details: {
        garment_type: "",
        silhouette: "",
        length: "",
        fabric: "",
        secondary_fabric: "",
        lining: "",
        neckline: "",
        back_style: "",
        waistline: "",
        sleeve_type: "",
        sleeve_length: "",
        train: "",
        embellishment: "",
        closure: "",
        internal_support: "",
      },
      colors: [],
      sizes: [],
      measurement_guide: {
        title: "",
        description: "",
        measurement_unit: "cm",
        notes: "",
      },
      customization: {
        is_customizable: false,
        notes: "",
      },
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        description: product.description || "",
        collection_id: product.collection_id || "",
        category_id: product.category_id || "",
        status: product.status || "DRAFT",
        media:
          product.media?.map((m) => ({
            id: m.id,
            media_asset_id: m.media_asset_id,
            alt_text: m.alt_text || "",
            url: m.url || "", // <--- Available for thumbnail previewing
            sort_order: m.sort_order ?? 0,
            is_primary: m.is_primary ?? false,
          })) || [],
        details: {
          garment_type: product.details?.garment_type || "",
          silhouette: product.details?.silhouette || "",
          length: product.details?.length || "",
          fabric: product.details?.fabric || "",
          secondary_fabric: product.details?.secondary_fabric || "",
          lining: product.details?.lining || "",
          neckline: product.details?.neckline || "",
          back_style: product.details?.back_style || "",
          waistline: product.details?.waistline || "",
          sleeve_type: product.details?.sleeve_type || "",
          sleeve_length: product.details?.sleeve_length || "",
          train: product.details?.train || "",
          embellishment: product.details?.embellishment || "",
          closure: product.details?.closure || "",
          internal_support: product.details?.internal_support || "",
        },
        colors:
          product.colors?.map((c) => ({
            id: c.id,
            name: c.name || "",
            sort_order: c.sort_order ?? 0,
          })) || [],
        sizes:
          product.sizes?.map((s) => ({
            id: s.id,
            name: s.name || "",
            sort_order: s.sort_order ?? 0,
          })) || [],
        measurement_guide: {
          title: product.measurement_guide?.title || "",
          description: product.measurement_guide?.description || "",
          measurement_unit: product.measurement_guide?.measurement_unit || "cm",
          notes: product.measurement_guide?.notes || "",
        },
        customization: {
          is_customizable: product.customization?.is_customizable ?? false,
          notes: product.customization?.notes || "",
        },
      });
    }
  }, [product, reset]);

  const getTabErrorCount = (tab: TabKey): number => {
    switch (tab) {
      case "basic":
        return [
          errors.collection_id,
          errors.category_id,
          errors.name,
          errors.description,
        ].filter(Boolean).length;
      case "media":
        return errors.media ? 1 : 0;
      case "details":
        return errors.details ? Object.keys(errors.details).length : 0;
      case "sizes":
        return (
          (errors.sizes ? 1 : 0) +
          (errors.colors ? 1 : 0) +
          (errors.measurement_guide ? 1 : 0)
        );
      case "customization":
        return errors.customization ? 1 : 0;
      default:
        return 0;
    }
  };

  const onSubmit = async (data: UpdateProductInput) => {
    updateProductMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/catalog/products");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-slate-700" />
        <p className="text-xs text-slate-500 font-mono">
          Loading product record...
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl max-w-xl mx-auto my-12 text-center">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-rose-900">
          Failed to load product
        </h3>
        <p className="text-xs text-rose-700 mt-1 mb-4">
          {(error as Error)?.message ||
            "Product entity could not be retrieved."}
        </p>
        <Link
          href="/admin/catalog/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto pb-12"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <Link
              href="/admin/catalog/products"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors mt-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-serif text-slate-900">
                  Edit Product Entry
                </h1>
                <span className="text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {product.product_code || "CODE-UNKNOWN"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Modify product taxonomy, attributes, size options, and media.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ActionButton
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              onClick={() => router.push("/admin/catalog/products")}
              disabled={updateProductMutation.isPending}
            >
              Cancel
            </ActionButton>

            <ActionButton
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              isLoading={updateProductMutation.isPending}
              loadingText="Saving Changes..."
            >
              Update Product
            </ActionButton>
          </div>
        </div>

        {/* Global Mutation Error */}
        {updateProductMutation.error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{updateProductMutation.error.message}</span>
          </div>
        )}

        {/* Tabbed Navigation Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const errorCount = getTabErrorCount(tab.id);
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider font-mono border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "border-slate-900 text-slate-900 bg-white shadow-xs"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-slate-900" : "text-slate-400"}`}
                  />
                  {tab.label}
                  {errorCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {errorCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Render */}
          <div className="p-6">
            {activeTab === "basic" && <EditBasicInfoSection />}
            {activeTab === "media" && <ProductMediaUploader />}
            {activeTab === "details" && <EditGarmentDetailsSection />}
            {activeTab === "sizes" && <EditSizesAndColorsSection />}
            {activeTab === "customization" && <EditCustomizationSection />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
