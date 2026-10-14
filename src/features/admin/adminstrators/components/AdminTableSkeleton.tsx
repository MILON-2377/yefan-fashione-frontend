export default function AdminTableSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-36 bg-slate-100 rounded" />
              <div className="h-2.5 w-20 bg-slate-50 rounded" />
            </div>
          </div>
          <div className="h-6 w-20 bg-slate-100 rounded-md" />
          <div className="h-5 w-16 bg-slate-100 rounded-full" />
          <div className="h-3.5 w-24 bg-slate-100 rounded" />
          <div className="w-6 h-6 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}
