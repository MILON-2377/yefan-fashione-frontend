import { ProductEditWorkflow } from "@/features/admin/products/components/edit/ProductEditWorkflow";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  return <ProductEditWorkflow productId={id} />;
}
