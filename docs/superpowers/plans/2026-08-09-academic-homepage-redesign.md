# Academic Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public homepage with a two-column Minimal Light-inspired academic layout that shows only About Me and Publications while leaving `/blog/` available but unlisted.

**Architecture:** Keep the existing dependency-free static site and replace only the homepage markup. Add homepage-scoped CSS under a `home-page` body class so the shared stylesheet can reproduce the reference design without changing the appearance or behavior of existing Blog and CPC pages.

**Tech Stack:** HTML5, CSS3, Google Fonts, Python standard-library HTTP server, curl, Playwright CLI

## Global Constraints

- Work only in `/Users/sophie/Sophie508.github.io`.
- Modify only `index.html` and `css/style.css` during implementation.
- Do not modify or delete `blog/`, `cpc-annotation/`, image assets, or unrelated working-tree changes.
- Keep `/blog/` and its existing article URLs reachable, but place no Blog link on the homepage.
- The homepage must contain only About Me and Publications as content sections.
- Use `#FFFCF8`, Plus Jakarta Sans body text, Space Grotesk headings, a circular portrait, and black venue badges.
- Do not copy the reference author's personal content, analytics identifiers, images, or contact data.
- Show the complete implementation diff to Sophie and obtain approval before committing.
- Any approved commit must contain only Sophie's authorship and no `Co-Authored-By` line.
- Never push without Sophie's separate explicit approval.

---

### Task 1: Replace the Public Homepage Structure

**Files:**
- Modify: `index.html:1-172`
- Preserve: `blog/index.html`
- Preserve: `blog/scaling-laws-carefully.html`

**Interfaces:**
- Consumes: Existing image paths and external profile/publication URLs from `index.html`.
- Produces: A `<body class="home-page">` containing `.home-shell`, `.profile-column`, `.main-content`, and `.publications` for the scoped CSS in Task 2.

- [ ] **Step 1: Record the current homepage-only elements that must disappear**

Run:

```bash
rg -n 'class="site-header"|id="research"|id="blog"|Recent News|href="blog/' index.html
```

Expected: Matches for the current navigation, Research section, Recent News, and Blog section. This establishes that the later absence check is meaningful.

- [ ] **Step 2: Replace `index.html` with the approved homepage markup**

Use this complete document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Suliu Qin's academic homepage and publications.">
    <title>Suliu Qin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="home-page">
    <main id="top" class="home-shell">
        <aside class="profile-column" aria-label="Profile and contact information">
            <img src="images/prof_pic.png" alt="Portrait of Suliu Qin" class="profile-photo">
            <h1>Suliu Qin</h1>
            <p class="profile-role">Research Assistant</p>
            <p class="affiliation">
                Singapore University of Technology and Design (SUTD)<br>
                Working with Dr. Rui Cao<br>
                Department of Computing, Xi'an Jiaotong-Liverpool University<br>
                University of Liverpool
            </p>
            <a class="profile-email" href="mailto:sophie508727@gmail.com">sophie508727@gmail.com</a>
            <div class="profile-links" aria-label="Academic and professional profiles">
                <a href="https://scholar.google.com/citations?user=5POo6JMAAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
                    <img src="images/google_scholar.png" alt="">
                </a>
                <a class="github-profile-link" href="https://github.com/Sophie508" target="_blank" rel="noopener noreferrer" aria-label="GitHub">Gh</a>
            </div>
        </aside>

        <section class="main-content" aria-label="Academic profile">
            <section id="about" class="home-section">
                <h2>About Me</h2>
                <p>
                    My name is Suliu Qin. Currently a research assistant working with
                    Dr. Rui Cao. My research interests center on trustworthy AI systems,
                    LLM agents, and multimodal understanding.
                </p>
                <p>
                    My recent work studies both how AI systems interpret culturally
                    grounded content and how tool-using agents can be guarded when their
                    actions create external side effects.
                </p>
            </section>

            <section id="publications" class="home-section">
                <h2>Publications</h2>
                <div class="publications">
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
                </div>
            </section>
        </section>
    </main>
