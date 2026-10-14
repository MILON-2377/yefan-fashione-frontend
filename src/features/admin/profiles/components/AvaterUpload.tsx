"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import Image from "next/image";

interface AvatarUploadProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  entityId: string;
  onUploadSuccess: (mediaAssetId: string) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function AvatarUpload({
  avatarUrl,
  displayName,
  entityId,
  onUploadSuccess,
  disabled = false,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    uploadMedia,
    isUploading,
    error: uploadError,
    clearError,
  } = useMediaUpload();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Clean up object URLs from memory when unmounting or changing preview
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const activeImageUrl = previewUrl || avatarUrl;

  // Helper to check if URL needs unoptimized Next.js rendering
  const isUnoptimized =
    typeof activeImageUrl === "string" &&
    (activeImageUrl.startsWith("blob:") || activeImageUrl.startsWith("data:"));

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    clearError();
    setValidationError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError("Please select a valid image (JPEG, PNG, or WebP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setValidationError(`Image size must be under ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    // 1. Instantly set preview using Blob URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Reset input value early so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // 2. Upload file
    const mediaAssetId = await uploadMedia({
      file,
      entityId,
      namespace: "avatars",
      mediaType: "IMAGE",
    });

    if (mediaAssetId) {
      onUploadSuccess(mediaAssetId);
    } else {
      setPreviewUrl(null);
    }
  };

  const activeError = validationError || uploadError;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div className="relative group w-20 h-20 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {activeImageUrl ? (
            <Image
              src={activeImageUrl}
              alt={displayName || "User avatar"}
              fill
              sizes="80px"
              className="object-cover"
              priority
              unoptimized={isUnoptimized}
            />
          ) : (
            <div className="text-slate-400 font-bold text-xl uppercase select-none">
              {displayName ? displayName.charAt(0) : "U"}
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-xs z-10">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading || disabled}
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || disabled}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-2xs cursor-pointer"
            >
              {isUploading ? "Uploading..." : "Change Photo"}
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            JPG, PNG or WEBP. Maximum file size {MAX_FILE_SIZE_MB}MB.
          </p>
        </div>
      </div>

      {activeError && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-between">
          <span>{activeError}</span>
          <button
            type="button"
            onClick={() => {
              clearError();
              setValidationError(null);
            }}
            className="font-semibold underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
