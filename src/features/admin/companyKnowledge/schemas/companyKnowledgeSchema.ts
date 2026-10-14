import { z } from "zod";

export const companyKnowledgeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(150, "Title cannot exceed 150 characters"),
  category: z.string().min(1, "Please select a category"),
  content: z
    .string()
    .min(10, "Content body must be at least 10 characters long"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]), // Removed .default("DRAFT")
});

export type CompanyKnowledgeFormValues = z.infer<typeof companyKnowledgeSchema>;
