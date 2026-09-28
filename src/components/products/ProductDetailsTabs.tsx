"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Shield, Layers, Sliders } from "lucide-react";

interface ProductDetailsTabsProps {
  description: string;
  fabricSpecs: { label: string; value: string }[];
  oemFeatures: string[];
  galleryImages: string[];
}

export function ProductDetailsTabs({
  description,
  fabricSpecs,
  oemFeatures,
  galleryImages,
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<"specifications" | "oem" | "gallery">("specifications");

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("specifications")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "specifications"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Fabric & Technical Specs</span>
        </button>

        <button
          onClick={() => setActiveTab("oem")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "oem"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>OEM / ODM Customization</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-6 py-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "gallery"
              ? "border-blue-600 text-blue-600 bg-white"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>High-Res Detail Views</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-6 sm:p-8">
        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="space-y-6">
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              {description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              {fabricSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2.5 px-4 bg-slate-50 rounded-xl text-xs"
                >
                  <span className="font-medium text-slate-500">{spec.label}</span>
                  <span className="font-bold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OEM / Customization Tab */}
        {activeTab === "oem" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Available Customization Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {oemFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Visual Grid */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Workmanship & Fabric Close-ups
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
                >
                  <Image
                    src={imgUrl}
                    alt={`Detail view ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-all duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}