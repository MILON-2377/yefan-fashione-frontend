"use client";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useCreateAdminForm } from "../hooks/useCreateAdminForm";

export function CreateAdminForm() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    toggleShowPassword,
    isPending,
    serverError,
    handleCancel,
  } = useCreateAdminForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Banner API Level Error */}
      {serverError && !errors.email && !errors.password && (
        <div className="p-4 bg-red-50/80 border border-red-200/80 rounded-2xl flex items-start gap-3 text-xs text-red-800 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block text-red-900">
              Creation Failed
            </span>
            <span>
              {serverError.message ||
                "An unexpected error occurred. Please try again."}
            </span>
          </div>
        </div>
      )}

      {/* Input Group: Email */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
          Corporate Email Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            {...register("email")}
            type="email"
            placeholder="admin@yifanatelier.com"
            className={`w-full pl-10 pr-4 py-3 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200/80 focus:border-indigo-600 focus:ring-indigo-50"
            }`}
          />
        </div>
        {errors.email ? (
          <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
            <span>{errors.email.message}</span>
          </p>
        ) : (
          <p className="text-[11px] text-slate-500">
            Must be a valid organizational email address for access credentials.
          </p>
        )}
      </div>

      {/* Input Group: Password */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
          Initial Access Password <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            className={`w-full pl-10 pr-11 py-3 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
              errors.password
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200/80 focus:border-indigo-600 focus:ring-indigo-50"
            }`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
            <span>{errors.password.message}</span>
          </p>
        ) : (
          <p className="text-[11px] text-slate-500">
            Minimum 8 characters with at least one uppercase, lowercase, and
            numeric character.
          </p>
        )}
      </div>

      {/* Privilege Notice */}
      <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-indigo-950">
            Privilege & Auditing Scope
          </h4>
          <p className="text-[11px] text-indigo-900/80 leading-relaxed">
            Newly provisioned administrator accounts receive default operational
            access. All modifications and sessions are recorded in security
            logs.
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm hover:shadow-indigo-100 disabled:opacity-50 min-w-35"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Provisioning...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Provision Admin</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
