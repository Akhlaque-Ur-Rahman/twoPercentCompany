"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PropertyIcon, PlotIcon } from "@/utils/MapIcons";
import { MarkerType } from "@/types/MarkerType";
import Link from "next/link";
import Image from "next/image";

interface MapSectionProps {
  markers: MarkerType[];
  center?: [number, number];
  zoom?: number;
  showLink?: boolean;
}

const MapSection: React.FC<MapSectionProps> = ({
  markers,
  center = [25.5941, 85.1376],
  zoom = 13,
  showLink = true,
}) => {
  if (!markers || markers.length === 0) return null;

  return (
    <div className="w-full rounded-media overflow-hidden page-px">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-[240px] md:h-[400px] lg:h-[450px] w-full"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution=""
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position as [number, number]}
            icon={marker.type === "property" ? PropertyIcon : PlotIcon}
          >
            <Popup>
              <div className="bg-main-bg text-body rounded-control px-2 py-6 flex flex-col items-center gap-1 w-[200px]">
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
                <h3 className="font-semibold type-caption text-body">
                  {marker.title}
                </h3>
                {marker.address && (
                  <p className="type-caption text-secondary-text">
                    {marker.address}
                  </p>
                )}
                {showLink && marker.slug && (
                  <Link
                    href={
                      marker.type === "property"
                        ? `/properties/${marker.slug}`
                        : `/plots/${marker.slug}`
                    }
                    className="inline-block underline type-caption py-1 text-primary"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
