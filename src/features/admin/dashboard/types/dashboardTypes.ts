export interface StatusCountMap {
  [key: string]: number;
}

export interface DashboardStats {
  products_total: number;
  products_by_status: StatusCountMap;
  inquiries_total: number;
  inquiries_by_status: StatusCountMap;
  reviews_total: number;
  reviews_by_status: StatusCountMap;
  collections_total: number;
  catalogs_total: number;
  media_assets_total: number;
  media_assets_by_status: StatusCountMap;
}

export interface RecentInquiryItem {
  id: string;
  name: string;
  company_name: string;
  status: string;
  created_at: string;
}

export interface RecentProductItem {
  id: string;
  name: string;
  product_code: string;
  status: string;
  created_at: string;
}

export interface PendingReviewItem {
  id: string;
  name: string;
  company_name: string;
  rating: number;
  status: string;
  created_at: string;
}

export interface DashboardOverviewResponse {
  stats: DashboardStats;
  recent_inquiries: RecentInquiryItem[];
  recent_products: RecentProductItem[];
  pending_reviews: PendingReviewItem[];
}
