import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import { getListingBySlug, getSimilarListings } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TenantPropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getListingBySlug(slug, "property");

  if (!property) return notFound();

  const similar = await getSimilarListings(property);

  return (
    <ListingDetail
      item={property}
      modeNote="Available for rent"
      priceLabel="Monthly Rent"
      ctaLabel="Request for Rent"
      ctaHref={`/rent/tenants/enquiry?property=${slug}`}
      specificationsTitle="Property Specifications"
      backHref="/rent/tenants"
      backLabel="All rentals"
      similar={similar}
      similarHrefFor={(item) => `/rent/tenants/${item.slug}`}
    />
  );
}
