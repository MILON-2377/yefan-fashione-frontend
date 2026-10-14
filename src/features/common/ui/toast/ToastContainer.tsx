"use client";

import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { useToastStore, Toast, ToastType } from "./toastStore";

const toastVariants: Record<
  ToastType,
  { icon: typeof CheckCircle2; containerClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle2,
    containerClass: "bg-emerald-50 border-emerald-200 text-emerald-950",
    iconClass: "text-emerald-600",
  },
  error: {
    icon: AlertCircle,
    containerClass: "bg-rose-50 border-rose-200 text-rose-950",
    iconClass: "text-rose-600",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "bg-amber-50 border-amber-200 text-amber-950",
    iconClass: "text-amber-600",
  },
  info: {
    icon: Info,
    containerClass: "bg-slate-900 border-slate-800 text-white",
    iconClass: "text-slate-300",
  },
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const variant = toastVariants[toast.type];
  const Icon = variant.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-full transition-all duration-300 ease-in-out ${variant.containerClass}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${variant.iconClass}`} />
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold font-mono uppercase tracking-wider">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-xs mt-0.5 opacity-90 leading-relaxed font-sans">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="p-1 -mr-1 -mt-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-auto">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
