"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  {
    label: "What is your Minimum Order Quantity (MOQ)?",
    query:
      "What is the Minimum Order Quantity (MOQ) for custom OEM evening gowns and ready-to-ship stock?",
  },
  {
    label: "How long does custom sampling take?",
    query:
      "What is the turnaround time for sample development and pattern making?",
  },
  {
    label: "What fabrics and materials do you stock?",
    query:
      "Do you supply OEKO-TEX certified mulberry silk, stretch satins, and French lace?",
  },
  {
    label: "What are your payment terms for bulk orders?",
    query:
      "What payment methods and deposit structures do you accept for bulk manufacturing?",
  },
];

export function FaqChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello! I am Yifan Atelier's AI Assistant. You can ask me anything about our 2026 dress collections, fabric specifications, OEM manufacturing process, MOQs, or shipping schedules.",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulated RAG Response
    setTimeout(() => {
      let aiReply =
        "Thank you for reaching out! Our factory in Guangzhou specializes in high-end eveningwear, bridal gowns, and cocktail dresses. For custom requests, please feel free to attach your tech-pack or contact our merchandising team directly.";

      const lower = query.toLowerCase();
      if (lower.includes("moq") || lower.includes("minimum")) {
        aiReply =
          "Our standard Minimum Order Quantity (MOQ) is 50–100 pieces per style/color for custom OEM/ODM production. For ready-to-ship wholesale stock, our MOQ starts at just 10 pieces per design.";
      } else if (
        lower.includes("sample") ||
        lower.includes("time") ||
        lower.includes("turnaround")
      ) {
        aiReply =
          "Sample creation typically takes 7–10 business days once tech-packs and fabric swatches are approved. Express 5-day sampling is available upon request.";
      } else if (
        lower.includes("fabric") ||
        lower.includes("silk") ||
        lower.includes("material")
      ) {
        aiReply =
          "We maintain a stock library of over 500 premium fabrics, including 100% Grade 6A Mulberry Silk, stretch heavy satins, OEKO-TEX certified linings, and custom French lace appliques.";
      } else if (lower.includes("payment") || lower.includes("deposit")) {
        aiReply =
          "We accept T/T (Wire Transfer), Letter of Credit (L/C), PayPal, and Credit Cards. Our standard terms are 30% deposit upon order confirmation and 70% balance prior to shipment.";
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-white  rounded-3xl border border-slate-200 shadow-lg flex flex-col h-[680px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Ask Yifan AI</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold uppercase tracking-wider border border-blue-200">
                RAG Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Instant answers powered by our 2026 product knowledge base
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "m-reset",
                sender: "ai",
                text: "Chat reset. How else can I assist your boutique or brand today?",
                time: "Just now",
              },
            ])
          }
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm bg-slate-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-slate-200 shadow-sm"
              }`}
            >
              {msg.sender === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Bubble */}
            <div className="max-w-[80%] space-y-1">
              <div
                className={`p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                    : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-xs"
                }`}
              >
                {msg.text}
              </div>
              <p
                className={`text-[10px] text-slate-400 px-1 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pl-11">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>Searching catalog specifications & policy docs...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold whitespace-nowrap">
          Suggestions:
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.query)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-[11px] text-slate-600 hover:text-blue-700 whitespace-nowrap transition-all shadow-2xs"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask AI about dresses, fabrics, MOQs, or lead times..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
