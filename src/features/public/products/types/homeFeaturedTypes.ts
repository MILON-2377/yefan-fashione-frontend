export interface HomeFeaturedProductImage {
  id: string;
  url: string;
}

export interface HomeFeaturedProductItem {
  id: string;
  product_code: string;
  name: string;
  slug: string;
  description: string;
  image?: HomeFeaturedProductImage | null;
}

export interface HomeFeaturedProductsResponse {
  items: HomeFeaturedProductItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
