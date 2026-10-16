"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { AboutPageDictContent } from "../types/aboutVideoTypes";

interface AboutFacilitiesSectionProps {
  content: AboutPageDictContent;
}

const FACILITY_IMAGES = [
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1000&q=80",
];

export function AboutFacilitiesSection({
  content,
}: AboutFacilitiesSectionProps) {
  const [activeTab, setActiveTab] = useState(
    content.facilities[0]?.id || "pattern",
  );

  const activeFacility =
    content.facilities.find((f: { id: string }) => f.id === activeTab) ||
    content.facilities[0];

  const activeImageIndex = content.facilities.findIndex(
    (f: { id: string }) => f.id === activeTab,
  );
  const activeFacilityImage =
    FACILITY_IMAGES[activeImageIndex >= 0 ? activeImageIndex : 0];

  return (
    <section className="space-y-7 pt-4 sm:space-y-9">
      {/* Section Heading */}
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974]">
          <span className="h-px w-6 bg-[#9D8974]" />
          Our Capabilities
        </span>

        <h3 className="font-serif text-2xl font-normal tracking-tight text-[#211F1C] sm:text-3xl">
          {content.capabilitiesTitle}
        </h3>

        <p className="max-w-2xl text-xs leading-6 text-[#625D57] sm:text-sm sm:leading-7">
          {content.capabilitiesDesc}
        </p>
      </div>

      {/* Facility Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#D8C9B8] pb-4">
        {content.facilities.map((fac: { id: string; title: string }) => (
          <button
            key={fac.id}
            type="button"
            onClick={() => setActiveTab(fac.id)}
            aria-pressed={activeTab === fac.id}
            className={`relative px-4 py-2.5 text-xs font-medium transition-all duration-300 sm:px-5 sm:text-sm ${
              activeTab === fac.id
                ? "bg-[#211F1C] text-[#FAF8F4]"
                : "border border-[#E7E1D9] bg-white text-[#625D57] hover:border-[#D8C9B8] hover:bg-[#F0ECE6] hover:text-[#211F1C]"
            }`}
          >
            {fac.title}
            {activeTab === fac.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#9D8974]" />
            )}
          </button>
        ))}
      </div>

      {/* Active Facility Details */}
      <div className="grid grid-cols-1 items-center gap-7 border border-[#E7E1D9] bg-white p-5 sm:grid-cols-12 sm:gap-8 sm:p-7 lg:p-9">
        <div className="space-y-5 sm:col-span-7">
          <div className="space-y-3">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
              Facility Overview
            </span>

            <h4 className="font-serif text-2xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-3xl">
              {activeFacility.title}
            </h4>

            <div className="h-px w-10 bg-[#D8C9B8]" />
          </div>

          <p className="text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
            {activeFacility.description}
          </p>

          {/* Facility Specifications */}
          <div className="border-t border-[#F0ECE6] pt-5">
            <h5 className="mb-4 text-[9px] font-medium uppercase tracking-[0.2em] text-[#817970]">
              Key Capabilities
            </h5>

            <ul className="space-y-3">
              {activeFacility.specs.map((spec: string) => (
                <li
                  key={spec}
                  className="flex items-start gap-3 text-xs leading-6 text-[#51463B] sm:text-sm"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#9D8974]" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Facility Image */}
        <div className="relative aspect-[4/3] overflow-hidden border border-[#E7E1D9] bg-[#F0ECE6] sm:col-span-5 sm:aspect-[4/5]">
          <Image
            src={activeFacilityImage}
            alt={activeFacility.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 480px"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#211F1C]/50 to-transparent p-5 pt-16">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/90">
              Yifan Atelier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
