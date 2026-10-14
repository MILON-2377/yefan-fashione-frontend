import { adminFetch } from '@/api';

export async function deleteCollection(id: string): Promise<void> {
    return adminFetch<void>(`/collections/${id}`, {
        method: "DELETE",
    });
}
