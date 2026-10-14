import { adminFetch } from "@/api";
import { CatalogListResponse, GetCatalogsParams } from "../types/catalogTypes";

export const getCatalogs = async (params?: GetCatalogsParams): Promise<CatalogListResponse> => {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.status && params.status !== "ALL") query.set("status", params.status);
  if (params?.collection_id) query.set("collection_id", params.collection_id);
  if (params?.page) query.set("page", params.page.toString());
  if (params?.page_size) query.set("page_size", params.page_size.toString());

  return adminFetch(`/catalogs?${query.toString()}`);
};

export const deleteCatalog = async (id: string): Promise<void> => {
  return adminFetch(`/catalogs/${id}`, {
    method: "DELETE",
  });
};
