"use client";

import { ProfileForm } from "@/features/admin/profiles/components/ProfileForm";
import { SecurityForm } from "@/features/admin/profiles/components/SecurityForm";
import { useState } from "react";

type TabType = "profile" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal details, preferences, and account security.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 -mb-px">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`pb-3.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === "profile"
                ? "border-slate-900 text-slate-900 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Profile Information
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`pb-3.5 text-xs font-medium border-b-2 transition-all ${
              activeTab === "security"
                ? "border-slate-900 text-slate-900 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Security & Password
          </button>
        </nav>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "security" && <SecurityForm />}
      </div>
    </div>
  );
}
