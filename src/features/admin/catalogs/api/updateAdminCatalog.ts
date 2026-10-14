import { adminFetch } from "@/api";
import { AdminCatalogItem, UpdateCatalogRequest } from "../types/catalogTypes";


export const updateCatalog = async (
  id: string,
  payload: UpdateCatalogRequest
): Promise<AdminCatalogItem> => {
  return adminFetch(`/catalogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
