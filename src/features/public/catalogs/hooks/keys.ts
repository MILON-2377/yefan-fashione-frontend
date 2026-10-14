import { GetPublicCatalogsParams } from "../types/catalogTypes";

export const publicCatalogQueryKeys = {
    all: ["public", "catalogs"] as const,
    lists: (params?: GetPublicCatalogsParams) =>
        [...publicCatalogQueryKeys.all, "list", params] as const,
    detail: (id: string) =>
        [...publicCatalogQueryKeys.all, "detail", id] as const,
};
