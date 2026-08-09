# Academic Homepage Redesign

## Goal

Restyle the public academic homepage to closely match the visual system of
Zhuoyan Li's Minimal Light-based homepage while preserving Suliu Qin's own
content, links, and existing standalone pages.

## Scope

The public homepage will contain only two content sections:

1. About Me
2. Publications

The existing Research section, top navigation, Recent News, and homepage Blog
entry will not appear. The existing `/blog/` route and its article pages will
remain available to anyone who knows their URLs, but the homepage will not link
to them. This is an unlisted arrangement, not access control or privacy.

## Page Structure

The desktop homepage will use a two-column layout derived from the reference
page:

- A 200 px profile column with the portrait, name, current role and
  affiliation, email, Google Scholar, and GitHub links.
- A flexible main column containing About Me and Publications.
- A 30 px gap between the two columns.
- A maximum desktop width of 1200 px, centered in the viewport.

The reference page's 280 px right sidebar will be omitted because there is no
current Experience, Services, or Recent News content to display. The main
column will use the available space rather than leaving a visibly empty third
column.

## Visual System

The homepage will reproduce the reference page's key visual parameters:

- Warm off-white page background: `#FFFCF8`.
- Body and publication text: Plus Jakarta Sans with system fallbacks.
- Headings: Space Grotesk with body-font fallbacks.
- Primary text: `#1a1a1a`.
- Links: `#0066cc`, with `#0052a3` on hover.
- Circular profile portrait.
- Compact headings, generous publication spacing, and black venue badges with
  white text.
- Publication titles use dark semibold text and turn blue on hover.

Google Fonts will be loaded from their public stylesheet endpoint, matching
the reference page. System fallbacks will keep the page readable if the font
request fails.

## Content Treatment

The current About text and two publication records will be retained unless a
later content-editing request changes them. Each publication will display:

- A short venue badge.
- The paper title and its existing primary link.
- The author list, with Suliu Qin emphasized.
- Venue or preprint metadata.
- Existing external links such as DBLP, DOI, arXiv, PDF, and Code when
  available.

No text, images, analytics identifiers, contact details, or publication data
from the reference author's site will be copied.

## Responsive Behavior

On narrower screens, the two columns will collapse into one. The profile block
will appear above About Me and Publications, sticky positioning will be
disabled, and horizontal padding will protect text from touching the viewport
edge. Publication metadata and links must wrap without horizontal scrolling.

## Files and Boundaries

Expected implementation changes are limited to:

- `index.html`
- `css/style.css`

The following are explicitly out of scope:

- `blog/` and its article files
- `cpc-annotation/`
- Existing unrelated local changes and commits
- Deployment, commit, and push without separate user approval

Unused homepage assets will not be deleted as part of this redesign.

## Verification

Before presenting the implementation diff, verify:

1. The homepage contains no visible navigation, Research, Recent News, or Blog
   link.
2. `/blog/` and the existing blog article URL still load from the local site.
3. All homepage links and image paths resolve.
4. The desktop layout matches the intended two-column proportions.
5. The mobile layout is readable without horizontal overflow.
6. No files outside the stated implementation scope were changed.

## Source and License Basis

The visual direction is based on the public reference page and the Minimal
Light theme. Minimal Light is released under CC0 1.0. The implementation will
use the open theme as its basis and reproduce measured visual parameters rather
than copying the reference author's personal content.
