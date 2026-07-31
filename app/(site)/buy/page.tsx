import { getListingsByType } from "@/lib/listings";
import BuyPageClient from "./BuyPageClient";

export default async function BuyPage() {
  const listings = await getListingsByType("property");
  return <BuyPageClient listings={listings} />;
}
