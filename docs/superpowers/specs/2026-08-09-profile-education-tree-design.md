# Profile Education Tree

## Goal

Reduce the visual density of the homepage profile column while preserving both
the current SUTD affiliation and the undergraduate relationship between the
University of Liverpool and Xi'an Jiaotong-Liverpool University.

## Profile Structure

The profile column will keep the existing portrait, name, role, email, and
profile links. The current multi-line affiliation paragraph will be replaced by
a compact vertical education tree with two nodes:

1. **Current**
   - Singapore University of Technology and Design
   - SUTD
2. **Undergraduate**
   - University of Liverpool
   - Xi'an Jiaotong-Liverpool University

The Current node appears above the Undergraduate node. A thin vertical line
and two distinct node markers communicate that these entries belong to one
educational trajectory rather than two unrelated lists.

The structure must support adding a future PhD node above the Current node
without redesigning the component.

## Profile Links

Google Scholar remains unchanged. The GitHub profile link will be removed and
replaced by a LinkedIn link:

`https://www.linkedin.com/in/suliu-qin-6bb8bb390/`

The LinkedIn control will use a compact `in` mark and an accessible label of
`LinkedIn`, matching the visual weight of the Scholar control.

## Visual Treatment

- Retain the existing warm background, typography, portrait, name, and role.
- Keep the tree visually compact enough for the 200 px desktop profile column.
- Use small uppercase labels for `Current` and `Undergraduate`.
- Use a filled marker for the current node and an outlined marker for the
  undergraduate node.
- Keep institution names readable without making them compete with the name or
  role.
- Preserve the existing single-column responsive layout on narrow screens.

## Files and Boundaries

Expected implementation changes are limited to:

- `index.html`
- `css/style.css`

The About Me and Publications content, Blog files and routes,
`cpc-annotation/`, image assets, and existing unrelated `.DS_Store` change are
out of scope.

## Verification

Before presenting the implementation diff:

1. Confirm the old affiliation paragraph and GitHub link are absent from the
   homepage.
2. Confirm both education nodes and all four institution labels render.
3. Confirm the LinkedIn URL and accessible label are correct.
4. Confirm Scholar, email, Blog routes, and publication links remain unchanged.
5. Capture desktop and mobile screenshots and check that the tree line and
   markers align without overflow.
6. Confirm only `index.html` and `css/style.css` are part of the implementation
   diff.

No implementation commit or push may occur before Sophie reviews and approves
the corresponding diff.
