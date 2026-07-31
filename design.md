# Design System

**Product:** 2% Company  
**Token source:** `app/globals.css`  
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
| Font | **Urbanist** (Google via `next/font`) |

**Never use** leftover template brand names in UI copy.

---

## 2. Color tokens

### Current (shipped)

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
| `--radius-control` | `12px` | `rounded-control` | Buttons, inputs, nav |
| `--radius-media` | `16px` | `rounded-media` | Images, section shells |
| `--radius-card` | `24px` | `rounded-card` | Cards |
| `--spacing-page` | `1.5rem` | via `.page-px` | Mobile page padding |
| `--spacing-page-lg` | `2.5rem` | via `.page-px` @lg | Desktop page padding |

**Helpers vs `@theme`:** Spacing and radius values live in `@theme`. Layout/type helpers (`.page-px`, `.section-y*`, `.prose-measure*`, `.type-display` … `.type-stat`) are **custom CSS classes** in `globals.css` below `@theme` — not Tailwind theme keys. Prefer these utilities over one-off clamps.

### Still to add (later)

| Token | Suggested | Use |
|-------|-----------|-----|
| `--color-error` | TBD | Form errors |
| `--color-success` | TBD | Success states |

### Rules

1. **No raw brand hex in components** — use tokens.
2. **Do not** use Tailwind `yellow-500` / `yellow-600` for brand hover.
3. Overlays may use `bg-black/50` etc.; brand surfaces prefer `main-bg` / `2nd-bg`.
4. About page and similar must not re-hardcode `#111111` / `#9e9e9e`.

---

## 3. Typography

**Family:** Urbanist via `--font-urbanist`.

| Role | Family |
|------|--------|
| All `.type-*`, body, buttons, forms | Urbanist (`--font-urbanist`) |

### Role classes (required — no arbitrary `text-[…]`)

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `.type-display` | clamp 24→48 | 600 | Page H1 / hero title |
| `.type-section` | clamp 20→40 | 600 | Section H2 |
| `.type-subhead` | clamp 20→32 | 600 | Subsection titles |
| `.type-card-title` | clamp 18→24 | 600 | Card / block titles |
| `.type-body` | clamp 14→16 | 400 | Body copy, buttons |
| `.type-caption` | clamp 13→15 | 400 | Meta, chips, footer links |
| `.type-label` | 14px | 500 | Form labels, footer headings |
| `.type-price` | clamp 20→28 | 700 | Listing prices |
| `.type-stat` | clamp 28→36 | 600 | Big counters |

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

## 4. Spacing & layout

| Class / token | Value | Usage |
|---------------|--------|--------|
| `.page-px` | 1.5rem → 2.5rem @lg | All page horizontal gutters |
| `.section-y-sm` | 1.5rem vertical | Compact sections / listing bands |
| `.section-y` | 2.5rem → 4rem @lg | Standard page sections |
| `.section-y-lg` | 2.5rem → 3.75rem @lg | Hero / CTA bands |
| Card internal | `p-4` → `lg:p-6` | Listing cards |
| Gaps | `gap-4` / `gap-6` / `gap-8` | Prefer 4-based scale |

**Do not** use `px-6 lg:px-[40px]` / `lg:px-10` for page gutters — use `.page-px`.

**Breakpoint policy (Phase 3 — locked)**

| Breakpoint | Width | Role |
|------------|-------|------|
| default | &lt;640px | Mobile first; drawer nav; 1-col carousels/galleries |
| `sm` | ≥640px | 2-col HomeCTA / light refinements |
| `md` | ≥768px | Mid layouts (testimonials 2-up, map taller) |
| `lg` | ≥1024px | Section grids, featured desktop layout |
| `xl` | ≥1280px | **Desktop Navbar** (hamburger/drawer below `xl`) |

**Rules**
- Do not move nav to `lg` without UX review — drawer stays until `xl`.
- Touch targets ≥ **44×44px** (`min-w-11 min-h-11`) for arrows, dots, icon buttons.
- Prefer `aspect-*` / `min-h-*` over fixed mobile heights for hero/media.
- Gallery: `slidesPerView: 1` on xs; contain overflow on small screens.

---

## 5. Radius

| Element | Class |
|---------|--------|
| Cards | `rounded-card` (24px) |
| Media (images, gallery, shells) | `rounded-media` (16px) |
| Controls (buttons, inputs, nav pills) | `rounded-control` (12px) |
| Chips / tags / dots / avatars | `rounded-full` |
| Mobile drawer top | `rounded-t-2xl` (exception) |

