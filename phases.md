# Phases

**Product:** 2% Company  
**Related:** [prd.md](./prd.md) · [architecture.md](./architecture.md) · [design.md](./design.md) · [memory.md](./memory.md) · [UI_UX_IMPROVEMENT_PLAN.md](./UI_UX_IMPROVEMENT_PLAN.md)

This file is the **program roadmap**. Detailed UX checklists live in `UI_UX_IMPROVEMENT_PLAN.md` — keep both in sync when a phase completes.

**Status:** `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase overview

| Phase | Name | Goal | Status |
|-------|------|------|--------|
| **0** | Critical ship blockers | Navigable, brand-correct, no stubs | [x] |
| **1** | Design system foundations | Tokens, primitives, site shell | [x] |
| **2** | Consistency & dedupe | Colors, type, shared listing UI | [x] |
| **3** | Mobile-first responsive | Gallery, arrows, nav a11y, heights | [x] |
| **4** | Forms, a11y, content QA | Labels, semantics, images, footer | [ ] |
| **5** | Polish & performance UX | Motion, empty states, toast, deps | [ ] |
| **6** | Product backend | Lead APIs, uploads, CMS | [~] |

---

## Phase 0 — Critical fixes ✅

**Done:** 31 Jul 2026

| ID | Item | Outcome |
|----|------|---------|
| 0.1 | Services stub | Real `/services` landing + Footer |
| 0.2 | Footer Services href | Absolute `"/services"` |
| 0.3 | Logo home link | `<Link href="/">` + proper alt |
| 0.4 | `lg:text-[16]` | Fixed to `lg:text-[16px]` |
| 0.5 | `px-30` / `px-38` | Replaced with `px-6` |
| 0.6 | “Estatein” copy | Replaced with “2% Company” |
| 0.7 | `/rent` hub | New hub page; nav `#` removed; sitemap updated |

**Exit criteria met:** No stub IA, no dead `#` parents, brand-correct UI copy, invalid utility classes fixed.

---

## Phase 1 — Design system foundations ✅

**Done:** 31 Jul 2026

| ID | Item | Outcome |
|----|------|---------|
| 1.1 | Expand `@theme` | primary-hover, on-primary, overlay, star, body, radius-*, page spacing; scrollbar/body use vars; `.page-px` helper |
| 1.2 | UI primitives | `components/ui/Button`, `Input`/`Textarea`/`Select`, `SectionHeader` |
| 1.3 | Site layout shell | `app/(site)/layout.tsx` mounts Navbar + Footer; all marketing routes moved under `(site)` |
| 1.4 | CTA contract | No `yellow-600`; primary CTAs use `text-on-primary` + `hover:brightness-110`; Navbar Contact is Link-only |

**Exit criteria met:** Shared tokens + primitives exist; chrome is layout-owned; primary CTA look consistent.

**Adopted on:** Featured Property/Land, Testimonials, CTA band, Sell/Rent hubs, Contact submit, Newsletter, listing card CTAs, Hero primary buttons.

---

## Phase 2 — Consistency & hardcoded styles ✅

**Done:** 31 Jul 2026

| ID | Item | Outcome |
|----|------|---------|
| 2.1 | Hardcoded colors → tokens | About hex → `2nd-bg` / `secondary-text`; PropertyForm gray → theme; placeholders secondary |
| 2.2 | Typography hierarchy | `.type-display/section/subhead/card-title/body/caption` in globals; Hero/About/Sell adopt |
| 2.3 | Radius & spacing | `rounded-card/media/control` + `.page-px` on About, lists, HomeCTA, Navbar, forms |
| 2.4 | Deduplicate listings | `ListingCard`, `ListingRowCard`, `ListingGrid`, `ListingDetail`; grids/pages/details wired; landlords → `PropertyForm type="rent"` |

**Exit criteria met:** One card/row/detail implementation; brand colors tokenized on key surfaces.

---

## Phase 3 — Mobile-first & responsive ✅

**Done:** 31 Jul 2026

| ID | Item | Outcome |
|----|------|---------|
| 3.1 | PropertyGallery | `slidesPerView: 1` on xs; aspect heights; overflow contained |
| 3.2 | Carousel arrows | Inset; `min-w/h-11`; aria-labels (gallery, testimonials, listing grid) |
| 3.3 | Fixed heights | Hero `aspect-[4/3]`; map `240→400→450`; testimonials `min-h` not fixed clip |
| 3.4 | Navbar a11y | aria-expanded/controls/modal; Escape; body lock; focus trap; desktop click menus |
| 3.5 | Touch targets | Dots/hamburger/arrows ≥44px hit areas |
| 3.6 | Breakpoint policy | Documented in design.md; HomeCTA already `1/2/4` cols |

