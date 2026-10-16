import { adminFetch } from "@/api";
import { UnusedCollectionsResponse } from "../types";

export async function getUnusedCollections(): Promise<UnusedCollectionsResponse> {
  return adminFetch<UnusedCollectionsResponse>("/collections/available-for-catalogs", {
    method: "GET",
  });
}






