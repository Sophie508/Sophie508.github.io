# GCPC second-review follow-up

Input: section 9 appended to the supplied review memo. Its canonical editorial copy now includes that section; the construction project's original is unchanged.

## Disposition of the six remaining comments

1. Unified author-written interface language around **requirement**, including the task browser, task-dot tooltips, drawer metadata, verification labels, diagrams and disclosures. Code identifiers (`items`, `item_id`, CSS classes) and original archived quotations/notes remain unchanged. The extra official-outcome accounting entry is called an **entry**, not a task requirement.
2. Moved the analysis-cohort/archive distinction from the validation opening into that section's limitations disclosure.
3. Replaced the abstract opening with an explicitly imagined reader situation: opening a failed Excel report and deciding what can be kept or must be fixed. No research anecdote or causal claim was invented.
4. Kept the primary “Start with an example” link; removed the redundant link inside the hero card.
5. Source inspection found a 300ms fade, not a configured multi-second delay. Removed the fade altogether. Browser inspection after Enter activation reports `animation-name: none`, duration `0s`, opacity `1`, and visible results. The report of a longer perceived delay is not assigned an unverified cause. A stale-resource issue was independently observed during local checking; versioned URLs now refresh the changed CSS and JavaScript.
6. Kept section 02 as the short conceptual transition from tests to task requirements. This preserves the six-section navigation; merging was optional in the review.

## Verification

- JavaScript syntax and Git whitespace checks pass. Original evidence/checklist data are unchanged.
- One hero link points to the example. The browser displays “713 requirements in this benchmark.”
- Keyboard Enter selects the six-step figure and score controls; Space restores the binary-result view.
- The score illustration still returns 60% score / 100% coverage for No.
- Tab from the task search reaches benchmark selection. Enter opens the selected task; the dialog has its visible title as accessible name, focuses Close, and Escape closes it and restores focus to the triggering task.
- The paired-failure toggle now supplies `aria-controls` and a polite, atomic status announcement containing the numerical result. Keyboard and DOM/accessibility semantics were inspected; actual VoiceOver speech has **not** been tested.
- The local browser at 452px width displays the revealed chart without horizontal clipping. Earlier 390px and 768px layout evidence remains in the first-round record.

## Payload audit

Required local resources on initial load were enumerated from the HTML and startup fetches: HTML, four CSS files, five JavaScript files including case evidence, the task index, and the sales-pivot task JSON.

- Unique uncompressed payload: approximately **325 KiB**.
- Local gzip estimate: approximately **55 KiB**, not measured HTTP transfer.
- Entire archived JSON collection: **10.7 MiB**, loaded per selected task rather than all at once.
- External Google Fonts, headers, repeated requests, cache effects and time-to-interactive are outside these size figures. The index and sales-pivot JSON have more than one startup caller; the byte total is explicitly deduplicated.

Exact baseline byte counts are in local `artifacts/blog/gcpc/2026-11-05-round2/payload.json`. No real-device network throttling or screen-reader speech test is claimed.

This is a local follow-up revision. Its diff is ready for review; this record does not claim publication.
