import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection } from "../api/deleteCollection";
import { COLLECTIONS_QUERY_KEY } from "./useCollections";
import { toast } from "@/features/common/ui/toast/toastStore";

export function useDeleteCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCollection(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COLLECTIONS_QUERY_KEY,
                exact: false,
            });
            toast.success("Collection Deleted", "The collection was removed successfully.");
        },
        onError: (error: Error) => {
            toast.error("Delete Failed", error.message || "Failed to delete collection.");
        },
    });
}
