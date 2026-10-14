import { KeyRound, Shield, Zap, FileText } from "lucide-react";

export function CreateAdminSidebar() {
  const guidelines = [
    {
      icon: KeyRound,
      title: "Strong Passwords Required",
      desc: "Ensure password contains letters, digits, and special characters.",
    },
    {
      icon: Shield,
      title: "Role Assignment",
      desc: "Default account gets STANDARD_ADMIN permissions upon creation.",
    },
    {
      icon: Zap,
      title: "Instant Activation",
      desc: "Account credentials will be usable immediately upon submission.",
    },
    {
      icon: FileText,
      title: "Audit Log Trailing",
      desc: "Account creation events are logged with your operational ID.",
    },
  ];

  return (
    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-4">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
        Provisioning Guidelines
      </h3>
      <div className="space-y-3.5">
        {guidelines.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
