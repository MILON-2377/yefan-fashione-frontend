"use client";

import { Product } from "../../types/display";
import { ProductTableRow } from "./ProductTableRow";
import { PackageX } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onDeleteClick: (product: Product) => void;
}

export function ProductTable({
  products,
  isLoading,
  onDeleteClick,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-slate-100/80 animate-pulse rounded-lg w-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <PackageX className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">
          No products found
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No matching products were found. Try updating your filters or add a
          new product to your catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Updated</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
