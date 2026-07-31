# 2% Company — UI/UX Improvement Plan

> **Purpose:** Single source of truth for fixing UI/UX, consistency, token, and mobile-first issues one by one.  
> **Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · Swiper · Leaflet  
> **Theme source:** `app/globals.css` (`@theme`)  
> **Audit date:** 31 Jul 2026  
> **Status legend:** `[ ]` todo · `[~]` in progress · `[x]` done  
> **Program docs:** [prd.md](./prd.md) · [architecture.md](./architecture.md) · [design.md](./design.md) · [phases.md](./phases.md) · [memory.md](./memory.md)

---

## How to use this document

1. Work **top-down by phase** (P0 → P5). Do not skip P0/P1 for cosmetics.
2. Each item has: **severity**, **files**, **problem**, **fix**, **acceptance criteria**.
3. After finishing an item, mark it `[x]` and note the PR/commit if useful.
4. Prefer shared components + design tokens over one-off class strings.
5. When unsure of visual intent, match existing dark + gold brand (`#8f7330` on black/`#111`).

---

## Current design token inventory

Defined in `app/globals.css`:

| Token | Value | Tailwind usage |
|-------|--------|----------------|
| `--color-main-bg` | `#000000` | `bg-main-bg` |
| `--color-2nd-bg` | `#111111` | `bg-2nd-bg` |
| `--color-secondary-text` | `#9e9e9e` | `text-secondary-text` |
| `--color-primary` | `#8f7330` | `bg-primary` / `text-primary` |
| `--color-primary-hover` | `#b39553` | `bg-primary-hover` |
| `--color-on-primary` | `#000000` | `text-on-primary` |
| `--color-arrow-icon` | `#cccccc` | `text-arrow-icon` |
| `--color-header-stroke` | `#222222` | `border-header-stroke` |
| `--color-overlay` | `rgb(0 0 0 / 0.5)` | `bg-overlay` |
| `--color-star` | `#8f7330` | `text-star` / `fill-star` |
| `--color-body` | `#ffffff` | `text-body` |
| `--radius-control` | `12px` | `rounded-control` |
| `--radius-media` | `16px` | `rounded-media` |
| `--radius-card` | `24px` | `rounded-card` |
| `--font-urbanist` | Urbanist | via `next/font` |
| page padding | `1.5rem` / `2.5rem` | `.page-px` |

**Remaining gaps:**

- error / success color tokens
- Full typography utility map still ad-hoc (`clamp` / breakpoint sizes)
- ListingCard / ListingRowCard not yet extracted (Phase 2)

---

## Severity rubric

| Level | Meaning |
|-------|---------|
| **Critical** | Broken UX, stub pages, invalid CSS, brand-wrong copy, major a11y blockers |
| **High** | Inconsistency that users notice; duplication that blocks safe fixes; off-brand colors |
| **Medium** | Polish, maintainability, mobile friction |
| **Low** | Nice-to-have cleanup |

---

# Phase 0 — Critical fixes (ship blockers)

> Goal: nothing broken, brand-correct, navigable on mobile.

### 0.1 Stub `/services` page

- **Severity:** Critical  
- **Status:** [x]  
- **Files:** `app/services/page.tsx`, `data/NavbarData.ts`, `data/FooterData.tsx`  
- **Problem:** Page is only `"This is Services Page"`; no Footer; nav/footer still link to it.  
- **Fix options (pick one):**  
  A. Build a real Services landing (cards linking to Plots, Sell, Rent, Investor), **or**  
  B. Remove `/services` route and redirect `/services` → `/plots` (or home); clean nav IA so “Services → Plots” is clear.  
- **Acceptance:** No stub copy; Footer present if page kept; nav + footer links resolve to real content.

### 0.2 Footer broken Services href

- **Severity:** Critical  
- **Status:** [x]  
- **Files:** `data/FooterData.tsx` (~line 20)  
- **Problem:** `{ href: "services" }` is relative → breaks from nested routes (`/rent/tenants` → `/rent/tenants/services`).  
- **Fix:** Use `"/services"` (or correct final destination after 0.1).  
- **Acceptance:** From every route, Services link goes to the intended page.

### 0.3 Logo not clickable (no home link)

