import { z } from "zod";

export const updateProductMediaSchema = z.object({
    id: z.string().uuid().optional(),
    media_asset_id: z.string().uuid("Invalid Media Asset ID"),
    alt_text: z.string().default(""),
    sort_order: z.number().int().default(0),
    is_primary: z.boolean().default(false),
});

export const updateProductDetailsSchema = z.object({
    garment_type: z.string().default(""),
    silhouette: z.string().default(""),
    length: z.string().default(""),
    fabric: z.string().default(""),
    secondary_fabric: z.string().default(""),
    lining: z.string().default(""),
    neckline: z.string().default(""),
    back_style: z.string().default(""),
    waistline: z.string().default(""),
    sleeve_type: z.string().default(""),
    sleeve_length: z.string().default(""),
    train: z.string().default(""),
    embellishment: z.string().default(""),
    closure: z.string().default(""),
    internal_support: z.string().default(""),
});

export const updateProductColorSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Color name is required"),
    sort_order: z.number().int().default(0),
});

export const updateProductSizeSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Size name is required"),
    sort_order: z.number().int().default(0),
});

export const updateMeasurementGuideSchema = z.object({
    title: z.string().default(""),
    description: z.string().default(""),
    measurement_unit: z.string().default("cm"),
    notes: z.string().default(""),
});

export const updateCustomizationSchema = z.object({
    is_customizable: z.boolean().default(false),
    notes: z.string().default(""),
});

export const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().default(""),
    brand_id: z.string().uuid("Please select a brand"),
    collection_id: z.string().uuid("Please select a collection"),
    category_id: z.string().uuid("Please select a category"),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
    media: z.array(updateProductMediaSchema).default([]),
    details: updateProductDetailsSchema,
    colors: z.array(updateProductColorSchema).default([]),
    sizes: z.array(updateProductSizeSchema).default([]),
    measurement_guide: updateMeasurementGuideSchema,
    customization: updateCustomizationSchema,
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// Response Entity Interface
export interface ProductDetailResponse {
    id: string;
    brand_id: string;
    collection_id: string;
    category_id: string;
    product_code: string;
    name: string;
    slug: string;
    description: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    published_at?: string | null;
    created_at: string;
    updated_at: string;
    media: {
        id: string;
        product_id: string;
        media_asset_id: string;
        alt_text: string;
        sort_order: number;
        is_primary: boolean;
        created_at: string;
        updated_at: string;
    }[];
    details: {
        id: string;
        product_id: string;
        garment_type: string;
        silhouette: string;
        length: string;
        fabric: string;
        secondary_fabric: string;
        lining: string;
        neckline: string;
        back_style: string;
        waistline: string;
        sleeve_type: string;
        sleeve_length: string;
        train: string;
        embellishment: string;
        closure: string;
        internal_support: string;
        created_at: string;
        updated_at: string;
    };
    colors: {
        id: string;
        product_id: string;
        name: string;
        sort_order: number;
        created_at: string;
        updated_at: string;
    }[];
    sizes: {
        id: string;
        product_id: string;
        name: string;
        sort_order: number;
        created_at: string;
        updated_at: string;
    }[];
    measurement_guide: {
        id: string;
        product_id: string;
        title: string;
        description: string;
        measurement_unit: string;
        notes: string;
        created_at: string;
        updated_at: string;
    };
    customization: {
        id: string;
        product_id: string;
        is_customizable: boolean;
        notes: string;
        created_at: string;
        updated_at: string;
    };
}
