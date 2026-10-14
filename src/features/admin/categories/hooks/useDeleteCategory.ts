import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../api/deleteCategory";


/**
 * Custom React Query hook for deleting a category and invalidating category cache.
 */
export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            // Invalidate all category queries to trigger a fresh refetch
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error: Error) => {
            console.error("Error deleting category:", error.message);
        },
    });
}
