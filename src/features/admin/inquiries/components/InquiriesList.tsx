"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MessageSquareText,
  Eye,
  Trash2,
  Building,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { DeleteConfirmationModal } from "@/features/common/ui/DeleteConfirmationModal";
import { useInquiries } from "../hooks/useInquiries";
import { useDeleteInquiry } from "../hooks/useDeleteInquiry";
import { InquiryItem, InquiryStatus } from "../types/inuiryTypes";

export function InquiriesList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<InquiryStatus | "">("");

  const [deletingItem, setDeletingItem] = useState<InquiryItem | null>(null);

  const { data, isLoading, isError, error } = useInquiries({
    page,
    page_size: pageSize,
    search: search || undefined,
    status: selectedStatus || undefined,
  });

  const { mutate: deleteInquiryMutation, isPending: isDeleting } =
    useDeleteInquiry();

  const inquiries = data?.items ?? [];
  const totalPages =
    data?.total_pages || (data ? Math.ceil(data.total / pageSize) : 1);

  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    deleteInquiryMutation(deletingItem.id, {
      onSuccess: () => setDeletingItem(null),
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RFQ & Sampling Management</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            B2B Client Inquiries
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage custom apparel RFQs, OEM sampling requests, and wholesale inquiries.
          </p>
        </div>
      </div>

      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, or company..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>

        {/* Filter Drops */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as InquiryStatus | "");
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESPONDED">Responded</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Error Banner */}
      {isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-mono leading-relaxed">
          {error?.message || "Failed to load inquiry records."}
        </div>
      )}

      {/* Main Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                <th className="py-3.5 px-5">Contact / Company</th>
                <th className="py-3.5 px-5">Type & Scope</th>
                <th className="py-3.5 px-5">Country</th>
                <th className="py-3.5 px-5">Requested Date</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="h-10 bg-slate-100 rounded-lg w-40" /></td>
                    <td className="p-5"><div className="h-8 bg-slate-100 rounded w-28" /></td>
                    <td className="p-5"><div className="h-4 bg-slate-100 rounded w-20" /></td>
                    <td className="p-5"><div className="h-4 bg-slate-100 rounded w-24" /></td>
                    <td className="p-5"><div className="h-6 bg-slate-100 rounded-full w-20" /></td>
                    <td className="p-5"><div className="h-8 bg-slate-100 rounded-lg w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <MessageSquareText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">No client inquiries found</p>
                    <p className="text-[11px] text-slate-400">
                      Try adjusting your filters or search query.
                    </p>
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => {
                  const isDeletingThis = isDeleting && deletingItem?.id === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isDeletingThis ? "bg-slate-50/80 opacity-70" : "hover:bg-slate-50/60"
                      }`}
                    >
                      {/* Contact / Company */}
                      <td className="py-4 px-5">
                        <div className="space-y-0.5 min-w-0 max-w-xs">
                          <p className="font-bold text-slate-900 truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono truncate">
                            {item.company_name && (
                              <>
                                <span className="flex items-center gap-1 text-slate-700 truncate">
                                  <Building className="w-3 h-3 text-slate-400 shrink-0" />
                                  {item.company_name}
                                </span>
                                <span>•</span>
                              </>
                            )}
                            <span className="truncate">{item.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Type & Scope */}
                      <td className="py-4 px-5">
                        <div className="space-y-0.5 text-xs font-mono">
                          <p className="font-semibold text-slate-800 uppercase tracking-wider">
                            {item.inquiry_type}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {item.quantity_range
                              ? `Qty: ${item.quantity_range}`
                              : "Standard Request"}
                          </p>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="py-4 px-5">
                        <div className="text-slate-600 font-mono flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.country || "N/A"}</span>
                        </div>
                      </td>

                      {/* Requested Date */}
                      <td className="py-4 px-5">
                        <span className="text-slate-500 font-mono">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-5">
                        {item.status === "NEW" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            <AlertCircle className="w-3 h-3 text-blue-600" />
                            New
                          </span>
                        )}
                        {item.status === "IN_PROGRESS" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            In Progress
                          </span>
                        )}
                        {item.status === "RESPONDED" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Responded
                          </span>
                        )}
                        {item.status === "CLOSED" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            <XCircle className="w-3 h-3 text-slate-400" />
                            Closed
                          </span>
                        )}
                      </td>

                      {/* Action Controls */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/inquiries/${item.id}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeletingItem(item)}
                            disabled={isDeletingThis}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center min-w-7 min-h-7"
                            title="Delete Inquiry"
                          >
                            {isDeletingThis ? (
                              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs font-medium text-slate-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deletingItem)}
        isPending={isDeleting}
        entityName={deletingItem?.name ? `${deletingItem.name}'s Inquiry` : undefined}
        title="Delete Inquiry Record"
        confirmText="Delete Record"
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
