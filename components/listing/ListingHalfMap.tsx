"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ListingCardItem } from "@/components/listing/ListingCard";
import type { MarkerType } from "@/types/MarkerType";
import type { LatLngExpression } from "leaflet";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[min(70vh,640px)] lg:h-[calc(100vh-11rem)] w-full rounded-media border border-header-stroke bg-2nd-bg animate-pulse"
      role="status"
      aria-label="Loading map"
    />
  ),
});

function toPosition(position: ListingCardItem["position"]): [number, number] {
  if (Array.isArray(position)) {
    return [Number(position[0]), Number(position[1])];
  }
  if (
    position &&
    typeof position === "object" &&
    "lat" in position &&
    "lng" in position
  ) {
    const { lat, lng } = position as { lat: number; lng: number };
    return [lat, lng];
  }
  return [25.5941, 85.1376];
}

type ListingHalfMapProps = {
  listings: ListingCardItem[];
  hrefFor: (item: ListingCardItem) => string;
  mapClassName?: string;
  className?: string;
};

export default function ListingHalfMap({
  listings,
  hrefFor,
  mapClassName = "h-[min(70vh,640px)] lg:h-[calc(100vh-11rem)]",
  className = "",
}: ListingHalfMapProps) {
  const markers: MarkerType[] = useMemo(
    () =>
      listings
        .filter((item) => item.position != null)
        .map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          position: toPosition(item.position) as LatLngExpression,
          image: item.image,
          address: item.address,
          type: item.type,
          url: hrefFor(item),
        })),
    [listings, hrefFor]
  );

  if (!markers.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-media border border-header-stroke bg-2nd-bg min-h-[280px] type-body text-secondary-text ${className}`}
      >
        No map locations for these results.
      </div>
    );
  }

  const center = toPosition(listings[0]?.position);

  return (
    <MapSection
      markers={markers}
      center={center}
      zoom={12}
      showLink={false}
      className={className}
      mapClassName={mapClassName}
    />
  );
}
