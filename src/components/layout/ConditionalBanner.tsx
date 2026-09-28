"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

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

export function ConditionalBanner() {
  const pathname = usePathname();

  // Hide completely on the home page
  if (pathname === "/") {
    return null;
  }

  // Split path into clean segments
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  // Format the page title
  const rawTitle = pathSegments[pathSegments.length - 1] || "";
  const pageTitle = decodeURIComponent(rawTitle)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Pick background image based on primary section route
  const primarySection = pathSegments[0] || "";
  const bgImage = BANNER_IMAGES[primarySection] || DEFAULT_IMAGE;

  return (
    <section className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center overflow-hidden bg-white border-b border-slate-100 pt-20">
      {/* Background Boutique Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105 opacity-20"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Light Gradient Overlay to Maintain Pure White Background Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
        {/* Page Title in Vibrant Blue */}
        <h1 className="text-3xl sm:text-5xl font-black text-blue-600 tracking-tight capitalize">
          {pageTitle}
        </h1>

        {/* Breadcrumb Navigation Badge */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-blue-50/90 border border-blue-200/80 text-xs sm:text-sm font-semibold shadow-sm"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-blue-600" />
            <span>Home</span>
          </Link>

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const label = decodeURIComponent(segment)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
              <div key={href} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                {isLast ? (
                  <span className="text-blue-600 font-bold max-w-[160px] sm:max-w-xs truncate">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {label}
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
