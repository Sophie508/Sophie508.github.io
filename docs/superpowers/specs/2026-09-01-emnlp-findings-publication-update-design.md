# EMNLP Findings Publication Update Design

## Goal

Update the homepage publication list to highlight the newly accepted EMNLP Findings paper, add the author's new first-author GCPC preprint, and place the author's first paper, MemeBridge, at the bottom.

## Publication Order

The homepage will use newest-work-first ordering:

1. SinoGlyphBench (EMNLP Findings)
2. Grounded Checklist Partial Credit for Agent Skill Trajectories (arXiv)
3. AIRGuard (arXiv)
4. MemeBridge (KDD)

## SinoGlyphBench Entry

- Badge: `EMNLP Findings`
- Title: `SinoGlyphBench: A Diagnostic Benchmark for Chinese Glyph-Level Obfuscation in Language-Model Moderation`
- Authors: Yifan Wang, Zimu Wang, **Suliu Qin**, Changyu Zeng, Tong Chen, Siqi Chen, Yijie Lin, Lingyu Jiang, Jionglong Su, Yushan Pan, Haiyang Zhang, Wei Wang, Qiaoyu Tan
- Venue line: `Findings of EMNLP, 2026.`
- Title link: `https://github.com/fengshun124/SinoGlyphBench`
- Action link: a `Code` button pointing to the same repository

## GCPC Entry

- Badge: `arXiv`
- Title: `Grounded Checklist Partial Credit for Agent Skill Trajectories`
- Authors: **Suliu Qin**, Lu Yin, Xilu Wang
- Venue line: `arXiv preprint arXiv:2608.27487, 2026.`
- Title link: `https://arxiv.org/abs/2608.27487`
- Action links: an `arXiv` button pointing to the abstract page and a `PDF` button pointing to `https://arxiv.org/pdf/2608.27487`
- No `Code` button because the official arXiv page does not list a code repository

## Scope

Only the publication markup in `index.html` will change. Existing typography, publication styling, About Me content, Blog routes, and CPC pages will remain unchanged.

## Verification

- Confirm the rendered publication order is SinoGlyphBench, GCPC, AIRGuard, MemeBridge.
- Confirm Suliu Qin is emphasized in both new author lists.
- Confirm the SinoGlyphBench repository links and GCPC arXiv links are valid in the generated HTML.
- Run the existing site locally and confirm the homepage loads without layout regressions at desktop and mobile widths.
