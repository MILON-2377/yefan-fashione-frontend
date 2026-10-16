import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCatalog } from "../api/deleteAdminCatalog";

export function useDeleteCatalog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCatalog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
      queryClient.invalidateQueries({ queryKey: ["collections", "unused"] });
    },
  });
}