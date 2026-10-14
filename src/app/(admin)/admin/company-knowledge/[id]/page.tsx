import { Metadata } from "next";
import { EditKnowledgeContent } from "@/features/admin/companyKnowledge/components/EditKnowledgeContent";

export const metadata: Metadata = {
  title: "Edit Company Knowledge | Admin Dashboard",
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCompanyKnowledgePage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <div className="p-6 sm:p-8">
      <EditKnowledgeContent id={id} />
    </div>
  );
}
