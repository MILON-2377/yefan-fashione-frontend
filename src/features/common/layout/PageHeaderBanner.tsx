"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  subtitle?: string;
  bgImageUrl?: string;
}

export function PageHeaderBanner({
  title,
  breadcrumbs,
  subtitle,
  bgImageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
}: PageHeaderBannerProps) {
  return (
    <section className="relative w-full h-[260px] sm:h-[320px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* --- Background Boutique Image --- */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />

      {/* --- Multi-layer Dark Gradient & Glass Overlay for Maximum Contrast --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]" />

      {/* --- Centered Content Box --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md capitalize">
          {title}
        </h1>

        {/* Subtitle (Optional) */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Dynamic Breadcrumbs Track */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/90 shadow-lg mt-2"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-blue-400" />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />

                {isLast || !item.href ? (
                  <span className="text-blue-300 font-semibold capitalize max-w-[150px] sm:max-w-xs truncate">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-300 transition-colors capitalize"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
