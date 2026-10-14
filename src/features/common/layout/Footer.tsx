"use client";

import Link from "next/link";
import { Lock, ArrowUpRight } from "lucide-react";
import { FooterWhatsApp } from "./FooterWhatsApp";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();
  const content = dict.footer;

  return (
    <footer className="w-full bg-white text-slate-700 border-t border-slate-200 selection:bg-slate-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 items-start">
          {/* Column 1: Brand Info (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] font-mono text-slate-400 uppercase block">
                Atelier & Manufacture
              </span>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-serif">
                {content.brandName}
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-normal tracking-wide">
              {content.brandDesc}
            </p>

            {/* Brand Portfolio Tags */}
            <div className="pt-2 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">
                Houses & Subsidiaries
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-700">
                <span className="px-3 py-1 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors cursor-default font-medium">
                  YEEFANS
                </span>
                <span className="px-3 py-1 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors cursor-default font-medium">
                  KissMarch
                </span>
                <span className="px-3 py-1 bg-slate-50 border border-slate-200 hover:border-slate-400 transition-colors cursor-default font-medium">
                  Soiowar
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Curation */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">
              {content.quickNavTitle}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wide text-slate-600">
              <li>
                <Link
                  href="/products"
                  className="hover:text-slate-900 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>{content.productCatalog}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-slate-900 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>{content.aboutFactory}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="hover:text-slate-900 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>{content.resourceCenter}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-slate-900 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>{content.orderingFaq}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Headquarters */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">
              {content.contactTitle}
            </h4>
            <div className="space-y-3 text-xs font-normal leading-relaxed text-slate-600">
              <p>{content.address}</p>
              <div className="pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  {content.emailLabel}
                </span>
                <a
                  href="mailto:sales@yifanbridal.com"
                  className="text-slate-900 hover:text-blue-600 underline decoration-slate-300 underline-offset-4 hover:decoration-blue-600 transition-all font-mono text-[11px]"
                >
                  sales@yifanbridal.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: WhatsApp Concierge Portal (Alignment Fixed) */}
          <div className="w-full flex flex-col justify-start">
            <div className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl shadow-xs">
              <FooterWhatsApp />
            </div>
          </div>
        </div>

        {/* Copyright & Restricted Admin Access Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <p className="tracking-tight">
            © {new Date().getFullYear()} Guangzhou Yifan Trading Co., Ltd.{" "}
            <span className="text-slate-500">{content.allRightsReserved}</span>
          </p>

          {/* Discreet Admin Portal Link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[9px] py-1 px-2.5 rounded hover:bg-slate-100 border border-transparent hover:border-slate-200"
          >
            <Lock className="w-2.5 h-2.5 text-slate-400" />
            <span>{content.adminPortal}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
