import { z } from "zod";

export const createAdminSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid corporate email address (e.g. admin@company.com)."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password cannot exceed 128 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
