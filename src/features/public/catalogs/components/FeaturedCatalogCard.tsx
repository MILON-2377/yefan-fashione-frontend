"use client";

import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { PublicCatalogItem } from "../types/catalogTypes";
import { useLanguage } from "@/context/LanguageContext";

interface FeaturedCatalogCardProps {
  catalog: PublicCatalogItem;
}

export function FeaturedCatalogCard({ catalog }: FeaturedCatalogCardProps) {
  const { dict } = useLanguage();
  const content = dict.featuredCatalogCard;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
      <div className="sm:col-span-7 space-y-4 z-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide">
          <span>{content.flagshipBadge}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {catalog.title}
        </h2>

        {catalog.description && (
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {catalog.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-2">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            {content.pdfSpecSheet}
          </span>
          <span>•</span>
          <span>{content.digitalCatalog}</span>
        </div>

        <div className="pt-2">
          {catalog.catalog_url ? (
            <a
              href={catalog.catalog_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{content.downloadBtn}</span>
            </a>
          ) : (
            <span className="text-xs text-slate-500 italic">
              {content.pendingUpload}
            </span>
          )}
        </div>
      </div>

      {/* Catalog Cover Preview */}
      {/* Right Cover Preview Area (5 Cols) - Full Container Cover */}
      <div className="sm:col-span-5 relative min-h-70 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0 group shadow-2xl">
        {catalog.cover_image_url ? (
          <Image
            src={catalog.cover_image_url}
            alt={catalog.title}
            fill
            unoptimized
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-2 p-4 h-full">
            <FileText className="w-10 h-10 stroke-[1.25] text-slate-600" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {content.previewAlt}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
