import { publicFetch } from "@/api";
import {
  PublicCatalogListResponse,
  GetPublicCatalogsParams,
} from "../types/catalogTypes";

export async function getPublicCatalogs(
  params?: GetPublicCatalogsParams
): Promise<PublicCatalogListResponse> {
  const queryParams = new URLSearchParams();

  if (params?.page !== undefined) {
    queryParams.set("page", params.page.toString());
  }
  if (params?.page_size !== undefined) {
    queryParams.set("page_size", params.page_size.toString());
  }
  if (params?.collection_id) {
    queryParams.set("collection_id", params.collection_id);
  }
  if (params?.search) {
    queryParams.set("search", params.search);
  }

  const queryString = queryParams.toString();
  const endpoint = `/catalogs${queryString ? `?${queryString}` : ""}`;

  return publicFetch<PublicCatalogListResponse>(endpoint, {
    method: "GET",
  });
}
