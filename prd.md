# Product Requirements Document (PRD)

**Product:** 2% Company  
**Domain:** Real estate marketing & lead-generation platform (Patna-focused)  
**Site:** https://www.2percentcompany.in/  
**Document status:** Living — update when scope or priorities change  
**Related:** [architecture.md](./architecture.md) · [design.md](./design.md) · [phases.md](./phases.md) · [memory.md](./memory.md)

---

## 1. Vision

2% Company helps people in and around Patna discover properties and plots, list assets for sale or rent, and connect with the team for buying, renting, selling, or investing — through a dark, premium, mobile-first web experience.

---

## 2. Goals

| Goal | Success signal |
|------|----------------|
| Make listings discoverable | Users can browse, filter, and open property/plot detail pages |
| Capture qualified leads | Contact, sell, rent, enquiry, and investor forms submit cleanly (backend TBD) |
| Build brand trust | Consistent “2% Company” identity, About, testimonials, map presence |
| SEO for Patna real estate | Indexable routes, metadata, sitemap, structured data |
| Maintainable UI system | Shared tokens/components so UX fixes don’t drift |

### Non-goals (current)

- Full CMS / admin panel
- Payments or booking checkout
- Live inventory sync from external MLS
- User accounts / auth
- Native mobile apps

---

## 3. Users & jobs-to-be-done

| Persona | Primary jobs |
|---------|----------------|
| **Buyer** | Browse properties/plots, filter, view detail + map, contact / buy intent |
| **Tenant** | Browse rentals, view detail, submit enquiry |
| **Seller** | Understand listing process, submit property for sale |
| **Landlord** | Submit property for rent listing |
| **Investor** | Submit investment interest (range, location, message) |
| **General visitor** | Learn about company, services, contact support |

---

## 4. Product surface map

| Route | Capability | Priority |
|-------|------------|----------|
| `/` | Marketing home (hero, featured listings, testimonials, map, CTA) | P0 |
| `/properties` | Property listing + search | P0 |
| `/properties/[slug]` | Property detail (+ `?mode=buyer\|tenant` CTA variants) | P0 |
| `/plots` | Plot listing + search | P0 |
| `/plots/[slug]` | Plot detail | P0 |
| `/buy` | Buy browse with filters | P1 |
| `/sell` | Seller education + multi-step list form | P0 |
| `/rent` | Rent hub (tenant vs landlord) | P0 |
| `/rent/tenants` | Rental listings + filters | P0 |
| `/rent/tenants/[slug]` | Rental detail | P0 |
| `/rent/tenants/enquiry` | Tenant enquiry form | P0 |
| `/rent/landlords` | Landlord multi-step form | P0 |
| `/services` | Service directory | P1 |
| `/aboutUs` | Brand story, stats, values | P1 |
| `/contact` | General lead form | P0 |
| `/beaninvestor` | Investor lead form | P1 |
| 404 | Friendly not-found | P2 |

---

## 5. Functional requirements

### 5.1 Listings

- FR-L1: Show properties and plots from a single catalog (`PropertyData`), filterable by `type`.
- FR-L2: Detail pages show gallery, video (when present), specs, floor plans, map, and primary CTA.
- FR-L3: List pages support text search (and where built: type/facing/price or BHK/furnished filters).
- FR-L4: Featured sections on home deep-link to full catalogs.

### 5.2 Navigation & IA

- FR-N1: Global Navbar + Footer on marketing/product pages.
- FR-N2: Rent and Services expose hubs + sub-routes (no dead `#` links).
- FR-N3: Logo navigates home.
- FR-N4: Mobile nav supports all primary destinations.

### 5.3 Lead capture

- FR-F1: Contact form collects name, email, phone, type, purpose, budget, location.
- FR-F2: Sell / landlord forms collect listing details, media, specs (and landlord identity for rent).
- FR-F3: Tenant enquiry collects identity, lease prefs, budget, docs meta, message.
- FR-F4: Investor form collects identity, company, range, geo, message.
- FR-F5: Newsletter collects email.
- FR-F6: **Current:** client-side only (toast / console). **Target:** persist to API/CRM with validation + error states (see phases).

### 5.4 Map

- FR-M1: Homepage and detail pages can show Leaflet map with property/plot markers (Patna-centric default).

### 5.5 SEO

- FR-S1: Per-route metadata via layouts / `generateMetadata`.
- FR-S2: `sitemap.ts` and `robots.ts` stay in sync with real routes.
- FR-S3: Organization schema in root; product/breadcrumb schemas to be wired (backlog).

---

## 6. Non-functional requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | Mobile-first; usable at 375px without horizontal overflow |
| NFR-2 | Dark + gold brand consistency (see design.md) |
| NFR-3 | Accessibility: labels, focus-visible, keyboard nav for menus/filters/lightbox |
| NFR-4 | Performance: Next Image, AVIF/WebP, avoid unused heavy deps |
| NFR-5 | TypeScript for domain models; no stub pages in production IA |
| NFR-6 | Forms must eventually work without relying on placeholders alone |

---

## 7. Content & data rules

1. **Canonical catalog:** `data/PropertyData.ts` only for live listings.
2. **Dead data:** `PlotData.ts` / `Properties.ts` must not be treated as production sources until adopted or deleted.
3. **Brand copy:** Always “2% Company” — never leftover template names.
4. **Contact truth:** Footer/data contact info is source of truth until CMS exists.
5. **Social links:** Must be real URLs before marketing launch checklist passes.

---

## 8. Out of scope vs future

| Now | Later |
|-----|--------|
| Static seed listings | CMS / admin CRUD |
| Toast-only forms | API + email/CRM + file upload storage |
| Client-heavy pages | Selective RSC for listing shells |
| Manual SEO layouts | Full schema coverage + OG asset QA |
| Duplicate card markup | Shared listing primitives (UX phases) |

---

## 9. Acceptance (product-level)

A release is “product-ready” for marketing use when:

- [ ] All nav/footer destinations resolve to real pages
- [ ] Buy / rent / sell / contact / investor flows are completable on mobile
- [ ] Brand, tokens, and primary CTAs match design.md
- [ ] Sitemap URLs return 200
- [ ] No stub or placeholder brand copy in UI
- [ ] Lead forms either hit a backend **or** are explicitly labeled with working client validation

---

## 10. Open decisions

| Decision | Options | Owner |
|----------|---------|-------|
| Backend for leads | Formspree / custom API / WhatsApp deep-link | TBD |
| Services IA | Keep hub vs fold into Plots-only | TBD |
| Rental inventory source | Reuse PropertyData vs separate rent catalog | TBD |
| `PlotData.ts` | Delete vs migrate into PropertyData | TBD |
