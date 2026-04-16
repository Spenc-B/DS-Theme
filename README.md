# Developer Starter — Lumina

**Author:** Spencer Blackler

A clean, lightweight Gutenberg parent theme with Bootstrap integration, ACF Pro support, and a full admin settings dashboard. Built for developers who want a minimal, fast foundation for block-based WordPress sites.

## Features

### Core
- **Full Site Editing** — Block templates, template parts, and patterns (theme.json v3)
- **Lumina Design System** — Warm White (#FAF9F6), Coral (#E17055), Yellow (#FDCB6E), 300-weight headings, 18px radius, subtle 1px borders
- **ACF Pro Ready** — Theme options pages, CSS variable generation, login logo
- **Lightweight** — No jQuery, no bloat, system font stack
- **Dark Mode** — Built-in toggle with localStorage persistence
- **Accessible** — Skip link, semantic HTML, ARIA labels, WCAG 2.1 AA colours

### Bootstrap Integration
- **Bootstrap 5.3.3** via jsDelivr CDN (CSS + JS)
- **Variant Selection** — Full, Grid-only, Reboot, or Utilities CSS; Bundle or Core JS
- **30 Component Toggles** — Enable/disable individual Bootstrap components
- **Admin Bar Debugger** — Scans the DOM to detect which Bootstrap classes are in use on the current page
- **Custom Blocks** — Container, Row, Column, Testimonial, Pricing Card, Counter, Alert, Accordion, and Team Member blocks
- **6 Visual Blocks** — Testimonial, Pricing Card, Counter, Alert, Accordion, Team Member — fully editable in the block editor

### Admin Settings Dashboard
Native WordPress Settings API page (no ACF required) with four tabs:

| Tab | Options |
|-----|---------|
| **Bootstrap** | CSS/JS toggles, CDN variant, version, component grid (select all/none/per-group), debugger toggle |
| **Performance** | Head cleanup (emoji, wp-embed, RSD, WLW, shortlink, feeds), asset removal (dashicons, jQuery Migrate, block CSS, global styles, classic styles) |
| **Features** | SVG uploads, dark mode, breadcrumbs shortcode, maintenance mode |
| **Custom Code** | Header scripts, footer scripts, custom CSS |

### Security
- XML-RPC toggle
- Public REST API access toggle

## Structure

```
developer-starter/
├── assets/
│   ├── css/
│   │   └── admin-settings.css      # Admin page styling
│   └── js/
│       ├── theme.js                 # Sticky header, dark mode, smooth scroll
│       ├── admin-settings.js        # Admin tab logic, component toggles
│       └── bootstrap-debugger.js    # DOM scanner + slide-out panel
├── blocks/
│   ├── acf-meta/
│   │   ├── block.json               # ACF Meta block registration
│   │   └── render.php               # Server-side render
│   ├── ds-testimonial/block.json    # Testimonial card
│   ├── ds-pricing/block.json        # Pricing tier card
│   ├── ds-counter/block.json        # Stat / counter
│   ├── ds-alert/block.json          # Alert / notice box
│   ├── ds-accordion/block.json      # Accordion / FAQ item
│   ├── ds-team-member/block.json    # Team member card
│   └── bootstrap/
│       ├── bs-container/
│       │   ├── block.json           # Container block registration
│       │   └── render.php
│       ├── bs-row/
│       │   ├── block.json           # Row block registration
│       │   └── render.php
│       └── bs-column/
│           ├── block.json           # Column block registration
│           └── render.php
├── inc/
│   ├── acf-theme-options.php        # ACF options pages + CSS var generation
│   ├── admin-settings.php           # Settings API dashboard (4 tabs)
│   ├── bootstrap-loader.php         # CDN enqueue logic
│   ├── bootstrap-debugger.php       # Admin bar debugger panel
│   └── frontend-settings.php        # Head/asset cleanup, custom code, maintenance
├── parts/
│   ├── header.html
│   └── footer.html
├── patterns/
│   ├── header-default.php           # Sticky header with brand icon + nav + CTA
│   ├── footer-default.php           # Centred footer with copyright
│   ├── hero.php                     # Two-column hero with hexagon motif
│   ├── features.php                 # Three-column feature cards
│   ├── cta.php                      # Full-width call to action
│   └── latest-posts.php             # 3-column post grid via Query Loop
├── templates/
│   ├── index.html
│   ├── page.html
│   ├── single.html
│   ├── archive.html
│   ├── search.html
│   ├── 404.html
│   └── blank.html
├── functions.php
├── style.css
├── theme.json
├── CHANGELOG.md
└── README.md
```

## Requirements

- WordPress 6.4+
- PHP 8.0+
- ACF Pro (recommended, not required)

## Block Patterns

All patterns use native Gutenberg blocks — fully editable in the Site Editor.

| Pattern | Description |
|---------|-------------|
| **Header Default** | Sticky header with brand icon (◆), site title, navigation, coral CTA button |
| **Footer Default** | Centred footer with dynamic copyright year |
| **Hero Section** | Two-column layout — heading + accent text + description / hexagon motif (CSS pseudo-elements) |
| **Features Grid** | Three-column card grid with icons, headings, descriptions |
| **Call to Action** | Full-width coral background with heading, text, buttons |
| **Latest Posts** | 3-column Query Loop grid with featured images and excerpts |

## Custom Blocks

### Bootstrap Container
Wrapper block with sidebar controls for:
- Container type: `container`, `container-fluid`, `container-sm` through `container-xxl`
- Background colour (theme palette)
- Padding (Bootstrap spacing scale)
- Additional CSS class

### Bootstrap Row
Row block (inner blocks only) with sidebar controls for:
- Gutter: `g-0` through `g-5`, plus `gx-*` and `gy-*`
- Horizontal alignment: `justify-content-*`
- Vertical alignment: `align-items-*`
- Row columns: `row-cols-1` through `row-cols-6` (responsive)

### Bootstrap Column
Column block with sidebar controls for:
- Column span per breakpoint: `col`, `col-1` through `col-12`, `col-auto`
- Offset per breakpoint
- Order per breakpoint
- Self-alignment: `align-self-*`

### DS Testimonial
Quote card with inline-editable quote, author name, role, and avatar (MediaUpload). Star rating (0–5) via sidebar control. Lumina-styled with coral left border and yellow stars.

### DS Pricing Card
Tier card with editable title, price, and period. Feature list via InnerBlocks (core/list). CTA button with editable text and URL. "Featured" toggle adds coral highlight + "Popular" badge.

### DS Counter
Large stat number with optional prefix/suffix (sidebar) and editable label. Coral accent colour.

### DS Alert
Styled notice box with 5 types: info (blue), success (green), warning (yellow), danger (red), brand (coral). InnerBlocks for content. Optional dismissible button.

### DS Accordion Item
Expandable FAQ section rendered as native `<details>`/`<summary>` HTML. RichText title, InnerBlocks body. "Open by default" toggle.

### DS Team Member
Centered card with circular photo (MediaUpload), editable name, role, and bio. Lumina border + surface background.

### DS Icon Box
Icon + heading + description card. Icon is an emoji/text field editable in sidebar. Supports centre and left alignment. Hover lift effect.

### DS Progress Bar
Labelled progress/skill bar with adjustable percentage (0–100) via a sidebar range control. Show/hide percentage text. Custom bar colour picker with Lumina presets.

### DS Divider
Decorative section divider with line style control (solid, dashed, dotted, double), adjustable width, optional centre icon or text label, and custom colour.

### DS Card
Generic content card with optional header image (MediaUpload), editable title, InnerBlocks body for any content, and a CTA button with editable text and URL. Hover lift effect.

### DS Tabs
Tabbed content container. Manage tab labels dynamically in the sidebar (add/remove/rename). Each tab panel uses InnerBlocks for full content flexibility. Coral active-tab indicator.

### DS Logo Grid
Client/partner logo showcase. Uses gallery MediaUpload to add multiple logos at once. Adjustable column count (2–6). Optional grayscale toggle — logos are grey by default and gain colour on hover.

### ACF Meta
Dynamic block that reads ACF fields or post meta and renders the value:
- Field key: text input or pick from available post meta
- Link type: `href` (standard link), `mailto` (email), `tel` (phone), or `none` (plain text)
- Link target: same window or new tab (with `rel="noopener noreferrer"`)
- Custom display text: override what the user sees (the field value is still used for the link)
- Prefix / suffix: prepend or append text around the value
- HTML tag: `p`, `span`, `div`, `h1`–`h6`
- Full colour, typography, and spacing support via block sidebar

## ACF Theme Options

When ACF Pro is active, a **Theme Settings** menu appears:

- **General** — Brand colour, accent colour, content width, container width, border radius, login logo
- **Performance** — Disable block CSS / global styles on homepage

CSS variables are written to `assets/css/acf-theme-vars.css` on save and enqueued automatically.

## Shortcodes

| Shortcode | Description |
|-----------|-------------|
| `[ds_breadcrumbs]` | Renders breadcrumbs — supports Yoast, Breadcrumb NavXT, or built-in fallback |

## Child Theme

```css
/*
Theme Name: My Child Theme
Template: developer-starter
Version: 1.0.0
*/
```

## Credits

Inspired by [wp-bbtheme](https://github.com/raivis-kalnins/wp-bbtheme) by Raivis Kalnins.

## License

GPL-2.0-or-later

GPL v2 or later.
