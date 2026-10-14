import { NavItem } from "@/types/admin";
import {
  LayoutDashboard,
  Package,
  Layers,
  Tags,
  Boxes,
  Users,
  Settings,
  LucideIcon,
  ShieldCheck,
  UserPlus,
  BookOpen,
  MessageSquareText,
  Video,
  Star,
} from "lucide-react";

export interface SidebarNavItem extends Omit<NavItem, "iconName"> {
  icon: LucideIcon;
  exactMatch?: boolean;
}

export interface NavSection {
  title: string;
  items: SidebarNavItem[];
}

export const adminSidebarNavigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exactMatch: true,
      },
      {
        label: "Administrators",
        href: "/admin/administrators",
        icon: ShieldCheck,
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        label: "Provision Admin",
        href: "/admin/administrators/new",
        icon: UserPlus,
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        label: "Team & Access",
        href: "/admin/users",
        icon: Users,
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        allowedRoles: ["SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Catalog Management",
    items: [
      {
        label: "Products",
        href: "/admin/catalog/products",
        icon: Package,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "Categories",
        href: "/admin/catalog/categories",
        icon: Layers,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "Collections",
        href: "/admin/catalog/collections",
        icon: Boxes,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "Brands",
        href: "/admin/catalog/brands",
        icon: Tags,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "Catalogs",
        href: "/admin/catalog/catalogs",
        icon: Tags,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    title: "Operations & Support",
    items: [
      {
        label: "Inquiries",
        href: "/admin/inquiries",
        icon: MessageSquareText,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "Client Reviews",
        href: "/admin/reviews",
        icon: Star,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    title: "Content & AI Knowledge",
    items: [
      {
        label: "Company Knowledge",
        href: "/admin/company-knowledge",
        icon: BookOpen,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        label: "About Videos",
        href: "/admin/about-videos",
        icon: Video,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];
