import { Collection } from "../types";
import { CollectionFormValues } from "../schemas/collectionSchema";
import { adminFetch } from '@/api';

export async function createCollection(
    payload: CollectionFormValues
): Promise<Collection> {
    return adminFetch<Collection>("/collections", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
