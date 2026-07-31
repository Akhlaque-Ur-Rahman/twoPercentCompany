"use client";

import React from "react";
import { PropertyData } from "@/data/PropertyData";
import ListingGrid from "@/components/listing/ListingGrid";

const PropertyGrid = () => {
  const properties = PropertyData.filter((item) => item.type === "property");

  return (
    <ListingGrid
      items={properties}
      getHref={(item) => `/properties/${item.slug}`}
      ctaLabel="View Property Details"
      viewAllHref="/properties"
      viewAllLabel="View All Properties"
    />
  );
};

export default PropertyGrid;
