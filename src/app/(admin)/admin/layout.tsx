"use client";

import { useState } from "react";
import { useAuth, AuthProvider } from "@/features/auth/components/AuthProvider";
import { AdminSidebar } from "@/features/admin/layout/AdminSidebar";
import { AdminHeader } from "@/features/admin/layout/AdminHeader";
import { AdminLayoutSkeleton } from "@/features/admin/layout/AdminLayoutSkeleton";
import { ToastContainer } from "@/features/common/ui/toast/ToastContainer";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <AdminLayoutSkeleton />;
  }

  if (!user) {
    return null; // AuthProvider or a router redirect will handle redirecting to /login
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <AdminSidebar
        userRole={user.role}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          currentUser={user}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
