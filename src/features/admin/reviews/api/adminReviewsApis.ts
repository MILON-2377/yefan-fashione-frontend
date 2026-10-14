import { adminFetch } from "@/api";
import { ReviewItem } from "@/features/public/reviews/types/reviewTypes";

export interface AdminReviewsParams {
  page?: number;
  page_size?: number;
  status?: string;
  rating?: number;
  search?: string;
}

export interface AdminReviewsResponse {
  items: ReviewItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface UpdateReviewStatusPayload {
  status: "APPROVED" | "REJECTED" | "PENDING";
  internal_notes?: string;
}

export async function getAdminReviews(
  params?: AdminReviewsParams
): Promise<AdminReviewsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.page_size) searchParams.set("page_size", params.page_size.toString());
  if (params?.status) searchParams.set("status", params.status);
  if (params?.rating) searchParams.set("rating", params.rating.toString());
  if (params?.search) searchParams.set("search", params.search);

  const query = searchParams.toString();
  const endpoint = query ? `/reviews?${query}` : "/reviews";

  return adminFetch<AdminReviewsResponse>(endpoint, {
    method: "GET",
  });
}

export async function updateReviewStatus(
  reviewId: string,
  payload: UpdateReviewStatusPayload
): Promise<ReviewItem> {
  return adminFetch<ReviewItem>(`/reviews/${reviewId}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteReview(reviewId: string): Promise<void> {
  return adminFetch<void>(`/reviews/${reviewId}`, {
    method: "DELETE",
  });
}
