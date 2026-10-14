"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { UpdateProductInput } from "../../schemas/product.edit";

export function EditSizesAndColorsSection() {
  const { control, register } = useFormContext<UpdateProductInput>();

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: "colors" });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  return (
    <div className="space-y-8">
      {/* Available Colors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 font-serif">
              Color Variants
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage color options for this product.
            </p>
          </div>
          <button
            type="button"
            onClick={() => appendColor({ name: "", sort_order: colorFields.length })}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Color
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {colorFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200"
            >
              {/* Hidden ID field to maintain record identity */}
              <input type="hidden" {...register(`colors.${index}.id`)} />

              <input
                {...register(`colors.${index}.name`)}
                placeholder="e.g. Midnight Black"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 font-serif">
              Sizing Options
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify size designations available for this item.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              appendSize({
                name: "",
                sort_order: sizeFields.length,
              })
            }
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Size Row
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Size Designation</th>
                <th className="p-3.5">Sort Order</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sizeFields.map((field, index) => (
                <tr key={field.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Hidden ID field */}
                  <input type="hidden" {...register(`sizes.${index}.id`)} />

                  <td className="p-2.5">
                    <input
                      {...register(`sizes.${index}.name`)}
                      placeholder="e.g. 38 (EU)"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-mono"
                    />
                  </td>
                  <td className="p-2.5">
                    <input
                      type="number"
                      {...register(`sizes.${index}.sort_order`, { valueAsNumber: true })}
                      className="w-20 px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                    />
                  </td>
                  <td className="p-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
