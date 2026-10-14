export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

/**
 * Payload sent to POST /api/v1/public/reviews
 */
export interface CreateReviewPayload {
  name: string;
  company_name: string;
  job_title: string;
  country: string;
  rating: number;
  message: string;
  product_id?: string;
  avatar_media_id?: string;
}

/**
 * Product detail entity attached to a review item
 */
export interface ReviewProductRef {
  id: string;
  name: string;
  slug: string;
}

/**
 * Avatar asset entity attached to a review item
 */
export interface ReviewAvatarRef {
  id: string;
  url: string;
}

/**
 * Public Review item returned from the API
 */
export interface ReviewItem {
  id: string;
  name: string;
  company_name: string;
  job_title: string;
  country: string;
  rating: number;
  message: string;
  product?: ReviewProductRef;
  avatar?: ReviewAvatarRef;
  status: ReviewStatus;
  internal_notes?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Query parameters for fetching public reviews list
 */
export interface PublicReviewsParams {
  page?: number;
  page_size?: number;
  limit?: number;
  rating?: number;
}

/**
 * Paginated API response for public reviews
 */
export interface PublicReviewsResponse {
  items: ReviewItem[];
  total: number;
  page: number;
  total_pages?: number;
}
