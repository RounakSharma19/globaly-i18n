import { createI18n } from "./index";
import { detectEnvironment } from "./utils/env";

export async function createGlobalyI18n(config: any) {
  const env = detectEnvironment();

  const i18n = await createI18n(config);

  if (config.debug) {
    console.log(`[globaly-i18n] running in ${env}`);
  }

  return i18n;
}
