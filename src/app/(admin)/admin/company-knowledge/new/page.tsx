import { Metadata } from "next";
import { CompanyKnowledgeForm } from "@/features/admin/companyKnowledge/components/CompanyKnowledgeForm";

export const metadata: Metadata = {
  title: "Create Company Knowledge | Admin Dashboard",
};

export default function CreateCompanyKnowledgePage() {
  return (
    <div className="p-6 sm:p-8">
      <CompanyKnowledgeForm />
    </div>
  );
}
