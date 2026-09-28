"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Shirt, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  collection: string;
  priceEstimate: string;
  moq: string;
  primaryImage: string;
  secondaryImage: string;
  fabric: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-3/4 w-full bg-slate-100 overflow-hidden">
        {/* Primary & Secondary Image Swap on Hover */}
        <Image
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              2026 Collection
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-200 shadow-sm">
            {product.moq}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onQuickView?.(product)}
            className="w-full py-2.5 bg-white/95 hover:bg-blue-600 text-slate-900 hover:text-white backdrop-blur-md text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Specs & Swatches</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              {product.category}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {product.fabric}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-blue-600 transition-colors"
          >
            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-1">
            Collection: {product.collection}
          </p>
        </div>

        {/* Color Swatch Indicators & Size Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1">
              {product.colors.map((colorHex, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: colorHex }}
                  title="Available Color Option"
                />
              ))}
              <span className="text-[10px] text-slate-400 font-medium ml-1">
                +{product.colors.length} Colors
              </span>
            </div>

            <span className="font-semibold text-slate-500">
              {product.sizes.slice(0, 4).join(", ")}
            </span>
          </div>

          {/* Wholesale Pricing & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400">
                Wholesale Est.
              </p>
              <p className="text-sm font-black text-slate-900">
                {product.priceEstimate}
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Inquire
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
