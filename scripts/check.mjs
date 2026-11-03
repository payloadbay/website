import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
assert(html.includes('<html lang="en"'));
assert(html.includes('name="viewport"'));
assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
for (const [, link] of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.has(link), `Missing section: ${link}`);
for (const [, asset] of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g))
  assert(existsSync(`dist/${asset}`), `Missing asset: ${asset}`);
assert(
  !/\b(?:99\.99%|SOC ?2 certified|unlimited cloud|open source)\b/i.test(html),
  "Unsupported product claim",
);
assert(existsSync("dist/site.css"));
assert(!html.includes("__SITE_URL__"));
console.log(
  "PASS static structure, navigation targets, local assets and claim guard",
);
