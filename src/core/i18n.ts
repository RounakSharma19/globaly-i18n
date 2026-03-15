import { loadNamespaces } from "../namespaces/namespaceLoader";
import { getNested } from "../utils/nested";
import { interpolate } from "../utils/interpolate";
import { resolvePlural } from "../plural/pluralRules";
import { detectLanguage } from "../detection/detectLanguage";
import { I18nConfig } from "../types";
import { NestedKeys } from "../types/nestedKeys";

export class I18n<T extends Record<string, any> = any> {
  private currentLang: string;
  private fallbackLang?: string;
  private translations: Record<string, any> = {};

  // ⚡ translation cache
  private cache = new Map<string, any>();

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
        this.config.loader
      );

      this.translations[lang] = data;
    } else {
      const data = await this.config.loader(lang);
      this.translations[lang] = { default: data };
    }

    this.currentLang = lang;

    // clear cache
    this.cache.clear();
  }

 async setLanguage(lang: string) {
  if (!this.translations[lang]) {
    await this.loadLanguage(lang);
  }

  this.currentLang = lang;

  // persist language
  if (typeof window !== "undefined") {
    localStorage.setItem("globaly-i18n-language", lang);
  }

  this.cache.clear();
}

  getLanguage() {
    return this.currentLang;
  }

  /**
   * ⚡ Lazy load a namespace
   * Useful for large apps
   */
  async loadNamespace(namespace: string) {
    const data = await this.config.loader(this.currentLang, namespace);

    if (!this.translations[this.currentLang]) {
      this.translations[this.currentLang] = {};
    }

    this.translations[this.currentLang][namespace] = data;

    // clear cache
    this.cache.clear();
  }

  t<K extends NestedKeys<T>>(key: K, vars?: any) {
    let keyStr = String(key);
    let namespace = "default";

    if (keyStr.includes(":")) {
      const parts = keyStr.split(":");

      namespace = parts[0];
      keyStr = parts[1];
    }

    const cacheKey = `${this.currentLang}:${namespace}:${keyStr}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      return typeof cached === "string" ? interpolate(cached, vars) : cached;
    }

    const langData = this.translations[this.currentLang]?.[namespace] || {};

    let value = getNested(langData, keyStr);

    if (!value && this.fallbackLang) {
      const fallbackData =
        this.translations[this.fallbackLang]?.[namespace] || {};

      value = getNested(fallbackData, keyStr);
    }

 if (!value) {
  if (this.config.debug) {
    console.warn(
      `[globaly-i18n] Missing translation → ${namespace}:${keyStr}`
    );
  }

  return keyStr;
}

    if (vars?.count !== undefined) {
      value = resolvePlural(value, vars.count, this.currentLang);
    }

    this.cache.set(cacheKey, value);

    if (typeof value === "string") {
      return interpolate(value, vars);
    }

    return value;
  }
}