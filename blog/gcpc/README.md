# GCPC English research article

Canonical source: `/Users/sophie/Sophie508.github.io/blog/gcpc/`.
Public route: https://sophie508.github.io/blog/gcpc/.
Local preview: http://localhost:8922/blog/gcpc/ (serve the personal-site root).

The public article already exists. Sophie approved the November 5 editorial revision for commit and publication after reviewing the local preview and scoped diff. Future commits and pushes still require explicit approval.

## Current reading structure

1. Two failed Excel runs, explored through six steps in one persistent figure.
2. Why the task requirement is a different evaluation unit from a verifier check.
3. Source-grounded requirement construction, validation and review.
4. Yes / No / Abstain, with score and evidence coverage shown together.
5. Human comparisons, matched failed-run differences and transfer limits.
6. The task archive, with the earlier sage-dot overview available as a secondary view.

`case-interactions.js` and `case-story.css` implement scroll-driven steps at desktop widths of at least 1000px and heights of at least 650px. Explicit six-step buttons work at all widths; smaller viewports show one narrative step at a time. Source data are unchanged. The nine requirements are not inferred scores or a one-to-one conversion of all 26 checks. S-01 remains visible in the nine-requirement view and the workbook disclosure.

`story.js` retains the source-to-requirement interaction, score/coverage illustration, and binary-versus-checklist result reveal. The selected quotation appears once; the full highlighted source is available in a disclosure. Percentages for the failed-run distribution are hidden until its checklist view is selected.

Expert review inputs and the revision plan are in `docs/blog/gcpc/`. Local screenshots and review patches are in Git-ignored `artifacts/blog/gcpc/2026-11-05/`. See `blog/README.md` and `docs/blog/WORKSPACE-MAP.md` for the canonical layout and legacy folders.

## Typography

The page retains the established white-background design with Source Serif 4, Inter Tight and IBM Plex Mono, readable narrow prose, and restrained sage evidence accents. Font families load from Google Fonts with local fallbacks. Original research evidence and original diagrams are retained; no reference-site prose or source was copied.

## Evidence

Source project: GCPC / Beyond Pass Rate. Paths in `data/case.js` are relative to that research checkout, not this website.

- Task: `benchmark/tasks/curated/sales-pivot-analysis/instruction.md`, identical to the no-skills instruction.
- Runs: `benchmark/results/jobs/{noskills,curated}-codex-gpt52/sales-pivot-analysis__trial-03/`.
- Model: `gpt-5.2-codex`; conditions: no_skills and curated; both official outcomes: FAIL.
- Counts: original stdout lines 27–52 contain 26 aligned parameterized subtests. Without skill: 12 pass / 11 fail / 3 skip; with skill: 22 pass / 1 fail / 3 skip. The CTRF summary collapses function names and must not be used to count these test cases.
- Executed commands: no-skills `agent/codex.jsonl:14`, curated `agent/codex.jsonl:18`; skill read: curated line 8.
- Shared Quarter error: no-skills stdout line 189 and curated stdout line 67.
- Exact raw test lines, source locations, command excerpts and stdout SHA-256 hashes are preserved from the verified Chinese prototype. Only presentation labels are translated.

Diagrams are structural schematics, not workbook screenshots. No cell values or GCPC scores were invented. Verifier checks vary in granularity, so their pass count is not a task-completion percentage. SKIPPED is not GCPC Abstain. Object/configuration checks do not establish numerical correctness, and a single pair does not establish causal or population-level skill effects.

## Task archive

The export contains 273 seed-1 checklists (1,634 requirements): SkillsBench v1.1 87/713, Terminal-Bench 2.0 86/585, and SWE-bench Verified 100/336. Task-dot shades encode checklist length (1–4, 5–8, 9–12, 13–16), not task success. This task collection is separate from the two-run verifier grid.

`explorer.js` and `explorer.css` implement benchmark selection, task/domain search, a native modal drawer, task-source highlighting, checklist accordions, run selection, score comparison, JSON download and a controllable reading walkthrough. The animation advances checklist items, not execution time or intermediate task scores. Reduced-motion preferences disable spatial/width transitions. Only the selected task JSON loads after the small index.

The export includes 7,390 compatible binary-outcome archived records: 7,018 SkillsBench configuration-by-task records, 172 Terminal-Bench runs and 200 SWE-bench runs. This collection is NOT the paper's 4,455-trajectory analysis cohort or a performance leaderboard. Cross-benchmark samples intentionally contain one official PASS and FAIL per task. Non-binary outcomes (751) and mismatched checklist IDs (3) were omitted from the run view; their task checklists remain available.

Log-only and outcome-inclusive judgments are separate. SkillsBench official-PASS cells have raw results only where the separate raw-backfill rejudgment exists; these are explicitly labeled as a distinct judging pass. Cross-benchmark records retain raw totals but overwrite some assertion judgments; missing originals display “Not retained,” never “Abstain.” Official-PASS-derived Yes answers carry their basis. Outcome-inclusive counts include an additional endpoint item, shown separately from generated requirements. No execution rationale, excerpt, intermediate score, duration or causal claim is invented.

Exports preserve allowlisted original requirement, quote, check route, reference, verification text, notes and mechanical-validation flags. The drawer highlights exact quotations (normalizing nonbreaking spaces only); missing source matches remain explicit. Source hashes and exclusion counts are in `data/explorer/provenance.json`. Full traces and private annotation files are not exported.

Reproduce from the research checkout with:

```sh
python3 blog/gcpc/scripts/export_explorer.py '/path/to/beyound pass rate'
```

The existing Excel case now explains the task, native PivotTables, income quartiles, and the parameterized 26-test expansion. `data/sales-pivot-verifier.py` is an exact copy of the original case verifier for download.

## Unresolved protocol detail

The author's account says every checklist was manually reviewed before scoring; the paper describes targeted author review. The article keeps this distinction in its protocol disclosure and does not claim human review was blind to trajectories. This editorial revision does not resolve that research-documentation discrepancy.
