import { adminFetch } from "@/api";
import {
    CompanyKnowledgeItem,
} from "../types/companyKnowledge";


export async function getCompanyKnowledgeById(
    id: string
): Promise<CompanyKnowledgeItem> {
    return adminFetch<CompanyKnowledgeItem>(`/company-knowledges/${id}`, {
        method: "GET",
    });
}
