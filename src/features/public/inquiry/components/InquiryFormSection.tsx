"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Shirt } from "lucide-react";
import { AppButton } from "@/features/common/ui/AppButton";
import { useCreateInquiry } from "../hooks/useCreateInquiry";
import { inquiryFormSchema, InquiryFormValues } from "../schemas/inquirySchema";
import { CreateInquiryRequest } from "../types/inquiryTypes";
import { useLanguage } from "@/context/LanguageContext";

export function InquiryFormSection() {
  const { dict } = useLanguage();
  const content = dict.inquiryFormSection;

  const searchParams = useSearchParams();
  const productId = searchParams?.get("product");
  const selectedColor = searchParams?.get("color");
  const selectedSize = searchParams?.get("size");

  const [isSuccess, setIsSuccess] = useState(false);
  const createInquiryMutation = useCreateInquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      companyName: "",
      jobTitle: "",
      inquiryType: productId ? "PRODUCT" : "OEM",
      quantityRange: "SMALL_BATCH",
      message: "",
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    const payload: CreateInquiryRequest = {
      name: data.fullName,
      email: data.email,
      phone: data.phone || undefined,
      country: data.country || undefined,
      company_name: data.companyName || undefined,
      job_title: data.jobTitle || undefined,
      inquiry_type: data.inquiryType,
      quantity_range: data.quantityRange,
      message: data.message,
      source_page:
        typeof window !== "undefined" ? window.location.href : undefined,
      products: productId
        ? [
            {
              product_id: productId,
              quantity_requested: 1,
              notes: `Selected Color: ${selectedColor || "N/A"}, Size: ${
                selectedSize || "N/A"
              }`,
            },
          ]
        : [],
    };

    createInquiryMutation.mutate(payload, {
      onSuccess: () => {
        setIsSuccess(true);
        reset();
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          {content.successTitle}
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          {content.successDesc}
        </p>
        <AppButton
          type="button"
          onClick={() => setIsSuccess(false)}
          variant="primary"
          className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold"
        >
          {content.sendAnotherBtn}
        </AppButton>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">{content.title}</h2>
          <p className="text-xs text-slate-500 mt-1">{content.subtitle}</p>

          {productId && (
            <div className="mt-3 p-3 bg-blue-100/60 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-900 font-medium">
              <Shirt className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {content.itemAttached} <strong>{productId}</strong>
                {selectedColor ? ` | ${content.color} ${selectedColor}` : ""}
                {selectedSize ? ` | ${content.size} ${selectedSize}` : ""}
              </span>
            </div>
          )}
        </div>

        {createInquiryMutation.isError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            {content.errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.fullName} <span className="text-blue-600">*</span>
            </label>
            <input
              type="text"
              placeholder={content.fullNamePlaceholder}
              {...register("fullName")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.email} <span className="text-blue-600">*</span>
            </label>
            <input
              type="email"
              placeholder={content.emailPlaceholder}
              {...register("email")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.phone}
            </label>
            <input
              type="tel"
              placeholder={content.phonePlaceholder}
              {...register("phone")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.country}
            </label>
            <input
              type="text"
              placeholder={content.countryPlaceholder}
              {...register("country")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.companyName}
            </label>
            <input
              type="text"
              placeholder={content.companyNamePlaceholder}
              {...register("companyName")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.jobTitle}
            </label>
            <input
              type="text"
              placeholder={content.jobTitlePlaceholder}
              {...register("jobTitle")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Inquiry Type Enum */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.inquiryType} <span className="text-blue-600">*</span>
            </label>
            <select
              {...register("inquiryType")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            >
              <option value="GENERAL">
                {content.inquiryTypeOptions.GENERAL}
              </option>
              <option value="PRODUCT">
                {content.inquiryTypeOptions.PRODUCT}
              </option>
              <option value="CUSTOMIZATION">
                {content.inquiryTypeOptions.CUSTOMIZATION}
              </option>
              <option value="OEM">{content.inquiryTypeOptions.OEM}</option>
              <option value="ODM">{content.inquiryTypeOptions.ODM}</option>
              <option value="PRIVATE_LABEL">
                {content.inquiryTypeOptions.PRIVATE_LABEL}
              </option>
              <option value="WHOLESALE">
                {content.inquiryTypeOptions.WHOLESALE}
              </option>
            </select>
          </div>

          {/* Quantity Range Enum */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {content.quantityRange}
            </label>
            <select
              {...register("quantityRange")}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            >
              <option value="SAMPLE">
                {content.quantityRangeOptions.SAMPLE}
              </option>
              <option value="SMALL_BATCH">
                {content.quantityRangeOptions.SMALL_BATCH}
              </option>
              <option value="WHOLESALE">
                {content.quantityRangeOptions.WHOLESALE}
              </option>
              <option value="LARGE_VOLUME">
                {content.quantityRangeOptions.LARGE_VOLUME}
              </option>
              <option value="NOT_SURE">
                {content.quantityRangeOptions.NOT_SURE}
              </option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            {content.message} <span className="text-blue-600">*</span>
          </label>
          <textarea
            rows={4}
            placeholder={content.messagePlaceholder}
            {...register("message")}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
          />
          {errors.message && (
            <p className="text-[11px] text-rose-600 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <AppButton
          type="submit"
          variant="primary"
          isLoading={createInquiryMutation.isPending}
          loadingText={content.submittingText}
          leftIcon={<Send className="w-4 h-4" />}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md"
        >
          {content.submitBtn}
        </AppButton>

        <p className="text-[11px] text-slate-400 text-center">
          {content.privacyNotice}
        </p>
      </form>
    </div>
  );
}
