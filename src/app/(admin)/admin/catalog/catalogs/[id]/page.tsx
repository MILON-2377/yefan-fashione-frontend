import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getCatalogById } from "@/features/admin/catalogs/api/getAdminCatalogById";
import { UpdateCatalogForm } from "@/features/admin/catalogs/components/UpdateCatalogForm";

interface EditCatalogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCatalogPage({ params }: EditCatalogPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const catalog = await getCatalogById(id).catch(() => null);

  if (!catalog) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link
              href="/admin/catalogs"
              className="hover:text-slate-900 transition-colors"
            >
              Catalogs Management
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold truncate max-w-[240px]">
              {catalog.title}
            </span>
          </nav>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Edit Catalog Entry
          </h1>
          <p className="text-xs text-slate-500">
            Update technical specifications, status, and PDF document files.
          </p>
        </div>

        <Link
          href="/admin/catalogs"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogs</span>
        </Link>
      </div>

      {/* Main Form Component */}
      <UpdateCatalogForm catalogId={id} initialData={catalog} />
    </div>
  );
}