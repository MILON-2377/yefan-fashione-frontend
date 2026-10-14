import { Metadata } from "next";
import { AdminReviewsTable } from "@/features/admin/reviews/components/AdminReviewsTable";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews Moderation | Admin Dashboard",
  description:
    "Manage, review, and moderate client testimonials for Yifan Atelier.",
};

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Testimonial Moderation</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Client Reviews & Feedback
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Approve, reject, or manage public buyer feedback and OEM partner
            testimonials.
          </p>
        </div>
      </div>

      {/* Data Table */}
      <AdminReviewsTable />
    </div>
  );
}
