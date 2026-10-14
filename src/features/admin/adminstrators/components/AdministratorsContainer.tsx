// "use client";

// import { useState } from "react";
// import { Plus, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
// import { useGetUsers } from "../hooks/useGetUsers";
// import { AdminStatsCards } from "./AdminStatsCards";
// import { AdminTableFilters } from "./AdminTableFilters";
// import { AdminTable } from "./AdminTable";
// import { ResetPasswordModal } from "./ResetPasswordModal";
// import { ListAdminsParams, UserResponse } from "../types";
// import Link from "next/link";
// import { UpdateUserModal } from "./UpdateUserModal";
// import { useAdminMutations } from "../hooks/useAdminMutations";
// import { DeactivateUserModal } from "./DeactivateUserModal";

// export function AdministratorsContainer() {
//   // 1. Query State Management
//   const [filters, setFilters] = useState<ListAdminsParams>({
//     page: 1,
//     page_size: 10,
//     search: "",
//     role: undefined,
//     is_active: undefined,
//   });

//   // 2. Modal & Target User States
//   const [updateTarget, setUpdateTarget] = useState<UserResponse | null>(null);
//   const [resetPasswordTarget, setResetPasswordTarget] =
//     useState<UserResponse | null>(null);
//   const [deactivateTarget, setDeactivateTarget] = useState<UserResponse | null>(
//     null,
//   );

//   // 3. Query & Mutation Hooks
//   const { data, isLoading, isError, error } = useGetUsers(filters);

//   const {
//     updateUserMutation,
//     resetPasswordMutation,
//     deactivateAdminMutation,
//     toggleStatusMutation,
//     revokeSessionsMutation,
//   } = useAdminMutations({
//     onUpdateSuccess: () => setUpdateTarget(null),
//     onResetPasswordSuccess: () => setResetPasswordTarget(null),
//     onDeactivateSuccess: () => setDeactivateTarget(null),
//   });

//   // 4. Pagination & Filter Handlers
//   const handleFilterChange = (newFilters: Partial<ListAdminsParams>) => {
//     setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       page: 1,
//       page_size: 10,
//       search: "",
//       role: undefined,
//       is_active: undefined,
//     });
//   };

//   const handlePageChange = (newPage: number) => {
//     setFilters((prev) => ({ ...prev, page: newPage }));
//   };

//   // Compute derived metrics
//   const totalItems = data?.total || 0;
//   const pageSize = filters.page_size || 10;
//   const totalPages = Math.ceil(totalItems / pageSize) || 1;
//   const activeCount = data?.items.filter((u) => u.is_active).length || 0;
//   const inactiveCount = data?.items.filter((u) => !u.is_active).length || 0;
//   const superAdminCount =
//     data?.items.filter((u) => u.role === "SUPER_ADMIN").length || 0;

//   return (
//     <div className="p-6 space-y-6 max-w-7xl min-h-screen mx-auto">
//       {/* Header & Provision Action */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-2">
//             <ShieldCheck className="w-6 h-6 text-indigo-600" />
//             <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
//               Administrator Management
//             </h1>
//           </div>
//           <p className="text-xs text-slate-500 mt-1">
//             Provision and control system privileges for portal administrators.
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Primary Route-Based Action Button */}
//           <Link
//             href="/administrators/create"
//             className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition shadow-md"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Create Administrator</span>
//           </Link>
//         </div>
//       </div>

//       {/* Metrics Summary */}
//       <AdminStatsCards
//         total={totalItems}
//         activeCount={activeCount}
//         inactiveCount={inactiveCount}
//         superAdminCount={superAdminCount}
//         isLoading={isLoading}
//       />

//       {/* Filters and Search Bar */}
//       <AdminTableFilters
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onReset={handleResetFilters}
//       />

//       {/* Error State Banner */}
//       {isError && (
//         <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
//           {error?.message || "Failed to load administrators list from server."}
//         </div>
//       )}

