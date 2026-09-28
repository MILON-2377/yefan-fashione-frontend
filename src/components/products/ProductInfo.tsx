"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, FileText, Send } from "lucide-react";

export interface PricingTier {
  quantityRange: string;
  pricePerUnit: string;
}

export interface ProductInfoData {
  id: string;
  title: string;
  category: string;
  collection: string;
  fabric: string;
  moq: string;
  pricingTiers: PricingTier[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
}

interface ProductInfoProps {
  product: ProductInfoData;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(10);

  return (
    <div className="space-y-6">
      {/* Category Badge & Collection Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{product.collection}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {product.title}
        </h1>
        <p className="text-xs text-slate-500 font-mono">Item Code: {product.id}</p>
      </div>

      {/* Wholesale Pricing Tier Table */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 pb-2">
          <span>Quantity Order Tier</span>
          <span>Wholesale Price</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {product.pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-2.5 rounded-xl space-y-1 shadow-2xs"
            >
              <p className="text-xs text-slate-500 font-medium">{tier.quantityRange}</p>
              <p className="text-sm font-black text-slate-900">{tier.pricePerUnit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Selector */}
      <div className="space-y-4 border-t border-b border-slate-200 py-5">
        {/* Color Picker */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Available Colors: <span className="text-slate-900 font-extrabold">{selectedColor}</span>
          </span>
          <div className="flex items-center gap-3">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected ? "border-blue-600 ring-2 ring-blue-600/30 scale-110" : "border-slate-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Sizes Available: <span className="text-slate-900 font-extrabold">{selectedSize}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fabric Quick Spec */}
        <div className="text-xs text-slate-600 space-y-1">
          <p><strong className="text-slate-800">Primary Fabric:</strong> {product.fabric}</p>
          <p><strong className="text-slate-800">Minimum Order Quantity (MOQ):</strong> {product.moq}</p>
        </div>
      </div>

      {/* Primary Actions & Inquiry */}
      <div className="space-y-3">
        <Link
          href={`/inquiry?product=${product.id}&color=${encodeURIComponent(
            selectedColor
          )}&size=${selectedSize}`}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>Request Wholesale Tech-Pack & Quote</span>
        </Link>

        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all"
        >
          <FileText className="w-4 h-4 text-slate-600" />
          <span>Download Sample Tech Spec (PDF)</span>
        </Link>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-slate-600 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>ISO-9001 Certified Factory</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Global Air & Sea Express</span>
        </div>
      </div>
    </div>
  );
}