</body>
</html>
```

- [ ] **Step 3: Verify the homepage content boundary**

Run:

```bash
test "$(rg -c 'class="home-section"' index.html)" -eq 2
rg -n '<h2>About Me</h2>|<h2>Publications</h2>' index.html
if rg -n 'class="site-header"|id="research"|id="blog"|Recent News|href="blog/' index.html; then exit 1; fi
```

Expected: Exactly two `.home-section` matches, headings for About Me and Publications, and no output from the forbidden homepage-element check.

- [ ] **Step 4: Pause for a focused markup diff review**

Run:

```bash
git diff --check -- index.html
git diff -- index.html
```

Expected: No whitespace errors. The diff changes only the homepage structure and retains the existing personal text, URLs, and publication records.

Do not commit. Continue only after confirming the diff matches the approved design.

---

### Task 2: Add the Reference Visual System Without Restyling Blog Pages

**Files:**
- Modify: `css/style.css:1`
- Modify: `css/style.css` after the existing final media query

**Interfaces:**
- Consumes: The `home-page`, `home-shell`, profile, home section, and publication class names created in Task 1.
- Produces: Homepage-only desktop and responsive styling; all existing non-homepage selectors remain intact for `/blog/` and CPC content.

- [ ] **Step 1: Confirm the target visual tokens are not yet implemented**

Run:

```bash
if rg -n 'home-shell|publication-badge|Plus Jakarta Sans|Space Grotesk|#FFFCF8' css/style.css; then exit 1; fi
```

Expected: No output and exit status 0.

- [ ] **Step 2: Add the font import at the beginning of `css/style.css`**

Insert this as the first line, before all other CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap");
```

- [ ] **Step 3: Append the complete homepage-scoped visual system**

Append this block after the existing CSS. Do not delete or rewrite Blog styles.

```css

/* Academic homepage: Minimal Light-inspired two-column layout. */
.home-page {
    margin: 0;
    padding: 0;
    background: #FFFCF8;
    color: #1a1a1a;
    font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.65;
}

.home-page a {
    color: #0066cc;
    text-decoration: none;
}

.home-page a:hover {
    color: #0052a3;
    text-decoration: none;
}

.home-shell {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 30px;
}

.home-page .profile-column {
    width: 200px;
    flex-shrink: 0;
    position: sticky;
    top: 20px;
    align-self: flex-start;
    height: fit-content;
    padding-top: 2em;
    text-align: center;
}

.home-page .profile-photo {
    display: block;
    width: 117px;
    height: 117px;
    margin: 0 auto 20px;
    border: 0;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 32%;
}

.home-page .profile-column h1,
.home-page .home-section h2,
.home-page .publication-title {
    font-family: "Space Grotesk", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1a1a1a;
}

.home-page .profile-column h1 {
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.1;
}

.profile-role {
    margin: 0 0 4px;
    font-size: 1.1rem;
    color: #1a1a1a;
}

.home-page .affiliation {
    margin: 0 0 14px;
    color: #1a1a1a;
    font-size: 14px;
    line-height: 1.55;
}

.profile-email {
    display: inline-block;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 12px;
    overflow-wrap: anywhere;
}

.profile-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
}

.profile-links a {
    display: inline-grid;
    width: 2.4rem;
    height: 2.4rem;
    place-items: center;
    border-radius: 50%;
    color: #1a1a1a;
    transition: color 0.2s ease, transform 0.2s ease;
}

.profile-links a:hover {
    color: #0066cc;
    transform: scale(1.15);
}

.profile-links img {
    width: 1.3rem;
    height: 1.3rem;
    object-fit: contain;
}

.github-profile-link {
    font-size: 0.72rem;
    font-weight: 700;
}

.home-page .main-content {
    flex: 1;
    min-width: 0;
    padding: 2em 0 50px;
}

.home-section {
    margin: 0 0 34px;
}

.home-page .home-section h2 {
    margin: 2px 0 15px;
    padding: 0;
    border: 0;
    font-size: 157%;
    font-weight: 500;
    line-height: 1.1;
}

.home-page .home-section p {
    margin: 0 0 20px;
    color: #1a1a1a;
}

.home-page strong {
    color: #1a1a1a;
    font-weight: 600;
}

.home-page .publication {
    margin: 0 0 30px;
    padding: 0;
    border: 0;
}

.publication-badge {
    display: inline-block;
    margin-bottom: 8px;
    padding: 4px 12px;
    border-radius: 4px;
    background: #1a1a1a;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.home-page .publication-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
}

.home-page .publication-title a {
    color: #1a1a1a;
}

.home-page .publication-title a:hover {
    color: #0066cc;
}

.home-page .publication-authors {
    margin-bottom: 6px;
    font-size: 14px;
}

.home-page .publication-periodical {
    margin-bottom: 8px;
    font-size: 14px;
}

.publication-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-size: 12px;
}

.publication-actions a {
    display: inline-block;
    padding: 2px 7px;
    border: 1px solid #1a1a1a;
    border-radius: 3px;
    color: #1a1a1a;
    line-height: 1.4;
}

.publication-actions a:hover {
    border-color: #0066cc;
    color: #0066cc;
}

@media print, screen and (max-width: 1200px) {
    .home-page {
        padding: 15px;
    }

    .home-shell {
        width: auto;
        margin: 0;
        padding: 0;
        flex-direction: column;
    }

    .home-page .profile-column {
        width: 100%;
        position: static;
        padding-top: 1em;
        margin-bottom: 2em;
    }

    .home-page .main-content {
        width: 100%;
        padding-top: 0;
    }
}

@media print, screen and (max-width: 480px) {
    .home-page {
        padding: 15px;
        font-size: 15px;
    }

    .home-page .profile-photo {
        width: 95px;
        height: 95px;
    }

    .home-page .profile-column h1 {
        font-size: 25px;
    }

    .home-page .home-section h2 {
        font-size: 22px;
    }
}
```

