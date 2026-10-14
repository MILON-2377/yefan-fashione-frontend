import {
    DirectUploadParams,
    UploadIntentResponse,
    FinalizeUploadResponse,
} from "../types/mediaTypes";
import { createUploadIntent } from "../api/createUploadIntent";
import { ApiError } from "@/lib/errors/ApiError";
import { finalizeUpload } from "../api/finalizeUpload";

export class MediaUploadError extends Error {
    constructor(
        message: string,
        public step: "INTENT" | "CLOUDINARY" | "FINALIZE",
        public originalError?: unknown
    ) {
        super(message);
        this.name = "MediaUploadError";
    }
}

export async function uploadToCloudinary({
    file,
    entityId,
    namespace,
    mediaType = "IMAGE",
}: DirectUploadParams): Promise<string> {
    // Guard against zero-byte or unselected files
    if (!file || file.size === 0) {
        throw new MediaUploadError("Cannot upload an empty or invalid file.", "INTENT");
    }

    // 1. Request signed upload parameters from Backend
    let intent: UploadIntentResponse;
    try {
        intent = await createUploadIntent({
            storage_provider: "cloudinary",
            entity_id: entityId,
            namespace,
            media_type: mediaType,
            mime_type: file.type,
            original_filename: file.name,
        });
    } catch (error) {
        const message =
            error instanceof ApiError
                ? error.message
                : "Failed to obtain upload authorization intent from backend.";
        throw new MediaUploadError(message, "INTENT", error);
    }

    // 2. Stream Binary File directly to Cloudinary CDN
    const formData = new FormData();
    formData.append("file", file);

    Object.entries(intent.upload_params).forEach(([key, value]) => {
        formData.append(key, value);
    });

    let cloudinaryRes: Response;
    try {
        cloudinaryRes = await fetch(intent.upload_url, {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new MediaUploadError(
            "Network connection failure during direct transfer to cloud storage.",
            "CLOUDINARY",
            error
        );
    }

    if (!cloudinaryRes.ok) {
        const errorText = await cloudinaryRes
            .text()
            .catch(() => "Unknown storage rejection");
        throw new MediaUploadError(
            `Cloudinary rejected file transfer (HTTP ${cloudinaryRes.status}): ${errorText}`,
            "CLOUDINARY"
        );
    }

    // 3. Finalize and persist session reference in DB
    try {
        const finalized: FinalizeUploadResponse = await finalizeUpload(
            intent.upload_session_id
        );
        return finalized.media_asset_id || intent.media_asset_id;
    } catch (error) {
        const message =
            error instanceof ApiError
                ? error.message
                : "Failed to confirm media finalization with database server.";
        throw new MediaUploadError(message, "FINALIZE", error);
    }
}
