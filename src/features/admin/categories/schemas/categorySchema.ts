import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required").max(255),
    description: z.string().optional(),
    image_media_id: z.string().optional(),
    image_media_url: z.string().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type CategoryFormInput = z.input<typeof categorySchema>;
export type CategoryFormValues = z.output<typeof categorySchema>;
