# EMNLP Findings Publication Update Design

## Goal

Update the homepage publication list to highlight the newly accepted EMNLP Findings paper and place the author's first paper, MemeBridge, at the bottom.

## Publication Order

The homepage will use newest-work-first ordering:

1. SinoGlyphBench (EMNLP Findings)
2. AIRGuard (arXiv)
3. MemeBridge (KDD)

## SinoGlyphBench Entry

- Badge: `EMNLP Findings`
- Title: `SinoGlyphBench: A Diagnostic Benchmark for Chinese Glyph-Level Obfuscation in Language-Model Moderation`
- Authors: Yifan Wang, Zimu Wang, **Suliu Qin**, Changyu Zeng, Tong Chen, Siqi Chen, Yijie Lin, Lingyu Jiang, Jionglong Su, Yushan Pan, Haiyang Zhang, Wei Wang, Qiaoyu Tan
- Venue line: `Findings of EMNLP, 2026.`
- Title link: `https://github.com/fengshun124/SinoGlyphBench`
- Action link: a `Code` button pointing to the same repository

## Scope

Only the publication markup in `index.html` will change. Existing typography, publication styling, About Me content, Blog routes, and CPC pages will remain unchanged.

## Verification

- Confirm the rendered publication order is SinoGlyphBench, AIRGuard, MemeBridge.
- Confirm Suliu Qin is emphasized in the new author list.
- Confirm the repository links are valid in the generated HTML.
- Run the existing site locally and confirm the homepage loads without layout regressions at desktop and mobile widths.
