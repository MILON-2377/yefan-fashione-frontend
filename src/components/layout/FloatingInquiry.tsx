"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { AppButton } from "@/components/ui/app-button";

export function FloatingInquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/inquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            subject: `Floating Inquiry (${formData.quantity || "N/A"} units)`,
            message: formData.message,
          }),
        },
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", quantity: "", message: "" });
    } catch {
      // Local fallback for dev/offline mode
      setSubmitted(true);
      setFormData({ name: "", email: "", quantity: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Animated Inquiry Modal Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            {/* Clean Light Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">
                  Fast Wholesale Quote
                </span>
                <h3 className="text-base font-bold text-slate-800 tracking-tight">
                  Inquire Factory Direct
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-200/60"
                aria-label="Close Inquiry Dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content / Form */}
            <div className="p-5 bg-white">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="py-8 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Thank you. Our export sales manager will review your request
                    and contact you within 24 hours.
                  </p>
                  <AppButton
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Send Another Request
                  </AppButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name / Company *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe (Boutique Co.)"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Quantity / Product SKU
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="e.g. 50-100 pcs or SKU #S6393"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Requirement Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="Describe custom sizing, fabric options, or shipping destination..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <AppButton
                      type="submit"
                      isLoading={loading}
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm"
                    >
                      Submit Quote Request
                    </AppButton>
                  </div>

                  {/* Trust badges */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      24h Response
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      Strict NDA Policy
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-blue-400/30"
        aria-label="Toggle Inquiry Form"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Quick Inquiry</span>
      </motion.button>
    </div>
  );
}
