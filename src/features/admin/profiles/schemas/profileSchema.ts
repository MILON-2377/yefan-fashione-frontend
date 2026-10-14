import { z } from "zod";

export const profileFormSchema = z.object({
    first_name: z
        .string()
        .max(100, "First name must be under 100 characters")
        .nullable()
        .optional(),
    last_name: z
        .string()
        .max(100, "Last name must be under 100 characters")
        .nullable()
        .optional(),
    display_name: z
        .string()
        .max(255, "Display name must be under 255 characters")
        .nullable()
        .optional(),
    phone: z
        .string()
        .max(30, "Phone number must be under 30 characters")
        .nullable()
        .optional(),
    job_title: z
        .string()
        .max(150, "Job title must be under 150 characters")
        .nullable()
        .optional(),
    bio: z.string().nullable().optional(),
    avatar_media_id: z.string().uuid("Invalid Media ID").nullable().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
