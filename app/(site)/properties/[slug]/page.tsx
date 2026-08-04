import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import {
  BreadcrumbSchema,
  PropertySchema,
} from "@/components/StructuredData";
import { getListingBySlug, getListingsByType } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
};

function schemaPrice(price: string): string {
  const digits = price.replace(/,/g, "").replace(/\D/g, "");
  return digits || "0";
}

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `https://www.2percentcompany.in${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateStaticParams() {
  const listings = await getListingsByType("property");
  return listings.map((item) => ({ slug: item.slug }));
}

export default async function PropertyPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const property = await getListingBySlug(slug, "property");

  if (!property) return notFound();

  const isTenant = mode === "tenant";
  const pageUrl = `https://www.2percentcompany.in/properties/${slug}`;
  const description = property.longDescription || property.description;

  return (
    <>
      <PropertySchema
        name={property.title}
        description={description}
        image={absoluteUrl(property.image)}
        address={property.address}
        price={schemaPrice(property.price)}
        url={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.2percentcompany.in/" },
          {
            name: "Properties",
            url: "https://www.2percentcompany.in/properties",
          },
          { name: property.title, url: pageUrl },
        ]}
      />
      <ListingDetail
        item={property}
        modeNote={isTenant ? "Viewing property in Tenant Mode" : undefined}
        priceLabel={isTenant ? "Monthly Rent" : "Price"}
        ctaLabel={isTenant ? "Request for Rent" : "Buy Property"}
        ctaHref={
          isTenant
            ? `/rent/tenants/enquiry?property=${slug}`
            : `/contact?property=${slug}`
        }
        specificationsTitle="Property Specifications"
        backHref="/properties"
        backLabel="All homes"
      />
    </>
  );
}
