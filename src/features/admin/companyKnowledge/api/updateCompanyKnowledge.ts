import { adminFetch } from "@/api";
import { CompanyKnowledgeItem, CreateCompanyKnowledgePayload } from "../types/companyKnowledge";

export async function updateCompanyKnowledge(
    id: string,
    payload: CreateCompanyKnowledgePayload & { status?: string }
): Promise<CompanyKnowledgeItem> {
    return adminFetch<CompanyKnowledgeItem>(`/company-knowledges/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
