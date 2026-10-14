export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// --- Media Sub-entity ---
export interface ProductMediaPayloadItem {
  id?: string;
  media_asset_id: string;
  alt_text?: string;
  sort_order?: number;
  is_primary?: boolean;
}

export interface ProductMediaItem extends ProductMediaPayloadItem {
  id: string;
  product_id: string;
  url?: string;
  mime_type?: string;
  width?: number;
  height?: number;
  created_at?: string;
  updated_at?: string;
}

// --- Garment Details Sub-entity ---
export interface ProductDetailsPayload {
  garment_type?: string;
  silhouette?: string;
  length?: string;
  fabric?: string;
  secondary_fabric?: string;
  lining?: string;
  neckline?: string;
  back_style?: string;
  waistline?: string;
  sleeve_type?: string;
  sleeve_length?: string;
  train?: string;
  embellishment?: string;
  closure?: string;
  internal_support?: string;
}

export interface ProductDetails extends ProductDetailsPayload {
  id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

// --- Color & Size Sub-entities ---
export interface ProductAttributePayload {
  id?: string;
  name: string;
  sort_order?: number;
}

export interface ProductColor extends ProductAttributePayload {
  id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSize extends ProductAttributePayload {
  id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

// --- Measurement Guide Sub-entity ---
export interface MeasurementGuidePayload {
  title?: string;
  description?: string;
  measurement_unit?: string;
  notes?: string;
}

export interface MeasurementGuide extends MeasurementGuidePayload {
  id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

// --- Customization Sub-entity ---
export interface CustomizationDetailsPayload {
  is_customizable?: boolean;
  notes?: string;
}

export interface CustomizationDetails extends CustomizationDetailsPayload {
  id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

// --- Full Product Entity (Response Schema) ---
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
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  media: ProductMediaItem[];
  details: ProductDetails;
  colors: ProductColor[];
  sizes: ProductSize[];
  measurement_guide: MeasurementGuide;
  customization: CustomizationDetails;
}

// --- Product Mutation Payload (Request Schema) ---
export interface CreateProductPayload {
  name: string;
  description?: string;
  brand_id: string;
  collection_id: string;
  category_id: string;
  status?: ProductStatus;
  media?: ProductMediaPayloadItem[];
  details?: ProductDetailsPayload;
  colors?: ProductAttributePayload[];
  sizes?: ProductAttributePayload[];
  measurement_guide?: MeasurementGuidePayload;
  customization?: CustomizationDetailsPayload;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface ProductApiResponse<T> {
  data: T;
  message?: string;
}
