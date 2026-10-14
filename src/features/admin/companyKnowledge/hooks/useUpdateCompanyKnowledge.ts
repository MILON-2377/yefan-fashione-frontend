import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCompanyKnowledgePayload, CompanyKnowledgeItem } from "../types/companyKnowledge";
import { ApiError } from "@/lib/errors/ApiError";
import { updateCompanyKnowledge } from "../api/updateCompanyKnowledge";

export function useUpdateCompanyKnowledge(id: string) {
    const queryClient = useQueryClient();

    return useMutation<
        CompanyKnowledgeItem,
        ApiError,
        CreateCompanyKnowledgePayload & { status?: string }
    >({
        mutationFn: (payload) => updateCompanyKnowledge(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company-knowledges"] });
            queryClient.invalidateQueries({ queryKey: ["company-knowledge", id] });
        },
    });
}
