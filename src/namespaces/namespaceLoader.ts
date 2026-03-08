import { loadLanguage } from "../core/loader";

export async function loadNamespaces(
  lang: string,
  namespaces: string[],
  loader: any,
) {
  const result: any = {};

  for (const ns of namespaces) {
    result[ns] = await loadLanguage(lang, loader, ns);
  }

  return result;
}
