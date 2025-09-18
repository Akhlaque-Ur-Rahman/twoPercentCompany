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
  showLink?: boolean; // toggle link display
}

const MapSection: React.FC<MapSectionProps> = ({
  markers,
  center = [25.5941, 85.1376],
  zoom = 13,
  showLink = true,
}) => {
  if (!markers || markers.length === 0) return null;

  return (
    <div className="w-full rounded-[16px] overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        className="h-[400px] sm:h-[450px] lg:h-[500px] w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position as [number, number]}
            icon={marker.type === "property" ? PropertyIcon : PlotIcon}
          >
            <Popup>
              <div className="bg-main-bg text-white rounded-lg px-2 py-6 flex flex-col items-center gap-1 w-[200px]">
                {marker.image && (
                  <div className="relative w-[180px] h-[100px] rounded-md overflow-hidden">
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
                <h3 className="font-semibold text-sm">{marker.title}</h3>
                {marker.address && (
                  <p className="text-xs text-gray-400">{marker.address}</p>
                )}
                {showLink && marker.slug && (
                  <Link
                    href={
                      marker.type === "property"
                        ? `/properties/${marker.slug}`
                        : `/plots/${marker.slug}`
                    }
                    className="inline-block underline text-xs py-1"
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
