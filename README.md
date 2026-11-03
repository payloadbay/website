# Payload Bay website

The independent public website for Payload Bay, built with **Next.js App Router,
HeroUI v3 React components and Tabler icons**, matching the product application.
It is not included in the self-hosted application or its Docker images.

Next.js pre-renders the page and exports HTML, CSS and JavaScript for GitHub
Pages. The delivery example, FAQ and mobile navigation use accessible HeroUI
Tabs, Accordion and Modal components. There is no application server, analytics,
cookie collection, signup form or third-party font request. Alpha requests open
the visitor's email client; no message is sent automatically.

## Develop

Bun 1.3.14 and Node 22+:

```sh
bun install --frozen-lockfile
bun run dev
```

Port 4174. Default path: `http://localhost:4174/website/`.

```sh
bun run build
bun run check
bun run preview
```

GitHub Pages publishes Next.js's `out/` directory. `SITE_URL` controls the asset
base path, canonical, social metadata, robots and sitemap; it defaults to
`https://payloadbay.github.io/website/`. It must be set consistently for build
and checks. For a root-domain deployment set `SITE_URL=https://payloadbay.dev/`.
See DOMAIN.md for the separate DNS/HTTPS handoff. No DNS change is part of this
rebuild.

## Content and design

Hosted alpha access is private and requested by email. The first product release
is still being prepared. Do not advertise public sign-ups, prices, SLAs,
exactly-once delivery or enterprise features as available. Claims come from the
implemented product, not future plans. Event inspection data is explicitly an
example, not live customer traffic.

Use public HeroUI React components and semantic variants, canonical theme tokens
and Tabler icons. Keep proprietary HeroUI Pro source out of this public repo.
Check complete interactions and images at 320px, 390px, tablet and desktop;
inspect sticky headers, wrapping, focus, keyboard dismissal and reduced motion.

Brand/theme/logo/favicon source:
[payloadbay/brand at 6f56407848b2e3cc8305f52b613d28e1aa8b6308](https://github.com/payloadbay/brand/tree/6f56407848b2e3cc8305f52b613d28e1aa8b6308).
Generated assets are copied unchanged. SVG remains appropriate for canonical
logos; interface icons come from the established icon library. Local Inter data
comes from `@fontsource-variable/inter` 5.3.0; its OFL notice remains in
`public/assets/INTER-LICENSE.txt`.

This website source uses AGPL-3.0-only; see LICENSE. Dependency/font notices
retain their original terms. Follow the organization contribution and security
policies.
