import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("out/index.html", "utf8");
const site = new URL(
  process.env.SITE_URL ?? "https://payloadbay.github.io/website/",
);
const prefix = site.pathname.replace(/\/$/, "");
assert(html.includes('<html lang="en"'));
assert(html.includes('name="viewport"'));
assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
for (const [, link] of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.has(link), `Missing section: ${link}`);
for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  if (asset.startsWith("//")) continue;
  assert(
    !prefix || asset.startsWith(prefix + "/"),
    `Wrong deployment path: ${asset}`,
  );
  const file = decodeURIComponent(asset.slice(prefix.length)).split("?")[0];
  assert(existsSync(`out${file}`), `Missing asset: ${asset}`);
}
assert(html.includes('rel="canonical" href="' + site.href + '"'));
assert(html.includes('property="og:image"'));
assert(html.includes('name="twitter:card"'));
assert(
  html.includes(
    "mailto:mail@thedannicraft.de?subject=Payload%20Bay%20alpha%20access",
  ),
);
assert(!html.includes("Follow the public alpha"));
assert(existsSync("out/robots.txt"));
assert(existsSync("out/sitemap.xml"));
console.log(
  "PASS exported content, anchors, all local assets, deployment paths, email CTA and SEO metadata",
);
