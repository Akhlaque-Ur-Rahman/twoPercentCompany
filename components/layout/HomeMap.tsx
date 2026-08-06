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
  /** Eyebrow above the section title */
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: { label: string; href: string };
  /** When false, hides the property/plot count legend */
  showLegend?: boolean;
  className?: string;
};

export default function HomeMap({
  markers,
  center = [25.5941, 85.1376],
  zoom = 13,
  showLink = true,
  eyebrow = "Locations",
  title = "Explore listings on the map",
  description = "Browse verified properties and plots across Patna. Scroll freely past the map — click it when you want to zoom.",
  action = { label: "View All Properties", href: "/properties" },
  showLegend = true,
  className = "page-px section-y border-b border-header-stroke",
}: HomeMapProps) {
  const propertyCount = markers.filter((m) => m.type === "property").length;
  const plotCount = markers.filter((m) => m.type === "plot").length;

  return (
    <section className={className} aria-label={eyebrow || title}>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="type-label text-primary">{eyebrow}</p>
          ) : null}
          <SectionHeader
            title={title}
            description={description}
            action={action}
            actionVariant="secondary"
            actionAlwaysVisible
          />
        </div>

        {showLegend && (propertyCount > 0 || plotCount > 0) && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 type-caption text-secondary-text">
            {propertyCount > 0 && (
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ background: "#c9a227" }}
                  aria-hidden
                />
                Properties ({propertyCount})
              </span>
            )}
            {plotCount > 0 && (
              <span className="inline-flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ background: "#1f9d6a" }}
                  aria-hidden
                />
                Plots ({plotCount})
              </span>
            )}
          </div>
        )}

        <MapSection
          markers={markers}
          center={center}
          zoom={zoom}
          showLink={showLink}
          pricePins
        />
      </div>
    </section>
  );
}
