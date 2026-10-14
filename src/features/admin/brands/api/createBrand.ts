import { adminFetch } from '@/api';
import { BrandFormValues } from '../schemas/brandSchema';
import { Brand } from '../types';


export interface CreateBrandResponse {
    data: Brand;
    message?: string;
}

export async function createBrand(data: BrandFormValues): Promise<Brand> {
    const result = await adminFetch<CreateBrandResponse>("/brands/create", {
        method: "POST",
        body: JSON.stringify(data)
    })

    return result.data;
}
