import { z } from "zod";

export const mediaItemSchema = z.object({
  media_asset_id: z.string().uuid("Invalid media asset ID"),
  alt_text: z.string().min(1, "Alt text is required"),
  sort_order: z.number().int().nonnegative().default(0),
  is_primary: z.boolean().default(false),
});

export const garmentDetailsSchema = z.object({
  garment_type: z.string().min(1, "Garment type is required"),
  silhouette: z.string().min(1, "Silhouette is required"),
  length: z.string().min(1, "Length is required"),
  fabric: z.string().min(1, "Fabric is required"),
  secondary_fabric: z.string().optional().default(""),
  lining: z.string().optional().default(""),
  neckline: z.string().min(1, "Neckline is required"),
  back_style: z.string().min(1, "Back style is required"),
  waistline: z.string().min(1, "Waistline is required"),
  sleeve_type: z.string().min(1, "Sleeve type is required"),
  sleeve_length: z.string().min(1, "Sleeve length is required"),
  train: z.string().optional().default(""),
  embellishment: z.string().optional().default(""),
  closure: z.string().min(1, "Closure is required"),
  internal_support: z.string().optional().default(""),
});

export const colorItemSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  sort_order: z.number().int().nonnegative().default(0),
});

export const measurementSchema = z.object({
  bust: z.coerce.number().nonnegative("Bust must be positive"),
  waist: z.coerce.number().nonnegative("Waist must be positive"),
  hips: z.coerce.number().nonnegative("Hips must be positive"),
  hollow_to_hem: z.coerce.number().nonnegative("Hollow to hem must be positive"),
  unit: z.enum(["cm", "inch"]).default("cm"),
});

export const sizeItemSchema = z.object({
  name: z.string().min(1, "Size name is required"),
  sort_order: z.number().int().nonnegative().default(0),
  measurement: measurementSchema,
});

export const measurementGuideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  measurement_unit: z.enum(["cm", "inch"]).default("cm"),
  notes: z.string().optional().default(""),
});

export const customizationOptionSchema = z.object({
  option_type: z.enum(["FABRIC", "COLOR", "SIZING", "DESIGN", "OTHER"]).default("FABRIC"),
  details: z.string().min(1, "Option details are required"),
  sort_order: z.number().int().nonnegative().default(0),
});

export const customizationSchema = z.object({
  is_customizable: z.boolean().default(false),
  notes: z.string().optional().default(""),
  options: z.array(customizationOptionSchema).default([]),
});

export const createProductSchema = z.object({
  collection_id: z.string().uuid("Please select a collection"),
  product_code: z.string().optional(),
  category_id: z.string().uuid("Please select a category"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  media: z.array(mediaItemSchema).min(1, "At least one product image is required"),
  details: garmentDetailsSchema,
  colors: z.array(colorItemSchema).min(1, "At least one color option is required"),
  sizes: z.array(sizeItemSchema).min(1, "At least one size option is required"),
  measurement_guide: measurementGuideSchema,
  customization: customizationSchema,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
