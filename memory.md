# Project Memory

**Product:** 2% Company  
**Purpose:** Persistent context for humans and agents — decisions, truths, gotchas, and “do not re-learn” facts.  
**Related:** [prd.md](./prd.md) · [architecture.md](./architecture.md) · [design.md](./design.md) · [phases.md](./phases.md)

Update this file when you make a lasting decision or discover a non-obvious constraint.

---

## 1. What this project is

- Marketing + lead-gen site for **2% Company**, Patna-focused real estate.
- Production URL identity in code: `https://www.2percentcompany.in/`
- Contact (current data): `2percent-patna@gmail.com`, `+91 99559 96464`
- **No backend / no auth / no CMS** as of last update — forms toast or `console.log` only.

---

## 2. Absolute truths (don’t contradict)

1. **Live listings = `data/PropertyData.ts` only.** Filter by `type: "property" | "plot"`.
2. **Canonical listings only:** `data/PropertyData.ts`. Orphan `PlotData.ts` / `Properties.ts` were removed in Phase 4 — do not revive without migrating.
3. **Brand string is “2% Company”.** Template name “Estatein” was removed in Phase 0 — never reintroduce.
4. **Primary brand color is `#8f7330`**, not Tailwind yellow. Hover via brightness / primary-hover token — not `yellow-600`.
5. **Text on primary buttons = black / main-bg**, not white (contrast).
6. **Navbar desktop breakpoint is `xl`** (drawer below). Many sections use `lg` — intentional asymmetry today.
7. **Marketing routes live under `app/(site)/`** — Navbar/Footer come from `(site)/layout.tsx`, not individual pages.
8. **Metadata lives in server layouts**, not in `"use client"` pages.
9. **Map must be client-only** (`dynamic` + `ssr: false`) because of Leaflet.
10. **Path alias** `@/*` → repo root (no `src/` folder).
11. **Primary CTA contract:** `bg-primary text-on-primary hover:brightness-110` (use `Button` when practical).

---

## 3. Decision log

