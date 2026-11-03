# Payload Bay website

The independent public landing page for [Payload Bay](https://payloadbay.dev).
It is not included in the self-hosted application or its Docker images.

A static, accessible HTML site using public `@heroui/styles`, Tailwind CSS v4
and the canonical Payload Bay theme. HeroUI's documented BEM composition styles
links as buttons without shipping a React runtime for a content page. Native
navigation and FAQ disclosure remain usable without JavaScript; a small script
adds Escape, outside-click and link-selection dismissal to the mobile menu.
No analytics, cookies, forms, signup collection or third-party fonts are loaded.

## Develop

Bun 1.3.14:

```sh
bun install --frozen-lockfile
bun run build
bun run check
bun run preview
```

Preview on port 4174. GitHub Pages publishes `dist/` using the workflow; all
application state, authentication and webhooks belong to the separate Payload
Bay application. Relative assets support the initial project URL at
`https://payloadbay.github.io/website/`. `SITE_URL` controls canonical/social URLs;
it defaults to that GitHub domain. After the maintainer updates Name.com DNS,
configure the Pages custom domain and build with `SITE_URL=https://payloadbay.dev/`.
See DOMAIN.md for DNS and HTTPS steps.

## Content and brand

Product behavior comes from `payloadbay/payloadbay`; do not advertise planned
runners, paid plans, enterprise licenses or sandbox attestations as shipped.
Hosting information replaces fictional prices until commercial plans exist.
Update hosted availability only after the real instance is reachable and tested.

Brand/theme/logo/favicon source:
[payloadbay/brand at 6f56407848b2e3cc8305f52b613d28e1aa8b6308](https://github.com/payloadbay/brand/tree/6f56407848b2e3cc8305f52b613d28e1aa8b6308).
The generated files are copied unchanged; edit their upstream sources rather
than creating competing brand assets here. Local Inter font data comes from
`@fontsource-variable/inter` 5.3.0; its OFL notice is retained in
`public/assets/INTER-LICENSE.txt`.

See the organization contribution and security policies. Product licensing is
recorded separately in the main product repository; dependency and font notices
retain their original terms.

This website source uses AGPL-3.0-only; see LICENSE. Dependency/font notices
retain their original terms.
