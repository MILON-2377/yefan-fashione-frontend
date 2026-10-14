import { Metadata } from "next";
import { InquiriesList } from "@/features/admin/inquiries/components/InquiriesList";

export const metadata: Metadata = {
  title: "Inquiries | Admin Dashboard",
};

export default function InquiriesPage() {
  return (
    <div className="p-6 sm:p-8">
      <InquiriesList />
    </div>
  );
}
