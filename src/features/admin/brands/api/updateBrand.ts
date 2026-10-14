import { Brand } from "../types";
import { BrandFormValues } from "../schemas/brandSchema";
import { adminFetch } from '@/api';

export async function updateBrand(
    brand_id: string,
    payload: Partial<BrandFormValues>
): Promise<Brand> {
    return adminFetch<Brand>(`/brands/update/${brand_id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
