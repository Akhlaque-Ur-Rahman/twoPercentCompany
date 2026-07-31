# 2% Company

Patna-focused real estate marketing site for browsing properties and plots, listing assets, and capturing leads (buy / rent / sell / invest).

**Live:** https://www.2percentcompany.in/

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) + Turbopack |
| UI | React 19, Tailwind CSS v4 |
| Font | **Urbanist** (`next/font`) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Carousels | Swiper |
| Maps | Leaflet + react-leaflet |
| Forms | react-hook-form (contact) + local state elsewhere |
| Feedback | react-toastify (dark + primary theme) |

There is **no backend** yet — forms toast / `console.log` only. Listings come from `data/PropertyData.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

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

All marketing pages live under `app/(site)/` with shared Navbar/Footer.

Key paths: `/`, `/properties`, `/plots`, `/buy`, `/sell`, `/rent`, `/rent/tenants`, `/rent/landlords`, `/services`, `/contact`, `/beaninvestor`, `/aboutUs`.

## Design notes

- Primary brand gold: `#8f7330` (`bg-primary`)
- Text on primary fills: `text-on-primary` (black) — never white on gold
- Page padding: `.page-px`
- Prefer shared UI in `components/ui/*` and listings in `components/listing/*`


