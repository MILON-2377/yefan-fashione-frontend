"use client";

import { AlertTriangle } from "lucide-react";

interface CategoryWorkflowErrorProps {
  error: string | null;
}



export function CategoryWorkflowError({ error }: CategoryWorkflowErrorProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
      <span>{error}</span>
    </div>
  );
}
