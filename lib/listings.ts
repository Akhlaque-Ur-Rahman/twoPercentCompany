import type { Where } from "payload";
import { FloorPlan, PropertyData, PropertyItem, TEMP_FLOOR_PLANS } from "@/data/PropertyData";
import { getPayload } from "@/lib/payload";

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

type ListingDoc = {
  id: number | string;
  title: string;
  slug: string;
  type: "property" | "plot";
  description: string;
  longDescription?: string | null;
  address: string;
  price: string;
  lat: number;
  lng: number;
  imageUrl?: string | null;
  image?: number | string | MediaDoc | null;
  galleryUrls?: { url: string; id?: string }[] | null;
  gallery?: (number | string | MediaDoc)[] | null;
  floorPlanUrls?: { url: string; id?: string }[] | null;
  floorPlans?: (number | string | MediaDoc)[] | null;
  video?: string | null;
  tags?: { label: string; id?: string }[] | null;
  specifications?: { label: string; value: string; id?: string }[] | null;
  published?: boolean | null;
};

function mediaUrl(value: number | string | MediaDoc | null | undefined): string | undefined {
  if (!value || typeof value === "number" || typeof value === "string") return undefined;
  return value.url ?? undefined;
}

function isPublicAsset(url: string | null | undefined): url is string {
  return Boolean(
    url &&
      (url.startsWith("/images/") ||
        url.startsWith("/floorplans/") ||
        url.startsWith("/videos/"))
  );
}

function resolveImage(doc: ListingDoc): string {
  // Prefer stable public paths over CMS media routes (MIME / optimizer issues).
  if (isPublicAsset(doc.imageUrl)) return doc.imageUrl;
  return mediaUrl(doc.image) || doc.imageUrl || "/images/seasidevilla.png";
}

function resolveUrlList(
  uploads: (number | string | MediaDoc)[] | null | undefined,
  urlRows: { url: string }[] | null | undefined
): string[] | undefined {
  const fromUploads =
    uploads
      ?.map((item) => mediaUrl(item))
      .filter((url): url is string => Boolean(url)) ?? [];
  const fromUrls = urlRows?.map((row) => row.url).filter(Boolean) ?? [];
  const publicUrls = fromUrls.filter(isPublicAsset);
  if (publicUrls.length) return publicUrls;
  const merged = [...fromUploads, ...fromUrls];
  return merged.length ? merged : undefined;
}

function resolveFloorPlans(
  uploads: (number | string | MediaDoc)[] | null | undefined,
  urlRows: { url: string }[] | null | undefined
): FloorPlan[] | undefined {
  const urls = resolveUrlList(uploads, urlRows);
  if (!urls?.length) return undefined;
  return urls.map((url) => ({ url }));
}

export function mapListingDoc(doc: ListingDoc): PropertyItem {
  const numericId =
    typeof doc.id === "number" ? doc.id : Number.parseInt(String(doc.id), 10) || 0;

  return {
    id: numericId,
    title: doc.title,
    description: doc.description,
    longDescription: doc.longDescription || undefined,
    address: doc.address,
    position: [doc.lat, doc.lng],
    image: resolveImage(doc),
    gallery: resolveUrlList(doc.gallery, doc.galleryUrls),
    floorPlans: resolveFloorPlans(doc.floorPlans, doc.floorPlanUrls),
    video: doc.video || undefined,
    price: doc.price,
    tags: (doc.tags ?? []).map((tag) => ({
      label: tag.label,
    })),
    slug: doc.slug,
    type: doc.type,
    specifications: doc.specifications?.map(({ label, value }) => ({
      label,
      value,
    })),
  };
}

/** Temporary: force shared plan assets on every listing. */
function withCanonicalFloorPlans(item: PropertyItem): PropertyItem {
  return { ...item, floorPlans: TEMP_FLOOR_PLANS };
}

/** Strip non-serializable Lucide icons before crossing the RSC boundary. */
function toClientListing(item: PropertyItem): PropertyItem {
  const normalized = withCanonicalFloorPlans(item);
  return {
    ...normalized,
    tags: normalized.tags.map(({ label }) => ({ label })),
  };
}

async function fetchPublishedListings(): Promise<PropertyItem[] | null> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "listings",
      where: {
        published: { equals: true },
      },
      limit: 200,
      depth: 1,
      pagination: false,
    });

    if (!result.docs.length) return null;

    return result.docs.map((doc) => mapListingDoc(doc as unknown as ListingDoc));
  } catch (error) {
    console.error("[listings] CMS fetch failed, using static fallback:", error);
    return null;
  }
}

export async function getListings(): Promise<PropertyItem[]> {
  const fromCms = await fetchPublishedListings();
  return (fromCms ?? PropertyData).map(toClientListing);
}

export async function getListingsByType(
  type: "property" | "plot"
): Promise<PropertyItem[]> {
  const listings = await getListings();
  return listings.filter((item) => item.type === type);
}

export async function getListingBySlug(
  slug: string,
  type?: "property" | "plot"
): Promise<PropertyItem | undefined> {
  try {
    const payload = await getPayload();
    const and: Where[] = [
      { slug: { equals: slug } },
      { published: { equals: true } },
    ];
    if (type != null) {
      and.push({ type: { equals: type } });
    }

    const result = await payload.find({
      collection: "listings",
      where: { and },
      limit: 1,
      depth: 1,
    });

    if (result.docs[0]) {
      return toClientListing(mapListingDoc(result.docs[0] as unknown as ListingDoc));
    }
  } catch (error) {
    console.error("[listings] CMS slug fetch failed, using static fallback:", error);
  }

  const fallback = PropertyData.find(
    (item) => item.slug === slug && (type == null || item.type === type)
  );
  return fallback ? toClientListing(fallback) : undefined;
}
