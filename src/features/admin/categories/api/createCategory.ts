import { adminFetch } from '@/api';
import { Category, CreateCategoryRequest } from "../types";


export async function createCategory(
    payload: CreateCategoryRequest,
): Promise<Category> {
    return adminFetch<Category>("/categories", {
        method: "POST",
        body: JSON.stringify(payload),

    });
}
