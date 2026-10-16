"use client";

import { use } from "react";
import { RefreshCw } from "lucide-react";
import { useCollection } from "@/features/admin/collections/hooks/useCollection";
import { CollectionForm } from "@/features/admin/collections/components/CollectionForm";

export default function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: collection, isLoading, isError } = useCollection(id);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
          <p className="text-xs font-mono text-slate-500">
            Loading collection details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !collection) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-slate-600 text-sm">
        Collection not found or failed to load.
      </div>
    );
  }

  return (
    <CollectionForm
      isEditing
      collectionId={id}
      initialValues={{
        name: collection.name,
        brand_id: collection.brand_id,
        description: collection.description,
        status: collection.status,
      }}
    />
  );
}
