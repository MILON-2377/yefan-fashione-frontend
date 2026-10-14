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

export function AboutFacilitiesSection({ content }: AboutFacilitiesSectionProps) {
  const [activeTab, setActiveTab] = useState(content.facilities[0]?.id || "pattern");

  const activeFacility =
    content.facilities.find((f: { id: string }) => f.id === activeTab) ||
    content.facilities[0];

  const activeImageIndex = content.facilities.findIndex(
    (f: { id: string }) => f.id === activeTab
  );
  const activeFacilityImage = FACILITY_IMAGES[activeImageIndex >= 0 ? activeImageIndex : 0];

  return (
    <section className="space-y-6 pt-4">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {content.capabilitiesTitle}
        </h3>
        <p className="text-sm text-slate-500">{content.capabilitiesDesc}</p>
      </div>

      {/* Facility Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {content.facilities.map((fac: { id: string; title: string }) => (
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
          <h4 className="text-xl font-bold text-slate-900">{activeFacility.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{activeFacility.description}</p>

          <ul className="space-y-2 pt-2">
            {activeFacility.specs.map((spec: string) => (
              <li key={spec} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-5 relative aspect-video sm:aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <Image
            src={activeFacilityImage}
            alt={activeFacility.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
