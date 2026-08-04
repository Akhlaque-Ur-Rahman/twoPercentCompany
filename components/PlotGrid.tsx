import React from "react";
import { getListingsByType } from "@/lib/listings";
import ListingGrid from "@/components/listing/ListingGrid";

const PlotGrid = async () => {
  const plots = await getListingsByType("plot");

  return (
    <ListingGrid
      items={plots}
      hrefBase="/plots"
      ctaLabel="View Plot Details"
      viewAllHref="/plots"
      viewAllLabel="View All Plots"
      layout="spotlight"
      secondaryBadge="Plot"
    />
  );
};

export default PlotGrid;
