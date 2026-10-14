"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Sparkles, X } from "lucide-react";
import { useMediaUpload } from "../hooks/useMediaUpload";
import {
  MediaUploaderProps,
  UploadedMediaResult,
  MediaType,
} from "../types/mediaTypes";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function MediaUploader({
  mode = "single",
  previewUrls = [],
  maxSizeMB = 10,
  acceptedTypes = "image/png, image/jpeg, image/webp, image/avif",
  disabled = false,
  onUploadSuccess,
  onRemovePreview,
  entityId = "draft",
  namespace = "general",
}: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { uploadMedia, isUploading, error } = useMediaUpload();

  // Utility to determine backend MediaType enum based on file MIME type
  const resolveMediaType = (mimeType: string): MediaType => {
    if (mimeType.startsWith("video/")) return "VIDEO";
    if (mimeType === "application/pdf") return "PDF";
    return "IMAGE";
  };

  // Check if file matches acceptedTypes string pattern
  const isTypeAccepted = (file: File) => {
    if (!acceptedTypes || acceptedTypes === "*") return true;
    const acceptedList = acceptedTypes
      .split(",")
      .map((t) => t.trim().toLowerCase());
    const fileMime = file.type.toLowerCase();
    return acceptedList.some((accepted) => {
      if (accepted.endsWith("/*")) {
        const baseType = accepted.replace("/*", "");
        return fileMime.startsWith(baseType);
      }
      return accepted === fileMime;
    });
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(
      (file) => isTypeAccepted(file) && file.size <= maxSizeMB * 1024 * 1024,
    );

    if (!validFiles.length) return;

    const filesToProcess = mode === "single" ? [validFiles[0]] : validFiles;

    const uploadPromises = filesToProcess.map(async (file) => {
      const previewUrl = URL.createObjectURL(file);

      // Backend schema requires a valid UUID v4 string
      const validEntityId =
        entityId && UUID_REGEX.test(entityId) ? entityId : crypto.randomUUID();

      const mediaAssetId = await uploadMedia({
        file,
        entityId: validEntityId,
        namespace,
        mediaType: resolveMediaType(file.type),
      });

      if (!mediaAssetId) {
        URL.revokeObjectURL(previewUrl);
        return null;
      }

      return {
        mediaAssetId,
        previewUrl,
        file,
      };
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(
      (res): res is UploadedMediaResult => res !== null,
    );

    if (successfulUploads.length > 0) {
      onUploadSuccess(successfulUploads);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && !isUploading && e.dataTransfer.files?.length) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone Container */}
      {(mode === "multiple" || previewUrls.length === 0) && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() =>
            !isUploading && !disabled && fileInputRef.current?.click()
          }
          className={`relative group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all ${
            disabled || isUploading
              ? "opacity-60 cursor-not-allowed bg-slate-50 border-slate-200"
              : isDragging
                ? "border-blue-500 bg-blue-50/40 ring-4 ring-blue-500/10 cursor-pointer"
                : "border-slate-300 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-400 cursor-pointer"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept={acceptedTypes}
            multiple={mode === "multiple"}
            disabled={disabled || isUploading}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(Array.from(e.target.files));
                e.target.value = "";
              }
            }}
          />

          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Upload className="w-5 h-5 text-slate-700 stroke-[1.75]" />
          </div>

          <p className="text-xs font-semibold text-slate-800">
            {isUploading ? (
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                Uploading assets to storage...
              </span>
            ) : (
              <>
                Click to browse files{" "}
                <span className="font-normal text-slate-500">
                  or drag & drop images here
                </span>
              </>
            )}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            Max file size {maxSizeMB}MB
          </p>
        </div>
      )}

      {/* Error Message Display */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-mono">
          {error}
        </div>
      )}

      {/* Single Preview View */}
      {mode === "single" && previewUrls.length > 0 && (
        <div className="relative w-full h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={previewUrls[0]}
            alt="Asset Preview"
            fill
            unoptimized={previewUrls[0].startsWith("blob:")}
            className="object-contain p-4"
          />
          {onRemovePreview && (
            <button
              type="button"
              onClick={() => onRemovePreview(0)}
              disabled={disabled || isUploading}
              className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-lg transition-colors shadow-md"
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
