import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

export function LoginEditorialSidebar() {
  return (
    <div className="relative hidden overflow-hidden border border-[#51463B] bg-[#211F1C] lg:col-span-5 lg:block xl:col-span-6">
      <Image
        src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80"
        alt="Elegant haute couture evening gown"
        fill
        priority
        sizes="(max-width: 1200px) 50vw, 40vw"
        className="object-cover object-top opacity-75 transition-transform duration-700 hover:scale-[1.02]"
      />

      {/* Editorial Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#211F1C]/95 via-[#211F1C]/40 to-[#211F1C]/20" />

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-10 text-white xl:p-14">
        {/* Brand Identity */}
        <Link
          href="/"
          className="inline-flex flex-col items-start gap-1 self-start transition-opacity hover:opacity-80"
          aria-label="Yee Fans Haute Couture Homepage"
        >
          <span className="text-xl font-semibold uppercase tracking-[0.2em] text-[#FAF8F4]">
            YEE FANS
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#D8C9B8]">
            Haute Couture
          </span>
          <span className="mt-2 h-px w-12 bg-[#B5A18B]" />
        </Link>

        {/* Admin Workspace Introduction */}
        <div className="max-w-md space-y-5">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/20 px-3 py-2 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-[#D8C9B8]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F0ECE6]">
              Administration
            </span>
          </div>

          <h1 className="font-serif text-3xl font-normal leading-[1.2] tracking-wide text-[#FAF8F4] xl:text-5xl">
            The Craft of Fashion.
            <span className="mt-2 block italic text-[#D8C9B8]">
              The Precision of Every Detail.
            </span>
          </h1>

          <p className="max-w-sm text-sm leading-7 text-white/75">
            Manage collections, oversee product details, review incoming
            inquiries, and coordinate showroom operations from one dedicated
            workspace.
          </p>

          <div className="h-px w-16 bg-[#9D8974]" />
        </div>

        {/* Security Footer */}
        <div className="flex items-center gap-3 border-t border-white/20 pt-5">
          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/70">
            Authorized Administrator Access Only
          </span>
        </div>
      </div>
    </div>
  );
}
