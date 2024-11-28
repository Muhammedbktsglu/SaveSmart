"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

const translations = { en, tr };

type Language = keyof typeof translations;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as Language) || "tr";
    setLanguage(savedLanguage);
  }, []);

  const t = (key: string): string => {
    const keys = key.split(".");
    return keys.reduce(
      (obj: any, currentKey: string) => obj?.[currentKey] ?? key,
      translations[language]
    );
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
