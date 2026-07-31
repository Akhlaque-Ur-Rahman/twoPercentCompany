"use client";

import React from "react";
import { PropertyData } from "@/data/PropertyData";
import ListingGrid from "@/components/listing/ListingGrid";

const PlotGrid = () => {
  const plots = PropertyData.filter((item) => item.type === "plot");

  return (
    <ListingGrid
      items={plots}
      getHref={(item) => `/plots/${item.slug}`}
      ctaLabel="View Plot Details"
      viewAllHref="/plots"
      viewAllLabel="View All Plots"
    />
  );
};

export default PlotGrid;
