export interface PublicBrandItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface PublicBrandsResponse {
  items: PublicBrandItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface GetPublicBrandsParams {
  page?: number;
  page_size?: number;
}
