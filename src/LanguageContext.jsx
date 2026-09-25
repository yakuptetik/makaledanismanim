import { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const translations = { en, tr };
const LanguageContext = createContext(null);

function translate(language, key) {
  const value = key.split(".").reduce(
    (current, part) => current?.[part],
    translations[language],
  );

  return value ?? key;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") === "en" ? "en" : "tr",
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: (key) => translate(lang, key),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslate() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslate must be used within LanguageProvider");
  }

  return context;
}
