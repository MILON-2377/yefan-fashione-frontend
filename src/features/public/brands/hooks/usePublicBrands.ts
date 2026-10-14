import { useQuery } from "@tanstack/react-query";
import { getPublicBrands } from "../api/brandsApi";
import {
  PublicBrandsResponse,
  GetPublicBrandsParams,
} from "../types/brandTypes";

export function usePublicBrands(params?: GetPublicBrandsParams) {
  return useQuery<PublicBrandsResponse>({
    queryKey: ["public-brands", params],
    queryFn: () => getPublicBrands(params),
  });
}
