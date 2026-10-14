"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminSidebarNavigation } from "./sidebar.data";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavLink } from "./SidebarNavLink";
import { UserRole } from "@/features/auth/types";

interface AdminSidebarProps {
  userRole: UserRole;
  isOpen?: boolean;
  onClose?: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
} as const;

export function AdminSidebar({
  userRole,
  isOpen = false,
  onClose,
}: AdminSidebarProps) {
  // Prevent body scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Filter sections and items based on user role if roles are defined on nav items
  const filteredNavigation = adminSidebarNavigation
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.allowedRoles || item.allowedRoles.includes(userRole),
      ),
    }))
    .filter((section) => section.items.length > 0);
  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 w-64 border-r border-slate-800">
      <SidebarHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        {filteredNavigation.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {section.title}
            </p>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <SidebarNavLink key={item.href} item={item} onClose={onClose} />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Animated Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Smooth Fading Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Smooth Spring-Sliding Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="relative z-10 flex-1 max-w-xs w-full h-full"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
