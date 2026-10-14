import { Layers, Clock } from "lucide-react";

export function LoginBrandBanner() {
  return (
    <div className="w-full bg-slate-900 text-slate-200 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono uppercase text-[10px] tracking-wider text-slate-400">
            SS26 Production Runs Active
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-slate-300">
            Guangzhou Facility Operating at Full Capacity
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-400" /> 24h Sample turnaround
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Layers className="w-3 h-3 text-blue-400" /> Custom Tech-Packs
          </span>
        </div>
      </div>
    </div>
  );
}
