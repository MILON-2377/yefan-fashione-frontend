import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, ProfileFormValues } from "../schemas/profileSchema";
import { UserProfileResponse } from "../types";
import { AvatarUpload } from "./AvaterUpload";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

interface ProfileFormProps {
  initialData?: UserProfileResponse;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const { data: profile, isLoading: isFetchingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const activeProfile = profile || initialData;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      display_name: "",
      phone: "",
      job_title: "",
      bio: "",
      avatar_media_id: null,
    },
  });

  const displayName = watch("display_name");

  useEffect(() => {
    if (activeProfile) {
      reset({
        first_name: activeProfile.first_name ?? "",
        last_name: activeProfile.last_name ?? "",
        display_name: activeProfile.display_name ?? "",
        phone: activeProfile.phone ?? "",
        job_title: activeProfile.job_title ?? "",
        bio: activeProfile.bio ?? "",
        avatar_media_id: activeProfile.avatar_media_id ?? null,
      });
    }
  }, [activeProfile, reset]);

  const handleAvatarSuccess = (mediaAssetId: string) => {
    setValue("avatar_media_id", mediaAssetId, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: ProfileFormValues) => {
    setFeedback(null);

    const payload = {
      first_name: values.first_name?.trim() || null,
      last_name: values.last_name?.trim() || null,
      display_name: values.display_name?.trim() || null,
      phone: values.phone?.trim() || null,
      job_title: values.job_title?.trim() || null,
      bio: values.bio?.trim() || null,
      avatar_media_id: values.avatar_media_id || null,
    };

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        setFeedback({
          type: "success",
          message: "Profile details updated successfully.",
        });
      },
      onError: (err) => {
        setFeedback({
          type: "error",
          message: err.message || "Failed to update profile details.",
        });
      },
    });
  };

  if (isFetchingProfile && !activeProfile) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200/80 animate-pulse space-y-6">
        <div className="h-20 w-20 bg-slate-200 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-slate-200 rounded-lg" />
          <div className="h-10 bg-slate-200 rounded-lg" />
        </div>
        <div className="h-24 bg-slate-200 rounded-lg" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-8 shadow-xs"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Update your personal information and profile picture.
        </p>
      </div>

      <div className="pb-6 border-b border-slate-100">
        <label className="block text-xs font-medium text-slate-700 mb-3">
          Profile Photo
        </label>
        <AvatarUpload
          avatarUrl={activeProfile?.avatar?.url}
          displayName={displayName}
          entityId={activeProfile?.user_id || "me"}
          onUploadSuccess={handleAvatarSuccess}
          disabled={updateProfileMutation.isPending}
        />
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            First Name
          </label>
          <input
            type="text"
            {...register("first_name")}
            placeholder="John"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {errors.first_name && (
            <p className="text-xs text-rose-600">{errors.first_name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("last_name")}
            placeholder="Doe"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {errors.last_name && (
            <p className="text-xs text-rose-600">{errors.last_name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Display Name
          </label>
          <input
            type="text"
            {...register("display_name")}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {errors.display_name && (
            <p className="text-xs text-rose-600">
              {errors.display_name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {errors.phone && (
            <p className="text-xs text-rose-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-medium text-slate-700">
            Job Title
          </label>
          <input
            type="text"
            {...register("job_title")}
            placeholder="Senior Administrator"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {errors.job_title && (
            <p className="text-xs text-rose-600">{errors.job_title.message}</p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-medium text-slate-700">
            Bio
          </label>
          <textarea
            rows={4}
            {...register("bio")}
            placeholder="Brief bio or description..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
          />
          {errors.bio && (
            <p className="text-xs text-rose-600">{errors.bio.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => activeProfile && reset()}
          disabled={!isDirty || updateProfileMutation.isPending}
          className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50 transition-colors"
        >
          Discard Changes
        </button>

        <button
          type="submit"
          disabled={!isDirty || updateProfileMutation.isPending || isSubmitting}
          className="px-5 py-2.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-xs flex items-center gap-2"
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
