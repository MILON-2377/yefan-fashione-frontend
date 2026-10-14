import { adminFetch } from "@/api";
import { AdminCatalogItem, CreateCatalogRequest } from "../types/catalogTypes";


export async function createAdminCatalog(
  payload: CreateCatalogRequest
): Promise<AdminCatalogItem> {
  return adminFetch<AdminCatalogItem>("/catalogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
