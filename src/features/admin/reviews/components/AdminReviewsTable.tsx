"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  User,
  MessageSquare,
  Search,
  Loader2,
} from "lucide-react";
import {
  useAdminReviews,
  useUpdateReviewStatus,
  useDeleteReview,
} from "../hooks/useAdminReviews";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";
import {
  ReviewStatus,
} from "@/features/public/reviews/types/reviewTypes";

export function AdminReviewsTable() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(
    undefined,
  );
  const [search, setSearch] = useState("");

  // State for delete modal target
  const [reviewToDelete, setReviewToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isLoading } = useAdminReviews({
    page,
    page_size: 10,
    status: statusFilter || undefined,
    rating: ratingFilter,
    search: search || undefined,
  });

  const updateStatusMutation = useUpdateReviewStatus();
  const deleteMutation = useDeleteReview();

  const handleStatusUpdate = (reviewId: string, status: ReviewStatus) => {
    updateStatusMutation.mutate({
      reviewId,
      payload: { status },
    });
  };

  const handleConfirmDelete = () => {
    if (!reviewToDelete) return;

    deleteMutation.mutate(reviewToDelete.id, {
      onSuccess: () => {
        setReviewToDelete(null);
      },
    });
  };

  const reviews = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, company, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>

        {/* Filter Drops */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending Approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Rating Select */}
          <select
            value={ratingFilter ?? ""}
            onChange={(e) => {
              setRatingFilter(
                e.target.value ? Number(e.target.value) : undefined,
              );
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                <th className="py-3.5 px-5">Client / Brand</th>
                <th className="py-3.5 px-5">Rating</th>
                <th className="py-3.5 px-5">Testimonial</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5">
                      <div className="h-10 bg-slate-100 rounded-lg w-36" />
                    </td>
                    <td className="p-5">
                      <div className="h-4 bg-slate-100 rounded w-20" />
                    </td>
                    <td className="p-5">
                      <div className="h-12 bg-slate-100 rounded w-full" />
                    </td>
                    <td className="p-5">
                      <div className="h-6 bg-slate-100 rounded-full w-20" />
                    </td>
                    <td className="p-5">
                      <div className="h-8 bg-slate-100 rounded-lg w-16 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">
                      No client reviews found
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Try adjusting your filters or search query.
                    </p>
                  </td>
                </tr>
              ) : (
                reviews.map((item) => {
                  const isUpdatingThis =
                    updateStatusMutation.isPending &&
                    updateStatusMutation.variables?.reviewId === item.id;
                  const isDeletingThis =
                    deleteMutation.isPending &&
                    deleteMutation.variables === item.id;
                  const isRowDisabled = isUpdatingThis || isDeletingThis;

                  const targetStatus =
                    updateStatusMutation.variables?.payload.status;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isRowDisabled
                          ? "bg-slate-50/80 opacity-70"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      {/* Client / Author Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {item.avatar?.url ? (
                            <Image
                              src={item.avatar.url}
                              alt={item.name}
                              unoptimized
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shrink-0 font-bold">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                              <span className="truncate">
                                {item.company_name}
                              </span>
                              <span>•</span>
                              <span className="shrink-0">{item.country}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Star Rating */}
                      <td className="py-4 px-5 shrink-0">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                item.rating >= star
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Review Message & Product Reference */}
                      <td className="py-4 px-5 max-w-sm">
                        <p className="text-slate-700 line-clamp-2 leading-relaxed">
                          “{item.message}”
                        </p>
                        {item.product && (
                          <span className="inline-block mt-1 text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            Product: {item.product.name}
                          </span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-5">
                        {item.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Approved
                          </span>
                        )}
                        {item.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Pending
                          </span>
                        )}
                        {item.status === "REJECTED" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Action Controls */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Action */}
                          {item.status !== "APPROVED" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(item.id, "APPROVED")
                              }
                              disabled={isRowDisabled}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center min-w-7 min-h-7"
                              title="Approve Review"
                            >
                              {isUpdatingThis && targetStatus === "APPROVED" ? (
                                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Reject Action */}
                          {item.status !== "REJECTED" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusUpdate(item.id, "REJECTED")
                              }
                              disabled={isRowDisabled}
                              className="p-1.5 text-amber-600 hover:bg-amber-50 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center min-w-7 min-h-7"
                              title="Reject Review"
                            >
                              {isUpdatingThis && targetStatus === "REJECTED" ? (
                                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Delete Trigger */}
                          <button
                            type="button"
                            onClick={() =>
                              setReviewToDelete({
                                id: item.id,
                                name: `review by ${item.name} (${item.company_name})`,
                              })
                            }
                            disabled={isRowDisabled}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center min-w-7 min-h-7"
                            title="Delete Review"
                          >
                            {isDeletingThis ? (
                              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs font-medium text-slate-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(reviewToDelete)}
        isPending={deleteMutation.isPending}
        entityName={reviewToDelete?.name}
        title="Delete Review Testimonial"
        onClose={() => setReviewToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
