"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { ApiError } from "@/lib/errors/ApiError";

export function LoginForm() {
  const router = useRouter();
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

    loginUser(
      {
        email: formData.email,
        password: formData.password,
        device_name: getDeviceName(),
      },
      {
        onSuccess: () => {
          router.push("/admin");
        },
      },
    );
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
    <div className="max-w-md w-full space-y-6 my-auto">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
          Wholesale Portal Sign In
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Access your saved collections, production schedules, and tech-packs.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {getErrorMessage()}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
            Corporate Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="buyer@maisonluxe.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
            />
          </div>
          {getFieldError("email") && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">
              {getFieldError("email")}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {getFieldError("password") && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">
              {getFieldError("password")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md disabled:opacity-50"
        >
          <span>{isPending ? "Authenticating..." : "Sign In to Portal"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
        New prospective buyer?{" "}
        <Link
          href="/signup"
          className="font-extrabold text-blue-600 hover:underline"
        >
          Request Partner Access
        </Link>
      </div>
    </div>
  );
}
