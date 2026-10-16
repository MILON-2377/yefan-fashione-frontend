
"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  ChevronRight,
} from "lucide-react";
import {
  WhatsAppIcon,
  WeChatIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/features/common/ui/icons/SocialIcons";

interface SocialLink {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  bgColor: string;
  hoverBg: string;
  qrCodeModal?: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Us",
    icon: WhatsAppIcon,
    href: "https://wa.me/861234567890",
    bgColor: "bg-[#51463B]",
    hoverBg: "hover:bg-[#211F1C]",
  },
  {
    id: "wechat",
    name: "WeChat Contact",
    icon: WeChatIcon,
    href: "#wechat-qr",
    bgColor: "bg-[#51463B]",
    hoverBg: "hover:bg-[#211F1C]",
    qrCodeModal: true,
  },
  {
    id: "facebook",
    name: "Facebook Page",
    icon: FacebookIcon,
    href: "https://facebook.com",
    bgColor: "bg-[#51463B]",
    hoverBg: "hover:bg-[#211F1C]",
  },
  {
    id: "instagram",
    name: "Instagram Showcase",
    icon: InstagramIcon,
    href: "https://instagram.com",
    bgColor: "bg-[#51463B]",
    hoverBg: "hover:bg-[#211F1C]",
  },
  {
    id: "linkedin",
    name: "LinkedIn Network",
    icon: LinkedinIcon,
    href: "https://linkedin.com",
    bgColor: "bg-[#51463B]",
    hoverBg: "hover:bg-[#211F1C]",
  },
];

export function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQr, setActiveQr] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveQr(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
      >
        {/* Expandable Social Links */}
        <div
          id="floating-social-links"
          aria-label="Social media contacts"
          aria-hidden={!isOpen}
          className={`flex flex-col items-end gap-2 transition-all duration-300 ease-out ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-4 scale-95 opacity-0"
          }`}
        >
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = social.icon;

            return (
              <div
                key={social.id}
                style={{
                  transitionDelay: isOpen
                    ? `${index * 40}ms`
                    : "0ms",
                }}
                className={`transition-all duration-200 ${
                  isOpen
                    ? "translate-x-0"
                    : "translate-x-3"
                }`}
              >
                {social.qrCodeModal ? (
                  <button
                    type="button"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => {
                      setActiveQr(true);
                      setIsOpen(false);
                    }}
                    className="group flex items-center gap-3 focus-visible:outline-none"
                  >
                    <span className="border border-[#E7E1D9] bg-white px-3 py-2 text-xs font-medium text-[#51463B] shadow-sm transition-colors group-hover:border-[#D8C9B8]">
                      {social.name}
                    </span>

                    <span
                      className={`flex h-12 w-12 items-center justify-center border border-white/20 text-white shadow-lg transition-colors ${social.bgColor} ${social.hoverBg}`}
                    >
                      <Icon size={21} />
                    </span>
                  </button>
                ) : (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isOpen ? 0 : -1}
                    aria-label={social.name}
                    className="group flex items-center gap-3 focus-visible:outline-none"
                  >
                    <span className="border border-[#E7E1D9] bg-white px-3 py-2 text-xs font-medium text-[#51463B] shadow-sm transition-colors group-hover:border-[#D8C9B8]">
                      {social.name}
                    </span>

                    <span
                      className={`flex h-12 w-12 items-center justify-center border border-white/20 text-white shadow-lg transition-colors ${social.bgColor} ${social.hoverBg}`}
                    >
                      <Icon size={21} />
                    </span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Single Floating Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close social contacts" : "Open social contacts"}
          aria-expanded={isOpen}
          aria-controls="floating-social-links"
          className="group flex h-14 w-14 items-center justify-center border border-[#D8C9B8] bg-[#51463B] text-white shadow-xl transition-all duration-300 hover:border-[#211F1C] hover:bg-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2"
        >
          <span className="relative flex items-center justify-center">
            <MessageCircle
              className={`h-6 w-6 transition-all duration-300 ${
                isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />

            <X
              className={`absolute h-6 w-6 transition-all duration-300 ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </span>

          {!isOpen && (
            <span className="absolute mr-20 whitespace-nowrap border border-[#E7E1D9] bg-white px-3 py-2 text-xs font-medium text-[#51463B] opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              Contact us
            </span>
          )}
        </button>
      </div>

      {/* WeChat QR Modal */}
      {activeQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211F1C]/55 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveQr(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-modal-title"
            className="w-full max-w-sm space-y-5 border border-[#E7E1D9] bg-[#FAF8F4] p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-[#E7E1D9] pb-4">
              <div className="flex items-center gap-3">
                <WeChatIcon className="text-[#51463B]" size={23} />
                <h4
                  id="wechat-modal-title"
                  className="font-serif text-xl font-medium text-[#211F1C]"
                >
                  Scan WeChat QR Code
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveQr(false)}
                aria-label="Close WeChat QR dialog"
                className="flex h-9 w-9 items-center justify-center text-[#81786F] transition-colors hover:bg-[#F0ECE6] hover:text-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex justify-center">
              <div className="border border-[#E7E1D9] bg-white p-4">
                {/* Replace with your actual WeChat QR image */}
                <div className="flex h-48 w-48 items-center justify-center bg-[#F0ECE6] text-center text-xs text-[#81786F]">
                  WeChat QR Code
                </div>
              </div>
            </div>

            <p className="text-center text-xs leading-6 text-[#625D57]">
              Scan with WeChat to chat directly with our OEM export sales
              manager.
            </p>

            <button
              type="button"
              onClick={() => setActiveQr(false)}
              className="w-full border border-[#51463B] bg-[#51463B] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
