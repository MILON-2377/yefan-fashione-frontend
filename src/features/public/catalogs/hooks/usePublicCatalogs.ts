import { useQuery } from "@tanstack/react-query";

import {
    PublicCatalogListResponse,
    GetPublicCatalogsParams,
} from "../types/catalogTypes";
import { getPublicCatalogs } from "../api/getPublicCatalogs";
import { publicCatalogQueryKeys } from "./keys";



export function usePublicCatalogs(params?: GetPublicCatalogsParams) {
    return useQuery<PublicCatalogListResponse, Error>({
        queryKey: publicCatalogQueryKeys.lists(params),
        queryFn: () => getPublicCatalogs(params),
        staleTime: 1000 * 60 * 5, // 5 minute cache for public storefront
    });
}
