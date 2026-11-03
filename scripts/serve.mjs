import { resolve, sep } from "node:path";

const root = resolve("out");
Bun.serve({
  port: 4174,
  async fetch(request) {
    let pathname = decodeURIComponent(new URL(request.url).pathname);
    const site = new URL(
      process.env.SITE_URL ?? "https://payloadbay.github.io/website/",
    );
    const base = site.pathname.replace(/\/$/, "");
    if (base && (pathname === base || pathname.startsWith(base + "/")))
      pathname = pathname.slice(base.length) || "/";
    if (pathname.endsWith("/")) pathname += "index.html";
    const path = resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    if (!path.startsWith(root + sep))
      return new Response("Not found", { status: 404 });
    const file = Bun.file(path);
    if (!(await file.exists()))
      return new Response("Not found", { status: 404 });
    return new Response(file);
  },
});
console.log("Website preview: http://localhost:4174");
