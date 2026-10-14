"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CreateProductInput } from "../../schemas/product";

export function CustomizationSection() {
  const { control, register } = useFormContext<CreateProductInput>();

  const {
    fields: customFields,
    append: appendCustomOption,
    remove: removeCustomOption,
  } = useFieldArray({ control, name: "customization.options" });

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-semibold text-slate-900 font-serif">
          Made-to-Order & Customization Services
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enable custom fitting options and special fabric alterations.
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
            Allows clients to request custom measurements or specific alterations.
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
          placeholder="Provide lead time info, alteration rules, or return policies for custom items..."
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-y"
        />
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
            Available Options
          </h3>
          <button
            type="button"
            onClick={() =>
              appendCustomOption({
                option_type: "FABRIC",
                details: "",
                sort_order: customFields.length,
              })
            }
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Option
          </button>
        </div>

        {customFields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
          >
            <select
              {...register(`customization.options.${index}.option_type`)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono uppercase"
            >
              <option value="FABRIC">Fabric Swap</option>
              <option value="COLOR">Custom Color</option>
              <option value="SIZING">Bespoke Fit</option>
              <option value="DESIGN">Design Mod</option>
              <option value="OTHER">Other</option>
            </select>

            <input
              {...register(`customization.options.${index}.details`)}
              placeholder="e.g. Silk Dupioni option available upon request"
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />

            <button
              type="button"
              onClick={() => removeCustomOption(index)}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
