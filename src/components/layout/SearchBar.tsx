"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div ref={containerRef} className={`relative flex items-center ${className || ""}`}>
      <form
        onSubmit={handleSearch}
        className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 opacity-100 mr-2" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search SKUs, products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-8 h-9 text-xs bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-600 rounded-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setQuery("");
        }}
        className={`rounded-full h-9 w-9 shrink-0 transition-colors ${
          isOpen
            ? "bg-slate-100 text-blue-600"
            : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
        }`}
        aria-label="Toggle search"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
      </Button>
    </div>
  );
}







// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Search, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface SearchBarProps {
//   className?: string;
// }

// export function SearchBar({ className }: SearchBarProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Auto-focus input when opened
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       window.location.href = `/products?search=${encodeURIComponent(query)}`;
//     }
//   };

//   return (
//     <div ref={containerRef} className={`relative flex items-center ${className || ""}`}>
//       <form
//         onSubmit={handleSearch}
//         className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
//           isOpen ? "w-64 opacity-100 mr-2" : "w-0 opacity-0 pointer-events-none"
//         }`}
//       >
//         <div className="relative w-full">
//           <Input
//             ref={inputRef}
//             type="search"
//             placeholder="Search SKUs, products..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="pr-8 h-9 text-xs bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500 focus-visible:border-blue-500/80 rounded-lg"
//           />
//           {query && (
//             <button
//               type="button"
//               onClick={() => setQuery("")}
//               className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200 transition"
//             >
//               <X className="w-3.5 h-3.5" />
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Toggle Button */}
//       <Button
//         type="button"
//         variant="ghost"
//         size="icon"
//         onClick={() => {
//           setIsOpen(!isOpen);
//           if (isOpen) setQuery("");
//         }}
//         className={`rounded-full h-9 w-9 shrink-0 transition-colors ${
//           isOpen
//             ? "bg-slate-800 text-blue-400"
//             : "text-slate-300 hover:text-white hover:bg-slate-800/80"
//         }`}
//         aria-label="Toggle search"
//       >
//         {isOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
//       </Button>
//     </div>
//   );
// }