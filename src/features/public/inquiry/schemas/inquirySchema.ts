import { z } from "zod";

export const inquiryFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required." })
    .max(255, { message: "Name must be under 255 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid work email address." }),
  phone: z.string().max(50).optional(),
  country: z.string().max(100).optional(),
  companyName: z.string().max(255).optional(),
  jobTitle: z.string().max(255).optional(),
  inquiryType: z.enum([
    "GENERAL",
    "PRODUCT",
    "CUSTOMIZATION",
    "OEM",
    "ODM",
    "PRIVATE_LABEL",
    "WHOLESALE",
  ]),
  quantityRange: z.enum([
    "SAMPLE",
    "SMALL_BATCH",
    "WHOLESALE",
    "LARGE_VOLUME",
    "NOT_SURE",
  ]),
  message: z
    .string()
    .min(1, { message: "Project details or message is required." }),
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;
