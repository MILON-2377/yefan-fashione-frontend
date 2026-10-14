import { useQuery } from "@tanstack/react-query";
import { getCatalogs } from "../api/getAdminCatalogs";
import { GetCatalogsParams } from "../types/catalogTypes";


export const CATALOGS_QUERY_KEY = ["catalogs"];

export const useCatalogs = (params?: GetCatalogsParams) => {
    return useQuery({
        queryKey: [...CATALOGS_QUERY_KEY, params],
        queryFn: () => getCatalogs(params),
    });
};
