"use client";

import Link from "next/link";
import { Edit2, Trash2, Folder } from "lucide-react";
import {
  Category,
  CategoryListItemResponse,
} from "@/features/admin/categories/types";
import { RecordStatus } from "@/features/admin/brands/types";
import Image from "next/image";

interface CategoryTableRowProps {
  category: CategoryListItemResponse;
  parentCategory?: CategoryListItemResponse;
  onDeleteClick: (category: Category) => void;
}

function getStatusBadgeStyles(status: RecordStatus) {
  switch (status) {
    case "PUBLISHED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "ARCHIVED":
      return "bg-slate-100 text-slate-600 border-slate-200";
    case "DRAFT":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export function CategoryTableRow({
  category,
  onDeleteClick,
}: CategoryTableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      {/* Name & Cover Image */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {category?.image?.url ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/80 bg-slate-50">
              <Image
                src={category.image.url}
                alt={category.name || "Category thumbnail"}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg shrink-0 border border-slate-200/80 bg-slate-100/80 flex items-center justify-center text-slate-400">
              <Folder className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0">
            <span className="font-semibold text-slate-900 block truncate text-sm">
              {category.name}
            </span>
            {category.description && (
              <span className="text-xs text-slate-500 block truncate max-w-xs">
                {category.description}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Slug */}
      <td className="py-3 px-4 font-mono text-xs text-slate-600">
        {category.slug}
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold uppercase tracking-wider ${getStatusBadgeStyles(
            category.status,
          )}`}
        >
          {category.status}
        </span>
      </td>

      {/* Created At */}
      <td className="py-3 px-4 font-mono text-xs text-slate-500">
        {new Date(category.created_at).toLocaleDateString()}
      </td>

      {/* Updated At */}
      <td className="py-3 px-4 font-mono text-xs text-slate-500">
        {new Date(category.updated_at).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/admin/catalog/categories/${category.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Edit Category"
          >
            <Edit2 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onDeleteClick(category as unknown as Category)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
