import { useI18n } from "./provider";

export function useTranslation() {
  const i18n = useI18n();

  return {
    t: i18n.t.bind(i18n),
    language: i18n.getLanguage(),
    setLanguage: i18n.setLanguage.bind(i18n),
  };
}
