"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Sliders,
  Ruler,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { ProductDetailResponse } from "../types/productDetailTypes";

interface ProductDetailsTabsProps {
  product: ProductDetailResponse;
}

export function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "specifications" | "customization" | "measurement" | "gallery"
  >("specifications");

  const details = product.details;
  const customization = product.customization;
  const measurement = product.measurement_guide;
  const mediaList = product.media ?? [];

  // Key-value mapping for technical garment specs
  const garmentSpecs = details
    ? [
        { label: "Garment Type", value: details.garment_type },
        { label: "Silhouette", value: details.silhouette },
        { label: "Length", value: details.length },
        { label: "Primary Fabric", value: details.fabric },
        { label: "Secondary Fabric", value: details.secondary_fabric },
        { label: "Lining", value: details.lining },
        { label: "Neckline", value: details.neckline },
        { label: "Back Style", value: details.back_style },
        { label: "Waistline", value: details.waistline },
        { label: "Sleeve Type", value: details.sleeve_type },
        { label: "Sleeve Length", value: details.sleeve_length },
        { label: "Train", value: details.train },
        { label: "Embellishment", value: details.embellishment },
        { label: "Closure", value: details.closure },
        { label: "Internal Support", value: details.internal_support },
      ].filter((item) => Boolean(item.value))
    : [];

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar">
        <AppButton
          type="button"
          onClick={() => setActiveTab("specifications")}
          variant="ghost"
          leftIcon={<Layers className="w-4 h-4" />}
          className={`px-6 py-4 rounded-none text-xs font-bold border-b-2 transition-all whitespace-nowrap h-auto ${
            activeTab === "specifications"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Technical Garment Specs
        </AppButton>

        <AppButton
          type="button"
          onClick={() => setActiveTab("customization")}
          variant="ghost"
          leftIcon={<Sliders className="w-4 h-4" />}
          className={`px-6 py-4 rounded-none text-xs font-bold border-b-2 transition-all whitespace-nowrap h-auto ${
            activeTab === "customization"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          OEM & Customization
        </AppButton>

        {measurement && (
          <AppButton
            type="button"
            onClick={() => setActiveTab("measurement")}
            variant="ghost"
            leftIcon={<Ruler className="w-4 h-4" />}
            className={`px-6 py-4 rounded-none text-xs font-bold border-b-2 transition-all whitespace-nowrap h-auto ${
              activeTab === "measurement"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Measurement Guide
          </AppButton>
        )}

        <AppButton
          type="button"
          onClick={() => setActiveTab("gallery")}
          variant="ghost"
          leftIcon={<ImageIcon className="w-4 h-4" />}
          className={`px-6 py-4 rounded-none text-xs font-bold border-b-2 transition-all whitespace-nowrap h-auto ${
            activeTab === "gallery"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Media & Detail Views
        </AppButton>
      </div>

      {/* Tab Content Body */}
      <div className="p-6 sm:p-8">
        {/* --- Specifications Tab --- */}
        {activeTab === "specifications" && (
          <div className="space-y-6">
            {product.description && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Product Overview
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                  {product.description}
                </p>
              </div>
            )}

            {garmentSpecs.length > 0 ? (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Garment Details & Construction
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {garmentSpecs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2.5 px-4 bg-slate-50 border border-slate-100 rounded-xl text-xs"
                    >
                      <span className="font-medium text-slate-500">
                        {spec.label}
                      </span>
                      <span className="font-bold text-slate-900 truncate ml-2">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-400">
                No specific garment construction details specified for this
                item.
              </p>
            )}
          </div>
        )}

        {/* --- OEM & Customization Tab --- */}
        {activeTab === "customization" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50/60 border border-blue-200 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Customization Status
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {customization?.is_customizable
                    ? "This product is fully customizable for bulk OEM/ODM orders."
                    : "Standard production run only. Contact sales for custom tech-packs."}
                </p>
              </div>
            </div>

            {customization?.notes && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  OEM Specifications & Guidelines
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono">
                  {customization.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- Measurement Guide Tab --- */}
        {activeTab === "measurement" && measurement && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {measurement.title || "Standard Sizing Guide"}
              </h3>
              {measurement.measurement_unit && (
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md">
                  Measurement Unit: {measurement.measurement_unit}
                </span>
              )}
            </div>

            {measurement.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {measurement.description}
              </p>
            )}

            {measurement.notes && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  {measurement.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- Media & Detail Views Tab --- */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              High-Resolution Fabric & Detail Views
            </h3>
            {mediaList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-4/3 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group"
                  >
                    <Image
                      src={item.url}
                      alt={item.alt_text || product.name}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-105 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-400">
                No extra high-resolution views available for this product.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
