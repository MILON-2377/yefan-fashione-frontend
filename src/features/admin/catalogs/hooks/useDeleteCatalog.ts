import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCatalog } from "../api/deleteAdminCatalog";
import { catalogQueryKeys } from "./keys";

export const useDeleteCatalog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCatalog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogQueryKeys.all });
        },
    });
};
