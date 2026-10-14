import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInquiry } from "../api/inquiriesApi";
import { ApiError } from "@/lib/errors/ApiError";

export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
    },
  });
}
