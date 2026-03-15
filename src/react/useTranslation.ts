import { useI18n } from "./provider";

export function useTranslation() {
  const ctx = useI18n();

  return {
    t: ctx.t,
    language: ctx.language,
    setLanguage: ctx.setLanguage
  };
}