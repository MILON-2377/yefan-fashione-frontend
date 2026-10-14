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
    <div className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-5 sm:p-6 transition-all hover:shadow-md grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
      {/* Cover Thumbnail */}
      <div className="sm:col-span-3 relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 group">
        {catalog.cover_image_url ? (
          <Image
            src={catalog.cover_image_url}
            alt={catalog.title}
            fill
            unoptimized
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 h-full">
            <FileText className="w-8 h-8 stroke-[1.5]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              {content.fallbackCoverText}
            </span>
          </div>
        )}
      </div>

      {/* Meta Details */}
      <div className="sm:col-span-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
            {content.pdfBadge}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {new Date(catalog.created_at).toLocaleDateString(
              content.dateFormatLocale || "en-US",
              {
                month: "short",
                year: "numeric",
              },
            )}
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 leading-snug">
          {catalog.title}
        </h4>

        {catalog.description && (
          <p className="text-xs text-slate-600 line-clamp-2">
            {catalog.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            {content.pdfDocument}
          </span>
          <span>•</span>
          <span>{content.highRes}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="sm:col-span-3 flex sm:justify-end items-center">
        {catalog.catalog_url ? (
          <a
            href={catalog.catalog_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>{content.viewBtn}</span>
          </a>
        ) : (
          <button
            disabled
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl cursor-not-allowed"
          >
            {content.unavailableBtn}
          </button>
        )}
      </div>
    </div>
  );
}
