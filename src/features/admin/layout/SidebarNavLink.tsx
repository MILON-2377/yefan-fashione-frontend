"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "./sidebar.data";

interface SidebarNavLinkProps {
  item: SidebarNavItem;
  onClose?: () => void;
}

export function SidebarNavLink({ item, onClose }: SidebarNavLinkProps) {
  const pathname = usePathname();

  const isActive = item.exactMatch
    ? pathname === item.href
    : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        isActive
          ? "bg-amber-500/10 text-amber-400 font-semibold"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
      }`}
    >
      <Icon
        className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`}
      />
      {/* Display item.label here */}
      <span>{item.label}</span>

      {item.badgeCount !== undefined && item.badgeCount > 0 && (
        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded-full">
          {item.badgeCount}
        </span>
      )}
    </Link>
  );
}
