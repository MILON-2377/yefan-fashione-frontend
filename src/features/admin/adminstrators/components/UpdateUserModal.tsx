"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Mail,
  Shield,
  UserCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { UserResponse } from "../types";
import { ApiError } from "@/lib/errors/ApiError";

// 1. Zod Validation Schema (Role omitted as it cannot be modified)
export const updateUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid corporate email address."),
  is_active: z.boolean(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

interface UpdateUserModalProps {
  user: UserResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userId: string, payload: UpdateUserFormValues) => void;
  isPending: boolean;
  error: ApiError | Error | null;
}

export function UpdateUserModal({
  user,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  error,
}: UpdateUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      is_active: true,
    },
  });

  // Populate form with target user details when opened
  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        is_active: user.is_active,
      });
    }
  }, [user, reset]);

  // Handle server-side API validation errors mapped to form fields
  useEffect(() => {
    if (error && error instanceof ApiError && error.data) {
      const { data } = error;

      // Handle FastAPI / Pydantic validation error array
      if (Array.isArray(data.detail)) {
        data.detail.forEach((detailErr) => {
          const field = detailErr.loc?.find(
            (loc): loc is keyof UpdateUserFormValues =>
              loc === "email" || loc === "is_active",
          );

          if (field && detailErr.msg) {
            setError(field, {
              type: "server",
              message: detailErr.msg,
            });
          }
        });
      }

      // Handle key-value error maps
      if (data.errors && typeof data.errors === "object") {
        Object.entries(data.errors).forEach(([key, val]) => {
          if (key === "email" || key === "is_active") {
            const message = Array.isArray(val) ? val[0] : val;
            if (message) {
              setError(key as keyof UpdateUserFormValues, {
                type: "server",
                message,
              });
            }
          }
        });
      }
    }
  }, [error, setError]);

  if (!isOpen || !user) return null;

  const handleFormSubmit = (values: UpdateUserFormValues) => {
    onSubmit(user.id, values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Update Administrator
            </h3>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              ID: {user.id}
            </p>
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

        {/* Form Body */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          {/* Top API Banner Error */}
          {error && !errors.email && (
            <div className="p-4 bg-red-50/80 border border-red-200/80 rounded-xl flex items-start gap-3 text-xs text-red-800 font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-red-900">
                  Update Failed
                </span>
                <span>
                  {error.message ||
                    "An unexpected error occurred. Please try again."}
                </span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                {...register("email")}
                type="email"
                placeholder="admin@yifanatelier.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200/80 focus:border-indigo-600 focus:ring-indigo-50"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Read-Only Role Display */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
              Role Permission
            </label>
            <div className="relative flex items-center px-3.5 py-2.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed select-none">
              <Shield className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <span className="font-mono text-slate-700 font-bold">ADMIN</span>
              <span className="ml-auto text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                Fixed
              </span>
            </div>
          </div>

          {/* Status Checkbox Toggle */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Account Access Status
                </span>
                <span className="text-[11px] text-slate-500">
                  Enable or disable this user&lsquo;s platform entry.
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                {...register("is_active")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm disabled:opacity-50 min-w-30"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Update Admin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
