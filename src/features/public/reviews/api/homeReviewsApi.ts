import { publicFetch } from "@/api";
import { HomeReviewsResponse } from "../types/homeReviewsTyeps";

export async function getHomeReviews(params?: {
  page?: number;
  page_size?: number;
}): Promise<HomeReviewsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.page_size) searchParams.set("page_size", params.page_size.toString());

  const query = searchParams.toString();
  const endpoint = query ? `/reviews?${query}` : "/reviews";

  return publicFetch<HomeReviewsResponse>(endpoint, {
    method: "GET",
  });
}
