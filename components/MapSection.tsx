"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  PROPERTY_PIN_COLOR,
  PLOT_PIN_COLOR,
} from "@/utils/MapIcons";
import { MarkerType } from "@/types/MarkerType";
import Image from "next/image";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import Button from "@/components/ui/Button";
import type { Marker as LeafletMarker } from "leaflet";

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

type PositionedMarker = MarkerType & {
  displayPosition: [number, number];
};

function toLatLng(position: MarkerType["position"]): [number, number] {
  if (Array.isArray(position)) {
    return [Number(position[0]), Number(position[1])];
  }
  if (
    position &&
    typeof position === "object" &&
    "lat" in position &&
    "lng" in position
  ) {
    return [Number(position.lat), Number(position.lng)];
  }
  return [25.5941, 85.1376];
}

/** Fan out pins that share nearly the same coordinates so they stay tappable */
function withCollisionOffsets(markers: MarkerType[]): PositionedMarker[] {
  const groups = new Map<string, MarkerType[]>();

  for (const marker of markers) {
    const [lat, lng] = toLatLng(marker.position);
    const key = `${lat.toFixed(4)}:${lng.toFixed(4)}`;
    const list = groups.get(key);
    if (list) list.push(marker);
    else groups.set(key, [marker]);
  }

  const result: PositionedMarker[] = [];

  for (const group of groups.values()) {
    if (group.length === 1) {
      result.push({
        ...group[0],
        displayPosition: toLatLng(group[0].position),
      });
      continue;
    }

    const [baseLat, baseLng] = toLatLng(group[0].position);
    const radius = 0.00028 + Math.min(group.length - 1, 6) * 0.00004;

    group.forEach((marker, index) => {
      const angle = (Math.PI * 2 * index) / group.length - Math.PI / 2;
      result.push({
        ...marker,
        displayPosition: [
          baseLat + Math.cos(angle) * radius,
          baseLng + Math.sin(angle) * radius,
        ],
      });
    });
  }

  return result;
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

function markerKey(marker: MarkerType) {
  return `${marker.type ?? "x"}:${marker.id}`;
}

function markerIcon(marker: MarkerType, pricePins: boolean) {
  if (pricePins && marker.price) {
    return createPriceIcon(
      formatPrice(marker.price),
      marker.type === "plot" ? PLOT_PIN_COLOR : PROPERTY_PIN_COLOR
    );
  }
  return marker.type === "property" ? PropertyIcon : PlotIcon;
}

function setPinActive(target: LeafletMarker, active: boolean) {
  const pin = target.getElement()?.querySelector(".tpc-price-pin");
  if (!pin) return;
  pin.classList.toggle("is-active", active);
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
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);

  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  const positioned = useMemo(
    () =>
      withCollisionOffsets(markers).map((marker) => ({
        ...marker,
        key: markerKey(marker),
        href: markerHref(marker),
        icon: markerIcon(marker, pricePins),
      })),
    [markers, pricePins]
  );

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

        {positioned.map((marker) => {
          const { key, href, icon } = marker;
          const isOpen = openMarkerId === key;
          const typeLabel = marker.type === "plot" ? "Plot" : "Property";
          const accent =
            marker.type === "plot" ? "text-map-plot" : "text-map-property";

          return (
            <Marker
              key={key}
              position={marker.displayPosition}
              icon={icon}
              zIndexOffset={isOpen ? 1000 : 0}
              eventHandlers={{
                mouseover: (e) => {
                  (e.target as LeafletMarker).setZIndexOffset(800);
                },
                mouseout: (e) => {
                  if (openMarkerId !== key) {
                    (e.target as LeafletMarker).setZIndexOffset(0);
                  }
                },
                popupopen: (e) => {
                  setOpenMarkerId(key);
                  setPinActive(e.target as LeafletMarker, true);
                },
                popupclose: (e) => {
                  setPinActive(e.target as LeafletMarker, false);
                  setOpenMarkerId((current) =>
                    current === key ? null : current
                  );
                },
              }}
            >
              <Popup className="tpc-map-popup" maxWidth={280} minWidth={260}>
                <article className="tpc-map-popup-card">
                  {marker.image ? (
                    <div className="tpc-map-popup-media relative aspect-[16/10] w-full overflow-hidden bg-2nd-bg">
                      <Image
                        src={marker.image}
                        alt={marker.title}
                        fill
                        sizes="260px"
                        className="object-cover"
                        loading="lazy"
                      />
                      <div className="tpc-map-popup-media__fade" aria-hidden />
                      <span
                        className={`tpc-map-popup-badge absolute left-3 top-3 ${
                          marker.type === "plot"
                            ? "tpc-map-popup-badge--plot"
                            : "tpc-map-popup-badge--property"
                        }`}
                      >
                        {typeLabel}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 pt-4">
                      <span
                        className={`tpc-map-popup-badge ${
                          marker.type === "plot"
                            ? "tpc-map-popup-badge--plot"
                            : "tpc-map-popup-badge--property"
                        }`}
                      >
                        {typeLabel}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2.5 px-4 pt-3.5 pb-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold type-body text-body leading-snug line-clamp-2">
                        {marker.title}
                      </h3>
                      {marker.price && (
                        <p className={`type-body font-bold tracking-tight ${accent}`}>
                          {formatPrice(marker.price)}
                        </p>
                      )}
                    </div>
                    {marker.address && (
                      <p className="type-caption text-secondary-text leading-relaxed line-clamp-2">
                        {marker.address}
                      </p>
                    )}
                    {showLink && href && (
                      <Button
                        href={href}
                        variant="primary"
                        size="sm"
                        className="tpc-map-popup-cta mt-1 w-full"
                      >
                        View Details
                        <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden />
                      </Button>
                    )}
                  </div>
                </article>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {!active && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 sm:bottom-4 z-[500] flex justify-center px-3">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-header-stroke/80 bg-main-bg/75 backdrop-blur-md px-2.5 py-1.5 type-caption text-secondary-text shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
            <MousePointerClick
              size={13}
              className="text-primary/80 shrink-0"
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
