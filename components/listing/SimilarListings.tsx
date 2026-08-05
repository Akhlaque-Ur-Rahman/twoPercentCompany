import React from "react";
import ListingCard from "@/components/listing/ListingCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PropertyItem } from "@/data/PropertyData";

type SimilarListingsProps = {
  items: PropertyItem[];
  hrefFor: (item: PropertyItem) => string;
};

export default function SimilarListings({
  items,
  hrefFor,
}: SimilarListingsProps) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="similar-heading" className="space-y-6">
      <div className="space-y-2">
        <p className="type-label text-primary">Similar</p>
        <SectionHeader
          title="You may also like"
          description="Nearby options in the same category."
        />
      </div>
      <h2 id="similar-heading" className="sr-only">
        Similar listings
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {items.map((item, index) => (
          <li key={item.id}>
            <ListingCard
              property={item}
              href={hrefFor(item)}
              index={index}
              compact
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