//       {/* Data Table */}
//       <AdminTable
//         users={data?.items || []}
//         isLoading={isLoading}
//         onUpdateEmail={(user) => setUpdateTarget(user)}
//         onResetPassword={(user) => setResetPasswordTarget(user)}
//         onToggleStatus={(user) => {
//           if (user.is_active) {
//             setDeactivateTarget(user);
//           } else {
//             toggleStatusMutation.mutate(user);
//           }
//         }}
//         onRevokeSessions={(user) => revokeSessionsMutation.mutate(user.id)}
//       />

//       {/* Pagination Controls */}
//       {!isLoading && totalItems > 0 && (
//         <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium text-slate-600">
//           <div>
//             Showing{" "}
//             <span className="font-bold text-slate-900">
//               {(filters.page! - 1) * pageSize + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-bold text-slate-900">
//               {Math.min(filters.page! * pageSize, totalItems)}
//             </span>{" "}
//             of <span className="font-bold text-slate-900">{totalItems}</span>{" "}
//             results
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               disabled={filters.page === 1}
//               onClick={() => handlePageChange(filters.page! - 1)}
//               className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <span className="px-2 font-mono">
//               Page {filters.page} of {totalPages}
//             </span>
//             <button
//               type="button"
//               disabled={filters.page! >= totalPages}
//               onClick={() => handlePageChange(filters.page! + 1)}
//               className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
//             >
//               <ChevronRight className="w-4 h-4 text-slate-600" />
//             </button>
//           </div>
//         </div>
//       )}

//       <UpdateUserModal
//         key={updateTarget ? updateTarget.id : "update-modal-closed"}
//         user={updateTarget}
//         isOpen={Boolean(updateTarget)}
//         onClose={() => setUpdateTarget(null)}
//         onSubmit={(userId, payload) =>
//           updateUserMutation.mutate({ userId, payload })
//         }
//         isPending={updateUserMutation.isPending}
//         error={updateUserMutation.error}
//       />

//       <ResetPasswordModal
//         user={resetPasswordTarget}
//         isOpen={Boolean(resetPasswordTarget)}
//         onClose={() => setResetPasswordTarget(null)}
//         onSubmit={(userId, password) =>
//           resetPasswordMutation.mutate({ userId, password })
//         }
//         isPending={resetPasswordMutation.isPending}
//         error={resetPasswordMutation.error}
//       />

//       <UserStatusToggleModal
//         key={statusToggleTarget ? statusToggleTarget.id : "status-toggle-closed"}
//         user={statusToggleTarget}
//         isOpen={Boolean(statusToggleTarget)}
//         onClose={() => setStatusToggleTarget(null)}
//         onConfirm={(user) => toggleAdminStatusMutation.mutate(user)}
//         isPending={toggleAdminStatusMutation.isPending}
//         error={toggleAdminStatusMutation.error}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Plus, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetUsers } from "../hooks/useGetUsers";
import { AdminStatsCards } from "./AdminStatsCards";
import { AdminTableFilters } from "./AdminTableFilters";
import { AdminTable } from "./AdminTable";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { ListAdminsParams, UserResponse } from "../types";
import Link from "next/link";
import { UpdateUserModal } from "./UpdateUserModal";
import { useAdminMutations } from "../hooks/useAdminMutations";
import { UserStatusToggleModal } from "./UserStatusToggleModal";

