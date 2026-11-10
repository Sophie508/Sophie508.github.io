# HTMLPresentBench interactive article

Local preview: http://localhost:8922/blog/htmlpresentbench/
Public URL: https://sophie508.github.io/blog/htmlpresentbench/

## Source and scope

Primary source: `/Users/sophie/Downloads/51296_HTMLPresentBench_How_Wel.pdf` (33 pages, supplied November 4, 2026). `paper.pdf` is an exact copy. Its SHA-256 is recorded in `results.json`. Page numbering matches the PDF's printed pages.

The November 10 editorial revision uses a warm paper background, restrained burgundy accents, a 740px reading measure and a single stock-report example through the motivation, three dimensions and reader needs. The three evaluation steps are visible without playback. Dataset composition follows the method; code-repair and mathematical examples are contextual supplementary disclosures. Original scores, data, paper and evidence qualifications are preserved.

The layout takes editorial inspiration from Kordi’s research writing and Odysseys2, with independently written prose and components. No paper author list is inferred from the anonymous manuscript.

## Data

`results.json` and `data.js` contain all 44 rows from Appendix G.1 Table 3: 11 generators × 4 methods, with Content, Visual, and Access scores, their standard errors, and estimated USD/report. Numeric values were extracted from the table and checked against its rendered page. Across-model means are calculated from the rounded reported model means; no pooled standard error is invented. Model comparisons also involve different agent harnesses.

Figure 5 supplies the supplementary code case's original report scores: Markdown 84.7/93.3/22.2; Direct HTML 84.5/100.0/50.0; HTML Anything 85.4/76.7/66.7, ordered Content/Visual/Access. The live layouts are labeled explanatory reconstructions, not evaluated files. Original paper pages 28 and 33 are available through modal source viewers.

Domain counts are from Appendix F: ten domains ×5, paper reproduction ×4, scientific computing ×3, travel planning ×3 =60. Domain marks have no fabricated task IDs or per-task scores. No participant annotations or raw response files are exported.

## Interactions

- Comparison: expand the contextual code example, switch report layouts and inspect a patch excerpt.
- Three-axis lab: a fictional Shenzhen-listed stock report uses a reference close of CNY 12.80. Toggle an incorrect price, an obscuring badge, and a vague collapsed entry. All market values are invented; explanations are qualitative, not benchmark scores.
- Reader-need tree: the same fictional price example connects questions about value, source, meaning, and scope. Edges are parent-child relations, not preset efficiency weights. Report-specific continuity uses cues and rendered distance (Appendix D); no reading time is claimed. This shortened tree is not an exported study rubric.
- Pipeline: three static, numbered steps show frozen task references, per-report evidence and evidence-grounded judgments together.
- Domain donut: real case shares, hover/focus preview, click/Enter/Space to keep a selection, and a touch-friendly legend. Source benchmark labels, purposes, and subset examples come from the 60 local `bench_trajs/*/*/case_meta.json` files. Mind2Web is explicitly labeled as human demonstrations; upstream versions are not inferred.
- Three-axis results explorer: generator selection and manual method highlighting, with an exact source table and JSON download. HTML Anything is highlighted initially; deltas use Direct HTML as the reference.
- Bound-tightening tutorial: new independent sqrt(2) example inspired by Figure 10. All slider positions preserve valid bounds; the floor becomes determined when the cube interval is wholly below 3. No study timing/comprehension result is attributed to it.

## Evidence limitations

The human-study confidence interval is internally inconsistent in the supplied PDF: Table 2 prints Access +10.3 [0.5,22.5], while §4.3 prints [-0.5,22.5] and says it includes zero. The article explicitly records the discrepancy and follows the conservative prose interpretation. This is not silently corrected in the PDF.

Content validation questions target understandability, not every Content subdimension. Visual quality is not independently validated in the reported human comparison. Evaluation cost excludes one-time reference construction and human review. Access checks are proxies for reader support, not direct measurements of cognitive load, reading time, or comprehension.

## Delivery

Buildless local HTML/CSS/JS. All interactions run locally, require no account, and send no task or reader data. External Google Fonts are optional; system font fallbacks are provided. Only the optional mathematical illustration has playback. It is user-started, pausable, and stops when the page becomes hidden. Deep links to supplementary examples expand their enclosing disclosure. Reduced-motion settings suppress CSS motion.

Editorial plan and verification notes: `docs/blog/htmlpresentbench/`. Before snapshots, screenshots and scoped diff: `artifacts/blog/htmlpresentbench/2026-11-10/` (local review artifacts, not published).
No commit or push without Sophie's explicit approval. Keep current AIRGuard, GCPC, homepage, research results, and unrelated files untouched.
