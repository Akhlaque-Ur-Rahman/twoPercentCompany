# 2% Company

Patna-focused real estate marketing site for browsing properties and plots, listing assets, and capturing leads (buy / rent / sell / invest).

**Live:** https://www.2percentcompany.in/

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15.4 (App Router) + Turbopack |
| CMS | Payload 3 (SQLite locally) |
| UI | React 19, Tailwind CSS v4 |
| Font | **Urbanist** (`next/font`) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Carousels | Swiper |
| Maps | Leaflet + react-leaflet |
| Forms | react-hook-form (contact) + local state elsewhere |
| Feedback | react-toastify (dark + primary theme) |

Listings are managed in Payload (`/admin`). If the CMS DB is empty, the site falls back to `data/PropertyData.ts`. Lead forms still toast / `console.log` only (Phase 6.1).

## Getting started

```bash
cp .env.example .env   # set PAYLOAD_SECRET
npm install
npm run seed           # import current PropertyData into SQLite (once)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (create the first user on first visit).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (webpack — Turbopack breaks Payload admin) |
| `npm run build` | Production build (webpack — Turbopack build blocked by Payload on Next 15.4) |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run seed` | Seed listings from `PropertyData` (skips if DB already has rows) |
| `npm run generate:types` | Regenerate `payload-types.ts` |
| `npm run generate:importmap` | Regenerate admin import map |

## CMS notes

- Local DB: SQLite file `payload.db` (gitignored)
- Media uploads: project `media/` folder (gitignored)
- Hybrid images: `imageUrl` / gallery URL fields work with existing `/public` assets; optional Media uploads override them
- Production later: Neon Postgres + Vercel Blob (`clientUploads: true`) — not wired yet

## Project docs

| Doc | Purpose |
|-----|---------|
| [prd.md](./prd.md) | Product requirements |
| [architecture.md](./architecture.md) | Stack, routing, data |
| [design.md](./design.md) | Tokens, type, CTA, motion |
| [phases.md](./phases.md) | Roadmap (Phases 0–6) |
| [memory.md](./memory.md) | Absolute truths for contributors |
| [UI_UX_IMPROVEMENT_PLAN.md](./UI_UX_IMPROVEMENT_PLAN.md) | UX checklist |

## Routes (marketing)

All marketing pages live under `app/(site)/` with shared Navbar/Footer. Payload admin/API live under `app/(payload)/`.

Key paths: `/`, `/properties`, `/plots`, `/buy`, `/sell`, `/rent`, `/rent/tenants`, `/rent/landlords`, `/services`, `/contact`, `/beaninvestor`, `/aboutUs`, `/admin`.

## Design notes

- Primary brand gold: `#8f7330` (`bg-primary`)
- Text on primary fills: `text-on-primary` (black) — never white on gold
- Page padding: `.page-px`
- Prefer shared UI in `components/ui/*` and listings in `components/listing/*`
