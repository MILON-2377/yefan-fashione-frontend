import { adminFetch } from "@/api";
import { DashboardOverviewResponse } from "../types/dashboardTypes";

/**
 * GET /admin/dashboard (or matching admin endpoint)
 * Fetches analytics summary, recent inquiries, products, and pending reviews.
 */
export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  return adminFetch<DashboardOverviewResponse>("/dashboard", {
    method: "GET",
  });
}
