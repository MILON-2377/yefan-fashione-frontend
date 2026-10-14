export function AdminLayoutSkeleton() {
  const itemWidths = ["w-3/5", "w-4/5", "w-2/3", "w-1/2", "w-3/4", "w-5/6"];

  return (
    <div className="min-h-screen flex bg-slate-50 animate-pulse">
      {/* Sidebar Skeleton */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 bg-white p-4 space-y-6 shrink-0">
        {/* Brand / Logo Skeleton */}
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <div className="h-5 w-32 bg-slate-200 rounded-md" />
        </div>

        {/* Navigation Item Skeletons */}
        <div className="space-y-2 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-100/70"
            >
              <div className="w-5 h-5 rounded-md bg-slate-200 shrink-0" />
              <div
                className={`h-4 bg-slate-200 rounded-md ${itemWidths[i % itemWidths.length]}`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Profile / Nav Skeleton */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
            <div className="h-3 w-16 bg-slate-200 rounded-md" />
          </div>
        </div>
      </aside>

      {/* Main Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Skeleton */}
        <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-xs px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-200 md:hidden" />
            <div className="h-5 w-40 bg-slate-200 rounded-md" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-200" />
          </div>
        </header>

        {/* Main Content Area Placeholder */}
        <main className="p-6 md:p-8 space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-slate-200 rounded-lg" />
              <div className="h-4 w-72 bg-slate-200/70 rounded-md" />
            </div>
            <div className="h-9 w-28 bg-slate-200 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs"
              >
                <div className="flex justify-between items-center">
                  <div className="h-3.5 w-20 bg-slate-200 rounded-md" />
                  <div className="w-7 h-7 rounded-lg bg-slate-100" />
                </div>
                <div className="h-6 w-24 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>

          <div className="h-96 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div className="h-6 w-36 bg-slate-200 rounded-md" />
            <div className="w-full flex-1 mt-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
