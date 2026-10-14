export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type CustomizationOptionType = "FABRIC" | "COLOR" | "SIZING" | "DESIGN" | "OTHER";
export type MeasurementUnit = "cm" | "inch";

// 1. Media Asset
export interface ProductMediaItem {
  id: string;
  product_id: string;
  media_asset_id: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

// 2. Garment Details
export interface GarmentDetails {
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
}

// 3. Product Color
export interface ProductColor {
  id: string;
  product_id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 4. Measurements
export interface ProductMeasurement {
  bust: number;
  waist: number;
  hips: number;
  hollow_to_hem: number;
  unit: MeasurementUnit;
}

// 5. Product Size
export interface ProductSize {
  id: string;
  product_id: string;
  name: string;
  sort_order: number;
  measurement?: ProductMeasurement;
  created_at: string;
  updated_at: string;
}

// 6. Measurement Guide
export interface MeasurementGuide {
  id: string;
  product_id: string;
  title: string;
  description: string;
  measurement_unit: MeasurementUnit | string;
  notes: string;
  created_at: string;
  updated_at: string;
}

// 7. Customization Option & Settings
export interface CustomizationOption {
  id?: string;
  option_type: CustomizationOptionType;
  details: string;
  sort_order: number;
}

export interface ProductCustomization {
  id: string;
  product_id: string;
  is_customizable: boolean;
  notes: string;
  options?: CustomizationOption[];
  created_at: string;
  updated_at: string;
}

// Main Product Entity Response
export interface Product {
  id: string;
  brand_id: string;
  collection_id: string;
  category_id: string;
  product_code: string;
  name: string;
  slug: string;
  description: string;
  status: ProductStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  media: ProductMediaItem[];
  details: GarmentDetails;
  colors: ProductColor[];
  sizes: ProductSize[];
  measurement_guide: MeasurementGuide;
  customization: ProductCustomization;
}



// API Response wrapper for product endpoints
export type ProductResponse = Product;

// Paginated Product List Response
export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Filtering and Pagination Parameters for GET /admin/products
export interface ListProductsParams {
  page?: number;
  limit?: number;
  brand_id?: string;
  collection_id?: string;
  category_id?: string;
  status?: string;
  search?: string;
  sort_by?: "created_at" | "name" | "product_code";
  sort_order?: "asc" | "desc";
}
