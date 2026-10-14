import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordValues,
} from "../schemas/securitySchema";
import { useChangePassword } from "../hooks/useChangePassword";
import { useRevokeSession } from "../hooks/useRevokeSession";
import { useSessions } from "../hooks/useSessions";

export function SecurityForm() {
  const changePasswordMutation = useChangePassword();
  const { data: sessions, isLoading: isFetchingSessions } = useSessions();
  const revokeSessionMutation = useRevokeSession();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onChangePassword = (values: ChangePasswordValues) => {
    setFeedback(null);
    changePasswordMutation.mutate(
      {
        current_password: values.current_password,
        new_password: values.new_password,
      },
      {
        onSuccess: () => {
          setFeedback({
            type: "success",
            message: "Password changed successfully.",
          });
          reset();
        },
        onError: (err) => {
          setFeedback({
            type: "error",
            message:
              err.message ||
              "Failed to update password. Verify your current password.",
          });
        },
      },
    );
  };

  const handleRevoke = (sessionId: string) => {
    revokeSessionMutation.mutate(sessionId);
  };

  return (
    <div className="space-y-8">
      {/* Password Section */}
      <form
        onSubmit={handleSubmit(onChangePassword)}
        className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-xs"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Change Password
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ensure your account uses a long, random password to stay secure.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              {...register("current_password")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
            {errors.current_password && (
              <p className="text-xs text-rose-600">
                {errors.current_password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              New Password
            </label>
            <input
              type="password"
              {...register("new_password")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
            {errors.new_password && (
              <p className="text-xs text-rose-600">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirm_password")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
            {errors.confirm_password && (
              <p className="text-xs text-rose-600">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="submit"
            disabled={changePasswordMutation.isPending || isSubmitting}
            className="px-5 py-2.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-xs"
          >
            {changePasswordMutation.isPending
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>

      {/* Sessions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Active Sessions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Devices and locations currently authenticated into your account.
          </p>
        </div>

        {isFetchingSessions ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-14 bg-slate-100 rounded-xl" />
            <div className="h-14 bg-slate-100 rounded-xl" />
          </div>
        ) : sessions && sessions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800">
                      {session.user_agent || "Unknown Browser / Device"}
                    </span>
                    {session.is_current && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-800 rounded-full">
                        Current Session
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    IP: {session.ip_address || "N/A"} • Last active:{" "}
                    {new Date(session.last_active_at).toLocaleString()}
                  </p>
                </div>

                {!session.is_current && (
                  <button
                    type="button"
                    onClick={() => handleRevoke(session.id)}
                    disabled={revokeSessionMutation.isPending}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium disabled:opacity-50 transition-colors"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No active session details found.
          </p>
        )}
      </div>
    </div>
  );
}
