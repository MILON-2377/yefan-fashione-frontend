import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCatalogItem, CreateCatalogRequest } from "../types/catalogTypes";
import { createAdminCatalog } from "../api/createAdminCatalog";
import { catalogQueryKeys } from "./keys";



export function useCreateCatalog() {
  const queryClient = useQueryClient();

  return useMutation<AdminCatalogItem, Error, CreateCatalogRequest>({
    mutationFn: (payload) => createAdminCatalog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogQueryKeys.lists() });
    },
  });
}