- **Severity:** Critical  
- **Status:** [x]  
- **Files:** `components/layout/Navbar.tsx` (~20–28)  
- **Problem:** Logo `<Image>` is not wrapped in `<Link href="/">`.  
- **Fix:** Wrap logo in `Link`; improve `alt` to `"2% Company"`.  
- **Acceptance:** Clicking logo returns to `/` on mobile and desktop.

### 0.4 Invalid Tailwind class `lg:text-[16]`

- **Severity:** Critical  
- **Status:** [x]  
- **Files:** `components/TestimonialSection.tsx` (~87)  
- **Problem:** Missing `px` → utility ignored; testimonial body size wrong on large screens.  
- **Fix:** `lg:text-[16px]` (or token once typography is fixed).  
- **Acceptance:** Testimonial body text is 16px at `lg+`.

### 0.5 Invalid spacing classes `px-30` / `px-38`

- **Severity:** Critical  
- **Status:** [x]  
- **Files:** `components/layout/Navbar.tsx` (~155, 171, 192, 223)  
- **Problem:** `px-30` / `px-38` are not standard Tailwind spacing → padding may be zero/ignored.  
- **Fix:** Use `px-4` / `px-6` (or arbitrary `px-[30px]` only if intentional).  
- **Acceptance:** Mobile menu items have visible horizontal padding.

### 0.6 Brand copy still says “Estatein”

- **Severity:** Critical (brand)  
- **Status:** [x]  
- **Files:**  
  - `data/HeroSectionData.ts`  
  - `data/TestimonialData.ts`  
  - `components/TestimonialSection.tsx`  
  - `components/layout/FeaturedPropertySection.tsx`  
  - `components/CTA.tsx`  
  - (also check `FeaturedLandSection` if present)  
- **Problem:** Leftover template brand name.  
- **Fix:** Replace all “Estatein” with “2% Company” (or approved short name).  
- **Acceptance:** Repo-wide grep for `Estatein` returns zero hits in UI copy.

### 0.7 Missing `/rent` hub (nav parent is `#`)

- **Severity:** High (treat as P0 for IA)  
- **Status:** [x]  
- **Files:** `data/NavbarData.ts`, optionally `app/rent/page.tsx`, `app/sitemap.ts`  
- **Problem:** Rent parent `href: "#"`. Sitemap may list `/rent` without a page.  
- **Fix:** Add `app/rent/page.tsx` hub (Tenants / Landlords cards) **or** make desktop/mobile parent open first child and remove `#`.  
- **Acceptance:** No dead `#` nav targets; sitemap matches real routes.

---

# Phase 1 — Design system foundations

> Goal: one token set + button/section primitives so later fixes don’t reintroduce drift.

### 1.1 Fix & expand `@theme` tokens

- **Severity:** High  
- **Status:** [x]  
- **Files:** `app/globals.css`  
- **Problem:** Thin palette; typography tokens invalid/unused; hardcodes in scrollbar/body.  
- **Fix — add at minimum:**

```css
/* Suggested additions (adjust names to match team preference) */
--color-primary-hover: #b39553;   /* already used in scrollbar hover */
--color-on-primary: #000000;      /* text on gold buttons */
--color-overlay: rgb(0 0 0 / 0.5);
--color-star: #8f7330;            /* or keep distinct if design wants warmer stars */
--radius-control: 12px;
--radius-media: 16px;
--radius-card: 24px;
--page-px: 1.5rem;                /* 24px mobile */
--page-px-lg: 2.5rem;             /* 40px desktop */
```

- Fix typography tokens to Tailwind v4–valid form **or delete** and document a utility map instead.  
- Replace hardcoded `#ffffff` / scrollbar hex with `var(--…)`.  
- **Acceptance:** No raw brand hex in components except overlays where intentional; tokens documented in this file’s inventory table (update when done).

### 1.2 Create shared UI primitives

- **Severity:** High  
- **Status:** [x]  
- **Suggested files:**  
  - `components/ui/Button.tsx` (primary / secondary / ghost)  
  - `components/ui/PageShell.tsx` or route-group layout  
  - `components/ui/SectionHeader.tsx`  
  - `components/ui/Input.tsx` / `Select.tsx` / `Textarea.tsx`  
  - `components/ui/ListingCard.tsx` (vertical)  
  - `components/ui/ListingRowCard.tsx` (horizontal list)  
- **Problem:** Every page invents its own button/input/padding.  
- **Fix:** Thin wrappers around Tailwind tokens; migrate pages gradually (this phase = create + adopt on 1–2 surfaces).  
- **Acceptance:** Primary button has one hover + one text color; page padding comes from one class/token.

