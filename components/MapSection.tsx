"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  PropertyIcon,
  PlotIcon,
  createPriceIcon,
} from "@/utils/MapIcons";
import { MarkerType } from "@/types/MarkerType";
import Link from "next/link";
import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

interface MapSectionProps {
  markers: MarkerType[];
  center?: [number, number];
  zoom?: number;
  showLink?: boolean;
  className?: string;
  /** Overrides default responsive map height */
  mapClassName?: string;
  /** Use compact price chips instead of pin icons */
  pricePins?: boolean;
}

function MapInteractionController({
  active,
  onActivate,
}: {
  active: boolean;
  onActivate: () => void;
}) {
  const map = useMap();

  useMapEvents({
    click: () => onActivate(),
  });

  useEffect(() => {
    const container = map.getContainer();
    const onFocusIn = () => onActivate();
    container.addEventListener("focusin", onFocusIn);
    return () => container.removeEventListener("focusin", onFocusIn);
  }, [map, onActivate]);

  useEffect(() => {
    if (active) {
      map.scrollWheelZoom.enable();
      map.getContainer().classList.add("map-interactive");
    } else {
      map.scrollWheelZoom.disable();
      map.getContainer().classList.remove("map-interactive");
    }
  }, [active, map]);

  return null;
}

function markerHref(marker: MarkerType): string | undefined {
  if (marker.url) {
    if (marker.url.startsWith("http")) {
      try {
        return new URL(marker.url).pathname;
      } catch {
        return marker.url;
      }
    }
    return marker.url;
  }
  if (!marker.slug) return undefined;
  return marker.type === "plot"
    ? `/plots/${marker.slug}`
    : `/properties/${marker.slug}`;
}

function markerIcon(marker: MarkerType, pricePins: boolean) {
  if (pricePins && marker.price) {
    return createPriceIcon(
      formatPrice(marker.price),
      marker.type === "plot" ? "#3d7a4a" : "#8f7330"
    );
  }
  return marker.type === "property" ? PropertyIcon : PlotIcon;
}

const MapSection: React.FC<MapSectionProps> = ({
  markers,
  center = [25.5941, 85.1376],
  zoom = 13,
  showLink = true,
  className = "",
  mapClassName = "",
  pricePins = false,
}) => {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  if (!markers || markers.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-media border border-header-stroke bg-2nd-bg ${className}`}
      data-lenis-prevent={active ? true : undefined}
      onMouseLeave={deactivate}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          deactivate();
        }
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className={`w-full ${
          mapClassName ||
          "h-[min(52vw,280px)] sm:h-[320px] md:h-[400px] lg:h-[460px]"
        }`}
        attributionControl={false}
      >
        <MapInteractionController active={active} onActivate={activate} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />

        {markers.map((marker) => {
          const href = markerHref(marker);
          return (
            <Marker
              key={`${marker.type ?? "x"}:${marker.id}`}
              position={marker.position as [number, number]}
              icon={markerIcon(marker, pricePins)}
            >
              <Popup>
                <div className="bg-main-bg text-body rounded-control px-2 py-4 flex flex-col items-center gap-1.5 w-[200px]">
                  {marker.image && (
                    <div className="relative w-[180px] h-[100px] rounded-media overflow-hidden">
                      <Image
                        src={marker.image}
                        alt={marker.title}
                        fill
                        sizes="180px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold type-caption text-body text-center">
                    {marker.title}
                  </h3>
                  {marker.price && (
                    <p className="type-caption font-semibold text-primary">
                      {formatPrice(marker.price)}
                    </p>
                  )}
                  {marker.address && (
                    <p className="type-caption text-secondary-text text-center line-clamp-2">
                      {marker.address}
                    </p>
                  )}
                  {showLink && href && (
                    <Link
                      href={href}
                      className="inline-block underline type-caption py-1 text-primary"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {!active && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 sm:bottom-4 z-[500] flex justify-center px-3">
          <p className="inline-flex items-center gap-2 rounded-control border border-header-stroke bg-main-bg/90 backdrop-blur-sm px-3 py-2 type-caption text-body shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <MousePointerClick
              size={15}
              className="text-primary shrink-0"
              aria-hidden
            />
            <span className="hidden sm:inline">
              Click map to enable scroll zoom
            </span>
            <span className="sm:hidden">Tap map to enable zoom</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MapSection;
