"use client";

import { useState } from "react";
import {
  WhatsAppIcon,
  WeChatIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/icons/SocialIcons";

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
    bgColor: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
  },
  {
    id: "wechat",
    name: "WeChat Contact",
    icon: WeChatIcon,
    href: "#wechat-qr",
    bgColor: "bg-green-600",
    hoverBg: "hover:bg-green-700",
    qrCodeModal: true,
  },
  {
    id: "facebook",
    name: "Facebook Page",
    icon: FacebookIcon,
    href: "https://facebook.com",
    bgColor: "bg-blue-600",
    hoverBg: "hover:bg-blue-700",
  },
  {
    id: "instagram",
    name: "Instagram Showcase",
    icon: InstagramIcon,
    href: "https://instagram.com",
    bgColor: "bg-pink-600",
    hoverBg: "hover:bg-pink-700",
  },
  {
    id: "linkedin",
    name: "LinkedIn Network",
    icon: LinkedinIcon,
    href: "https://linkedin.com",
    bgColor: "bg-sky-700",
    hoverBg: "hover:bg-sky-800",
  },
];

export function FloatingSocials() {
  const [activeQr, setActiveQr] = useState<boolean>(false);

  return (
    <>
      <aside
        aria-label="Floating Social Contacts"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end shadow-lg rounded-l-2xl overflow-hidden bg-white/80 backdrop-blur-md border-l border-y border-slate-200/80 p-1 space-y-1"
      >
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;

          if (social.qrCodeModal) {
            return (
              <button
                key={social.id}
                onClick={() => setActiveQr(true)}
                className="group relative flex items-center p-2.5 rounded-xl text-slate-600 hover:text-white transition-all duration-300"
              >
                {/* Expandable Hover Label */}
                <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-md">
                  {social.name}
                </span>

                {/* Icon Box */}
                <div
                  className={`p-2 rounded-lg text-white ${social.bgColor} ${social.hoverBg} transition-colors shadow-2xs`}
                >
                  <Icon size={18} />
                </div>
              </button>
            );
          }

          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center p-2.5 rounded-xl text-slate-600 hover:text-white transition-all duration-300"
            >
              {/* Expandable Hover Label */}
              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-md">
                {social.name}
              </span>

              {/* Icon Box */}
              <div
                className={`p-2 rounded-lg text-white ${social.bgColor} ${social.hoverBg} transition-colors shadow-2xs`}
              >
                <Icon size={18} />
              </div>
            </a>
          );
        })}
      </aside>

      {/* WeChat QR Modal */}
      {activeQr && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <WeChatIcon className="text-green-600" size={20} />
                Scan WeChat QR Code
              </h4>
              <button
                onClick={() => setActiveQr(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 inline-block">
              {/* Replace with dynamic company WeChat QR image path */}
              <div className="w-48 h-48 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-semibold">
                [WeChat QR Code]
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Scan with WeChat to chat directly with our OEM export sales
              manager.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
