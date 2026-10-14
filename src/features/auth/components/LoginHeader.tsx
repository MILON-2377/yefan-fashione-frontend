import Link from "next/link";
import { Sparkles, ShieldCheck, Globe2, PhoneCall } from "lucide-react";

export function LoginHeader() {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Workspace Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-lg sm:text-xl font-black tracking-widest uppercase text-slate-900 hover:opacity-90 transition-opacity"
            aria-label="Guangzhou Yifan Atelier Homepage"
          >
            YIFAN <span className="text-blue-600 font-light">ATELIER</span>
          </Link>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-200" />
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
            <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
            <span>Guangzhou Showroom</span>
          </div>
        </div>

        {/* B2B Portal Meta & Support Links */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Global Sourcing & Apparel OEM</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Encrypted B2B Node</span>
          </div>

          <a
            href="mailto:wholesale@yifan-atelier.com"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-all active:scale-[0.98]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Concierge Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
