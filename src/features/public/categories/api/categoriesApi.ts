import { publicFetch } from "@/api";
import { PublicCategoriesResponse } from "../types/categoryTypes";

export async function getPublicCategories(): Promise<PublicCategoriesResponse> {
    return publicFetch<PublicCategoriesResponse>("/categories", {
        method: "GET",
    });
}
