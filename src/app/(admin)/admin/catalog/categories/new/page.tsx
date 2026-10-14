import { Metadata } from "next";
import { CategoryCreationWorkflow } from "@/features/admin/categories/components/CategoryCreationWorkflow";

export const metadata: Metadata = {
  title: "Create Category | Admin Atelier",
  description: "Create a new product category taxonomy with cover assets.",
};

export default function CreateCategoryPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <CategoryCreationWorkflow />
    </div>
  );
}
