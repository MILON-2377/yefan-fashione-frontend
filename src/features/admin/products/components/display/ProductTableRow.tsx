"use client";

import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Package } from "lucide-react";
import { Product, RecordStatus } from "../../types/display";

interface ProductTableRowProps {
  product: Product;
  onDeleteClick: (product: Product) => void;
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

export function ProductTableRow({
  product,
  onDeleteClick,
}: ProductTableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors group">
      {/* Product Image & Info */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          {product.image?.url ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/80 bg-slate-50">
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg shrink-0 border border-slate-200/80 bg-slate-100/80 flex items-center justify-center text-slate-400">
              <Package className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0">
            <span className="font-semibold text-slate-900 block truncate text-sm">
              {product.name}
            </span>
            {product.description && (
              <span className="text-xs text-slate-500 block truncate max-w-xs">
                {product.description}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Product Code */}
      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
        {product.product_code || "—"}
      </td>

      {/* Status Badge */}
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-mono font-semibold uppercase tracking-wider ${getStatusBadgeStyles(
            product.status,
          )}`}
        >
          {product.status}
        </span>
      </td>

      {/* Created At */}
      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
        {new Date(product.created_at).toLocaleDateString()}
      </td>

      {/* Updated At */}
      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
        {new Date(product.updated_at).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/admin/catalog/products/${product.id}`}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onDeleteClick(product)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
