import React from "react";
import { getListingsByType } from "@/lib/listings";
import ListingGrid from "@/components/listing/ListingGrid";

const PropertyGrid = async () => {
  const properties = await getListingsByType("property");

  return (
    <ListingGrid
      items={properties}
      hrefBase="/properties"
      ctaLabel="View Property Details"
      viewAllHref="/properties"
      viewAllLabel="View All Properties"
      layout="spotlight"
      secondaryBadge="Home"
    />
  );
};

export default PropertyGrid;