### 1.3 Shared site layout (Navbar + Footer)

- **Severity:** High  
- **Status:** [x]  
- **Files:** `app/layout.tsx` or new `app/(site)/layout.tsx`; all pages that manually mount Navbar/Footer  
- **Problem:** Every page duplicates `<Navbar />` / `<Footer />`; `services` forgot Footer; `not-found` has neither.  
- **Fix:** Route group layout wraps children with Navbar + Footer; pages only render content. Decide 404 chrome separately.  
- **Acceptance:** Removing Navbar from a page file doesn’t remove chrome; new pages inherit shell automatically.

### 1.4 Button / CTA contract (document + enforce)

- **Severity:** High  
- **Status:** [x]  
- **Canonical rules:**

| Variant | Background | Text | Hover | Radius |
|---------|------------|------|-------|--------|
| Primary | `bg-primary` | `text-main-bg` / `text-black` | `hover:brightness-110` (not `yellow-600`) | 12–16px |
| Secondary | `bg-2nd-bg` + `border-header-stroke` | `text-primary` | `hover:bg-main-bg` | 12px |
| Ghost / link | transparent | `text-primary` | underline or brightness | — |

- **Replace all:** `hover:bg-yellow-600`, mixed `text-white` on primary, nested `<Link><button>`.  
- **Hotspot files:** `app/sell/page.tsx`, `app/contact/page.tsx`, `app/beaninvestor/page.tsx`, `app/properties/page.tsx`, `app/plots/page.tsx`, detail slug pages, `HeroSection.tsx`, `CTA.tsx`, `NewsLetter.tsx`, enquiry page.  
- **Acceptance:** Grep `yellow-600` = 0; primary CTAs use on-primary text.

---

# Phase 2 — Consistency & hardcoded styles

### 2.1 Replace hardcoded colors with tokens

- **Severity:** High  
- **Status:** [x]  
- **Checklist:**

| Location | Current | Replace with |
|----------|---------|--------------|
| `app/aboutUs/page.tsx` | `bg-[#111111]`, `text-[#9e9e9e]` | `bg-2nd-bg`, `text-secondary-text` |
| `components/TestimonialSection.tsx` | `#FFB54F` stars | `text-primary` / `--color-star` |
| `app/sell/page.tsx` | `rgba(255,215,0,…)`, `yellow-500/400` gradients | primary-based tokens |
| `app/rent/tenants/enquiry/page.tsx` | `bg-gray-600` | `bg-2nd-bg` + border |
| `PropertyForm.tsx`, `landlords/page.tsx` | `bg-gray-700` / `gray-500` | theme neutrals |
| `globals.css` scrollbar | raw `#8f7330` / `#111` | CSS vars |
| Prefer | `bg-black` for brand surfaces | `bg-main-bg` (keep true black overlays as `bg-black/50` OK) |

- **Acceptance:** About page uses zero arbitrary hex for brand colors.

### 2.2 Typography scale (one hierarchy)

- **Severity:** High  
- **Status:** [x]  
- **Proposed scale (mobile → desktop):**

| Role | Mobile | Desktop | Notes |
|------|--------|---------|-------|
| Display / Hero H1 | `clamp(24px, 5vw, 48px)` | same | Hero only |
| Section H2 | `20–22px` | `40px` | Featured, CTA, Testimonials |
| Card title | `clamp(18px, 2vw, 24px)` | — | listings |
| Body | `14–16px` | `16px` | secondary-text for supporting |
| Caption / meta | `12–14px` | `14px` | footer, tags |

- **Fix:** Remove useless clamps like `clamp(16px, 2.5vw, 16px)` in `HeroSection.tsx`.  
- **Fix:** Sell page fixed `text-[48px]` “Why List With Us?” → responsive section H2.  
- **Acceptance:** Section headers across home/listings/about share the same classes (via `SectionHeader`).

### 2.3 Radius & spacing consistency

- **Severity:** Medium–High  
- **Status:** [x]  
- **Rules:**

| Element | Radius |
|---------|--------|
| Cards | `rounded-[24px]` / `rounded-card` |
| Images inside cards, gallery | `rounded-[16px]` / `rounded-media` |
| Buttons, nav pills, inputs | `rounded-[12px]` / `rounded-control` |
| Chips / tags | `rounded-full` |

