# globaly-i18n

Lightweight **internationalization (i18n) and translation library for JavaScript and TypeScript** with support for **namespaces, lazy loading, caching, middleware, language detection, CLI tools, and type-safe translations**.

Designed to work seamlessly in **frontend and backend applications**, including **Node.js, React, Vue, Next.js, Express, and NestJS**.

![npm version](https://img.shields.io/npm/v/globaly-i18n)
![weekly downloads](https://img.shields.io/npm/dw/globaly-i18n)
![total downloads](https://img.shields.io/npm/dt/globaly-i18n)
![bundle size](https://img.shields.io/bundlephobia/minzip/globaly-i18n)
![license](https://img.shields.io/npm/l/globaly-i18n)
![typescript](https://img.shields.io/badge/typescript-supported-blue)

---

# ✨ Features

* 🌍 Dynamic language loading
* 🗂 Namespace-based translations
* 🔑 Nested translation keys
* 🔢 Pluralization support
* 🔄 Variable interpolation
* 🔁 Fallback language support
* 🌐 Language switching
* 🧠 Language detection (browser / headers / query / localStorage)
* 💾 Language persistence
* ⚡ Translation caching for performance
* 📦 Lazy namespace loading
* ⚛ React hook support
* 🧩 Express & NestJS middleware support
* 🧠 TypeScript autocomplete for translation keys
* 🛠 CLI translation key extraction
* 🌐 CLI translation generator
* ⚡ Lightweight and fast
* 🖥 Works in Node.js, React, Vue, Next.js and other frameworks

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

Output

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

Output

```
Willkommen Rounak
```

---

# 🔢 Pluralization

```javascript
i18n.t("common:cart.items", { count: 5 });
```

Output

```
You have 5 items
```

---

# 🔄 Variable Interpolation

```javascript
i18n.t("common:home.title", {
  name: "Rounak"
});
```

Output

```
Welcome Rounak
```

---

# 📦 Lazy Namespace Loading

For large applications you can load namespaces only when needed.

```javascript
await i18n.loadNamespace("dashboard");

console.log(i18n.t("dashboard:stats.users"));
```

This keeps the initial bundle small and improves performance.

---

# ⚡ Translation Caching

`globaly-i18n` automatically caches translations internally.

Repeated calls like:

```javascript
i18n.t("common:home.title");
```

are served from cache for better performance.

---

# 💾 Language Persistence

Selected language is automatically saved to **localStorage**.

```javascript
await i18n.setLanguage("de");
```

After page reload, the language remains active.

---

# 🧠 Language Detection

Languages can be detected automatically from:

* Browser settings
* HTTP `Accept-Language` header
* Query parameters (`?lang=de`)
* localStorage

Example

```javascript
const i18n = await createI18n({
  defaultLang: "en",
  detectLanguage: true,
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
});
```

---

# ⚛ React Integration

Wrap your application with the provider.

```javascript
import { I18nProvider } from "globaly-i18n/react";

<I18nProvider i18n={i18n}>
  <App />
</I18nProvider>
```

Use translations inside components.

```javascript
import { useTranslation } from "globaly-i18n/react";

function Home() {
  const { t, setLanguage } = useTranslation();

  return (
    <>
      <h1>{t("common:home.title")}</h1>
      <button onClick={() => setLanguage("de")}>
        Switch Language
      </button>
    </>
  );
}
```

---

# 🧩 Middleware (Express / NestJS)

```javascript
import express from "express";
import { createI18n, i18nMiddleware } from "globaly-i18n";

const app = express();

const i18n = await createI18n({
  defaultLang: "en",
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
});

app.use(i18nMiddleware(i18n));

app.get("/", (req, res) => {
  res.send(req.t("common:home.title"));
});

app.listen(3000);
```

---

# 🛠 CLI Translation Key Extraction

Scan your project and extract translation keys.

Example source code

```javascript
t("common:home.title");
t("auth:login.button");
```

Run

```bash
npx globaly-i18n extract src
```

---

# 🌐 CLI Translation Generator

Automatically generate translated files.

```bash
npx globaly-i18n translate --from en --to de,fr,es
```

Example output

```
locales
 ├ en
 ├ de
 ├ fr
 └ es
```

---

# 🧠 TypeScript Support

`globaly-i18n` provides **type-safe translation keys**.

```ts
i18n.t("common:home.title"); // valid
i18n.t("common:home.titel"); // TypeScript error
```

---

# 📚 API

## createI18n(options)

Creates a new i18n instance.

| Option         | Type     | Description                        |
| -------------- | -------- | ---------------------------------- |
| defaultLang    | string   | Default language                   |
| fallbackLang   | string   | Fallback language                  |
| namespaces     | string[] | Translation namespaces             |
| detectLanguage | boolean  | Enable language detection          |
| loader         | function | Function used to load translations |

---

## t(key, options)

```javascript
i18n.t("common:home.title", { name: "Rounak" });
```

---

## setLanguage(lang)

```javascript
await i18n.setLanguage("de");
```

---

## getLanguage()

```javascript
i18n.getLanguage();
```

---

## loadNamespace(namespace)

```javascript
await i18n.loadNamespace("dashboard");
```

---

# 📚 Examples

### Node.js Example

```javascript
import { createI18n } from "globaly-i18n";

const i18n = await createI18n({
  defaultLang: "en",
  namespaces: ["common"],
  loader: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default)
});

console.log(i18n.t("common:home.title"));
```

### React Example

```javascript
import { useTranslation } from "globaly-i18n/react";

function Example() {
  const { t } = useTranslation();

  return <h1>{t("common:home.title")}</h1>;
}
```

### Express Example

```javascript
app.get("/", (req, res) => {
  res.send(req.t("common:home.title"));
});
```

---
---

# ⚖ Comparison with Other i18n Libraries

| Feature                     | globaly-i18n | i18next        | react-intl |
| --------------------------- | ------------ | -------------- | ---------- |
| Lightweight                 | ✅            | ❌              | ❌          |
| TypeScript Key Autocomplete | ✅            | ⚠ Partial      | ❌          |
| Namespace Support           | ✅            | ✅              | ❌          |
| Lazy Namespace Loading      | ✅            | ⚠ Plugin       | ❌          |
| Built-in Caching            | ✅            | ❌              | ❌          |
| Language Detection          | ✅            | ⚠ Plugin       | ❌          |
| CLI Key Extraction          | ✅            | ❌              | ❌          |
| CLI Auto Translation        | ✅            | ❌              | ❌          |
| React Integration           | ✅            | ✅              | ✅          |
| Express / Node Middleware   | ✅            | ⚠ Plugin       | ❌          |
| Framework Agnostic          | ✅            | ⚠ Mostly React | ❌          |

### Why use **globaly-i18n**?

Many i18n libraries are:

* heavy
* complex
* tightly coupled to specific frameworks

**globaly-i18n** focuses on:

* ⚡ lightweight architecture
* 🧩 framework-agnostic design
* 🧠 TypeScript developer experience
* 🚀 simple integration
* 🔧 flexible usage for both frontend and backend

---

# 🧪 Testing

Run tests using

```bash
npm test
```

The project uses **Vitest**.

---

# 🔑 Keywords

internationalization • i18n • localization • translation • javascript • typescript • nodejs • express • nestjs • react i18n • nextjs i18n • multilingual • language detection • translation library • frontend i18n • backend i18n

---

# 📄 License

MIT License

---

# ⭐ Support

If you find this library useful:

* ⭐ Star the repository
* 📦 Share it with other developers
* 🐛 Report issues or suggest improvements
