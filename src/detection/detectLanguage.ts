export function detectLanguage(req?: any) {
  // URL query
  if (req?.query?.lang) return req.query.lang;

  // cookie
  if (req?.cookies?.lang) return req.cookies.lang;

  // browser storage
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("globaly-i18n-language");
    if (stored) return stored;
  }

  // header
  if (req?.headers?.["accept-language"]) {
    return req.headers["accept-language"].split(",")[0].split("-")[0];
  }

  // browser
  if (typeof navigator !== "undefined") {
    return navigator.language.split("-")[0];
  }

  return null;
}