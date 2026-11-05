# HTMLPresentBench interactive article

Local preview: http://localhost:8922/blog/htmlpresentbench/
Planned URL: https://sophie508.github.io/blog/htmlpresentbench/

## Source and scope

Primary source: `/Users/sophie/Downloads/51296_HTMLPresentBench_How_Wel.pdf` (33 pages, supplied November 4, 2026). `paper.pdf` is an exact copy. Its SHA-256 is recorded in `results.json`. Page numbering matches the PDF's printed pages.

The article uses the same white/Inter Tight/Source Serif 4/IBM Plex Mono typography, 640px prose measure, wide figures, and restrained controls as Odyssey and the approved GCPC/AIRGuard pages. It uses original prose and component implementations. No paper author list is inferred from the anonymous manuscript. No existing homepage publication entry for this project was found, so homepage metadata and other blogs remain unchanged.

## Data

`results.json` and `data.js` contain all 44 rows from Appendix G.1 Table 3: 11 generators × 4 methods, with Content, Visual, and Access scores, their standard errors, and estimated USD/report. Numeric values were extracted from the table and checked against its rendered page. Across-model means are calculated from the rounded reported model means; no pooled standard error is invented. Model comparisons also involve different agent harnesses.

Figure 5 supplies the opening case's original report scores: Markdown 84.7/93.3/22.2; Direct HTML 84.5/100.0/50.0; HTML Anything 85.4/76.7/66.7, ordered Content/Visual/Access. The live layouts are labeled explanatory reconstructions, not evaluated files. Original paper pages 28 and 33 are available through modal source viewers.

Domain counts are from Appendix F: ten domains ×5, paper reproduction ×4, scientific computing ×3, travel planning ×3 =60. Domain marks have no fabricated task IDs or per-task scores. No participant annotations or raw response files are exported.

## Interactions

- Hero: inspect outcome, artifact evidence, and verification caveat.
- Comparison: switch report layouts, inspect a patch excerpt, play through methods.
- Three-axis lab: a fictional Shenzhen-listed stock report uses a reference close of CNY 12.80. Toggle an incorrect price, an obscuring badge, and a vague collapsed entry. All market values are invented; explanations are qualitative, not benchmark scores.
- Reader-need tree: the same fictional price example connects questions about value, source, meaning, and scope. Edges are parent-child relations, not preset efficiency weights. Report-specific continuity uses cues and rendered distance (Appendix D); no reading time is claimed. This shortened tree is not an exported study rubric.
- Pipeline: frozen task references, per-report evidence, and evidence-grounded judgments; playable but not an execution replay.
- Domain donut: real case shares, hover/focus preview, click/Enter/Space to keep a selection, and a touch-friendly legend. Source benchmark labels, purposes, and subset examples come from the 60 local `bench_trajs/*/*/case_meta.json` files. Mind2Web is explicitly labeled as human demonstrations; upstream versions are not inferred.
- Three-axis results explorer with source table and JSON download.
- Bound-tightening tutorial: new independent sqrt(2) example inspired by Figure 10. All slider positions preserve valid bounds; the floor becomes determined when the cube interval is wholly below 3. No study timing/comprehension result is attributed to it.

## Evidence limitations

The human-study confidence interval is internally inconsistent in the supplied PDF: Table 2 prints Access +10.3 [0.5,22.5], while §4.3 prints [-0.5,22.5] and says it includes zero. The article explicitly records the discrepancy and follows the conservative prose interpretation. This is not silently corrected in the PDF.

Content validation questions target understandability, not every Content subdimension. Visual quality is not independently validated in the reported human comparison. Evaluation cost excludes one-time reference construction and human review. Access checks are proxies for reader support, not direct measurements of cognitive load, reading time, or comprehension.

## Delivery

Buildless local HTML/CSS/JS. All interactions run locally, require no account, and send no task or reader data. External Google Fonts are optional; system font fallbacks are provided. Playbacks are user-started, pausable, mutually exclusive, and stop when the page becomes hidden. Reduced-motion settings suppress CSS motion.

Review evidence and scoped diff: `/Users/sophie/htmlpresentbench-blog-review/`.
No commit or push without Sophie's explicit approval. Keep current AIRGuard, GCPC, homepage, research results, and unrelated files untouched.
