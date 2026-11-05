# Tender Episode 1 revision verification

Local revision prepared against the supplied November 5 review. No commit or publication is claimed here.

## What changed

| Review concern | Implemented response |
| --- | --- |
| S1–S2, T1, T5: competing questions and examples | One stone question in the hero; the same schematic surround returns in Fig. 7. Calculate identifies 239 m² as an independent remeasurement, not an agent output. Short conclusions in prose; limits in captions and Episode notes. |
| S3–S4, V1–V6: early density and disconnected digest | Fig. 3 joins repeat and digest views around stone. Six baseline rows are expandable there; the complete 26 × 6 matrix moves to Episode notes. Every condition has a reading cue, with data-checked highlights. Signed diverging colors, a common gray unavailable state, and integer digest ticks. |
| S5, V8–V9: textual trace instead of a visible action | Fig. 6 switches the same schematic glass opening from panes to outer frame. Recorded Astra steps remain expandable. Glass is explicitly distinguished from the unresolved stone example. |
| S6, T4, V6–V7: too much visible material | Five numbered chapters and seven main figures. Rule A is visible with an unfolded-surface diagram; B–G are disclosed. The targeted table defaults to six largest absolute changes and retains all/rule filters. |
| T2–T3: industry motivation and bridge to AI | The task begins with comparable contractor pricing, then the five-step workflow. Measurement conventions are compared with annotation guidelines at the task, repeated-pattern, and operational-rule transitions. |
| T6 and redundancy list | Reading instruction, boundary and source are kept near the figure. Dense counts and methods move out of main prose. All existing public research data and drawing files remain unchanged. |

## Deliberate deviations from the review examples

- No invented ±20% random-error band. The shaded range in Fig. 3 is the actual minimum-to-maximum range of the three Sol runs, labeled as such. The page does not infer causality from repeatability.
- No claim that all three models were a third low in baseline: Muse’s selected baseline stone quantity is an overestimate.
- Expert-condition highlights use actual within-30% counts: 2.1: 0→4; 6.3: 1→4; 7: 1→5; 8: 0→3. The review's illustrative zeros were not copied.
- The six-row baseline overview is inside Fig. 3 as a disclosure, to keep the default path to seven figures and avoid another early table.
- Rule A's archived tracked rows remain 2.1 / 2.2 / 2.3. Its general surface illustration does not relabel the stone experiment or claim the stone hypothesis is proved.
- Opening language follows the meaning of the user's tender example without the absolute “tender is not haggling” formulation.

## Measured reading path

Browser-rendered `main.innerText`, default states and closed disclosures, at a 1280px viewport. Counts include headings, labels and figure captions; they are not a controlled reading-time measurement.

| Metric | Before | After |
| --- | ---: | ---: |
| Numbered chapters | 8 | 5 |
| Main figures outside disclosures | 11 | 7 |
| Visible whitespace-delimited words | 2,924 | 1,326 |
| Document height | 15,166px | 8,974px |
| Disclosure elements, including nested ones | 13 | 32 |

The new page has more optional evidence disclosures, but substantially less material on the default path. Images and sources remain accessible.

## Checks performed

- `node --check` passed for app.js and data.js; `git diff --check` passed.
- HTML local-file references, anchors, duplicate IDs and 14 source-note identifiers checked; no failures.
- data.js is byte-identical to the before snapshot; data/image assets are absent from the Git diff. Original evidence remains 26 rows × 6 configurations × 4 conditions.
- Geometry: four states, user-started playback and manual interruption; digest: baseline/digest state changes; Astra: both score and all-26 count views.
- Matrix: full 26 rows, condition cue/highlight updates, keyboard cell activation with exact quantity, unavailable states; change table: six / 21 / rule-filtered rows.
- Boundary: mouse and Enter change the counted region; native disclosures open with Enter. Depth: 0.25 m gives 351.75 m²; Home, End and arrows work; End gives 464.5 m². Assumed-depth labels and uncertainty remain visible.
- Responsive DOM and visual inspection at 390px and 1280px; 768px layout checked. No page-wide horizontal overflow. The full matrix scrolls inside its container on narrow screens. Main charts use compact mobile axes so the reference stays visible.
- Browser console showed no JavaScript errors during interaction checks.
- Runtime local payload is approximately 135 KiB uncompressed / 35 KiB gzip estimate (HTML, CSS, app and data only); this excludes Google Fonts, headers and the drawing requested when expanded. No throttled first-load or physical-device performance claim.

Actual VoiceOver speech and physical mobile devices were not tested. Existing native buttons, select, range and details semantics were retained; accessible names and live status text were inspected.

## Review artifacts

`artifacts/blog/tender1-ep1/2026-11-05/` (ignored): before snapshot, static-check results, screenshots, and scoped revision.patch. Canonical public source stays in `blog/tender1-ep1/`; no alternate blog checkout was created. Review source is preserved unchanged in `reviews/2026-11-05-review.md`.
