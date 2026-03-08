import { loadNamespaces } from "../namespaces/namespaceLoader";
import { getNested } from "../utils/nested";
import { interpolate } from "../utils/interpolate";
import { resolvePlural } from "../plural/pluralRules";
import { detectLanguage } from "../detection/detectLanguage";
import MessageFormat from "messageformat";
import { I18nConfig } from "../types";
import { NestedKeys } from "../types/nestedKeys";

const mf = new MessageFormat();

export class I18n<T extends Record<string, any> = any> {
  private currentLang: string;
  private fallbackLang?: string;
  private translations: Record<string, any> = {};

  constructor(private config: I18nConfig<T>) {
    const detected = config.detectLanguage
      ? detectLanguage()
      : config.defaultLang;

    this.currentLang = detected || config.defaultLang;

    this.fallbackLang = config.fallbackLang;
  }

  async loadLanguage(lang: string) {
    if (this.config.namespaces) {
      const data = await loadNamespaces(
        lang,
        this.config.namespaces,
        this.config.loader,
      );

      this.translations[lang] = data;
    } else {
      const data = await this.config.loader(lang);

      this.translations[lang] = data;
    }

    this.currentLang = lang;
  }

  async setLanguage(lang: string) {
    if (!this.translations[lang]) {
      await this.loadLanguage(lang);
    }

    this.currentLang = lang;
  }

  getLanguage() {
    return this.currentLang;
  }

  t<K extends NestedKeys<T>>(key: K, vars?: any) {
    let keyStr = String(key);

    let namespace = "default";

    if (keyStr.includes(":")) {
      const parts = keyStr.split(":");

      namespace = parts[0];

      keyStr = parts[1];
    }

    const langData = this.translations[this.currentLang]?.[namespace] || {};

    let value = getNested(langData, keyStr);

    if (!value && this.fallbackLang) {
      const fallbackData =
        this.translations[this.fallbackLang]?.[namespace] || {};

      value = getNested(fallbackData, keyStr);
    }

    if (!value) {
      console.warn(`[globaly-i18n] Missing translation: ${keyStr}`);

      return keyStr;
    }

    if (vars?.count !== undefined) {
      value = resolvePlural(value, vars.count, this.currentLang);
    }

    if (typeof value === "string" && value.includes("{")) {
      try {
        const fn = mf.compile(value);

        return fn(vars);
      } catch {}
    }

    return interpolate(value, vars);
  }
}
