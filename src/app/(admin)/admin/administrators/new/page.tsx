import { CreateAdminHeader } from "@/features/admin/adminstrators/components/CreateAdminHeader";
import { CreateAdminForm } from "@/features/admin/adminstrators/components/CreateAdminForm";
import { CreateAdminSidebar } from "@/features/admin/adminstrators/components/CreateAdminSidebar";

export default function CreateAdministratorPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Section Header */}
      <CreateAdminHeader />

      {/* Main Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Form Container */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 lg:p-8 shadow-sm">
          <CreateAdminForm />
        </div>

        {/* Side Guidance Sidebar */}
        <div className="lg:col-span-1">
          <CreateAdminSidebar />
        </div>
      </div>
    </div>
  );
}
