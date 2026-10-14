import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

export function LoginEditorialSidebar() {
  return (
    <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative bg-slate-950">
      <Image
        src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80"
        alt="Celestial Mulberry Evening Gown"
        fill
        priority
        sizes="(max-width: 1200px) 50vw, 40vw"
        className="object-cover object-top opacity-85"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />

      <div className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-between text-white z-10">
        <Link href="/" className="text-xl font-black tracking-widest uppercase">
          YIFAN <span className="text-blue-400 font-light">ATELIER</span>
        </Link>

        <div className="space-y-4 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Partner Desk</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight font-serif">
            Welcome Back to Your Fashion Production Hub
          </h1>
          <p className="text-xs xl:text-sm text-slate-300 leading-relaxed">
            Track open tech-pack quotes, inspect sample approvals, and review
            active production runs in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Encrypted Wholesale Authentication</span>
        </div>
      </div>
    </div>
  );
}
