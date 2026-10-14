import { ShieldCheck, UserCheck, UserX, Users } from "lucide-react";

interface AdminStatsCardsProps {
  total: number;
  activeCount: number;
  inactiveCount: number;
  superAdminCount: number;
  isLoading?: boolean;
}

export function AdminStatsCards({
  total,
  activeCount,
  inactiveCount,
  superAdminCount,
  isLoading = false,
}: AdminStatsCardsProps) {
  const stats = [
    {
      title: "Total Administrators",
      value: total,
      icon: Users,
      color: "text-slate-700 bg-slate-100",
    },
    {
      title: "Active Accounts",
      value: activeCount,
      icon: UserCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Super Admins",
      value: superAdminCount,
      icon: ShieldCheck,
      color: "text-indigo-700 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Inactive Accounts",
      value: inactiveCount,
      icon: UserX,
      color: "text-amber-700 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <div
            key={idx}
            className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </p>
              {isLoading ? (
                <div className="h-7 w-12 bg-slate-100 rounded animate-pulse mt-1" />
              ) : (
                <p className="text-2xl font-black text-slate-900 mt-1">
                  {stat.value}
                </p>
              )}
            </div>
            <div className={`p-2.5 rounded-xl border ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
