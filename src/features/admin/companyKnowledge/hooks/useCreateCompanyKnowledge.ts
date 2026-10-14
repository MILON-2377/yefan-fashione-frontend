import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyKnowledge } from "../api/createCompanyKnowledge";
import {
  CreateCompanyKnowledgePayload,
  CompanyKnowledgeResponse,
} from "../types/companyKnowledge";
import { ApiError } from "@/lib/errors/ApiError";

export function useCreateCompanyKnowledge() {
  const queryClient = useQueryClient();

  return useMutation<
    CompanyKnowledgeResponse,
    ApiError,
    CreateCompanyKnowledgePayload
  >({
    mutationFn: (payload) => createCompanyKnowledge(payload),
    onSuccess: () => {
      // Invalidate the knowledge list query so tables refresh automatically
      queryClient.invalidateQueries({ queryKey: ["company-knowledges"] });
    },
  });
}
