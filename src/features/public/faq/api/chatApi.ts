import { publicFetch } from "@/api";
import { AiChatStreamRequest } from "../types/chatTypes";

export async function streamAiChat(
  payload: AiChatStreamRequest,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const response = await publicFetch<Response>("/ai/chat/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream, text/plain, */*",
    },
    body: JSON.stringify(payload),
    signal,
    responseType: "raw",
  });

  // If response.body is missing, inspect the text response to see why the server failed
  if (!response.body) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText
        ? `Server responded with: ${errorText}`
        : "ReadableStream is not supported or response body is empty."
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(":")) continue;

      if (trimmed.startsWith("data:")) {
        const jsonStr = trimmed.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") continue;

        if (jsonStr.includes("<tool_call>") || jsonStr.includes("<function=")) {
          continue;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.content && !parsed.content.includes("<tool_call>")) {
            onChunk(parsed.content);
          }
          if (parsed.done) return;
        } catch {
          if (!jsonStr.includes("<tool_call>")) {
            onChunk(jsonStr);
          }
        }
      }
    }
  }
}
