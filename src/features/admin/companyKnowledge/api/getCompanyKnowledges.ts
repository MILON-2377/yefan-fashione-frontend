import { adminFetch } from "@/api";
import { CompanyKnowledgeListResponse, CompanyKnowledgeParams } from "../types/companyKnowledge";

/**
 * GET /api/v1/admin/company-knowledges
 * Retrieves paginated company knowledge items.
 */
export async function getCompanyKnowledges(
  params: CompanyKnowledgeParams = {}
): Promise<CompanyKnowledgeListResponse> {
  const query = new URLSearchParams();

  if (params.page !== undefined) query.set("page", params.page.toString());
  if (params.page_size !== undefined) query.set("page_size", params.page_size.toString());
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.status) query.set("status", params.status);

  const queryString = query.toString();
  const endpoint = `/company-knowledges${queryString ? `?${queryString}` : ""}`;

  return adminFetch<CompanyKnowledgeListResponse>(endpoint, {
    method: "GET",
  });
}
