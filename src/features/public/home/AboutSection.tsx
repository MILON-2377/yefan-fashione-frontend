"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Globe2,
  Clock,
  Sparkles,
  FileCheck2,
  Scale,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { AppButton } from "@/features/common/ui/app-button";
import { useLanguage } from "@/context/LanguageContext";

interface CompanyStats {
  yearsInBusiness: string;
  globalPartners: string;
  monthlyCapacity: string;
  qualityPassRate: string;
}

const DEFAULT_STATS: CompanyStats = {
  yearsInBusiness: "15+",
  globalPartners: "120+",
  monthlyCapacity: "50,000 Pcs",
  qualityPassRate: "99.8%",
};

export function AboutSection() {
  const { dict } = useLanguage();
  const content = dict.aboutSection;

  const stats = DEFAULT_STATS;

  return (
    <section className="w-full bg-white text-slate-800 py-16 sm:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* --- Top Header & Brand Mission --- */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            {content.companyName}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            {content.description}
          </motion.p>
        </div>

        {/* --- Key Performance Metrics Grid --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.yearsInBusiness}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              {content.metricsLabels.yearsInBusiness}
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.globalPartners}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              {content.metricsLabels.globalPartners}
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.monthlyCapacity}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              {content.metricsLabels.monthlyCapacity}
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.qualityPassRate}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              {content.metricsLabels.qualityPassRate}
            </span>
          </div>
        </motion.div>

        {/* --- Company Policies & Compliance Framework --- */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {content.policiesTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {content.policiesSubtitle}
              </p>
            </div>

            <AppButton
              variant="outline"
              size="sm"
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs w-fit"
            >
              {content.specSheetBtn}
            </AppButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Policy 1: Quality Control */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {content.policies[0].title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {content.policies[0].description}
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                {content.policies[0].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Policy 2: NDA & Intellectual Property */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {content.policies[1].title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {content.policies[1].description}
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                {content.policies[1].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Policy 3: MOQ & Sample Lead Times */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {content.policies[2].title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {content.policies[2].description}
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                {content.policies[2].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* --- Certifications & Trust Footprint --- */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">
                {content.certTitle}
              </h4>
            </div>
            <p className="text-xs text-slate-500">{content.certDesc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700">
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" /> ISO 9001
            </span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" /> OEKO-TEX 100
            </span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> BSCI
              Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
