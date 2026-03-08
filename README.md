# globaly-i18n

Lightweight **internationalization (i18n) and translation library for JavaScript and TypeScript** with support for **namespaces, ICU MessageFormat, middleware, language detection, CLI key extraction, and type-safe translations**.

Designed to work seamlessly in **frontend and backend applications**, including Node.js, React, Vue, Next.js, Express, and NestJS.

![npm version](https://img.shields.io/npm/v/globaly-i18n)
![weekly downloads](https://img.shields.io/npm/dw/globaly-i18n)
![total downloads](https://img.shields.io/npm/dt/globaly-i18n)
![bundle size](https://img.shields.io/bundlephobia/minzip/globaly-i18n)
![license](https://img.shields.io/npm/l/globaly-i18n)
![typescript](https://img.shields.io/badge/typescript-supported-blue)

---

# ✨ Features

- 🌍 Dynamic language loading
- 🗂 Namespace-based translations
- 🔑 Nested translation keys
- 🔢 ICU MessageFormat support
- 🔄 Variable interpolation
- 🔁 Fallback language support
- 🌐 Language switching
- 🧠 Language detection (browser / headers / query)
- 🧩 Express & NestJS middleware support
- ⚡ Lightweight and fast
- 🧠 TypeScript autocomplete for translation keys
- 🛠 CLI key extraction tool
- 🖥 Works in Node.js, React, Vue, Next.js, and other frameworks

---

# 📦 Installation

Install using npm:

```bash
npm install globaly-i18n
```

Using yarn:

```bash
yarn add globaly-i18n
```

Using pnpm:

```bash
pnpm add globaly-i18n
```

---

# 🚀 Quick Start

```javascript
import { createI18n } from "globaly-i18n";

const i18n = await createI18n({
  defaultLang: "en",
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
});

console.log(i18n.t("common:home.title", { name: "Rounak" }));
```

Output:

```
Welcome Rounak
```

---

# 📁 Translation File Structure

Using namespaces allows you to organize translations by module.

```
locales
 ├ en
 │   ├ common.json
 │   └ auth.json
 │
 └ de
     ├ common.json
     └ auth.json
```

---

# 📄 Example Translation File

### locales/en/common.json

```json
{
  "home": {
    "title": "Welcome {name}"
  },
  "cart": {
    "items": {
      "one": "You have {count} item",
      "other": "You have {count} items"
    }
  }
}
```

---

# 🌐 Switching Languages

```javascript
await i18n.setLanguage("de");

console.log(i18n.t("common:home.title", { name: "Rounak" }));
```

Output:

```
Willkommen Rounak
```

---

# 🔢 Pluralization (ICU Support)

Translation file:

```json
{
  "cart": {
    "items": {
      "one": "You have {count} item",
      "other": "You have {count} items"
    }
  }
}
```

Usage:

```javascript
i18n.t("common:cart.items", { count: 5 });
```

Output:

```
You have 5 items
```

---

# 🔄 Variable Interpolation

```javascript
i18n.t("common:home.title", {
  name: "Rounak",
});
```

Output:

```
Welcome Rounak
```

---

# 🧠 Language Detection

Automatically detect language from:

- Browser settings
- HTTP `Accept-Language` header
- Query parameters (`?lang=de`)

```javascript
const i18n = await createI18n({
  defaultLang: "en",
  detectLanguage: true,
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
});
```

---

# 🧩 Middleware (Express / NestJS)

You can integrate `globaly-i18n` with backend frameworks.

```javascript
import express from "express";
import { createI18n, i18nMiddleware } from "globaly-i18n";

const app = express();

const i18n = await createI18n({
  defaultLang: "en",
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
});

app.use(i18nMiddleware(i18n));

app.get("/", (req, res) => {
  res.send(req.t("common:home.title"));
});

app.listen(3000);
```

---

# 🛠 CLI Translation Key Extraction

`globaly-i18n` includes a CLI tool that extracts translation keys from your code.

Example:

```javascript
t("common:home.title");
t("auth:login.button");
```

Run the extractor:

```bash
npx globaly-i18n extract src
```

It will detect translation keys used in your project.

---

# 🧠 TypeScript Support

`globaly-i18n` supports **type-safe translation keys**.

Example:

```ts
i18n.t("common:home.title"); // ✅ valid
i18n.t("common:home.titel"); // ❌ TypeScript error
```

This helps prevent runtime translation errors.

---

# 📚 API

## createI18n(options)

Creates a new i18n instance.

### Options

| Option         | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| defaultLang    | string   | Default language                         |
| fallbackLang   | string   | Fallback language if translation missing |
| namespaces     | string[] | Translation namespaces                   |
| detectLanguage | boolean  | Enable automatic language detection      |
| loader         | function | Function to load translation files       |

Example:

```javascript
const i18n = await createI18n({
  defaultLang: "en",
  fallbackLang: "en",
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
});
```

---

## t(key, options)

Translate a key.

```javascript
i18n.t("common:home.title", {
  name: "Rounak",
});
```

---

## setLanguage(lang)

Switch the active language.

```javascript
await i18n.setLanguage("de");
```

---

## getLanguage()

Returns the currently active language.

```javascript
i18n.getLanguage();
```

---

# 🧠 Why globaly-i18n?

Many i18n libraries are either:

- heavy
- complex
- framework-specific

**globaly-i18n** focuses on being:

- ⚡ lightweight
- 🧩 framework-agnostic
- 🧠 TypeScript friendly
- 🚀 easy to integrate
- 🔧 flexible for both frontend and backend

---

# 🧪 Testing

Run tests using:

```bash
npm test
```

The project uses **Vitest** for testing.

---

# 🔑 Keywords

internationalization • i18n • localization • translation • javascript • typescript • nodejs • express • nestjs • react i18n • nextjs i18n • multilingual • language detection • translation library • frontend i18n • backend i18n

---

# 📄 License

MIT License

---

# ⭐ Support

If you find this library useful:

- ⭐ Star the repository
- 📦 Share it with other developers
- 🐛 Report issues or suggest improvements
