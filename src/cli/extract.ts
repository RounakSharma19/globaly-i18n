#!/usr/bin/env node

import fs from "fs";
import path from "path";

const targetDir = process.argv[2];

if (!targetDir) {
  console.log("Usage: globaly-i18n <source-folder>");
  process.exit(1);
}

const keys = new Set<string>();

function scanDir(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDir(filePath);
      continue;
    }

    if (!file.match(/\.(js|ts|tsx|jsx)$/)) continue;

    const content = fs.readFileSync(filePath, "utf8");

    const regex = /\bt\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g;

    let match;

    while ((match = regex.exec(content))) {
      const key = match[1];

      if (!key) continue;

      keys.add(key);
    }
  }
}

scanDir(targetDir);

console.log("\nExtracted translation keys:\n");

keys.forEach((k) => console.log(k));

console.log(`\nTotal keys: ${keys.size}`);
