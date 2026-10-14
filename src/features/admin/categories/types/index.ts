import { RecordStatus } from "../../brands/types";


export interface CategoryListItemResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: RecordStatus;
  image: CategoryImageResponse | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: RecordStatus;
  image_media_id: string | null;
  image: CategoryImageResponse | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
  image_media_id?: string | null;
  status?: RecordStatus;
  is_active?: boolean;

}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string | null;
  image_media_id?: string | null;
  is_active?: boolean;
  status?: RecordStatus;
}

export interface CategoryQueryParams {
  search?: string;
  status?: string;
  parent_id?: string;
  page?: number;
  page_size?: number;
  skip?: number;
  limit?: number;
  is_active?: boolean;
}

export interface CategoryImageResponse {
  id: string;
  url: string;
  mime_type: string | null;
  width: number | null;
  height: number | null;
}


export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
  image_media_id?: string | null;
}



export interface CategoryListResponse {
  items: CategoryListItemResponse[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}


export interface CategoryQueryParams {
  search?: string;
  status?: string;
  page?: number;
  page_size?: number;
}
