"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Lock,
  FileEdit,
  Save,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import {
  collectionSchema,
  CollectionFormValues,
} from "../schemas/collectionSchema";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useCreateCollection } from "../hooks/useCreateCollection";
import { useUpdateCollection } from "../hooks/useUpdateCollection";
import { useBrands } from "../../brands/hooks/useBrands";

interface CollectionFormProps {
  initialValues?: Partial<CollectionFormValues>;
  isEditing?: boolean;
  collectionId?: string;
}

export function CollectionForm({
  initialValues,
  isEditing = false,
  collectionId = "",
}: CollectionFormProps) {
  const router = useRouter();

  // Conditional mutation wiring based on mode
  const createMutation = useCreateCollection();
  const updateMutation = useUpdateCollection(collectionId);

  const activeMutation = isEditing ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const apiError = activeMutation.error;

  // Fetch available brands for selection
  const { data: brandsData, isLoading: isLoadingBrands } = useBrands({
    page_size: 100,
  });
  const brands = brandsData?.items ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      brand_id: initialValues?.brand_id || "",
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      status: initialValues?.status || "DRAFT",
    },
  });

  // Re-sync default form state when initialValues arrive (e.g. async fetch)
  useEffect(() => {
    if (initialValues) {
      reset({
        brand_id: initialValues.brand_id || "",
        name: initialValues.name || "",
        description: initialValues.description || "",
        status: initialValues.status || "DRAFT",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: CollectionFormValues) => {
    if (isEditing && collectionId) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/catalog/collections");
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/catalog/collections");
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto pb-12"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalog/collections"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              {isEditing ? "Edit Collection" : "Create New Collection"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Organize products under brand capsule collections and seasonal
              catalogs.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
          <ActionButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => router.push("/admin/catalog/collections")}
            disabled={isPending}
            className="shrink-0"
          >
            Cancel
          </ActionButton>

          <ActionButton
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
            isLoading={isPending}
            loadingText={
              isEditing ? "Updating Collection..." : "Creating Collection..."
            }
            className="shrink-0"
          >
            {isEditing ? "Save Changes" : "Save as Draft"}
          </ActionButton>
        </div>
      </div>

      {apiError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-700 text-xs font-mono shadow-xs">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <strong className="font-bold block mb-0.5 font-sans">
              Operation Failed
            </strong>
            <span>{apiError.message}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Collection Details
            </h2>

            {/* Parent Brand Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Parent Brand <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("brand_id")}
                disabled={isLoadingBrands}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all disabled:bg-slate-50"
              >
                <option value="">
                  {isLoadingBrands
                    ? "Loading brands..."
                    : "Select parent brand..."}
                </option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              {errors.brand_id && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.brand_id.message}
                </p>
              )}
            </div>

            {/* Collection Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Collection Name <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g. Spring/Summer 2026 Capsule"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Overview / Description
              </label>
              <textarea
                {...register("description")}
                rows={6}
                placeholder="Seasonal narrative or theme..."
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-y"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Status Block */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-semibold text-slate-900 font-serif">
                Record Status
              </h2>
              {!isEditing && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3 text-slate-400" /> Locked
                </span>
              )}
            </div>

            {!isEditing ? (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                  <FileEdit className="w-4 h-4 text-amber-600" />
                  <span>Initial Status: Draft</span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Collections start in <strong>Draft</strong> state upon creation.
                </p>
                <input type="hidden" {...register("status")} value="DRAFT" />
              </div>
            ) : (
              <div className="space-y-2">
                {["DRAFT", "PUBLISHED", "ARCHIVED"].map((statusOption) => (
                  <label
                    key={statusOption}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      {...register("status")}
                      type="radio"
                      value={statusOption}
                      className="mt-0.5 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-slate-900 capitalize">
                        {statusOption.toLowerCase()}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
