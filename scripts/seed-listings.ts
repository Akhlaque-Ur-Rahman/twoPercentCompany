import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";
import { PropertyData } from "../data/PropertyData";

function positionToLatLng(position: unknown): { lat: number; lng: number } {
  if (Array.isArray(position) && position.length >= 2) {
    return { lat: Number(position[0]), lng: Number(position[1]) };
  }
  return { lat: 25.5941, lng: 85.1376 };
}

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "listings",
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log(
      `Skip seed: ${existing.totalDocs}+ listing(s) already exist. Delete them in /admin if you want to re-seed.`
    );
    process.exit(0);
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

    console.log(`Seeded: ${item.type} — ${item.slug}`);
  }

  console.log(`Done. Seeded ${PropertyData.length} listings.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
