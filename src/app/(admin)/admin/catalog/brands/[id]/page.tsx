"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useBrand } from "@/features/admin/brands/hooks/useBrand";
import { BrandForm } from "@/features/admin/brands/components/BrandForm";

interface EditBrandPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBrandPage({ params }: EditBrandPageProps) {
  // Unwrap params in Next.js App Router
  const resolvedParams = use(params);
  const brandId = resolvedParams.id;

  const { data: brand, isLoading, isError, error, refetch } = useBrand(brandId);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto my-8">
        <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
        <p className="text-xs font-mono text-slate-500">
          Loading brand details...
        </p>
      </div>
    );
  }

  if (isError || !brand) {
    return (
      <div className="max-w-4xl mx-auto my-8 bg-white p-8 rounded-xl border border-rose-200 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 font-serif">
            Failed to Load Brand
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {error?.message || "The requested brand record could not be found."}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/admin/catalog/brands">
            <ActionButton variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Catalog
            </ActionButton>
          </Link>
          <ActionButton
            variant="primary"
            size="sm"
            icon={RefreshCw}
            onClick={() => refetch()}
          >
            Retry
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <BrandForm
      isEditing={true}
      brandId={brandId}
      initialValues={{
        name: brand.name,
        description: brand.description || "",
        logo_media_url: brand.logo_media_url || "",
        status: brand.status,
      }}
    />
  );
}
