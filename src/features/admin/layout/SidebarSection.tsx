// src/features/admin/layout/SidebarNavLink.tsx
import React from "react";
import Link from "next/link";
import { SidebarNavItem } from "./sidebar.data";

interface SidebarNavLinkProps {
  item: SidebarNavItem;
  isCollapsed?: boolean;
  onClose?: () => void;
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  item,
  isCollapsed,
  onClose,
}) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
        isCollapsed ? "justify-center" : ""
      } text-slate-400 hover:text-slate-100 hover:bg-slate-800/60`}
      title={isCollapsed ? item.label : undefined}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );
};
