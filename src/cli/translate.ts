#!/usr/bin/env node

import fs from "fs";
import path from "path";
import axios from "axios";

const args = process.argv.slice(2);

const from = args[args.indexOf("--from") + 1];
const to = args[args.indexOf("--to") + 1].split(",");

const base = path.join(process.cwd(), "translations", from);

async function translate(text: string, target: string) {
  const res = await axios.post("https://libretranslate.de/translate", {
    q: text,
    source: from,
    target,
    format: "text",
  });

  return res.data.translatedText;
}

async function run() {
  const files = fs.readdirSync(base);

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(base, file), "utf8"));

    for (const lang of to) {
      const outDir = path.join(process.cwd(), "translations", lang);

      fs.mkdirSync(outDir, { recursive: true });

      const translated: any = {};

      for (const key of Object.keys(data)) {
        translated[key] = await translate(data[key], lang);
      }

      fs.writeFileSync(
        path.join(outDir, file),
        JSON.stringify(translated, null, 2),
      );

      console.log(`✓ ${lang}/${file}`);
    }
  }

  console.log("AI translation finished 🚀");
}

run();
