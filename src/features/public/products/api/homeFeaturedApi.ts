import { publicFetch } from "@/api";
import { HomeFeaturedProductsResponse } from "../types/homeFeaturedTypes";

export async function getHomeFeaturedProducts(params?: {
  page?: number;
  page_size?: number;
}): Promise<HomeFeaturedProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.page_size) searchParams.set("page_size", params.page_size.toString());

  const query = searchParams.toString();
  const endpoint = query ? `/products/featured?${query}` : "/products/featured";

  return publicFetch<HomeFeaturedProductsResponse>(endpoint, {
    method: "GET",
  });
}
