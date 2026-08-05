import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import {
  BreadcrumbSchema,
  PropertySchema,
} from "@/components/StructuredData";
import { getListingBySlug, getListingsByType, getSimilarListings } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
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
  const listings = await getListingsByType("plot");
  return listings.map((item) => ({ slug: item.slug }));
}

export default async function PlotPage({ params }: Props) {
  const { slug } = await params;
  const plot = await getListingBySlug(slug, "plot");

  if (!plot) return notFound();

  const similar = await getSimilarListings(plot);
  const pageUrl = `https://www.2percentcompany.in/plots/${slug}`;
  const description = plot.longDescription || plot.description;

  return (
    <>
      <PropertySchema
        name={plot.title}
        description={description}
        image={absoluteUrl(plot.image)}
        address={plot.address}
        price={schemaPrice(plot.price)}
        url={pageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.2percentcompany.in/" },
          {
            name: "Plots",
            url: "https://www.2percentcompany.in/plots",
          },
          { name: plot.title, url: pageUrl },
        ]}
      />
      <ListingDetail
        item={plot}
        priceLabel="Price"
        ctaLabel="Enquire About Plot"
        ctaHref={`/contact?plot=${slug}`}
        specificationsTitle="Plot Specifications"
        backHref="/plots"
        backLabel="All plots"
        similar={similar}
      />
    </>
  );
}
