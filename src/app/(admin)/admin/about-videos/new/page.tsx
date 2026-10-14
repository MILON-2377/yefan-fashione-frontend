import { AboutVideoForm } from "@/features/admin/aboutVideos/components/CreateAboutVideoForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About Video | Admin Dashboard",
};

export default function CreateAboutVideoPage() {
  return (
    <div className="p-6 sm:p-8">
      <AboutVideoForm />
    </div>
  );
}
