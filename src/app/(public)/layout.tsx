import { Header } from "@/features/common/layout/Header";
import { Footer } from "@/features/common/layout/Footer";

import { FloatingSocials } from "@/features/common/layout/FloatingSocials";
import { ConditionalBanner } from "@/features/common/layout/ConditionalBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {/* Dynamic Boutique Banner (Hidden on Home Page "/") */}
      <ConditionalBanner />

      {/* Page Body Content */}
      <main className=" flex-1 bg-white">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating Social Links Sidebar */}
      <FloatingSocials />
    </>
  );
}
