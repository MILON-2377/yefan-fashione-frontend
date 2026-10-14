import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/getDashboardOverview";
import { DashboardOverviewResponse } from "../types/dashboardTypes";

export const dashboardKeys = {
  all: ["admin", "dashboard"] as const,
  overview: () => [...dashboardKeys.all, "overview"] as const,
};

export function useDashboardOverview() {
  return useQuery<DashboardOverviewResponse, Error>({
    queryKey: dashboardKeys.overview(),
    queryFn: getDashboardOverview,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    refetchOnWindowFocus: true,
  });
}
