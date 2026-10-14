import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCatalog } from "../api/updateAdminCatalog";
import { RecordStatus } from "../types/catalogTypes";
import { catalogQueryKeys } from "./keys";

interface UpdateStatusParams {
  id: string;
  status: RecordStatus;
}

export const useUpdateCatalogStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusParams) =>
      updateCatalog(id, { status }),
    onSuccess: () => {
      // Refetches list data to move items between status tabs smoothly
      queryClient.invalidateQueries({ queryKey: catalogQueryKeys.all });
    },
  });
};
