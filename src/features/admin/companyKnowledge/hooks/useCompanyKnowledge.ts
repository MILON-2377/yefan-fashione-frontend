import { useQuery } from "@tanstack/react-query";
import { getCompanyKnowledgeById } from "../api/getCompanyKnowledgeById";
import { CompanyKnowledgeItem } from "../types/companyKnowledge";
import { ApiError } from "@/lib/errors/ApiError";

export function useCompanyKnowledge(id: string) {
    return useQuery<CompanyKnowledgeItem, ApiError>({
        queryKey: ["company-knowledge", id],
        queryFn: () => getCompanyKnowledgeById(id),
        enabled: Boolean(id),
    });
}
