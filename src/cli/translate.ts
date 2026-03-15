#!/usr/bin/env node

import fs from "fs";
import path from "path";
import axios from "axios";

const args = process.argv.slice(2);

const from = args[args.indexOf("--from") + 1];
const to = args[args.indexOf("--to") + 1]?.split(",");

if (!from || !to) {
  console.log(
    "Usage: globaly-i18n-translate --from <sourceLang> --to <lang1,lang2>"
  );
  process.exit(1);
}

const base = path.join(process.cwd(), "translations", from);

async function translate(text: string, target: string) {
  try {
    const placeholders: string[] = [];

    const protectedText = text.replace(/\{(.*?)\}/g, (match) => {
      placeholders.push(match);
      return `__PLACEHOLDER_${placeholders.length - 1}__`;
    });

    const res = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: protectedText,
        langpair: `${from}|${target}`,
      },
    });

    let translated = res.data.responseData.translatedText;

    translated = translated.replace(/__PLACEHOLDER_(\d+)__/g, (_, index) => {
      return placeholders[index];
    });

    return translated;
  } catch (error) {
    console.warn(`Failed translating "${text}"`);
    return text;
  }
}

async function translateMissing(
  source: any,
  existing: any,
  lang: string
): Promise<any> {
  const result: any = { ...existing };

 await Promise.all(
  Object.keys(source).map(async (key) => {
    const sourceValue = source[key];
    const existingValue = existing?.[key];

    if (typeof sourceValue === "string") {
      if (existingValue === undefined) {
        result[key] = await translate(sourceValue, lang);
      } else {
        result[key] = existingValue;
      }
    } else if (typeof sourceValue === "object") {
      result[key] = await translateMissing(
        sourceValue,
        existingValue || {},
        lang
      );
    }
  })
);

  return result;
}

async function run() {
  if (!fs.existsSync(base)) {
    console.error(`Source language folder not found: ${base}`);
    process.exit(1);
  }

  const files = fs.readdirSync(base);

  for (const file of files) {
    const sourcePath = path.join(base, file);

    const sourceData = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

    for (const lang of to) {
      const outDir = path.join(process.cwd(), "translations", lang);

      fs.mkdirSync(outDir, { recursive: true });

      const targetPath = path.join(outDir, file);

      const existingData = fs.existsSync(targetPath)
        ? JSON.parse(fs.readFileSync(targetPath, "utf8"))
        : {};

      const merged = await translateMissing(sourceData, existingData, lang);

      fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2));

      console.log(`✓ ${lang}/${file}`);
    }
  }

  console.log("Translation finished 🚀");
}

run();