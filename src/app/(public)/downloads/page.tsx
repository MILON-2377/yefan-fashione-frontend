"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, FileText } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { usePublicCatalogs } from "@/features/public/catalogs/hooks/usePublicCatalogs";
import { FeaturedCatalogCard } from "@/features/public/catalogs/components/FeaturedCatalogCard";
import { PublicCatalogCard } from "@/features/public/catalogs/components/PublicCatalogCard";
import { useLanguage } from "@/context/LanguageContext";
import { CatalogSidebarCategories } from "@/features/common/components/CatalogSidebarCategories";

export default function PublicDownloadPage() {
  const { dict } = useLanguage();
  const content = dict.downloadPage;

  const { data: catalogResponse, isLoading } = usePublicCatalogs();
  const catalogs = catalogResponse?.items || [];
  const featuredCatalog = catalogs[0];

  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT MAIN CONTENT AREA (~70% Width)                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{content.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {content.heading}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {content.subheading}
              </p>
            </section>

            {/* Featured Hero Catalog Card */}
            {isLoading ? (
              <div className="bg-slate-900 text-white rounded-2xl p-12 text-center space-y-2">
                <Sparkles className="w-6 h-6 text-blue-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">
                  {content.loadingFeatured}
                </p>
              </div>
            ) : featuredCatalog ? (
              <FeaturedCatalogCard catalog={featuredCatalog} />
            ) : null}

            {/* Complete Catalog Download List */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {content.listHeading}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {catalogs.length} {content.documentsCount}
                </span>
              </div>

              {isLoading ? (
                <div className="p-12 text-center text-xs text-slate-500 space-y-2">
                  <Sparkles className="w-5 h-5 text-blue-600 animate-spin mx-auto" />
                  <p>{content.loadingList}</p>
                </div>
              ) : catalogs.length === 0 ? (
                <div className="p-12 text-center space-y-3 bg-slate-50 border border-slate-200 rounded-2xl">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">
                    {content.noCatalogsTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                    {content.noCatalogsDesc}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {catalogs.map((doc) => (
                    <PublicCatalogCard key={doc.id} catalog={doc} />
                  ))}
                </div>
              )}
            </section>

            {/* Custom Tech-Pack Request Callout */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-slate-900">
                  {content.ctaHeading}
                </h4>
                <p className="text-sm text-slate-600">{content.ctaDesc}</p>
              </div>

              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shrink-0"
              >
                {content.ctaButton}
              </AppButton>
            </section>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDEBAR (~30% Width - Sticky)                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-4">
            <CatalogSidebarCategories />
          </div>
        </div>
      </div>
    </div>
  );
}
