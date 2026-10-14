import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "../api/createCollection";
import { CollectionFormValues } from "../schemas/collectionSchema";
import { COLLECTIONS_QUERY_KEY } from "./useCollections";
import { toast } from "@/features/common/ui/toast/toastStore";

export function useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CollectionFormValues) => createCollection(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: COLLECTIONS_QUERY_KEY,
                exact: false,
            });
            toast.success("Collection Created", "New collection added to catalog.");
        },
        onError: (error: Error) => {
            toast.error("Creation Failed", error.message || "Failed to create collection.");
        },
    });
}