| Element | Horizontal padding |
|---------|-------------------|
| Page sections | `px-6 lg:px-10` (40px) — **standard** |
| Avoid | HomeCTA `px-[24px] lg:px-[16px]`, enquiry `lg:px-24` unless intentional full-bleed |

- **Acceptance:** Grep shows ≤2 intentional radius values for cards/controls; page shells share one padding utility.

### 2.4 Deduplicate listing UI

- **Severity:** Critical (maintainability)  
- **Status:** [x]  
- **Problem:** Same card markup in `PropertyCard`, `PropertyGrid` (×3), `PlotGrid`, `properties/page`, `plots/page`; detail pages nearly identical for property / plot / tenant slug.  
- **Fix order:**  
  1. Make `PropertyGrid` / `PlotGrid` use `PropertyCard` (or rename to `ListingCard`).  
  2. Extract `ListingRowCard` for list pages.  
  3. Extract `ListingDetailLayout` for `[slug]` pages (gallery, specs, floor plans, lightbox, map, enquire CTA).  
  4. Merge `PropertyForm` + landlords form behind a `mode` prop.  
- **Acceptance:** Card visual change in one file updates home grid + listing pages.

---

# Phase 3 — Mobile-first & responsive

### 3.1 Property gallery on small screens

- **Severity:** High  
- **Status:** [x]  
- **Files:** `components/PropertyGallery.tsx`  
- **Problem:** Fixed tall heights (`400–500px`) + `slidesPerView: 1.5` crowds phones; `overflow-visible` can bleed.  
- **Fix:** `slidesPerView: 1` below `md`; height via `aspect-[4/3]` or `h-[240px] md:h-[400px]`; contain overflow on xs.  
- **Acceptance:** No horizontal page scroll from gallery on 375px width.

### 3.2 Carousel arrow overflow

- **Severity:** High  
- **Status:** [x]  
- **Files:** `PropertyGrid.tsx`, `PlotGrid.tsx`, `TestimonialSection.tsx`  
- **Problem:** `absolute -left-5 / -right-5` clips or overlaps padding.  
- **Fix:** Inset arrows (`left-2`) or add horizontal padding on parent; ensure ≥44×44 touch target.  
- **Acceptance:** Arrows fully visible inside viewport on mobile.

### 3.3 Hero / map / testimonial fixed heights

- **Severity:** Medium  
- **Status:** [x]  
- **Files:** `HeroSection.tsx`, detail map blocks, `TestimonialSection.tsx`  
- **Problem:** Fixed `h-[300px]`/`400px` / `lg:h-[366px]` cause crop or overflow.  
- **Fix:** Prefer `aspect-*`, `min-h`, auto height; maps `h-[240px] md:h-[400px]`.  
- **Acceptance:** No clipped testimonial text; maps usable on phone without dominating fold.

### 3.4 Navbar mobile drawer a11y + UX

- **Severity:** High  
- **Status:** [x]  
- **Files:** `components/layout/Navbar.tsx`  
- **Checklist:**  
  - [ ] `aria-expanded` / `aria-controls` on hamburger  
  - [ ] `aria-label` on open/close  
  - [ ] `aria-modal` + focus trap + Escape to close  
  - [ ] Body scroll lock while open  
  - [ ] Overlay is keyboard-dismissible  
  - [ ] Desktop Rent/Services: keyboard-accessible (not hover-only `<span>`)  
  - [ ] Remove nested `<Link><button>` on Contact  
- **Acceptance:** Can open/close menu and reach all links with keyboard only.

### 3.5 Touch targets

- **Severity:** Medium  
- **Status:** [x]  
- **Problem:** Icon buttons ~28px; pagination dots 12×12.  
- **Fix:** Min 44×44 hit area (padding OK even if visual icon smaller).  
- **Acceptance:** Mobile audit of nav, swipers, gallery dots passes 44px guideline.

### 3.6 Breakpoint consistency

