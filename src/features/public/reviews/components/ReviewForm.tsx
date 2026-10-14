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
      <div className="max-w-xl mx-auto my-12 p-8 sm:p-10 bg-white border border-slate-200/80 rounded-3xl text-center space-y-5 shadow-xl shadow-slate-100 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200/60 shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            {t.successTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {t.successDescription}
          </p>
        </div>
        <div className="pt-4">
          <AppButton
            type="button"
            onClick={() => router.push("/")}
            variant="primary"
            className="bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-xl shadow-md transition-all"
          >
            {t.returnHomeBtn}
          </AppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-8">
      <div className="text-center space-y-3 pb-8 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
          {t.heading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          {t.subheading}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-8">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-mono leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Rating Picker */}
        <div className="bg-linear-to-b from-slate-50 to-slate-100/60 border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xs">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
            {t.overallRating} <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setValue("rating", star, { shouldValidate: true })
                }
                onMouseEnter={() => setRatingHover(star)}
                onMouseLeave={() => setRatingHover(0)}
                className="p-1 focus:outline-none transition-transform hover:scale-115 active:scale-95"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    (ratingHover || currentRating) >= star
                      ? "text-amber-400 fill-amber-400 drop-shadow-xs"
                      : "text-slate-300 fill-slate-100"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs font-mono font-semibold text-slate-500">
            {currentRating} {t.outOfFiveStars}
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {t.fullNameLabel} <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder={t.fullNamePlaceholder}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {getErrorMessage("name") && (
              <p className="text-xs text-rose-600 font-mono mt-1">
                {getErrorMessage("name")}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {t.companyLabel} <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              {...register("company_name")}
              type="text"
              placeholder={t.companyPlaceholder}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {getErrorMessage("company_name") && (
              <p className="text-xs text-rose-600 font-mono mt-1">
                {getErrorMessage("company_name")}
              </p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {t.jobTitleLabel} <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              {...register("job_title")}
              type="text"
              placeholder={t.jobTitlePlaceholder}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {getErrorMessage("job_title") && (
              <p className="text-xs text-rose-600 font-mono mt-1">
                {getErrorMessage("job_title")}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {t.countryLabel} <span className="text-rose-500">*</span>
              </span>
            </label>
            <input
              {...register("country")}
              type="text"
              placeholder={t.countryPlaceholder}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {getErrorMessage("country") && (
              <p className="text-xs text-rose-600 font-mono mt-1">
                {getErrorMessage("country")}
              </p>
            )}
          </div>
        </div>

        {/* Review Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {t.messageLabel} <span className="text-rose-500">*</span>
            </span>
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder={t.messagePlaceholder}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y"
          />
          {getErrorMessage("message") && (
            <p className="text-xs text-rose-600 font-mono mt-1">
              {getErrorMessage("message")}
            </p>
          )}
        </div>

        {/* Media Uploader */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <ImagePlus className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {t.avatarLabel}{" "}
              <span className="text-slate-400 font-normal">
                {t.optionalText}
              </span>
            </span>
          </label>

          {!avatarPreview ? (
            <MediaUploader
              mode="single"
              maxSizeMB={5}
              acceptedTypes="image/jpeg, image/png, image/webp"
              namespace="reviews"
              onUploadSuccess={handleAvatarUpload}
            />
          ) : (
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <Image
                  src={avatarPreview}
                  alt="Avatar Preview"
                  unoptimized
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">
                    {t.photoAttachedTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {t.photoAttachedSub}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title={t.removePhotoTitle}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <AppButton
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"
          >
            {isSubmitting ? t.submittingBtn : t.submitBtn}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
