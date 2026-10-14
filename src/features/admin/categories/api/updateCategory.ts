import { adminFetch } from '@/api';
import { Category, UpdateCategoryRequest } from "../types";

export async function updateCategory(
    id: string,
    payload: UpdateCategoryRequest,
): Promise<Category> {
    if (!id) {
        throw new Error("Category ID is required for update.");
    }

    return adminFetch<Category>(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
