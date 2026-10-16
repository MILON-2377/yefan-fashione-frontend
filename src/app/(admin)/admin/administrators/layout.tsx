"use client";

import { useAuth } from "@/features/auth/components/AuthProvider";
import { AdminLayoutSkeleton } from "@/features/admin/layout/AdminLayoutSkeleton";
import { ShieldAlert } from "lucide-react";
import { AppButton } from "@/features/common/ui/app-button";
import Link from "next/link";
import { buttonVariants } from "@/features/common/ui/button";
import { cn } from "@/lib/utils";

export default function AdministratorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <AdminLayoutSkeleton />;
  }

  if (user && user.role !== "SUPER_ADMIN") {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">
            Access Restricted
          </h2>
          <p className="text-xs text-slate-500">
            You do not have the required permissions to view administrator
            management controls. This area is restricted to Super
            Administrators.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/admin"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "w-full rounded-xl px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800",
            )}
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
