"use client"

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { FooterWhatsApp } from "./FooterWhatsApp";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();
  const content = dict.footer;

  const navigation = [
    { label: content.productCatalog, href: "/products" },
    { label: content.aboutFactory, href: "/about" },
    { label: content.resourceCenter, href: "/downloads" },
    { label: content.orderingFaq, href: "/faq" },
  ];

  const brands = ["YEEFANS", "KissMarch", "Soiowar"];

  return (
    <footer className="relative overflow-hidden border-t border-[#e5d8c8] bg-[#faf7f1] text-[#30251e]">
      {/* Decorative background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full border border-[#e9ddce] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full border border-[#e9ddce] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-24 h-80 w-80 rounded-full border border-[#e9ddce] opacity-40"
      />

      <div className="relative mx-auto max-w-360 px-6 pb-8 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="group inline-flex flex-col items-start"
              aria-label="Yifan home"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#92785e]">
                Atelier &amp; Manufacture
              </span>

              <span className="mt-2 font-serif text-5xl font-normal tracking-[-0.055em] text-[#4c3020] transition-colors duration-300 group-hover:text-[#92785e] sm:text-6xl">
                {content.brandName}
              </span>

              <span className="mt-4 h-px w-14 bg-[#9b7958] transition-all duration-500 group-hover:w-24" />
            </Link>

            <p className="mt-7 max-w-md text-sm leading-7 text-[#6e6257]">
              {content.brandDesc}
            </p>

            <div className="mt-8 border-t border-[#e7dbcd] pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#92785e]">
                Houses &amp; Subsidiaries
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="font-serif text-base text-[#4c4036] transition-colors hover:text-[#92785e]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h2 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#92785e]">
              {content.quickNavTitle}
            </h2>

            <nav aria-label="Footer navigation">
              <ul className="space-y-5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-3 text-sm text-[#62574d] transition-colors hover:text-[#38291f]"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#92785e]">
              {content.contactTitle}
            </h2>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e7dbcd] bg-[#f3ece1] text-[#7d6248]">
                  <MapPin className="h-4.5 w-4.5" />
                </span>

                <div className="min-w-0 pt-1">
                  <p className="font-serif text-base text-[#38291f]">
                    {content.contactTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6e6257]">
                    {content.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e7dbcd] bg-[#f3ece1] text-[#7d6248]">
                  <Mail className="h-4.5 w-4.5" />
                </span>

                <div className="min-w-0 pt-1">
                  <p className="font-serif text-base text-[#38291f]">
                    {content.emailLabel}
                  </p>

                  <a
                    href="mailto:sales@yifanbridal.com"
                    className="mt-2 inline-block break-all text-sm text-[#6e6257] underline decoration-[#d8c5af] underline-offset-4 transition-colors hover:text-[#38291f]"
                  >
                    sales@yifanbridal.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="lg:col-span-3">
            <FooterWhatsApp />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-[#dfd1c0] pt-7 sm:mt-20">
          <div className="flex flex-col items-center gap-7 sm:flex-row sm:justify-between">
            <Link
              href="/login"
              className="group inline-flex items-center gap-4 rounded-full border border-[#cbb59b] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b4c32] transition-all duration-300 hover:border-[#6b4c32] hover:bg-[#f1e8dc]"
            >
              <LockKeyhole className="h-4 w-4" />
              <span>{content.adminPortal}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="text-center">
              <p className="text-xs tracking-wide text-[#62574d]">
                © {new Date().getFullYear()} Guangzhou Yifan Trading Co., Ltd.
              </p>
              <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#92785e]">
                {content.allRightsReserved}
              </p>
            </div>

            <a
              href="https://wa.me/86123456789"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Yifan on WhatsApp"
              className="inline-flex items-center gap-2 text-xs text-[#6b4c32] transition-colors hover:text-[#30251e]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Let&apos;s connect</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Signature accent */}
      <div className="h-2 w-full bg-linear-to-r from-[#c9b39a] via-[#a78c70] to-[#c9b39a]" />
    </footer>
  );
}
