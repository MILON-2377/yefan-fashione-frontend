import { z } from "zod";

export const createAboutVideoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters"),
  description: z.string().optional(),
  media_asset_id: z.string().uuid("Please upload a video file"),
  sort_order: z.coerce.number().min(0, "Sort order must be 0 or greater"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export type CreateAboutVideoFormValues = z.infer<typeof createAboutVideoSchema>;
