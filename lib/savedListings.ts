export type SavedListingType = "property" | "plot";

export type SavedListingItem = {
  id: number;
  type: SavedListingType;
  slug: string;
  title: string;
  image: string;
  price: string;
  href: string;
  address?: string;
};

export const SAVED_LISTINGS_STORAGE_KEY = "tpc:saved-listings";

export function savedListingKey(
  type: SavedListingType,
  id: number
): string {
  return `${type}:${id}`;
}

export function listingHrefFor(
  type: SavedListingType,
  slug: string,
  href?: string
): string {
  if (href) return href;
  return type === "plot" ? `/plots/${slug}` : `/properties/${slug}`;
}

export function readSavedListings(): SavedListingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_LISTINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedListingItem);
  } catch {
    return [];
  }
}

export function writeSavedListings(items: SavedListingItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SAVED_LISTINGS_STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch {
    // Quota / private mode — ignore
  }
}

function isSavedListingItem(value: unknown): value is SavedListingItem {
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
