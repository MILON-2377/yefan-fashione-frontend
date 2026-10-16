import { adminFetch } from '@/api';
import { Collection } from "../types";

export interface UpdateCollectionPayload {
    name?: string;
    slug?: string;
    description?: string;
    brand_id?: string;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export async function updateCollection(
    collection_id: string,
    payload: UpdateCollectionPayload
): Promise<Collection> {
    return adminFetch<Collection>(`/collections/${collection_id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
