export function detectEnvironment() {
  if (typeof window === "undefined") {
    return "node";
  }

  if (typeof window !== "undefined") {
    return "browser";
  }

  return "unknown";
}