- [ ] **Step 4: Verify that every new layout rule is homepage-scoped**

Run:

```bash
rg -n 'Plus Jakarta Sans|Space Grotesk|#FFFCF8|\.home-shell|\.publication-badge' css/style.css
git diff --check -- css/style.css
git diff -- css/style.css
```

Expected: One Google Fonts import, the approved color and layout selectors, no whitespace errors, and no deletion of existing Blog rules.

- [ ] **Step 5: Pause for a focused CSS diff review**

Confirm from the diff that all selectors capable of changing shared elements are prefixed with `.home-page`, except new class names used only by `index.html` (`.home-shell`, `.profile-role`, `.profile-email`, `.profile-links`, `.github-profile-link`, `.home-section`, `.publication-badge`, and `.publication-actions`).

Do not commit.

---

### Task 3: Verify Routes, Responsive Rendering, and Change Scope

**Files:**
- Verify: `index.html`
- Verify: `css/style.css`
- Verify unchanged: `blog/index.html`
- Verify unchanged: `blog/scaling-laws-carefully.html`
- Create temporary screenshots only in `/tmp`

**Interfaces:**
- Consumes: The complete homepage markup and scoped styles from Tasks 1 and 2.
- Produces: Route checks, desktop and mobile screenshots, and a final review diff. No repository files are created by this task.

- [ ] **Step 1: Start the site locally**

Run from the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Expected: `Serving HTTP on 127.0.0.1 port 8765`. Keep this process running in its execution session for the remaining checks.

- [ ] **Step 2: Verify the homepage and hidden Blog routes**

Run in a second shell:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/blog/
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/blog/scaling-laws-carefully.html
```

Expected:

```text
200
200
200
```

- [ ] **Step 3: Verify local homepage assets and the absence of a Blog link**

Run:

```bash
curl -sS http://127.0.0.1:8765/ | rg 'css/style.css|images/prof_pic.png|images/google_scholar.png'
if curl -sS http://127.0.0.1:8765/ | rg 'href="blog/|id="blog"|id="research"'; then exit 1; fi
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/css/style.css
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/images/prof_pic.png
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8765/images/google_scholar.png
```

Expected: The three asset references appear in homepage HTML, the forbidden-link check produces no output, and each asset request returns `200`.

- [ ] **Step 4: Capture desktop and mobile renderings**

Run:

```bash
playwright screenshot --channel chrome --viewport-size "1440,1000" --full-page http://127.0.0.1:8765/ /tmp/suliu-homepage-desktop.png
playwright screenshot --channel chrome --device "iPhone 13" --full-page http://127.0.0.1:8765/ /tmp/suliu-homepage-mobile.png
```

Expected: Both commands report successful screenshot creation. Inspect both images and confirm:

- Desktop: circular portrait in a 200 px left column; About Me and Publications in the right column; warm off-white background; black venue badges.
- Mobile: profile above content; no clipped text or horizontal overflow; publication links wrap.
- Both: no visible navigation, Research, Recent News, or Blog entry.

- [ ] **Step 5: Confirm Blog files and unrelated work remain unchanged**

Run:

```bash
git diff --name-only
git status --short
git diff --check
```

Expected: The implementation diff names only `index.html` and `css/style.css`. The pre-existing `.DS_Store` modification may still appear in status but must not appear in the implementation diff or be staged. The already committed design and plan documents are not implementation changes.

- [ ] **Step 6: Present the final implementation diff for Sophie’s approval**

Run:

```bash
git diff -- index.html css/style.css
```

Expected: A complete, reviewable diff limited to the approved homepage markup and homepage-scoped style additions.

Stop here. Do not stage, commit, or push until Sophie explicitly approves this implementation diff.

- [ ] **Step 7: Commit only after explicit approval**

After approval, run:

```bash
git add index.html css/style.css
git diff --cached --check
git diff --cached --name-only
git commit -m "Redesign academic homepage"
```

Expected: The staged file list contains exactly `css/style.css` and `index.html`. The commit has only Sophie's configured author identity and contains no AI attribution or `Co-Authored-By` trailer.

Do not push. Ask Sophie separately before any future `git push`.
