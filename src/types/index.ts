export type Translation = Record<string, any>;

export type Loader = (lang: string, namespace?: string) => Promise<Translation>;

export interface I18nConfig<T = Translation> {
  defaultLang: string;
  fallbackLang?: string;
  namespaces?: string[];
  detectLanguage?: boolean;
  loader: Loader;
}
