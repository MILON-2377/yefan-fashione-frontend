// "use client";

// import { useState, useSyncExternalStore } from "react";
// import { createPortal } from "react-dom";
// import {
//   MoreVertical,
//   Shield,
//   ShieldAlert,
//   UserCheck,
//   UserX,
//   KeyRound,
//   LogOut,
//   Mail,
//   Calendar,
// } from "lucide-react";
// import { UserResponse } from "../types";
// import AdminTableSkeleton from "./AdminTableSkeleton";

// interface AdminTableProps {
//   users: UserResponse[];
//   isLoading: boolean;
//   onUpdateEmail: (user: UserResponse) => void;
//   onResetPassword: (user: UserResponse) => void;
//   onToggleStatus: (user: UserResponse) => void;
//   onRevokeSessions: (user: UserResponse) => void;
// }

// interface MenuPosition {
//   top: number;
//   left: number;
// }

// // Safely detect client-side hydration without triggering useEffect re-renders
// const subscribe = () => () => {};
// function useIsClient() {
//   return useSyncExternalStore(
//     subscribe,
//     () => true,
//     () => false,
//   );
// }

// export function AdminTable({
//   users,
//   isLoading,
//   onUpdateEmail,
//   onResetPassword,
//   onToggleStatus,
//   onRevokeSessions,
// }: AdminTableProps) {
//   const isClient = useIsClient();
//   const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
//   const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

//   const handleOpenMenu = (
//     userId: string,
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     if (activeMenuId === userId) {
//       setActiveMenuId(null);
//       setMenuPosition(null);
//       return;
//     }

//     const rect = event.currentTarget.getBoundingClientRect();
//     const dropdownWidth = 192; // 48 * 4 (w-48)

//     setMenuPosition({
//       top: rect.bottom + window.scrollY + 4,
//       left: rect.right + window.scrollX - dropdownWidth,
//     });
//     setActiveMenuId(userId);
//   };

//   const activeUser = users.find((u) => u.id === activeMenuId);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (isLoading) {
//     return <AdminTableSkeleton />;
//   }

//   if (users.length === 0) {
//     return (
//       <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
//         <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto mb-3" />
//         <h3 className="text-sm font-bold text-slate-900">
//           No Administrators Found
//         </h3>
//         <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
//           No accounts matched your search criteria or filter parameters. Try
//           adjusting or resetting your active filters.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm">
//       <div className="w-full overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
//               <th className="py-3.5 px-4 font-mono">Administrator</th>
//               <th className="py-3.5 px-4 font-mono">Role</th>
//               <th className="py-3.5 px-4 font-mono">Status</th>
//               <th className="py-3.5 px-4 font-mono">Created Date</th>
//               <th className="py-3.5 px-4 text-right font-mono">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100 text-xs">
//             {users.map((user) => (
//               <tr
//                 key={user.id}
//                 className="hover:bg-slate-50/50 transition-colors"
//               >
//                 {/* Email / User info */}
//                 <td className="py-3.5 px-4 font-medium text-slate-900">
//                   <div className="flex items-center gap-2.5">
//                     <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase shrink-0">
//                       {user.email.slice(0, 2)}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900">
//                         {user.email}
//                       </p>
//                       <p className="text-[10px] text-slate-400 font-mono mt-0.5">
//                         ID: {user.id.slice(0, 8)}...
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 {/* Role Badge */}
//                 <td className="py-3.5 px-4">
//                   {user.role === "SUPER_ADMIN" ? (
//                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
//                       <Shield className="w-3 h-3" />
//                       SUPER_ADMIN
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
//                       ADMIN
//                     </span>
//                   )}
//                 </td>

//                 {/* Status Indicator */}
//                 <td className="py-3.5 px-4">
//                   {user.is_active ? (
//                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
//                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                       Active
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
//                       <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
//                       Inactive
//                     </span>
//                   )}
//                 </td>

//                 {/* Created Date */}
//                 <td className="py-3.5 px-4 text-slate-500 font-mono">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//                     <span>{formatDate(user.created_at)}</span>
//                   </div>
//                 </td>

//                 {/* Row Action Trigger */}
//                 <td className="py-3.5 px-4 text-right">
//                   <button
//                     type="button"
//                     onClick={(e) => handleOpenMenu(user.id, e)}
//                     className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
//                   >
//                     <MoreVertical className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Global Dropdown Portal */}
//       {isClient &&
//         activeUser &&
//         menuPosition &&
//         createPortal(
//           <>
//             <div
//               className="fixed inset-0 z-40 bg-transparent"
//               onClick={() => {
//                 setActiveMenuId(null);
//                 setMenuPosition(null);
//               }}
//             />
//             <div
//               style={{
//                 top: `${menuPosition.top}px`,
//                 left: `${menuPosition.left}px`,
//               }}
//               className="absolute z-50 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 text-left text-xs font-medium animate-in fade-in zoom-in-95 duration-100"
//             >
//               <button
//                 onClick={() => {
//                   setActiveMenuId(null);
//                   setMenuPosition(null);
//                   onUpdateEmail(activeUser);
//                 }}
//                 className="w-full px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
//               >
//                 <Mail className="w-3.5 h-3.5 text-slate-400" />
//                 Update Email
//               </button>

//               <button
//                 onClick={() => {
//                   setActiveMenuId(null);
//                   setMenuPosition(null);
//                   onResetPassword(activeUser);
//                 }}
//                 className="w-full px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
//               >
//                 <KeyRound className="w-3.5 h-3.5 text-slate-400" />
//                 Reset Password
//               </button>

//               <button
//                 onClick={() => {
//                   setActiveMenuId(null);
//                   setMenuPosition(null);
//                   if (activeUser.is_active) {
//                     setDeactivateTarget(activeUser);
//                   } else {
//                     onToggleStatus(activeUser);
//                   }
//                 }}
//                 className={`w-full px-3 py-2 flex items-center gap-2 ${
//                   activeUser.is_active
//                     ? "text-amber-700 hover:bg-amber-50"
//                     : "text-emerald-700 hover:bg-emerald-50"
//                 }`}
//               >
//                 {activeUser.is_active ? (
//                   <>
//                     <UserX className="w-3.5 h-3.5 text-amber-500" />
//                     Deactivate Admin
//                   </>
//                 ) : (
//                   <>
//                     <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
//                     Activate Admin
//                   </>
//                 )}
//               </button>

//               <div className="border-t border-slate-100 my-1" />

//               <button
//                 onClick={() => {
//                   setActiveMenuId(null);
//                   setMenuPosition(null);
//                   onRevokeSessions(activeUser);
//                 }}
//                 className="w-full px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
//               >
//                 <LogOut className="w-3.5 h-3.5 text-red-500" />
//                 Revoke All Sessions
//               </button>
//             </div>
//           </>,
//           document.body,
//         )}
//     </div>
//   );
// }



"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  Shield,
  ShieldAlert,
  UserCheck,
  UserX,
  KeyRound,
  LogOut,
  Mail,
  Calendar,
} from "lucide-react";
import { UserResponse } from "../types";
import AdminTableSkeleton from "./AdminTableSkeleton";

