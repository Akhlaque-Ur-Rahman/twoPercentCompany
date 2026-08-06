import { BlogPost, BlogPostData } from "@/data/BlogData";
import { getPayload } from "@/lib/payload";

type MediaDoc = { url?: string | null };

type PostDoc = {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverUrl?: string | null;
  cover?: number | string | MediaDoc | null;
  category?: string | null;
  authorName?: string | null;
  publishedAt: string;
};

function resolveCover(doc: PostDoc): string {
  if (doc.coverUrl) return doc.coverUrl;
  if (doc.cover && typeof doc.cover === "object" && doc.cover.url) {
    return doc.cover.url;
  }
  return "/images/apartment1.png";
}

function mapPost(doc: PostDoc): BlogPost {
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    body: doc.body,
    cover: resolveCover(doc),
    category: doc.category ?? "real-estate",
    authorName: doc.authorName ?? "2% Company",
    publishedAt: doc.publishedAt,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      where: { published: { equals: true } },
      sort: "-publishedAt",
      limit: 50,
      depth: 1,
      pagination: false,
    });
    if (!result.docs.length) return BlogPostData;
    return result.docs.map((d) => mapPost(d as unknown as PostDoc));
  } catch (error) {
    console.error("[posts] CMS fetch failed, using fallback:", error);
    return BlogPostData;
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
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
      return mapPost(result.docs[0] as unknown as PostDoc);
    }
  } catch (error) {
    console.error("[posts] CMS slug fetch failed:", error);
  }
  return BlogPostData.find((p) => p.slug === slug);
}
