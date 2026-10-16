"use client";

import Link from "next/link";
import { Lock, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { FooterWhatsApp } from "./FooterWhatsApp";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();
  const content = dict.footer;

  return (
    <footer className="w-full border-t border-[#E7E1D9] bg-[#FAF8F4] text-[#211F1C] selection:bg-[#211F1C] selection:text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:py-20">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-7 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9D8974]">
                Atelier & Manufacture
              </span>

              <span className="font-serif text-3xl font-normal tracking-tight text-[#211F1C] transition-colors duration-300 group-hover:text-[#806B55] sm:text-4xl">
                {content.brandName}
              </span>

              <span className="h-px w-14 bg-[#9D8974] transition-all duration-500 group-hover:w-24" />
            </Link>

            <p className="max-w-md text-sm leading-7 text-[#625D57]">
              {content.brandDesc}
            </p>

            {/* Brand Portfolio */}
            <div className="space-y-3 pt-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                Houses & Subsidiaries
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {["YEEFANS", "KissMarch", "Soiowar"].map((brand) => (
                  <span
                    key={brand}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#51463B] transition-colors hover:text-[#9D8974]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D8974]">
              {content.quickNavTitle}
            </h4>

            <ul className="space-y-4">
              {[
                { label: content.productCatalog, href: "/products" },
                { label: content.aboutFactory, href: "/about" },
                { label: content.resourceCenter, href: "/downloads" },
                { label: content.orderingFaq, href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#625D57] transition-colors duration-200 hover:text-[#211F1C]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D8974]">
              {content.contactTitle}
            </h4>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E7E1D9] text-[#806B55]">
                  <MapPin className="h-4 w-4" />
                </span>

                <p className="max-w-xs pt-1 text-sm leading-6 text-[#625D57]">
                  {content.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E7E1D9] text-[#806B55]">
                  <Mail className="h-4 w-4" />
                </span>

                <div className="space-y-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9D8974]">
                    {content.emailLabel}
                  </p>

                  <a
                    href="mailto:sales@yifanbridal.com"
                    className="break-all text-sm text-[#211F1C] decoration-[#D8C9B8] underline-offset-4 transition-colors hover:text-[#806B55] hover:underline"
                  >
                    sales@yifanbridal.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Concierge */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-xl border border-[#E7E1D9] bg-white p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#F0ECE6]" />
              <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full border border-[#F0ECE6]" />

              <div className="relative space-y-5">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                    Personal Assistance
                  </span>

                  <h4 className="mt-2 font-serif text-2xl font-normal leading-snug text-[#211F1C]">
                    Let’s Discuss Your Collection
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-[#625D57]">
                    Connect with our team about wholesale orders, custom
                    designs, and private-label opportunities.
                  </p>
                </div>

                <div className="border-t border-[#F0ECE6] pt-4">
                  <FooterWhatsApp />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-[#E7E1D9] pt-6 sm:mt-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[11px] tracking-wide text-[#625D57]">
                © {new Date().getFullYear()} Guangzhou Yifan Trading Co., Ltd.
              </p>

              <p className="text-[10px] text-[#9D8974]">
                {content.allRightsReserved}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <span className="hidden h-px w-8 bg-[#D8C9B8] sm:block" />

              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#9D8974] transition-all duration-300 hover:border-[#E7E1D9] hover:bg-white hover:text-[#211F1C]"
              >
                <Lock className="h-3 w-3" />
                <span>{content.adminPortal}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
