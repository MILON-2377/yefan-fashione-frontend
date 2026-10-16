"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Star, Check, AlertCircle, ImageIcon } from "lucide-react";
import Image from "next/image";
import { CreateProductInput } from "../schemas/product";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";

export function ProductMediaUploader() {
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>(
    {},
  );

  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<CreateProductInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const handleUploadSuccess = (uploadedItems: UploadedMediaResult[]) => {
    const initialLength = fields.length;

    uploadedItems.forEach((item, index) => {
      const totalOrder = initialLength + index;
      const isPrimary = totalOrder === 0;

      const assetId = item.mediaAssetId || (item as any).media_asset_id;

      setLocalPreviews((prev) => ({
        ...prev,
        [assetId]: item.previewUrl,
      }));

      append({
        media_asset_id: assetId,
        alt_text: item.file.name.split(".")[0] || "Product image",
        sort_order: totalOrder,
        is_primary: isPrimary,
      });
    });
  };

  const setPrimaryImage = (selectedIndex: number) => {
    fields.forEach((_, idx) => {
      setValue(`media.${idx}.is_primary`, idx === selectedIndex, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-serif flex items-center gap-2">
            Media Studio & Gallery
            <span className="text-[10px] uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-sans">
              {fields.length} {fields.length === 1 ? "Asset" : "Assets"}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload high-resolution photography for catalog listings.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-2">
          Drop Assets
        </label>

        {/* Reusable Uploader (Multiple) */}
        <MediaUploader
          mode="multiple"
          namespace="products"
          entityId="product-draft"
          onUploadSuccess={handleUploadSuccess}
        />

        {errors.media && (
          <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.media.message}
          </p>
        )}
      </div>

      {fields.length > 0 && (
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
            Gallery Items ({fields.length})
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fields.map((field, index) => {
              const isPrimary = watch(`media.${index}.is_primary`);
              const preview =
                localPreviews[field.media_asset_id] || (field as any).url;

              return (
                <div
                  key={field.id}
                  className={`bg-white border rounded-xl p-3 shadow-sm space-y-3 relative group transition-all ${
                    isPrimary
                      ? "border-slate-900 ring-2 ring-slate-900/5 bg-slate-50/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="aspect-4/5 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative flex items-center justify-center">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Product Media Preview"
                        fill
                        unoptimized={preview.startsWith("blob:")}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="p-3 text-center text-slate-400 space-y-1">
                        <ImageIcon className="w-8 h-8 mx-auto stroke-[1.25] text-slate-300" />
                        <span className="block text-[10px] font-mono break-all text-slate-400">
                          {field.media_asset_id.substring(0, 8)}...
                        </span>
                      </div>
                    )}

                    {isPrimary ? (
                      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-slate-900/90 backdrop-blur text-amber-300 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md shadow-md">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />{" "}
                        Cover Photo
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(index)}
                        className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur hover:bg-slate-900 hover:text-white text-slate-700 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md shadow"
                      >
                        Set as Cover
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 backdrop-blur hover:bg-rose-600 hover:text-white text-slate-600 rounded-md shadow transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono mb-1">
                      Alt Description
                    </label>
                    <input
                      type="text"
                      {...register(`media.${index}.alt_text`)}
                      placeholder="e.g. Front view on model"
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-[10px] font-mono text-slate-400">
                      Sort #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(index)}
                      className={`text-[11px] font-medium inline-flex items-center gap-1 transition-colors ${
                        isPrimary
                          ? "text-slate-900 font-semibold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {isPrimary ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />{" "}
                          Selected Cover
                        </>
                      ) : (
                        "Make Cover"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
