import { z } from "zod";

export const collectionSchema = z.object({
    brand_id: z.string().uuid("Please select a valid brand"),
    name: z
        .string()
        .min(1, "Collection name is required")
        .max(255, "Collection name cannot exceed 255 characters"),
    description: z.string().optional(),
    cover_media_url: z
        .string()
        .url("Must be a valid URL")
        .or(z.literal(""))
        .optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;
