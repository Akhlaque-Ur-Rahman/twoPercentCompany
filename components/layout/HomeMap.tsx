"use client";

import dynamic from "next/dynamic";
import MapPlaceholder from "@/components/MapPlaceholder";
import SectionHeader from "@/components/ui/SectionHeader";
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
  const propertyCount = markers.filter((m) => m.type === "property").length;
  const plotCount = markers.filter((m) => m.type === "plot").length;

  return (
    <section className="page-px section-y border-b border-header-stroke">
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="space-y-2">
          <p className="type-label text-primary">Locations</p>
          <SectionHeader
            title="Explore listings on the map"
            description="Browse verified properties and plots across Patna. Scroll freely past the map — click it when you want to zoom."
            action={{ label: "View All Properties", href: "/properties" }}
            actionVariant="secondary"
            actionAlwaysVisible
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 type-caption text-secondary-text">
          {propertyCount > 0 && (
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-full bg-primary shrink-0"
                aria-hidden
              />
              Properties ({propertyCount})
            </span>
          )}
          {plotCount > 0 && (
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-full bg-emerald-600 shrink-0"
                aria-hidden
              />
              Plots ({plotCount})
            </span>
          )}
        </div>

        <MapSection
          markers={markers}
          center={center}
          zoom={zoom}
          showLink={showLink}
        />
      </div>
    </section>
  );
}
