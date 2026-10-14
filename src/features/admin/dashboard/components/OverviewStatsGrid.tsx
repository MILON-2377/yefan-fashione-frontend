import { Shirt, Inbox, Star, FolderDown } from "lucide-react";
import { StatCard } from "./StatCard";
import { DashboardStats } from "../types/dashboardTypes";

interface OverviewStatsGridProps {
  stats: DashboardStats;
}

export function OverviewStatsGrid({ stats }: OverviewStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Active Products"
        value={stats.products_total}
        icon={Shirt}
        description="In showroom catalog"
        badgeText={`${stats.products_by_status?.PUBLISHED ?? 0} Live`}
        badgeVariant="positive"
      />
      <StatCard
        title="Inquiries & RFQs"
        value={stats.inquiries_total}
        icon={Inbox}
        description="OEM & sample briefs"
        badgeText={`${stats.inquiries_by_status?.NEW ?? 0} Unread`}
        badgeVariant="warning"
      />
      <StatCard
        title="Reviews & Feedback"
        value={stats.reviews_total}
        icon={Star}
        description="Client testimonials"
        badgeText={`${stats.reviews_by_status?.PENDING ?? 0} Pending`}
        badgeVariant="neutral"
      />
      <StatCard
        title="Digital Catalogs"
        value={stats.catalogs_total}
        icon={FolderDown}
        description="Lookbooks & Spec PDFs"
      />
    </div>
  );
}
