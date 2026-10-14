import { adminFetch } from '@/api';
import { UploadIntentRequest, UploadIntentResponse } from '../types/mediaTypes';


export async function createUploadIntent(
    payload: UploadIntentRequest,
): Promise<UploadIntentResponse> {
    return adminFetch<UploadIntentResponse>("/storage/upload-intents", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
