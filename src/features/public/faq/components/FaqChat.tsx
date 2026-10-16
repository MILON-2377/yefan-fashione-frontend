"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Square,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAiChatStream } from "../hooks/useAiChatStream";
import { AppButton } from "@/features/common/ui/AppButton";
import { FormattedMarkdown } from "./FormattedMarkdown";

export function FaqChat() {
  const { dict } = useLanguage();
  const content = dict.faqChat;

  const { messages, isStreaming, error, sendMessage, stopStream, clearChat } =
    useAiChatStream();

  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copyError, setCopyError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isStreaming]);

  const handleSend = useCallback(
    (textToSend?: string) => {
      const query = (textToSend ?? input).trim();

      if (!query || isStreaming) return;

      // Clear the input only when sending the current draft.
      if (textToSend === undefined) {
        setInput("");
      }

      setCopyError(false);
      sendMessage(query);
    },
    [input, isStreaming, sendMessage],
  );

  const handleCopy = useCallback(async (text: string, index: number) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }

      await navigator.clipboard.writeText(text);

      if (!mountedRef.current) return;

      setCopiedIndex(index);
      setCopyError(false);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setCopiedIndex(null);
        }
      }, 2000);
    } catch {
      if (mountedRef.current) {
        setCopyError(true);
        setCopiedIndex(null);
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    if (isStreaming) {
      stopStream();
    }

    clearChat();
    setInput("");
    setCopiedIndex(null);
    setCopyError(false);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, [isStreaming, stopStream, clearChat]);

  return (
    <section
      aria-label={content.title}
      className="flex h-[680px] min-h-[480px] max-h-[80vh] flex-col overflow-hidden border border-[#E7E1D9] bg-white text-[#211F1C] shadow-[0_8px_32px_rgba(65,52,39,0.05)]"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-[#E7E1D9] bg-[#FAF8F4] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#806B55]">
            <Bot className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-[#211F1C]">
                {content.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 border border-[#D8C9B8] bg-white px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[#806B55]">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isStreaming ? "animate-pulse bg-[#9D8974]" : "bg-[#817970]"
                  }`}
                />
                {content.ragBadge}
              </span>
            </div>
            <p className="mt-1 truncate text-[11px] leading-5 text-[#817970]">
              {content.subheading}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          aria-label={content.resetChatTitle}
          title={content.resetChatTitle}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-transparent text-[#817970] transition-colors hover:border-[#D8C9B8] hover:bg-white hover:text-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974]"
        >
          <RefreshCw
            className={`h-4 w-4 ${isStreaming ? "animate-pulse" : ""}`}
          />
        </button>
      </header>

      {/* Conversation */}
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label={content.title}
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto bg-[#FAF8F4]/60 p-4 text-xs sm:p-6 sm:text-sm"
      >
        {/* Initial Greeting */}
        {messages.length === 0 && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#E7E1D9] bg-white text-[#9D8974]">
              <Bot className="h-4 w-4" />
            </div>

            <div className="max-w-[88%]">
              <div className="border border-[#E7E1D9] bg-white p-4 leading-7 text-[#514B44]">
                {content.initialGreeting}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={`${msg.role}-${index}`}
              className={`group flex items-start gap-3 ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                  isUser
                    ? "bg-[#211F1C] text-white"
                    : "border border-[#E7E1D9] bg-white text-[#9D8974]"
                }`}
                aria-hidden="true"
              >
                {isUser ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>

              <div
                className={`relative min-w-0 max-w-[88%] ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`break-words p-3.5 leading-7 sm:p-4 ${
                    isUser
                      ? "bg-[#211F1C] text-white"
                      : "border border-[#E7E1D9] bg-white text-[#514B44]"
                  }`}
                >
                  {isUser ? (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  ) : msg.content ? (
                    <FormattedMarkdown content={msg.content} />
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[#817970]">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#9D8974]" />
                      <span>{content.searchingText}</span>
                    </span>
                  )}
                </div>

                {/* Copy response */}
                {!isUser && msg.content && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.content, index)}
                      aria-label={
                        copiedIndex === index
                          ? "Copied response"
                          : "Copy response"
                      }
                      className="inline-flex items-center gap-1.5 border border-transparent px-2 py-1 text-[10px] text-[#817970] transition-colors hover:border-[#E7E1D9] hover:bg-white hover:text-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974]"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3 w-3 text-[#806B55]" />
                          <span>{content.copiedText ?? "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{content.copyText ?? "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Error States */}
        {(error || copyError) && (
          <div
            role="alert"
            className="flex items-start gap-2 border border-[#D8C9B8] bg-[#F0ECE6] p-3 text-xs leading-6 text-[#51463B]"
          >
            <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-[#806B55]" />
            <p>
              {copyError
                ? (content.copyErrorMessage ??
                  "Unable to copy. Please try again.")
                : content.errorMessage}
            </p>
          </div>
        )}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto border-t border-[#E7E1D9] bg-white px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5">
        <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.15em] text-[#9D8974]">
          {content.suggestionsLabel}
        </span>

        {content.quickPrompts.map(
          (prompt: { label: string; query: string }, idx: number) => (
            <button
              key={`${prompt.query}-${idx}`}
              type="button"
              onClick={() => handleSend(prompt.query)}
              disabled={isStreaming}
              className="shrink-0 border border-[#E7E1D9] bg-[#FAF8F4] px-3 py-2 text-[10px] text-[#625D57] transition-colors hover:border-[#D8C9B8] hover:bg-[#F0ECE6] hover:text-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prompt.label}
            </button>
          ),
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border-t border-[#E7E1D9] bg-white p-3 sm:gap-3 sm:p-4"
      >
        <label htmlFor="faq-chat-input" className="sr-only">
          {content.inputPlaceholder}
        </label>

        <input
          id="faq-chat-input"
          type="text"
          placeholder={content.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
          autoComplete="off"
          className="min-w-0 flex-1 border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-xs text-[#211F1C] placeholder:text-[#A49B91] transition-colors focus:border-[#9D8974] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9D8974] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={stopStream}
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-[#D8C9B8] bg-[#F0ECE6] px-3 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B] transition-colors hover:bg-[#E9E0D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] sm:px-4"
            aria-label="Stop generating"
            title="Stop generating"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        ) : (
          <AppButton
            type="submit"
            variant="primary"
            disabled={!input.trim()}
            aria-label="Send message"
            className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-none border border-[#211F1C] bg-[#211F1C] p-0 text-white shadow-none transition-colors hover:border-[#51463B] hover:bg-[#51463B] disabled:cursor-not-allowed disabled:border-[#E7E1D9] disabled:bg-[#E7E1D9] disabled:text-[#A49B91]"
          >
            <Send className="h-4 w-4" />
          </AppButton>
        )}
      </form>
    </section>
  );
}
