import { ShieldCheck, UserCheck, UserX, Users, Plus } from "lucide-react";
import { UserResponse } from "../types";

interface AdminHeaderAndStatsProps {
  users: UserResponse[];
  total: number;
  isLoading: boolean;
}

export function AdminHeaderAndStats({
  users,
  total,
  isLoading,
}: AdminHeaderAndStatsProps) {
  const activeCount = users.filter((u) => u.is_active).length;
  const inactiveCount = users.filter((u) => !u.is_active).length;
  const superAdminCount = users.filter((u) => u.role === "SUPER_ADMIN").length;

  const stats = [
    {
      title: "Total Accounts",
      value: total,
      icon: Users,
      color: "text-slate-700 bg-slate-100 border-slate-200",
    },
    {
      title: "Active Accounts",
      value: activeCount,
      icon: UserCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Super Admins",
      value: superAdminCount,
      icon: ShieldCheck,
      color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Inactive Accounts",
      value: inactiveCount,
      icon: UserX,
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
              Administrator Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provision and control system privileges for Guangzhou Yifan Atelier
            platform admins.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Administrator</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  {stat.title}
                </p>
                {isLoading ? (
                  <div className="h-7 w-12 bg-slate-100 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
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
    </div>
  );
}
