export function detectLanguage() {
  if (typeof navigator === "undefined") return null;

  return navigator.language?.split("-")[0];
}
