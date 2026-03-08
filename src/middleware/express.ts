export function i18nMiddleware(i18n: any) {
  return async function (req: any, res: any, next: any) {
    const lang =
      req.query.lang ||
      req.headers["accept-language"]?.split(",")[0]?.split("-")[0];

    if (lang) {
      await i18n.setLanguage(lang);
    }

    req.t = i18n.t.bind(i18n);

    next();
  };
}
