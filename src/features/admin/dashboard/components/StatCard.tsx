import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeVariant?: "positive" | "neutral" | "warning";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  badgeText,
  badgeVariant = "neutral",
}: StatCardProps) {
  const badgeStyles = {
    positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
          {title}
        </span>
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold font-serif text-slate-900">
          {value}
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-slate-500">{description}</p>
          {badgeText && (
            <span
              className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeStyles[badgeVariant]}`}
            >
              {badgeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
