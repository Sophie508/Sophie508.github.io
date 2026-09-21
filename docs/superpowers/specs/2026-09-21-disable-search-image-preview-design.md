# Disable Search Image Preview

## Goal

Keep the profile photo visible on the website while asking Google not to show it as a thumbnail in web search results.

## Design

- Add `<meta name="robots" content="max-image-preview:none">` to the homepage `<head>`.
- Remove the `image` property from the homepage `Person` structured data so the page does not explicitly supply the profile photo for search presentation.
- Keep the visible profile image and all page content unchanged.

## Verification

- Confirm the robots meta directive appears exactly once in `index.html`.
- Confirm the structured data no longer contains the profile image property.
- Confirm the visible `<img src="images/prof_pic.jpg">` remains present.
- Validate the JSON-LD syntax and check the diff for whitespace errors.

Google controls the final search-result presentation, so the thumbnail may remain until the page is recrawled.
