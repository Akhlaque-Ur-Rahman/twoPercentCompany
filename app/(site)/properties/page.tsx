import { getListingsByType } from "@/lib/listings";
import PropertiesPageClient from "./PropertiesPageClient";

export default async function PropertiesPage() {
  const listings = await getListingsByType("property");
  return <PropertiesPageClient listings={listings} />;
}
