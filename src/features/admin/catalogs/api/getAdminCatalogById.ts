import { adminFetch } from "@/api";
import { AdminCatalogItem } from "../types/catalogTypes";


export async function getCatalogById(catalog_id: string): Promise<AdminCatalogItem> {
  if (!catalog_id) {
    throw new Error("Catalog ID is required.");
  }

  return adminFetch<AdminCatalogItem>(`/catalogs/${catalog_id}`, {
    method: "GET",
  });
}