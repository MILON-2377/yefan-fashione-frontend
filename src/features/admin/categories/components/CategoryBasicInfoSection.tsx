"use client";

import { useFormContext } from "react-hook-form";
import { CategoryFormInput } from "../schemas/categorySchema";

interface CategoryBasicInfoSectionProps {
  isEditing?: boolean;
}


export function CategoryBasicInfoSection({
  isEditing = false,
}: CategoryBasicInfoSectionProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CategoryFormInput>();

  const nameValue = watch("name") || "";
  const descriptionValue = watch("description") || "";

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Basic Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Category Name */}
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-700">
              Name <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {nameValue.length}/50
            </span>
          </div>
          <input
            {...register("name")}
            type="text"
            maxLength={50}
            placeholder="e.g. T-Shirts, Accessories, Outerwear"
            className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
          />
          {errors.name && (
            <p className="text-xs text-rose-600 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="md:col-span-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-700 block">
              Status
            </label>
            {!isEditing && (
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Default: DRAFT
              </span>
            )}
          </div>
          <select
            {...register("status")}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium ${
              !isEditing
                ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                : "bg-white text-slate-900"
            }`}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
          {errors.status && (
            <p className="text-xs text-rose-600 font-medium">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Category Description */}
        <div className="md:col-span-12 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-700">
              Description
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {descriptionValue.length}/300
            </span>
          </div>
          <textarea
            {...register("description")}
            rows={4}
            maxLength={300}
            placeholder="Brief overview of this category..."
            className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none transition-all placeholder:text-slate-400 leading-relaxed"
          />
          {errors.description && (
            <p className="text-xs text-rose-600 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
