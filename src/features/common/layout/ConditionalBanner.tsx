"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Home } from "lucide-react";

const BANNER_IMAGES: Record<string, string> = {
  products:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
  categories:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
  about:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
  contact:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80";

const ROUTE_LABELS: Record<string, string> = {
  products: "Collection",
  categories: "Categories",
  about: "Our Atelier",
  contact: "Contact",
  downloads: "Catalogues",
  faq: "Frequently Asked Questions",
  login: "Account",
};

function formatSegment(segment: string) {
  const decoded = decodeURIComponent(segment);
  return (
    ROUTE_LABELS[decoded] ??
    decoded.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

export function ConditionalBanner() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const primarySection = pathSegments[0] || "";
  const bgImage = BANNER_IMAGES[primarySection] || DEFAULT_IMAGE;
  const pageTitle = formatSegment(pathSegments[pathSegments.length - 1] || "");

  return (
    <section className="relative isolate flex min-h-70 w-full items-center justify-center overflow-hidden bg-[#FAF8F4] pt-20 sm:min-h-[340px] lg:min-h-[390px]">
      {/* Editorial background photography */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      {/* Warm overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#FAF8F4]/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-[#FAF8F4] via-[#FAF8F4]/70 to-[#FAF8F4]/45"
      />

      {/* Decorative editorial frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-5 top-24 border border-white/50 sm:inset-x-8 sm:bottom-8 sm:top-28 lg:inset-x-12"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-14 text-center sm:py-16 lg:py-20">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#9D8974]" />
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#806B55] sm:text-[10px]">
            Yifan Bridal & Couture
          </span>
          <span className="h-px w-8 bg-[#9D8974]" />
        </div>

        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-5xl md:text-6xl lg:text-7xl">
          {pageTitle}
        </h1>

        <div className="mx-auto mt-6 h-px w-12 bg-[#D8C9B8]" />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[10px] uppercase tracking-[0.13em] sm:text-[11px]"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#625D57] transition-colors hover:text-[#211F1C]"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const label = formatSegment(segment);

            return (
              <div key={href} className="flex min-w-0 items-center gap-2">
                <ChevronRight className="h-3 w-3 shrink-0 text-[#B5AAA0]" />

                {isLast ? (
                  <span
                    aria-current="page"
                    className="max-w-45 truncate font-medium text-[#806B55] sm:max-w-xs"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-[#625D57] transition-colors hover:text-[#211F1C]"
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <Link
          href="/products"
          className="group mt-8 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#51463B] transition-colors hover:text-[#9D8974] sm:text-[10px]"
        >
          Explore Our Collection
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Bottom border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[#D8C9B8]/80"
      />
    </section>
  );
}
