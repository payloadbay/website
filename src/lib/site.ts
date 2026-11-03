export const siteUrl = new URL(
  process.env.SITE_URL ?? "https://payloadbay.github.io/website/",
);
export const basePath = siteUrl.pathname.replace(/\/$/, "");
export const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;
export const sourceUrl = "https://github.com/payloadbay/payloadbay";
export const alphaEmail =
  "mailto:mail@thedannicraft.de?subject=Payload%20Bay%20alpha%20access";
