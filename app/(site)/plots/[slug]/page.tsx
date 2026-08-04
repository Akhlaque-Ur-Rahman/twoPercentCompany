import { notFound } from "next/navigation";
import ListingDetail from "@/components/listing/ListingDetail";
import { getListingBySlug } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PlotPage({ params }: Props) {
  const { slug } = await params;
  const plot = await getListingBySlug(slug, "plot");

  if (!plot) return notFound();

  return (
    <ListingDetail
      item={plot}
      ctaLabel="Enquire About Plot"
      ctaHref={`/contact?plot=${slug}`}
      specificationsTitle="Plot Specifications"
      backHref="/plots"
      backLabel="All plots"
    />
  );
}
