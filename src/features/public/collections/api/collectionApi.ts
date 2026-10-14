import { publicFetch } from "@/api";
import {
  PublicCollectionsResponse,
  GetPublicCollectionsParams,
} from "../types/collectionTypes";

export async function getPublicCollections(
  params?: GetPublicCollectionsParams
): Promise<PublicCollectionsResponse> {
  const queryParams = new URLSearchParams();

  if (params?.brand_id) queryParams.set("brand_id", params.brand_id);
  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.page_size) queryParams.set("page_size", params.page_size.toString());

  const queryString = queryParams.toString();
  const endpoint = `/collections${queryString ? `?${queryString}` : ""}`;

  return publicFetch<PublicCollectionsResponse>(endpoint);
}
