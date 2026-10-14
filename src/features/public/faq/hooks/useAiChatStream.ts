import { useState, useRef, useCallback } from "react";
import { ChatMessage } from "../types/chatTypes";
import { streamAiChat } from "../api/chatApi";

export function useAiChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userContent: string) => {
      if (!userContent.trim() || isStreaming) return;

      setError(null);
      setIsStreaming(true);

      const userMessage: ChatMessage = { role: "user", content: userContent };

      // 1. Prepare history for API (Only include valid non-empty user messages)
      const payloadMessages = [...messages, userMessage].filter(
        (m) => m.role === "user" && m.content.trim().length > 0
      );

      // 2. Add user message and empty assistant placeholder to UI state
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "" },
      ]);

      abortControllerRef.current = new AbortController();

      try {
        await streamAiChat(
          { messages: payloadMessages },
          (chunk: string) => {
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
                newMessages[lastIndex] = {
                  ...newMessages[lastIndex],
                  content: newMessages[lastIndex].content + chunk,
                };
              }
              return newMessages;
            });
          },
          abortControllerRef.current.signal
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("AI Chat stream aborted by user");
        } else {
          console.error("Error during AI Chat Stream:", err);
          setError("Failed to get response from AI Assistant. Please try again.");

          // Clean up the empty assistant placeholder message if no chunks were received
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === "assistant" && lastMsg.content === "") {
              return prev.slice(0, -1);
            }
            return prev;
          });
        }
      } finally {
        // ALWAYS stop the streaming/loading state
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    stopStream();
    setMessages([]);
    setError(null);
  }, [stopStream]);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    stopStream,
    clearChat,
  };
}
