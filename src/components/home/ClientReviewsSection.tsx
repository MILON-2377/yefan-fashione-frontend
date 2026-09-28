"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ShieldCheck,
  Quote,
  Building2,
  Globe,
  Sparkles,
} from "lucide-react";
import { ClientReview } from "@/types";

const FALLBACK_REVIEWS: ClientReview[] = [
  {
    id: "rev-1",
    clientName: "Claire Dubois",
    roleTitle: "Lead Buyer",
    companyName: "Maison de Couture",
    country: "France",
    rating: 5,
    reviewText:
      "Yifan Apparel has been our primary OEM partner for 3 seasons. The lace handiwork and stitching meet European luxury standards seamlessly.",
    orderType: "Custom Bridal Wear (500 Pcs)",
    date: "August 2026",
    verifiedOrder: true,
  },
  {
    id: "rev-2",
    clientName: "Marcus Vance",
    roleTitle: "Product Manager",
    companyName: "Vance & Co. Wholesale",
    country: "United States",
    rating: 5,
    reviewText:
      "Strict compliance with our tech packs and seamless customs documentation. Their QC report before air shipping gives total peace of mind.",
    orderType: "Evening Gown Batch Order",
    date: "July 2026",
    verifiedOrder: true,
  },
  {
    id: "rev-3",
    clientName: "Elena Rostova",
    roleTitle: "Boutique Owner",
    companyName: "Atelier Elegance",
    country: "Italy",
    rating: 5,
    reviewText:
      "Communication over WhatsApp and email is fast. Pattern adjustments were done within 48 hours. Exceptional fabric quality.",
    orderType: "OEM French Lace Line",
    date: "June 2026",
    verifiedOrder: true,
  },
  {
    id: "rev-4",
    clientName: "Sarah Jenkins",
    roleTitle: "Sourcing Director",
    companyName: "Nordic Atelier",
    country: "Sweden",
    rating: 5,
    reviewText:
      "Consistent sizing, immaculate seam finishing, and reliable delivery schedules. The best apparel manufacturer we have worked with.",
    orderType: "Autumn Ready-to-Wear",
    date: "May 2026",
    verifiedOrder: true,
  },
];

export function ClientReviewsSection() {
  const [reviews, setReviews] = useState<ClientReview[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/reviews`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          },
        );

        if (response.ok) {
          const data: ClientReview[] = await response.json();
          if (isMounted && data.length > 0) {
            setReviews(data);
          }
        }
      } catch {
        // Fallback gracefully to mock data on error
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Duplicate review list to achieve an infinite seamless marquee loop
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section className="w-full bg-white text-slate-800 py-16 sm:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Buyer Trust</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Global Client Reviews
            </h2>

            <p className="text-sm text-slate-500 leading-relaxed">
              Read how international boutique owners, importers, and fashion
              houses evaluate our OEM/ODM apparel production.
            </p>
          </div>

          {/* Score Badge */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-4 shrink-0">
            <div className="text-center pr-4 border-r border-slate-200">
              <span className="text-3xl font-black text-slate-900 leading-none block">
                4.9
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                Out of 5.0
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600 block">
                99% Satisfied Export Partners
              </span>
            </div>
          </div>
        </div>

        {/* --- Proportionally Constrained Reviews Marquee Container --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 h-56 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-2xl">
            {/* Fade Overlays on Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Marquee Track with Responsive Width Allocation */}
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2">
              {marqueeItems.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="
                    /* Width Calculations based on max-w-7xl proportions */
                    w-[calc(100vw-2rem)] 
                    sm:w-[calc((1000px-1.5rem)/2)] 
                    lg:w-[calc((1216px-3rem)/3)] 
                    bg-white border border-slate-200/90 rounded-2xl p-6 
                    shadow-xs hover:shadow-md hover:border-blue-300 
                    transition-all flex flex-col justify-between shrink-0 relative space-y-4
                  "
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 -z-0" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      {review.verifiedOrder && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified Order
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic line-clamp-4">
                      {review.reviewText}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {review.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400 inline" />
                          {review.roleTitle}{" "}
                          {review.companyName ? `• ${review.companyName}` : ""}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                        <Globe className="w-3 h-3 text-slate-400" />
                        {review.country}
                      </span>
                    </div>

                    {review.orderType && (
                      <div className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        Order:{" "}
                        <span className="text-slate-600">
                          {review.orderType}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
