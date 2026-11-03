# Custom domain handoff

Initial publication uses https://payloadbay.github.io/website/.
Do not set the Pages custom domain until the maintainer is ready to change DNS;
GitHub redirects the project URL once the custom domain is enabled.

First verify domain ownership in the GitHub organization Pages settings using
the specific TXT challenge GitHub provides. When ready to switch, set the
repository Pages custom domain to `payloadbay.dev` **before** pointing DNS to
GitHub, to avoid leaving an unclaimed domain. Then, at Name.com, configure these
records for payloadbay.dev (remove conflicting
root A/AAAA/ALIAS records targeting Coolify):

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | payloadbay.github.io |

Optional IPv6 root AAAA records:
`2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

Keep app.payloadbay.dev and payloadbay.cloud.thedannicraft.de pointed at the
application server; the website DNS change must not affect them.

After DNS propagates:

1. Set workflow `SITE_URL` to `https://payloadbay.dev/` and rebuild.
2. Enable Enforce HTTPS once GitHub issues the certificate.
3. Verify the root site, www redirect, assets and canonical/social links.

Source: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

DNS has not been changed by this implementation.
