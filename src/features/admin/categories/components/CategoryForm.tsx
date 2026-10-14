"use client";

import { useFormContext } from "react-hook-form";
import { Lock } from "lucide-react";
import { CategoryFormInput } from "../schemas/categorySchema";

interface CategoryFormProps {
  isEditing?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function CategoryForm({
  isEditing = false,
  onCancel,
  onSuccess,
}: CategoryFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CategoryFormInput>();

  return (
    <div className="space-y-6">
      {/* Category Identity Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-slate-900 font-mono uppercase tracking-wider">
          Category Identity
        </h2>

        {/* Category Name */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
            Category Name <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g. Leather Goods"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
          {errors.name && (
            <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
            Category Overview / Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Provide a brief overview for catalog classification..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all resize-none"
          />
        </div>
      </div>
      {/* Record Status Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 font-mono uppercase tracking-wider">
            Record Status
          </h2>
          {!isEditing && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <Lock className="w-3 h-3" /> Locked on creation
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
              Publication Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-800 space-y-1">
            <p className="font-semibold font-mono">Initial Status: Draft</p>
            <p className="text-amber-700/90 leading-relaxed">
              New categories are created in Draft status by default. You can
              publish after attaching a cover image asset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