Do **not** mix `rounded-lg` / `xl` / `2xl` / arbitrary `rounded-[20px]` on the same control family.

---

## 6. Components — visual contracts

### 6.1 Buttons

| Variant | Background | Text | Hover | Radius |
|---------|------------|------|-------|--------|
| **Primary** | `bg-primary` | `text-black` / `text-main-bg` | `hover:brightness-110` | 12–16px |
| **Secondary** | `bg-2nd-bg` + `border-header-stroke` | `text-primary` | `hover:bg-main-bg` | 12px |
| **Ghost** | transparent | `text-primary` | subtle brightness / underline | — |

**Forbidden:** `bg-primary text-white` (contrast fail on `#8f7330`), `hover:bg-yellow-600`, nested `<Link><button>`.

### 6.2 Inputs

- Surface: `bg-main-bg` or `bg-2nd-bg` + `border-header-stroke`
- Focus: `focus-visible:ring-2 ring-primary` (not outline-none alone)
- Placeholder: `placeholder:text-secondary-text` (not gold)
- Always pair with a visible `<label>`

### 6.3 Cards

- Container: `bg-2nd-bg border-2 border-header-stroke rounded-[24px]`
- Hover (optional): `hover:border-primary/40`
- Image: `rounded-[16px] object-cover` + sensible `sizes`

### 6.4 Section header

Pattern used on Featured / Testimonials / CTA:

1. Optional Stars icon  
2. H2 (section scale) + short supporting line (`text-secondary-text`)  
3. Optional secondary “View all” button  

Extract as `SectionHeader` in Phase 1.

### 6.5 Navbar / Footer

- Header: `bg-2nd-bg`, outline `header-stroke`
- Active nav: `bg-primary text-main-bg`
- Footer: `bg-2nd-bg`, links hover to `text-primary`
- Touch targets ≥ 44×44 on mobile controls

---

## 7. Motion

| Use | Guidance |
|-----|----------|
| Drawer open/close | Navbar mobile drawer — transform translate, ~300ms |
| Card hover | ListingCard subtle scale; gated by `prefers-reduced-motion` |
| Hero carousel | Swiper autoplay; **paused** when reduced motion |
| Page sections | Framer Motion OK; use `usePrefersReducedMotion` for enter animations |
| Global CSS | `@media (prefers-reduced-motion: reduce)` short-circuits CSS transitions |

Ship **2–3 intentional** motions (hero, card hover, drawer), not noise.

Shared helpers: `hooks/usePrefersReducedMotion.ts`, empty/error shell `components/ui/PageState.tsx`, toasts `components/ui/AppToast.tsx`.

---

## 8. Iconography & media

- UI icons: **lucide-react**
- Social: **react-icons** (footer)
- Map pins: custom DivIcons in `utils/MapIcons.ts` (property gold, plot green)
- Lottie: contact success / 404 — keep file sizes reasonable
- Images: Next `Image`, AVIF/WebP via config; always meaningful `alt`

---

## 9. Accessibility

1. Contrast: dark text on primary fills; secondary text for muted only.
2. Keyboard: nav dropdowns, filters, floor-plan lightbox, gallery controls.
3. Semantics: buttons for actions; links for navigation; labels for fields.
4. Focus visible on all interactive elements.
5. Decorative images: empty alt or marked decorative; content images descriptive.

---

## 10. Do / Don’t

| Do | Don’t |
|----|-------|
| Use theme tokens | Hardcode `#8f7330`, `#111`, `#9e9e9e` in JSX |
| Primary CTA = gold + black text | White text on gold |
| `px-6 lg:px-[40px]` page shell | Random `lg:px-24` / `px-[16px]` per page |
| One card component | Copy-paste card markup 4× |
| “2% Company” | Template brand leftovers |
| Placeholder = muted | Placeholder = primary gold |

---

## 11. Implementation checklist (design debt)

Tracked in detail in [UI_UX_IMPROVEMENT_PLAN.md](./UI_UX_IMPROVEMENT_PLAN.md). Summary:

- [x] Phase 0 brand/nav blockers  
- [x] Expand `@theme` tokens  
- [x] Button / Input / SectionHeader primitives  
- [x] Shared `(site)` layout shell  
- [x] CTA hover/text contract  
- [x] Shared listing card + detail layout  
- [x] Typography + radius pass on remaining pages  
- [x] Mobile gallery / arrow overflow / nav a11y (Phase 3)  
- [x] Form a11y + focus rings site-wide (Phase 4)  
- [x] Motion / empty states / toast theme (Phase 5)  

When tokens change, **update this file’s tables first**, then code.
