import { adminFetch } from '@/api';
import { Brand } from "../types";

export async function getBrandById(brand_id: string): Promise<Brand> {
    return adminFetch<Brand>(`/brands/${brand_id}`, {
        method: "GET",
    });
}
