import { adminFetch } from '@/api';
import { FinalizeUploadResponse } from '../types/mediaTypes';


export async function finalizeUpload(
    sessionId: string,
): Promise<FinalizeUploadResponse> {
    if (!sessionId) {
        throw new Error("Session ID is required to finalize an upload session.");
    }

    return adminFetch<FinalizeUploadResponse>(
        `/storage/upload-sessions/${sessionId}/finalize`,
        {
            method: "POST",
        }
    );
}
