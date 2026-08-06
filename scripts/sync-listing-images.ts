/**
 * Syncs listing cover + gallery public URLs from PropertyData.
 * Fixes production rows that still point at the retired seasidevilla asset.
 * Safe to run on every Vercel build.
 */
import { config as loadDotenv } from "dotenv";

loadDotenv({ override: false });

async function syncListingImages() {
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const { PropertyData } = await import("../data/PropertyData");

  const payload = await getPayload({ config });

  const listings = await payload.find({
    collection: "listings",
    limit: 200,
    depth: 0,
    pagination: false,
  });

  let updated = 0;

  for (const listing of listings.docs) {
    const source = PropertyData.find((item) => item.slug === listing.slug);
    if (!source?.image) continue;

    const currentUrl =
      typeof listing.imageUrl === "string" ? listing.imageUrl : "";
    const needsCover =
      !currentUrl ||
      /seasidevilla/i.test(currentUrl) ||
      currentUrl !== source.image;

    const galleryUrls = Array.isArray(listing.galleryUrls)
      ? listing.galleryUrls
      : [];
    const galleryHasBanned = galleryUrls.some(
      (row) =>
        row &&
        typeof row === "object" &&
        "url" in row &&
        typeof row.url === "string" &&
        /seasidevilla/i.test(row.url)
    );

    if (!needsCover && !galleryHasBanned) continue;

    await payload.update({
      collection: "listings",
      id: listing.id,
      data: {
        imageUrl: source.image,
        // Clear retired media upload so public imageUrl wins cleanly
        ...(needsCover && /seasidevilla/i.test(currentUrl)
          ? { image: null }
          : {}),
        ...(source.gallery?.length
          ? {
              galleryUrls: source.gallery.map((url) => ({ url })),
            }
          : galleryHasBanned
            ? { galleryUrls: [] }
            : {}),
      },
    });

    updated += 1;
    console.log(`[sync-images] ${listing.slug} → ${source.image}`);
  }

  console.log(`[sync-images] Done. Updated ${updated} listing(s).`);
}

syncListingImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[sync-images] Failed:", error);
    process.exit(1);
  });
