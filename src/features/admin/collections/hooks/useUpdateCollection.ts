import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    updateCollection,
    UpdateCollectionPayload,
} from "../api/updateCollection";
import { toast } from "@/features/common/ui/toast/toastStore";
import { ApiError } from "@/lib/errors/ApiError";
import { collectionKeys } from "./keys";

export function useUpdateCollection(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateCollectionPayload) =>
            updateCollection(id, payload),
        onSuccess: (updatedCollection) => {
            queryClient.invalidateQueries({
                queryKey: collectionKeys.all,
                exact: false,
            });

            // Optimistically update or re-cache single collection details query
            queryClient.setQueryData(["collections", id], updatedCollection);

            toast.success(
                "Collection Updated",
                "The collection details have been updated successfully."
            );
        },
        onError: (error: ApiError) => {

            if (error.status === 401) {
                toast.error("Session Expired", "Please log in again.");
                return;
            }

            if (error.status === 409) {
                toast.error("Conflict", "A collection with this name already exists.");
                return;
            }

            toast.error("Update Failed", error.message);
        },
    });
}
