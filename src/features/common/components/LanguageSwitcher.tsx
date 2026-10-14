"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/dictionaries";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "minimal";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "default",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={() => handleLanguageChange(language === "en" ? "zh" : "en")}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 hover:bg-slate-100 transition-colors ${className}`}
        title="Switch Language / 切换语言"
      >
        <Globe className="w-3.5 h-3.5 text-slate-500" />
        <span>{language === "en" ? "中文" : "EN"}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 ${className}`}
    >
      <div className="pl-2 pr-1 text-slate-400 hidden sm:block">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => handleLanguageChange("en")}
        className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all ${
          language === "en"
            ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => handleLanguageChange("zh")}
        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
          language === "zh"
            ? "bg-white text-slate-900 shadow-sm border border-slate-200/60 font-medium"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
        }`}
      >
        中文
      </button>
    </div>
  );
}
