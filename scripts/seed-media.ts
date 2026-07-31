/**
 * Uploads PropertyData images into Media (Vercel Blob in prod) and links them on listings.
 * Safe to re-run: skips when media already exists.
 */
import fs from "node:fs";
import path from "node:path";
import { config as loadDotenv } from "dotenv";

loadDotenv({ override: false });

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function publicFile(urlPath: string): string | null {
  if (!urlPath?.startsWith("/")) return null;
  const abs = path.resolve(process.cwd(), "public", urlPath.replace(/^\//, ""));
  return fs.existsSync(abs) ? abs : null;
}

async function seedMedia() {
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const { PropertyData } = await import("../data/PropertyData");

  const payload = await getPayload({ config });

  const existing = await payload.find({ collection: "media", limit: 1 });
  if (existing.totalDocs > 0) {
    console.log(`[seed-media] Skip: ${existing.totalDocs}+ media item(s) already exist.`);
    return;
  }

  const paths = new Set<string>();
  for (const item of PropertyData) {
    if (item.image) paths.add(item.image);
    item.gallery?.forEach((u) => paths.add(u));
    item.floorPlans?.forEach((u) => paths.add(u));
  }

  const mediaByPath = new Map<string, number | string>();

  for (const urlPath of paths) {
    const filePath = publicFile(urlPath);
    if (!filePath) {
      console.warn(`[seed-media] Missing file, skip: ${urlPath}`);
      continue;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimetype = MIME[ext];
    if (!mimetype) {
      console.warn(`[seed-media] Unsupported type, skip: ${urlPath}`);
      continue;
    }

    const buffer = fs.readFileSync(filePath);
    const name = path.basename(filePath);

    const doc = await payload.create({
      collection: "media",
      data: {
        alt: name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      },
      file: {
        data: Buffer.from(buffer),
        mimetype,
        name,
        size: buffer.length,
      },
    });

    mediaByPath.set(urlPath, doc.id);
    console.log(`[seed-media] Uploaded ${urlPath} → id ${doc.id}`);
  }

  const listings = await payload.find({
    collection: "listings",
    limit: 100,
    depth: 0,
  });

  for (const listing of listings.docs) {
    const source = PropertyData.find((p) => p.slug === listing.slug);
    if (!source) continue;

    const image = source.image ? mediaByPath.get(source.image) : undefined;
    const gallery = source.gallery
      ?.map((u) => mediaByPath.get(u))
      .filter((id): id is number | string => id != null);
    const floorPlans = source.floorPlans
      ?.map((u) => mediaByPath.get(u))
      .filter((id): id is number | string => id != null);

    if (!image && !gallery?.length && !floorPlans?.length) continue;

    await payload.update({
      collection: "listings",
      id: listing.id,
      data: {
        ...(image ? { image } : {}),
        ...(gallery?.length ? { gallery } : {}),
        ...(floorPlans?.length ? { floorPlans } : {}),
      },
    });

    console.log(`[seed-media] Linked media → listing ${listing.slug}`);
  }

  console.log(`[seed-media] Done. Uploaded ${mediaByPath.size} file(s).`);
}

seedMedia()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed-media] Failed:", err);
    process.exit(1);
  });
