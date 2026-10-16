"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Star,
  Send,
  Sparkles,
  CheckCircle2,
  User,
  Building2,
  Globe,
  Briefcase,
  MessageSquare,
  ImagePlus,
  X,
} from "lucide-react";
import Image from "next/image";
import { AppButton } from "@/features/common/ui/AppButton";
import { submitPublicReview } from "../api/submitPublicReview";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { useLanguage } from "@/context/LanguageContext";
import { CreateReviewPayload } from "../types/reviewTypes";
import { createReviewSchema } from "../schemas/reviewSchema";

interface ReviewFormProps {
  productId?: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const router = useRouter();
  const { dict } = useLanguage();
  const t = dict.reviewForm;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [ratingHover, setRatingHover] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 5,
      product_id: productId || "",
      avatar_media_id: "",
    },
  });

  const currentRating = watch("rating");

  const handleAvatarUpload = (
    results: Array<{ mediaAssetId: string; previewUrl: string }>,
  ) => {
    if (results.length > 0) {
      setValue("avatar_media_id", results[0].mediaAssetId, {
        shouldValidate: true,
      });
      setAvatarPreview(results[0].previewUrl);
    }
  };

  const handleRemoveAvatar = () => {
    setValue("avatar_media_id", "", { shouldValidate: true });
    setAvatarPreview("");
  };

  const onSubmit = async (data: CreateReviewPayload) => {
    setIsSubmitting(true);
    setErrorMessage("");

    // Clean empty optional UUID fields before dispatching
    const payload: CreateReviewPayload = {
      ...data,
      product_id: data.product_id || undefined,
      avatar_media_id: data.avatar_media_id || undefined,
    };

    try {
      await submitPublicReview(payload);
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(t.defaultError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to translate schema error keys dynamically
  const getErrorMessage = (fieldKey: keyof CreateReviewPayload) => {
    const errorMsg = errors[fieldKey]?.message;
    if (!errorMsg) return null;
    if (errorMsg.startsWith("validation.")) {
      const key = errorMsg.replace(
        "validation.",
        "",
      ) as keyof typeof t.validation;
      return t.validation[key] || errorMsg;
    }
    return errorMsg;
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto my-12 max-w-xl animate-in fade-in zoom-in-95 space-y-6 border border-[#E7E1D9] bg-white px-6 py-10 text-center duration-500 sm:px-10 sm:py-12">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#D8C9B8] bg-[#F0ECE6] text-[#806B55]">
          <CheckCircle2 className="h-9 w-9" strokeWidth={1.4} />
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974]">
            <span className="h-px w-5 bg-[#9D8974]" />
            Review Submitted
            <span className="h-px w-5 bg-[#9D8974]" />
          </span>

          <h2 className="font-serif text-2xl font-normal tracking-tight text-[#211F1C] sm:text-3xl">
            {t.successTitle}
          </h2>

          <p className="mx-auto max-w-md text-xs leading-7 text-[#625D57] sm:text-sm sm:leading-8">
            {t.successDescription}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 py-1">
          <span className="h-px w-10 bg-[#E7E1D9]" />
          <span className="h-1.5 w-1.5 bg-[#9D8974]" />
          <span className="h-px w-10 bg-[#E7E1D9]" />
        </div>

        {/* Return Home */}
        <div className="pt-1">
          <AppButton
            type="button"
            onClick={() => router.push("/")}
            variant="primary"
            className="w-full justify-center rounded-none border border-[#211F1C] bg-[#211F1C] px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-none transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B] sm:w-auto"
          >
            {t.returnHomeBtn}
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      {/* Form Header */}
      <div className="space-y-4 border-b border-[#D8C9B8] pb-8 text-center sm:pb-10">
        <div className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#9D8974] sm:text-[10px]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t.badge}</span>
        </div>

        <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl lg:text-5xl">
          {t.heading}
        </h1>

        <p className="mx-auto max-w-lg text-xs leading-7 text-[#625D57] sm:text-sm sm:leading-8">
          {t.subheading}
        </p>

        <div className="mx-auto h-px w-12 bg-[#9D8974]" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 pt-8 sm:pt-10"
      >
        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="border border-[#C9A7A0] bg-[#F8EFEC] px-4 py-3 text-xs leading-6 text-[#8B4B43]"
          >
            {errorMessage}
          </div>
        )}

        {/* Rating Picker */}
        <div className="border border-[#E7E1D9] bg-white px-5 py-7 text-center sm:px-8 sm:py-9">
          <div className="mb-4 space-y-2">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
              Share Your Experience
            </span>

            <label className="block text-xs font-medium uppercase tracking-[0.14em] text-[#51463B]">
              {t.overallRating} <span className="text-[#A66E5E">*</span>
            </label>
          </div>

          <div
            className="flex items-center justify-center gap-2 sm:gap-3"
            role="group"
            aria-label={t.overallRating}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setValue("rating", star, { shouldValidate: true })
                }
                onMouseEnter={() => setRatingHover(star)}
                onMouseLeave={() => setRatingHover(0)}
                onFocus={() => setRatingHover(star)}
                onBlur={() => setRatingHover(0)}
                aria-label={`${star} ${t.outOfFiveStars}`}
                aria-pressed={currentRating === star}
                className="rounded-sm p-1 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9D8974] focus-visible:ring-offset-2 active:scale-95"
              >
                <Star
                  className={`h-7 w-7 transition-colors sm:h-9 sm:w-9 ${
                    (ratingHover || currentRating) >= star
                      ? "fill-[#B49A6C] text-[#B49A6C]"
                      : "fill-[#F0ECE6] text-[#D8C9B8]"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mt-4 text-[10px] tracking-wide text-[#817970]">
            <span className="font-medium text-[#51463B]">{currentRating}</span>{" "}
            {t.outOfFiveStars}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl text-[#211F1C]">
              Your Details
            </span>
            <span className="h-px flex-1 bg-[#E7E1D9]" />
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                <User className="h-3.5 w-3.5 text-[#9D8974]" />
                <span>
                  {t.fullNameLabel} <span className="text-[#A66E5E">*</span>
                </span>
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder={t.fullNamePlaceholder}
                aria-invalid={!!getErrorMessage("name")}
                className="w-full rounded-none border border-[#E7E1D9] bg-white px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A49A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/20"
              />

              {getErrorMessage("name") && (
                <p role="alert" className="text-xs leading-5 text-[#A05246]">
                  {getErrorMessage("name")}
                </p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                <Building2 className="h-3.5 w-3.5 text-[#9D8974]" />
                <span>
                  {t.companyLabel} <span className="text-[#A66E5E">*</span>
                </span>
              </label>

              <input
                {...register("company_name")}
                type="text"
                placeholder={t.companyPlaceholder}
                aria-invalid={!!getErrorMessage("company_name")}
                className="w-full rounded-none border border-[#E7E1D9] bg-white px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A49A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/20"
              />

              {getErrorMessage("company_name") && (
                <p role="alert" className="text-xs leading-5 text-[#A05246]">
                  {getErrorMessage("company_name")}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                <Briefcase className="h-3.5 w-3.5 text-[#9D8974]" />
                <span>
                  {t.jobTitleLabel} <span className="text-[#A66E5E">*</span>
                </span>
              </label>

              <input
                {...register("job_title")}
                type="text"
                placeholder={t.jobTitlePlaceholder}
                aria-invalid={!!getErrorMessage("job_title")}
                className="w-full rounded-none border border-[#E7E1D9] bg-white px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A49A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/20"
              />

              {getErrorMessage("job_title") && (
                <p role="alert" className="text-xs leading-5 text-[#A05246]">
                  {getErrorMessage("job_title")}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                <Globe className="h-3.5 w-3.5 text-[#9D8974]" />
                <span>
                  {t.countryLabel} <span className="text-[#A66E5E">*</span>
                </span>
              </label>

              <input
                {...register("country")}
                type="text"
                placeholder={t.countryPlaceholder}
                aria-invalid={!!getErrorMessage("country")}
                className="w-full rounded-none border border-[#E7E1D9] bg-white px-4 py-3 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A49A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/20"
              />

              {getErrorMessage("country") && (
                <p role="alert" className="text-xs leading-5 text-[#A05246]">
                  {getErrorMessage("country")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Review Message */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
            <MessageSquare className="h-3.5 w-3.5 text-[#9D8974]" />
            <span>
              {t.messageLabel} <span className="text-[#A66E5E]">*</span>
            </span>
          </label>

          <textarea
            {...register("message")}
            rows={5}
            placeholder={t.messagePlaceholder}
            aria-invalid={!!getErrorMessage("message")}
            className="w-full resize-y rounded-none border border-[#E7E1D9] bg-white px-4 py-3.5 text-sm leading-7 text-[#211F1C] outline-none transition-colors placeholder:text-[#A49A90] hover:border-[#D8C9B8] focus:border-[#9D8974] focus:ring-1 focus:ring-[#9D8974]/20"
          />

          {getErrorMessage("message") && (
            <p role="alert" className="text-xs leading-5 text-[#A05246]">
              {getErrorMessage("message")}
            </p>
          )}
        </div>

        {/* Optional Avatar Upload */}
        <div className="space-y-3 border-t border-[#E7E1D9] pt-6">
          <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
            <ImagePlus className="h-3.5 w-3.5 text-[#9D8974]" />
            <span>{t.avatarLabel}</span>
            <span className="normal-case tracking-normal text-[#9A9086]">
              ({t.optionalText})
            </span>
          </label>

          {!avatarPreview ? (
            <div className="border border-dashed border-[#D8C9B8] bg-white p-3 transition-colors hover:border-[#9D8974]">
              <MediaUploader
                mode="single"
                maxSizeMB={5}
                acceptedTypes="image/jpeg, image/png, image/webp"
                namespace="reviews"
                onUploadSuccess={handleAvatarUpload}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 border border-[#E7E1D9] bg-white p-4">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={avatarPreview}
                  alt="Avatar Preview"
                  unoptimized
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full border border-[#E7E1D9] object-cover"
                />

                <div className="min-w-0 space-y-1">
                  <p className="truncate text-xs font-medium text-[#211F1C]">
                    {t.photoAttachedTitle}
                  </p>
                  <p className="text-[10px] leading-5 text-[#817970]">
                    {t.photoAttachedSub}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#817970] transition-colors hover:bg-[#F8EFEC] hover:text-[#A05246]"
                title={t.removePhotoTitle}
                aria-label={t.removePhotoTitle}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="border-t border-[#E7E1D9] pt-6">
          <AppButton
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<Send className="h-4 w-4" />}
            className="w-full justify-center rounded-none border border-[#211F1C] bg-[#211F1C] py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-none transition-colors duration-300 hover:border-[#51463B] hover:bg-[#51463B]"
          >
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </AppButton>

          <p className="mt-4 text-center text-[10px] leading-5 text-[#817970]">
            Thank you for sharing your experience with our atelier.
          </p>
        </div>
      </form>
    </div>
  );
}
