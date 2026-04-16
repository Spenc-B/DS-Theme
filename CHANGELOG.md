# Changelog

All notable changes to the Developer Starter theme are documented here.

## [1.3.0] — 2026-04-16

### Added
- **4 new Gutenberg blocks** completing the v1.3.0 set
  - **DS Team Member** — Card with circular photo, name, role, and bio (centre/left alignment)
  - **DS Icon Box** — Icon character + heading + description card with centre/left alignment and size control
  - **DS Divider** — Decorative section divider with solid/dashed/dotted/double styles, colour, thickness, and optional centre label
  - **DS Logo Grid** — Client/partner logo grid; gallery MediaUpload, column count (2–8), and greyscale toggle
- Dark mode support for all four new blocks
- Frontend CSS for all four new blocks in `style.css`

### Changed
- **DS Timeline** — Full editor UI with InnerBlocks template, accent colour picker, and CSS custom property passthrough
- **DS Tab Item** — Improved editor label preview; `data-label` and `role="tabpanel"` on saved output
- **DS Accordion** — Cleaner sidebar labels, constrained InnerBlocks to `ds-accordion-item`, fixed save function
- **DS Section** — Sidebar HTML tag selector (`section`, `div`, `article`, `aside`, `main`); `render.php` updated to emit the correct tag

### Files Added
- `blocks/ds-team-member/block.json`
- `blocks/ds-icon-box/block.json`
- `blocks/ds-divider/block.json` + `render.php`
- `blocks/ds-logo-grid/block.json`
- `assets/js/blocks/ds-team-member.js` + `.asset.php`
- `assets/js/blocks/ds-icon-box.js` + `.asset.php`
- `assets/js/blocks/ds-divider.js` + `.asset.php`
- `assets/js/blocks/ds-logo-grid.js` + `.asset.php`

### Files Changed
- `assets/js/blocks/ds-timeline.js` — Full rewrite with InnerBlocks template and CSS var
- `assets/js/blocks/ds-tab-item.js` — Improved editor preview and save output
- `assets/js/blocks/ds-accordion.js` — Constrained InnerBlocks + fixed save
- `assets/js/blocks/ds-section.js` + `blocks/ds-section/render.php` — Tag selector added
- `style.css` — Frontend styles for four new blocks + dark mode

## [1.2.0] — 2026-04-16

### Added
- **Bootstrap blocks** — Container, Row, and Column blocks with sidebar controls for Bootstrap classes
  - Container: type selection (container, container-fluid, responsive variants), padding, background colour
  - Row: gutter control, horizontal/vertical alignment, row-cols
  - Column: responsive span, offset, order, self-alignment
- **ACF Meta block** — Displays any ACF field or post meta value
  - Link type selector: href (default), mailto, tel, or plain text
  - Link target: same window or new tab
  - Custom display text override
  - Prefix / suffix text
  - HTML tag selector (p, span, div, h1–h6)
  - Server-side rendered with live preview in editor
- **CHANGELOG.md** — This file

### Changed
- **README.md** — Full rewrite documenting all current features, admin settings, blocks, and file structure

## [1.1.0] — 2026-04-15

### Added
- **Admin Settings Dashboard** — Native WordPress Settings API page with four tabs (no ACF dependency)
  - Bootstrap tab: CSS/JS toggles, CDN variant selector, version field
  - Performance tab: head cleanup (emoji, wp-embed, RSD, WLW, shortlink, feeds), asset removal (dashicons, jQuery Migrate, block CSS, global styles)
  - Features tab: SVG uploads, dark mode, breadcrumbs, maintenance mode
  - Custom Code tab: header scripts, footer scripts, custom CSS
- **Bootstrap 5.3.3 integration** via jsDelivr CDN with conditional enqueuing
- **Granular component toggles** — 30 Bootstrap components with select all/none/per-group controls
- **Bootstrap Debugger** — Admin bar slide-out panel that scans DOM for Bootstrap class usage, highlights elements, shows enabled/disabled/unused component stats
- **Frontend settings engine** (`inc/frontend-settings.php`) — Applies performance, security, and custom code settings
- `ds_setting()` global helper for accessing theme settings

### Changed
- Existing features (SVG upload, dark mode, head cleanup) now controlled via admin settings instead of being always-on
- `functions.php` refactored to wire admin-controlled feature toggles

### Files Added
- `inc/admin-settings.php`
- `inc/bootstrap-loader.php`
- `inc/bootstrap-debugger.php`
- `inc/frontend-settings.php`
- `assets/css/admin-settings.css`
- `assets/js/admin-settings.js`
- `assets/js/bootstrap-debugger.js`

## [1.0.1] — 2026-04-15

### Changed
- **Lumina design system** applied across all theme files
  - Colour palette: Coral (#E17055), Yellow (#FDCB6E), Warm White (#FAF9F6)
  - Typography: heading font-weight 300, letter-spacing -0.02em
  - Components: 18px border-radius, 1px subtle borders, generous spacing
  - Dark mode variables and overrides
- **Block patterns rewritten** — All patterns converted to native Gutenberg blocks (no `wp:html` blocks)
  - Hero: accent text as `wp:paragraph`, hexagon motif via CSS `::before`/`::after` pseudo-elements
  - Features: cards as `wp:group` > `wp:paragraph` (icon) + `wp:heading` + `wp:paragraph`
  - Header: brand icon as `wp:paragraph` instead of Custom HTML
- `style.css` — Full Lumina rewrite with CSS custom properties, responsive breakpoints, dark mode
- `theme.json` — v3 with Lumina palette, fluid typography, 300-weight headings, pill buttons
- All pattern files updated for Lumina identity

### Files Changed
- `style.css`, `theme.json`, `functions.php`
- `patterns/hero.php`, `patterns/features.php`, `patterns/header-default.php`
- `patterns/cta.php`, `patterns/latest-posts.php`, `patterns/footer-default.php`

## [1.0.0] — 2026-04-14

### Added
- Initial theme build — clean, lightweight Gutenberg parent theme
- **Full Site Editing** — theme.json v3, block templates, template parts, block patterns
- **ACF Pro integration** — options pages (General + Performance), CSS variable generation, login logo
- **Templates** — index, page, single, archive, search, 404, blank
- **Template Parts** — header, footer
- **Patterns** — header-default, footer-default, hero, features, cta, latest-posts
- **Pattern category** — `developer-starter`
- **Breadcrumbs shortcode** — `[ds_breadcrumbs]` with Yoast / NavXT / fallback support
- **Dark mode** — localStorage toggle with `is-dark-theme` body class
- **SVG upload** support
- **Skip link** for accessibility
- `assets/js/theme.js` — sticky header scroll class, dark mode toggle, smooth scroll
- `inc/acf-theme-options.php` — ACF options pages and CSS variable file generation
