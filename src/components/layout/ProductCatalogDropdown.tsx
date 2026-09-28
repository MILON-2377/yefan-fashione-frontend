"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCatalogDropdown({categories}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors ${
          isOpen
            ? "bg-slate-100 text-blue-600"
            : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
        }`}
        aria-expanded={isOpen}
      >
        <span>Products</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div className="w-[520px] p-3.5 bg-white border border-slate-200 rounded-xl shadow-xl">
              {/* Header */}
              <div className="px-3 py-1.5 border-b border-slate-100 mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[11px] font-semibold tracking-wider text-slate-800 uppercase">
                    Product Catalog
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {categories.length} Categories
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={cat.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                  >
                    <Link
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="group block p-3 rounded-lg bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-150"
                    >
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                        <span>{cat.title}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500 group-hover:text-slate-600">
                        {cat.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Quote CTA Bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
                <span className="text-slate-500">Custom OEM specifications needed?</span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}










// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { ChevronDown, ArrowRight, Layers } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PRODUCT_CATEGORIES } from "./navigation-data";

// export function ProductCatalogDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setIsOpen(false);
//     }, 150);
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Trigger Button */}
//       <button
//         type="button"
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={`flex items-center gap-1.5 font-medium text-xs tracking-wide uppercase px-3 py-2 rounded-md transition-colors ${
//           isOpen
//             ? "bg-slate-800 text-white"
//             : "text-slate-300 hover:text-white hover:bg-slate-800/80"
//         }`}
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//       >
//         <span>Products</span>
//         <ChevronDown
//           className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
//             isOpen ? "rotate-180 text-blue-400" : ""
//           }`}
//         />
//       </button>

//       {/* Controlled Animated Megamenu Popover */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 8, scale: 0.97 }}
//             transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute left-0 top-full pt-2 z-50"
//           >
//             <div className="w-[520px] p-3.5 bg-slate-950/95 border border-slate-800/90 rounded-xl shadow-2xl backdrop-blur-md">
              
//               {/* Header Info */}
//               <div className="px-3 py-1.5 border-b border-slate-800/80 mb-2.5 flex items-center justify-between">
//                 <div className="flex items-center gap-1.5">
//                   <Layers className="w-3.5 h-3.5 text-blue-400" />
//                   <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
//                     Product Catalog
//                   </span>
//                 </div>
//                 <span className="text-[10px] text-slate-500 font-medium">
//                   {PRODUCT_CATEGORIES.length} Categories
//                 </span>
//               </div>

//               {/* Grid with Staggered Entrance Animations */}
//               <div className="grid grid-cols-2 gap-2">
//                 {PRODUCT_CATEGORIES.map((cat, idx) => (
//                   <motion.div
//                     key={cat.href}
//                     initial={{ opacity: 0, y: 6 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{
//                       duration: 0.2,
//                       delay: idx * 0.03,
//                       ease: "easeOut",
//                     }}
//                   >
//                     <Link
//                       href={cat.href}
//                       onClick={() => setIsOpen(false)}
//                       className="group block p-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 hover:border-blue-500/50 transition-all duration-150"
//                     >
//                       <div className="text-xs font-semibold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
//                         <span>{cat.title}</span>
//                         <ArrowRight className="w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
//                       </div>
//                       <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-400 group-hover:text-slate-300">
//                         {cat.description}
//                       </p>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Bottom Custom Inquiry Bar */}
//               <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between px-2 text-[11px]">
//                 <span className="text-slate-400">Need custom specifications or OEM manufacturing?</span>
//                 <Link
//                   href="/contact"
//                   onClick={() => setIsOpen(false)}
//                   className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1"
//                 >
//                   <span>Request Quote</span>
//                   <ArrowRight className="w-3 h-3" />
//                 </Link>
//               </div>

//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }