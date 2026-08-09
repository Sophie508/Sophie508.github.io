# Profile Education Tree Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dense affiliation paragraph with a compact two-node education tree and replace the GitHub profile control with Suliu Qin's LinkedIn profile.

**Architecture:** Keep the existing static homepage and profile layout. Replace one HTML fragment inside the profile column and its dedicated CSS rules; all About Me, Publications, Blog, CPC, responsive-layout, and shared-site code remains unchanged.

**Tech Stack:** HTML5, CSS3, Python standard-library HTTP server, curl, Playwright CLI

## Global Constraints

- Work only in `/Users/sophie/Sophie508.github.io`.
- Modify only `index.html` and `css/style.css` during implementation.
- Keep portrait, name, role, email, Google Scholar, About Me, Publications, Blog routes, and CPC content unchanged.
- The tree order is Current SUTD above Undergraduate University of Liverpool and Xi'an Jiaotong-Liverpool University.
- Both undergraduate institutions belong to one node.
- The component must permit a future PhD node to be inserted above the current node.
- Replace GitHub with `https://www.linkedin.com/in/suliu-qin-6bb8bb390/` and accessible label `LinkedIn`.
- Preserve the warm background, typography, 200 px desktop profile column, and narrow-screen single-column layout.
- Do not stage the existing `.DS_Store` modification.
- Show the complete implementation diff to Sophie and obtain approval before committing.
- Any approved commit must contain only Sophie's authorship and no `Co-Authored-By` line.
- Never push without Sophie's explicit instruction.

---

### Task 1: Build and Verify the Profile Education Tree

**Files:**
- Modify: `index.html:16-28`
- Modify: `css/style.css:685-731`
- Verify unchanged: `blog/index.html`
- Verify unchanged: `blog/scaling-laws-carefully.html`

**Interfaces:**
- Consumes: Existing `.profile-column`, `.profile-role`, `.profile-email`, and `.profile-links` layout.
- Produces: `.education-tree`, `.education-node`, `.education-marker`, `.education-stage`, `.education-institution`, `.education-detail`, and `.linkedin-profile-link` elements styled only within the homepage profile.

- [ ] **Step 1: Record the old profile elements that must disappear**

Run:

```bash
rg -n 'class="affiliation"|Working with Dr\. Rui Cao|github-profile-link|https://github.com/Sophie508' index.html
```

Expected: Three matching lines proving that the old affiliation paragraph and GitHub control exist before the change. The GitHub class and URL share one line.

- [ ] **Step 2: Replace the affiliation and profile-link fragment in `index.html`**

Replace the current affiliation paragraph and `.profile-links` block with this complete markup:

```html
            <div class="education-tree" aria-label="Education history">
                <div class="education-node education-node-current">
                    <span class="education-marker" aria-hidden="true"></span>
                    <p class="education-stage">Current</p>
                    <p class="education-institution">Singapore University of Technology and Design</p>
                    <p class="education-detail">SUTD</p>
                </div>
                <div class="education-node education-node-undergraduate">
                    <span class="education-marker" aria-hidden="true"></span>
                    <p class="education-stage">Undergraduate</p>
                    <p class="education-institution">University of Liverpool</p>
                    <p class="education-detail">Xi'an Jiaotong-Liverpool University</p>
                </div>
            </div>
            <a class="profile-email" href="mailto:sophie508727@gmail.com">sophie508727@gmail.com</a>
            <div class="profile-links" aria-label="Academic and professional profiles">
                <a href="https://scholar.google.com/citations?user=5POo6JMAAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
                    <img src="images/google_scholar.png" alt="">
                </a>
                <a class="linkedin-profile-link" href="https://www.linkedin.com/in/suliu-qin-6bb8bb390/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
            </div>
```

- [ ] **Step 3: Replace the old affiliation and GitHub-specific CSS**

Delete `.home-page .affiliation` and `.github-profile-link`. Insert the following complete CSS between `.profile-role` and `.profile-email`. The block already includes the LinkedIn rule; do not add a second copy:

```css
.education-tree {
    position: relative;
    width: 100%;
    max-width: 250px;
    margin: 20px auto 18px;
    padding-left: 32px;
    text-align: left;
}

.education-tree::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 11px;
    bottom: 38px;
    width: 2px;
    background: #c8c8c8;
}

.education-node {
    position: relative;
}

.education-node + .education-node {
    margin-top: 28px;
}

.education-marker {
    position: absolute;
    left: -30px;
    top: 5px;
    width: 14px;
    height: 14px;
    box-sizing: border-box;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #FFFCF8;
}

.education-node-current .education-marker {
    background: #1a1a1a;
}

.education-node-undergraduate .education-marker {
    border: 2px solid #1a1a1a;
    background: #FFFCF8;
}

.home-page .education-stage,
.home-page .education-institution,
.home-page .education-detail {
    margin: 0;
}

.home-page .education-stage {
    margin-bottom: 4px;
    color: #737373;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
}

.home-page .education-institution {
    color: #1a1a1a;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
}

.home-page .education-detail {
    margin-top: 4px;
    color: #666666;
    font-size: 12px;
    line-height: 1.4;
}

.profile-links .linkedin-profile-link {
    color: #0a66c2;
    font-size: 0.78rem;
    font-weight: 700;
}
```

- [ ] **Step 4: Verify content, link safety, and removal of old elements**

Run:

```bash
test "$(rg -c 'class="education-node ' index.html)" -eq 2
rg -n 'Current|Singapore University of Technology and Design|SUTD|Undergraduate|University of Liverpool|Xi.an Jiaotong-Liverpool University' index.html
rg -n 'https://www.linkedin.com/in/suliu-qin-6bb8bb390/.*aria-label="LinkedIn"' index.html
if rg -n 'class="affiliation"|Working with Dr\. Rui Cao|github-profile-link|https://github.com/Sophie508' index.html css/style.css; then exit 1; fi
git diff --check -- index.html css/style.css
```

Expected: Exactly two node matches, all institution labels and the safe LinkedIn control are present, the old affiliation and GitHub checks produce no output, and the diff has no whitespace errors.

- [ ] **Step 5: Run the site and verify public routes**

Start from the repository root:

```bash
python3 -m http.server 8769 --bind 127.0.0.1
```

In a second shell, run:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8769/
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8769/blog/
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8769/blog/scaling-laws-carefully.html
```

Expected:

```text
200
200
200
```

- [ ] **Step 6: Capture and inspect desktop and mobile screenshots**

Run:

```bash
playwright screenshot --channel chrome --viewport-size "1440,1000" --full-page http://127.0.0.1:8769/ /tmp/suliu-education-tree-desktop.png
playwright screenshot --channel chrome --viewport-size "390,844" --full-page http://127.0.0.1:8769/ /tmp/suliu-education-tree-mobile.png
```

Expected: Desktop shows a compact tree inside the 200 px profile column; mobile shows the same tree centered beneath the role. In both views, the connector and markers align, school names do not overflow, Scholar and LinkedIn remain visible, and About Me and Publications are unchanged.

- [ ] **Step 7: Confirm repository scope and present the implementation diff**

Run:

```bash
git diff --quiet -- blog/index.html blog/scaling-laws-carefully.html
git diff --check
git diff --name-only -- index.html css/style.css
git status --short
git diff -- index.html css/style.css
```

Expected: The implementation diff contains exactly `css/style.css` and `index.html`. The existing `.DS_Store` modification remains unstaged and untouched.

Stop here. Do not stage, commit, or push until Sophie explicitly approves the implementation diff.

- [ ] **Step 8: Commit only after explicit diff approval**

After approval, run:

```bash
git add index.html css/style.css
git diff --cached --check
git diff --cached --name-only
git commit -m "Add profile education tree"
```

Expected: The staged list contains only `css/style.css` and `index.html`. The commit has only Sophie's configured author identity and no AI attribution.

Do not push until Sophie explicitly instructs `push`.
