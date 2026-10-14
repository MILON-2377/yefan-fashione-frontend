import { z } from "zod";

export const reviewStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

/**
 * Zod Schema & Type for POST /api/v1/public/reviews payload
 */
export const createReviewSchema = z.object({
  name: z.string().min(2, "validation.name"),
  company_name: z.string().min(2, "validation.companyName"),
  job_title: z.string().min(2, "validation.jobTitle"),
  country: z.string().min(2, "validation.country"),
  rating: z.number().min(1, "validation.rating").max(5),
  message: z.string().min(10, "validation.message"),
  product_id: z.string().uuid().optional().or(z.literal("")),
  avatar_media_id: z.string().uuid().optional().or(z.literal("")),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;

/**
 * Nested response entities
 */
export const reviewProductRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
export type ReviewProductRef = z.infer<typeof reviewProductRefSchema>;

export const reviewAvatarRefSchema = z.object({
  id: z.string(),
  url: z.string(),
});
export type ReviewAvatarRef = z.infer<typeof reviewAvatarRefSchema>;

/**
 * Zod Schema & Type for Review Item Response
 */
export const reviewItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  company_name: z.string(),
  job_title: z.string(),
  country: z.string(),
  rating: z.number(),
  message: z.string(),
  product: reviewProductRefSchema.nullable().optional(),
  avatar: reviewAvatarRefSchema.nullable().optional(),
  status: reviewStatusSchema,
  internal_notes: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ReviewItem = z.infer<typeof reviewItemSchema>;

/**
 * Query params & response interfaces
 */
export interface PublicReviewsParams {
  page?: number;
  page_size?: number;
  limit?: number;
  rating?: number;
}

export interface PublicReviewsResponse {
  items: ReviewItem[];
  total: number;
  page: number;
  total_pages?: number;
}