- **Severity:** Medium  
- **Status:** [x]  
- **Problem:** Desktop nav appears at `xl`; many sections use `lg`. HomeCTA is 2-col on mobile which may feel cramped.  
- **Fix:** Document breakpoint policy:  
  - Nav drawer → desktop: `xl` (keep) **or** unify to `lg` intentionally.  
  - HomeCTA: consider `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.  
- **Acceptance:** Written policy in this doc + code matches it.

---

# Phase 4 — Forms, accessibility, content QA

### 4.1 Form labels & errors

- **Severity:** High  
- **Status:** [x]  
- **Files:** `contact/page.tsx`, `PropertyForm.tsx`, `NewsLetter.tsx`, `rent/landlords/page.tsx`, `rent/tenants/enquiry/page.tsx`, `beaninvestor/page.tsx`  
- **Problem:** Placeholder-as-label; `placeholder-primary` (same as value color); Contact has `required` without visible errors.  
- **Fix:** Visible `<label>`; placeholders `placeholder:text-secondary-text`; show `formState.errors`; `focus-visible:ring-2 ring-primary` instead of naked `focus:outline-none`.  
- **Acceptance:** Every field has a visible name; invalid submit shows inline messages.

### 4.2 Interactive elements semantics

- **Severity:** High  
- **Status:** [x]  
- **Hotspots:** Floor-plan clickables on detail pages; gallery pagination `span`; filter `<li onClick>`; About “values” cards with `cursor-pointer` but no action.  
- **Fix:** Use `<button>` / listbox pattern (`FilterSelect`); remove fake cursors; Escape closes floor-plan lightbox.  
- **Acceptance:** No click-only `div`/`span` for primary actions; keyboard activates floor-plan lightbox.

### 4.3 Contrast on primary CTAs

- **Severity:** High  
- **Status:** [x]  
- **Problem:** `bg-primary text-white` on gold (`#8f7330`) fails contrast; elsewhere correctly uses black.  
- **Fix:** Always `text-on-primary` on primary fills (detail enquire buttons, hero primary, enquiry Next/Submit).  
- **Acceptance:** Contrast checker passes for primary buttons.

### 4.4 Images

- **Severity:** Medium  
- **Status:** [x]  
- **Fix:** Add `sizes` on listing images; consistent `object-cover` + aspect; Stars SVG explicit dimensions (not `0×0`); logo crop vs aspect.  
- **Acceptance:** Lighthouse image-size warnings reduced; no distorted logos.

### 4.5 Footer content hygiene

- **Severity:** Medium  
- **Status:** [x]  
- **Files:** `data/FooterData.tsx`, `components/layout/Footer.tsx`  
- **Checklist:**  
  - [x] Real social URLs (not `example.com`) — empty until real profiles exist  
  - [x] `mailto:` and `tel:` links  
  - [x] Services href absolute (see 0.2)  
- **Acceptance:** All footer links open valid destinations.

### 4.6 Incomplete / orphan routes

- **Severity:** Medium  
- **Status:** [x]  
- **Checklist:**  
  - [x] Align `app/sitemap.ts` with real routes (enquiry + tenant slugs; buy/investor present)  
  - [x] IA: Plots remain top-level + under Services hub  
  - [x] Removed unused `react-zoom-pan-pinch`, `d3`, `d3-geo`, `topojson-client`; deleted orphan `PlotData` / `Properties`  
- **Acceptance:** Sitemap URLs all 200; no orphan stub.

---

# Phase 5 — Polish & performance UX

### 5.1 Motion discipline

- **Severity:** Low–Medium
- **Status:** [x]
- Prefer 2–3 intentional motions (hero, card hover, drawer) over many one-off `hover:scale-105` / `active:scale-105`.
- Respect `prefers-reduced-motion` (CSS + `usePrefersReducedMotion`; hero autoplay pauses).

### 5.2 Loading / empty / error states

- **Severity:** Medium
- **Status:** [x]
- Enquiry “property not found”, Suspense fallbacks, 404 — `PageState` shell + primary CTA.
- Map section loading placeholder (`MapPlaceholder`) while Leaflet hydrates.

### 5.3 Toast + feedback consistency

- **Severity:** Low
- **Status:** [x]
- Theme `react-toastify` to dark + primary accent via `AppToast` + CSS vars; shared `toastCopy`.

### 5.4 README / design notes

- **Severity:** Low
- **Status:** [x]
- Updated `README.md` (Urbanist/stack/docs); `design.md` motion section current.

---

# Suggested fix order (one-by-one queue)

Use this as the execution backlog. Check off as you go.

