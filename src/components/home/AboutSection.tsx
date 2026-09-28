"use client";

import { useState, useEffect } from "react";
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
import { AppButton } from "@/components/ui/app-button";

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
  const [stats, setStats] = useState<CompanyStats>(DEFAULT_STATS);

  useEffect(() => {
    let isMounted = true;
    async function fetchCompanyMetrics() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/settings/company-stats`,
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setStats(data);
        }
      } catch {
        // Fallback to default metrics on API disconnect
      }
    }
    fetchCompanyMetrics();
    return () => {
      isMounted = false;
    };
  }, []);

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
            <span>Excellence in Craftsmanship</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Guangzhou Yifan Apparel Co., Ltd.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            Specializing in high-end couture, bridal wear, and bespoke apparel
            manufacturing. We provide tier-one OEM/ODM production, precise
            pattern creation, and reliable direct-from-factory global export
            logistics tailored for boutique brands and international
            wholesalers.
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
              Years Manufacturing Experience
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.globalPartners}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Global Boutique Partners
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.monthlyCapacity}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Monthly Production Output
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:border-blue-300 transition-colors">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight block">
              {stats.qualityPassRate}
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-1 block">
              Export Quality Pass Rate
            </span>
          </div>
        </motion.div>

        {/* --- Company Policies & Compliance Framework --- */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Our Corporate & Export Policies
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard operating guidelines for wholesale, sample production,
                and international shipping.
              </p>
            </div>

            <AppButton
              variant="outline"
              size="sm"
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs w-fit"
            >
              Request Full Spec Sheet (PDF)
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
                1. 100% Quality Inspection Policy
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every unit passes through a 4-stage inspection (Fabric, In-line
                Stitching, Finished Garment, and Packaging) prior to dispatch.
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>AQL 2.5 Standard Verification</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Defect-free shipment guarantee</span>
                </li>
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
                2. Design NDA & IP Protection
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We sign formal Non-Disclosure Agreements for all custom
                tech-packs, brand patterns, and exclusive boutique designs.
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Zero third-party design leaks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Exclusive mold & pattern retention</span>
                </li>
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
                3. Lead Times & Flexible MOQ
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Streamlined sample production within 7-10 business days and bulk
                order fulfilment within 20-30 days.
              </p>
              <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Low MOQ options for startups</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Express air & sea freight routing</span>
                </li>
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
                Compliant & Internationally Certified Facility
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Our facilities strictly observe global ethical labor practices and
              environmental standards.
            </p>
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
