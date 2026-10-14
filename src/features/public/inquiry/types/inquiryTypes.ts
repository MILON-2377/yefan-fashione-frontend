export type InquiryType =
  | "GENERAL"
  | "PRODUCT"
  | "CUSTOMIZATION"
  | "OEM"
  | "ODM"
  | "PRIVATE_LABEL"
  | "WHOLESALE";

export type QuantityRange =
  | "SAMPLE"
  | "SMALL_BATCH"
  | "WHOLESALE"
  | "LARGE_VOLUME"
  | "NOT_SURE";

export interface InquiryProductItem {
  product_id: string;
  quantity_requested?: number;
  notes?: string;
}

export interface CreateInquiryRequest {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  company_name?: string;
  job_title?: string;
  inquiry_type?: InquiryType;
  quantity_range?: QuantityRange;
  message: string;
  source_page?: string;
  products?: InquiryProductItem[];
}

export interface CreateInquiryResponse {
  id: string;
  status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED";
  created_at: string;
}
