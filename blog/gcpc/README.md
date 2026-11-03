# GCPC English research article

Canonical planned URL: https://sophie508.github.io/blog/gcpc/

Local preview from the personal-site root:

```sh
python3 -m http.server 8922 --bind 127.0.0.1
```

Visit `http://localhost:8922/#publications` and follow this paper's Blog link. This page is a local draft until review and publication approval. All five sections now contain full English prose: the paired failure case, completion criteria, checklist construction, evidence scoring, and empirical validation. New figures explain the pipeline, score/coverage distinction, human preference agreement, and FAIL-to-FAIL changes. Native disclosures provide technical detail. The draft protocol note flags the unresolved difference between the author’s account of full manual review and the paper’s description of targeted review; reconcile before publication.

## Typography

Reference inspected on 2026-11-03: https://odysseysbench.com/v2/ . The page adopts its Source Serif 4 / Inter Tight / IBM Plex Mono typography, 18px body with 1.62 leading, 19.2px lead, 34.4px section headings, 13.76px captions, 640px prose width, and 53px sticky navigation. The article-specific title and paired-case figure use their own composition within a two-column opening. Font families load from Google Fonts with local fallback stacks; evidence interactions have no network dependency. No reference-site source, prose or diagrams were copied.

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

## Chinese discussion draft

The existing Chinese prototype remains unchanged in the separate `research-pages-gcpc-blog` worktree under `gcpc-blog/`. It is an editorial discussion draft, not a second automatically synchronized language route.

## Review boundary

The only home-page change is the relative Blog link next to the GCPC arXiv/PDF links. It reuses existing button CSS. No other publications or personal-site styles change. No commit or push without Sophie's explicit approval.

## Task explorer

The Explore tasks section includes 273 seed-1 checklists (1,634 items): SkillsBench v1.1 87/713, Terminal-Bench 2.0 86/585, and SWE-bench Verified 100/336. Each blue tile represents a task; color encodes checklist length on the same 1–16 scale. This is separate from the two-run verifier-subtest grid in the opening.

`explorer.js` and `explorer.css` implement benchmark selection, task/domain search, a native modal drawer, task-source highlighting, checklist accordions, run selection, score comparison, JSON download and a controllable reading walkthrough. The animation advances checklist items, not execution time or intermediate task scores. Reduced-motion preferences disable spatial/width transitions. Only the selected task JSON loads after the small index.

The export includes 7,390 compatible binary-outcome archived records: 7,018 SkillsBench configuration-by-task records, 172 Terminal-Bench runs and 200 SWE-bench runs. This collection is NOT the paper's 4,455-trajectory analysis cohort or a performance leaderboard. Cross-benchmark samples intentionally contain one official PASS and FAIL per task. Non-binary outcomes (751) and mismatched checklist IDs (3) were omitted from the run view; their task checklists remain available.

Log-only and outcome-inclusive judgments are separate. SkillsBench official-PASS cells have raw results only where the separate raw-backfill rejudgment exists; these are explicitly labeled as a distinct judging pass. Cross-benchmark records retain raw totals but overwrite some assertion judgments; missing originals display “Not retained,” never “Abstain.” Official-PASS-derived Yes answers carry their basis. Outcome-inclusive counts include an additional endpoint item, shown separately from generated requirements. No execution rationale, excerpt, intermediate score, duration or causal claim is invented.

Exports preserve allowlisted original requirement, quote, check route, reference, verification text, notes and mechanical-validation flags. The drawer highlights exact quotations (normalizing nonbreaking spaces only); missing source matches remain explicit. Source hashes and exclusion counts are in `data/explorer/provenance.json`. Full traces and private annotation files are not exported.

Reproduce from the research checkout with:

```sh
python3 blog/gcpc/scripts/export_explorer.py '/path/to/beyound pass rate'
```

The existing Excel case now explains the task, native PivotTables, income quartiles, and the parameterized 26-test expansion. `data/sales-pivot-verifier.py` is an exact copy of the original case verifier for download.

## November 3 editorial revision

Inspected the Odyssey reference directly in Chrome, including expanding task rubrics and toggling its grading-policy example. The revised opening exposes a real task mosaic; the original two-run verifier grid now appears after the Excel case. The narrative moves through why, requirement granularity, checklist construction, evidence grading, validation, and the full archive.

`story.js` / `story.css` add a three-benchmark opening, three inline task/rubric examples with exact source highlighting, the paper's Yes/No/Abstain cards, a clearly labeled synthetic five-item scoring illustration, and a binary-versus-checklist aggregate view. Editorial short item titles never replace original requirements. Missing quotations and original validation flags remain exposed. The scoring illustration changes only its fifth judgment and reports score and coverage together; it is not a research run or execution replay.

Existing exported data, original case evidence, and research sources are unchanged. The manual-review protocol discrepancy remains in the draft. Publication is still pending review.

## Shaded task dots and concrete cases

The opening uses one equal-sized sage-green dot per task (87, 86 and 100 for the three study samples). Four shared shades encode checklist counts of 1–4, 5–8, 9–12 and 13–16; darker means more items, not a higher score. Invisible targets remain at least 44×44 pixels; narrower screens use fewer columns. Hover or keyboard focus adds an outer blue ring without changing the data color and reveals the task name and exact count. Selecting a dot opens the existing archive drawer. The full archive at the end retains its existing search and task grid.

`case-interactions.js` adds five workbook-sheet views with original requirement links and three focused two-run comparisons (implementation, STATE row-field test, invalid Quarter value). The workbook is a requested-structure schematic, not a screenshot or live spreadsheet. Compared verifier outcomes remain distinct from GCPC judgments. Exact executed-code excerpts and verifier logs remain accessible.

Task-source quotations in the inline anatomy are now clickable in both directions. Original text is preserved, including overlaps; shorter matching quotations are preferred when selecting an overlapping span unless its currently selected requirement also covers it. Missing quotations remain explicit. Short item titles are editorial aids, not replacements for original criteria.
