import { Suspense } from "react";
import { LoginBrandBanner } from "@/features/auth/components/LoginBrandBanner";
import { LoginHeader } from "@/features/auth/components/LoginHeader";
import { LoginEditorialSidebar } from "@/features/auth/components/LoginEditorialSidebar";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1. Global Announcement Header */}
      <LoginBrandBanner />

      {/* 2. Main Portal Site Header */}
      <LoginHeader />

      {/* 3. Main Split View Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8 my-auto">
        {/* Left Column: High-Fashion Editorial & Brand Story */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 rounded-2xl overflow-hidden min-h-145">
          <LoginEditorialSidebar />
        </div>

        {/* Right Column: Portal Sign-In Form Container */}
        <div className="lg:col-span-7 xl:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 flex flex-col justify-center">
          <Suspense
            fallback={
              <div className="p-10 text-center text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Loading Partner Portal...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
