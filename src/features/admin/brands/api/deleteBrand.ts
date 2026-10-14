import { adminFetch } from '@/api';

export interface DeleteBrandResponse {
    message?: string;
}

export async function deleteBrand(brand_id: string): Promise<DeleteBrandResponse> {
    console.log({brand_id})
    return adminFetch<DeleteBrandResponse>(`/brands/${brand_id}`, {
        method: 'DELETE',
    });
}
