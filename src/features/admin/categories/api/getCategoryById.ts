import { adminFetch } from '@/api';
import { Category } from "../types";

/**
 * Retrieves a single category by its unique ID.
 */
export async function getCategoryById(
    category_id: string,
): Promise<Category> {
    if (!category_id) {
        throw new Error("Category ID is required.");
    }

    return adminFetch<Category>(`/categories/${category_id}`, {
        method: "GET",
    });
}
