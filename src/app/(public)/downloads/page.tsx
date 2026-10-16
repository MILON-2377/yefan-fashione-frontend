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
    <div className="bg-[#FAF8F4] py-12 text-[#211F1C] lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-8">
            {/* Page Header */}
            <section className="space-y-4 border-b border-[#D8C9B8] pb-8 sm:pb-10">
              <div className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974] sm:text-[10px]">
                <Sparkles className="h-4 w-4" />
                <span>{content.badge}</span>
              </div>

              <h1 className="max-w-3xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
                {content.heading}
              </h1>

              <p className="max-w-2xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
                {content.subheading}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <span className="h-px w-10 bg-[#9D8974]" />
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#817970]">
                  Collections · Craftsmanship · Specifications
                </span>
              </div>
            </section>

            {/* Featured Catalog */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 border border-[#E7E1D9] bg-white px-6 py-14 text-center">
                <Sparkles className="h-6 w-6 animate-spin text-[#9D8974]" />
                <p className="text-xs leading-6 text-[#625D57]">
                  {content.loadingFeatured}
                </p>
              </div>
            ) : featuredCatalog ? (
              <FeaturedCatalogCard catalog={featuredCatalog} />
            ) : null}

            {/* Complete Catalog List */}
            <section className="space-y-6 pt-2">
              <div className="flex flex-col gap-3 border-b border-[#D8C9B8] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                    Browse Our Collection
                  </span>
                  <h3 className="font-serif text-2xl font-normal tracking-tight text-[#211F1C] sm:text-3xl">
                    {content.listHeading}
                  </h3>
                </div>

                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#817970]">
                  {catalogs.length} {content.documentsCount}
                </span>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-24 animate-pulse border border-[#E7E1D9] bg-white"
                    />
                  ))}
                  <p className="pt-2 text-center text-xs text-[#817970]">
                    {content.loadingList}
                  </p>
                </div>
              ) : catalogs.length === 0 ? (
                <div className="flex flex-col items-center border border-[#E7E1D9] bg-white px-6 py-12 text-center sm:py-16">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#9D8974]">
                    <FileText className="h-7 w-7" />
                  </div>

                  <h4 className="font-serif text-xl font-normal text-[#211F1C]">
                    {content.noCatalogsTitle}
                  </h4>

                  <p className="mt-2 max-w-sm text-xs leading-6 text-[#625D57] sm:text-sm">
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

            {/* Custom Tech-Pack CTA */}
            <section className="relative overflow-hidden border border-[#D8C9B8] bg-[#F0ECE6] p-6 sm:p-8 lg:p-9">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#D8C9B8]/70" />
              <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full border border-[#D8C9B8]/60" />

              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="max-w-lg space-y-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                    Made for Your Brand
                  </span>

                  <h4 className="font-serif text-2xl font-normal leading-tight text-[#211F1C] sm:text-3xl">
                    {content.ctaHeading}
                  </h4>

                  <p className="text-xs leading-7 text-[#625D57] sm:text-sm">
                    {content.ctaDesc}
                  </p>
                </div>

                <AppButton
                  render={<Link href="/contact" />}
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="shrink-0 rounded-none border border-[#211F1C] bg-[#211F1C] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow-none transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B]"
                >
                  {content.ctaButton}
                </AppButton>
              </div>
            </section>
          </div>

          {/* Catalog Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <CatalogSidebarCategories />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
