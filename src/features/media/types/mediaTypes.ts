export type StorageProvider = "cloudinary" | "s3";
export type MediaType = "IMAGE" | "VIDEO" | "PDF";

export interface UploadIntentRequest {
    storage_provider?: StorageProvider;
    entity_id: string;
    namespace: string;
    media_type: MediaType;
    mime_type: string;
    original_filename?: string;
    expires_in?: number;
}

export interface UploadIntentResponse {
    media_asset_id: string;
    upload_session_id: string;
    storage_key: string;
    upload_url: string;
    upload_params: Record<string, string>;
}

export interface FinalizeUploadResponse {
    media_asset_id: string;
    status: string;
}

export interface DirectUploadParams {
    file: File;
    entityId: string;
    namespace: string;
    mediaType?: MediaType;
    token?: string;
}

export interface UploadedMediaResult {
    mediaAssetId: string;
    previewUrl: string;
    file: File;
}

export interface MediaUploaderProps {
    mode?: "single" | "multiple";
    previewUrls?: string[];
    maxSizeMB?: number;
    acceptedTypes?: string;
    disabled?: boolean;
    onUploadSuccess: (results: UploadedMediaResult[]) => void;
    onRemovePreview?: (index: number) => void;
    entityId?: string;
    namespace?: string;
}
