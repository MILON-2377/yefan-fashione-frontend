"use client";

import { Loader2, AlertCircle } from "lucide-react";
import { useCompanyKnowledge } from "../hooks/useCompanyKnowledge";
import { CompanyKnowledgeForm } from "./CompanyKnowledgeForm";

interface EditKnowledgeContentProps {
  id: string;
}

export function EditKnowledgeContent({ id }: EditKnowledgeContentProps) {
  const { data: item, isLoading, isError, error } = useCompanyKnowledge(id);

  if (isLoading) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
        <p className="text-xs font-mono">Loading knowledge article...</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-3 max-w-xl mx-auto mt-12">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div>
          <p className="font-bold">Failed to load article</p>
          <p className="mt-0.5">{error?.message || "Requested article could not be found."}</p>
        </div>
      </div>
    );
  }

  return (
    <CompanyKnowledgeForm
      initialValues={{
        title: item.title,
        category: item.category,
        content: item.content,
        status: item.status,
      }}
      isEditing={true}
      knowledgeId={item.id}
    />
  );
}
