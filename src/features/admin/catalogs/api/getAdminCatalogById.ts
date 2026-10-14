import { adminFetch } from "@/api";
import { AdminCatalogItem } from "../types/catalogTypes";


export async function getAdminCatalogById(
  id: string
): Promise<AdminCatalogItem> {
  return adminFetch<AdminCatalogItem>(`/catalogs/${id}`, {
    method: "GET",
  });
}
