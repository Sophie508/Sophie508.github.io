# Blog editorial workspace

Public article source belongs in `/Users/sophie/Sophie508.github.io/blog/<article>/`. This directory holds editorial work that supports those articles.

## Naming and storage

| Material | Location | Example |
| --- | --- | --- |
| Deployed page and runtime assets | `blog/<article>/` | `blog/gcpc/index.html` |
| Expert review, with original filename/date retained | `docs/blog/<article>/reviews/YYYY-MM-DD-<description>.md` | `gcpc/reviews/2026-11-05-review-memo.md` |
| Revision plan and verification record | `docs/blog/<article>/YYYY-MM-DD-<description>.md` | `gcpc/2026-11-05-revision-plan.md` |
| Local screenshots, diffs, snapshots | `artifacts/blog/<article>/YYYY-MM-DD/` | `artifacts/blog/gcpc/2026-11-05/` |
| Papers, experiments, complete trajectories | Original research repository | Referenced from the article's README |

Use stable lowercase article slugs. Episode pages use `<project>-ep<number>`; keep research IDs intact in exported evidence. Do not create additional top-level `*-blog-review` folders or duplicate website checkouts just to hold screenshots.

`docs/superpowers/plans/` and `docs/superpowers/specs/` contain earlier planning records. Keep those historical paths valid; new blog-specific plans belong here. No automatic synchronization is implied between a research-project draft and its published page.

Before committing, inspect the diff, exclude unrelated/private files and local review artifacts, and obtain Sophie's confirmation. Ask again before pushing. After publication, verify the actual deployed URL.

See [the workspace inventory](WORKSPACE-MAP.md) for existing folders and their roles.
