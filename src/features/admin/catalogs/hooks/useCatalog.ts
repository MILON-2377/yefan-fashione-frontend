import { useQuery } from "@tanstack/react-query";
import { catalogQueryKeys } from "./keys";
import { getCatalogById } from "../api/getAdminCatalogById";



export function useCatalog(catalogId: string) {
  return useQuery({
    queryKey: catalogQueryKeys.detail(catalogId),
    queryFn: () => getCatalogById(catalogId),
    enabled: !!catalogId,
  });
}