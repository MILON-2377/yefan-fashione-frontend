import Link from "next/link";
import { FooterWhatsApp } from "./FooterWhatsApp";

export function Footer() {
  return (
    <footer className="w-full bg-white text-slate-700 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">
              Yifan Apparel
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Guangzhou Yifan Trading Co., Ltd. - B2B Manufacturer and Global
              Exporter of High-End French Couture & Bridal Wear.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link
                  href="/products"
                  className="hover:text-blue-600 transition"
                >
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Factory
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="hover:text-blue-600 transition"
                >
                  Resource Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition">
                  Ordering FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guangzhou City, Guangdong Province, China
              <br />
              Email: sales@yifanbridal.com
            </p>
          </div>

          {/* Column 4: Dynamic WhatsApp QR Card */}
          <div>
            <FooterWhatsApp />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Guangzhou Yifan Trading Co., Ltd. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
