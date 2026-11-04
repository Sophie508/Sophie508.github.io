# AIRGuard interactive research article

Local preview: http://localhost:8922/blog/airguard/
Planned publication: https://sophie508.github.io/blog/airguard/

## Editorial scope

Six question-led sections: motivating disclosure, related designs, fixed authority and evolving execution, pre-action decisions, empirical results, and limitations. Typography follows the approved GCPC/Odyssey reference: Inter Tight headings/UI, Source Serif 4 prose, IBM Plex Mono metadata, white background, 640px prose, 1120px figures, and restrained color.

The author list is taken from the existing personal homepage. The primary research source is Sophie's supplied revised PDF (metadata date October 26, 2026), copied byte-for-byte to `paper-revised.pdf`. Its SHA-256 is `3b11d823cdc92897e0ea2c75d6cb113ebf2394b25b4dea59a8bbcb2743d047ce`. The arXiv link is explicitly labeled as the earlier version. This copy is prepared for local review; publication requires explicit approval.

## Components and evidence

- `index.html`: complete English article and semantic controls. Adds a separate Blog link to the AIRGuard publication in the root homepage.
- `styles.css`: self-contained layout and responsive behavior, without modifying GCPC styles. Reduced-motion preferences disable smooth scrolling and visual transitions. Playback is user-started and pausable.
- `app.js`: mail explanation, related-work lenses, operation graph, appendix script walkthrough, security/utility chart, ablation interpretation, and intervention distribution.
- `results.js`: 72 records (six models × six defenses × two benchmarks) extracted from Table 1, page 6. ASR and UPR are percentages; tokens are total millions. This is aggregate table data, not raw traces.

Mail illustrations adapt §§1–3 and Figures 2–3. No recorded case IDs, exact command replay, or baseline outcomes are invented. Graph nodes for proposed actions are distinct from executed/committed history. Partial removal is conditional on other checks allowing execution; removal does not override a blocking decision.

The script example is Appendix A.1.3: uncovered `exec` for `helper.py`, low-trust source, `inspect`, write-then-execute audit, and no relaxation. The page does not claim a real sandbox, graph-only ablation, or formal security guarantee.

Table 2 supplies prompt-only ASR 20.9 / 17.6 / 7.7 on GPT-5.6 Sol and 91 AgentTrap attacks. The 74-run diagnostic distribution is from §4.2 (page 7): 39 script effect checks, 3 graph script blocks, 1 recipient removal, 1 risk tag, 1 deletion rule, 1 sequence audit, and 28 no-intervention runs. Marks represent grouped counts, not separately inspectable trajectories.

DTAP scope notes remain visible: 50 direct + 50 indirect attacks, different agent loops for some baseline comparisons, no recipient extraction/final-response hook in the evaluated adapter. The within-threat-model indirect comparison is 9/300 versus 4/300 across six backbones. Novelty is framed as a concrete systems/method design with evaluation, not the invention of provenance, dynamic graphs, or authorization. Closest related systems are linked and missing direct comparisons are disclosed.

## Validation and publication

Run JavaScript syntax checks, verify all local href/src targets and anchor IDs, compare the results data with the supplied PDF table, and inspect the desktop/mobile controls. Review artifacts are outside the website checkout in `/Users/sophie/research-pages-airguard-blog-review/`.

Do not commit or push without Sophie's approval. The preceding GCPC publication approval does not authorize publishing AIRGuard. Leave unrelated `.DS_Store`, research results, and existing planning notes untouched.
