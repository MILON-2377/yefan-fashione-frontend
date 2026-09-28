"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Building2,
  Globe2,
  Paperclip,
  Shirt,
  ChevronRight,
} from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    inquiryType: "Custom OEM / ODM Manufacturing",
    estimatedQuantity: "100 - 500 pcs",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-white text-slate-900 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Section */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Atelier & Garment Factory Contact</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Get in Touch with Our Merchandising Team
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Have a custom dress design, tech-pack, or wholesale inquiry? Submit
            your project details below and our fashion merchandisers will
            respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN (~60% Width): Inquiry Form                    */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Inquiry Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Our garment merchandising team has
                  received your message and will review your tech-pack details
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      companyName: "",
                      inquiryType: "Custom OEM / ODM Manufacturing",
                      estimatedQuantity: "100 - 500 pcs",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Send Us an Apparel Inquiry
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below for sampling, bulk quotes, or
                    material swatches.
                  </p>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Work Email <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@boutiquelabel.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  {/* Brand / Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Brand / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maison Elegance Studio"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  {/* Inquiry Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inquiryType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    >
                      <option>Custom OEM / ODM Manufacturing</option>
                      <option>Sample Development & Pattern Making</option>
                      <option>Wholesale Ready-to-Ship Dresses</option>
                      <option>Fabric & Lace Sourcing Request</option>
                      <option>General Business Cooperation</option>
                    </select>
                  </div>

                  {/* Order Quantity Target */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Target Order Quantity (MOQ)
                    </label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedQuantity: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    >
                      <option>50 - 100 pcs (Sample / Small Batch)</option>
                      <option>100 - 500 pcs</option>
                      <option>500 - 2,000 pcs</option>
                      <option>2,000+ pcs (Large Scale Production)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Specifications */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Project Details & Message{" "}
                    <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide dress styles, fabric requirements, target delivery dates, or tech-pack specifications..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                  />
                </div>

                {/* Simulated File Attachment Placeholder */}
                <div className="p-4 bg-white border border-dashed border-slate-300 rounded-xl flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-blue-600" />
                    <span>
                      Attach Tech-Pack or CAD Sketches (PDF, ZIP, PNG)
                    </span>
                  </div>
                  <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                    Browse
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Sending Inquiry..."
                      : "Submit Inquiry Request"}
                  </span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  We respect your privacy. Non-Disclosure Agreements (NDA)
                  available upon request.
                </p>
              </form>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (~40% Width): Location & Company Info        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-8">
            {/* Atelier & Factory Information Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Guangzhou Headquarters
                </span>
                <h3 className="text-2xl font-bold">
                  Guangzhou Yifan Apparel Co., Ltd.
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                {/* Factory Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      Factory & Atelier Address:
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Building B3, Haizhu Garment & Textile Industrial Zone,
                      Haizhu District, Guangzhou, Guangdong, China
                    </p>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      Direct Merchandising Line:
                    </p>
                    <p className="text-slate-300">
                      +86 20 8421 9888 / +86 138 0013 8000
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Official Email:</p>
                    <p className="text-slate-300">inquiry@yifanapparel.com</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Operating Hours:</p>
                    <p className="text-slate-300">
                      Monday - Saturday: 8:30 AM - 6:30 PM (GMT+8)
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-blue-400" /> Worldwide
                  Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-400" /> BSCI Certified
                  Factory
                </span>
              </div>
            </div>

            {/* Embedded Interactive Map Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between px-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Interactive Factory Location
                </h4>
                <span className="text-[11px] font-semibold text-blue-600">
                  Guangzhou, China
                </span>
              </div>

              {/* Map Preview Image / Iframe Container */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                  alt="Guangzhou Apparel Zone Map Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/90 hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-lg backdrop-blur-sm transition-all"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Consultation Callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  Visiting Our Guangzhou Atelier?
                </h4>
                <p className="text-xs text-slate-600">
                  Schedule a private showroom tour and fabric swatch viewing
                  with our senior tailoring team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
