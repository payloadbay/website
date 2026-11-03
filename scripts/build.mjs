import { cp, mkdir, rm, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
const siteUrl = new URL(
  process.env.SITE_URL ?? "https://payloadbay.github.io/website/",
);
if (siteUrl.protocol !== "https:") throw new Error("SITE_URL must use HTTPS");
siteUrl.search = "";
siteUrl.hash = "";
siteUrl.pathname = siteUrl.pathname.replace(/\/?$/, "/");
const html = await readFile("src/index.html", "utf8");
await writeFile(
  "dist/index.html",
  html.replaceAll("__SITE_URL__", siteUrl.href),
);
const result = spawnSync(
  "bun",
  [
    "x",
    "--no-install",
    "@tailwindcss/cli",
    "-i",
    "src/site.css",
    "-o",
    "dist/site.css",
    "--minify",
  ],
  { stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);
