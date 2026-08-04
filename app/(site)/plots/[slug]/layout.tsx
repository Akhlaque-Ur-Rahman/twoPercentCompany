import { Metadata } from "next";
import { getListingBySlug } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plot = await getListingBySlug(slug, "plot");

  if (!plot) {
    return {
      title: "Plot Not Found",
    };
  }

  const title = plot.title;
  const description = plot.longDescription || plot.description;
  const imageUrl = plot.image.startsWith("http")
    ? plot.image
    : `https://www.2percentcompany.in${plot.image}`;

  return {
    title,
    description,
    keywords: [
      plot.title,
      "plot for sale",
      "land for sale",
      "real estate Patna",
      "2% Company",
      plot.address,
      ...plot.tags.map((tag) => tag.label),
    ],
    openGraph: {
      title: `${title} | 2% Company`,
      description,
      url: `https://www.2percentcompany.in/plots/${slug}`,
      type: "website",
      siteName: "2% Company",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 2% Company`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/plots/${slug}`,
    },
  };
}

export default function PlotDetailLayout({ children }: Props) {
  return <>{children}</>;
}
