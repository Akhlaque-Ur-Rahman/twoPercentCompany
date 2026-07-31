"use client";

import React, { useMemo } from "react";
import { useSearchParams, usePathname, notFound } from "next/navigation";
import { PropertyData, PropertyItem } from "@/data/PropertyData";
import ListingDetail from "@/components/listing/ListingDetail";

export default function PropertyPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const mode = searchParams.get("mode") || "buyer";

  const property: PropertyItem | undefined = useMemo(
    () => PropertyData.find((p) => p.slug === slug && p.type === "property"),
    [slug]
  );

  if (!property) return notFound();

  const isTenant = mode === "tenant";

  return (
    <ListingDetail
      item={property}
      modeNote={isTenant ? "Viewing property in Tenant Mode" : undefined}
      priceLabel={isTenant ? "Monthly Rent" : "Price"}
      ctaLabel={isTenant ? "Request for Rent" : "Buy Property"}
      ctaHref={
        isTenant
          ? `/rent/tenants/enquiry?property=${slug}`
          : "/contact"
      }
      specificationsTitle="Property Specifications"
    />
  );
}
