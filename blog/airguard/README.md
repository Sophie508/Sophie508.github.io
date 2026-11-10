# AIRGuard interactive research article

Local preview: http://localhost:8922/blog/airguard/
Publication: https://sophie508.github.io/blog/airguard/

## Editorial scope

Five reader-led sections: one motivating email, task-bound action checks, comparison with established designs, measured evidence, and limitations. The November 10 edition follows the approved HTMLPresentBench direction: Inter Tight prose/headings, IBM Plex Mono metadata, warm white background, burgundy links, 740px prose and 960px figures. Core reasoning is readable without playing or selecting a sequence.

The author list is taken from the existing personal homepage. The primary research source is Sophie's supplied revised PDF (metadata date October 26, 2026), copied byte-for-byte to `paper-revised.pdf`. Its SHA-256 is `3b11d823cdc92897e0ea2c75d6cb113ebf2394b25b4dea59a8bbcb2743d047ce`. The arXiv link is explicitly labeled as the earlier version. The revised article is prepared for local review; committing and publishing changes require explicit approval.

## Components and evidence

- `index.html`: complete English article and semantic controls. Adds a separate Blog link to the AIRGuard publication in the root homepage.
- `styles.css`: self-contained layout and responsive behavior, without modifying GCPC styles. Reduced-motion preferences disable smooth scrolling and visual transitions. Interactive controls are user-operated; the duplicate email playback has been removed.
- `app.js`: recipient inspection, operation graph, security/utility chart, diagnostic category selection, and disclosure-aware deep links. The prompt-only comparison and script steps are directly readable.
- `prior-work.js`: the retained concrete CaMeL/ARGUS/AIRGuard comparison, available in a contextual disclosure after a concise default-visible comparison.
- `results.js`: 72 records (six models × six defenses × two benchmarks) extracted from Table 1, page 6. ASR and UPR are percentages; tokens are total millions. This is aggregate table data, not raw traces.

Mail illustrations adapt §§1–3 and Figures 2–3. No recorded case IDs, exact command replay, or baseline outcomes are invented. Graph nodes for proposed actions are distinct from executed/committed history. Partial removal is conditional on other checks allowing execution; removal does not override a blocking decision.

The script example is Appendix A.1.3: uncovered `exec` for `helper.py`, low-trust source, `inspect`, write-then-execute audit, and no relaxation. The page does not claim a real sandbox, graph-only ablation, or formal security guarantee.

Table 2 supplies prompt-only ASR 20.9 / 17.6 / 7.7 on GPT-5.6 Sol and 91 AgentTrap attacks. The 74-run diagnostic distribution is from §4.2 (page 7): 39 script effect checks, 3 graph script blocks, 1 recipient removal, 1 risk tag, 1 deletion rule, 1 sequence audit, and 28 no-intervention runs. The seven proportional segments represent grouped counts, not separately inspectable trajectories; category controls expose the associated explanation.

DTAP scope notes remain visible: 50 direct + 50 indirect attacks, different agent loops for some baseline comparisons, no recipient extraction/final-response hook in the evaluated adapter. The within-threat-model indirect comparison is 9/300 versus 4/300 across six backbones. Novelty is framed as a concrete systems/method design with evaluation, not the invention of provenance, dynamic graphs, or authorization. Closest related systems are linked and missing direct comparisons are disclosed.

## Validation and publication

Run JavaScript syntax checks, verify all local href/src targets and anchor IDs, compare the results data with the supplied PDF table, and inspect the desktop/mobile controls. Current review artifacts are kept in `artifacts/blog/airguard/2026-11-10/`; editorial plans and verification records belong in `docs/blog/airguard/`.

Do not commit or push without Sophie's approval. The preceding GCPC publication approval does not authorize publishing AIRGuard. Leave unrelated `.DS_Store`, research results, and existing planning notes untouched.

## Prior-work revision (2026-11-05)

Figure 3 uses the same invented email scenario for CaMeL, ARGUS, and AIRGuard. `prior-work.js` owns method/path selection, a desktop SVG and a stacked narrow-screen alternative. CaMeL distinguishes program order, value flow and reader policies. ARGUS traces selected To/Body/Cc arguments to stipulated benign/anomalous evidence and retains the task-invariant check. AIRGuard shows per-target effects; absent coverage lowers trust rather than automatically blocking a call. Selective removal remains conditional on effect checks. No defense is executed or assigned a measured outcome by the component.

Sources checked: CaMeL v2 §5 (https://arxiv.org/html/2503.18813v2#S5); ARGUS v2 §4 (https://arxiv.org/html/2605.03378v2#S4); MELON abstract (https://proceedings.mlr.press/v267/zhu25z.html); supplied AIRGuard revision §3. Original benchmark records and result plotting remain unchanged.
