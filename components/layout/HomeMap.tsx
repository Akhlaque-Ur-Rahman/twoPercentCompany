"use client";

import dynamic from "next/dynamic";
import MapPlaceholder from "@/components/MapPlaceholder";
import { MarkerType } from "@/types/MarkerType";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

type HomeMapProps = {
  markers: MarkerType[];
  center?: [number, number];
  zoom?: number;
  showLink?: boolean;
};

export default function HomeMap({
  markers,
  center = [25.5941, 85.1376],
  zoom = 13,
  showLink = true,
}: HomeMapProps) {
  return (
    <MapSection
      markers={markers}
      center={center}
      zoom={zoom}
      showLink={showLink}
    />
  );
}
