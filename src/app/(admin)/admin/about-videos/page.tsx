import { Metadata } from "next";
import { AboutVideosList } from "@/features/admin/aboutVideos/components/AboutVideoList";

export const metadata: Metadata = {
  title: "About Videos | Admin Dashboard",
};

export default function AboutVideosPage() {
  return (
    <div className="p-6 sm:p-8">
      <AboutVideosList />
    </div>
  );
}
