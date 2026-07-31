"use client";

import React, { useMemo } from "react";
import { usePathname, notFound } from "next/navigation";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import ListingDetail from "@/components/listing/ListingDetail";

export default function TenantPropertyPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";

  const property: PropertyItem | undefined = useMemo(
    () =>
      PropertyData.filter((p) => p.type === "property").find(
        (p) => p.slug === slug
      ),
    [slug]
  );

  if (!property) return notFound();

  return (
    <ListingDetail
      item={property}
      modeNote="Available for rent"
      priceLabel="Monthly Rent"
      ctaLabel="Request for Rent"
      ctaHref={`/rent/tenants/enquiry?property=${slug}`}
      specificationsTitle="Property Specifications"
    />
  );
}
