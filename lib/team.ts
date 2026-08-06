import { TeamMember, TeamMemberData } from "@/data/TeamData";
import { getPayload } from "@/lib/payload";

type MediaDoc = { url?: string | null };

type TeamDoc = {
  id: number | string;
  name: string;
  slug: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
  photo?: number | string | MediaDoc | null;
  areas?: { label: string }[] | null;
  phone?: string | null;
  email?: string | null;
  order?: number | null;
  published?: boolean | null;
};

function isPersonAvatar(url: string | null | undefined): boolean {
  if (!url) return false;
  // Named photo headshots only (avatar-amit.jpg) — not old cartoon avatar1.png packs
  return /\/images\/avatar-[a-z]+\.(?:jpe?g|webp|png)(?:\?|$)/i.test(url);
}

function resolvePhoto(doc: TeamDoc): string {
  const fromStatic = TeamMemberData.find((m) => m.slug === doc.slug)?.photo;
  const uploaded =
    doc.photo && typeof doc.photo === "object" ? doc.photo.url : undefined;

  // Prefer real avatar assets — never show building/plot stock as a headshot
  if (isPersonAvatar(doc.photoUrl)) return doc.photoUrl!;
  if (isPersonAvatar(uploaded)) return uploaded!;
  if (fromStatic && isPersonAvatar(fromStatic)) return fromStatic;
  return fromStatic ?? "/images/avatar-amit.jpg";
}

function mapTeamDoc(doc: TeamDoc): TeamMember {
  return {
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    role: doc.role,
    bio: doc.bio ?? "",
    photo: resolvePhoto(doc),
    areas: (doc.areas ?? []).map((a) => a.label),
    phone: doc.phone ?? undefined,
    email: doc.email ?? undefined,
    order: doc.order ?? 0,
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "team-members",
      where: { published: { equals: true } },
      sort: "order",
      limit: 50,
      depth: 1,
      pagination: false,
    });
    if (!result.docs.length) return TeamMemberData;
    return result.docs.map((d) => mapTeamDoc(d as unknown as TeamDoc));
  } catch (error) {
    console.error("[team] CMS fetch failed, using fallback:", error);
    return TeamMemberData;
  }
}

export async function getTeamMemberBySlug(
  slug: string
): Promise<TeamMember | undefined> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "team-members",
      where: {
        and: [
          { slug: { equals: slug } },
          { published: { equals: true } },
        ],
      },
      limit: 1,
      depth: 1,
    });
    if (result.docs[0]) {
      return mapTeamDoc(result.docs[0] as unknown as TeamDoc);
    }
  } catch (error) {
    console.error("[team] CMS slug fetch failed:", error);
  }
  return TeamMemberData.find((m) => m.slug === slug);
}
