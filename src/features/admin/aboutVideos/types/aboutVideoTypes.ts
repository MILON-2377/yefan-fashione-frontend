export type AboutVideoStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface CreateAboutVideoPayload {
  title: string;
  description?: string;
  media_asset_id: string;
  sort_order?: number;
  status?: AboutVideoStatus;
}

export interface UpdateAboutVideoPayload {
  title?: string;
  description?: string;
  media_asset_id?: string;
  sort_order?: number;
  status?: AboutVideoStatus;
}

export interface AboutVideoItem {
  id: string;
  title: string;
  description?: string;
  media_asset_id: string;
  video_url?: string;
  sort_order: number;
  status: AboutVideoStatus;
  created_at: string;
  updated_at: string;
}

export interface AboutVideoListResponse {
  items: AboutVideoItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AboutVideoParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: AboutVideoStatus;
}
