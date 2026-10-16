"use client";

import Image from "next/image";
import { ExternalLink, FileText } from "lucide-react";
import { PublicCatalogItem } from "../types/catalogTypes";
import { useLanguage } from "@/context/LanguageContext";

interface PublicCatalogCardProps {
  catalog: PublicCatalogItem;
}

export function PublicCatalogCard({ catalog }: PublicCatalogCardProps) {
  const { dict } = useLanguage();
  const content = dict.publicCatalogCard;

  return (
    <div className="group grid grid-cols-1 items-center gap-5 border border-[#E7E1D9] bg-white p-5 text-[#211F1C] transition-all duration-300 hover:border-[#D8C9B8] hover:shadow-[0_8px_30px_rgba(65,52,39,0.06)] sm:grid-cols-12 sm:gap-6 sm:p-6">
      {/* Cover Thumbnail */}
      <div className="group/cover relative aspect-[4/3] w-full overflow-hidden border border-[#E7E1D9] bg-[#F0ECE6] sm:col-span-3">
        {catalog.cover_image_url ? (
          <Image
            src={catalog.cover_image_url}
            alt={catalog.title}
            fill
            unoptimized
            className="object-cover object-top transition-transform duration-700 group-hover/cover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center border border-[#D8C9B8] bg-white text-[#9D8974]">
              <FileText className="h-6 w-6 stroke-[1.3]" />
            </div>
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#817970]">
              {content.fallbackCoverText}
            </span>
          </div>
        )}
      </div>

      {/* Catalog Details */}
      <div className="space-y-3 sm:col-span-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="border border-[#D8C9B8] bg-[#F0ECE6] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#806B55]">
            {content.pdfBadge}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#817970]">
            {new Date(catalog.created_at).toLocaleDateString(
              content.dateFormatLocale || "en-US",
              {
                month: "short",
                year: "numeric",
              },
            )}
          </span>
        </div>

        <h4 className="font-serif text-xl font-normal leading-snug tracking-tight text-[#211F1C] sm:text-2xl">
          {catalog.title}
        </h4>

        {catalog.description && (
          <p className="line-clamp-2 max-w-xl text-xs leading-6 text-[#625D57] sm:text-sm">
            {catalog.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#E7E1D9] pt-3 text-[9px] font-medium uppercase tracking-[0.12em] text-[#817970] sm:text-[10px]">
          <span className="inline-flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[#9D8974]" />
            {content.pdfDocument}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#B5A18D]" />
          <span>{content.highRes}</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center sm:col-span-3 sm:justify-end">
        {catalog.catalog_url ? (
          <a
            href={catalog.catalog_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/action inline-flex w-full items-center justify-center gap-3 border border-[#D8C9B8] bg-[#FAF8F4] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#211F1C] transition-all duration-300 hover:border-[#211F1C] hover:bg-[#211F1C] hover:text-white sm:w-auto"
          >
            <span>{content.viewBtn}</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#9D8974] transition-colors group-hover/action:text-white" />
          </a>
        ) : (
          <button
            disabled
            className="inline-flex w-full cursor-not-allowed items-center justify-center border border-[#E7E1D9] bg-[#F0ECE6] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#A49B91] sm:w-auto"
          >
            {content.unavailableBtn}
          </button>
        )}
      </div>
    </div>
  );
}
