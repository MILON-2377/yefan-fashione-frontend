export interface ProductMediaAsset {
    id: string;
    media_asset_id: string;
    alt_text?: string | null;
    url: string;
    mime_type?: string | null;
    width?: number | null;
    height?: number | null;
    sort_order: number;
    is_primary: boolean;
}

export interface ProductGarmentDetails {
    id: string;
    product_id: string;
    garment_type?: string | null;
    silhouette?: string | null;
    length?: string | null;
    fabric?: string | null;
    secondary_fabric?: string | null;
    lining?: string | null;
    neckline?: string | null;
    back_style?: string | null;
    waistline?: string | null;
    sleeve_type?: string | null;
    sleeve_length?: string | null;
    train?: string | null;
    embellishment?: string | null;
    closure?: string | null;
    internal_support?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductColorItem {
    id: string;
    product_id: string;
    name: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ProductSizeItem {
    id: string;
    product_id: string;
    name: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface ProductMeasurementGuide {
    id: string;
    product_id: string;
    title?: string | null;
    description?: string | null;
    measurement_unit?: string | null;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductCustomizationOptions {
    id: string;
    product_id: string;
    is_customizable: boolean;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductDetailResponse {
    id: string;
    brand_id?: string | null;
    collection_id?: string | null;
    category_id?: string | null;
    product_code: string;
    name: string;
    slug: string;
    description?: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | string;
    published_at?: string | null;
    created_at: string;
    updated_at: string;
    media: ProductMediaAsset[];
    details?: ProductGarmentDetails | null;
    colors: ProductColorItem[];
    sizes: ProductSizeItem[];
    measurement_guide?: ProductMeasurementGuide | null;
    customization?: ProductCustomizationOptions | null;
}
