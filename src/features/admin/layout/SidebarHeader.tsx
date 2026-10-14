"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface SidebarHeaderProps {
  onClose?: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
      <Link href="/admin" className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs font-serif">
          Y
        </div>
        <span className="font-serif text-sm font-semibold tracking-wide text-white uppercase">
          Yifan Atelier
        </span>
      </Link>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1 text-slate-400 hover:text-white rounded transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
