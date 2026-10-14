// features/administrators/components/DeactivateUserModal.tsx
"use client";

import { AlertTriangle, Loader2, UserX, X } from "lucide-react";
import { UserResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

interface DeactivateUserModalProps {
  user: UserResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
  isPending: boolean;
  error: ApiError | Error | null;
}

export function DeactivateUserModal({
  user,
  isOpen,
  onClose,
  onConfirm,
  isPending,
  error,
}: DeactivateUserModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2 text-rose-700">
            <UserX className="w-4 h-4" />
            <h3 className="text-sm font-bold">Deactivate Administrator</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium">
              {error.message || "Failed to deactivate administrator."}
            </div>
          )}

          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to deactivate the administrator account for{" "}
            <span className="font-bold text-slate-900 font-mono">
              {user.email}
            </span>
            ?
          </p>

          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              This will immediately revoke their access token and prevent
              further logins until reactivated by a Super Admin.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(user.id)}
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl transition shadow-sm disabled:opacity-50 min-w-32"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deactivating...</span>
                </>
              ) : (
                <>
                  <UserX className="w-3.5 h-3.5" />
                  <span>Deactivate Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
