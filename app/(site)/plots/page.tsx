import { getListingsByType } from "@/lib/listings";
import PlotsPageClient from "./PlotsPageClient";

export default async function PlotsPage() {
  const listings = await getListingsByType("plot");
  return <PlotsPageClient listings={listings} />;
}
