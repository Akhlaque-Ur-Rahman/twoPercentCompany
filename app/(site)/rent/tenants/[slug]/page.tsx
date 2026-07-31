import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import { getListingBySlug } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TenantPropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getListingBySlug(slug, "property");

  if (!property) return notFound();

  return (
    <ListingDetail
      item={property}
      modeNote="Available for rent"
      priceLabel="Monthly Rent"
      ctaLabel="Request for Rent"
      ctaHref={`/rent/tenants/enquiry?property=${slug}`}
      specificationsTitle="Property Specifications"
    />
  );
}
