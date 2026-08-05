/** Shared listing filter / sort helpers for URL hydration across browse pages. */

export type ListingSortKey =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "featured";

export const LISTING_SORT_OPTIONS: { label: string; value: ListingSortKey }[] = [
  { label: "Default order", value: "default" },
  { label: "Featured first", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

/** Hero / URL type slug → display tag used in filters. */
export const TYPE_PARAM_TO_FILTER: Record<string, string> = {
  apartment: "Apartment",
  villa: "Villa",
  "independent-house": "Independent House",
  "1bhk": "1BHK",
  "2bhk": "2BHK",
  "3bhk": "3BHK",
  plot: "Plot",
  studio: "Studio",
};

export const FILTER_TO_TYPE_PARAM: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_PARAM_TO_FILTER).map(([k, v]) => [v.toLowerCase(), k])
);

export const BUDGET_RANGES: Record<
  string,
  { min: number; max: number }
> = {
  "below-50l": { min: 0, max: 4_999_999 },
  "50l-1cr": { min: 5_000_000, max: 10_000_000 },
  "above-1cr": { min: 10_000_001, max: Infinity },
};

export const RENT_RANGES: Record<string, { min: number; max: number }> = {
  below20: { min: 0, max: 19_999 },
  "20to40": { min: 20_000, max: 40_000 },
  above40: { min: 40_001, max: Infinity },
};

const LOCATION_ALIASES: Record<string, string[]> = {
  patna: ["patna"],
  danapur: ["danapur"],
  "bailey-road": ["bailey road", "bailey"],
  kankarbagh: ["kankarbagh"],
  "boring-road": ["boring road", "boring"],
  patliputra: ["patliputra"],
};

export function parsePriceNumber(price: string): number {
  return Number.parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

export function matchesLocation(
  address: string,
  locationParam: string | null | undefined
): boolean {
  if (!locationParam || locationParam === "all") return true;
  const key = locationParam.toLowerCase().trim();
  const needles = LOCATION_ALIASES[key] ?? [
    key.replace(/-/g, " "),
    key,
  ];
  const hay = address.toLowerCase();
  return needles.some((n) => hay.includes(n));
}

export function matchesTypeTag(
  tags: { label: string }[],
  typeParam: string | null | undefined,
  title?: string
): boolean {
  if (!typeParam || typeParam === "all") return true;
  const filterLabel =
    TYPE_PARAM_TO_FILTER[typeParam.toLowerCase()] ??
    typeParam.replace(/-/g, " ");
  const needle = filterLabel.toLowerCase();

  if (tags.some((t) => t.label.toLowerCase().includes(needle))) return true;

  // Soft aliases when seed data lacks exact tags
  const aliases: Record<string, string[]> = {
    villa: ["independent house", "villa", "bungalow"],
    "independent-house": ["independent house", "villa"],
    apartment: ["apartment", "flat", "studio"],
    studio: ["studio", "1bhk", "apartment"],
  };
  const extra = aliases[typeParam.toLowerCase()] ?? [];
  if (
    extra.some((a) => tags.some((t) => t.label.toLowerCase().includes(a)))
  ) {
    return true;
  }
  if (title) {
    const hay = title.toLowerCase();
    if (hay.includes(needle) || extra.some((a) => hay.includes(a))) {
      return true;
    }
  }
  return false;
}

/** Map filter UI value (e.g. "Apartment") to URL type param. */
export function typeFilterToParam(filterValue: string): string | null {
  if (!filterValue || filterValue === "All") return null;
  return (
    FILTER_TO_TYPE_PARAM[filterValue.toLowerCase()] ??
    filterValue.toLowerCase().replace(/\s+/g, "-")
  );
}

export function typeParamToFilter(typeParam: string | null): string {
  if (!typeParam || typeParam === "all") return "All";
  return TYPE_PARAM_TO_FILTER[typeParam.toLowerCase()] ?? "All";
}

export function matchesBudget(
  price: string,
  budgetParam: string | null | undefined
): boolean {
  if (!budgetParam || budgetParam === "any") return true;
  const range = BUDGET_RANGES[budgetParam];
  if (!range) return true;
  const n = parsePriceNumber(price);
  return n >= range.min && n <= range.max;
}

export function matchesRent(
  price: string,
  rentParam: string | null | undefined
): boolean {
  if (!rentParam || rentParam === "any" || rentParam === "All") return true;
  const range = RENT_RANGES[rentParam];
  if (!range) return true;
  const n = parsePriceNumber(price);
  return n >= range.min && n <= range.max;
}

export function isFeaturedItem(
  item: { tags: { label: string }[]; id: number },
  indexInSource?: number
): boolean {
  if (item.tags.some((t) => /featured/i.test(t.label))) return true;
  if (indexInSource != null && indexInSource === 0) return true;
  return item.id <= 2;
}

export function sortListings<
  T extends { id: number; price: string; tags: { label: string }[] },
>(items: T[], sort: ListingSortKey): T[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort(
        (a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price)
      );
    case "price-desc":
      return copy.sort(
        (a, b) => parsePriceNumber(b.price) - parsePriceNumber(a.price)
      );
    case "newest":
      return copy.sort((a, b) => b.id - a.id);
    case "featured":
      return copy.sort((a, b) => {
        const af = isFeaturedItem(a) ? 0 : 1;
        const bf = isFeaturedItem(b) ? 0 : 1;
        return af - bf || a.id - b.id;
      });
    default:
      return copy;
  }
}

/** Build query string; omit empty / default values. */
export function buildListingQuery(
  params: Record<string, string | null | undefined>
): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (
      value == null ||
      value === "" ||
      value === "All" ||
      value === "all" ||
      value === "any" ||
      value === "default"
    ) {
      continue;
    }
    qs.set(key, value);
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}
