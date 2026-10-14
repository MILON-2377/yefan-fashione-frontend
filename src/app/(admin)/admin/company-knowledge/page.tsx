import { Metadata } from "next";
import { CompanyKnowledgeList } from "@/features/admin/companyKnowledge/components/CompanyKnowledgeList";

export const metadata: Metadata = {
  title: "Company Knowledge Base | Admin Dashboard",
};

export default function CompanyKnowledgeListPage() {
  return (
    <div className="p-6 sm:p-8">
      <CompanyKnowledgeList />
    </div>
  );
}
