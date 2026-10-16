"use client";

import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Globe2,
  Shirt,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FactoryInfoSidebar() {
  const { dict } = useLanguage();
  const content = dict.factoryInfoSidebar;

  return (
    <div className="space-y-6">
      {/* Atelier & Factory Information */}
      <div className="relative space-y-7 overflow-hidden border border-[#51463B] bg-[#211F1C] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

        <div className="relative space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C6AD91]">
            {content.hqBadge}
          </span>

          <h3 className="max-w-sm font-serif text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
            {content.companyName}
          </h3>

          <div className="h-px w-12 bg-[#9D8974]" />
        </div>

        <div className="relative space-y-6 text-sm">
          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C6AD91]" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
                {content.addressTitle}
              </p>
              <p className="text-xs leading-6 text-[#D1C9C0] sm:text-sm">
                {content.addressText}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C6AD91]" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
                {content.phoneTitle}
              </p>
              <div className="flex flex-col gap-1 text-xs leading-6 text-[#D1C9C0] sm:text-sm">
                <a
                  href="tel:+862084219888"
                  className="w-fit transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  +86 20 8421 9888
                </a>
                <a
                  href="tel:+8613800138000"
                  className="w-fit transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  +86 138 0013 8000
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#C6AD91]" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
                {content.emailTitle}
              </p>
              <a
                href="mailto:inquiry@yifanapparel.com"
                className="break-all text-xs leading-6 text-[#D1C9C0] transition-colors hover:text-white focus-visible:outline-none focus-visible:underline sm:text-sm"
              >
                inquiry@yifanapparel.com
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C6AD91]" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
                {content.hoursTitle}
              </p>
              <p className="text-xs leading-6 text-[#D1C9C0] sm:text-sm">
                {content.hoursText}
              </p>
            </div>
          </div>
        </div>

        {/* Global Services */}
        <div className="relative grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Globe2 className="h-5 w-5 shrink-0 text-[#C6AD91]" />
            <span className="text-[10px] font-medium uppercase leading-5 tracking-[0.12em] text-[#D1C9C0] sm:text-xs">
              {content.worldwideShipping}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 shrink-0 text-[#C6AD91]" />
            <span className="text-[10px] font-medium uppercase leading-5 tracking-[0.12em] text-[#D1C9C0] sm:text-xs">
              {content.bsciCertified}
            </span>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="space-y-4 border border-[#E7E1D9] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#51463B]">
            {content.mapTitle}
          </h4>

          <span className="flex items-center gap-2 text-xs text-[#81786F]">
            <MapPin className="h-3.5 w-3.5 text-[#9D8974]" />
            {content.mapLocation}
          </span>
        </div>

        <div className="group relative aspect-[4/3] overflow-hidden border border-[#E7E1D9] bg-[#F0ECE6] sm:aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
            alt="Geographic map preview"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-[#211F1C]/25 p-4 transition-colors group-hover:bg-[#211F1C]/35">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-white/70 bg-[#FAF8F4] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#211F1C] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#211F1C]"
            >
              {content.openMapsBtn}
            </a>
          </div>
        </div>
      </div>

      {/* Showroom Callout */}
      <div className="flex items-start gap-4 border border-[#D8C9B8] bg-[#F0ECE6] p-5 sm:p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D8C9B8] bg-white text-[#51463B]">
          <Shirt className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <div className="min-w-0 space-y-2">
          <h4 className="font-serif text-lg font-medium text-[#211F1C]">
            {content.showroomTitle}
          </h4>

          <p className="text-xs leading-6 text-[#625D57] sm:text-sm">
            {content.showroomDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
