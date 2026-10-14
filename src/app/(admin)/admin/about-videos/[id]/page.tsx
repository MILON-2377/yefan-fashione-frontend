import { Metadata } from "next";
import { EditAboutVideoContent } from "@/features/admin/aboutVideos/components/EditAboutVideo";

export const metadata: Metadata = {
  title: "Edit About Video | Admin Dashboard",
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAboutVideoPage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <div className="p-6 sm:p-8">
      <EditAboutVideoContent id={id} />
    </div>
  );
}
