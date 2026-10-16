
export function OverviewHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">
          Showroom Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time activity across your luxury catalog, buyer RFQs, and client
          reviews.
        </p>
      </div>
    </div>
  );
}
