import { Suspense } from "react";
import { LoginBrandBanner } from "@/features/auth/components/LoginBrandBanner";
import { LoginHeader } from "@/features/auth/components/LoginHeader";
import { LoginEditorialSidebar } from "@/features/auth/components/LoginEditorialSidebar";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#211F1C]">
      {/* Global Announcement Header */}
      <LoginBrandBanner />

      {/* Main Portal Header */}
      <LoginHeader />

      {/* Main Split View Layout */}
      <main className="mx-auto my-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-stretch gap-6 p-4 sm:gap-8 sm:p-6 lg:grid-cols-12 lg:p-8">
        {/* Left Column: Fashion Editorial */}
        <div className="hidden min-h-145 overflow-hidden border border-[#E7E1D9] lg:col-span-5 lg:block xl:col-span-6">
          <LoginEditorialSidebar />
        </div>

        {/* Right Column: Partner Portal Sign-In */}
        <div className="flex flex-col justify-center border border-[#E7E1D9] bg-white p-6 shadow-sm sm:p-10 lg:col-span-7 lg:p-12 xl:col-span-6">
          <Suspense
            fallback={
              <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-center">
                <div className="h-px w-10 bg-[#9D8974]" />
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#625D57]">
                  Loading Partner Portal...
                </p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#E7E1D9] px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-[#82776B] sm:flex-row">
          <span>Yee Fans Haute Couture</span>
          <span>Private Client & Partner Portal</span>
        </div>
      </footer>
    </div>
  );
}
