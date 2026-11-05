# GCPC run-identity marks — review section 11

Implemented the user-approved design using native CSS wavy underlines. No new emphasis highlights or data changes.

## Mapping and scope

- Without skill: blue #386fba.
- With skill: cool magenta-pink #b4459d.
- Pass #237056 and fail #a04b43 continue to represent outcomes.
- Mark the specified phrases in steps 1, 2 and 4; no restoration of optional numeric prose in step 2.
- Reuse the same classes on hero/figure run labels and FAIL verdicts, verifier grid row labels, implementation-card titles, Inspect labels and executed-code headings.
- Apply the same mapping to the matched-pair prose and Fig. 8 verdicts, with explicit without/with labels.
- Keep text labels, source highlighting and raw evidence intact. These underlines do not encode success or importance.

## Verification

- JavaScript syntax and git diff whitespace checks pass.
- Desktop 1280px: verified the requested narrative spans and figure titles use identical wavy line colors; inspected blue/pink labels alongside green/red verifier cells.
- Step 1 FAIL verdicts retain the original 30px size and failure-red text, with run-colored lines.
- Inspect labels use the two run colors while both failed-status pills remain failure red.
- Mobile-width 390px: step-4 text and Fig. 8 have no document-level horizontal overflow.
- Fig. 8 switches to the unchanged 20.9 / 60.4 / 18.7 distribution.
- Counts remain 12 pass / 11 fail / 3 skip and 22 pass / 1 fail / 3 skip. No files under data/ changed.
- No captured browser console errors. No physical-device or screen-reader testing claimed.

Screenshots and review.patch: artifacts/blog/gcpc/2026-11-05-round4/ (ignored).
Status: local preview only; awaiting diff approval before commit and push.
