import { adminFetch } from '@/api';
import { Collection } from "../types";

export async function getCollection(id: string): Promise<Collection> {
    return adminFetch<Collection>(`/collections/${id}`);
}
