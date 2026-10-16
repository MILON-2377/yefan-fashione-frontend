import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "../api/createCollection";
import { CollectionFormValues } from "../schemas/collectionSchema";
import { toast } from "@/features/common/ui/toast/toastStore";
import { collectionKeys } from "./keys";

export function useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CollectionFormValues) => createCollection(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: collectionKeys.all,
                exact: false,
            });
            toast.success("Collection Created", "New collection added to catalog.");
        },
        onError: (error: Error) => {
            toast.error("Creation Failed", error.message || "Failed to create collection.");
        },
    });
}
