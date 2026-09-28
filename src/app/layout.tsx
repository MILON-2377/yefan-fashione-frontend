import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingInquiry } from "@/components/layout/FloatingInquiry";
import { FloatingSocials } from "@/components/layout/FloatingSocials";
import { ConditionalBanner } from "@/components/layout/ConditionalBanner";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global B2B Industrial Showroom | Direct Manufacturer",
  description:
    "Leading global exporter of high-precision machinery, OEM parts, and raw materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white text-slate-900">
      <body
        className={`${inter.className} flex min-h-full flex-col bg-white text-slate-900 antialiased`}
      >
        <QueryProvider>
          <LanguageProvider>
            <Header />

            {/* Dynamic Boutique Banner (Hidden on Home Page "/") */}
            <ConditionalBanner />

            {/* Page Body Content */}
            <main className=" flex-1 bg-white">{children}</main>

            {/* Footer */}
            <Footer />

            {/* Persistent Floating Social Links Sidebar */}
            <FloatingSocials />

            {/* Floating Inquiry Button across all pages */}
            <FloatingInquiry />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
