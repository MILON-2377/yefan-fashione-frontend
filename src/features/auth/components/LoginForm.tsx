"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { ApiError } from "@/lib/errors/ApiError";

export function LoginForm() {
  const { mutate: loginUser, isPending, error } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getDeviceName = () => {
    if (typeof window === "undefined") return "Web Browser";
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Mac")) return "Mac Desktop";
    if (userAgent.includes("Windows")) return "Windows PC";
    if (userAgent.includes("Linux")) return "Linux Desktop";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
      return "iOS Device";
    if (userAgent.includes("Android")) return "Android Device";
    return "Web Browser";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser({
      email: formData.email,
      password: formData.password,
      device_name: getDeviceName(),
    });
  };
  const getErrorMessage = (): string | null => {
    if (!error) return null;
    if (error instanceof ApiError) {
      return error.message || "Invalid credentials provided.";
    }
    return "Failed to authenticate. Please check your network connection.";
  };

  const getFieldError = (fieldName: "email" | "password"): string | null => {
    if (!(error instanceof ApiError) || !error.data) return null;

    const { data } = error;

    // 1. Check FastAPI / Pydantic validation details array: detail: [{ loc: ["body", "email"], msg: "..." }]
    if (Array.isArray(data.detail)) {
      const fieldErr = data.detail.find(
        (err) => err.loc && err.loc.includes(fieldName),
      );
      if (fieldErr?.msg) return fieldErr.msg;
    }

    // 2. Check key-value error maps: errors: { email: ["Invalid email"] } or { email: "Invalid email" }
    if (data.errors && typeof data.errors === "object") {
      const val = data.errors[fieldName];
      if (Array.isArray(val)) return val[0] || null;
      if (typeof val === "string") return val;
    }

    return null;
  };

  return (
    <div className="my-auto w-full max-w-md space-y-7">
      {/* Admin Portal Heading */}
      <div className="space-y-3">
        <div className="h-px w-12 bg-[#9D8974]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D8974]">
          Administration
        </p>

        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#211F1C] sm:text-4xl">
          Admin Portal
          <span className="mt-1 block italic text-[#82705C]">Sign In</span>
        </h2>

        <p className="max-w-sm text-sm leading-6 text-[#625D57]">
          Sign in to manage products, collections, inquiries, and showroom
          operations.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700"
        >
          {getErrorMessage()}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Admin Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#51463B]"
          >
            Administrator Email
          </label>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              placeholder="admin@yourcompany.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-invalid={!!getFieldError("email")}
              aria-describedby={
                getFieldError("email") ? "email-error" : undefined
              }
              className="w-full border border-[#E7E1D9] bg-[#FAF8F4] py-3.5 pl-11 pr-4 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A69B8F] focus:border-[#9D8974] focus:bg-white focus:ring-1 focus:ring-[#9D8974]/20"
            />
          </div>

          {getFieldError("email") && (
            <p id="email-error" className="text-xs text-red-600">
              {getFieldError("email")}
            </p>
          )}
        </div>

        {/* Admin Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#51463B]"
          >
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              aria-invalid={!!getFieldError("password")}
              aria-describedby={
                getFieldError("password") ? "password-error" : undefined
              }
              className="w-full border border-[#E7E1D9] bg-[#FAF8F4] py-3.5 pl-11 pr-12 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A69B8F] focus:border-[#9D8974] focus:bg-white focus:ring-1 focus:ring-[#9D8974]/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9D8974] transition-colors hover:text-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {getFieldError("password") && (
            <p id="password-error" className="text-xs text-red-600">
              {getFieldError("password")}
            </p>
          )}
        </div>

        {/* Admin Sign In */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 inline-flex w-full items-center justify-center gap-3 border border-[#211F1C] bg-[#211F1C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-[#51463B] hover:bg-[#51463B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isPending ? "Authenticating..." : "Sign In to Admin"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Admin Security Notice */}
      <div className="border-t border-[#E7E1D9] pt-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9D8974]" />
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#51463B]">
              Restricted Access
            </p>
            <p className="text-xs leading-5 text-[#625D57]">
              This area is reserved for authorized administrators. If you need
              access, contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