| # | Item | Phase | Est. effort |
|---|------|-------|-------------|
| 1 | Fix `Estatein` copy | 0.6 | S |
| 2 | Fix `lg:text-[16]` | 0.4 | XS |
| 3 | Fix Footer `services` href | 0.2 | XS |
| 4 | Logo → Link home | 0.3 | XS |
| 5 | Fix Navbar `px-30` / `px-38` | 0.5 | XS |
| 6 | Remove `hover:bg-yellow-600` → brightness | 1.4 | S |
| 7 | Primary button text = black everywhere | 1.4 / 4.3 | S |
| 8 | About page hex → tokens | 2.1 | S |
| 9 | Star color `#FFB54F` → token | 2.1 | XS |
| 10 | Services stub decision + build/redirect | 0.1 | M |
| 11 | Rent hub or remove `#` | 0.7 | M |
| 12 | Expand `@theme` tokens | 1.1 | M |
| 13 | Site layout shell | 1.3 | M |
| 14 | Button + SectionHeader primitives | 1.2 | M |
| 15 | Wire PropertyGrid → PropertyCard | 2.4 | M |
| 16 | Shared ListingRowCard (properties/plots) | 2.4 | M |
| 17 | Shared ListingDetailLayout | 2.4 | L |
| 18 | Gallery + arrow mobile fixes | 3.1–3.2 | M |
| 19 | Navbar a11y + keyboard dropdowns | 3.4 | M |
| 20 | Form labels / errors / focus rings | 4.1 | L |
| 21 | Floor-plan / dropdown semantics | 4.2 | M |
| 22 | Image `sizes` + object-cover | 4.4 | S |
| 23 | Footer socials + mailto/tel | 4.5 | S |
| 24 | Typography + spacing pass | 2.2–2.3 | M |
| 25 | Sitemap / dead deps cleanup | 4.6 | S |
| 26 | Motion + toast polish | 5.x | S |

**Effort key:** XS &lt; 30m · S half-day · M 1–2 days · L multi-day

---

# Page-by-page notes (quick reference)

| Route | Main issues |
|-------|-------------|
| `/` | Estatein copy; HomeCTA padding/grid; carousel arrows; Map dynamic OK |
| `/aboutUs` | Hardcoded `#111` / `#9e9e9e`; non-interactive `cursor-pointer` cards |
| `/properties` | Duplicated row cards; `yellow-600` hover |
| `/properties/[slug]` | White text on primary; floor-plan a11y; map height |
| `/plots` | Same as properties |
| `/plots/[slug]` | Same as property detail |
| `/buy` | Custom dropdown a11y; placeholder-primary |
| `/sell` | yellow hover/glow; fixed 48px heading; form labels |
| `/rent/tenants` | Dropdown a11y; filter UX |
| `/rent/tenants/[slug]` | Same detail issues |
| `/rent/tenants/enquiry` | Gray buttons; white on primary; weak step validation; wide `lg:px-24` |
| `/rent/landlords` | Duplicate of PropertyForm; gray progress; placeholders |
| `/contact` | No visible errors; yellow hover; OK placeholders (model for others) |
| `/beaninvestor` | yellow hover; form a11y |
| `/services` | Stub; no Footer |
| `/` 404 | No chrome; Lottie OK |

---

# Definition of done (whole initiative)

When this plan is complete:

1. No stub pages or dead `#` nav links.  
2. Brand copy is exclusively “2% Company”.  
3. Colors/radii/type come from tokens or shared components — not ad-hoc hex/`yellow-*`.  
4. Listing cards and detail pages have a single implementation.  
5. Primary CTA look + hover is identical site-wide with accessible contrast.  
6. Forms have labels, errors, and focus-visible rings.  
7. Mobile (375px): no overflow from carousels; nav drawer usable; touch targets ≥44px.  
8. Keyboard users can operate nav dropdowns, filters, and floor-plan lightbox.  
9. This document’s Phase 0–4 checkboxes are all `[x]`.

---

# Appendix — Useful greps while fixing

```bash
# Off-brand / hardcoded
rg "yellow-600|Estatein|#FFB54F|#111111|#9e9e9e|px-30|px-38|text-\[16\]" --glob "*.tsx"

# Primary text inconsistency
rg "bg-primary text-white" --glob "*.tsx"

# Arbitrary text sizes (sample)
rg "text-\[clamp|text-\[[0-9]" --glob "*.tsx" | head

# Pages missing shared patterns
rg "hover:bg-yellow" --glob "*.tsx"
```

---

*Living document — update Status checkboxes and the token inventory as you implement.*
