"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Globe2,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { dict } = useLanguage();
  const content = dict.aboutSection;
  const stats = {
    yearsInBusiness: "10+",
    globalPartners: "30+",
    monthlyCapacity: "5,000+",
    qualityPassRate: "98%",
  };

  const metrics = [
    {
      value: stats.yearsInBusiness,
      label: content.metricsLabels.yearsInBusiness,
    },
    {
      value: stats.globalPartners,
      label: content.metricsLabels.globalPartners,
    },
    {
      value: stats.monthlyCapacity,
      label: content.metricsLabels.monthlyCapacity,
    },
    {
      value: stats.qualityPassRate,
      label: content.metricsLabels.qualityPassRate,
    },
  ];

  const policyIcons = [ShieldCheck, Scale, Clock3];

  return (
    <section className="relative w-full overflow-hidden border-t border-[#E7E1D9] bg-[#FAF8F4] py-20 text-[#211F1C] sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#E9E0D5]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-20 px-4 sm:px-8 lg:space-y-28">
        {/* Brand introduction */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D8974]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#806B55] sm:text-xs">
                {content.badge}
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-4xl font-normal leading-[1.12] tracking-tight text-[#211F1C] sm:text-5xl lg:text-6xl">
              {content.companyName}
            </h2>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#B9A995]" />
              <Sparkles className="h-4 w-4 text-[#9D8974]" strokeWidth={1.4} />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#806B55]">
                {content.policiesSubtitle}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-2xl lg:justify-self-end"
          >
            <p className="text-base leading-8 text-[#625D57] sm:text-lg sm:leading-9">
              {content.description}
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[#211F1C] transition-colors hover:text-[#806B55]"
            >
              {content.specSheetBtn}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8C9B8] transition-all duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 border-y border-[#D8C9B8] sm:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`py-7 sm:py-9 ${
                index % 2 === 0 ? "pr-4 sm:pr-7" : "pl-4 sm:pl-7"
              } ${index < 2 ? "border-b border-[#E7E1D9] sm:border-b-0" : ""} ${
                index > 0 ? "sm:border-l sm:border-[#E7E1D9]" : ""
              }`}
            >
              <p className="font-serif text-3xl font-normal tracking-tight text-[#51463B] sm:text-4xl lg:text-5xl">
                {metric.value}
              </p>
              <p className="mt-3 max-w-40 text-[10px] font-medium uppercase leading-5 tracking-[0.13em] text-[#756C62] sm:text-xs">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Policies */}
        <div>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-[#9D8974]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#806B55]">
                  {content.badge}
                </span>
              </div>

              <h3 className="font-serif text-3xl font-normal tracking-tight text-[#211F1C] sm:text-4xl">
                {content.policiesTitle}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#756C62]">
                {content.policiesSubtitle}
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#B9A995] pb-2 text-xs font-medium uppercase tracking-[0.13em] text-[#51463B] transition-colors hover:border-[#211F1C] hover:text-[#211F1C]"
            >
              {content.specSheetBtn}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-px border border-[#E1D8CD] bg-[#E1D8CD] md:grid-cols-3">
            {content.policies.map((policy, index) => {
              const Icon = policyIcons[index] ?? ShieldCheck;

              return (
                <motion.article
                  key={policy.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group flex flex-col bg-[#FAF8F4] p-6 transition-colors duration-300 hover:bg-white sm:p-8 lg:p-9"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center border border-[#D8C9B8] text-[#806B55] transition-colors duration-300 group-hover:border-[#211F1C] group-hover:bg-[#211F1C] group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </span>

                    <span className="font-serif text-xl italic text-[#B9A995]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-normal leading-snug text-[#211F1C] sm:text-2xl">
                    {policy.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-[#625D57]">
                    {policy.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-[#E7E1D9] pt-5">
                    {policy.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2.5 text-xs leading-6 text-[#625D57] sm:text-sm"
                      >
                        <CheckCircle2
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-[#9D8974]"
                          strokeWidth={1.6}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 h-px w-8 bg-[#B9A995] transition-all duration-300 group-hover:w-14 group-hover:bg-[#51463B]" />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Standards and trust */}
        <div className="relative overflow-hidden border border-[#D8C9B8] bg-[#F0ECE6] p-7 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-[#D8C9B8]/60" />
          <div className="pointer-events-none absolute -right-2 -top-8 h-32 w-32 rounded-full border border-[#D8C9B8]/60" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <Award className="h-5 w-5 text-[#806B55]" strokeWidth={1.5} />
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#806B55]">
                  {content.certTitle}
                </span>
              </div>

              <p className="font-serif text-xl font-normal leading-relaxed text-[#211F1C] sm:text-2xl">
                {content.certDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-[#FAF8F4] px-4 py-3 text-xs font-medium text-[#51463B]">
                <FileCheck2 className="h-4 w-4 text-[#806B55]" />
                ISO 9001
              </span>

              <span className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-[#FAF8F4] px-4 py-3 text-xs font-medium text-[#51463B]">
                <Globe2 className="h-4 w-4 text-[#806B55]" />
                OEKO-TEX 100
              </span>

              <span className="inline-flex items-center gap-2 border border-[#D8C9B8] bg-[#FAF8F4] px-4 py-3 text-xs font-medium text-[#51463B]">
                <ShieldCheck className="h-4 w-4 text-[#806B55]" />
                BSCI Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
