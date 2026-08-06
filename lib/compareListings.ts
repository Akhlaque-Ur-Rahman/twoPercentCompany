import type { SavedListingType } from "@/lib/savedListings";

export type CompareListingItem = {
  id: number;
  type: SavedListingType;
  slug: string;
  title: string;
  image: string;
  price: string;
  href: string;
  address?: string;
  tags?: { label: string }[];
  specifications?: { label: string; value: string }[];
  features?: string[];
};

export const COMPARE_LISTINGS_STORAGE_KEY = "tpc:compare-listings";
export const COMPARE_MAX = 4;

export function compareListingKey(
  type: SavedListingType,
  id: number
): string {
  return `${type}:${id}`;
}

export function readCompareListings(): CompareListingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(COMPARE_LISTINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCompareListingItem).slice(0, COMPARE_MAX);
  } catch {
    return [];
  }
}

export function writeCompareListings(items: CompareListingItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      COMPARE_LISTINGS_STORAGE_KEY,
      JSON.stringify(items.slice(0, COMPARE_MAX))
    );
  } catch {
    // Quota / private mode — ignore
  }
}

function isCompareListingItem(value: unknown): value is CompareListingItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    (item.type === "property" || item.type === "plot") &&
    typeof item.slug === "string" &&
    typeof item.title === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "string" &&
    typeof item.href === "string"
  );
}

export function specValue(
  item: CompareListingItem,
  ...labels: string[]
): string {
  const specs = item.specifications ?? [];
  const lower = labels.map((l) => l.toLowerCase());
  const match = specs.find((s) =>
    lower.some((l) => s.label.toLowerCase().includes(l))
  );
  if (match?.value) return match.value;
  const tag = (item.tags ?? []).find((t) =>
    lower.some((l) => t.label.toLowerCase().includes(l))
  );
  return tag?.label ?? "—";
}

/** First positive number from a display string (e.g. "2BHK", "2 Bathrooms"). */
export function parseSpecNumber(value: string): number | null {
  if (!value || value === "—") return null;
  const m = value.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export type CompareWinnerDirection = "min" | "max";

/**
 * Returns indices that share the best numeric value.
 * Ties keep all winners; missing values are ignored.
 */
export function bestValueIndices(
  values: Array<number | null>,
  direction: CompareWinnerDirection
): Set<number> {
  const present = values
    .map((v, i) => (v == null ? null : { v, i }))
    .filter((x): x is { v: number; i: number } => x != null);

  if (present.length < 2) return new Set();

  const target =
    direction === "min"
      ? Math.min(...present.map((p) => p.v))
      : Math.max(...present.map((p) => p.v));

  // Only highlight when there is a real spread
  const hasSpread = present.some((p) => p.v !== target);
  if (!hasSpread) return new Set();

  return new Set(present.filter((p) => p.v === target).map((p) => p.i));
}

export function highlightLabels(item: CompareListingItem): string[] {
  const fromFeatures = (item.features ?? []).filter(Boolean);
  if (fromFeatures.length) return fromFeatures.slice(0, 4);
  return (item.tags ?? [])
    .map((t) => t.label)
    .filter(Boolean)
    .slice(0, 4);
}
