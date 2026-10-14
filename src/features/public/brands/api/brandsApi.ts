import { publicFetch } from "@/api";
import {
  PublicBrandsResponse,
  GetPublicBrandsParams,
} from "../types/brandTypes";

export async function getPublicBrands(
  params?: GetPublicBrandsParams
): Promise<PublicBrandsResponse> {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.page_size) queryParams.set("page_size", params.page_size.toString());

  const queryString = queryParams.toString();
  const endpoint = `/brands${queryString ? `?${queryString}` : ""}`;

  return publicFetch<PublicBrandsResponse>(endpoint);
}
