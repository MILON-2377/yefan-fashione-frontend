// src/features/admin/brands/schemas/brandSchema.ts
import { z } from 'zod';

export const RecordStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export type RecordStatus = z.infer<typeof RecordStatusEnum>;

export const brandSchema = z.object({
    name: z.string().min(2, 'Brand name must be at least 2 characters'),

    description: z.string().optional().nullable(),
    logo_media_url: z
        .string()
        .url('Must be a valid URL')
        .or(z.literal(''))
        .optional()
        .nullable(),
    status: RecordStatusEnum,
});

// Output type (after defaults are applied)
export type BrandFormValues = z.infer<typeof brandSchema>;

// Input type (before defaults are applied)
export type BrandFormInput = z.input<typeof brandSchema>;
