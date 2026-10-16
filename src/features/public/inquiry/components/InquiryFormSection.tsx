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
      <div className="space-y-5 border border-[#E7E1D9] bg-white px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#51463B]">
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
        </div>

        <div className="space-y-3">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9D8974]">
            YIFAN ATELIER
          </span>

          <h3 className="font-serif text-2xl font-medium tracking-tight text-[#211F1C] sm:text-3xl">
            {content.successTitle}
          </h3>

          <p className="mx-auto max-w-md text-sm leading-7 text-[#625D57]">
            {content.successDesc}
          </p>
        </div>

        <div className="pt-3">
          <AppButton
            type="button"
            onClick={() => setIsSuccess(false)}
            variant="primary"
            className="mt-2 rounded-none border border-[#51463B] bg-[#51463B] px-8 py-3 text-xs font-semibold tracking-[0.12em] text-white shadow-none transition-colors hover:border-[#211F1C] hover:bg-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2"
          >
            {content.sendAnotherBtn}
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#E7E1D9] bg-white p-5 sm:p-8 lg:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Form Header */}
        <div className="border-b border-[#E7E1D9] pb-5">
          <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D8974]">
            YIFAN ATELIER · B2B
          </span>

          <h2 className="font-serif text-2xl font-medium tracking-tight text-[#211F1C] sm:text-3xl">
            {content.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#625D57]">
            {content.subtitle}
          </p>

          {productId && (
            <div className="mt-5 flex items-start gap-3 border border-[#D8C9B8] bg-[#FAF8F4] p-4 text-sm text-[#51463B]">
              <Shirt className="mt-0.5 h-5 w-5 shrink-0 text-[#9D8974]" />

              <div className="min-w-0 leading-6">
                <span className="font-medium">{content.itemAttached}</span>{" "}
                <strong className="break-all font-semibold text-[#211F1C]">
                  {productId}
                </strong>
                {selectedColor && (
                  <span className="block text-xs text-[#625D57]">
                    {content.color}: {selectedColor}
                  </span>
                )}
                {selectedSize && (
                  <span className="block text-xs text-[#625D57]">
                    {content.size}: {selectedSize}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submission Error */}
        {createInquiryMutation.isError && (
          <div
            role="alert"
            className="border border-[#D8B8AC] bg-[#FBF4F1] px-4 py-3 text-sm leading-6 text-[#8A4939]"
          >
            {content.errorMessage}
          </div>
        )}

        {/* Contact Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#51463B]">
              Contact Information
            </h3>
            <div className="mt-3 h-px w-10 bg-[#9D8974]" />
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-full-name"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.fullName} <span className="text-[#9D8974]">*</span>
              </label>

              <input
                id="inquiry-full-name"
                type="text"
                autoComplete="name"
                placeholder={content.fullNamePlaceholder}
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? "inquiry-full-name-error" : undefined
                }
                {...register("fullName")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />

              {errors.fullName && (
                <p
                  id="inquiry-full-name-error"
                  className="text-xs font-medium text-[#A14F40]"
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-email"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.email} <span className="text-[#9D8974]">*</span>
              </label>

              <input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                placeholder={content.emailPlaceholder}
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "inquiry-email-error" : undefined
                }
                {...register("email")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />

              {errors.email && (
                <p
                  id="inquiry-email-error"
                  className="text-xs font-medium text-[#A14F40]"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-phone"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.phone}
              </label>

              <input
                id="inquiry-phone"
                type="tel"
                autoComplete="tel"
                placeholder={content.phonePlaceholder}
                {...register("phone")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-country"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.country}
              </label>

              <input
                id="inquiry-country"
                type="text"
                autoComplete="country-name"
                placeholder={content.countryPlaceholder}
                {...register("country")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-company"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.companyName}
              </label>

              <input
                id="inquiry-company"
                type="text"
                autoComplete="organization"
                placeholder={content.companyNamePlaceholder}
                {...register("companyName")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-job-title"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.jobTitle}
              </label>

              <input
                id="inquiry-job-title"
                type="text"
                autoComplete="organization-title"
                placeholder={content.jobTitlePlaceholder}
                {...register("jobTitle")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
              />
            </div>
          </div>
        </div>

        {/* Order Requirements */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#51463B]">
              Order Requirements
            </h3>
            <div className="mt-3 h-px w-10 bg-[#9D8974]" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Inquiry Type */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-type"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.inquiryType} <span className="text-[#9D8974]">*</span>
              </label>

              <select
                id="inquiry-type"
                {...register("inquiryType")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
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

            {/* Quantity Range */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-quantity-range"
                className="block text-xs font-semibold text-[#51463B]"
              >
                {content.quantityRange}
              </label>

              <select
                id="inquiry-quantity-range"
                {...register("quantityRange")}
                className="w-full rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
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
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="inquiry-message"
            className="block text-xs font-semibold text-[#51463B]"
          >
            {content.message} <span className="text-[#9D8974]">*</span>
          </label>

          <textarea
            id="inquiry-message"
            rows={5}
            placeholder={content.messagePlaceholder}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "inquiry-message-error" : undefined
            }
            {...register("message")}
            className="w-full resize-y rounded-none border border-[#E7E1D9] bg-[#FAF8F4] px-4 py-3 text-sm leading-6 text-[#211F1C] outline-none transition-colors placeholder:text-[#A39A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/30"
          />

          {errors.message && (
            <p
              id="inquiry-message-error"
              className="text-xs font-medium text-[#A14F40]"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="border-t border-[#E7E1D9] pt-6">
          <AppButton
            type="submit"
            variant="primary"
            isLoading={createInquiryMutation.isPending}
            loadingText={content.submittingText}
            leftIcon={<Send className="h-4 w-4" />}
            className="w-full rounded-none border border-[#51463B] bg-[#51463B] py-4 text-sm font-semibold tracking-wide text-white shadow-none transition-colors hover:border-[#211F1C] hover:bg-[#211F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2"
          >
            {content.submitBtn}
          </AppButton>

          <p className="mt-4 text-center text-[11px] leading-5 text-[#81786F]">
            {content.privacyNotice}
          </p>
        </div>
      </form>
    </div>
  );
}
