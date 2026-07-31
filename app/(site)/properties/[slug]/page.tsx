import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import { getListingBySlug } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
};

export default async function PropertyPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const property = await getListingBySlug(slug, "property");

  if (!property) return notFound();

  const isTenant = mode === "tenant";

  return (
    <ListingDetail
      item={property}
      modeNote={isTenant ? "Viewing property in Tenant Mode" : undefined}
      priceLabel={isTenant ? "Monthly Rent" : "Price"}
      ctaLabel={isTenant ? "Request for Rent" : "Buy Property"}
      ctaHref={
        isTenant
          ? `/rent/tenants/enquiry?property=${slug}`
          : "/contact"
      }
      specificationsTitle="Property Specifications"
    />
  );
}
