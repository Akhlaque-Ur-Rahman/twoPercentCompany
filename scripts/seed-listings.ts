/**
 * Seeds PropertyData into empty listings collection.
 * Safe to run on every Vercel build (no-ops if listings already exist).
 */
import { config as loadDotenv } from "dotenv";

// Fill missing keys only — never override Vercel / CI-injected DATABASE_URL.
loadDotenv({ override: false });

async function seed() {
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const { PropertyData } = await import("../data/PropertyData");

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "listings",
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log(
      `[seed] Skip: ${existing.totalDocs}+ listing(s) already exist.`
    );
    return;
  }

  for (const item of PropertyData) {
    const { lat, lng } = positionToLatLng(item.position);

    await payload.create({
      collection: "listings",
      data: {
        title: item.title,
        slug: item.slug,
        type: item.type,
        published: true,
        description: item.description,
        longDescription: item.longDescription || undefined,
        address: item.address,
        price: item.price,
        lat,
        lng,
        imageUrl: item.image,
        galleryUrls: item.gallery?.map((url) => ({ url })),
        floorPlanUrls: item.floorPlans?.map((url) => ({ url })),
        video: item.video || undefined,
        tags: item.tags.map((tag) => ({ label: tag.label })),
        specifications: item.specifications?.map((spec) => ({
          label: spec.label,
          value: spec.value,
        })),
      },
    });

    console.log(`[seed] ${item.type} — ${item.slug}`);
  }

  console.log(`[seed] Done. Seeded ${PropertyData.length} listings.`);
}

function positionToLatLng(position: unknown): { lat: number; lng: number } {
  if (Array.isArray(position) && position.length >= 2) {
    return { lat: Number(position[0]), lng: Number(position[1]) };
  }
  return { lat: 25.5941, lng: 85.1376 };
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[seed] Failed:", error);
    process.exit(1);
  });
