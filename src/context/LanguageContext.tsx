"use client";

import React, { createContext, useContext, useState } from "react";
import { Language, getDictionary } from "@/dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: ReturnType<typeof getDictionary>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LOCAL_STORAGE_KEY = "yifan_preferred_language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initial state initializer to read localStorage once on mount without useEffect
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as Language;
      if (savedLang === "en" || savedLang === "zh") {
        return savedLang;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    }
  };

  const dict = getDictionary(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
