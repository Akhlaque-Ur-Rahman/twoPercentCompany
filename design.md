# Design System

**Product:** 2% Company  
**Token source:** `app/globals.css`  
**Scale:** Golden ratio **φ ≈ 1.618** on Material **8px** base → `8 · 13 · 21 · 34 · 55 · 89`  
**Related:** [prd.md](./prd.md) · [architecture.md](./architecture.md) · [phases.md](./phases.md) · [UI_UX_IMPROVEMENT_PLAN.md](./UI_UX_IMPROVEMENT_PLAN.md)

---

## 1. Brand

| Attribute | Value |
|-----------|--------|
| Name | **2% Company** |
| Positioning | Premium, trustworthy Patna real-estate partner |
| Visual mode | Dark UI, gold/bronze accent |
| Voice | Clear, professional, aspirational — short sentences |
| Logo | `/images/2PercentCompany.png`, `/svg/logo.svg` |
| UI font | **Urbanist** (`--font-urbanist`) |
| Display accent | **EB Garamond** italic (`--font-display`) — hero accent only |

**Never use** leftover template brand names in UI copy.

---

## 2. Color tokens

| Token | Hex / value | Tailwind | Use |
|-------|-------------|----------|-----|
| `--color-main-bg` | `#000000` | `bg-main-bg` | Page background |
| `--color-2nd-bg` | `#111111` | `bg-2nd-bg` | Cards, header, surfaces |
| `--color-primary` | `#8f7330` | `bg-primary` / `text-primary` | Brand accent, CTAs, titles |
| `--color-primary-hover` | `#b39553` | `bg-primary-hover` | Hover accent |
| `--color-on-primary` | `#000000` | `text-on-primary` | Text on gold fills |
| `--color-secondary-text` | `#9e9e9e` | `text-secondary-text` | Supporting copy |
| `--color-header-stroke` | `#222222` | `border-header-stroke` | Borders / outlines |
| `--color-arrow-icon` | `#cccccc` | `text-arrow-icon` | Decorative arrows |
| `--color-overlay` | `rgb(0 0 0 / 0.5)` | `bg-overlay` | Drawers, modals |
| `--color-star` | `#8f7330` | `text-star` / `fill-star` | Ratings |
| `--color-body` | `#ffffff` | `text-body` | Primary readable text |
| `--color-error` | `#c45c5c` | `text-error` / `border-error` | Form errors |
| `--color-success` | `#1f9d6a` | `text-success` | Success states |
| `--color-map-property` | `#8f7330` | `bg-map-property` / `text-map-property` | Map property pins |
| `--color-map-plot` | `#1f9d6a` | `bg-map-plot` / `text-map-plot` | Map plot pins |

**Ambient glow helpers:** `.glow-primary-bottom` · `.glow-primary-top` · `.glow-primary-tr` — use instead of raw `rgba(143,115,48,…)`.

### Rules

1. **No raw brand hex in components** — use tokens.
2. **Do not** use Tailwind `yellow-500` / `yellow-600` / `#c9a227` for brand.
3. Overlays may use `bg-black/50` etc.; brand surfaces prefer `main-bg` / `2nd-bg`.
4. Map property gold **must** match `--color-primary` (`#8f7330`).

---

## 3. Typography

| Role | Family |
|------|--------|
| `.type-*`, body, buttons, forms | Urbanist |
| `.type-hero-accent` only | EB Garamond italic |

### Modular scale (φ from 16px body)

| Class | Size (min→max) | Weight | Use |
|-------|----------------|--------|-----|
| `.type-caption` | 13→15 | 400 | Meta, chips, footer links |
| `.type-body` | 14→16 | 400 | Body copy, buttons |
| `.type-label` | 14 | 500 | Form labels, eyebrows |
| `.type-card-title` | 16→26 | 600 | Card / block titles |
| `.type-subhead` | 21→34 | 600 | Subsection titles |
| `.type-section` | 26→42 | 600 | Section H2 |
| `.type-display` | 34→55 | 600 | Page H1 |
| `.type-hero` | 55→89 | 600 | Home hero H1 |
| `.type-price` | 21→34 | 700 | Listing prices |
| `.type-stat` | 34→55 | 600 | Big counters |

### Measure

| Class | Max width | Use |
|-------|-----------|-----|
| `.prose-measure` | 42rem | Long supporting copy |
| `.prose-measure-wide` | 48rem | Hero / about intros |

### Rules

1. Prefer shared `SectionHeader` (uses `.type-section` + `.type-body`).
2. Do **not** use `text-sm` / `text-xl` / `text-[14px]` / `text-[clamp…]` for typography.
3. Icon sizing (`size-4`, `w-5 h-5`) is separate from type roles.

---

## 4. Spacing & layout (φ scale)

