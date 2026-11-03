import type { NextConfig } from "next";

const site = new URL(
  process.env.SITE_URL ?? "https://payloadbay.github.io/website/",
);
const basePath = site.pathname.replace(/\/$/, "");

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
