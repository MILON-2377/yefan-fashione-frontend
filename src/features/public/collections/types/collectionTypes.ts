export interface PublicCollectionItem {
  id: string;
  brand_id?: string;
  name: string;
  slug: string;
  description?: string;
  cover_media_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicCollectionsResponse {
  items: PublicCollectionItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface GetPublicCollectionsParams {
  brand_id?: string;
  page?: number;
  page_size?: number;
}
