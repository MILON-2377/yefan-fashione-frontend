import { getCategoryById } from "@/features/admin/categories/api/getCategoryById";
import { CategoryCreationWorkflow } from "@/features/admin/categories/components/CategoryCreationWorkflow";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  const initialValues = {
    name: category.name || "",
    description: category.description || "",
    status: category.status || "DRAFT",
    image_media_id: category.image?.id || "",
    image_media_url: category.image?.url || "",
  };

  return (
    <CategoryCreationWorkflow
      key={category.updated_at || category.id}
      isEditing={true}
      categoryId={category.id}
      initialValues={initialValues}
    />
  );
}
