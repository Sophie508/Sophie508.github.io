# Blog workspace inventory

Checked locally on 2026-11-05. The problem is scattered review artifacts and an insufficiently documented transition from the early prototype to the personal site. These folders are not all duplicate public blog sources.

| Existing path | Verified role | Treatment |
| --- | --- | --- |
| `/Users/sophie/Sophie508.github.io/blog/` | Current English publication source: GCPC, AIRGuard, HTMLPresentBench, Tender | Edit here for the personal website |
| `/Users/sophie/research-pages/` | Separate Git repository containing research dashboards and earlier AIRGuard/SkillLens demos | Keep separate; these are distinct artifacts |
| `/Users/sophie/research-pages-gcpc-blog/` | Registered Git worktree of research-pages, branch `codex/gcpc-interactive-essay`; early Chinese GCPC prototype | Retain as historical discussion material; not synchronized with the English article |
| `/Users/sophie/research-pages-gcpc-blog-review/` | Screenshots, before-edit snapshots, patch files, review notes | Historical review artifacts; new output uses the central artifacts directory |
| `/Users/sophie/research-pages-airguard-blog-review/` | AIRGuard screenshots and pending review patches | Keep pending-review links valid |
| `/Users/sophie/htmlpresentbench-blog-review/` | HTMLPresentBench screenshots, patches and verification notes | Historical review artifacts |
| `/Users/sophie/construction-blog-review/` | Tender preview/publication patches and screenshots | Historical review artifacts |
| `/Users/sophie/Documents/Codex/Projects/construction-tender-benchmark/docs/blog/` | Tender research-project specification and draft; also currently stores the two supplied GCPC expert memos | Tender project records stay here; GCPC memo copies are filed with this website's editorial records |
| `/Users/sophie/Sophie508.github.io/docs/superpowers/` | Earlier implementation plans and design specifications | Historical paths retained; new blog editorial files use `docs/blog/` |

No old folder was deleted or relocated. In particular, a Git worktree must not be treated as a disposable screenshot directory. The two GCPC review copies preserve the supplied files byte-for-byte; their originals remain in the construction project. Public-blog edits do not propagate back into research-project drafts.

## Current convention

- One editable public website tree: `/Users/sophie/Sophie508.github.io/blog/`.
- One editorial location: `/Users/sophie/Sophie508.github.io/docs/blog/`.
- One local review-output location: `/Users/sophie/Sophie508.github.io/artifacts/blog/` (Git-ignored).

This establishes the working convention without breaking previous links or moving unreviewed work. A later physical archive of the legacy directories should check their Git status, pending diffs and external references first.
