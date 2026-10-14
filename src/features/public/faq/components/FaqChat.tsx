"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, RefreshCw, Copy, Check, Square } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAiChatStream } from "../hooks/useAiChatStream";
import { AppButton } from "@/features/common/ui/AppButton";
import { FormattedMarkdown } from "./FormattedMarkdown";

export function FaqChat() {
  const { dict } = useLanguage();
  const content = dict.faqChat;

  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    stopStream,
    clearChat,
  } = useAiChatStream();

  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isStreaming) return;

    sendMessage(query);
    if (!textToSend) setInput("");
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg flex flex-col h-170 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">{content.title}</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold uppercase tracking-wider border border-blue-200">
                {content.ragBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{content.subheading}</p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          title={content.resetChatTitle}
          type="button"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-slate-50/30">
        {/* Initial Greeting Banner */}
        {messages.length === 0 && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-blue-600 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-[85%] space-y-1">
              <div className="p-3.5 rounded-2xl bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-xs leading-relaxed">
                {content.initialGreeting}
              </div>
            </div>
          </div>
        )}

        {/* Message Stream List */}
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`flex items-start gap-3 group ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-slate-200 shadow-xs"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble Container */}
              <div className="max-w-[85%] space-y-1 relative">
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap relative ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-xs"
                  }`}
                >
                  {isUser ? (
                    msg.content
                  ) : msg.content ? (
                    <FormattedMarkdown content={msg.content} />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-400 italic">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                      {content.searchingText}
                    </span>
                  )}
                </div>

                {/* Copy Button on AI Response Hover */}
                {!isUser && msg.content && (
                  <div className="absolute -bottom-5 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.content, index)}
                      className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-xs transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {content.errorMessage}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold whitespace-nowrap">
          {content.suggestionsLabel}
        </span>
        {content.quickPrompts.map((prompt: { label: string; query: string }, idx: number) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt.query)}
            disabled={isStreaming}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-[11px] text-slate-600 hover:text-blue-700 whitespace-nowrap transition-all shadow-2xs disabled:opacity-50"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Input Form with Stop & Send actions */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          placeholder={content.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all disabled:opacity-50"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={stopStream}
            className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            title="Stop generating"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        ) : (
          <AppButton
            type="submit"
            variant="primary"
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </AppButton>
        )}
      </form>
    </div>
  );
}
