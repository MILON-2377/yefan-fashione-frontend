"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Clock, Archive } from "lucide-react";
import { AdminCatalogItem, RecordStatus } from "../types/catalogTypes";

interface ChangeStatusModalProps {
  isOpen: boolean;
  isPending: boolean;
  catalog: AdminCatalogItem | null;
  onConfirm: (newStatus: RecordStatus) => Promise<void>;
  onClose: () => void;
}

const STATUS_OPTIONS: {
  value: RecordStatus;
  label: string;
  description: string;
  icon: typeof CheckCircle2;
  colorClass: string;
}[] = [
  {
    value: "PUBLISHED",
    label: "Published",
    description: "Visible to public users in the showroom catalog.",
    icon: CheckCircle2,
    colorClass:
      "border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-50",
  },
  {
    value: "DRAFT",
    label: "Draft",
    description:
      "Only visible to administrators. Hidden from the public website.",
    icon: Clock,
    colorClass:
      "border-amber-200 bg-amber-50/50 text-amber-800 hover:bg-amber-50",
  },
  {
    value: "ARCHIVED",
    label: "Archived",
    description:
      "Retained for record keeping but removed from active workflows.",
    icon: Archive,
    colorClass:
      "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
  },
];

export default function ChangeStatusModal({
  isOpen,
  isPending,
  catalog,
  onConfirm,
  onClose,
}: ChangeStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<RecordStatus>(
    catalog?.status ?? "DRAFT",
  );

  if (!isOpen || !catalog) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus === catalog.status) {
      onClose();
      return;
    }
    await onConfirm(selectedStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold font-serif text-slate-900">
              Update Catalog Status
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Change status for{" "}
              <span className="font-semibold text-slate-800">
                {catalog.title}
              </span>
            </p>
          </div>

          {/* Body Options */}
          <div className="p-6 space-y-3">
            {STATUS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.value;

              return (
                <label
                  key={option.value}
                  className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? `${option.colorClass} ring-2 ring-slate-900 ring-offset-1`
                      : "border-slate-200 bg-white hover:bg-slate-50/80 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="catalog-status"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => setSelectedStatus(option.value)}
                    className="sr-only"
                  />
                  <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase font-mono tracking-wider">
                      {option.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {option.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/80 border-t border-slate-100">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || selectedStatus === catalog.status}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
