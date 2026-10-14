"use client";

import { useFormContext } from "react-hook-form";
import { Folder } from "lucide-react";
import { CreateCatalogFormValues } from "../schemas/createCatalogSchema";
import { useCollections } from "@/features/admin/collections/hooks/useCollections";

export function CreateCatalogBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateCatalogFormValues>();

  const { data: collectionsData, isLoading: isLoadingCollections } = useCollections();
  const collections = collectionsData?.items || [];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-900">General Information</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Provide catalog title, optional notes, and link to an existing collection.
        </p>
      </div>

      <div className="space-y-5">
        {/* Catalog Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Catalog Title <span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Spring / Summer 2026 Collection Tech-Pack"
            {...register("title")}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
          {errors.title && (
            <p className="text-[11px] text-rose-600 font-medium">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Collection Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Link to Collection <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <select
              {...register("collection_id")}
              disabled={isLoadingCollections}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all appearance-none disabled:opacity-50"
            >
              <option value="">
                {isLoadingCollections
                  ? "Loading collections..."
                  : "No Collection Linked (Standalone)"}
              </option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            <Folder className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Summary Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Summary / Description</label>
          <textarea
            rows={4}
            placeholder="Provide brief details about MOQ tiers, fabric options, or season highlights..."
            {...register("description")}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}
