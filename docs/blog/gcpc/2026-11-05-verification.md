# GCPC revision verification

Scope: November 5 expert-review revision of the local GCPC article. Checks below were recorded before commit and publication. Sophie subsequently approved the scoped revision for push. Separate pending AIRGuard edits are outside this change.

## Evidence and static checks

- The original case data, original verifier and all exported checklist/run JSON files are unchanged in Git.
- Both expert-review copies match the supplied originals byte-for-byte.
- JavaScript syntax checks pass for app.js, story.js and case-interactions.js.
- No duplicate HTML IDs or missing local script/style/link targets were found.
- Git whitespace checks pass.
- Main narrative paragraphs and blockquotes in sections 01–05 total approximately 982 words (excluding figures, captions, headings, disclosures, and the hero). Technical evidence remains accessible in disclosures.

## Browser checks

At a 1280×720 desktop viewport:

- All six manual steps select their intended state. PageDown advances the scroll-driven narrative.
- Two rows contain 26 original checks each; counts remain 12/11/3 and 22/1/3 for pass/fail/skip.
- The Quarter step highlights test index 21 in both runs. Clicking a different test opens its original-output disclosure.
- The granularity step highlights the eight column checks in each run and links them conceptually to S-06.
- The final step lists S-01 through S-09 without inferred run scores. Opening a requirement reaches the existing task archive; closing restores focus.
- Selecting S-02 shows the original `Values: Sum of POPULATION_2023` quotation and highlights the same text in the full source. Switching to the package-server example loads its six requirements.
- Score/coverage states remain 75/80 for Abstain, 80/100 for Yes, and 60/100 for No.
- The paired-failure percentages appear only in the checklist view; toggling back hides them.
- Searching `pivot` finds the sales-pivot task. The relocated sage-dot overview opens tasks through the same drawer.
- No horizontal page overflow was observed in desktop DOM measurements. Technical disclosures can expand within the sticky panel's scrollable area.

The actual page was also rendered inside local 390px and 768px iframes. The narrow layout stacks prose above the figure, preserves the six 44px step buttons, and uses seven columns for the check tiles at phone width. The mobile Quarter selection was exercised and visually inspected. These were responsive viewport checks, not physical-device tests.

## Deliberate departures from the review

- Do not attribute the invalid value to the ambiguous column name: the records establish the invalid value, not that causal explanation.
- Do not animate all 26 tests into nine scored requirements: their mapping is not one-to-one, and no such judgments were derived. The one justified eight-to-one example uses S-06; the nine requirements then appear as a separate evaluation unit.
- The manual-review scope discrepancy remains disclosed. This editorial task did not resolve it.

Review screenshots, baseline copies, and the scoped patch are stored in `artifacts/blog/gcpc/2026-11-05/` and excluded from Git.
