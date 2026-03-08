import fs from "fs";
import path from "path";

export function extractKeys(dir: string) {
  const files = fs.readdirSync(dir);

  const keys = new Set<string>();

  for (const file of files) {
    const filePath = path.join(dir, file);

    const content = fs.readFileSync(filePath, "utf8");

    const regex = /t\(["'`](.*?)["'`]\)/g;

    let match;

    while ((match = regex.exec(content))) {
      keys.add(match[1]);
    }
  }

  return Array.from(keys);
}
