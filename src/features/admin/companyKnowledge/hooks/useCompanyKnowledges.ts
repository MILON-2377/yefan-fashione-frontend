import { useQuery } from "@tanstack/react-query";
import { getCompanyKnowledges } from "../api/getCompanyKnowledges";
import { ApiError } from "@/lib/errors/ApiError";
import { CompanyKnowledgeListResponse, CompanyKnowledgeParams } from "../types/companyKnowledge";

export function useCompanyKnowledges(params: CompanyKnowledgeParams = {}) {
    return useQuery<CompanyKnowledgeListResponse, ApiError>({
        queryKey: ["company-knowledges", params],
        queryFn: () => getCompanyKnowledges(params),
        placeholderData: (previousData) => previousData,
    });
}
