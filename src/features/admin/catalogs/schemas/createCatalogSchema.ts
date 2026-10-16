import { z } from "zod";

export const recordStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createCatalogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Catalog title is required." })
    .max(255, { message: "Title must be under 255 characters." }),
  status: recordStatusEnum.default("DRAFT"),
  description: z.string().nullable().optional(),
  collection_id: z
    .string()
    .uuid({ message: "Please select a valid collection." })
    .nullable()
    .optional(),
  pdf_media_asset_id: z
    .string()
    .uuid({ message: "A valid PDF document upload is required." }),
  cover_media_asset_id: z
    .string()
    .uuid({ message: "A valid cover image upload is required." })
    .nullable()
    .optional(),
});

export const updateCatalogSchema = createCatalogSchema.partial().extend({
  title: z
    .string()
    .min(1, { message: "Catalog title is required." })
    .max(255, { message: "Title must be under 255 characters." })
    .optional(),
  pdf_media_asset_id: z
    .string()
    .uuid({ message: "A valid PDF document upload is required." })
    .optional(),
});

export type CreateCatalogFormValues = z.infer<typeof createCatalogSchema>;
export type UpdateCatalogFormValues = z.infer<typeof updateCatalogSchema>;