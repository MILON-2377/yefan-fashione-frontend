"use client";

import { CollectionForm } from "@/features/admin/collections/components/CollectionForm";

export default function CreateCollectionPage() {
  return (
    <div className="py-6">
      <CollectionForm
        isEditing={false}
        initialValues={{
          brand_id: "",
          name: "",
          description: "",
          status: "DRAFT",
        }}
      />
    </div>
  );
}
