"use client";

import { useState, useCallback } from "react";
import { uploadToCloudinary } from "../upload/upload-to-cloudinary";
import { DirectUploadParams } from "../types/mediaTypes";
import { MediaUploadError } from "../errors/MediaUploadError";

export function useMediaUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadMedia = useCallback(
        async (params: DirectUploadParams): Promise<string | null> => {
            setIsUploading(true);
            setError(null);

            try {
                const mediaAssetId = await uploadToCloudinary(params);
                return mediaAssetId;
            } catch (err) {
                let errorMessage = "An unexpected error occurred during media upload.";

                if (err instanceof MediaUploadError) {
                    errorMessage = `[${err.step}] ${err.message}`;
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
                return null;
            } finally {
                setIsUploading(false);
            }
        },
        []
    );

    return {
        uploadMedia,
        isUploading,
        error,
        clearError: () => setError(null),
    };
}
