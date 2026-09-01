# EMNLP Findings Publication Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SinoGlyphBench as an EMNLP Findings publication, add the first-author GCPC preprint, keep AIRGuard below GCPC, and move MemeBridge (KDD) to the bottom of the homepage publication list.

**Architecture:** Preserve the dependency-free static homepage and its existing publication component. Make one focused markup change in `index.html`; no CSS, assets, Blog pages, or CPC pages need to change.

**Tech Stack:** Static HTML5, existing CSS, Python standard-library local server, shell-based structural checks.

## Global Constraints

- Display order must be SinoGlyphBench, Grounded Checklist Partial Credit for Agent Skill Trajectories, AIRGuard, MemeBridge.
- Use the badge text `EMNLP Findings` and venue line `Findings of EMNLP, 2026.`.
- Link the SinoGlyphBench title and `Code` button to `https://github.com/fengshun124/SinoGlyphBench`.
- Use the badge text `arXiv` and venue line `arXiv preprint arXiv:2608.27487, 2026.` for GCPC.
- Link the GCPC title and `arXiv` button to `https://arxiv.org/abs/2608.27487`, and its `PDF` button to `https://arxiv.org/pdf/2608.27487`.
- Emphasize `Suliu Qin` in both new author lists using the existing `<strong>` pattern.
- Do not modify About Me, CSS, profile assets, Blog routes, or CPC pages.
- Show the implementation diff to Sophie before committing. Do not push without separate explicit approval.

---

### Task 1: Update and verify the publication list

**Files:**
- Modify: `index.html:57-106`
- Reference: `docs/superpowers/specs/2026-09-01-emnlp-findings-publication-update-design.md`

**Interfaces:**
- Consumes: the existing `.publication`, `.publication-badge`, `.publication-title`, `.publication-authors`, `.publication-periodical`, and `.publication-actions` CSS hooks.
- Produces: four ordered `<article class="publication">` elements rendered by the existing homepage styles.

- [ ] **Step 1: Record the pre-change structural check**

Run:

```bash
python3 - <<'PY'
from pathlib import Path

html = Path("index.html").read_text()
titles = ["SinoGlyphBench", "Grounded Checklist Partial Credit", "AIRGuard", "MemeBridge"]
print({title: html.find(title) for title in titles})
PY
```

Expected: the approved intermediate homepage already contains SinoGlyphBench, AIRGuard, and MemeBridge in that order; `Grounded Checklist Partial Credit` reports `-1`.

- [ ] **Step 2: Replace the publication markup with the approved order and content**

Inside `<div class="publications">`, use this complete ordered markup:

