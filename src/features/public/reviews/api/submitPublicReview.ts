import { publicFetch } from "@/api";
import { CreateReviewPayload, ReviewItem } from "../types/reviewTypes";

/**
 * POST /api/v1/public/reviews
 * Submits a new customer review/testimonial for company and product feedback.
 */
export async function submitPublicReview(
  payload: CreateReviewPayload
): Promise<ReviewItem> {
  return publicFetch<ReviewItem>("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
