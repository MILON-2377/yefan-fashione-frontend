"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  categorySchema,
  CategoryFormValues,
  CategoryFormInput,
} from "../schemas/categorySchema";

import { CategoryBasicInfoSection } from "./CategoryBasicInfoSection";
import { CategoryMediaSection } from "./CategoryMediaSection";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useMediaUpload } from "../../../media/hooks/useMediaUpload";

import { CategoryWorkflowHeader } from "./CategoryWorkflowHeader";
import { CategoryWorkflowError } from "./CategoryWorkflowError";

interface CategoryCreationWorkflowProps {
  isEditing?: boolean;
  categoryId?: string;
  initialValues?: Partial<CategoryFormInput>;
}

export function CategoryCreationWorkflow({
  isEditing = false,
  categoryId,
  initialValues,
}: CategoryCreationWorkflowProps) {
  const router = useRouter();

  // Asset & Validation State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.image_media_url || null,
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Mutation & Media Upload Hooks
  const {
    createCategory,
    isPending: isCreatingPending,
    error: createError,
  } = useCreateCategory();

  const {
    updateCategory,
    isPending: isUpdatingPending,
    error: updateError,
  } = useUpdateCategory();

  const { uploadMedia, isUploading, error: uploadError } = useMediaUpload();

  const isPending = isCreatingPending || isUpdatingPending || isUploading;
  const activeError =
    validationError || createError || updateError || uploadError;

  // Type-Safe React Hook Form Setup
  const methods = useForm<CategoryFormInput, unknown, CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      image_media_id: initialValues?.image_media_id || "",
      image_media_url: initialValues?.image_media_url || "",
      status: initialValues?.status || "DRAFT",
    },
  });

  const { watch, setValue, reset, handleSubmit } = methods;

  // Sync initial values on edit mode hydration or route change
  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name || "",
        description: initialValues.description || "",
        image_media_id: initialValues.image_media_id || "",
        image_media_url: initialValues.image_media_url || "",
        status: initialValues.status || "DRAFT",
      });
      if (initialValues.image_media_url) {
        setPreviewUrl(initialValues.image_media_url);
      }
    }
  }, [initialValues, reset]);

  const mediaId = watch("image_media_id");
  const mediaUrl = watch("image_media_url");
  const hasImageAttached = Boolean(previewUrl || mediaId || mediaUrl);

  // File Handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setValue("image_media_url", objectUrl, { shouldValidate: true });
    setValidationError(null);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("image_media_id", "");
    setValue("image_media_url", "");
  };

  // Creation / Update Handler
  const handleSave = async (data: CategoryFormValues) => {
    // Execution guard: Disable submit during any pending state
    if (isPending) return;

    setValidationError(null);

    // Validation Guard: Category cannot be published without a cover asset
    if (data.status === "PUBLISHED" && !hasImageAttached && !selectedFile) {
      setValidationError(
        "A category cannot be published without a cover image asset. Please upload an image first.",
      );
      return;
    }

    let mediaIdToSubmit = data.image_media_id || "";

    // Upload media file first using uploadMedia (Cloudinary pipeline) if new file selected
    if (selectedFile) {
      const uploadedId = await uploadMedia({
        file: selectedFile,
        namespace: "categories",
        entityId: categoryId || crypto.randomUUID(),
      });

      if (!uploadedId) return;
      mediaIdToSubmit = uploadedId;
    }

    if (isEditing && categoryId) {
      // Execute Update Action
      const updatedCategory = await updateCategory(categoryId, {
        name: data.name,
        description: data.description,
        status: data.status,
        image_media_id: mediaIdToSubmit,
      });

      if (updatedCategory) {
        router.push("/admin/catalog/categories");
      }
    } else {
      // Execute Create Action
      const newCategory = await createCategory({
        name: data.name,
        description: data.description,
        status: data.status,
        image_media_id: mediaIdToSubmit,
      });

      if (newCategory) {
        router.push("/admin/catalog/categories");
      }
    }
  };

  const handleSaveAction = handleSubmit(handleSave);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSaveAction}
        className="space-y-8 max-w-5xl mx-auto pb-12"
      >
        {/* Top Action Header */}
        <CategoryWorkflowHeader
          isEditing={isEditing}
          isPending={isPending}
          isUploading={isUploading}
          onCancel={() => router.push("/admin/catalog/categories")}
          onSave={handleSaveAction}
        />

        {/* Global Error Notice */}
        <CategoryWorkflowError error={activeError} />

        {/* Stacked Multi-Section Form */}
        <div className="space-y-6">
          <CategoryBasicInfoSection isEditing={isEditing} />

          <CategoryMediaSection
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClearImage={handleClearImage}
            disabled={isPending}
            categoryId={categoryId || "draft"}
          />
        </div>
      </form>
    </FormProvider>
  );
}