export function AdministratorsContainer() {
  // 1. Query State Management
  const [filters, setFilters] = useState<ListAdminsParams>({
    page: 1,
    page_size: 10,
    search: "",
    role: undefined,
    is_active: undefined,
  });

  // 2. Modal & Target User States
  const [updateTarget, setUpdateTarget] = useState<UserResponse | null>(null);
  const [resetPasswordTarget, setResetPasswordTarget] =
    useState<UserResponse | null>(null);
  const [statusToggleTarget, setStatusToggleTarget] =
    useState<UserResponse | null>(null);

  // 3. Query & Mutation Hooks
  const { data, isLoading, isError, error } = useGetUsers(filters);

  const {
    updateUserMutation,
    resetPasswordMutation,
    toggleAdminStatusMutation,
    revokeSessionsMutation,
  } = useAdminMutations({
    onUpdateSuccess: () => setUpdateTarget(null),
    onResetPasswordSuccess: () => setResetPasswordTarget(null),
    onToggleStatusSuccess: () => setStatusToggleTarget(null),
  });

  // 4. Pagination & Filter Handlers
  const handleFilterChange = (newFilters: Partial<ListAdminsParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      page_size: 10,
      search: "",
      role: undefined,
      is_active: undefined,
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Compute derived metrics
  const totalItems = data?.total || 0;
  const pageSize = filters.page_size || 10;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const activeCount = data?.items.filter((u) => u.is_active).length || 0;
  const inactiveCount = data?.items.filter((u) => !u.is_active).length || 0;
  const superAdminCount =
    data?.items.filter((u) => u.role === "SUPER_ADMIN").length || 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl min-h-screen mx-auto">
      {/* Header & Provision Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
              Administrator Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provision and control system privileges for portal administrators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/administrators/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create Administrator</span>
          </Link>
        </div>
      </div>

      {/* Metrics Summary */}
      <AdminStatsCards
        total={totalItems}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
        superAdminCount={superAdminCount}
        isLoading={isLoading}
      />

      {/* Filters and Search Bar */}
      <AdminTableFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Error State Banner */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
          {error?.message || "Failed to load administrators list from server."}
        </div>
      )}

      {/* Data Table */}
      <AdminTable
        users={data?.items || []}
        isLoading={isLoading}
        onUpdateEmail={(user) => setUpdateTarget(user)}
        onResetPassword={(user) => setResetPasswordTarget(user)}
        onToggleStatus={(user) => setStatusToggleTarget(user)}
        onRevokeSessions={(user) => revokeSessionsMutation.mutate(user.id)}
      />

      {/* Pagination Controls */}
      {!isLoading && totalItems > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium text-slate-600">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-900">
              {(filters.page! - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-900">
              {Math.min(filters.page! * pageSize, totalItems)}
            </span>{" "}
            of <span className="font-bold text-slate-900">{totalItems}</span>{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={filters.page === 1}
              onClick={() => handlePageChange(filters.page! - 1)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono">
              Page {filters.page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={filters.page! >= totalPages}
              onClick={() => handlePageChange(filters.page! + 1)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      <UpdateUserModal
        key={updateTarget ? updateTarget.id : "update-modal-closed"}
        user={updateTarget}
        isOpen={Boolean(updateTarget)}
        onClose={() => setUpdateTarget(null)}
        onSubmit={(userId, payload) =>
          updateUserMutation.mutate({ userId, payload })
        }
        isPending={updateUserMutation.isPending}
        error={updateUserMutation.error}
      />

      <ResetPasswordModal
        user={resetPasswordTarget}
        isOpen={Boolean(resetPasswordTarget)}
        onClose={() => setResetPasswordTarget(null)}
        onSubmit={(userId, password) =>
          resetPasswordMutation.mutate({ userId, password })
        }
        isPending={resetPasswordMutation.isPending}
        error={resetPasswordMutation.error}
      />

      <UserStatusToggleModal
        key={
          statusToggleTarget ? statusToggleTarget.id : "status-toggle-closed"
        }
        user={statusToggleTarget}
        isOpen={Boolean(statusToggleTarget)}
        onClose={() => setStatusToggleTarget(null)}
        onConfirm={(user) => toggleAdminStatusMutation.mutate(user)}
        isPending={toggleAdminStatusMutation.isPending}
        error={toggleAdminStatusMutation.error}
      />
    </div>
  );
}
