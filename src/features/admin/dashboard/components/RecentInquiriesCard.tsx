import Link from "next/link";
import { ArrowUpRight, Clock, AlertCircle, Inbox } from "lucide-react";
import { RecentInquiryItem } from "../types/dashboardTypes";

interface RecentInquiriesCardProps {
  inquiries: RecentInquiryItem[];
}

export function RecentInquiriesCard({ inquiries }: RecentInquiriesCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 font-serif">
            Recent Inquiries & OEM Briefs
          </h2>
          <p className="text-xs text-slate-500">
            Latest sample requests and tech-pack submissions from buyers
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
        >
          <span>View All Inbox</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 flex-1">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">No recent inquiries found</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {inquiry.company_name}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{inquiry.name}</span>
                </div>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" /> {inquiry.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
