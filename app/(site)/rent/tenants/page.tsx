import { getListingsByType } from "@/lib/listings";
import TenantListingClient from "./TenantListingClient";

export default async function TenantListingPage() {
  const listings = await getListingsByType("property");
  return <TenantListingClient listings={listings} />;
}
