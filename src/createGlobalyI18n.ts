import { createI18n } from "./index";
import { detectEnvironment } from "./utils/env";

export async function createGlobalyI18n(config: any) {
  const env = detectEnvironment();

  const i18n = await createI18n(config);

  if (config.debug) {
    console.log(`[globaly-i18n] environment → ${env}`);
    console.log(`[globaly-i18n] language → ${i18n.getLanguage()}`);
  }
  return i18n;
}