| Date | Decision | Why |
|------|----------|-----|
| 2026-07-31 | Keep `/services` as real hub (not redirect-only) | Nav/footer already pointed at services; hub links Plots/Sell/Rent/Investor |
| 2026-07-31 | Add `/rent` hub page | Sitemap already listed `/rent`; parent was `#` |
| 2026-07-31 | Desktop Rent/Services parents are Links to hubs; mobile submenu title links to hub | Avoid Overview duplicate active-state bugs |
| 2026-07-31 | Phase 0 completed before Phase 1 docs/system work | Ship blockers first |
| 2026-07-31 | Create prd / architecture / design / phases / memory | Stabilize context before Phase 1+ |
| 2026-07-31 | Move all marketing routes under `app/(site)/` with shared Navbar/Footer layout | End per-page chrome duplication |
| 2026-07-31 | Phase 1 design system (tokens, ui/*, CTA contract) | Foundations before Phase 2 dedupe |
| 2026-07-31 | Phase 2 listing primitives + token/type/radius pass | ListingCard/Row/Grid/Detail; landlords → PropertyForm |
| 2026-07-31 | Phase 3 mobile-first + nav a11y | Gallery/aspect heights; 44px targets; drawer focus trap/Escape; desktop click menus |
| 2026-07-31 | Phase 4 forms/a11y + content QA | Labels/errors/focus; FilterSelect; footer mailto/tel; dead deps/data removed; sitemap tenants |
| 2026-07-31 | Display font: Instrument Serif + Urbanist UI | Premium serif headlines; keep sans for forms/nav |

---

## 4. Completed work snapshots

### Phase 0 (2026-07-31)

- Services landing + Footer
- Footer `/services` absolute href
- Logo → home Link
- Testimonial `lg:text-[16px]`
- Navbar `px-6` instead of invalid `px-30`/`px-38`
- Estatein → 2% Company (hero, testimonials, featured, CTA, data)
- `/rent` page + nav hrefs + sitemap tenants/landlords

### Phase 1 (2026-07-31)

- Expanded `@theme` tokens + `.page-px`
- Added `components/ui` (Button, Input/Textarea/Select, SectionHeader)
- `app/(site)/layout.tsx` shell; pages no longer mount Navbar/Footer
- CTA contract: no yellow-600; `text-on-primary` + brightness hover
- SectionHeader adopted on Featured / Testimonials / CTA; Button on Sell/Rent/Contact/Newsletter

### Phase 2 (2026-07-31)

- `components/listing/*`: ListingCard, ListingRowCard, ListingGrid, ListingDetail
- PropertyGrid/PlotGrid thin wrappers; list + detail pages consume shared components
- Landlords page uses `PropertyForm type="rent"`
- About/Hero/HomeCTA/forms: tokens, type-* classes, radius utilities
- Tenant enquire CTA fixed to `/rent/tenants/enquiry`

### Phase 3 (2026-07-31)

- Gallery: 1 slide on xs; aspect heights; contained overflow
- Carousel arrows inset ≥44px; dots large hit areas
- Hero `aspect-[4/3]`; map 240→400→450; testimonials `min-h`
- Navbar: aria, body lock, Escape, focus trap; desktop click menus
- Breakpoint policy documented in `design.md`

### Phase 4 (2026-07-31)

- Forms: visible labels + secondary placeholders + focus rings (contact, PropertyForm, enquiry, beaninvestor, newsletter)
- Contact: RHF inline errors; type/purpose as button listboxes
- `FilterSelect` on properties / plots / buy / tenants filters
- CTA contrast: `text-on-primary` (no white-on-primary)
- Images: `sizes` on logos, stars, cards, floor plans, testimonials, CTA icons
- Footer: `mailto:` / `tel:`; empty socials (no example.com)
- Sitemap: enquiry + `/rent/tenants/[slug]`
- Removed unused `PlotData.ts`, `Properties.ts`, and deps `d3` / `d3-geo` / `topojson-client` / `react-zoom-pan-pinch`

### Phase 5 (2026-07-31)

- `prefers-reduced-motion` CSS + `usePrefersReducedMotion` (hero autoplay, card hover, row enter)
- `PageState` for enquiry missing listing, Suspense, polished `not-found`
- `MapPlaceholder` on home + ListingDetail dynamic map load
- `AppToast` + `toastCopy` dark/primary theme across forms
- README rewritten (Urbanist, stack, docs links)

### Docs created

- `prd.md`, `architecture.md`, `design.md`, `phases.md`, `memory.md`
- Prior: `UI_UX_IMPROVEMENT_PLAN.md`, `SEO_IMPROVEMENTS.md`

---

## 5. Known debt (quick index)

| Area | Issue | Tracked in |
|------|-------|------------|
| Shell | ~~Navbar/Footer repeated per page~~ → `app/(site)/layout.tsx` | phases 1.3 ✅ |
| Tokens | Expanded in Phase 1; error/success still TBD | phases 1.1 ✅ / design.md |
| CTAs | Contract enforced via `text-on-primary` | phases 1.4 / 4.3 ✅ |
| Listings | Shared `components/listing/*` | phases 2.4 ✅ |
| Forms | Labels + focus rings + FilterSelect | phases 4.1–4.2 ✅ |
| SEO | Property/Breadcrumb schemas defined but unused | phases 6.6, SEO doc |
| Deps | Dead packages removed in Phase 4 | phases 4.6 ✅ |
| Footer | mailto/tel; socials empty until real URLs | phases 4.5 ✅ |
| Featured land CTA | Fixed to `/plots` in Phase 1 | — |
| Hero links | Remapped to `/aboutUs`, `/properties`, `/contact` | cross-check QA ✅ |
| PropertyData.url | Canonical `2percentcompany.in` slug paths | cross-check QA ✅ |

---

## 6. Agent / contributor playbook

### Before coding

1. Read **memory.md** (this file) + relevant section of **phases.md**.
2. For UI work, follow **design.md** contracts and check **UI_UX_IMPROVEMENT_PLAN.md** item status.
3. Prefer extending shared components over duplicating JSX.

### While coding

- Match existing dark/gold patterns; no new purple/cream AI-default aesthetics.
- Don’t add `useMemo`/`useCallback` unless the repo already patterns that way for the case.
- Don’t create commits unless the user asks.
- Don’t expand scope into Phase 6 backend without an explicit ask.

### After a phase slice

1. Mark items `[x]` in `phases.md` and `UI_UX_IMPROVEMENT_PLAN.md`.
2. Append a short note to **§3 Decision log** or **§4 Completed** if behavior/IA changed.
3. Update design.md tables if tokens changed.

---

## 7. Key file cheat sheet

| Need | Go to |
|------|--------|
| Listing seed data | `data/PropertyData.ts` |
| Nav labels/hrefs | `data/NavbarData.ts` |
| Footer/contact | `data/FooterData.tsx` |
| Colors / global CSS | `app/globals.css` |
| UI primitives | `components/ui/` + `components/listing/` |
| Site chrome layout | `app/(site)/layout.tsx` |
| Root metadata / font | `app/layout.tsx` |
| Map | `components/MapSection.tsx`, `utils/MapIcons.ts` |
| Sell form | `components/PropertyForm.tsx` |
| JSON-LD helpers | `components/StructuredData.tsx` |
| Next image/SEO config | `next.config.ts` |
| UX fix checklist | `UI_UX_IMPROVEMENT_PLAN.md` |

---

## 8. Local commands

```bash
npm run dev      # next dev --turbopack
npm run build    # next build --turbopack
npm run start
npm run lint
```

No env file required for current static/lead-UI mode.

---

## 9. Open questions (need human input)

1. Lead backend: email, CRM, WhatsApp, or custom API?
2. Are rental listings meant to be a subset of properties forever, or a separate inventory?
3. Keep Services hub long-term or simplify IA?
4. Delete unused `PlotData` / d3 packages now or after Phase 2 dedupe?
5. Real social profile URLs for footer?

Answers belong in **§3 Decision log** when resolved.
