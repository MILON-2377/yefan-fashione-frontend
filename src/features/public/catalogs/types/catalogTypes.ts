export interface PublicCatalogItem {
  id: string;
  collection_id?: string | null;
  title: string;
  description?: string | null;
  catalog_url?: string | null;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetPublicCatalogsParams {
  page?: number;
  page_size?: number;
  collection_id?: string;
  search?: string;
}

export interface PublicCatalogListResponse {
  items: PublicCatalogItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
