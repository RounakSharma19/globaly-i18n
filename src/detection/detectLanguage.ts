export function detectLanguage(req?: any) {
  if (req?.query?.lang) return req.query.lang;

  if (req?.headers?.["accept-language"]) {
    return req.headers["accept-language"].split(",")[0].split("-")[0];
  }

  if (typeof navigator !== "undefined") {
    return navigator.language.split("-")[0];
  }

  return null;
}
