"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Shirt,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";

// Downloadable Catalogs Data
const PRODUCT_CATALOGS = [
  {
    id: "cat-2026-spring-summer",
    title: "2026 Spring / Summer Eveningwear Collection",
    year: "2026",
    version: "v2.4",
    category: "Full Collection Lookbook",
    fileSize: "18.5 MB",
    pages: "48 Pages",
    format: "PDF (High Res)",
    description:
      "Features our latest luxury evening gowns, silk slip dresses, and bridal wear line-up with full fabric specifications, color swatches, and size grading.",
    coverImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "cat-2026-bridal",
    title: "2026 Bridal Wear & Couture Veils Lookbook",
    year: "2026",
    version: "v1.1",
    category: "Bridal Line",
    fileSize: "14.2 MB",
    pages: "32 Pages",
    format: "PDF (High Res)",
    description:
      "Bespoke wedding gowns, hand-beaded lace appliques, corset options, and veil accessories tailored for high-end boutique bridal salons.",
    coverImage:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "cat-2026-cocktail",
    title: "2026 Boutique Cocktail & Prom Dress Catalog",
    year: "2026",
    version: "v1.0",
    category: "Cocktail & Party",
    fileSize: "11.8 MB",
    pages: "28 Pages",
    format: "PDF",
    description:
      "Ready-to-order cocktail dresses, satin mini dresses, and embellished partywear with low MOQ tier options for boutique buyers.",
    coverImage:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: "guide-fabric-swatch",
    title: "Silk, Satin & French Lace Fabric Swatch Guide",
    year: "2026",
    version: "v3.0",
    category: "Material Spec Guide",
    fileSize: "8.4 MB",
    pages: "20 Pages",
    format: "PDF",
    description:
      "Complete technical breakdown of Mulberry silks, stretch satins, OEKO-TEX certified lining fabrics, and lace patterns available for custom sourcing.",
    coverImage:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: "guide-oem-odm",
    title: "Atelier OEM / ODM Manufacturing Capability Guide",
    year: "2026",
    version: "v2.0",
    category: "Factory Profile",
    fileSize: "6.9 MB",
    pages: "16 Pages",
    format: "PDF",
    description:
      "Factory audit certifications (BSCI, ISO9001), pattern-making turnarounds, sampling lead times, and custom branding & private label packaging options.",
    coverImage:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    downloadUrl: "#",
    featured: false,
  },
];

// Boutique Category Sidebar Data
const SIDEBAR_CATEGORIES = [
  {
    name: "Couture Evening Gowns",
    count: "140+ Designs",
    href: "/products?category=evening-gowns",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bridal Wear & Veils",
    count: "95+ Designs",
    href: "/products?category=bridal-wear",
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bespoke Cocktail Dresses",
    count: "80+ Designs",
    href: "/products?category=cocktail-dresses",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Silk & Satin Slip Dresses",
    count: "110+ Designs",
    href: "/products?category=slip-dresses",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Tailored Women Suits",
    count: "60+ Designs",
    href: "/products?category=women-suits",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=200&q=80",
  },
];

export default function DownloadsPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloading PDF: ${title}`);
    }, 800);
  };

  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT MAIN CONTENT AREA (~70% Width)                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Section */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Boutique Lookbooks & Product Specs</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Download Official Product Catalogs
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Access high-resolution PDF lookbooks, 2026 fashion collections,
                fabric material guides, and manufacturing specification sheets
                directly from Guangzhou Yifan Apparel Co., Ltd.
              </p>
            </section>

            {/* Featured 2026 Catalog Banner */}
            {PRODUCT_CATALOGS.filter((c) => c.featured).map((catalog) => (
              <div
                key={catalog.id}
                className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
              >
                <div className="sm:col-span-7 space-y-4 z-10">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide">
                    <span>{catalog.year} Flagship Catalog</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {catalog.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {catalog.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-2">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      {catalog.format}
                    </span>
                    <span>•</span>
                    <span>{catalog.fileSize}</span>
                    <span>•</span>
                    <span>{catalog.pages}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleDownload(catalog.id, catalog.title)}
                      disabled={downloadingId === catalog.id}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {downloadingId === catalog.id
                          ? "Preparing Download..."
                          : "Download 2026 PDF Catalog"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Catalog Cover Preview */}
                <div className="sm:col-span-5 relative aspect-3/4 sm:aspect-auto sm:h-full rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl">
                  <Image
                    src={catalog.coverImage}
                    alt={catalog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/20" />
                </div>
              </div>
            ))}

            {/* Complete Download List Grid */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  All Available Downloads
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {PRODUCT_CATALOGS.length} Documents Available
                </span>
              </div>

              <div className="space-y-4">
                {PRODUCT_CATALOGS.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-5 sm:p-6 transition-all hover:shadow-md grid grid-cols-1 sm:grid-cols-12 gap-5 items-center"
                  >
                    {/* Cover Thumbnail */}
                    <div className="sm:col-span-3 relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                      <Image
                        src={doc.coverImage}
                        alt={doc.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Meta Details */}
                    <div className="sm:col-span-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {doc.version}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {doc.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                        <span>{doc.format}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.pages}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="sm:col-span-3 flex sm:justify-end items-center">
                      <button
                        onClick={() => handleDownload(doc.id, doc.title)}
                        disabled={downloadingId === doc.id}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>
                          {downloadingId === doc.id
                            ? "Downloading..."
                            : "Download"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Custom Tech-Pack Request Callout */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-slate-900">
                  Need High-Res Printable CAD or Vectors?
                </h4>
                <p className="text-sm text-slate-600">
                  Contact our design department for uncompressed CAD pattern
                  files, tech-pack templates, or confidential wholesale price
                  sheets.
                </p>
              </div>

              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shrink-0"
              >
                Request Custom Tech-Pack
              </AppButton>
            </section>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDEBAR (~30% Width - Sticky)                       */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Category Navigation Widget with Mini Thumbnails */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Boutique Collections
                </h3>
                <Link
                  href="/products"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {SIDEBAR_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    {/* Small Category Image Thumbnail */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {cat.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {cat.count}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Wholesale & OEM Private Access Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                <Shirt className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  OEM / ODM Fashion Consultation
                </h4>
                <p className="text-xs text-slate-500">
                  Speak directly with our apparel merchandisers regarding fabric
                  options, minimums, or sampling.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Contact Merchandiser
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
