import { adminFetch } from "@/api";
import {
  CreateCompanyKnowledgePayload,
  CompanyKnowledgeResponse,
} from "../types/companyKnowledge";

/**
 * POST /api/v1/admin/company-knowledges
 * Creates a new company knowledge entry.
 */
export async function createCompanyKnowledge(
  payload: CreateCompanyKnowledgePayload
): Promise<CompanyKnowledgeResponse> {
  return adminFetch<CompanyKnowledgeResponse>("/company-knowledges", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
