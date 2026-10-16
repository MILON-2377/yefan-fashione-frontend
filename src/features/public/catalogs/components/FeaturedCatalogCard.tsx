"use client";

import Image from "next/image";
import { FileText, ExternalLink, Sparkles } from "lucide-react";
import { PublicCatalogItem } from "../types/catalogTypes";
import { useLanguage } from "@/context/LanguageContext";

interface FeaturedCatalogCardProps {
  catalog: PublicCatalogItem;
}

export function FeaturedCatalogCard({ catalog }: FeaturedCatalogCardProps) {
  const { dict } = useLanguage();
  const content = dict.featuredCatalogCard;

  return (
    <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden border border-[#D8C9B8] bg-[#F0ECE6] p-6 text-[#211F1C] sm:grid-cols-12 sm:gap-8 sm:p-8 lg:p-10">
      {/* Subtle editorial background detail */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#D8C9B8]/60" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[#D8C9B8]/50" />

      <div className="relative z-10 space-y-5 sm:col-span-7">
        <div className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-white/70 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#806B55] sm:text-[10px]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{content.flagshipBadge}</span>
        </div>

        <div className="space-y-3">
          <h2 className="max-w-xl font-serif text-2xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-3xl lg:text-4xl">
            {catalog.title}
          </h2>

          {catalog.description && (
            <p className="line-clamp-3 max-w-xl text-xs leading-7 text-[#625D57] sm:text-sm sm:leading-7">
              {catalog.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#D8C9B8] pt-4 text-[9px] font-medium uppercase tracking-[0.12em] text-[#817970] sm:text-[10px]">
          <span className="inline-flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#9D8974]" />
            {content.pdfSpecSheet}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[#B5A18D] sm:block" />
          <span>{content.digitalCatalog}</span>
        </div>

        <div className="pt-1">
          {catalog.catalog_url ? (
            <a
              href={catalog.catalog_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-[#211F1C] bg-[#211F1C] px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B] sm:px-6"
            >
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span>{content.downloadBtn}</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs italic text-[#817970]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B5A18D]" />
              {content.pendingUpload}
            </span>
          )}
        </div>
      </div>

      {/* Catalog Cover Preview */}
      <div className="group relative min-h-[280px] w-full overflow-hidden border border-[#D8C9B8] bg-white shadow-sm sm:col-span-5 sm:min-h-[340px]">
        {catalog.cover_image_url ? (
          <>
            <Image
              src={catalog.cover_image_url}
              alt={catalog.title}
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211F1C]/20 via-transparent to-white/5" />
            <div className="pointer-events-none absolute inset-3 border border-white/30" />
          </>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 p-6 text-center sm:min-h-[340px]">
            <div className="flex h-16 w-16 items-center justify-center border border-[#D8C9B8] bg-[#FAF8F4] text-[#9D8974]">
              <FileText className="h-8 w-8 stroke-[1.2]" />
            </div>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#817970]">
              {content.previewAlt}
            </span>
            <span className="h-px w-8 bg-[#D8C9B8]" />
          </div>
        )}
      </div>
    </div>
  );
}
