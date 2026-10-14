"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { UpdateProductInput } from "../../schemas/product.edit";
import { useBrands } from "@/features/admin/brands/hooks/useBrands";
import { useCollections } from "@/features/admin/collections/hooks/useCollections";
import { useCategories } from "@/features/admin/categories/hooks/useCategories";

export function EditBasicInfoSection() {
  const { data: brands } = useBrands();
  const { data: collections } = useCollections();
  const { data: categories } = useCategories();

  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateProductInput>();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-serif">
            General Identification
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Update brand taxonomy, collection grouping, product naming, and
            status.
          </p>
        </div>

        {/* Product Status Field */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Brand */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
            Brand <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("brand_id")}
            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
          >
            <option value="">Select Brand</option>
            {brands?.items?.map((b: any) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.brand_id && (
            <p className="text-xs text-rose-600 mt-1">
              {errors.brand_id.message}
            </p>
          )}
        </div>

        {/* Collection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
            Collection <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("collection_id")}
            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
          >
            <option value="">Select Collection</option>
            {collections?.items?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.collection_id && (
            <p className="text-xs text-rose-600 mt-1">
              {errors.collection_id.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("category_id")}
            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
          >
            <option value="">Select Category</option>
            {categories?.items?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-xs text-rose-600 mt-1">
              {errors.category_id.message}
            </p>
          )}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
          Product Name <span className="text-rose-500">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="e.g. Celestia Silk Gown"
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
        />
        {errors.name && (
          <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
          Product Description
        </label>
        <textarea
          {...register("description")}
          rows={5}
          placeholder="Provide product description..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-y"
        />
        {errors.description && (
          <p className="text-xs text-rose-600 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
