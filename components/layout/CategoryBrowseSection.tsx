import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PropertyItem } from "@/data/PropertyData";

type CategoryBrowseSectionProps = {
  listings: PropertyItem[];
};

const CATEGORIES = [
  {
    id: "homes",
    label: "Homes for sale",
    description: "Apartments, villas & independent houses",
    href: "/properties",
    image: "/images/apartment1.png",
    match: (item: PropertyItem) => item.type === "property",
  },
  {
    id: "rent",
    label: "Rentals",
    description: "Ready-to-move homes for tenants",
    href: "/rent/tenants",
    image: "/images/apartment2.png",
    match: (item: PropertyItem) => item.type === "property",
  },
  {
    id: "plots",
    label: "Plots & land",
    description: "Investment-ready parcels across Patna",
    href: "/plots",
    image: "/images/plot-plain.webp",
    match: (item: PropertyItem) => item.type === "plot",
  },
  {
    id: "apartment",
    label: "Apartments",
    description: "Flats with modern amenities",
    href: "/properties?type=apartment",
    image: "/images/property3.webp",
    match: (item: PropertyItem) =>
      item.type === "property" &&
      item.tags.some((t) => /apartment/i.test(t.label)),
  },
] as const;

export default function CategoryBrowseSection({
  listings,
}: CategoryBrowseSectionProps) {
  const tiles = CATEGORIES.map((cat) => ({
    ...cat,
    count: listings.filter(cat.match).length,
  }));

  return (
    <section className="page-px section-y border-b border-header-stroke bg-2nd-bg/40">
      <div className="space-y-2 mb-8 lg:mb-10">
        <p className="type-label text-primary">Browse by type</p>
        <SectionHeader
          title="What are you looking for?"
          description="Jump straight into the inventory that matches your intent."
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        {tiles.map((tile) => (
          <li key={tile.id}>
            <Link
              href={tile.href}
              className="group relative flex min-h-[10.5rem] overflow-hidden rounded-media border border-header-stroke focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors"
                aria-hidden
              />
              <div className="relative z-[1] flex flex-col justify-end p-5 sm:p-6 w-full">
                <p className="type-caption text-primary font-semibold tracking-wider uppercase">
                  {tile.count === 1
                    ? "1 property"
                    : `${tile.count} properties`}
                </p>
                <h3 className="type-subhead text-white mt-1">{tile.label}</h3>
                <p className="type-caption text-white/65 mt-1">
                  {tile.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
