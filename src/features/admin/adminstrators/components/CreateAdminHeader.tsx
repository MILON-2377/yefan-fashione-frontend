"use client";

import Link from "next/link";
import { ArrowLeft, UserPlus, ChevronRight } from "lucide-react";

export function CreateAdminHeader() {
  return (
    <div className="space-y-3">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link
          href="/administrators"
          className="hover:text-slate-900 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
          <span>Administrators</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-semibold">
          Provision New Administrator
        </span>
      </nav>

      {/* Main Page Title */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl">
          <UserPlus className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Provision Administrator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure authorization credentials and system privileges for new
            portal operators.
          </p>
        </div>
      </div>
    </div>
  );
}
