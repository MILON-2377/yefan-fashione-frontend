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
import { brandSchema, BrandFormValues } from "../schemas/brandSchema";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useCreateBrand } from "../hooks/useCreateBrand";
import { useUpdateBrand } from "../hooks/useUpdateBrand";

interface BrandFormProps {
  initialValues?: Partial<BrandFormValues>;
  isEditing?: boolean;
  brandId?: string;
}

export function BrandForm({
  initialValues,
  isEditing = false,
  brandId = "",
}: BrandFormProps) {
  const router = useRouter();

  // Conditional mutation wiring based on mode
  const createMutation = useCreateBrand();
  const updateMutation = useUpdateBrand(brandId);

  const activeMutation = isEditing ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const apiError = activeMutation.error;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      status: initialValues?.status || "DRAFT",
    },
  });

  // Re-sync default form state when initialValues arrive (e.g. async fetch)
  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name || "",
        description: initialValues.description || "",
        status: initialValues.status || "DRAFT",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: BrandFormValues) => {
    if (isEditing && brandId) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/catalog/brands");
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/catalog/brands");
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
            href="/admin/catalog/brands"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              {isEditing ? "Edit Brand" : "Create New Brand"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure brand identity records for your atelier catalog.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
          <ActionButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => router.push("/admin/catalog/brands")}
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
            loadingText={isEditing ? "Updating Brand..." : "Creating Brand..."}
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
              Brand Identity
            </h2>

            {/* Brand Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g. Atelier Yifan"
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
                Brand Overview / Description
              </label>
              <textarea
                {...register("description")}
                rows={6}
                placeholder="Briefly describe the brand story or signature style..."
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
                  New brands are created in <strong>Draft</strong> status by
                  default. You can publish or archive this brand after initial
                  creation.
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
