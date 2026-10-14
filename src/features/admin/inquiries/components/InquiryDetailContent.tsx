"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building,
  User,
  Package,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useInquiry } from "../hooks/useInquiry";
import { useUpdateInquiry } from "../hooks/useUpdateInquiry";
import { InquiryStatus } from "../types/inuiryTypes";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface InquiryDetailContentProps {
  id: string;
}

const STATUS_OPTIONS: InquiryStatus[] = ["NEW", "IN_PROGRESS", "RESPONDED", "CLOSED"];

export function InquiryDetailContent({ id }: InquiryDetailContentProps) {
  const router = useRouter();
  const { data: item, isLoading, isError, error } = useInquiry(id);
  const { mutate: updateInquiryMutation, isPending: isUpdating } = useUpdateInquiry(id);

  const [status, setStatus] = useState<InquiryStatus>("NEW");
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    if (item) {
      setStatus(item.status);
      setInternalNotes(item.internal_notes || "");
    }
  }, [item]);

  const handleSave = () => {
    updateInquiryMutation({
      status,
      internal_notes: internalNotes,
    });
  };

  if (isLoading) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
        <p className="text-xs font-mono">Loading inquiry details...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-3 max-w-xl mx-auto mt-12">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Failed to load inquiry</p>
          <p className="mt-0.5">{error?.message || "Requested inquiry record could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              Inquiry #{item.id.substring(0, 8)}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Submitted on {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <ActionButton
          variant="primary"
          size="md"
          icon={Save}
          isLoading={isUpdating}
          onClick={handleSave}
        >
          Save Changes
        </ActionButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Message */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Inquiry Message
            </h2>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {item.message}
            </div>
          </div>

          {/* Associated Products (if any) */}
          {item.products && item.products.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Requested Products ({item.products.length})</span>
              </h2>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {item.products.map((prod) => (
                  <div key={prod.id} className="p-3.5 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono text-slate-900 font-semibold">
                        Product ID: {prod.product_id}
                      </span>
                      {prod.notes && (
                        <p className="text-slate-500 text-[11px] mt-0.5">{prod.notes}</p>
                      )}
                    </div>
                    <span className="font-mono bg-white px-2.5 py-1 rounded border border-slate-200 font-bold text-slate-700">
                      Qty: {prod.quantity_requested}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internal Notes */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Internal Team Notes
            </h2>
            <textarea
              rows={5}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add internal remarks, quotation status, or sales rep notes..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono"
            />
          </div>
        </div>

        {/* Sidebar Info & Status */}
        <div className="space-y-6">
          {/* Status Select Box */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Workflow Status
            </h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as InquiryStatus)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all uppercase font-mono"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
              Contact Details
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900">{item.name}</span>
                {item.job_title && (
                  <span className="text-slate-400">({item.job_title})</span>
                )}
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                  {item.email}
                </a>
              </div>

              {item.phone && (
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.phone}</span>
                </div>
              )}

              {item.company_name && (
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Building className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.company_name}</span>
                </div>
              )}

              {item.country && (
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
