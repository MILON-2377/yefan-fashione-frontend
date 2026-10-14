export type CompanyKnowledgeStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface CreateCompanyKnowledgePayload {
  title: string;
  category: string;
  content: string;
}

export interface CompanyKnowledgeResponse {
  id: string;
  title: string;
  category: string;
  content: string;
  status: CompanyKnowledgeStatus;
  createdAt?: string;
  updatedAt?: string;
}


export interface CompanyKnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  status: CompanyKnowledgeStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyKnowledgeListResponse {
  items: CompanyKnowledgeItem[];
  total: number;
  page: number;
  page_size: number;
}

export interface CompanyKnowledgeParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: string;
  status?: CompanyKnowledgeStatus;
}
