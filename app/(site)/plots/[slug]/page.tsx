"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import ListingDetail from "@/components/listing/ListingDetail";

interface PlotPageProps {
  params: Promise<{ slug: string }>;
}

export default function PlotPage(props: PlotPageProps) {
  const { slug } = use(props.params);

  const plot: PropertyItem | undefined = PropertyData.find(
    (p) => p.slug === slug && p.type === "plot"
  );

  if (!plot) return notFound();

  return (
    <ListingDetail
      item={plot}
      ctaLabel="Enquire About Plot"
      ctaHref="/contact"
      specificationsTitle="Plot Specifications"
    />
  );
}
