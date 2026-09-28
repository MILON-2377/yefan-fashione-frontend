import { ShieldCheck, Palette, Layers, Clock } from "lucide-react";

const advantages = [
  {
    icon: Palette,
    title: "OEM / ODM & Custom Design",
    description:
      "Full picture-to-sample customization, bespoke sizing, and custom fabric adjustments tailored for boutique private labels.",
  },
  {
    icon: Layers,
    title: "Flexible Tiered Wholesale",
    description:
      "Scalable order tiers from standard 1-piece sampling up to 100+ bulk production with competitive volume pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Signature Couture Craftsmanship",
    description:
      "Featuring French retro aesthetics, intricate floral lace embroidery, velvet detailing, and premium bridal fabrics.",
  },
  {
    icon: Clock,
    title: "Transparent Lead Times",
    description:
      "Standardized 60 to 90-day production scheduling with expedited rush-order capabilities for time-sensitive seasons.",
  },
];

export function AdvantageSection() {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
            Guangzhou Yifan Trading
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Partner With Yifan Bridal & Couture
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Delivering high-end French retro couture and bridal fashion to global distributors, boutiques, and private labels.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}