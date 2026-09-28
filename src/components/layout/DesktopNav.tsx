"use client";

import Link from "next/link";
import { MAIN_NAV_LINKS } from "./navigation-data";
import { ProductCatalogDropdown } from "./ProductCatalogDropdown";

export function DesktopNav({categories}) {
  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
      <Link
        href="/"
        className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
      >
        Home
      </Link>

      <ProductCatalogDropdown categories={categories} />

      {MAIN_NAV_LINKS.slice(1).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}








// "use client";

// import Link from "next/link";
// import { MAIN_NAV_LINKS } from "./navigation-data";
// import { ProductCatalogDropdown } from "./ProductCatalogDropdown";

// export function DesktopNav() {
//   return (
//     <nav
//       className="hidden lg:flex items-center gap-1"
//       aria-label="Main Navigation"
//     >
//       {/* Home Link */}
//       <Link
//         href="/"
//         className="text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
//       >
//         Home
//       </Link>

//       {/* Separated Controlled Catalog Component */}
//       <ProductCatalogDropdown />

//       {/* Dynamic Main Nav Links */}
//       {MAIN_NAV_LINKS.slice(1).map((link) => (
//         <Link
//           key={link.href}
//           href={link.href}
//           className="text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors"
//         >
//           {link.title}
//         </Link>
//       ))}
//     </nav>
//   );
// }
