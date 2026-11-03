import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { asset, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: "../../public/assets/inter-latin.woff2",
  display: "swap",
  variable: "--font-inter",
});
const title = "Payload Bay | A safe landing place for every event";
const description =
  "Receive, verify, route and recover webhooks with Payload Bay. Inspect every delivery attempt, write TypeScript handlers and self-host on your infrastructure. Private alpha.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: { canonical: siteUrl.href },
  applicationName: "Payload Bay",
  icons: { icon: asset("favicon.svg") },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Payload Bay",
    title,
    description,
    url: siteUrl.href,
    images: [
      {
        url: new URL("assets/social.png", siteUrl).href,
        width: 1200,
        height: 630,
        alt: "Payload Bay — A safe landing place for every event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [new URL("assets/social.png", siteUrl).href],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#03060d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} data-theme="dark">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
