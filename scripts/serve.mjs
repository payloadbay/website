import { resolve, sep } from "node:path";

const root = resolve("dist");
Bun.serve({
  port: 4174,
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
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
