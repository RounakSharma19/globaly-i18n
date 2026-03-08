export function interpolate(
  text: string,
  vars: Record<string, string | number> = {},
) {
  return text.replace(/\{(.*?)\}/g, (_, key) => {
    return key in vars ? String(vars[key]) : `{${key}}`;
  });
}
