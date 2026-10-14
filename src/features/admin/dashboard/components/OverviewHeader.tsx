import Link from "next/link";
import { FolderDown, Plus } from "lucide-react";

export function OverviewHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">
          Showroom Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time activity across your luxury catalog, buyer RFQs, and client reviews.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/catalogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
        >
          <FolderDown className="w-4 h-4" />
          <span>Upload Lookbook</span>
        </Link>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 text-sm font-medium rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Garment</span>
        </Link>
      </div>
    </div>
  );
}
