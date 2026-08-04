import { Metadata } from "next";
import { getListingBySlug } from "@/lib/listings";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getListingBySlug(slug, "property");

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  const title = property.title;
  const description = property.longDescription || property.description;
  const imageUrl = property.image.startsWith("http")
    ? property.image
    : `https://www.2percentcompany.in${property.image}`;

  return {
    title,
    description,
    keywords: [
      property.title,
      "property for sale",
      "real estate Patna",
      "2% Company",
      property.address,
      ...property.tags.map((tag) => tag.label),
    ],
    openGraph: {
      title: `${title} | 2% Company`,
      description,
      url: `https://www.2percentcompany.in/properties/${slug}`,
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
      canonical: `/properties/${slug}`,
    },
  };
}

export default function PropertyDetailLayout({ children }: Props) {
  return <>{children}</>;
}
