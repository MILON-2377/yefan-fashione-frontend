"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { UpdateProductInput } from "../../schemas/product.edit";

export function EditCustomizationSection() {
  const { register } = useFormContext<UpdateProductInput>();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-semibold text-slate-900 font-serif">
          Made-to-Order & Customization Services
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enable or disable custom fitting services and notes.
        </p>
      </div>

      <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
        <input
          type="checkbox"
          {...register("customization.is_customizable")}
          className="mt-0.5 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
        />
        <div>
          <span className="block text-xs font-semibold text-slate-900">
            Enable Bespoke / Made-to-Order Service
          </span>
          <span className="block text-[11px] text-slate-500 mt-0.5">
            Allows clients to request custom measurements or specific
            alterations.
          </span>
        </div>
      </label>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
          Customization Policies & Notes
        </label>
        <textarea
          {...register("customization.notes")}
          rows={3}
          placeholder="Provide lead time info, alteration rules, or return policies..."
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-y"
        />
      </div>
    </div>
  );
}
