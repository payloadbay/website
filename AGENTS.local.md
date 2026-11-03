# Website guidance

This repository is Payload Bay's standalone static marketing site. Do not add
landing routes to the product app or bundle this site in its operator images.
Read README.md for source/asset provenance and build/preview commands.

Use the canonical brand repository and public HeroUI v3 React components. Keep
components on their semantic variants and theme tokens. Use Next.js App Router
with static export for GitHub Pages. Use real HeroUI controls and Tabler icons,
matching the product app. Do not invent icons or recreate custom buttons. Keep
proprietary Pro source out of this public repo.
Preserve responsive layout, visible keyboard focus, reduced-motion behavior,
working anchors and accessible mobile navigation. Test at 320px, 390px and desktop.

Only advertise implemented product behavior and verified release availability.
Do not invent prices, customer testimonials, certification, SLA, billing features
or exactly-once delivery. Label illustrative event data as examples.

Run `bun run build` and `bun run check` before committing; verify interactive
changes in a browser. Use issue-number branches and the organization PR template.
Never commit credentials, real webhook data or generated node_modules/dist.
