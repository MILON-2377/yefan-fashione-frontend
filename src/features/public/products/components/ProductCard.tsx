"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowRight, Layers, ArrowUpRight } from "lucide-react";
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
      className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E1D9] bg-white transition-all duration-500 hover:border-[#D8C9B8] hover:shadow-[0_18px_45px_rgba(33,31,28,0.08)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F0ECE6]">
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Subtle Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#211F1C]/25 via-transparent to-[#211F1C]/5 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Product Code */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center border border-white/40 bg-[#FAF8F4]/95 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#51463B] backdrop-blur-sm">
            {product.product_code}
          </span>
        </div>

        {/* Quick View */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.id}`}
            className="flex w-full items-center justify-center gap-2 border border-white/70 bg-[#FAF8F4]/95 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#211F1C] backdrop-blur-md transition-colors duration-300 hover:bg-[#211F1C] hover:text-white"
          >
            <span>{content.fullDetails}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-3">
          {/* Collection Label */}
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-[#9D8974]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#9D8974]">
              <Layers className="mr-1 inline h-3 w-3" />
              {content.verifiedBadge}
            </span>
          </div>

          {/* Product Name */}
          <Link
            href={`/products/${product.slug}`}
            className="block transition-colors duration-300 hover:text-[#806B55]"
          >
            <h3 className="line-clamp-2 font-serif text-lg font-normal leading-snug tracking-tight text-[#211F1C] sm:text-xl">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-6 text-[#625D57]">
            {product.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F0ECE6] pt-4">
          <Link
            href={`/products/${product.id}`}
            className="group/details inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#625D57] transition-colors hover:text-[#211F1C]"
          >
            <span>{content.fullDetails}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
          </Link>

          <Link
            href={`/contact?product=${product.id}`}
            className="group/inquire inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#806B55] transition-colors hover:text-[#211F1C]"
          >
            <span>{content.inquire}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover/inquire:border-[#211F1C] group-hover/inquire:bg-[#211F1C] group-hover/inquire:text-white">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/inquire:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
