"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Sparkles,
  Plus,
  Building2,
  Globe,
  MessageSquare,
  CheckCircle2,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePublicReviews } from "../hooks/usePublicReviews";
import { AppButton } from "@/features/common/ui/AppButton";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function ReviewsCatalogContent() {
  const { dict } = useLanguage();
  const t = dict.reviewsCatalog || {};

  // 1. Create a ref for the top container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = usePublicReviews({
    page,
    limit,
    rating: selectedRating,
  });

  const reviews = data?.items ?? [];
  const totalReviews = data?.total ?? 0;
  const totalPages = data?.total_pages ?? Math.ceil(totalReviews / limit) ?? 1;

  // 2. Updated scroll handler targeting the container ref
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      // Scroll smoothly to the container top with an offset block position
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleRatingFilter = (rating?: number) => {
    setSelectedRating(rating);
    setPage(1);
  };

  return (
    // Attach the ref here at the top boundary of the component
    <div ref={containerRef} className="bg-white text-slate-900 py-10 lg:py-16 scroll-mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.badge || "Client Testimonials"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight">
              {t.heading || "Partner Experience & Feedback"}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.subheading ||
                "Read authentic reviews from global fashion brands, boutiques, and apparel merchandisers partnering with our OEM / ODM atelier."}
            </p>
          </div>

          <Link href="/reviews/new">
            <AppButton
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shrink-0"
            >
              {t.writeReviewBtn || "Write a Review"}
            </AppButton>
          </Link>
        </div>

        {/* Rating Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => handleRatingFilter(undefined)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRating === undefined
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {t.allReviews || "All Reviews"} ({totalReviews})
            </button>

            {[5, 4, 3].map((stars) => (
              <button
                key={stars}
                type="button"
                onClick={() => handleRatingFilter(stars)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedRating === stars
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span>{stars} Stars</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>

          {totalReviews > 0 && (
            <span className="text-xs font-mono font-medium text-slate-500">
              Showing {Math.min((page - 1) * limit + 1, totalReviews)}–
              {Math.min(page * limit, totalReviews)} of {totalReviews}
            </span>
          )}
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-100 rounded-2xl border border-slate-200"
              />
            ))}
          </div>
        ) : isError || reviews.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {t.noReviewsFound || "No Reviews Found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t.noReviewsSub ||
                "Be the first partner to share feedback on working with our apparel atelier."}
            </p>
            <div className="pt-2">
              <Link href="/reviews/new">
                <AppButton
                  variant="secondary"
                  className="text-xs font-semibold"
                >
                  {t.submitFirstReviewBtn || "Submit First Review"}
                </AppButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Rating Stars & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              rev.rating >= star
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-100 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {t.verifiedPartner || "Verified Partner"}
                      </span>
                    </div>

                    {/* Review Message */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      “{rev.message}”
                    </p>
                  </div>

                  {/* Reviewer Meta Block */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    {rev.avatar?.url ? (
                      <Image
                        src={rev.avatar.url}
                        alt={rev.name}
                        unoptimized
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate">
                        <span className="flex items-center gap-1 truncate">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          {rev.company_name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                          {rev.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          page === p
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
