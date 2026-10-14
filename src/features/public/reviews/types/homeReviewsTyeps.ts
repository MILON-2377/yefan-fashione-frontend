export interface HomeReviewProduct {
  id: string;
  name: string;
  slug: string;
}

export interface HomeReviewAvatar {
  id: string;
  url: string;
}

export interface HomeReviewItem {
  id: string;
  name: string;
  company_name: string;
  job_title: string;
  country: string;
  rating: number;
  message: string;
  product?: HomeReviewProduct | null;
  avatar?: HomeReviewAvatar | null;
}

export interface HomeReviewsResponse {
  items: HomeReviewItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
