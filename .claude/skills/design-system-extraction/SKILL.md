---
name: design-system-extraction
description: Use this skill when building a new marketing/catalog landing page for a different brand and you want to reuse the layout, hierarchy, and interaction patterns proven on the Flower Miel site — WITHOUT reusing its colors, fonts, or content. Load it before writing HTML/CSS for a new landing page when the user references "the same structure as Flower Miel" or wants a similarly-shaped small business site (hero + catalog grid + info sections + conversion CTA + footer).
---

# Design system extraction: layout & hierarchy (brand-agnostic)

This skill captures the **structural and interaction patterns** of a small-business landing page (proven on a honey/beekeeping e-commerce catalog), deliberately stripped of any brand-specific decision — no hex codes, no font names, no copy. Swap those per project; keep the skeleton below.

If you also need color guidance, load the `dataviz` skill's palette methodology separately — this skill only covers layout, spacing, and component shape.

## 1. Page skeleton (the section order that works)

1. **Sticky header** — logo left, nav links center/right, one visually distinct CTA button at the end of the nav (different treatment than the nav links — filled pill, brand-accent color)
2. **Hero** — full-bleed background image/photo, dark gradient overlay for text legibility, left-aligned or centered content block: eyebrow tag → big headline (with one emphasized word/phrase in accent color) → subtitle → two CTAs (primary filled + secondary on a high-contrast conversion color, e.g. messaging-app green)
3. **Mobile-only quick nav** — a horizontal scrolling pill bar duplicating the main nav's anchor links, shown only under a breakpoint, sticky just below the header. Skip this section entirely on desktop.
4. **Primary content section** (e.g. catalog/product grid) — centered heading block, then functional controls (search + filter chips), then a responsive grid
5. **Secondary info sections** (repeat pattern, alternating background tint) — each follows: centered heading block → two-column layout (text+list on one side, image gallery or supporting visual on the other) → single CTA
6. **About/trust section** — centered, narrower max-width than other sections, ends in a row of small pill "badges" (icon + short claim)
7. **Footer** — dark, high-contrast-with-body background; multi-column grid (brand block wider than link columns); bottom bar with copyright, full-width and centered
8. **Floating persistent CTA** — fixed-position circular button, bottom corner, for the site's single most important conversion action. Gets a subtle pulse/attention animation since it's always visible.

Don't reorder this — the hierarchy (attention-grabbing hero → functional core offering → supporting trust content → contact) is what makes the page convert. Swap section *topics* per client, not the *order/shape*.

## 2. Spacing & rhythm

- One `.container` utility: max-width ~1200px, centered, fixed horizontal padding. Every section's content lives inside it — never let text touch the viewport edge.
- Sections breathe vertically: generous `padding-block` (60–90px range) separates every major section. The first section under the header gets extra top padding to compensate for the sticky header's height.
- Heading blocks before grids/content are **centered**, capped at a narrow max-width (~600–650px) even inside a wide section — this stops intro copy from stretching edge-to-edge and staying readable.
- Two-column info sections stack to one column below the tablet breakpoint, in source order (text first, then visual) — never let the visual column jump above the text on mobile.

## 3. Shape language

Pick **one radius philosophy** and apply it everywhere, don't mix:
- Interactive/actionable elements (buttons, chips, search input, nav CTA, price badges) → **fully rounded pills** (`border-radius: 999px`)
- Content containers (cards, modals, photo tiles, alert boxes) → **large soft corners** (a "lg" token, roughly 20–24px), with a smaller token (~10–16px) for nested/smaller elements inside them (thumbnails, inline images)
- Avoid sharp corners anywhere except the header/footer edges

This single decision (round everything, two tiers of roundness) is what makes a site feel like "one system" rather than "assembled from parts."

## 4. Elevation & depth

- Three shadow tokens, not one: subtle (resting state), medium (default card elevation), large (hover/active/modal state)
- Cards lift on hover: small translateY + shadow escalates from medium→large. This is the single most-repeated micro-interaction across every clickable tile (product cards, gallery items, badges).
- Modals/overlays: dark semi-transparent backdrop + the modal box itself scales in from ~0.9 → 1 with an opacity fade. Never just appear instantly.
- Sticky header gets a shadow **only after scroll starts** (toggle a class on scroll), not permanently — keeps the hero photo unobstructed at the top.

## 5. Typography hierarchy

- Two-font system: one for headings/UI labels (higher weight, 600–800), one for body copy (lighter, 400–600). Don't use more than two families.
- Headings scale fluidly with `clamp()` rather than fixed breakpoint jumps — e.g. section H2 roughly `clamp(1.8rem, 3.5vw, 2.4rem)`, hero H1 larger. This avoids a fixed set of media-query font sizes.
- A small recurring "eyebrow" pattern: uppercase, letter-spaced, bold, small (~0.85rem), in the accent color, sitting directly above a heading or as a standalone pill above the hero headline. Use it to label a section's category before the reader hits the big text.
- Muted/secondary text (descriptions, captions) gets its own consistent lower-contrast color token — never reuse the primary text color at a lower opacity ad hoc.

## 6. Component patterns worth copying as-is

**Card (product/service tile):**
image (fixed aspect-ratio, `object-fit: cover`, zooms slightly on hover) → body with consistent padding → title → muted description (flex-grow so footer aligns across a row) → footer row (price/tag left, action button right). One optional small badge pinned top-left over the image (e.g. "new", "best-seller").

**Filter/search bar:** search input (pill, icon inside on the left) above or beside a row of filter chips (pill buttons, one holds an `.active` filled state, rest are outlined). Centered as a group above the grid.

**Icon-bullet list** (used for feature lists / "what's included"): each row = small circular icon badge (emoji or simple icon, soft shadow, neutral surface background) + text block (bold mini-heading + muted description). Vertical stack with consistent gap, not a grid.

**Modal (any purpose — image zoom, purchase flow, cart):** same skeleton every time — centered box (or bottom-sheet on mobile for cart-like ones), close button top-right as a small circle, content padded consistently, backdrop click or explicit close dismisses. Reuse one modal shell for all of them; don't invent a new structure per modal.

**Floating action button(s):** circular, fixed position, one primary bottom-right (main conversion channel), optionally a secondary bottom-left (e.g. cart) with a small numeric badge overlapping its top-right edge.

## 7. Responsive breakpoints (pattern, not exact pixels)

Three tiers is enough:
- Mobile (default/base styles)
- Tablet (~640–860px): grids go from 1 → 2 columns, two-column sections may still stack
- Desktop (~980–1280px): grids reach final column count (3–4 for product grids), two-column sections go side-by-side, mobile-only nav elements (hamburger, quick-nav pill bar) disappear entirely

Grid column counts should step up gradually across these tiers (1 → 2 → 3 → 4), not jump straight to the final count.

## 8. What to change per brand (do NOT carry these over)

- Every color value (this skill is intentionally silent on color — derive a fresh palette per brand, e.g. via the `dataviz` skill's palette process)
- Font family choices (keep the two-font *pattern*, pick new fonts)
- The radius/shadow *values* can shift (sharper corners, flatter shadows) if the new brand's identity calls for a different tone — what must stay is picking one philosophy and applying it consistently
- Section topics, copy, iconography (emoji vs. custom icon set is a brand call)
- The specific conversion channel (WhatsApp float button is this brand's context — another brand might float a phone/email/booking CTA instead)
