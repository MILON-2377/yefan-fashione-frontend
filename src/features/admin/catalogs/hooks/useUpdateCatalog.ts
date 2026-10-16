import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCatalog } from "../api/updateAdminCatalog";
import { catalogQueryKeys } from "./keys";
import { UpdateCatalogRequest } from "../types/catalogTypes";

export function useUpdateCatalog(catalogId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCatalogRequest) => updateCatalog(catalogId, payload),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(catalogQueryKeys.detail(catalogId), updatedData);
      queryClient.invalidateQueries({ queryKey: catalogQueryKeys.all });
    },
  });
}
