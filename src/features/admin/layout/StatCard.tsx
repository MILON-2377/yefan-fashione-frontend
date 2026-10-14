// src/components/admin/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
          {title}
        </span>
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold text-slate-900 font-serif">
          {value}
        </div>
        {(change || description) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {change && (
              <span
                className={`font-semibold px-1.5 py-0.5 rounded ${
                  isPositive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {change}
              </span>
            )}
            {description && (
              <span className="text-slate-500">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
