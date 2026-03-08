export function resolvePlural(message: any, count: number, lang: string) {
  if (typeof message !== "object") return message;

  const rule = new Intl.PluralRules(lang);

  const category = rule.select(count);

  return message[category] || message.other;
}
