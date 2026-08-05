export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover: string;
  category: string;
  authorName: string;
  publishedAt: string;
};

export const BlogPostData: BlogPost[] = [
  {
    id: "1",
    title: "Buying a home in Patna: a practical checklist",
    slug: "buying-home-patna-checklist",
    excerpt:
      "From locality fit to paperwork — the steps Patna buyers should not skip.",
    body: `Patna’s neighbourhoods each have a different rhythm. Before you book a visit, decide your commute, budget band, and whether you need ready-to-move or under-construction.

**Checklist**
1. Shortlist 3–5 localities (Bailey Road, Boring Road, Kankarbagh, Danapur, etc.).
2. Confirm carpet area, facing, and society charges in writing.
3. Visit at two times of day to judge traffic and noise.
4. Review title chain and encumbrance with a trusted lawyer.
5. Align payment timeline with your loan or funds.

2% Company helps you shortlist verified homes and stay clear on next steps — call or WhatsApp when you are ready to visit.`,
    cover: "/images/seasidevilla.png",
    category: "buying-tips",
    authorName: "2% Company",
    publishedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Why locality still beats amenities in Patna",
    slug: "locality-beats-amenities-patna",
    excerpt:
      "Clubhouses are nice. Daily travel, schools, and resale liquidity matter more.",
    body: `Amenities sell brochures. Locality sells everyday life.

In Patna, buyers who prioritise school access, hospital proximity, and reliable roads tend to stay happier — and exit cleaner when they sell.

Use amenities as a tie-breaker after you are sure about the corridor. Explore our locality tiles on the homepage to browse live inventory by area.`,
    cover: "/images/property3.webp",
    category: "patna-local",
    authorName: "2% Company",
    publishedAt: "2026-04-12T10:00:00.000Z",
  },
  {
    id: "3",
    title: "Plot buying tips for first-time investors",
    slug: "plot-buying-tips-patna",
    excerpt:
      "Title clarity, approach roads, and growth corridors — what to verify early.",
    body: `Plots can be strong long-term holds when due diligence is solid.

Focus on:
- Clear title and mutation status
- Legal approach road and setbacks
- Flood history and drainage
- Nearby development (roads, institutions)

Browse our plots section or talk to our plots advisor for a guided shortlist.`,
    cover: "/images/plot-plain.webp",
    category: "investment",
    authorName: "2% Company",
    publishedAt: "2026-05-20T10:00:00.000Z",
  },
];
