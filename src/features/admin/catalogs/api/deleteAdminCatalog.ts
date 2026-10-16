import { adminFetch } from "@/api";
import { DeleteCatalogResponse } from "../types/catalogTypes";

export async function deleteCatalog(id: string): Promise<DeleteCatalogResponse> {
  return adminFetch<DeleteCatalogResponse>(`/catalogs/${id}`, {
    method: "DELETE",
  });
}