```html
<article class="publication">
    <span class="publication-badge">EMNLP Findings</span>
    <h3 class="publication-title">
        <a href="https://github.com/fengshun124/SinoGlyphBench" target="_blank" rel="noopener noreferrer">
            SinoGlyphBench: A Diagnostic Benchmark for Chinese Glyph-Level Obfuscation in Language-Model Moderation
        </a>
    </h3>
    <p class="publication-authors">
        Yifan Wang, Zimu Wang, <strong>Suliu Qin</strong>, Changyu Zeng, Tong Chen, Siqi Chen, Yijie Lin, Lingyu Jiang, Jionglong Su, Yushan Pan, Haiyang Zhang, Wei Wang, Qiaoyu Tan
    </p>
    <p class="publication-periodical"><em>Findings of EMNLP, 2026.</em></p>
    <div class="publication-actions">
        <a href="https://github.com/fengshun124/SinoGlyphBench" target="_blank" rel="noopener noreferrer">Code</a>
    </div>
</article>

<article class="publication">
    <span class="publication-badge">arXiv</span>
    <h3 class="publication-title">
        <a href="https://arxiv.org/abs/2608.27487" target="_blank" rel="noopener noreferrer">
            Grounded Checklist Partial Credit for Agent Skill Trajectories
        </a>
    </h3>
    <p class="publication-authors">
        <strong>Suliu Qin</strong>, Lu Yin, Xilu Wang
    </p>
    <p class="publication-periodical"><em>arXiv preprint arXiv:2608.27487, 2026.</em></p>
    <div class="publication-actions">
        <a href="https://arxiv.org/abs/2608.27487" target="_blank" rel="noopener noreferrer">arXiv</a>
        <a href="https://arxiv.org/pdf/2608.27487" target="_blank" rel="noopener noreferrer">PDF</a>
    </div>
</article>

<article class="publication">
    <span class="publication-badge">arXiv</span>
    <h3 class="publication-title">
        <a href="https://arxiv.org/abs/2605.28914" target="_blank" rel="noopener noreferrer">
            AIRGuard: Guarding Agent Actions with Runtime Authority Control
        </a>
    </h3>
    <p class="publication-authors">
        <strong>Suliu Qin</strong>, Haomin Zhuang, Yujun Zhou, Yufei Han, Xiangliang Zhang
    </p>
    <p class="publication-periodical"><em>arXiv preprint arXiv:2605.28914, 2026.</em></p>
    <div class="publication-actions">
        <a href="https://arxiv.org/abs/2605.28914" target="_blank" rel="noopener noreferrer">arXiv</a>
        <a href="https://arxiv.org/pdf/2605.28914" target="_blank" rel="noopener noreferrer">PDF</a>
        <a href="https://github.com/Sophie508/AIRGuard" target="_blank" rel="noopener noreferrer">Code</a>
    </div>
</article>

<article class="publication">
    <span class="publication-badge">KDD</span>
    <h3 class="publication-title">
        <a href="https://dblp.org/rec/conf/kdd/ZhuQLJZX26" target="_blank" rel="noopener noreferrer">
            MemeBridge: A Dataset for Benchmarking and Mitigating the Bidirectional Cultural Gap in Meme Interpretation
        </a>
    </h3>
    <p class="publication-authors">
        Hangxiao Zhu, <strong>Suliu Qin</strong>, Zhuoyan Li, Ming Jiang, Yu Zhang, Meng Xia
    </p>
    <p class="publication-periodical"><em>KDD, 2026, pp. 2947-2958.</em></p>
    <div class="publication-actions">
        <a href="https://dblp.org/rec/conf/kdd/ZhuQLJZX26" target="_blank" rel="noopener noreferrer">DBLP</a>
        <span>DOI: 10.1145/3770854.3785691</span>
    </div>
</article>
```

- [ ] **Step 3: Verify content, ordering, and link attributes**

Run:

```bash
python3 - <<'PY'
from pathlib import Path

html = Path("index.html").read_text()
titles = ["SinoGlyphBench", "Grounded Checklist Partial Credit", "AIRGuard", "MemeBridge"]
positions = [html.index(title) for title in titles]
assert positions == sorted(positions), positions
assert html.count('<article class="publication">') == 4
assert '<span class="publication-badge">EMNLP Findings</span>' in html
assert '<em>Findings of EMNLP, 2026.</em>' in html
assert 'Zimu Wang, <strong>Suliu Qin</strong>, Changyu Zeng' in html
assert html.count('https://github.com/fengshun124/SinoGlyphBench') == 2
assert '<strong>Suliu Qin</strong>, Lu Yin, Xilu Wang' in html
assert '<em>arXiv preprint arXiv:2608.27487, 2026.</em>' in html
assert html.count('https://arxiv.org/abs/2608.27487') == 2
assert html.count('https://arxiv.org/pdf/2608.27487') == 1
assert html.count('target="_blank" rel="noopener noreferrer"') >= 11
print("publication structure: PASS")
PY
```

Expected: `publication structure: PASS`.

- [ ] **Step 4: Verify the homepage through a local server**

Run `python3 -m http.server 4173`, then request `http://127.0.0.1:4173/` and the preserved routes `/blog/`, `/blog/scaling-laws-carefully.html`, and `/cpc-annotation/`.

Expected: each route returns HTTP 200. Inspect the homepage at desktop and mobile widths and confirm all four entries remain readable without horizontal overflow.

- [ ] **Step 5: Review the exact implementation diff**

Run:

```bash
git diff --check
git diff -- index.html
git status --short
```

Expected: no whitespace errors; only `index.html` is newly modified by implementation; the pre-existing `.DS_Store` change remains untouched. Present this diff and the verification evidence to Sophie. Stop before commit.

- [ ] **Step 6: Commit only after Sophie approves the implementation diff**

After explicit approval, stage only `index.html` and commit with Sophie's configured identity and no co-author trailer:

```bash
git add -- index.html
git diff --cached --check
git commit -m "Update homepage publications"
```

Expected: the commit contains only `index.html`. Do not push; pushing requires a separate explicit request.
