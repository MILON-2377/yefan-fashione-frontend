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
    undefined,
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
    <div
      ref={containerRef}
      className="scroll-mt-6 bg-[#FAF8F4] py-12 text-[#211F1C] sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:space-y-14 sm:px-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#D8C9B8] pb-8 md:flex-row md:items-end lg:pb-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974] sm:text-[10px]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.badge || "Client Testimonials"}</span>
            </div>

            <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
              {t.heading || "Partner Experience & Feedback"}
            </h1>

            <p className="max-w-xl text-xs leading-7 text-[#625D57] sm:text-sm sm:leading-8">
              {t.subheading ||
                "Read feedback from fashion brands, boutiques, and apparel partners working with our OEM / ODM atelier."}
            </p>
          </div>

          <Link href="/reviews/new" className="shrink-0">
            <AppButton
              variant="primary"
              leftIcon={<Plus className="h-4 w-4" />}
              className="rounded-none border border-[#211F1C] bg-[#211F1C] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white shadow-none transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B]"
            >
              {t.writeReviewBtn || "Write a Review"}
            </AppButton>
          </Link>
        </div>

        {/* Rating Filter Bar */}
        <div className="flex flex-col gap-4 border-y border-[#E7E1D9] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => handleRatingFilter(undefined)}
              className={`shrink-0 border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
                selectedRating === undefined
                  ? "border-[#211F1C] bg-[#211F1C] text-white"
                  : "border-[#E7E1D9] bg-white text-[#625D57] hover:border-[#D8C9B8] hover:bg-[#F0ECE6]"
              }`}
            >
              {t.allReviews || "All Reviews"} ({totalReviews})
            </button>

            {[5, 4, 3].map((stars) => (
              <button
                key={stars}
                type="button"
                onClick={() => handleRatingFilter(stars)}
                className={`flex shrink-0 items-center gap-2 border px-3.5 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors ${
                  selectedRating === stars
                    ? "border-[#211F1C] bg-[#211F1C] text-white"
                    : "border-[#E7E1D9] bg-white text-[#625D57] hover:border-[#D8C9B8] hover:bg-[#F0ECE6]"
                }`}
              >
                <span>{stars} Stars</span>
                <Star className="h-3 w-3 fill-[#B49A6C] text-[#B49A6C]" />
              </button>
            ))}
          </div>

          {totalReviews > 0 && (
            <span className="shrink-0 text-[10px] tracking-wide text-[#817970]">
              Showing {Math.min((page - 1) * limit + 1, totalReviews)}–
              {Math.min(page * limit, totalReviews)} of {totalReviews}
            </span>
          )}
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse border border-[#E7E1D9] bg-white"
              />
            ))}
          </div>
        ) : isError || reviews.length === 0 ? (
          <div className="flex flex-col items-center border border-[#E7E1D9] bg-white px-6 py-16 text-center sm:py-20">
            <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#9D8974]">
              <MessageSquare className="h-6 w-6" />
            </div>

            <h3 className="font-serif text-xl font-normal text-[#211F1C] sm:text-2xl">
              {t.noReviewsFound || "No Reviews Found"}
            </h3>

            <p className="mt-3 max-w-sm text-xs leading-6 text-[#625D57] sm:text-sm">
              {t.noReviewsSub ||
                "Be the first partner to share feedback on working with our apparel atelier."}
            </p>

            <div className="mt-6">
              <Link href="/reviews/new">
                <AppButton
                  variant="secondary"
                  className="rounded-none border border-[#D8C9B8] bg-[#FAF8F4] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#51463B] shadow-none hover:bg-[#F0ECE6]"
                >
                  {t.submitFirstReviewBtn || "Submit First Review"}
                </AppButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {reviews.map((rev, index) => (
                <article
                  key={rev.id}
                  className="group flex flex-col justify-between border border-[#E7E1D9] bg-white p-5 transition-all duration-300 hover:border-[#D8C9B8] hover:shadow-[0_14px_35px_rgba(33,31,28,0.05)] sm:p-6"
                >
                  <div className="space-y-5">
                    {/* Rating & Verification */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${rev.rating} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              rev.rating >= star
                                ? "fill-[#B49A6C] text-[#B49A6C]"
                                : "fill-[#F0ECE6] text-[#D8C9B8]"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 border border-[#E7E1D9] bg-[#FAF8F4] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#625D57]">
                        <CheckCircle2 className="h-3 w-3 text-[#9D8974]" />
                        {t.verifiedPartner || "Verified Partner"}
                      </span>
                    </div>

                    {/* Review Message */}
                    <div className="space-y-3">
                      <span className="block font-serif text-4xl leading-none text-[#D8C9B8]">
                        “
                      </span>

                      <p className="text-sm leading-7 text-[#51463B]">
                        {rev.message}
                      </p>
                    </div>
                  </div>

                  {/* Reviewer Information */}
                  <div className="mt-7 flex items-center gap-3 border-t border-[#F0ECE6] pt-5">
                    {rev.avatar?.url ? (
                      <Image
                        src={rev.avatar.url}
                        alt={rev.name}
                        unoptimized
                        width={44}
                        height={44}
                        className="h-11 w-11 shrink-0 rounded-full border border-[#E7E1D9] object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E7E1D9] bg-[#F0ECE6] text-[#9D8974]">
                        <User className="h-5 w-5" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="truncate text-xs font-semibold tracking-wide text-[#211F1C]">
                        {rev.name}
                      </h4>

                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#817970]">
                        <span className="flex min-w-0 items-center gap-1.5">
                          <Building2 className="h-3 w-3 shrink-0 text-[#9D8974]" />
                          <span className="truncate">{rev.company_name}</span>
                        </span>

                        <span className="text-[#D8C9B8]">/</span>

                        <span className="flex shrink-0 items-center gap-1.5">
                          <Globe className="h-3 w-3 text-[#9D8974]" />
                          {rev.country}
                        </span>
                      </div>
                    </div>

                    <span className="self-start pt-1 text-[9px] tracking-[0.12em] text-[#B7A797]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#D8C9B8] pt-7">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center border border-[#E7E1D9] bg-white text-[#625D57] transition-colors hover:border-[#D8C9B8] hover:bg-[#F0ECE6] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(p)}
                        aria-current={page === p ? "page" : undefined}
                        className={`flex h-10 w-10 items-center justify-center text-xs transition-colors ${
                          page === p
                            ? "bg-[#211F1C] font-medium text-white"
                            : "border border-[#E7E1D9] bg-white text-[#625D57] hover:border-[#D8C9B8] hover:bg-[#F0ECE6]"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="flex h-10 w-10 items-center justify-center border border-[#E7E1D9] bg-white text-[#625D57] transition-colors hover:border-[#D8C9B8] hover:bg-[#F0ECE6] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
