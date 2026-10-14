export type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED";

export interface InquiryProduct {
  id: string;
  inquiry_id: string;
  product_id: string;
  quantity_requested: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  company_name?: string;
  job_title?: string;
  inquiry_type: string;
  quantity_range?: string;
  message: string;
  source_page?: string;
  status: InquiryStatus;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  products: InquiryProduct[];
}

export interface InquiryListResponse {
  items: InquiryItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface InquiryParams {
  page?: number;
  page_size?: number;
  search?: string;
  status?: InquiryStatus;
}

export interface UpdateInquiryPayload {
  status?: InquiryStatus;
  internal_notes?: string;
}
