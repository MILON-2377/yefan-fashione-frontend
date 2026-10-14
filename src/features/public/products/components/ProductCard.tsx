"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowRight, Layers } from "lucide-react";
import { CatalogProductItem } from "../types/productCatalogTypes";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: CatalogProductItem;
  onQuickView?: (product: CatalogProductItem) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { dict } = useLanguage();
  const content = dict.productCard;

  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.media?.[0]?.url || "/Yee_Fan_Logo.jpg";
  const secondaryImage = product.media?.[1]?.url || primaryImage;

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
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Product Code Floating Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
            {product.product_code}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="w-full py-2.5 bg-white/95 hover:bg-blue-600 text-slate-900 hover:text-white backdrop-blur-md text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{content.quickView}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <Layers className="w-3 h-3 inline" />
              {content.verifiedBadge}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-blue-600 transition-colors"
          >
            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/products/${product.id}`}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            {content.fullDetails}
          </Link>

          <Link
            href={`/contact?product=${product.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>{content.inquire}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
