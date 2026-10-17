"use client";

import { ArrowUpRight, MessageCircle, QrCode } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/context/LanguageContext";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "86123456789";

const WHATSAPP_MESSAGE = "Hello, I am interested in your wholesale products.";

export function FooterWhatsApp() {
  const { dict } = useLanguage();
  const content = dict.footerWhatsApp;

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    whatsappUrl,
  )}`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#ddc8ad] bg-white/50 p-6 shadow-[0_12px_40px_rgba(89,61,35,0.04)] sm:p-7">
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[#eee2d3]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-full border border-[#eee2d3]"
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e0ceb8] bg-[#f2e9dc] text-[#795a3c]">
            <MessageCircle className="h-5 w-5" />
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#92785e]">
            Personal Assistance
          </span>
        </div>

        <h2 className="mt-6 max-w-xs font-serif text-3xl font-normal leading-tight tracking-tight text-[#38291f]">
          Let&apos;s Discuss Your Collection
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#6e6257]">
          Connect with our team about wholesale orders, custom designs, and
          private-label opportunities.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#38291f] px-5 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#624733] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92785e] focus-visible:ring-offset-2"
        >
          <span className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span>Chat on WhatsApp</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </a>

        <div className="mt-6 flex items-center gap-4 border-t border-[#e9ddce] pt-5">
          <div className="flex h-19 w-19 shrink-0 items-center justify-center border border-[#e9ddce] bg-white p-1.5">
            {WHATSAPP_PHONE ? (
              <Image
                src={qrUrl}
                alt={content.qrAlt}
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain"
              />
            ) : (
              <QrCode className="h-9 w-9 text-[#92785e]" />
            )}
          </div>

          <div>
            <p className="font-serif text-base text-[#38291f]">
              Scan to connect
            </p>
            <p className="mt-1 text-xs leading-5 text-[#6e6257]">
              {content.scanPrompt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
