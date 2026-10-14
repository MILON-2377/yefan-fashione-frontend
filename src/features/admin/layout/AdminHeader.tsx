"use client";

import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import { CurrentUser } from "@/features/auth/types";
import { AdminUser } from "@/types/admin";

interface HeaderProps {
  // Accepts either AdminUser or CurrentUser (supports optional/missing name fields)
  currentUser: (Partial<AdminUser> & Partial<CurrentUser>) | CurrentUser;
  onMobileMenuToggle: () => void;
}

export function AdminHeader({ currentUser, onMobileMenuToggle }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const userObj = currentUser as Partial<AdminUser> & Partial<CurrentUser>;

  const displayName =
    userObj.name ||
    userObj.displayName ||
    userObj.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .slice(0, 2)
    .toUpperCase();

  // Safely format role string
  const formattedRole = currentUser.role
    ? currentUser.role.replace(/_/g, " ")
    : "USER";

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Toggle */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="sm:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Toggle mobile search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* User Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-semibold text-xs shrink-0 ring-2 ring-slate-100">
            {initials}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-semibold text-slate-800 leading-none">
              {displayName}
            </p>
            <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider leading-none">
              {formattedRole}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Search Expandable Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-0 h-16 bg-white px-4 flex items-center gap-2 border-b border-slate-200 z-30 sm:hidden">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search catalog..."
            className="w-full text-sm bg-transparent focus:outline-none text-slate-800"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
}
