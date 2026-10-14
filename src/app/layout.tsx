import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yifan Atelier | B2B Fashion Showroom",
  description:
    "High-precision garment manufacturing, OEM, and luxury apparel showroom.",
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
          <LanguageProvider>{children}</LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
