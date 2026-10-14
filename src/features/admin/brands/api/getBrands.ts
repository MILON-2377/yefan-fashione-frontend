import { adminFetch } from '@/api';
import { BrandListResponse } from '../types';

export interface GetBrandsParams {
    search?: string;
    status?: string;
    page?: number;
    page_size?: number;
}

export async function getBrands(params?: GetBrandsParams): Promise<BrandListResponse> {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const queryString = queryParams.toString();
    const endpoint = `/brands${queryString ? `?${queryString}` : ''}`;

    return adminFetch<BrandListResponse>(endpoint, {
        method: 'GET',
    });
}
