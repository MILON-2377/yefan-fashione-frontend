"use client";

import { useState } from "react";
import { Image as ImageIcon, Trash2, Edit2, Loader2 } from "lucide-react";
import { Category } from "../types";

interface CategoryListItemProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => Promise<void>;
}

export function CategoryListItem({
  category,
  onEdit,
  onDelete,
}: CategoryListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(category.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700/60 transition-all">
      <div className="flex items-center gap-4">
        {/* Cover Preview / Fallback */}
        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center overflow-hidden shrink-0">
          {category.image_media_id ? (
            <img
              src={`/api/v1/media/${category.image_media_id}`} // Adjust path to media server route
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-600" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">
              {category.name}
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              /{category.slug}
            </span>
          </div>
          {category.description && (
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <span
          className={`px-2.5 py-1 text-[10px] font-mono font-medium rounded-full border ${
            category.is_active
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          {category.is_active ? "Active" : "Draft"}
        </span>

        {/* Item Controls */}
        <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
          {onEdit && (
            <button
              onClick={() => onEdit(category)}
              className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Edit category"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              title="Delete category"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
