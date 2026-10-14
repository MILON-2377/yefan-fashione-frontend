import { Metadata } from "next";
import { InquiryDetailContent } from "@/features/admin/inquiries/components/InquiryDetailContent";

export const metadata: Metadata = {
  title: "Inquiry Details | Admin Dashboard",
};

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = await params;

  return (
    <div className="p-6 sm:p-8">
      <InquiryDetailContent id={id} />
    </div>
  );
}
