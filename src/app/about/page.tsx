"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scissors,
  Award,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Shirt,
  Layers,
  FileCheck2,
} from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";

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

// Atelier Workshop Tabs
const ATELIER_FACILITIES = [
  {
    id: "pattern",
    title: "Pattern Making & Sample Studio",
    description:
      "Master patternmakers and 3D Clo3D designers turn tech-packs into precise paper patterns and physical samples with a 7-10 day turnaround.",
    specs: [
      "3D Digital Sample Rendering",
      "Custom Tech-Pack Development",
      "7-Day Sample Dispatch",
    ],
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tailoring",
    title: "Hand-Crafted Sewing & Beading",
    description:
      "Specialized atelier team delivering fine hand-embroidery, delicate lace applique, corset boning, and French seam finishings.",
    specs: [
      "Hand Embroidery & Beading",
      "Imported French Lace Sourcing",
      "High-End Corsetry",
    ],
    image:
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "inspection",
    title: "Fabric Sourcing & AQL 2.5 Lab",
    description:
      "Eco-certified fabric testing for colorfastness, shrinkage, and seam strength before full-scale bulk garment production.",
    specs: [
      "OEKO-TEX Standard 100",
      "AQL 2.5 Quality Inspection",
      "Direct Mill Fabric Sourcing",
    ],
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("pattern");

  const activeFacility =
    ATELIER_FACILITIES.find((f) => f.id === activeTab) || ATELIER_FACILITIES[0];

  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT MAIN CONTENT AREA (~70% Width)                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-16">
            {/* 1. Fashion Atelier Overview */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Premier Couture & Garment OEM / ODM Atelier</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Crafting High-End Boutique Dresses & Evening Couture
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                <strong className="text-slate-900 font-semibold">
                  Guangzhou Yifan Apparel Co., Ltd.
                </strong>{" "}
                is a dedicated fashion manufacturing atelier specializing in
                luxury evening gowns, boutique dresses, bridal wear, and
                tailored apparel. Combining traditional hand craftsmanship with
                modern pattern-making technology, we partner with boutique
                owners, designer labels, and global fashion brands across 50+
                countries.
              </p>

              {/* Key Trust Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
                    15+
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Years Atelier Craftsmanship
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
                    50k Pcs
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Monthly Garment Output
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
                    120+
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Boutique Partners Worldwide
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
                    BSCI
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Certified Fashion Factory
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Direct Inline HTML5 Video Player */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Inside Our Fashion Atelier & Sewing Floor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Watch our master tailors, pattern cutting, and quality
                    finishing in motion.
                  </p>
                </div>
              </div>

              {/* Direct Native HTML5 Video Element */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video shadow-md">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support playing embedded videos.
                </video>
              </div>
            </section>

            {/* 3. Garment Workshop Facilities Showcase */}
            <section className="space-y-6 pt-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Atelier & Workshop Capabilities
                </h3>
                <p className="text-sm text-slate-500">
                  From initial sketch to bulk garment dispatch, designed for
                  luxury finishing.
                </p>
              </div>

              {/* Facility Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {ATELIER_FACILITIES.map((fac) => (
                  <button
                    key={fac.id}
                    onClick={() => setActiveTab(fac.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === fac.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {fac.title}
                  </button>
                ))}
              </div>

              {/* Tab Detail Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 items-center">
                <div className="sm:col-span-7 space-y-4">
                  <h4 className="text-xl font-bold text-slate-900">
                    {activeFacility.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeFacility.description}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {activeFacility.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-5 relative aspect-video sm:aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src={activeFacility.image}
                    alt={activeFacility.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            {/* 4. Atelier Photo Gallery */}
            <section className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Atelier Gallery & Dress Details
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    title: "Hand Beading & Seaming",
                    url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    title: "Pattern Cutting Room",
                    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    title: "Evening Gown Finishing",
                    url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    title: "Silk & Lace Sourcing",
                    url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    title: "Mannequin Fitting",
                    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
                  },
                  {
                    title: "Export Garment Packing",
                    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
                  },
                ].map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 group shadow-sm bg-slate-100"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-semibold text-white truncate">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Custom Apparel CTA */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold text-slate-900">
                  Have a Fashion Tech-Pack or Custom Design?
                </h4>
                <p className="text-sm text-slate-600">
                  Send us your sketches, tech-packs, or sample requests for a
                  direct production estimate within 24 hours.
                </p>
              </div>

              <AppButton
                render={<Link href="/contact" />}
                variant="primary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shrink-0"
              >
                Request Sample Quote
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

            {/* Quick Contact & Lookbook Download Widget */}
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
