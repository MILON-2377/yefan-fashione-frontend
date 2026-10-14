import { adminFetch } from '@/api';

/**
 * Deletes a category by ID.
 */
export async function deleteCategory(
    id: string,
): Promise<void> {
    if (!id) {
        throw new Error("Category ID is required for deletion.");
    }

    return adminFetch<void>(`/categories/${id}`, {
        method: "DELETE",
    });
}
