"use client";

import { useDashboardOverview } from "@/features/admin/dashboard/hooks/useDashboardOverview";
import { OverviewHeader } from "@/features/admin/dashboard/components/OverviewHeader";
import { OverviewStatsGrid } from "@/features/admin/dashboard/components/OverviewStatsGrid";
import { RecentInquiriesCard } from "@/features/admin/dashboard/components/RecentInquiriesCard";
import { PendingReviewsCard } from "@/features/admin/dashboard/components/PendingReviewsCard";

export default function AdminOverviewPage() {
  const { data, isLoading, isError } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
        <div className="h-16 bg-slate-200 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-200 rounded-xl" />
          <div className="h-96 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-mono">
        Failed to load dashboard overview data. Please try refreshing.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <OverviewHeader />
      <OverviewStatsGrid stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentInquiriesCard inquiries={data.recent_inquiries} />
        </div>
        <div>
          <PendingReviewsCard reviews={data.pending_reviews} />
        </div>
      </div>
    </div>
  );
}
