import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { heroLocationOptions } from "@/data/HeroSectionData";
import type { PropertyItem } from "@/data/PropertyData";
import { matchesLocation } from "@/lib/listingFilters";

const LOCALITY_IMAGES: Record<string, string> = {
  patna: "/images/apartment1.png",
  danapur: "/images/property2.webp",
  "bailey-road": "/images/property3.webp",
  kankarbagh: "/images/property4.webp",
  "boring-road": "/images/property5.webp",
};

type ExploreLocalitiesSectionProps = {
  listings: PropertyItem[];
};

export default function ExploreLocalitiesSection({
  listings,
}: ExploreLocalitiesSectionProps) {
  const tiles = heroLocationOptions.map((loc) => {
    const count = listings.filter((item) =>
      matchesLocation(item.address, loc.value)
    ).length;
    return {
      ...loc,
      count,
      image: LOCALITY_IMAGES[loc.value] ?? "/images/apartment1.png",
      href: `/properties?location=${loc.value}`,
    };
  });

  return (
    <section className="page-px section-y border-b border-header-stroke">
      <div className="space-y-2 mb-8 lg:mb-10">
        <p className="type-label text-primary">Explore Patna</p>
        <SectionHeader
          title="Browse by locality"
          description="Homes and plots across the corridors buyers ask about most."
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {tiles.map((tile) => (
          <li key={tile.value} className="min-h-0">
            <Link
              href={tile.href}
              className="group relative block overflow-hidden rounded-media border border-header-stroke min-h-[13.125rem] sm:min-h-[13.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1">
                <p className="type-subhead text-white">{tile.label}</p>
                <p className="type-caption text-white/70 group-hover:text-primary transition-colors">
                  {tile.count === 1
                    ? "1 listing"
                    : `${tile.count} listings`}{" "}
                  · More details
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
