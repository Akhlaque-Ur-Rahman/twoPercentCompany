import { getListingsByType } from "@/lib/listings";
import type { ListingCardItem } from "@/components/listing/ListingCard";
import type { PropertyItem } from "@/data/PropertyData";
import PlotsHero from "@/components/plots/PlotsHero";
import PlotsPageClient from "./PlotsPageClient";

function toListItem(item: PropertyItem): ListingCardItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    address: item.address,
    price: item.price,
    image: item.image,
    gallery: item.gallery?.slice(0, 6),
    tags: item.tags.map(({ label }) => ({ label })),
    type: item.type,
  };
}

export default async function PlotsPage() {
  const listings = (await getListingsByType("plot")).map(toListItem);

  return (
    <div className="flex flex-col bg-main-bg text-body">
      <PlotsHero />
      <PlotsPageClient listings={listings} />
    </div>
  );
}
