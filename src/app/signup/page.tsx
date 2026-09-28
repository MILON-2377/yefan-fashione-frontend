"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white text-slate-900">
      {/* Left Column: High-Fashion Editorial Showcase */}
      <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
          alt="2026 Haute Couture Collection"
          fill
          priority
          sizes="(max-width: 1200px) 50vw, 40vw"
          className="object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />

        <div className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-between text-white z-10">
          <Link href="/" className="text-xl font-black tracking-widest uppercase">
            YIFAN <span className="text-blue-400 font-light">ATELIER</span>
          </Link>

          <div className="space-y-6 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>B2B Wholesale Portal</span>
            </div>
            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
              Unlock Direct Factory Tech-Packs & Custom OEM Orders
            </h1>
            <p className="text-xs xl:text-sm text-slate-300 leading-relaxed">
              Join boutique buyers worldwide accessing silk eveningwear, bespoke tailoring, and Guangzhou manufacturing schedules.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-white/15 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>2026 Season Lookbooks & Tiered Pricing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dedicated Guangzhou Sales Desk Liaison</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            © 2026 Yifan Apparel Group. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Right Column: Scrollable Registration Form */}
      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-12 xl:p-16 lg:overflow-y-auto">
        <div className="max-w-md w-full space-y-6 my-auto">
          <div className="space-y-2">
            <Link href="/" className="lg:hidden text-lg font-black tracking-widest uppercase text-slate-900 inline-block mb-2">
              YIFAN <span className="text-blue-600 font-light">ATELIER</span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Apply for Wholesale Partner Access
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Enter your boutique or corporate details to request access.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Contact Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Contact Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Boutique / Brand
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Maison Luxe"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                  />
                </div>
              </div>
            </div>

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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Phone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md disabled:opacity-50"
            >
              <span>{loading ? "Submitting Application..." : "Request Wholesale Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Already an accredited partner?{" "}
            <Link href="/login" className="font-extrabold text-blue-600 hover:underline">
              Log In to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}