import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "@/api";
import { ApiError } from "@/lib/errors/ApiError";

export function useDeleteCompanyKnowledge() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) =>
      adminFetch<void>(`/company-knowledges/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-knowledges"] });
    },
  });
}
