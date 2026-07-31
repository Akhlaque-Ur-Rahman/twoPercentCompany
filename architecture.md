# Architecture

**Product:** 2% Company  
**Related:** [prd.md](./prd.md) · [design.md](./design.md) · [phases.md](./phases.md) · [memory.md](./memory.md)

---

## 1. Overview

2% Company is a **Next.js 15 App Router** marketing site with **Payload CMS 3** for listings. Lead forms are still client-side (toast / `console.log`). SEO metadata lives in server layouts.

```
Browser
  └── Next.js 15 (App Router + Turbopack)
        ├── (site): marketing pages, Navbar/Footer
        ├── (payload): /admin + /api/*
        ├── lib/listings.ts → Payload Local API (fallback: data/PropertyData.ts)
        ├── SQLite: payload.db (local)
        └── Assets: /public + optional /media uploads
```

---

## 2. Tech stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 15.4.11 (pinned for Payload) |
| CMS | Payload | 3.86 |
| Database (local) | SQLite via `@payloadcms/db-sqlite` | — |
| UI | React | 19.1.0 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 (`@theme` in CSS) | ^4 |
| Font | Urbanist via `next/font` | — |
| Carousel | Swiper | ^11 |
| Map | Leaflet + react-leaflet | 1.9 / 5.0 |
| Motion | Framer Motion | ^12 |
| Forms | react-hook-form (contact); local state elsewhere | ^7 |
| Feedback | react-toastify | ^11 |
| Animation assets | lottie-react | ^2.4 |
| Icons | lucide-react, react-icons | — |

**Removed in Phase 4 (were unused):** `d3`, `d3-geo`, `topojson-client`, `react-zoom-pan-pinch`.

**Prod CMS path (not wired yet):** Neon Postgres + Vercel Blob with `clientUploads: true`.

---

## 3. Repository layout

```
twoPercentCompany/
├── app/
│   ├── (site)/               # Marketing routes
│   └── (payload)/            # Payload admin + REST/GraphQL API
├── collections/              # Payload: Users, Media, Listings
├── components/               # Shared UI
│   └── layout/               # Navbar, Footer, Hero, Featured*, Newsletter
├── data/                     # Static fallback content + seed source
├── lib/                      # payload.ts, listings.ts, tagIcons.ts
├── scripts/                  # seed-listings.ts, patch-payload-loadenv.mjs
├── payload.config.ts
├── types/                    # MarkerType, HomeCTASection
├── utils/                    # MapIcons
├── public/                   # Static assets
├── prd.md / architecture.md / design.md / phases.md / memory.md
├── UI_UX_IMPROVEMENT_PLAN.md # Detailed UX fix checklist
└── SEO_IMPROVEMENTS.md
```

**Alias:** `@/*` → project root (`tsconfig.json`).

---

## 4. Routing architecture

### 4.1 Route tree

```
/                         → Home
/aboutUs
/buy
/sell
/contact
/beaninvestor
/services
/properties
/properties/[slug]
/plots
/plots/[slug]
/rent                      → Hub
/rent/tenants
/rent/tenants/[slug]
/rent/tenants/enquiry
/rent/landlords
```

### 4.2 Layout strategy (current)

| Layout | Role |
|--------|------|
| `app/layout.tsx` | Font, global metadata, OrganizationSchema, `children` only |
| `app/(site)/layout.tsx` | Navbar + Footer shell for all marketing routes |
| Feature layouts (`aboutUs`, `contact`, `properties`, `plots`, slug layouts) | Route metadata / `generateMetadata` |

Route group `(site)` does not appear in the URL.

### 4.3 Client vs server

| Server | Client |
|--------|--------|
| Root + SEO layouts | Almost all `page.tsx` |
| `sitemap.ts`, `robots.ts` | Navbar, carousels, forms, filters |
| StructuredData (Organization) | Map via `dynamic(..., { ssr: false })` |

Implication: metadata must stay in layouts; do not move metadata exports into client pages.

---

## 5. Data architecture

### 5.1 Canonical listing model

**Source of truth:** `data/PropertyData.ts`

