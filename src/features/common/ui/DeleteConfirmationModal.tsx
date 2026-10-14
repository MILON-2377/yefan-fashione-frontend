"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { ActionButton } from "@/features/common/ui/ActionButton";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
  /** Name of the entity being deleted (e.g., brand name, product title, collection name) */
  entityName?: string;
  /** Custom modal title. Defaults to "Confirm Deletion" */
  title?: string;
  /** Custom description text. Optional if entityName is provided. */
  description?: React.ReactNode;
  /** Label for the destructive confirm button. Defaults to "Delete Permanently" */
  confirmText?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  isPending,
  onConfirm,
  onClose,
  entityName,
  title = "Confirm Deletion",
  description,
  confirmText = "Delete Permanently",
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900 font-serif">
              {title}
            </h3>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              {description ? (
                description
              ) : (
                <p>
                  Are you sure you want to delete{" "}
                  {entityName ? (
                    <strong className="text-slate-900 font-semibold">
                      {entityName}
                    </strong>
                  ) : (
                    "this item"
                  )}
                  ? This action cannot be undone and may affect associated data.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <ActionButton
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </ActionButton>

          <button
            onClick={onConfirm}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
