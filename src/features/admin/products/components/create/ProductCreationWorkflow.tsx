"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Ruler,
  Scissors,
  CheckCircle2,
} from "lucide-react";

import { createProductSchema, CreateProductInput } from "../../schemas/product";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { ActionButton } from "@/features/common/ui/ActionButton";

// Section Components
import { BasicInfoSection } from "./BasicInfoSection";
import { ProductMediaUploader } from "../ProductMediaUpload";
import { GarmentDetailsSection } from "./GarmentDetails";
import { SizesAndColorsSection } from "./SizesAndColors";
import { CustomizationSection } from "./Customization";
import { z } from "zod";

type TabKey = "basic" | "media" | "details" | "sizes" | "customization";

const TABS: { id: TabKey; label: string; icon: React.ElementType }[] = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "media", label: "Media Assets", icon: ImageIcon },
  { id: "details", label: "Garment Details", icon: Scissors },
  { id: "sizes", label: "Sizes & Colors", icon: Ruler },
  { id: "customization", label: "Customization", icon: CheckCircle2 },
];

export function ProductCreationWorkflow() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  const createProductMutation = useCreateProduct();

  const methods = useForm<
    z.input<typeof createProductSchema>,
    any,
    z.output<typeof createProductSchema>
  >({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      brand_id: "",
      collection_id: "",
      category_id: "",
      product_code: "",
      name: "",
      description: "",
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
      colors: [{ name: "Ivory", sort_order: 0 }],
      sizes: [
        {
          name: "36 (EU)",
          sort_order: 0,
          measurement: {
            bust: 84,
            waist: 68,
            hips: 92,
            hollow_to_hem: 145,
            unit: "cm",
          },
        },
      ],
      measurement_guide: {
        title: "Standard Garment Sizing",
        description: "Measurements are recorded in centimeters.",
        measurement_unit: "cm",
        notes: "",
      },
      customization: {
        is_customizable: false,
        notes: "",
        options: [],
      },
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const getTabErrorCount = (tab: TabKey): number => {
    switch (tab) {
      case "basic":
        return [
          errors.brand_id,
          errors.collection_id,
          errors.category_id,
          errors.product_code,
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

  const onSubmit = async (data: CreateProductInput) => {
    createProductMutation.mutate(data, {
      onSuccess: () => {
        router.push("/admin/catalog/products");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl mx-auto pb-12"
      >
        {/* Header Bar */}
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
                  Create Product Entry
                </h1>
                <span className="text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  Draft
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configure garment specifications, size metrics, and
                high-resolution photography.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ActionButton
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              onClick={() => router.push("/admin/catalog/products")}
              disabled={createProductMutation.isPending}
            >
              Cancel
            </ActionButton>

            <ActionButton
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              isLoading={createProductMutation.isPending}
              loadingText="Saving Product..."
            >
              Save Product
            </ActionButton>
          </div>
        </div>

        {/* Global Mutation Error */}
        {createProductMutation.error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 shadow-sm">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{createProductMutation.error.message}</span>
          </div>
        )}

        {/* Tabbed Container Body */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Tab Selection Navigation */}
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

          {/* Render Active Section Component */}
          <div className="p-6">
            {activeTab === "basic" && <BasicInfoSection />}
            {activeTab === "media" && <ProductMediaUploader />}
            {activeTab === "details" && <GarmentDetailsSection />}
            {activeTab === "sizes" && <SizesAndColorsSection />}
            {activeTab === "customization" && <CustomizationSection />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
