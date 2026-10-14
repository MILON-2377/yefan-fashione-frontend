import { useQuery } from '@tanstack/react-query';
import { getBrands, GetBrandsParams } from '../api/getBrands';
import { BrandListResponse } from '../types';

export const BRANDS_QUERY_KEY = ['brands'] as const;

export function useBrands(params?: GetBrandsParams) {
    return useQuery<BrandListResponse, Error>({
        queryKey: [...BRANDS_QUERY_KEY, params],
        queryFn: () => getBrands(params),
        staleTime: 1000 * 60 * 5,
    });
}