```ts
PropertyItem {
  id, title, description, longDescription?, address,
  position, image, gallery?, video?,
  price, tags, slug,
  type: "property" | "plot",
  url?, floorPlans?, specifications?
}
```

Consumers filter by `type`:

- Properties flows → `type === "property"`
- Plots flows → `type === "plot"`
- Rent tenants → properties only (plots excluded)
- Sitemap → same filters
- Home map markers → mapped to `MarkerType`

### 5.2 Orphan modules

Removed in Phase 4: `data/PlotData.ts`, `data/Properties.ts`. Do not reintroduce without migrating into `PropertyData`.

### 5.3 Content modules

Nav, footer, hero, home CTAs, testimonials live under `data/*` and are imported by layout components.

### 5.4 Persistence

**None.** Forms log / toast only. Future: Route Handlers (`app/api/...`) or external form endpoint; keep form DTOs aligned with PRD §5.3.

---

## 6. UI composition

```
Page (client)
  ├── Navbar / Footer (from (site)/layout)
  ├── Page sections / grids / forms
  │     ├── listing/ListingGrid (via PropertyGrid / PlotGrid)
  │     ├── listing/ListingCard | ListingRowCard | ListingDetail
  │     ├── PropertyGallery (Swiper)
  │     ├── MapSection (dynamic, no SSR)
  │     └── PropertyForm (sell + rent/landlords)
  └── …
```

**Listing UI:** shared under `components/listing/*`. Forms a11y + FilterSelect landed in Phase 4.

---

## 7. Styling architecture

- **Single stylesheet:** `app/globals.css`
- **Tokens:** Tailwind v4 `@theme` → utilities like `bg-main-bg`, `text-primary`
- **No** `tailwind.config.js` — CSS-first config via PostCSS (`postcss.config.mjs`)
- **Leaflet overrides** and `.custom-scrollbar` live globally

Design contracts: [design.md](./design.md).

---

## 8. Maps

```
MapSection
  ├── react-leaflet MapContainer / TileLayer / Marker / Popup
  ├── utils/MapIcons.ts → PropertyIcon (gold), PlotIcon (green)
  └── markers: MarkerType[] from PropertyData mapping
```

Loaded only on client (`ssr: false`) to avoid window/document issues.

---

## 9. SEO architecture

| Piece | Location |
|-------|----------|
| Default + OG/Twitter metadata | `app/layout.tsx` |
| Route metadata | Feature / slug layouts |
| Sitemap | `app/sitemap.ts` → `https://www.2percentcompany.in` |
| Robots | `app/robots.ts` (disallow `/api/`, `/private/`) |
| Organization JSON-LD | `OrganizationSchema` in root layout |
| Property / Breadcrumb / WebPage schemas | Defined in `StructuredData.tsx`, **not wired** |

`next.config.ts`: image formats AVIF/WebP, compression, etags, no trailing slash, `poweredByHeader: false`.

---

## 10. Config & environment

- **No `.env` usage** in app code today.
- Site URL is hardcoded in metadata/sitemap/schema — centralize when adding env (`NEXT_PUBLIC_SITE_URL`).
- Dev: `next dev --turbopack` · Build: `next build --turbopack`.

---

## 11. Security & privacy notes

- Forms currently do not transmit PII to a server; when API is added: rate-limit, validate, HTTPS only, no secret keys in client.
- Do not commit credentials; keep future `.env*` out of git.
- `robots` already reserves `/api/` and `/private/`.

---

## 12. Architectural principles (for future work)

1. **One catalog** — extend `PropertyData` (or replace with API), don’t fork parallel seed files.
2. **Server for SEO, client for interaction** — keep the split explicit.
3. **Shell in layout** — stop repeating Navbar/Footer.
4. **Tokens over hex** — all brand color/radius/type via design system.
5. **Deduplicate listings UI** before adding features on top of copy-paste cards.
6. **Delete or use** unused packages and data modules.

---

## 13. Future architecture (aspirational)

```
Next.js app
  ├── (site) marketing UI
  ├── app/api/leads/*          → validation + CRM/email
  ├── app/api/uploads/*        → media (sell/landlord)
  └── optional headless CMS    → listings replace PropertyData
```

Until then, treat the app as a **static-content + lead-capture frontend**.