| Token / class | Value | Usage |
|---------------|--------|--------|
| `--spacing-phi-1` | 8px / `0.5rem` | Tight inset |
| `--spacing-phi-2` | 13px / `0.8125rem` | Compact gap |
| `--spacing-phi-3` | 21px / `1.3125rem` | Default gap / page gutter (mobile) |
| `--spacing-phi-4` | 34px / `2.125rem` | Section / page gutter (lg) |
| `--spacing-phi-5` | 55px / `3.4375rem` | Large section / hero (sm) |
| `--spacing-phi-6` | 89px / `5.5625rem` | XL section / hero (lg) |
| `.page-px` | φ3 → φ4 @lg | All page horizontal gutters |
| `.section-y-sm` | φ3 | Compact bands |
| `.section-y` | φ4 → φ5 @lg | Standard sections |
| `.section-y-lg` | φ5 → φ6 @lg | CTA / inquiry bands |
| `.page-hero-y` | φ4 → φ5 @sm → φ6 @lg | Marketing page heroes |
| `.gap-stack` | φ3 → φ4 @lg | Vertical section stacks |
| `.gap-stack-lg` | φ4 → φ5 @lg | Larger stacks |
| Card internal | `p-4` → `lg:p-6` | Listing cards |
| Preferred gaps | `gap-phi-*` or `gap-3`/`gap-5`/`gap-8` (≈13/21/34) | Grids |

**Do not** use one-off `pt-10 sm:pt-14 lg:pt-20` for heroes — use `.page-hero-y`.  
**Do not** use `px-6 lg:px-[40px]` for page gutters — use `.page-px`.

**Breakpoint policy**

| Breakpoint | Width | Role |
|------------|-------|------|
| default | &lt;640px | Mobile first; drawer nav; 1-col |
| `sm` | ≥640px | 2-col refinements |
| `md` | ≥768px | Mid layouts |
| `lg` | ≥1024px | Section grids, featured desktop |
| `xl` | ≥1280px | **Desktop Navbar** |

**Rules**
- Touch targets ≥ **44×44px** (`min-w-11 min-h-11`).
- Prefer `aspect-*` over fixed mobile heights for hero/media.

---

## 5. Radius (φ from 8px)

| Element | Token | Class |
|---------|-------|--------|
| Controls | 13px | `rounded-control` |
| Media | 21px | `rounded-media` |
| Cards | 34px | `rounded-card` |
| Chips / avatars | full | `rounded-full` |

Do **not** mix `rounded-lg` / `xl` / arbitrary `rounded-[20px]` on the same control family.

---

## 6. Components — visual contracts

### 6.1 Buttons

| Variant | Background | Text | Hover | Radius |
|---------|------------|------|-------|--------|
| **Primary** | `bg-primary` | `text-on-primary` | `hover:brightness-110` | control |
| **Secondary** | `bg-2nd-bg` + `border-header-stroke` | `text-primary` | `hover:bg-main-bg` | control |
| **Ghost** | transparent | `text-primary` | subtle | — |

**Forbidden:** `bg-primary text-white`, `hover:bg-yellow-600`, nested `<Link><button>`.

### 6.2 Inputs

- Surface: `bg-main-bg` + `border border-header-stroke` (1px — match SearchField / FilterSelect)
- Focus: `focus-visible:ring-2 ring-primary`
- Error: `border-error` + `text-error`
- Always pair with a visible `<label>`

### 6.3 Cards

- Container: `bg-2nd-bg border border-header-stroke rounded-card`
- Hover (optional): `hover:border-primary/40`
- Image: `rounded-media object-cover`

### 6.4 Section header

Shared `SectionHeader`: optional icon → H2 (`.type-section`) → supporting `.type-body` → optional CTA.

### 6.5 Navbar / Footer

- Header: `bg-2nd-bg`, outline `header-stroke`
- Active nav: `bg-primary text-on-primary`
- Footer: `bg-2nd-bg`, links hover to `text-primary`

---

## 7. Motion

| Use | Guidance |
|-----|----------|
| Drawer | Navbar mobile — ~300ms |
| Card hover | Subtle; gated by `prefers-reduced-motion` |
| Hero | GSAP / Swiper; paused when reduced motion |
| Sections | Framer Motion OK with `usePrefersReducedMotion` |

Ship **2–3 intentional** motions, not noise.

---

## 8. Iconography & media

- UI icons: **lucide-react**
- Social: **react-icons**
- Map pins: `utils/MapIcons.ts` — property = primary gold, plot = success green
- Images: Next `Image`, meaningful `alt`

---

## 9. Accessibility

1. Contrast: dark text on primary fills; secondary text for muted only.
2. Keyboard: nav, filters, lightbox, gallery.
3. Semantics: buttons for actions; links for navigation; labels for fields.
4. Focus visible on all interactive elements.

---

## 10. Do / Don’t

| Do | Don’t |
|----|-------|
| Use theme tokens + φ utilities | Hardcode `#8f7330`, `#c9a227`, `#111` |
| `.page-px` / `.section-y*` / `.page-hero-y` | Random `pt-10 lg:pt-20` / `px-[40px]` |
| `.type-*` roles | `text-sm` / `text-[14px]` for copy |
| Primary CTA = gold + black text | White text on gold |
| `border-error` / `text-error` | `red-500` / `red-400` |
| “2% Company” | Template brand leftovers |

---

## 11. Implementation checklist

- [x] Phase 0–5 (see UI_UX_IMPROVEMENT_PLAN)
- [x] Golden-ratio spacing + type scale in `@theme`
- [x] Unified map gold with primary
- [x] Error / success / map color tokens
- [x] Marketing heroes → `.page-hero-y`
- [x] Brand glow helpers

When tokens change, **update this file’s tables first**, then code.
