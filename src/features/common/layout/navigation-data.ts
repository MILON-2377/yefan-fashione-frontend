export interface NavCategory {
  title: string;
  href: string;
  description: string;
}

export interface NavLinkItem {
  title: string;
  href: string;
}

export const PRODUCT_CATEGORIES: NavCategory[] = [
  {
    title: "Industrial Machinery",
    href: "/products?category=industrial",
    description: "CNC units, heavy milling tools, and automated equipment.",
  },
  {
    title: "Electronics & Componentry",
    href: "/products?category=electronics",
    description: "Sensors, circuit modules, semiconductors, and power drives.",
  },
  {
    title: "Raw Materials & Alloys",
    href: "/products?category=raw-materials",
    description: "Aluminum extrusions, steel alloys, and composite sheets.",
  },
  {
    title: "Custom OEM/ODM Parts",
    href: "/products?category=custom-oem",
    description: "Tailored manufacturing built strictly to client blueprints.",
  },
];

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "About Us", href: "/about" },
  { title: "Reviews", href: "/reviews" },
  { title: "Catalogs", href: "/downloads" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];
