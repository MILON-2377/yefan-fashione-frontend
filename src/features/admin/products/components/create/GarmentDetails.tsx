"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Shirt } from "lucide-react";
import { CreateProductInput } from "../../schemas/product";

const GARMENT_DETAIL_GROUPS = [
  {
    title: "Silhouette & Cut",
    fields: [
      { name: "garment_type", label: "Garment Type", placeholder: "e.g. Evening Gown" },
      { name: "silhouette", label: "Silhouette", placeholder: "e.g. A-Line, Mermaid" },
      { name: "length", label: "Length", placeholder: "e.g. Floor Length, Midi" },
      { name: "waistline", label: "Waistline", placeholder: "e.g. Empire, Natural" },
    ],
  },
  {
    title: "Fabrics & Linings",
    fields: [
      { name: "fabric", label: "Primary Fabric", placeholder: "e.g. 100% Mulberry Silk" },
      { name: "secondary_fabric", label: "Secondary Fabric", placeholder: "e.g. French Lace" },
      { name: "lining", label: "Lining Material", placeholder: "e.g. Silk Stretch Crepe" },
      { name: "embellishment", label: "Embellishment", placeholder: "e.g. Hand Embroidery" },
    ],
  },
  {
    title: "Neck, Sleeves & Closure",
    fields: [
      { name: "neckline", label: "Neckline", placeholder: "e.g. Sweetheart, Off-Shoulder" },
      { name: "back_style", label: "Back Style", placeholder: "e.g. Illusion Lace, Low V" },
      { name: "sleeve_type", label: "Sleeve Style", placeholder: "e.g. Bishop, Cap Sleeve" },
      { name: "sleeve_length", label: "Sleeve Length", placeholder: "e.g. Sleeveless, Long" },
      { name: "train", label: "Train Specification", placeholder: "e.g. Cathedral Train (60cm)" },
      { name: "closure", label: "Closure Type", placeholder: "e.g. Concealed Zip, Corset" },
      { name: "internal_support", label: "Internal Support", placeholder: "e.g. Built-in Corsetry" },
    ],
  },
];

export function GarmentDetailsSection() {
  const { register } = useFormContext<CreateProductInput>();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-semibold text-slate-900 font-serif">
          Couture Specs & Tailoring Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Detail the materials, closures, and structural design choices.
        </p>
      </div>

      {GARMENT_DETAIL_GROUPS.map((group, gIdx) => (
        <div key={gIdx} className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-mono bg-slate-50 p-2 rounded-md border border-slate-100 flex items-center gap-1.5">
            <Shirt className="w-3.5 h-3.5 text-slate-500" />
            {group.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {group.fields.map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider font-mono mb-1">
                  {label}
                </label>
                <input
                  {...register(`details.${name as keyof CreateProductInput["details"]}`)}
                  type="text"
                  placeholder={placeholder}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
