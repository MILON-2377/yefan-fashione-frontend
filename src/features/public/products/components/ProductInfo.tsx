"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Send,
  Check,
  Grid,
  Layers,
  Scissors,
} from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { ProductDetailResponse } from "../types/productDetailTypes";

interface ProductInfoProps {
  product: ProductDetailResponse;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || "",
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0]?.name || "",
  );

  return (
    <div className="space-y-6 bg-white">
      {/* --- Badge & Title Header --- */}
      <div className="space-y-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Code: {product.product_code}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Grade</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {product.name}
        </h1>

        {product.description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {product.description}
          </p>
        )}
      </div>

      {/* --- Specifications Selector --- */}
      <div className="space-y-5">
        {/* Color Swatch Picker */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">
                Available Colors
              </span>
              <span className="font-semibold text-blue-600">
                {selectedColor || "Select option"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <AppButton
                    key={color.id || color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    variant={isSelected ? "primary" : "secondary"}
                    size="sm"
                    className={`rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{color.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-1.5" />}
                  </AppButton>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">
                Production Sizes
              </span>
              <span className="font-semibold text-slate-900">
                {selectedSize || "Select size"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size.name;
                return (
                  <AppButton
                    key={size.id || size.name}
                    type="button"
                    onClick={() => setSelectedSize(size.name)}
                    variant={isSelected ? "default" : "secondary"}
                    size="sm"
                    className={`min-w-11 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {size.name}
                  </AppButton>
                );
              })}
            </div>
          </div>
        )}

        {/* Garment Key Features Summary Card */}
        {product.details && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200/80 pb-2">
              <Scissors className="w-3.5 h-3.5 text-blue-600" />
              <span>Garment Construction</span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs pt-1">
              {product.details.garment_type && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Type
                  </span>
                  <span className="font-bold text-slate-800">
                    {product.details.garment_type}
                  </span>
                </div>
              )}
              {product.details.fabric && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Primary Fabric
                  </span>
                  <span className="font-bold text-slate-800">
                    {product.details.fabric}
                  </span>
                </div>
              )}
              {product.details.silhouette && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Silhouette
                  </span>
                  <span className="font-bold text-slate-800">
                    {product.details.silhouette}
                  </span>
                </div>
              )}
              {product.details.closure && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Closure
                  </span>
                  <span className="font-bold text-slate-800">
                    {product.details.closure}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* --- B2B Call To Actions --- */}
      <div className="space-y-3 pt-2">
        {/* Primary Action: Direct Inquiry & Tech-Pack Quote */}
        <AppButton
          render={
            <Link
              href={`/contact?product=${product.id}&color=${encodeURIComponent(
                selectedColor,
              )}&size=${encodeURIComponent(selectedSize)}`}
            />
          }
          variant="primary"
          leftIcon={<Send className="w-4 h-4" />}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.99]"
        >
          Request Tech-Pack & Quote
        </AppButton>

        {/* Secondary Action: View All Collections */}
        <AppButton
          render={<Link href="/products" />}
          variant="outline"
          leftIcon={<Grid className="w-4 h-4 text-slate-600" />}
          className="w-full py-3.5 border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl transition-all"
        >
          View All Collections
        </AppButton>
      </div>

      {/* --- Trust & Certification Badges --- */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-slate-600 text-xs">
        <div className="flex items-center gap-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-700">
            ISO-9001 Certified Factory
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-700">
            Global Air & Sea Express
          </span>
        </div>
      </div>
    </div>
  );
}
