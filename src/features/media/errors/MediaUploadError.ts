export type MediaUploadStep = "INTENT" | "CLOUDINARY" | "FINALIZE";

export class MediaUploadError extends Error {
    constructor(
        message: string,
        public readonly step: MediaUploadStep,
        public readonly cause?: unknown
    ) {
        super(message);
        this.name = "MediaUploadError";
        Object.setPrototypeOf(this, MediaUploadError.prototype);
    }
}
