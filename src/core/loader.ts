import { getCache, setCache } from "./cache";

export async function loadLanguage(
  lang: string,
  loader: any,
  namespace?: string,
) {
  const key = `${lang}:${namespace || "default"}`;

  const cached = getCache(key);

  if (cached) return cached;

  const data = await loader(lang, namespace);

  setCache(key, data);

  return data;
}
