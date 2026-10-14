"use client";

import { Loader2, AlertCircle } from "lucide-react";
import { useAboutVideo } from "../hooks/useAboutVideo";
import { AboutVideoForm } from "./CreateAboutVideoForm";

interface EditAboutVideoContentProps {
  id: string;
}

export function EditAboutVideoContent({ id }: EditAboutVideoContentProps) {
  const { data: item, isLoading, isError, error } = useAboutVideo(id);

  if (isLoading) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
        <p className="text-xs font-mono">Loading video details...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-3 max-w-xl mx-auto mt-12">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Failed to load video</p>
          <p className="mt-0.5">{error?.message || "Requested video record could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <AboutVideoForm
      initialValues={{
        title: item.title,
        description: item.description,
        media_asset_id: item.media_asset_id,
        video_url: item.video_url,
        sort_order: item.sort_order,
        status: item.status,
      }}
      isEditing={true}
      videoId={item.id}
    />
  );
}
