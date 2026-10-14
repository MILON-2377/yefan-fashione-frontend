"use client";

import Link from "next/link";
import { Phone, Mail, Globe, ArrowRight } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a href="tel:+8612345678900" className="flex items-center gap-1.5 hover:text-white transition">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            +86 123 4567 8900
          </a>
          <a href="mailto:sales@company.com" className="flex items-center gap-1.5 hover:text-white transition">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            sales@company.com
          </a>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>EN / USD</span>
          </div>
          <Link href="/contact" className="hover:text-white text-blue-400 font-medium flex items-center gap-1 transition">
            Request Sample <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
