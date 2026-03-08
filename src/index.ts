import { I18n } from "./core/i18n";
import { I18nConfig } from "./types";
import { i18nMiddleware } from "./middleware/express";

export async function createI18n(config: I18nConfig) {
  const i18n = new I18n(config);

  await i18n.loadLanguage(config.defaultLang);

  return i18n;
}

export { I18n };
export { i18nMiddleware };
