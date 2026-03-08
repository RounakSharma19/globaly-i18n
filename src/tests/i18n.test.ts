import { describe, it, expect } from "vitest";
import { createI18n } from "../index";

const translations: Record<string, any> = {
  en: {
    common: {
      home: {
        title: "Welcome {name}",
      },
      cart: {
        items: {
          one: "You have {count} item",
          other: "You have {count} items",
        },
      },
    },
  },
  de: {
    common: {
      home: {
        title: "Willkommen {name}",
      },
      cart: {
        items: {
          one: "Du hast {count} Artikel",
          other: "Du hast {count} Artikel",
        },
      },
    },
  },
};

const loader = async (lang: string, ns?: string) => {
  return translations[lang][ns || "common"];
};

describe("globaly-i18n", () => {
  it("translates nested keys", async () => {
    const i18n = await createI18n({
      defaultLang: "en",
      namespaces: ["common"],
      loader,
    });

    const result = i18n.t("common:home.title", {
      name: "Rounak",
    });

    expect(result).toBe("Welcome Rounak");
  });

  it("switches languages", async () => {
    const i18n = await createI18n({
      defaultLang: "en",
      namespaces: ["common"],
      loader,
    });

    await i18n.setLanguage("de");

    const result = i18n.t("common:home.title", {
      name: "Rounak",
    });

    expect(result).toBe("Willkommen Rounak");
  });

  it("handles pluralization", async () => {
    const i18n = await createI18n({
      defaultLang: "en",
      namespaces: ["common"],
      loader,
    });

    const result = i18n.t("common:cart.items", {
      count: 3,
    });

    expect(result).toBe("You have 3 items");
  });

  it("falls back to default language", async () => {
    const i18n = await createI18n({
      defaultLang: "en",
      fallbackLang: "en",
      namespaces: ["common"],
      loader,
    });

    await i18n.setLanguage("fr");

    const result = i18n.t("common:home.title", {
      name: "Rounak",
    });

    expect(result).toBe("Welcome Rounak");
  });
});
