import Link from "next/link";
import { Star } from "lucide-react";
import { PendingReviewItem } from "../types/dashboardTypes";

interface PendingReviewsCardProps {
  reviews: PendingReviewItem[];
}

export function PendingReviewsCard({ reviews }: PendingReviewsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 font-serif">
            Pending Reviews
          </h2>
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full font-mono">
            {reviews.length} Pending
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-2 mb-4">
          Client testimonials awaiting moderation before publication.
        </p>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">
              No pending reviews
            </p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">
                    {rev.company_name}
                  </h3>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          rev.rating >= s
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600">{rev.name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <Link
        href="/admin/reviews"
        className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg text-center transition-colors block"
      >
        Manage All Reviews
      </Link>
    </div>
  );
}
