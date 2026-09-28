"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Invalid credentials");
      }

      router.push("/products");
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white text-slate-900">
      {/* Left Column: High-Fashion Editorial Imagery */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80"
          alt="Celestial Mulberry Evening Gown"
          fill
          priority
          sizes="(max-width: 1200px) 50vw, 40vw"
          className="object-cover object-top opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />

        <div className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-between text-white z-10">
          <Link
            href="/"
            className="text-xl font-black tracking-widest uppercase"
          >
            YIFAN <span className="text-blue-400 font-light">ATELIER</span>
          </Link>

          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Desk</span>
            </div>
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
              Welcome Back to Your Fashion Production Hub
            </h1>
            <p className="text-xs xl:text-sm text-slate-300 leading-relaxed">
              Track open tech-pack quotes, inspect sample approvals, and review
              active production runs in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Encrypted Wholesale Authentication</span>
          </div>
        </div>
      </div>

      {/* Right Column: Portal Sign-In Form */}
      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-12 xl:p-16 lg:overflow-y-auto">
        <div className="max-w-md w-full space-y-6 my-auto">
          <div className="space-y-2">
            <Link
              href="/"
              className="lg:hidden text-lg font-black tracking-widest uppercase text-slate-900 inline-block mb-2"
            >
              YIFAN <span className="text-blue-600 font-light">ATELIER</span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Wholesale Portal Sign In
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Access your saved collections, production schedules, and
              tech-packs.
            </p>
          </div>

          {registered && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-medium">
              Account registered successfully. Please log in with your
              credentials.
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Business Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
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
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
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
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-xs font-bold">
          Loading portal...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
