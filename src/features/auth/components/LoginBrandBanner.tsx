import { Lock, ShieldCheck } from "lucide-react";



export function LoginBrandBanner() {
  return (
    <div className="w-full border-b border-[#51463B] bg-[#211F1C] px-4 py-2.5 text-[#FAF8F4]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
        {/* Admin System Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B5A18B] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B5A18B]" />
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#D8C9B8]">
            Administration Portal
          </span>

          <span className="mx-1 hidden text-[#625D57] sm:inline">/</span>

          <span className="hidden text-[11px] text-[#C7BEB3] sm:inline">
            Authorized Personnel Only
          </span>
        </div>

        {/* Security & Access Information */}
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#D8C9B8]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#B5A18B]" />
            <span>Secure Admin Access</span>
          </span>

          <span className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#D8C9B8] md:flex">
            <Lock className="h-3.5 w-3.5 text-[#B5A18B]" />
            <span>Restricted Area</span>
          </span>
        </div>
      </div>
    </div>
  );
}


