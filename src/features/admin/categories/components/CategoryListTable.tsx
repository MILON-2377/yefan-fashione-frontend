"use client";

import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { Image as ImageIcon, Plus, Folder } from "lucide-react";
import Link from "next/link";

export function CategoryListTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useCategories({
    page,
    page_size: 10,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono text-xs">
        Loading categories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
        {error?.message || "Failed to load categories."}
      </div>
    );
  }

  const categories = data?.items ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            Categories
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage product catalog hierarchy and taxonomy.
          </p>
        </div>
        <Link
          href="/admin/catalog/categories/new"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  <Folder className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                        {cat.image?.url ? (
                          <img
                            src={cat.image.url}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {cat.name}
                        </div>
                        {cat.description && (
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-600">
                    {cat.slug}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        cat.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : cat.status === "DRAFT"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500 font-mono">
                    {new Date(cat.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/catalog/categories/${cat.id}`}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
