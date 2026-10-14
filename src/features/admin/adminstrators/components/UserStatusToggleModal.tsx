// features/administrators/components/UserStatusToggleModal.tsx
"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { UserResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

interface UserStatusToggleModalProps {
  user: UserResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (user: UserResponse) => void;
  isPending: boolean;
  error: ApiError | Error | null;
}

export function UserStatusToggleModal({
  user,
  isOpen,
  onClose,
  onConfirm,
  isPending,
  error,
}: UserStatusToggleModalProps) {
  if (!isOpen || !user) return null;

  const isActive = user.is_active;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isActive
              ? "bg-rose-50/50 border-slate-100"
              : "bg-emerald-50/50 border-slate-100"
          }`}
        >
          <div
            className={`flex items-center gap-2 font-bold text-sm ${
              isActive ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {isActive ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
            <h3>
              {isActive ? "Deactivate Administrator" : "Activate Administrator"}
            </h3>
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
              {error.message ||
                `Failed to ${isActive ? "deactivate" : "activate"} administrator.`}
            </div>
          )}

          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to {isActive ? "deactivate" : "reactivate"}{" "}
            the administrator account for{" "}
            <span className="font-bold text-slate-900 font-mono">
              {user.email}
            </span>
            ?
          </p>

          {/* Contextual Warning / Info Box */}
          {isActive ? (
            <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                This will immediately revoke their access token and prevent
                further logins until reactivated.
              </span>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-start gap-2.5 text-[11px] text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                This will restore access for this user, allowing them to log in
                and perform administrative actions again.
              </span>
            </div>
          )}

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
              onClick={() => onConfirm(user)}
              disabled={isPending}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-white font-bold text-xs rounded-xl transition shadow-sm disabled:opacity-50 min-w-36 ${
                isActive
                  ? "bg-rose-600 hover:bg-rose-700 active:bg-rose-800"
                  : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{isActive ? "Deactivating..." : "Activating..."}</span>
                </>
              ) : isActive ? (
                <>
                  <UserX className="w-3.5 h-3.5" />
                  <span>Deactivate Account</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Activate Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
