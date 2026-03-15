import React, { createContext, useContext } from "react";
import { I18n } from "../core/i18n";

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ i18n, children }: any) {
  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
