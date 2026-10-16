import { Sparkles } from "lucide-react";
import { AboutPageDictContent } from "../types/aboutVideoTypes";

interface AboutOverviewSectionProps {
  content: AboutPageDictContent;
}
export function AboutOverviewSection({ content }: AboutOverviewSectionProps) {
  return (
    <section className="space-y-7">
      {/* Editorial Badge */}
      <div className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-[#F0ECE6] px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#806B55]">
        <Sparkles className="h-3.5 w-3.5 text-[#9D8974]" />
        <span>{content.badge}</span>
      </div>

      {/* Heading */}
      <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
        {content.heading}
      </h2>

      <div className="h-px w-14 bg-[#9D8974]" />

      {/* Description */}
      <p className="max-w-3xl text-sm leading-7 text-[#625D57] sm:text-base sm:leading-8">
        <strong className="font-medium text-[#211F1C]">
          {content.descriptionStrong}
        </strong>{" "}
        {content.descriptionText}
      </p>

      {/* Key Trust Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 sm:gap-4">
        <div className="group border border-[#E7E1D9] bg-white p-4 text-center transition-colors duration-300 hover:border-[#D8C9B8] sm:p-5">
          <div className="font-serif text-2xl font-normal tracking-tight text-[#806B55] sm:text-3xl">
            15+
          </div>
          <div className="mx-auto my-3 h-px w-6 bg-[#D8C9B8] transition-all duration-300 group-hover:w-10 group-hover:bg-[#9D8974]" />
          <div className="text-[10px] font-medium leading-5 text-[#625D57] sm:text-xs">
            {content.metrics.experience}
          </div>
        </div>

        <div className="group border border-[#E7E1D9] bg-white p-4 text-center transition-colors duration-300 hover:border-[#D8C9B8] sm:p-5">
          <div className="font-serif text-2xl font-normal tracking-tight text-[#806B55] sm:text-3xl">
            50k <span className="text-base">Pcs</span>
          </div>
          <div className="mx-auto my-3 h-px w-6 bg-[#D8C9B8] transition-all duration-300 group-hover:w-10 group-hover:bg-[#9D8974]" />
          <div className="text-[10px] font-medium leading-5 text-[#625D57] sm:text-xs">
            {content.metrics.output}
          </div>
        </div>

        <div className="group border border-[#E7E1D9] bg-white p-4 text-center transition-colors duration-300 hover:border-[#D8C9B8] sm:p-5">
          <div className="font-serif text-2xl font-normal tracking-tight text-[#806B55] sm:text-3xl">
            120+
          </div>
          <div className="mx-auto my-3 h-px w-6 bg-[#D8C9B8] transition-all duration-300 group-hover:w-10 group-hover:bg-[#9D8974]" />
          <div className="text-[10px] font-medium leading-5 text-[#625D57] sm:text-xs">
            {content.metrics.partners}
          </div>
        </div>

        <div className="group border border-[#E7E1D9] bg-white p-4 text-center transition-colors duration-300 hover:border-[#D8C9B8] sm:p-5">
          <div className="font-serif text-2xl font-normal tracking-tight text-[#806B55] sm:text-3xl">
            BSCI
          </div>
          <div className="mx-auto my-3 h-px w-6 bg-[#D8C9B8] transition-all duration-300 group-hover:w-10 group-hover:bg-[#9D8974]" />
          <div className="text-[10px] font-medium leading-5 text-[#625D57] sm:text-xs">
            {content.metrics.certified}
          </div>
        </div>
      </div>
    </section>
  );
}