---

## Phase 4 — Forms, accessibility, content QA

**Goal:** Usable forms and inclusive interactions.  
**Status:** ✅ Complete (2026-07-31)

| ID | Item | Acceptance | Done |
|----|------|------------|------|
| 4.1 | Labels & errors | Visible labels; secondary placeholders; inline errors; focus-visible rings | ✅ |
| 4.2 | Semantics | Buttons for actions; keyboard floor-plans/filters/gallery dots | ✅ |
| 4.3 | CTA contrast | No white-on-primary remaining | ✅ |
| 4.4 | Images | `sizes`, `object-cover`, real alts, logo/Stars dimensions | ✅ |
| 4.5 | Footer hygiene | Real socials or hidden; `mailto:` / `tel:` | ✅ |
| 4.6 | Routes & deps | Sitemap sync; remove dead packages/data | ✅ |

**Depends on:** Phase 1 inputs/buttons  
**Detail:** UX plan Phase 4

---

## Phase 5 — Polish & performance UX

**Goal:** Cohesive motion and resilient empty/error UX.  
**Status:** ✅ Complete (2026-07-31)

| ID | Item | Acceptance | Done |
|----|------|------------|------|
| 5.1 | Motion discipline | 2–3 intentional motions; `prefers-reduced-motion` | ✅ |
| 5.2 | Loading / empty / error | Shell + CTA for not-found enquiry, Suspense, map placeholder | ✅ |
| 5.3 | Toast theme | Dark + primary accent; consistent copy | ✅ |
| 5.4 | Docs hygiene | README matches Urbanist/stack; design.md stays current | ✅ |

**Depends on:** Phases 1–4 largely done  
**Detail:** UX plan Phase 5

---

## Phase 6 — Product backend (PRD)

**Goal:** Real lead capture and dynamic listings.

| ID | Item | Acceptance | Status |
|----|------|------------|--------|
| 6.1 | Lead API | Contact / sell / rent / enquiry / investor / newsletter / tour persist via `POST /api/leads` → Payload `leads` | [x] |
| 6.2 | Validation | Shared Zod schema (`lib/leadSchema.ts`) on `POST /api/leads` | [x] |
| 6.3 | Uploads | Secure storage for sell/landlord media | [ ] |
| 6.4 | CMS or admin | Payload listings CMS + seed + frontend data layer | [x] |
| 6.5 | Env-based site URL | Single `NEXT_PUBLIC_SITE_URL` for metadata/sitemap/schema | [ ] |
| 6.6 | Wire remaining JSON-LD | Property + Breadcrumb on detail pages | [ ] |

**6.4 done (2026-07-31):** Payload 3 + SQLite, `/admin`, `listings`/`media`/`users`, `lib/listings.ts` with static fallback, seed from `PropertyData`. Neon + Vercel Blob still future.

**6.1 done (2026-08-05 — Houzez adapt Phase 8):** Payload `leads` collection + `app/api/leads` + wired Contact, Sell/Landlord, Tenant enquiry, Investor, Newsletter, Schedule Visit. File uploads still metadata-only (6.3 open).

### Houzez adapt program (2026-08-05)

| Phase | Item | Status |
|-------|------|--------|
| H1 | URL filter hydration + sort | [x] |
| H2 | Explore Patna + category tiles | [x] |
| H3 | Card status + ₹/sqft | [x] |
| H4 | Share, Schedule Visit, Similar | [x] |
| H5 | Team CMS + `/team` | [x] |
| H6 | FAQ + JSON-LD | [x] |
| H7 | Blog + About teaser | [x] |
| H8 | Leads CMS (last) | [x] |

**Depends on:** Open decisions in prd.md §10 for leads (6.1–6.3).

---

## Suggested execution order (next)

1. Phase **6.1–6.3** lead APIs + validation + uploads  
2. Prod CMS: Neon Postgres + Vercel Blob  
3. Phase **6.5–6.6** site URL + JSON-LD

UI program Phases **0–5** are complete. CMS listings (6.4) are live locally.

---

## Definition of done (full UI program)

Phases **0–5** complete when:

1. No stubs / dead nav  
2. Brand + tokens + primary CTA consistent  
3. One listing card + one detail layout  
4. Mobile 375px clean  
5. Forms labeled with errors + focus rings  
6. Keyboard paths for nav, filters, lightbox  
7. UX plan Phase 0–5 checkboxes `[x]`  

Phase **6** is a separate product milestone (see prd.md).
