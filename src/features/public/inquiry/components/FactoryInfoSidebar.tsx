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
    <div className="space-y-8">
      {/* Atelier & Factory Information Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {content.hqBadge}
          </span>
          <h3 className="text-2xl font-bold">{content.companyName}</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{content.addressTitle}</p>
              <p className="text-slate-300 leading-relaxed">
                {content.addressText}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{content.phoneTitle}</p>
              <p className="text-slate-300">
                +86 20 8421 9888 / +86 138 0013 8000
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{content.emailTitle}</p>
              <p className="text-slate-300">inquiry@yifanapparel.com</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">{content.hoursTitle}</p>
              <p className="text-slate-300">{content.hoursText}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-blue-400" />{" "}
            {content.worldwideShipping}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />{" "}
            {content.bsciCertified}
          </span>
        </div>
      </div>

      {/* Map Preview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {content.mapTitle}
          </h4>
          <span className="text-[11px] font-semibold text-blue-600">
            {content.mapLocation}
          </span>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
            alt="Guangzhou Apparel Zone Map Location"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/90 hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-lg backdrop-blur-xs transition-all"
            >
              {content.openMapsBtn}
            </a>
          </div>
        </div>
      </div>

      {/* Showroom Callout */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
          <Shirt className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-slate-900">
            {content.showroomTitle}
          </h4>
          <p className="text-xs text-slate-600">{content.showroomDesc}</p>
        </div>
      </div>
    </div>
  );
}
