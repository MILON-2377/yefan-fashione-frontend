import { UploadedMediaResult } from "@/features/media/types/mediaTypes";

export type RecordStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

// ==========================================
// Media & Asset Models
// ==========================================
export interface CatalogMediaAsset {
  id: string;
  url: string;
  public_id?: string;
  original_filename?: string;
  mime_type?: string;
  file_size?: number;
}

// ==========================================
// Catalog Entity Definition
// ==========================================
export interface AdminCatalogItem {
  id: string;
  title: string;
  status: RecordStatus;
  description?: string | null;
  collection_id?: string | null;

  // Asset Reference IDs
  pdf_media_asset_id: string;
  cover_media_asset_id?: string | null;

  // Computed / Direct URLs
  catalog_url?: string | null;
  pdf_url?: string | null;
  cover_url?: string | null;
  cover_image_url?: string | null;

  // Populated Relations
  pdf_media_asset?: CatalogMediaAsset;
  cover_media_asset?: CatalogMediaAsset;

  // Metadata
  created_at: string;
  updated_at: string;
}

// ==========================================
// Query & API Parameters
// ==========================================
export interface GetCatalogsParams {
  page?: number;
  page_size?: number;
  collection_id?: string;
  search?: string;
  status?: RecordStatus | "ALL";
}

export interface CatalogListResponse {
  items: AdminCatalogItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// ==========================================
// Payload Models (Create & Update)
// ==========================================
export interface CreateCatalogRequest {
  title: string;
  pdf_media_asset_id: string;
  status?: RecordStatus;
  description?: string | null;
  collection_id?: string | null;
  cover_media_asset_id?: string | null;
}

export interface UpdateCatalogRequest {
  title?: string;
  status?: RecordStatus;
  pdf_media_asset_id?: string | null;
  description?: string | null;
  collection_id?: string | null;
  cover_media_asset_id?: string | null;
}

// ==========================================
// Form State & Helpers
// ==========================================
export interface CatalogFormValues {
  title: string;
  status: RecordStatus;
  pdf_media_asset_id: string;
  description?: string;
  collection_id?: string | null;
  cover_media_asset_id?: string | null;

  uploadedPdf?: UploadedMediaResult | null;
  uploadedCover?: UploadedMediaResult | null;
}



export interface DeleteCatalogResponse {
  success: boolean;
  message: string;
}