interface AdminTableProps {
  users: UserResponse[];
  isLoading: boolean;
  onUpdateEmail: (user: UserResponse) => void;
  onResetPassword: (user: UserResponse) => void;
  onToggleStatus: (user: UserResponse) => void;
  onRevokeSessions: (user: UserResponse) => void;
}

interface MenuPosition {
  top: number;
  left: number;
}

// Safely detect client-side hydration without triggering useEffect re-renders
const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function AdminTable({
  users,
  isLoading,
  onUpdateEmail,
  onResetPassword,
  onToggleStatus,
  onRevokeSessions,
}: AdminTableProps) {
  const isClient = useIsClient();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const handleOpenMenu = (
    userId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (activeMenuId === userId) {
      setActiveMenuId(null);
      setMenuPosition(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const dropdownWidth = 192; // 48 * 4 (w-48)

    setMenuPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.right + window.scrollX - dropdownWidth,
    });
    setActiveMenuId(userId);
  };

  const activeUser = users.find((u) => u.id === activeMenuId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <AdminTableSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
        <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-900">
          No Administrators Found
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No accounts matched your search criteria or filter parameters. Try
          adjusting or resetting your active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-4 font-mono">Administrator</th>
              <th className="py-3.5 px-4 font-mono">Role</th>
              <th className="py-3.5 px-4 font-mono">Status</th>
              <th className="py-3.5 px-4 font-mono">Created Date</th>
              <th className="py-3.5 px-4 text-right font-mono">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                {/* Email / User info */}
                <td className="py-3.5 px-4 font-medium text-slate-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase shrink-0">
                      {user.email.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {user.email}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        ID: {user.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="py-3.5 px-4">
                  {user.role === "SUPER_ADMIN" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Shield className="w-3 h-3" />
                      SUPER_ADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      ADMIN
                    </span>
                  )}
                </td>

                {/* Status Indicator */}
                <td className="py-3.5 px-4">
                  {user.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Created Date */}
                <td className="py-3.5 px-4 text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                </td>

                {/* Row Action Trigger */}
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={(e) => handleOpenMenu(user.id, e)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Global Dropdown Portal */}
      {isClient &&
        activeUser &&
        menuPosition &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => {
                setActiveMenuId(null);
                setMenuPosition(null);
              }}
            />
            <div
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
              }}
              className="absolute z-50 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 text-left text-xs font-medium animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                onClick={() => {
                  setActiveMenuId(null);
                  setMenuPosition(null);
                  onUpdateEmail(activeUser);
                }}
                className="w-full px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Update Email
              </button>

              <button
                onClick={() => {
                  setActiveMenuId(null);
                  setMenuPosition(null);
                  onResetPassword(activeUser);
                }}
                className="w-full px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                Reset Password
              </button>

              <button
                onClick={() => {
                  setActiveMenuId(null);
                  setMenuPosition(null);
                  onToggleStatus(activeUser);
                }}
                className={`w-full px-3 py-2 flex items-center gap-2 ${
                  activeUser.is_active
                    ? "text-amber-700 hover:bg-amber-50"
                    : "text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {activeUser.is_active ? (
                  <>
                    <UserX className="w-3.5 h-3.5 text-amber-500" />
                    Deactivate Admin
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Activate Admin
                  </>
                )}
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setActiveMenuId(null);
                  setMenuPosition(null);
                  onRevokeSessions(activeUser);
                }}
                className="w-full px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                Revoke All Sessions
              </button>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
