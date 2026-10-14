"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Film, X } from "lucide-react";
import Link from "next/link";
import {
  createAboutVideoSchema,
  CreateAboutVideoFormValues,
} from "../schemas/aboutVideoSchema";
import { useCreateAboutVideo } from "../hooks/useCreateAboutVideo";
import { useUpdateAboutVideo } from "../hooks/useUpdateAboutVideo";
import { MediaUploader } from "@/features/media/components/MediaUploader";
import { UploadedMediaResult } from "@/features/media/types/mediaTypes";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface AboutVideoFormProps {
  initialValues?: Partial<CreateAboutVideoFormValues> & { video_url?: string };
  isEditing?: boolean;
  videoId?: string;
}

export function AboutVideoForm({
  initialValues,
  isEditing = false,
  videoId = "",
}: AboutVideoFormProps) {
  const router = useRouter();

  const createMutation = useCreateAboutVideo();
  const updateMutation = useUpdateAboutVideo(videoId);

  const activeMutation = isEditing ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const apiError = activeMutation.error;
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string>("");

  const previewUrl = uploadedPreviewUrl || initialValues?.video_url || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateAboutVideoFormValues>({
    resolver: zodResolver(createAboutVideoSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      media_asset_id: initialValues?.media_asset_id || "",
      sort_order: initialValues?.sort_order ?? 0,
      status: initialValues?.status || "DRAFT",
    },
  });

  const handleMediaUploadSuccess = (results: UploadedMediaResult[]) => {
    if (results.length > 0) {
      const { mediaAssetId, previewUrl } = results[0];
      setValue("media_asset_id", mediaAssetId, { shouldValidate: true });
      setUploadedPreviewUrl(previewUrl);
    }
  };

  const handleRemoveVideo = () => {
    setValue("media_asset_id", "", { shouldValidate: true });
    setUploadedPreviewUrl("");
  };

  const onSubmit = (data: CreateAboutVideoFormValues) => {
    if (isEditing && videoId) {
      updateMutation.mutate(data, {
        onSuccess: () => router.push("/admin/about-videos"),
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => router.push("/admin/about-videos"),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto pb-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/about-videos"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              {isEditing ? "Edit About Video" : "Create New About Video"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload brand highlight videos and configure promotional display
              ordering.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => router.push("/admin/about-videos")}
            disabled={isPending}
          >
            Cancel
          </ActionButton>

          <ActionButton
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
            isLoading={isPending}
            loadingText={isEditing ? "Updating..." : "Saving..."}
          >
            {isEditing ? "Save Changes" : "Save as Draft"}
          </ActionButton>
        </div>
      </div>

      {/* Error Banner */}
      {apiError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm font-mono">
          {apiError.message || "Failed to submit about video form."}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Video Information
            </h2>

            {/* Video Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Video Title <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. Atelier Heritage & Craftsmanship Showcase"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
              {errors.title && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Brief summary of the video content..."
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-y"
              />
            </div>
          </div>

          {/* Video Asset Upload Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Video Media Asset <span className="text-rose-500">*</span>
            </h2>

            {!previewUrl ? (
              <MediaUploader
                mode="single"
                maxSizeMB={100}
                acceptedTypes="video/mp4, video/webm, video/quicktime"
                namespace="about-videos"
                onUploadSuccess={handleMediaUploadSuccess}
              />
            ) : (
              <div className="space-y-3">
                <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video border border-slate-200 flex items-center justify-center">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-lg transition-colors shadow-md z-10"
                    title="Remove Video"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] font-mono text-slate-500 text-center">
                  Video attached successfully and ready to save.
                </p>
              </div>
            )}

            {errors.media_asset_id && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.media_asset_id.message}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Display Settings */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Display Settings
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Sort Order
              </label>
              <input
                {...register("sort_order")}
                type="number"
                min={0}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first on the public website.
              </p>
            </div>
          </div>

          {/* Status Selection */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Status
            </h2>

            {!isEditing ? (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span>Default: Draft</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  New videos are created in <strong>Draft</strong> status. You
                  can publish or edit them after review.
                </p>
                <input type="hidden" {...register("status")} value="DRAFT" />
              </div>
            ) : (
              <div className="space-y-2">
                {(["DRAFT", "PUBLISHED", "ARCHIVED"] as const).map(
                  (statusOption) => (
                    <label
                      key={statusOption}
                      className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <input
                        {...register("status")}
                        type="radio"
                        value={statusOption}
                        className="text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-xs font-semibold text-slate-900 capitalize">
                        {statusOption.toLowerCase()}
                      </span>
                    </label>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
