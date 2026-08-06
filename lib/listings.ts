import type { Where } from "payload";
import {
  DEFAULT_PLOT_FEATURES,
  DEFAULT_PROPERTY_FEATURES,
  DEFAULT_VIRTUAL_TOUR_URL,
  FloorPlan,
  ListingExpert,
  PropertyData,
  PropertyItem,
  TEMP_FLOOR_PLANS,
} from "@/data/PropertyData";
import { getPayload } from "@/lib/payload";
import { TeamMemberData, type TeamMember } from "@/data/TeamData";
import { getTeamMembers } from "@/lib/team";

type MediaDoc = {
  url?: string | null;
  alt?: string | null;
};

type TeamRelDoc = {
  id?: number | string;
  name?: string;
  slug?: string;
  role?: string;
  bio?: string | null;
  photoUrl?: string | null;
  photo?: number | string | MediaDoc | null;
  phone?: string | null;
  email?: string | null;
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
  virtualTourUrl?: string | null;
  features?: { label: string; id?: string }[] | null;
  assignedExpert?: number | string | TeamRelDoc | null;
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

/** Remap legacy / broken public assets to stable replacements. */
const PUBLIC_ASSET_ALIASES: Record<string, string> = {
  "/images/plainland.jpg": "/images/plot-plain.webp",
  "/images/plainland.png": "/images/plot-plain.webp",
  "/images/scenary.jpg": "/images/plot-scenery.webp",
  "/images/scenary.png": "/images/plot-scenery.webp",
  "/images/seasidevilla.png": "/images/apartment1.png",
};

const FALLBACK_HOME_IMAGE = "/images/apartment1.png";

function isBannedCoverImage(url: string | null | undefined): boolean {
  if (!url) return true;
  return /seasidevilla/i.test(url);
}

function canonicalizePublicAsset(url: string): string {
  return PUBLIC_ASSET_ALIASES[url] ?? url;
}

function staticImageForSlug(slug: string): string | undefined {
  return PropertyData.find((item) => item.slug === slug)?.image;
}

function resolveImage(doc: ListingDoc): string {
  const fromStatic = staticImageForSlug(doc.slug);

  // Prefer stable public paths over CMS media routes (MIME / optimizer issues).
  // Skip retired seasidevilla so each slug can use its PropertyData cover.
  if (
    isPublicAsset(doc.imageUrl) &&
    !isBannedCoverImage(doc.imageUrl)
  ) {
    return canonicalizePublicAsset(doc.imageUrl);
  }

  const uploaded = mediaUrl(doc.image);
  if (uploaded && !isBannedCoverImage(uploaded)) return uploaded;

  if (
    doc.imageUrl &&
    !isBannedCoverImage(doc.imageUrl) &&
    !isPublicAsset(doc.imageUrl)
  ) {
    return canonicalizePublicAsset(doc.imageUrl);
  }

  return fromStatic ?? FALLBACK_HOME_IMAGE;
}

function resolveUrlList(
  uploads: (number | string | MediaDoc)[] | null | undefined,
  urlRows: { url: string }[] | null | undefined
): string[] | undefined {
  const fromUploads =
    uploads
      ?.map((item) => mediaUrl(item))
      .filter((url): url is string => Boolean(url) && !isBannedCoverImage(url)) ?? [];
  const fromUrls =
    urlRows
      ?.map((row) => row.url)
      .filter(Boolean)
      .map(canonicalizePublicAsset)
      .filter((url) => !isBannedCoverImage(url)) ?? [];
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

function mapExpertFromRel(rel: TeamRelDoc | null | undefined): ListingExpert | undefined {
  if (!rel || typeof rel !== "object" || !rel.name || !rel.slug) return undefined;
  const photo =
    rel.photoUrl ||
    (rel.photo && typeof rel.photo === "object" ? rel.photo.url : undefined) ||
    "/images/avatar1.png";
  return {
    name: rel.name,
    slug: rel.slug,
    role: rel.role || "Advisor",
    photo,
    phone: rel.phone ?? undefined,
    email: rel.email ?? undefined,
    bio: rel.bio ?? undefined,
  };
}

function expertFromMember(m: TeamMember): ListingExpert {
  return {
    name: m.name,
    slug: m.slug,
    role: m.role,
    photo: m.photo,
    phone: m.phone,
    email: m.email,
    bio: m.bio,
  };
}

function defaultExpertSlug(item: PropertyItem): string {
  if (item.expertSlug) return item.expertSlug;
  if (item.type === "plot") return "rahul-singh";
  const rentalish = item.tags.some((t) =>
    /rent|tenant|furnish/i.test(t.label)
  );
  if (rentalish) return "priya-sharma";
  return "amit-kumar";
}

export function mapListingDoc(doc: ListingDoc): PropertyItem {
  const numericId =
    typeof doc.id === "number" ? doc.id : Number.parseInt(String(doc.id), 10) || 0;

  const expert =
    typeof doc.assignedExpert === "object"
      ? mapExpertFromRel(doc.assignedExpert)
      : undefined;

  const features = (doc.features ?? [])
    .map((f) => f.label)
    .filter(Boolean);

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
    virtualTourUrl: doc.virtualTourUrl || undefined,
    features: features.length ? features : undefined,
    expert,
    expertSlug:
      typeof doc.assignedExpert === "object" && doc.assignedExpert?.slug
        ? doc.assignedExpert.slug
        : undefined,
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

function withDetailDefaults(
  item: PropertyItem,
  members: TeamMember[]
): PropertyItem {
  const features =
    item.features?.length
      ? item.features
      : item.type === "plot"
        ? DEFAULT_PLOT_FEATURES
        : DEFAULT_PROPERTY_FEATURES;

  let expert = item.expert;
  if (!expert) {
    const slug = defaultExpertSlug(item);
    const member =
      members.find((m) => m.slug === slug) ??
      TeamMemberData.find((m) => m.slug === slug) ??
      members[0] ??
      TeamMemberData[0];
    if (member) expert = expertFromMember(member);
  }

  return {
    ...item,
    features,
    virtualTourUrl: item.virtualTourUrl || DEFAULT_VIRTUAL_TOUR_URL,
    expert,
  };
}

/** Strip non-serializable Lucide icons before crossing the RSC boundary. */
function toClientListing(
  item: PropertyItem,
  members: TeamMember[] = TeamMemberData
): PropertyItem {
  const normalized = withDetailDefaults(withCanonicalFloorPlans(item), members);
  return {
    ...normalized,
    image: canonicalizePublicAsset(normalized.image),
    gallery: normalized.gallery?.map(canonicalizePublicAsset),
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
      depth: 2,
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
  const [fromCms, members] = await Promise.all([
    fetchPublishedListings(),
    getTeamMembers(),
  ]);
  return (fromCms ?? PropertyData).map((item) => toClientListing(item, members));
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
  const members = await getTeamMembers();

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
      depth: 2,
    });

    if (result.docs[0]) {
      return toClientListing(
        mapListingDoc(result.docs[0] as unknown as ListingDoc),
        members
      );
    }
  } catch (error) {
    console.error("[listings] CMS slug fetch failed, using static fallback:", error);
  }

  const fallback = PropertyData.find(
    (item) => item.slug === slug && (type == null || item.type === type)
  );
  return fallback ? toClientListing(fallback, members) : undefined;
}

export async function getSimilarListings(
  current: PropertyItem,
  limit = 3
): Promise<PropertyItem[]> {
  const all = await getListings();
  const locality = current.address.split(",")[0]?.trim().toLowerCase() ?? "";

  const scored = all
    .filter((item) => item.slug !== current.slug && item.type === current.type)
    .map((item) => {
      let score = 0;
      if (locality && item.address.toLowerCase().includes(locality)) {
        score += 2;
      }
      const sharedTags = item.tags.filter((t) =>
        current.tags.some(
          (ct) => ct.label.toLowerCase() === t.label.toLowerCase()
        )
      ).length;
      score += sharedTags;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.id - b.item.id);

  return scored.slice(0, limit).map((s) => s.item);
}
