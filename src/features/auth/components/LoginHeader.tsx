import Link from "next/link";
import { Sparkles, ShieldCheck, Globe2 } from "lucide-react";

export function LoginHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E7E1D9] bg-[#FAF8F4]/95 backdrop-blur-md">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand & Admin Workspace Identity */}
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <Link
            href="/"
            className="flex items-center transition-opacity duration-200 hover:opacity-80"
            aria-label="Yee Fans Haute Couture Homepage"
          >
            <span className="text-lg font-semibold uppercase tracking-[0.16em] text-[#211F1C] sm:text-xl">
              YEE FANS
            </span>
            <span className="ml-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974] sm:inline">
              Haute Couture
            </span>
          </Link>

          <span className="hidden h-6 w-px bg-[#D8C9B8] md:block" />

          <div className="hidden items-center gap-1.5 border border-[#E7E1D9] bg-[#F0ECE6] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#625D57] md:inline-flex">
            <Sparkles className="h-3 w-3 shrink-0 text-[#9D8974]" />
            <span>Admin Workspace</span>
          </div>
        </div>

        {/* Admin Portal Status & Support */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-6">
          <div className="hidden items-center gap-2 text-xs text-[#625D57] md:flex">
            <Globe2 className="h-3.5 w-3.5 shrink-0 text-[#9D8974]" />
            <span>Showroom Management System</span>
          </div>

          <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#625D57] xl:flex">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#9D8974]" />
            <span>Restricted Access</span>
          </div>

          {/* <a
            href="mailto:wholesale@yifan-atelier.com"
            className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-white px-3 py-2 text-xs font-medium text-[#51463B] transition-colors duration-200 hover:border-[#9D8974] hover:bg-[#F0ECE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2 sm:px-4"
          >
            <PhoneCall className="h-3.5 w-3.5 shrink-0 text-[#9D8974]" />
            <span className="hidden sm:inline">Admin Support</span>
            <span className="sm:hidden">Support</span>
          </a> */}
        </div>
      </div>
    </header>
  );
}
