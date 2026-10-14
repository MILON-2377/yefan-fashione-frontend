"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, QrCode, MessageSquareText } from "lucide-react";
import { WhatsAppConfig } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const FALLBACK_CONFIG: WhatsAppConfig = {
  phoneNumber: "86123456789",
  formattedNumber: "+86 (020) 1234-5678",
  qrImageUrl:
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://wa.me/86123456789",
  messagePrefix: "Hello, I am interested in your wholesale products.",
};

export function FooterWhatsApp() {
  const { dict } = useLanguage();
  const content = dict.footerWhatsApp;

  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchWhatsAppConfig() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/settings/whatsapp`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          },
        );

        if (response.ok) {
          const data: WhatsAppConfig = await response.json();
          if (isMounted) setConfig(data);
        } else {
          if (isMounted) setConfig(FALLBACK_CONFIG);
        }
      } catch {
        if (isMounted) setConfig(FALLBACK_CONFIG);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchWhatsAppConfig();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 animate-pulse flex flex-col items-center gap-3">
        <div className="w-28 h-28 bg-slate-200 rounded-xl" />
        <div className="space-y-2 text-center w-full">
          <div className="h-3.5 w-24 bg-slate-200 rounded mx-auto" />
          <div className="h-8 w-full bg-slate-200 rounded-xl mt-2" />
        </div>
      </div>
    );
  }

  const activeConfig = config || FALLBACK_CONFIG;

  const whatsappLink = `https://wa.me/${activeConfig.phoneNumber}?text=${encodeURIComponent(
    activeConfig.messagePrefix || content.defaultPrefix,
  )}`;

  return (
    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-3">
      {/* Title Header */}
      <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wider">
        <MessageSquareText className="w-4 h-4 text-emerald-600" />
        <span>{content.title}</span>
      </div>

      {/* Styled QR Code Box */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-center group transition-transform duration-300 hover:scale-[1.02]">
        {activeConfig.qrImageUrl ? (
          <Image
            src={activeConfig.qrImageUrl}
            alt={content.qrAlt}
            width={140}
            height={140}
            className="rounded-lg object-contain w-full h-full"
            unoptimized
          />
        ) : (
          <QrCode className="w-12 h-12 text-slate-300" />
        )}
      </div>

      <p className="text-[11px] font-medium text-slate-400">
        {content.scanPrompt}
      </p>

      {/* Direct Contact Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-between px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-2xs hover:shadow-xs transition-all duration-200"
      >
        <div className="flex items-center gap-2 truncate">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg
              className="w-3 h-3 fill-current text-white"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <span className="truncate">{activeConfig.formattedNumber}</span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 ml-1" />
      </a>
    </div>
  );
}
