import { publicFetch } from "@/api";
import {

  PublicReviewsParams,
  PublicReviewsResponse,

} from "../types/reviewTypes";

/**
 * GET /public/reviews
 * Fetches approved client testimonials and reviews with optional filtering and pagination.
 */
export async function getPublicReviews(
  params?: PublicReviewsParams
): Promise<PublicReviewsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.page_size) searchParams.set("page_size", params.page_size.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.rating) searchParams.set("rating", params.rating.toString());

  const query = searchParams.toString();
  const endpoint = query ? `/reviews?${query}` : "/reviews";

  return publicFetch<PublicReviewsResponse>(endpoint, {
    method: "GET",
  });
}
