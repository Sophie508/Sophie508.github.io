# Research blogs: start here

This directory is the **canonical source of the public English research blogs** on Sophie's personal website. Edit pages here; do not edit the older demo worktree expecting it to update the personal site.

| Article | Source | Public route |
| --- | --- | --- |
| Checklist / Partial Credit | `gcpc/` | https://sophie508.github.io/blog/gcpc/ |
| AIRGuard | `airguard/` | https://sophie508.github.io/blog/airguard/ |
| HTMLPresentBench | `htmlpresentbench/` | https://sophie508.github.io/blog/htmlpresentbench/ |
| Tender · Episode 1 | `tender1-ep1/` | https://sophie508.github.io/blog/tender1-ep1/ |

- Public HTML, styles, scripts and allowlisted evidence: `blog/<article>/`.
- Editorial reviews, revision plans and workspace inventory: [`../docs/blog/README.md`](../docs/blog/README.md).
- Local screenshots, review patches and before-edit snapshots: `artifacts/blog/<article>/<YYYY-MM-DD>/` at the repository root. Git ignores this directory.
- Research source data and experiments stay in their original research repositories. Export only the evidence needed by the article.

Preview from `/Users/sophie/Sophie508.github.io` with `python3 -m http.server 8922 --bind 127.0.0.1`, then open the matching `/blog/<article>/` route. Reuse the running server when available.

A local preview is not a deployment. Show Sophie a scoped diff before committing; obtain explicit approval before each push. Commits have Sophie as the sole author, without AI or co-author trailers.
