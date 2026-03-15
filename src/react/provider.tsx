import React, { createContext, useContext, useState } from "react";
import { I18n } from "../core/i18n";

const I18nContext = createContext<any>(null);

export function I18nProvider({ i18n, children }: any) {
  const [, setVersion] = useState(0);

  const setLanguage = async (lang: string) => {
    await i18n.setLanguage(lang);
    setVersion((v) => v + 1);
  };

  return (
    <I18nContext.Provider
      value={{
        t: i18n.t.bind(i18n),
        language: i18n.getLanguage(),
        setLanguage
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return ctx;
}