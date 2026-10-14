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
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import {
  companyKnowledgeSchema,
  CompanyKnowledgeFormValues,
} from "../schemas/companyKnowledgeSchema";
import { ActionButton } from "@/features/common/ui/ActionButton";
import { useCreateCompanyKnowledge } from "../hooks/useCreateCompanyKnowledge";
import { useUpdateCompanyKnowledge } from "../hooks/useUpdateCompanyKnowledge";

const CATEGORY_OPTIONS = [
  "OEM & Manufacturing",
  "Ordering & Shipping",
  "Fabric & Care",
  "Sizing & Customization",
  "Company Policy",
  "General FAQ",
];

interface CompanyKnowledgeFormProps {
  initialValues?: Partial<CompanyKnowledgeFormValues>;
  isEditing?: boolean;
  knowledgeId?: string;
}

export function CompanyKnowledgeForm({
  initialValues,
  isEditing = false,
  knowledgeId = "",
}: CompanyKnowledgeFormProps) {
  const router = useRouter();

  const createMutation = useCreateCompanyKnowledge();
  const updateMutation = useUpdateCompanyKnowledge(knowledgeId);

  const activeMutation = isEditing ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const apiError = activeMutation.error;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyKnowledgeFormValues>({
    resolver: zodResolver(companyKnowledgeSchema),
    defaultValues: {
      title: initialValues?.title || "",
      category: initialValues?.category || CATEGORY_OPTIONS[0],
      content: initialValues?.content || "",
      status: initialValues?.status || "DRAFT",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title || "",
        category: initialValues.category || CATEGORY_OPTIONS[0],
        content: initialValues.content || "",
        status: initialValues?.status || "DRAFT",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: CompanyKnowledgeFormValues) => {
    if (isEditing && knowledgeId) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          router.push("/admin/company-knowledge");
        },
      });
    } else {
      createMutation.mutate(
        {
          title: data.title,
          category: data.category,
          content: data.content,
        },
        {
          onSuccess: () => {
            router.push("/admin/company-knowledge");
          },
        }
      );
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
            href="/admin/company-knowledge"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900">
              {isEditing ? "Edit Knowledge Article" : "Create Knowledge Article"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure operational guidelines, OEM policies, and FAQ references for AI RAG indexing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ActionButton
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            onClick={() => router.push("/admin/company-knowledge")}
            disabled={isPending}
          >
            Cancel
          </ActionButton>

          <ActionButton
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
            isLoading={isPending}
            loadingText={isEditing ? "Updating..." : "Saving Article..."}
          >
            {isEditing ? "Save Changes" : "Save as Draft"}
          </ActionButton>
        </div>
      </div>

      {/* Meaningful Backend Error Alert Banner */}
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
        {/* Main Article Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-semibold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Article Configuration
            </h2>

            {/* Article Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. Standard OEM Lead Times & Fabric Sourcing Policy"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
              {errors.title && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                {...register("category")}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Content Body Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                  Knowledge Body (Markdown Supported) <span className="text-rose-500">*</span>
                </label>
              </div>
              <textarea
                {...register("content")}
                rows={12}
                placeholder="Write knowledge body here..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-y"
              />
              {errors.content && (
                <p className="text-xs text-rose-600 mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Status & RAG Guidance */}
        <div className="space-y-6">
          {/* Record Status Block */}
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
                  Articles are created as <strong>Draft</strong> records initially. You can publish or edit them after verification.
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

          {/* RAG Indexing Guide Box */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-semibold font-mono uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>RAG Indexing Info</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When saved, this content is chunked and vectorized for real-time customer support querying in the public AI Chat widget.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
